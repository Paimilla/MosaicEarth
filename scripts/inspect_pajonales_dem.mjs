import fs from 'node:fs';

const file = 'DATA/Earth/Pajonales/s26_w069_1arc_v3.tif';
const b = fs.readFileSync(file);
const little = b[0] === 0x49;
const u16 = o => little ? b.readUInt16LE(o) : b.readUInt16BE(o);
const u32 = o => little ? b.readUInt32LE(o) : b.readUInt32BE(o);
const ifd = u32(4);
const n = u16(ifd);

for (let i = 0; i < n; i++) {
  const o = ifd + 2 + i * 12;
  const tag = u16(o), type = u16(o + 2), count = u32(o + 4);
  const val = count === 1 ? (type === 3 ? u16(o + 8) : u32(o + 8)) : `offset ${u32(o+8)} (count ${count})`;
  console.log(`Tag ${tag}: ${val}`);
}
