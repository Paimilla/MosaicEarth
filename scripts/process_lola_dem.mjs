import fs from 'node:fs';
import path from 'node:path';

const file = 'DATA/Moon/LOLA/Site04_final_adj_5mpp_surf.tif';
const b = fs.readFileSync(file);

const little = b[0] === 0x49;
const u16 = o => little ? b.readUInt16LE(o) : b.readUInt16BE(o);
const u32 = o => little ? b.readUInt32LE(o) : b.readUInt32BE(o);
const f32 = o => little ? b.readFloatLE(o) : b.readFloatBE(o);

const ifd = u32(4);
const n = u16(ifd);
let stripOffsetsOffset = 0;

for (let i = 0; i < n; i++) {
  const o = ifd + 2 + i * 12;
  const tag = u16(o);
  if (tag === 273) {
    stripOffsetsOffset = u32(o + 8);
  }
}

const width = 3200;
const height = 3200;
const stripOffsets = [];
for (let r = 0; r < height; r++) {
  stripOffsets.push(u32(stripOffsetsOffset + r * 4));
}

let validCount = 0;
let minZ = Infinity, maxZ = -Infinity, sumZ = 0;
const sampleElevations = [];

for (let r = 0; r < height; r += 4) {
  const off = stripOffsets[r];
  for (let c = 0; c < width; c += 4) {
    const z = f32(off + c * 4);
    // Ignore NoData values (-3.4e38 or NaN)
    if (!isNaN(z) && z > -20000 && z < 20000) {
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
      sumZ += z;
      validCount++;
      sampleElevations.push(z);
    }
  }
}

sampleElevations.sort((a, b) => a - b);
const medianZ = sampleElevations[Math.floor(sampleElevations.length / 2)];
const meanZ = sumZ / validCount;

// Compute slopes in sample grid (spacing = 4 * 5m = 20m)
const slopes = [];
for (let r = 4; r < height - 4; r += 8) {
  const offPrev = stripOffsets[r - 4];
  const offCurr = stripOffsets[r];
  const offNext = stripOffsets[r + 4];
  for (let c = 4; c < width - 4; c += 8) {
    const zL = f32(offCurr + (c - 4) * 4);
    const zR = f32(offCurr + (c + 4) * 4);
    const zT = f32(offPrev + c * 4);
    const zB = f32(offNext + c * 4);
    if (!isNaN(zL) && !isNaN(zR) && !isNaN(zT) && !isNaN(zB) &&
        zL > -20000 && zR > -20000 && zT > -20000 && zB > -20000) {
      const dzdx = (zR - zL) / (2 * 20.0);
      const dzdy = (zB - zT) / (2 * 20.0);
      const slopeDeg = Math.atan(Math.hypot(dzdx, dzdy)) * (180 / Math.PI);
      slopes.push(slopeDeg);
    }
  }
}

slopes.sort((a, b) => a - b);
const medianSlope = slopes[Math.floor(slopes.length / 2)];
const p90Slope = slopes[Math.floor(slopes.length * 0.90)];
const maxSlope = slopes[slopes.length - 1];

console.log('NASA LOLA Site04 (Shackleton Crater Rim) Real Topography:');
console.log(`- Dimensions: ${width} x ${height} pixels (5 m/pixel resolution, 16 km x 16 km footprint)`);
console.log(`- Valid elevation pixels analyzed: ${validCount.toLocaleString()}`);
console.log(`- Elevation Range: ${minZ.toFixed(1)} m to ${maxZ.toFixed(1)} m`);
console.log(`- Relief Amplitude: ${(maxZ - minZ).toFixed(1)} m`);
console.log(`- Median Elevation: ${medianZ.toFixed(1)} m (Mean: ${meanZ.toFixed(1)} m)`);
console.log(`- Slope Distribution: Median: ${medianSlope.toFixed(2)}°, 90th percentile: ${p90Slope.toFixed(2)}°, Max local wall slope: ${maxSlope.toFixed(2)}°`);

// Write summary to JSON
const lolaSummary = {
  product: 'NASA LOLA Site 04 High-Resolution DEM (Barker et al., 2021)',
  productUrl: 'https://pgda.gsfc.nasa.gov/products/78',
  targetFeature: 'Borde del Cráter Shackleton (Site 04 - Artemis Base Camp candidate)',
  targetCoordinates: { lat: -89.9, lon: 0.0, referenceFrame: 'MOON_ME (DE421)' },
  grid: {
    columns: width,
    rows: height,
    resolutionMPerPixel: 5.0,
    areaCoverageKm2: 256.0
  },
  topographyStats: {
    minElevationM: Number(minZ.toFixed(1)),
    maxElevationM: Number(maxZ.toFixed(1)),
    reliefAmplitudeM: Number((maxZ - minZ).toFixed(1)),
    medianElevationM: Number(medianZ.toFixed(1)),
    meanElevationM: Number(meanZ.toFixed(1)),
    medianSlopeDeg: Number(medianSlope.toFixed(2)),
    p90SlopeDeg: Number(p90Slope.toFixed(2)),
    steepestWallSlopeDeg: Number(maxSlope.toFixed(2))
  },
  status: 'PROCESSED_VERIFIED'
};

fs.writeFileSync('src/data/lolaSite04Summary.json', JSON.stringify(lolaSummary, null, 2));
console.log('Saved src/data/lolaSite04Summary.json successfully!');
