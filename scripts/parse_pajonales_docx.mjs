import fs from 'node:fs';

const xml = fs.readFileSync('DATA/Earth/Pajonales/extracted/word/document.xml', 'utf8');
const clean = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('Length:', clean.length);
console.log('Sample:', clean.substring(0, 1500));

// Search for keywords
const keywords = ['ATA17', 'XRD', 'gypsum', 'halite', 'temperature', 'humidity', 'Table'];
for (const kw of keywords) {
  let idx = 0;
  let matches = [];
  while ((idx = clean.indexOf(kw, idx)) !== -1 && matches.length < 5) {
    matches.push(clean.substring(Math.max(0, idx - 40), Math.min(clean.length, idx + 80)));
    idx += kw.length;
  }
  console.log(`\n--- Keyword "${kw}" (${matches.length} matches) ---`);
  matches.forEach((m, i) => console.log(`  [${i+1}] ...${m}...`));
}
