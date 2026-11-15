import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : 'C:/Users/fpaim/Desktop/Hackaton Nasa';
const dtmFile = 'DTEEC_045994_1985_046060_1985_U01.IMG';
const orthoFile = 'ESP_046060_1985_RED_C_01_ORTHO.JP2';
const orthoLabelFile = 'ESP_046060_1985_RED_C_01_ORTHO.LBL';
const dtmPath = path.join(root, 'DATA', 'Mars', 'HiRISE', dtmFile);
const f = fs.openSync(dtmPath, 'r');
const prefix = Buffer.alloc(65536);
const nPrefix = fs.readSync(f, prefix, 0, prefix.length, 0);
const prefixText = prefix.toString('ascii', 0, nPrefix);
const end = prefixText.match(/^END\s*$/m);
if (!end) { fs.closeSync(f); throw new Error('PDS3 END marker missing from DTM image label'); }
const endOffset = end.index + end[0].length;
const label = prefixText.slice(0, endOffset);
const field = (name, text = label) => text.match(new RegExp(`^\\s*${name}\\s*=\\s*(?:"([^"]*)"|([^\\r\\n]+))`, 'mi'))?.slice(1).find(Boolean)?.trim().replace(/\s*<[^>]+>\s*$/, '') ?? null;
const num = (name, text = label) => { const x = Number(field(name, text)); return Number.isFinite(x) ? x : null; };
const recordBytes = num('RECORD_BYTES');
const imageRecord = Number(label.match(/^\s*\^IMAGE\s*=\s*(\d+)/mi)?.[1]);
const dataOffset = (imageRecord - 1) * recordBytes;
const lines = num('LINES');
const samples = num('LINE_SAMPLES');
const bands = num('BANDS') ?? 1;
const sampleBits = num('SAMPLE_BITS');
const bytesPerSample = sampleBits / 8;
const expectedSamples = lines * samples * bands;
const expectedBytes = expectedSamples * bytesPerSample;
const fileSize = fs.statSync(dtmPath).size;
if (recordBytes !== 26692 || sampleBits !== 32 || !Number.isInteger(expectedSamples) || dataOffset + expectedBytes > fileSize) {
  fs.closeSync(f);
  throw new Error(`Unexpected DTM layout: ${JSON.stringify({ recordBytes, imageRecord, lines, samples, sampleBits, dataOffset, expectedBytes, fileSize })}`);
}
const missing = Number.parseInt(field('MISSING_CONSTANT')?.match(/16#([0-9A-F]+)#/i)?.[1] ?? '0', 16) >>> 0;
const validMin = Number(field('VALID_MINIMUM'));
const validMax = Number(field('VALID_MAXIMUM'));
const chunkBytes = 8 * 1024 * 1024;
const buffer = Buffer.alloc(chunkBytes);
let offset = dataOffset, remaining = expectedBytes, validCount = 0, missingCount = 0, invalidCount = 0;
let min = Infinity, max = -Infinity, sum = 0;
while (remaining > 0) {
  const size = Math.min(buffer.length, remaining);
  const read = fs.readSync(f, buffer, 0, size, offset);
  if (read !== size) throw new Error(`Short read at ${offset}: ${read}/${size}`);
  for (let i = 0; i < size; i += 4) {
    const bits = buffer.readUInt32LE(i);
    if (bits === missing) { missingCount++; continue; }
    const value = buffer.readFloatLE(i);
    if (!Number.isFinite(value) || value < validMin || value > validMax) { invalidCount++; continue; }
    validCount++; sum += value;
    if (value < min) min = value;
    if (value > max) max = value;
  }
  offset += read; remaining -= read;
}
fs.closeSync(f);
const pp = (name) => num(name);
const imageMap = {
  minimumLatitude: pp('MINIMUM_LATITUDE'), maximumLatitude: pp('MAXIMUM_LATITUDE'),
  westernmostLongitude: pp('WESTERNMOST_LONGITUDE'), easternmostLongitude: pp('EASTERNMOST_LONGITUDE'),
  latitudeType: field('KEYWORD_LATITUDE_TYPE'), longitudeDirection: field('POSITIVE_LONGITUDE_DIRECTION'),
  projection: field('MAP_PROJECTION_TYPE'), mapScaleMetersPerPixel: pp('MAP_SCALE'),
  centerLatitude: pp('CENTER_LATITUDE'), centerLongitude: pp('CENTER_LONGITUDE')
};
const rimXml = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'RIMFAX', 'sol400', 'rimfax_calibrated_00400.xml'), 'utf8');
const rTag = (name) => rimXml.match(new RegExp(`<mars2020:${name}>([^<]+)</mars2020:${name}>`))?.[1] ?? null;
const rover = { minRoverLat: rTag('min_rover_lat'), maxRoverLat: rTag('max_rover_lat'),
  minRoverLon: rTag('min_rover_lon'), maxRoverLon: rTag('max_rover_lon') };
const contained = Number(rover.minRoverLat) >= imageMap.minimumLatitude && Number(rover.maxRoverLat) <= imageMap.maximumLatitude
  && Number(rover.minRoverLon) >= imageMap.westernmostLongitude && Number(rover.maxRoverLon) <= imageMap.easternmostLongitude;
const orthoLabel = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'HiRISE', orthoLabelFile), 'utf8');
const summary = {
  productId: field('PRODUCT_ID'), dataSetId: field('DATA_SET_ID'),
  sourceProducts: field('SOURCE_PRODUCT_ID'), rationale: field('RATIONALE_DESC'),
  dtmFile, dtmBytes: fileSize, labelEmbedded: true,
  dimensions: { lines, samples, bands, sampleBits, sampleType: field('SAMPLE_TYPE') },
  elevations: { count: validCount, missing: missingCount, invalidOrOutOfLabelRange: invalidCount,
    minM: min, maxM: max, meanM: validCount ? sum / validCount : null,
    verticalDatum: 'Mars 2000 equipotential surface',
    note: 'Pixel elevations decoded from 32-bit little-endian PC_REAL samples after the embedded PDS3 label.' },
  map: imageMap,
  rimfaxTrackBoundsNumericallyContained: contained,
  spatialNote: 'Both labels declare planetocentric latitude and east-positive longitude. Bounding-box containment is a coverage check; exact rover-to-DTM registration still needs coordinate reconciliation.',
  ortho: { file: orthoFile, labelFile: orthoLabelFile, bytes: fs.statSync(path.join(root, 'DATA', 'Mars', 'HiRISE', orthoFile)).size,
    productId: field('PRODUCT_ID', orthoLabel), mapScaleMetersPerPixel: num('MAP_SCALE', orthoLabel),
    dimensions: { lines: num('LINES', orthoLabel), samples: num('LINE_SAMPLES', orthoLabel), bands: num('BANDS', orthoLabel) } }
};
fs.writeFileSync(path.join(root, 'src/data/hiriseDtmSummary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
