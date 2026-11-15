import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] ? path.resolve(process.argv[2]) : 'C:/Users/fpaim/Desktop/Hackaton Nasa';
const imageFile = 'D14_032794_1989_XN_18N282W.tiff';
const headerFile = 'D14_032794_1989_XN_18N282W.isis.hdr';
const imagePath = path.join(root, 'DATA', 'Mars', 'CTX', imageFile);
const header = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'CTX', headerFile), 'utf8');
const field = (name) => {
  const value = header.match(new RegExp(`^\\s*${name}\\s*=\\s*([^\\r\\n]+)`, 'm'))?.[1]?.trim();
  if (!value) return null;
  return value.replace(/\s*<[^>]+>\s*$/, '').replace(/^"|"$/g, '');
};
const num = (name) => { const v = Number(field(name)); return Number.isFinite(v) ? v : null; };
const rimXml = fs.readFileSync(path.join(root, 'DATA', 'Mars', 'RIMFAX', 'sol400', 'rimfax_calibrated_00400.xml'), 'utf8');
const rTag = (name) => rimXml.match(new RegExp(`<mars2020:${name}>([^<]+)</mars2020:${name}>`))?.[1] ?? null;
const rim = { minRoverLat: rTag('min_rover_lat'), maxRoverLat: rTag('max_rover_lat'),
  minRoverLon: rTag('min_rover_lon'), maxRoverLon: rTag('max_rover_lon') };
const minLat = num('MinimumLatitude'), maxLat = num('MaximumLatitude');
const minLon = num('MinimumLongitude'), maxLon = num('MaximumLongitude');
const minRimLat = Number(rim.minRoverLat), maxRimLat = Number(rim.maxRoverLat);
const minRimLon = Number(rim.minRoverLon), maxRimLon = Number(rim.maxRoverLon);
const boundsContainRimfaxBbox = [minRimLat, maxRimLat, minRimLon, maxRimLon].every(Number.isFinite)
  && minRimLat >= minLat && maxRimLat <= maxLat && minRimLon >= minLon && maxRimLon <= maxLon;
const fd = fs.openSync(imagePath, 'r');
const signature = Buffer.alloc(4);
fs.readSync(fd, signature, 0, 4, 0);
fs.closeSync(fd);
const signatureHex = signature.toString('hex');
if (!['49492a00', '4d4d002a'].includes(signatureHex)) throw new Error(`Not a TIFF file: ${signatureHex}`);
const result = {
  productId: field('ProductId'),
  productType: field('ProductTypeId') ?? 'CTX EDR-derived pyramized GeoTIFF (ASU Mars Image Explorer)',
  spacecraft: field('SpacecraftName'), instrument: field('InstrumentId'), target: field('TargetName'),
  observationStart: field('StartTime'), orbit: Number(field('OrbitNumber')),
  imageFile, imageBytes: fs.statSync(imagePath).size, imageFormat: 'TIFF', tiffSignature: signatureHex,
  headerFile,
  samples: num('Samples'), lines: num('Lines'), bands: num('Bands'),
  projection: field('ProjectionName'), pixelResolutionM: num('PixelResolution'),
  footprint: { minLatitude: minLat, maxLatitude: maxLat, minLongitude: minLon, maxLongitude: maxLon,
    latitudeType: field('LatitudeType'), longitudeDirection: field('LongitudeDirection'), longitudeDomain: num('LongitudeDomain') },
  rimfaxTrackBoundsNumericallyContained: boundsContainRimfaxBbox,
  spatialNote: 'Footprint/header latitude is planetocentric. RIMFAX XML rover latitude convention is not yet reconciled; numerical containment is a coverage check, not a precise reprojection.',
  displayNote: 'Derived CTX orbital context image; observation date differs from the rover sol 400 traverse.'
};
fs.writeFileSync(path.join(root, 'src/data/ctxImageSummary.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
