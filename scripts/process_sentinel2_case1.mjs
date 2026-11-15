import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve(process.argv[2] ?? 'C:/Users/fpaim/Desktop/Hackaton Nasa');
const dir = process.argv[3] ? path.resolve(process.argv[3]) : path.join(root, 'public', 'data', 'makgadikgadi_sentinel2_2026-11-12');
const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.tiff'));
const typeSize = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

function inspect(file) {
  const b = fs.readFileSync(path.join(dir, file));
  const little = b[0] === 0x49;
  const u16 = o => little ? b.readUInt16LE(o) : b.readUInt16BE(o);
  const u32 = o => little ? b.readUInt32LE(o) : b.readUInt32BE(o);
  const u64 = o => little ? Number(b.readBigUInt64LE(o)) : Number(b.readBigUInt64BE(o));
  const f32 = o => little ? b.readFloatLE(o) : b.readFloatBE(o);
  const f64 = o => little ? b.readDoubleLE(o) : b.readDoubleBE(o);
  const tags = new Map();
  const ifd = u32(4), n = u16(ifd);
  for (let i = 0; i < n; i++) {
    const o = ifd + 2 + i * 12, tag = u16(o), type = u16(o + 2), count = u32(o + 4);
    const size = typeSize[type] * count;
    const start = size <= 4 ? o + 8 : u32(o + 8);
    const values = [];
    for (let j = 0; j < count; j++) {
      const q = start + j * typeSize[type];
      if ([1, 2, 6, 7].includes(type)) values.push(b[q]);
      else if ([3, 8].includes(type)) values.push(u16(q));
      else if ([4, 9].includes(type)) values.push(u32(q));
      else if (type === 11) values.push(f32(q));
      else if (type === 12) values.push(f64(q));
      else if ([5, 10].includes(type)) values.push([u32(q), u32(q + 4)]);
      else if (type === 16) values.push(u64(q));
    }
    tags.set(tag, { type, count, values });
  }
  const one = id => tags.get(id)?.values?.[0];
  const width = one(256), height = one(257), bits = one(258), compression = one(259), sampleFormat = one(339);
  const inflate = (offset, length) => {
    const block = b.subarray(offset, offset + length);
    if (compression === 1) return block;
    if (compression === 8 || compression === 32946) {
      try { return zlib.inflateSync(block); }
      catch { return zlib.inflateRawSync(block); }
    }
    throw new Error(`Unsupported TIFF compression ${compression}`);
  };
  const vals = [];
  const pixels = new Float32Array(width * height);
  pixels.fill(Number.NaN);
  if (tags.has(324)) {
    const offsets = tags.get(324).values, byteCounts = tags.get(325).values;
    const tileWidth = tags.get(322).values[0], tileHeight = tags.get(323).values[0];
    const across = Math.ceil(width / tileWidth);
    for (let i = 0; i < offsets.length; i++) {
      const raw = inflate(offsets[i], byteCounts[i]);
      const tileX = i % across, tileY = Math.floor(i / across);
      const validW = Math.min(tileWidth, width - tileX * tileWidth);
      const validH = Math.min(tileHeight, height - tileY * tileHeight);
      for (let y = 0; y < validH; y++) for (let x = 0; x < validW; x++) {
        const o = (y * tileWidth + x) * 4, v = little ? raw.readFloatLE(o) : raw.readFloatBE(o);
        if (Number.isFinite(v)) {
          vals.push(v);
          pixels[(tileY * tileHeight + y) * width + tileX * tileWidth + x] = v;
        }
      }
    }
  } else {
    const offsets = tags.get(273)?.values ?? [], byteCounts = tags.get(279)?.values ?? [];
    for (let i = 0; i < offsets.length; i++) {
      const raw = inflate(offsets[i], byteCounts[i]);
      for (let o = 0; o + 4 <= raw.length; o += 4) {
        const v = little ? raw.readFloatLE(o) : raw.readFloatBE(o);
        if (Number.isFinite(v)) {
          vals.push(v);
          const row = Math.floor(o / 4 / width);
          const col = Math.floor((o / 4) % width);
          if (row < height) pixels[row * width + col] = v;
        }
      }
    }
  }
  vals.sort((a,b) => a-b);
  const sum = vals.reduce((a,v) => a+v, 0);
  const px = tags.get(33550)?.values ?? [];
  const tie = tags.get(33922)?.values ?? [];
  const west = tie[3], north = tie[4];
  return {
    file, fileBytes: b.length, width, height, bitsPerSample: bits, sampleFormat, compression,
    sampleCount: vals.length, min: vals[0], p05: vals[Math.floor((vals.length-1)*.05)],
    median: vals[Math.floor((vals.length-1)*.5)], p95: vals[Math.floor((vals.length-1)*.95)],
    max: vals.at(-1), mean: sum / vals.length,
    pixelScale: px, tiePoint: tie,
    boundsWgs84: { west, east: west + width*px[0], north, south: north - height*px[1] },
    pixels,
    hasGeoKeys: tags.has(34735), geoKeys: tags.get(34735)?.values ?? [], geoAscii: tags.get(34737)?.values ?? [],
  };
}

const inspected = files.map(inspect);
const first = inspected[0];
const trackPath = path.join(root, 'DATA', 'DATA', 'GPR Data', 'Day_2', 'topo_GPR06_day02_dat006.txt');
const trackRows = fs.readFileSync(trackPath, 'utf8').trim().split(/\r?\n/)
  .map(line => line.trim().split(/[\s,]+/).map(Number)).filter(row => row.length >= 2 && Number.isFinite(row[0]) && Number.isFinite(row[1]));
const { west, east, north, south } = first.boundsWgs84;
const inside = trackRows.filter(([lat, lon]) => lon >= west && lon <= east && lat >= south && lat <= north).length;
const quantileSummary = values => {
  const sorted = [...values].sort((a, b) => a - b);
  const q = p => sorted[Math.floor((sorted.length - 1) * p)];
  return sorted.length ? { count: sorted.length, min: sorted[0], p05: q(.05), median: q(.5), p95: q(.95), max: sorted.at(-1), mean: sorted.reduce((a, v) => a + v, 0) / sorted.length } : null;
};
const reflectanceOnTrack = Object.fromEntries(inspected.map(f => [f.file.match(/_(B\d{2})_\(Raw\)/)?.[1], []]));
const uniqueTrackPixels = new Set();
const ndviOnTrack = [], ndwiOnTrack = [];
let validTrackSamples = 0;
for (const [lat, lon] of trackRows) {
  const col = Math.round((lon - west) / first.pixelScale[0] - 0.5);
  const row = Math.round((north - lat) / first.pixelScale[1] - 0.5);
  if (row < 0 || col < 0 || row >= first.height || col >= first.width) continue;
  const index = row * first.width + col;
  const sample = Object.fromEntries(inspected.map(f => [f.file.match(/_(B\d{2})_\(Raw\)/)?.[1], f.pixels[index]]));
  if (Object.values(sample).some(v => !Number.isFinite(v))) continue;
  validTrackSamples++;
  uniqueTrackPixels.add(index);
  for (const [band, values] of Object.entries(reflectanceOnTrack)) values.push(sample[band]);
  const ndviDenominator = sample.B08 + sample.B04;
  const ndwiDenominator = sample.B03 + sample.B08;
  if (ndviDenominator !== 0) ndviOnTrack.push((sample.B08 - sample.B04) / ndviDenominator);
  if (ndwiDenominator !== 0) ndwiOnTrack.push((sample.B03 - sample.B08) / ndwiDenominator);
}
const summary = {
  source: {
    provider: 'Copernicus Data Space Ecosystem Browser',
    collection: 'Sentinel-2 L2A',
    observationDate: '2026-11-12',
    exportedFiles: inspected.map(f => f.file),
    productNote: 'Raw band exports, TIFF float32, WGS 84 (EPSG:4326).'
  },
  raster: {
    width: first.width,
    height: first.height,
    bitsPerSample: first.bitsPerSample,
    sampleFormat: 'IEEE floating point',
    coordinateReferenceSystem: 'EPSG:4326',
    pixelScaleDegrees: first.pixelScale.slice(0, 2),
    approximatePixelSizeMeters: [
      first.pixelScale[0] * 111320 * Math.cos(Math.abs((north + south) / 2) * Math.PI / 180),
      first.pixelScale[1] * 111320
    ],
    boundsWgs84: first.boundsWgs84
  },
  profileCoverage: {
    profile: 'GPR06, topo_GPR06_day02_dat006.txt',
    trackPoints: trackRows.length,
    pointsInsideRaster: inside,
    coveragePercent: 100 * inside / trackRows.length,
    caveat: inside === trackRows.length ? 'All sampled GPR06 track points fall inside the exported raster.' : 'The clipped export does not contain the complete field profile.'
  },
  profileSpectralSummary: {
    profile: 'GPR06, topo_GPR06_day02_dat006.txt',
    gpsPoints: trackRows.length,
    pointsWithRasterSamples: validTrackSamples,
    uniqueRasterPixels: uniqueTrackPixels.size,
    method: 'Nearest exported pixel at each GPS coordinate; repeated GPS records can map to the same raster cell.',
    reflectanceByBand: Object.fromEntries(Object.entries(reflectanceOnTrack).map(([band, values]) => [band, quantileSummary(values)])),
    spectralIndices: {
      ndvi: quantileSummary(ndviOnTrack),
      ndwiMcfeeters: quantileSummary(ndwiOnTrack)
    },
    interpretationLimit: 'Spectral summaries and indices describe this scene along the sampled track; they do not establish mineralogy, paleo-water, or analog similarity.'
  },
  bands: Object.fromEntries(inspected.map(f => {
    const band = f.file.match(/_(B\d{2})_\(Raw\)/)?.[1] ?? f.file;
    return [band, {
      validPixels: f.sampleCount,
      minReflectance: f.min,
      p05Reflectance: f.p05,
      medianReflectance: f.median,
      p95Reflectance: f.p95,
      maxReflectance: f.max,
      meanReflectance: f.mean,
      units: 'unitless surface reflectance as exported'
    }];
  })),
  caveats: [
    'The Browser resampled all exported bands onto a common grid; B11 and B12 are natively 20 m and are represented on the approximately 9.4 m export grid.',
    'This is one observation date and a small crop, not a seasonally matched or full-site mosaic.',
    'No similarity score or geological classification is inferred from these band summaries.'
  ]
};
const out = process.argv[4] ? path.resolve(process.argv[4]) : path.join(root, 'src', 'data', 'sentinel2Case1Summary.json');
fs.writeFileSync(out, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
