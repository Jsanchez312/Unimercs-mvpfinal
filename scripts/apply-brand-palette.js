const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/test/html');
const files = fs.readdirSync(dir).filter((f) => /\.(html|css|js)$/.test(f));

const pairs = [
  ['#5B2EFF', '#1F3D36'],
  ['#5b2eff', '#1F3D36'],
  ['#4822D6', '#172F2A'],
  ['#C6FF3D', '#C8A96A'],
  ['#c6ff3d', '#C8A96A'],
  ['#F6F4FF', '#F4EFE6'],
  ['#E4E0F7', '#E2DBD0'],
  ['#6B6888', '#756F64'],
  ['#4A4668', '#756F64'],
  ['#565275', '#756F64'],
  ['#120E2B', '#16130F'],
  ['#1E1945', '#26211A'],
  ['#EFEAFF', '#E8EFE8'],
  ['#C4B9FC', '#D4C4A0'],
  ['#A4E816', '#C8A96A'],
  ['#9CD81E', '#B89958'],
  ['#8F8CA8', '#756F64'],
  ['#ECE8FC', '#E8EFE8'],
  ['#b4f026', '#B89958'],
  ['rgba(91, 46, 255', 'rgba(31, 61, 54'],
  ['rgba(91,46,255', 'rgba(31,61,54'],
  ['rgba(18, 14, 43', 'rgba(22, 19, 15'],
  ['rgba(18,14,43', 'rgba(22,19,15']
];

for (const file of files) {
  const full = path.join(dir, file);
  let text = fs.readFileSync(full, 'utf8');
  let next = text;
  for (const [from, to] of pairs) next = next.split(from).join(to);
  if (next !== text) {
    fs.writeFileSync(full, next);
    console.log('updated', file);
  }
}
