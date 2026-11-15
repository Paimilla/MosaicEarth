import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const readText = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const parseNums = (p) => readText(p).trim().split(/\r?\n/).map(line => line.trim().split(/[\s,]+/).map(Number));
const quantiles = (values) => {
  const a = [...values].sort((x, y) => x - y);
  const q = (p) => a[Math.floor((a.length - 1) * p)];
  return { min: a[0], p05: q(.05), median: q(.5), p95: q(.95), max: a.at(-1) };
};

function readHgt(tile) {
  const b = fs.readFileSync(path.join(root, 'DATA', 'Earth', 'SRTM', `${tile}.SRTMGL1.hgt`, `${tile}.hgt`));
  if (b.length !== 3601 * 3601 * 2) throw new Error(`${tile}: unexpected HGT size ${b.length}`);
  return b;
}
const hgt = { S21E024: readHgt('S21E024'), S21E025: readHgt('S21E025') };
function hgtValue(lat, lon) {
  const south = Math.floor(lat), west = Math.floor(lon);
  const tile = `S${String(Math.abs(south)).padStart(2, '0')}E${String(west).padStart(3, '0')}`;
  const b = hgt[tile];
  if (!b) throw new Error(`No loaded HGT tile for ${lat}, ${lon}`);
  const row = Math.round((south + 1 - lat) * 3600);
  const col = Math.round((lon - west) * 3600);
  return b.readInt16BE((row * 3601 + col) * 2);
}
function hgtSlopeDegrees(lat, lon) {
  const south = Math.floor(lat), west = Math.floor(lon);
  const tile = `S${String(Math.abs(south)).padStart(2, '0')}E${String(west).padStart(3, '0')}`;
  const b = hgt[tile];
  const row = Math.round((south + 1 - lat) * 3600), col = Math.round((lon - west) * 3600);
  const z = (dy, dx) => b.readInt16BE((((row + dy) * 3601) + col + dx) * 2);
  const dzdx = ((z(-1, 1) + 2*z(0, 1) + z(1, 1)) - (z(-1, -1) + 2*z(0, -1) + z(1, -1))) / (8 * 30.9 * Math.cos(lat * Math.PI / 180));
  const dzdy = ((z(1, -1) + 2*z(1, 0) + z(1, 1)) - (z(-1, -1) + 2*z(-1, 0) + z(-1, 1))) / (8 * 30.9);
  return Math.atan(Math.hypot(dzdx, dzdy)) * 180 / Math.PI;
}
function hgtStats(b) {
  let n = 0, sum = 0, min = Infinity, max = -Infinity, voids = 0;
  for (let i = 0; i < b.length; i += 2) {
    const v = b.readInt16BE(i);
    if (v === -32768) { voids++; continue; }
    n++; sum += v; if (v < min) min = v; if (v > max) max = v;
  }
  return { rows: 3601, cols: 3601, validCells: n, voidCells: voids, minM: min, meanM: sum / n, maxM: max };
}
const tracks = ['topo_GPR06_day02_dat006.txt', 'topo_RM4_GPR6_DAT_0006.txt'].map(name => {
  const rows = parseNums(`DATA/DATA/GPR Data/Day_2/${name}`);
  const deltas = rows.map(([lat, lon, fieldElevation]) => ({ fieldElevation, srtm: hgtValue(lat, lon) }));
  const diffs = deltas.map(x => x.srtm - x.fieldElevation);
  const absDiffs = diffs.map(Math.abs);
  const slopes = rows.map(([lat, lon]) => hgtSlopeDegrees(lat, lon));
  return {
    file: name, points: rows.length,
    latitude: quantiles(rows.map(r => r[0])), longitude: quantiles(rows.map(r => r[1])),
    fieldElevationM: quantiles(rows.map(r => r[2])), nearestSrtmElevationM: quantiles(deltas.map(r => r.srtm)),
    nearestSrtmSlopeDegrees: quantiles(slopes),
    srtmMinusFieldMeanM: diffs.reduce((a, x) => a + x, 0) / diffs.length,
    srtmVsFieldMeanAbsoluteDifferenceM: absDiffs.reduce((a, x) => a + x, 0) / absDiffs.length,
    caveat: 'Nearest 1-arcsecond cell; vertical datums and instrument uncertainty not reconciled.'
  };
});

const mola = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'MOLA', 'megt90n000eb.img'));
if (mola.length !== 5760 * 2880 * 2) throw new Error(`Unexpected MOLA size ${mola.length}`);
const molaTile = readText('DATA/Mars/MOLA/megt90n000eb.hdr');
const jezeroLat = 18.46194345, jezeroLon = 77.43610491;
const mr = Math.round((90 - jezeroLat) * 16), mc = Math.round(jezeroLon * 16);
const jezeroMolaNeighborhood = [];
for (let r = mr - 1; r <= mr + 1; r++) for (let c = mc - 1; c <= mc + 1; c++) jezeroMolaNeighborhood.push(mola.readInt16BE((r * 5760 + c) * 2));
const molaAt = (r, c) => mola.readInt16BE((r * 5760 + c) * 2);
const molaDx = 3704.4613374 * Math.cos(jezeroLat * Math.PI / 180), molaDy = 3704.4613374;
const molaDzdx = ((molaAt(mr-1,mc+1)+2*molaAt(mr,mc+1)+molaAt(mr+1,mc+1))-(molaAt(mr-1,mc-1)+2*molaAt(mr,mc-1)+molaAt(mr+1,mc-1)))/(8*molaDx);
const molaDzdy = ((molaAt(mr+1,mc-1)+2*molaAt(mr+1,mc)+molaAt(mr+1,mc+1))-(molaAt(mr-1,mc-1)+2*molaAt(mr-1,mc)+molaAt(mr-1,mc+1)))/(8*molaDy);
const molaSlope = Math.atan(Math.hypot(molaDzdx,molaDzdy))*180/Math.PI;
let molaMin = Infinity, molaMax = -Infinity, molaSum = 0, molaCount = 0;
for (let i = 0; i < mola.length; i += 2) { const v = mola.readInt16BE(i); molaCount++; molaSum += v; if (v < molaMin) molaMin = v; if (v > molaMax) molaMax = v; }

const rimfaxXml = readText('DATA/Mars/RIMFAX/sol400/rimfax_calibrated_00400.xml');
const tag = (name) => rimfaxXml.match(new RegExp(`<mars2020:${name}>([^<]+)</mars2020:${name}>`))?.[1] ?? null;
const rimfax = {
  xmlFile: 'rimfax_calibrated_00400.xml', csvFile: 'rimfax_calibrated_00400.csv',
  csvBytes: fs.statSync(path.join(root, 'DATA/Mars/RIMFAX/sol400/rimfax_calibrated_00400.csv')).size,
  pdsRecords: Number(rimfaxXml.match(/<records>(\d+)<\/records>/)?.[1] ?? 0),
  pdsFields: Number(rimfaxXml.match(/<fields>(\d+)<\/fields>/)?.[1] ?? 0),
  sol: tag('start_sol_number'), startUtc: tag('start_utc'), stopUtc: tag('stop_utc'),
  minRoverLat: tag('min_rover_lat'), maxRoverLat: tag('max_rover_lat'),
  minRoverLon: tag('min_rover_lon'), maxRoverLon: tag('max_rover_lon'),
  notes: 'CSV contains calibrated RIMFAX samples; travel time is not depth without dielectric/velocity assumptions.'
};

const ert = ['line A_xyz.dat', 'Line B_xyz.dat'].map(file => {
  const raw = fs.readFileSync(path.join(root, 'DATA/DATA/ERT Data', file));
  const text = raw[0] === 0xff && raw[1] === 0xfe ? raw.toString('utf16le').replace(/^\uFEFF/, '') : raw.toString('utf8');
  const rows = text.trim().split(/\r?\n/).slice(1)
    .map(line => line.trim().split(/[\s,]+/).map(Number))
    .filter(row => row.length >= 3 && row.slice(0, 3).every(Number.isFinite));
  const col = (i) => rows.map(r => r[i]);
  return { file, rows: rows.length, columns: rows[0]?.length ?? 0,
    xRange: rows.length ? [Math.min(...col(0)), Math.max(...col(0))] : null,
    yRange: rows.length ? [Math.min(...col(1)), Math.max(...col(1))] : null,
    log10ResistivityRange: rows.length ? [Math.min(...col(2)), Math.max(...col(2))] : null,
    medianLog10Resistivity: rows.length ? quantiles(col(2)).median : null,
    coordinateNote: 'Coordinates in supplied XYZ table are not geographic lat/lon; do not map until CRS/registration is documented.' };
});

function ibmFloat(b, offset) {
  const word = b.readUInt32BE(offset), sign = (word >>> 31) ? -1 : 1;
  const exponent = ((word >>> 24) & 0x7f) - 64;
  const fraction = (word & 0x00ffffff) / 0x01000000;
  return sign * fraction * Math.pow(16, exponent);
}

const segyFiles = [];
for (const day of ['Day_1/Rawdata', 'Day_2/Raw', 'Day_3/Raw', 'Day_4/Raw']) {
  const dir = path.join(root, 'DATA/DATA/GPR Data', day);
  for (const name of fs.readdirSync(dir).filter(n => n.toUpperCase().endsWith('.SGY'))) {
    const p = path.join(dir, name), fd = fs.openSync(p, 'r'), h = Buffer.alloc(3600);
    fs.readSync(fd, h, 0, h.length, 0); fs.closeSync(fd);
    const format = h.readUInt16BE(3224), samplesPerTrace = h.readUInt16BE(3220), sampleIntervalUs = h.readUInt16BE(3216);
    const bytesPerSample = ({1:4,2:4,3:2,5:4,8:1})[format] ?? null;
    const traceBytes = bytesPerSample ? 240 + samplesPerTrace * bytesPerSample : null;
    const size = fs.statSync(p).size;
    const data = fs.readFileSync(p), traceCount = Math.floor((size - 3600) / traceBytes);
    let sampleCount = 0, sum = 0, sumSquares = 0, min = Infinity, max = -Infinity, peakAbs = 0, nonFinite = 0;
    for (let t = 0; t < traceCount; t++) {
      const base = 3600 + t * traceBytes + 240;
      for (let s = 0; s < samplesPerTrace; s++) {
        const off = base + s * bytesPerSample;
        const value = format === 1 ? ibmFloat(data, off) : format === 3 ? data.readInt16BE(off) : format === 5 ? data.readFloatBE(off) : format === 2 ? data.readInt32BE(off) : data.readInt8(off);
        if (!Number.isFinite(value)) { nonFinite++; continue; }
        sampleCount++; sum += value; sumSquares += value * value; if (value < min) min = value; if (value > max) max = value; if (Math.abs(value) > peakAbs) peakAbs = Math.abs(value);
      }
    }
    segyFiles.push({ file: `${day}/${name}`, bytes: size, sampleIntervalUs, samplesPerTrace, formatCode: format,
      inferredTraceCount: traceCount,
      exactTraceLayout: traceBytes ? (size - 3600) % traceBytes === 0 : false,
      decodedAmplitudeSamples: sampleCount, amplitudeMin: min, amplitudeMax: max, amplitudeMean: sum / sampleCount,
      amplitudeRms: Math.sqrt(sumSquares / sampleCount), amplitudePeakAbsolute: peakAbs, nonFiniteSamples: nonFinite,
      note: 'SEG-Y sample amplitudes decoded according to binary format code; gains, time units, and physical interpretation not normalized.' });
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  earthSrtm: Object.fromEntries(Object.entries(hgt).map(([name, b]) => [name, hgtStats(b)])),
  gpsTrackChecksAgainstSrtm: tracks,
  marsMola: { image: 'DATA/Mars/MOLA/megt90n000eb.img', bytes: mola.length, lines: 2880, samplesPerLine: 5760,
    globalRawMinM: molaMin, globalRawMaxM: molaMax, globalRawMeanM: molaSum / molaCount,
    jezeroApproxLatLon: [jezeroLat, jezeroLon], jezero3x3MolaElevationsM: jezeroMolaNeighborhood,
    jezero3x3MeanM: jezeroMolaNeighborhood.reduce((a, x) => a + x, 0) / jezeroMolaNeighborhood.length,
    jezeroApproxSlopeDegrees: molaSlope,
    resolution: '16 pixels/degree; regional context only', header: molaTile.split(/\r?\n/).slice(0, 10) },
  rimfax,
  rimfaxStream: JSON.parse(fs.readFileSync(path.join(root, 'src/data/rimfaxCalibratedStreamSummary.json'), 'utf8')),
  ctxImage: fs.existsSync(path.join(root, 'src/data/ctxImageSummary.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'src/data/ctxImageSummary.json'), 'utf8')) : null,
  hiriseDtm: fs.existsSync(path.join(root, 'src/data/hiriseDtmSummary.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'src/data/hiriseDtmSummary.json'), 'utf8')) : null,
  sentinel2Case1: fs.existsSync(path.join(root, 'src/data/sentinel2Case1Summary.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'src/data/sentinel2Case1Summary.json'), 'utf8')) : null,
  crismJezero: fs.existsSync(path.join(root, 'src/data/crismJezeroSummary.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'src/data/crismJezeroSummary.json'), 'utf8')) : null,
  ert,
  segyFiles,
  scoreStatus: 'No similarity score calculated: collected products differ in instrument, resolution, physical quantities, and normalization is not established.'
};
const out = path.join(root, 'src/data/processedCase1Summary.json');
fs.writeFileSync(out, JSON.stringify(summary, null, 2));
console.log(out);
