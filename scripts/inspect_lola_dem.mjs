import fs from 'node:fs';
import path from 'node:path';

const file = 'DATA/Moon/LOLA/Site04_final_adj_5mpp_surf.tif';
const b = fs.readFileSync(file);
console.log('File size:', b.length);
console.log('TIFF Header:', b.subarray(0, 8));

const little = b[0] === 0x49;
const u16 = o => little ? b.readUInt16LE(o) : b.readUInt16BE(o);
const u32 = o => little ? b.readUInt32LE(o) : b.readUInt32BE(o);
const ifd = u32(4);
const n = u16(ifd);
console.log('IFD offset:', ifd, 'tags count:', n);

const tags = new Map();
const typeSize = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

for (let i = 0; i < n; i++) {
  const o = ifd + 2 + i * 12;
  const tag = u16(o), type = u16(o + 2), count = u32(o + 4);
  const size = typeSize[type] * count;
  const start = size <= 4 ? o + 8 : u32(o + 8);
  const values = [];
  for (let j = 0; j < Math.min(count, 10); j++) {
    const q = start + j * typeSize[type];
    if (type === 3) values.push(u16(q));
    else if (type === 4) values.push(u32(q));
    else if (type === 11) values.push(b.readFloatLE(q));
    else if (type === 12) values.push(b.readDoubleLE(q));
  }
  tags.set(tag, { tag, type, count, offset: start, values });
}

console.log('Width (256):', tags.get(256)?.values);
console.log('Height (257):', tags.get(257)?.values);
console.log('BitsPerSample (258):', tags.get(258)?.values);
console.log('Compression (259):', tags.get(259)?.values);
console.log('SampleFormat (339):', tags.get(339)?.values);
console.log('StripOffsets (273) count:', tags.get(273)?.count);
console.log('TileWidth (322):', tags.get(322)?.values);
console.log('TileOffsets (324) count:', tags.get(324)?.count);
