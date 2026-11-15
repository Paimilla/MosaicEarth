import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'C:/Users/fpaim/Desktop/Hackaton Nasa');
const sceneId = (process.argv[3] ?? 'FRT0001FB74').toUpperCase();
const scenePrefix = sceneId.toLowerCase();
const dataDir = path.join(root, 'DATA', 'Mars', 'CRISM', sceneId);
const productTag = sceneId.startsWith('HRL') ? '183j' : '166j';
const imagePath = path.join(dataDir, `${scenePrefix}_07_if${productTag}_mtr3.img`);
const hdrPath = path.join(dataDir, `${scenePrefix}_07_if${productTag}_mtr3.hdr`);
const labelPath = path.join(dataDir, `${scenePrefix}_07_if${productTag}_mtr3.lbl`);
const wavelengthPath = path.join(dataDir, `${scenePrefix}_07_wv${productTag}_mtr3.tab`);
const hdr = fs.readFileSync(hdrPath, 'utf8');
const label = fs.readFileSync(labelPath, 'utf8');
const productId = label.split(/\r?\n/).find(line => line.trim().startsWith('PRODUCT_ID'))?.split('"')[1] ?? `${sceneId}_07_IF${productTag.toUpperCase()}_MTR3`;
const observationTime = label.split(/\r?\n/).find(line => line.trim().startsWith('START_TIME'))?.split('=')[1]?.trim().replace(/^"|"$/g, '') ?? null;
const dims = {
  samples: Number(hdr.match(/^samples\s*=\s*(\d+)/im)?.[1]),
  lines: Number(hdr.match(/^lines\s*=\s*(\d+)/im)?.[1]),
  bands: Number(hdr.match(/^bands\s*=\s*(\d+)/im)?.[1]),
  dataType: Number(hdr.match(/^data type\s*=\s*(\d+)/im)?.[1]),
  interleave: hdr.match(/^interleave\s*=\s*(\w+)/im)?.[1]?.toLowerCase(),
  byteOrder: Number(hdr.match(/^byte order\s*=\s*(\d+)/im)?.[1]),
  ignoreValue: Number(hdr.match(/^data ignore value\s*=\s*([\d.e+-]+)/im)?.[1]),
};
if (dims.dataType !== 4 || dims.interleave !== 'bsq' || dims.byteOrder !== 0) throw new Error(`Unexpected CRISM layout: ${JSON.stringify(dims)}`);
const bandBytes = dims.samples * dims.lines * 4;
const fileBytes = fs.statSync(imagePath).size;
if (fileBytes !== bandBytes * dims.bands) throw new Error(`Cube size ${fileBytes} != expected ${bandBytes * dims.bands}`);
if (!label.includes('UNIT              = "CORRECTED_I_OVER_F"')) throw new Error('CRISM label does not confirm corrected I/F');

const rows = fs.readFileSync(wavelengthPath, 'utf8').trim().split(/\r?\n/).map(line => line.split(',').map(Number));
const wavelengths = rows.map(([segment, band, wavelength, fwhm, quality]) => ({ segment, band, wavelengthNm: wavelength, fwhmNm: fwhm, quality }));
if (wavelengths.length !== dims.bands) throw new Error(`Wavelength rows ${wavelengths.length} != bands ${dims.bands}`);

const radius = 3394839.813316312;
const standardParallelDeg = 15;
const map = hdr.match(/map info\s*=\s*\{([^}]+)\}/i)?.[1].split(',').map(s => s.trim());
if (!map || map.length < 7) throw new Error('Missing ENVI map info');
const refSample = Number(map[1]), refLine = Number(map[2]), x0 = Number(map[3]), y0 = Number(map[4]), pixelX = Number(map[5]), pixelY = Number(map[6]);
const roverLat = 18.46194345, roverLon = 77.43610491;
const x = radius * Math.cos(standardParallelDeg * Math.PI / 180) * roverLon * Math.PI / 180;
const y = radius * roverLat * Math.PI / 180;
const centerCol = Math.round((refSample - 1) + (x - x0) / pixelX);
const centerRow = Math.round((refLine - 1) + (y0 - y) / pixelY);
if (centerCol < 1 || centerCol >= dims.samples - 1 || centerRow < 1 || centerRow >= dims.lines - 1) throw new Error(`Jezero coordinate outside CRISM image: row=${centerRow}, col=${centerCol}`);
const targetOffsets = [];
for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) targetOffsets.push((centerRow + dy) * dims.samples + centerCol + dx);

const fd = fs.openSync(imagePath, 'r');
const bandPlane = Buffer.allocUnsafe(bandBytes);
const spectrum = [];
let validSamples = 0, ignoredSamples = 0, nonFiniteSamples = 0;
let nearestValidPixel = null;
for (let i = 0; i < dims.bands; i++) {
  const bytesRead = fs.readSync(fd, bandPlane, 0, bandPlane.length, i * bandBytes);
  if (bytesRead !== bandBytes) throw new Error(`Short read in CRISM band ${i + 1}`);
  const samples = [];
  if (i === 199) {
    let bestDistanceSquared = Infinity;
    for (let pixel = 0; pixel < dims.samples * dims.lines; pixel++) {
      const value = bandPlane.readFloatLE(pixel * 4);
      if (!Number.isFinite(value) || value === dims.ignoreValue) continue;
      const row = Math.floor(pixel / dims.samples), col = pixel % dims.samples;
      const d2 = (row - centerRow) ** 2 + (col - centerCol) ** 2;
      if (d2 < bestDistanceSquared) {
        bestDistanceSquared = d2;
        const mapX = x0 + (col + 1 - refSample) * pixelX;
        const mapY = y0 - (row + 1 - refLine) * pixelY;
        nearestValidPixel = {
          line1Based: row + 1,
          sample1Based: col + 1,
          distancePixels: Math.sqrt(d2),
          approximateDistanceMeters: Math.sqrt(d2) * ((pixelX + pixelY) / 2),
          latitudePlanetocentricDeg: mapY / radius * 180 / Math.PI,
          longitudeEastDeg: mapX / (radius * Math.cos(standardParallelDeg * Math.PI / 180)) * 180 / Math.PI,
          checkedBand: 200,
          reflectance: value,
        };
      }
    }
  }
  for (const pixel of targetOffsets) {
    const value = bandPlane.readFloatLE(pixel * 4);
    if (!Number.isFinite(value)) { nonFiniteSamples++; continue; }
    if (value === dims.ignoreValue) { ignoredSamples++; continue; }
    samples.push(value);
  }
  validSamples += samples.length;
  const sorted = [...samples].sort((a, b) => a - b);
  const mean = samples.length ? samples.reduce((a, v) => a + v, 0) / samples.length : null;
  spectrum.push({
    band: i + 1,
    wavelengthNm: wavelengths[i].wavelengthNm,
    fwhmNm: wavelengths[i].fwhmNm,
    quality: wavelengths[i].quality,
    validPixels: samples.length,
    meanCorrectedIOverF: mean,
    medianCorrectedIOverF: sorted.length ? sorted[Math.floor((sorted.length - 1) / 2)] : null,
  });
}
fs.closeSync(fd);

const summary = {
  source: {
    productId,
    datasetId: 'MRO-M-CRISM-5-RDR-MPTARGETED-V1.0',
    instrument: 'MRO CRISM',
    productType: 'MTRDR corrected I/F spectral cube',
    observationUtc: observationTime ? (observationTime.endsWith('Z') ? observationTime : `${observationTime}Z`) : null,
    files: [path.basename(imagePath), path.basename(hdrPath), path.basename(labelPath), path.basename(wavelengthPath)],
  },
  raster: {
    ...dims,
    fileBytes,
    bandBytes,
    mapProjection: map[0],
    pixelSizeMeters: [pixelX, pixelY],
    roverCoordinate: { latitudePlanetocentricDeg: roverLat, longitudeEastDeg: roverLon },
    roverPixel1Based: { line: centerRow + 1, sample: centerCol + 1 },
    sampleWindow: '3x3 pixel neighborhood around the approximate Perseverance sol-400 location',
  },
  spectrum3x3: {
    targetWindowValidPixelFraction: validSamples / (dims.bands * targetOffsets.length),
    validBandPixelSamples: validSamples,
    ignoredBandPixelSamples: ignoredSamples,
    nonFiniteBandPixelSamples: nonFiniteSamples,
    wavelengths,
    spectrum,
  },
  nearbyCoverage: {
    nearestValidPixelInBand200: nearestValidPixel,
    note: 'A nearby valid sample is not substituted for the specified rover coordinate in any site-level interpretation.'
  },
  limitations: [
    'CRISM pixel is approximately 18 m while the rover coordinate is approximate; the 3x3 window is spatial context, not an exact rover-footprint match.',
    'The selected 3x3 window at the rover coordinate is entirely no-data in the cube; no CRISM spectrum is reported for that coordinate.',
    'Spectrum is a mean/median of corrected I/F in a local 3x3 window; no mineral identification or spectral unmixing is performed.',
    'The 489 spectral samples come from one targeted observation and are not directly comparable to Sentinel-2 reflectance values.'
  ]
};
const outPath = path.join(root, 'src', 'data', 'crismJezeroSummary.json');
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ outPath, roverPixel: summary.raster.roverPixel1Based, spectrumBands: spectrum.length, validBandPixelSamples: validSamples, ignoredBandPixelSamples: ignoredSamples, nonFiniteBandPixelSamples: nonFiniteSamples, spectrumPreview: spectrum.filter(x => [1000, 1400, 1900, 2300].some(w => Math.abs(x.wavelengthNm - w) < 5)) }, null, 2));
