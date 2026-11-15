import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const root = 'C:/Users/fpaim/Desktop/Hackaton Nasa';
const csv = path.join(root, 'DATA', 'Mars', 'RIMFAX', 'sol400', 'rimfax_calibrated_00400.csv');
const xml = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'RIMFAX', 'sol400', 'rimfax_calibrated_00400.xml'), 'utf8');
const tag = (name) => xml.match(new RegExp(`<mars2020:${name}>([^<]+)</mars2020:${name}>`))?.[1] ?? null;
const rl = readline.createInterface({ input: fs.createReadStream(csv), crlfDelay: Infinity });
let header = null, rows = 0, validSamples = 0, blankSamples = 0, invalidSamples = 0;
let sampleMin = Infinity, sampleMax = -Infinity, sum = 0, sumSquares = 0;
let declaredSampleMin = Infinity, declaredSampleMax = -Infinity, coordinateRows = 0, activeSoundings = 0;
let latMin = Infinity, latMax = -Infinity, lonMin = Infinity, lonMax = -Infinity;
let dtMin = Infinity, dtMax = -Infinity, depthWindowMin = Infinity, depthWindowMax = -Infinity;
let perSoundingRmsMin = Infinity, perSoundingRmsMax = -Infinity;
let firstSamplePreview = null;
const recordTypes = Object.create(null);

for await (const line of rl) {
  const cells = line.split(',');
  if (!header) {
    header = cells;
    if (header.length !== 16474 || header[0] !== 'record_number') throw new Error(`Unexpected CSV header (${header.length} columns)`);
    continue;
  }
  if (!line) continue;
  rows++;
  const type = cells[1] || '(blank)';
  recordTypes[type] = (recordTypes[type] || 0) + 1;
  const declared = Number(cells[89]);
  if (type === '0') {
    activeSoundings++;
    const dt = Number(cells[85]), maxDepth = Number(cells[84]);
    if (Number.isFinite(dt) && dt > 0) { dtMin = Math.min(dtMin, dt); dtMax = Math.max(dtMax, dt); }
    if (Number.isFinite(maxDepth) && maxDepth > 0) { depthWindowMin = Math.min(depthWindowMin, maxDepth); depthWindowMax = Math.max(depthWindowMax, maxDepth); }
  }
  if (type === '0' && Number.isInteger(declared) && declared >= 0 && declared <= 16384) {
    declaredSampleMin = Math.min(declaredSampleMin, declared);
    declaredSampleMax = Math.max(declaredSampleMax, declared);
    let rowSquares = 0, rowSamples = 0;
    for (let i = 0; i < declared; i++) {
      const raw = cells[90 + i];
      if (raw === undefined || raw === '') { blankSamples++; continue; }
      const v = Number(raw);
      if (!Number.isFinite(v)) { invalidSamples++; continue; }
      validSamples++;
      if (v < sampleMin) sampleMin = v;
      if (v > sampleMax) sampleMax = v;
      sum += v;
      sumSquares += v * v;
      rowSquares += v * v;
      rowSamples++;
      if (!firstSamplePreview && validSamples < 20) firstSamplePreview = [];
      if (firstSamplePreview && firstSamplePreview.length < 16) firstSamplePreview.push(v);
    }
    if (rowSamples) {
      const rowRms = Math.sqrt(rowSquares / rowSamples);
      perSoundingRmsMin = Math.min(perSoundingRmsMin, rowRms);
      perSoundingRmsMax = Math.max(perSoundingRmsMax, rowRms);
    }
  }
  const lat = cells[27] === '' ? NaN : Number(cells[27]);
  const lon = cells[28] === '' ? NaN : Number(cells[28]);
  if (type === '0' && Number.isFinite(lat) && Number.isFinite(lon)) {
    coordinateRows++;
    latMin = Math.min(latMin, lat); latMax = Math.max(latMax, lat);
    lonMin = Math.min(lon, lonMin); lonMax = Math.max(lon, lonMax);
  }
  if (rows % 1000 === 0) console.log(`Scanned ${rows} CSV rows...`);
}

const expected = Number(xml.match(/<records>(\d+)<\/records>/)?.[1] ?? NaN);
const out = {
  source: 'PDS calibrated RIMFAX CSV, sol 400',
  csvBytes: fs.statSync(csv).size,
  csvDataRows: rows,
  pdsXmlDeclaredRecords: expected,
  recordCountMatchesXml: rows === expected,
  recordTypes,
  recordTypeMeaning: { '0': 'Active sounding, time-domain radar samples', '5': 'Housekeeping, no sample columns', '8': 'Calibration arrays, excluded from radar sample statistics' },
  activeSoundings,
  headerColumns: header.length,
  metadataFields: 90,
  sampleColumns: 16384,
  declaredSamplesPerRow: { min: declaredSampleMin, max: declaredSampleMax },
  sampleValues: {
    count: validSamples, blankWithinDeclaredLength: blankSamples, invalid: invalidSamples,
    min: sampleMin, max: sampleMax, mean: validSamples ? sum / validSamples : null,
    rms: validSamples ? Math.sqrt(sumSquares / validSamples) : null,
    perSoundingRmsRange: [perSoundingRmsMin, perSoundingRmsMax],
    firstValuesPreview: firstSamplePreview,
    units: 'PDS CDR calibrated ratio of received power to radiated power over each represented time increment; no depth conversion or cross-instrument normalization'
  },
  roverCoordinateRows: coordinateRows,
  roverLatitudeBounds: coordinateRows ? [latMin, latMax] : null,
  roverLongitudeBounds: coordinateRows ? [lonMin, lonMax] : null,
  product: { sol: tag('start_sol_number'), startUtc: tag('start_utc'), stopUtc: tag('stop_utc'),
    sampleTimeIncrementRange: [dtMin, dtMax], maxTimeDepthRange: [depthWindowMin, depthWindowMax] },
  limitation: 'Streaming summary of the sample values and metadata only. No radar stratigraphy, subsurface depth, or geology interpreted.'
};
const dest = path.join(root, 'src/data/rimfaxCalibratedStreamSummary.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`Wrote ${dest}`);
console.log(JSON.stringify({ rows, expected, recordTypes, validSamples, sampleMin, sampleMax, mean: out.sampleValues.mean, rms: out.sampleValues.rms, coordinateRows }, null, 2));
