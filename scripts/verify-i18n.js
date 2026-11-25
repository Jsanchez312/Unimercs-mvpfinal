const fs = require('fs');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const root = 'src/test/html';
const expectations = {
  'index.html': ['Sell the textbook.', 'Start selling', 'Clear out your room.', 'Explore popular categories', 'Today’s highlights', 'Verified students only'],
  'how-it-works.html': ['How unimercs works', 'Register with your institutional email', 'Smart search and filters', 'Safe handover'],
  'safezones.html': ['Safe meetup points on campus', 'Recommended only'],
  'explore.html': ['Explore', 'Find what other students no longer use on campus.', 'Filters', 'SORT:'],
  'profile.html': ['VERIFIED STUDENT', 'Loading...', 'Edit profile', 'Active listings'],
  'product-detail.html': ['SUGGESTED SAFE POINT', 'More like this', 'Contact seller']
};

for (const [file, required] of Object.entries(expectations)) {
  const dom = new JSDOM(fs.readFileSync(`${root}/${file}`, 'utf8'), {
    url: `http://localhost:5000/${file}`,
    runScripts: 'outside-only'
  });
  const context = dom.getInternalVMContext();
  vm.runInContext(fs.readFileSync(`${root}/site.js`, 'utf8'), context);
  const active = file === 'index.html' ? 'home' : file === 'explore.html' ? 'explore' : '';
  vm.runInContext(`UniMercs.mount('${active}'); UniMercs.setLanguage('en');`, context);
  const text = dom.window.document.body.textContent.replace(/\s+/g, ' ');
  const missing = required.filter(value => !text.includes(value));
  if (missing.length) throw new Error(`${file}: missing ${missing.join(', ')}`);
}

console.log('i18n interface verification passed');
