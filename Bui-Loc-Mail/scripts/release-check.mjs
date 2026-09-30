import fs from 'node:fs';
const must = [
  ['public/modern.css','Bui Loc Mail V1 — Dedicated Compose Workspace'],
  ['public/v5.js','v7-compose-brand'],
  ['src/index.js','async email(message,env,ctx)'],
  ['src/index.js','inbound_events'],
  ['wrangler.jsonc','"PRIMARY_MAILBOX": "lienhe@builoc.name.vn"'],
  ['wrangler.jsonc','"bucket_name": "mail"'],
];
for (const [file,needle] of must) {
  const text=fs.readFileSync(file,'utf8');
  if(!text.includes(needle)) throw new Error(`${file}: thiếu ${needle}`);
}
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
if(pkg.version!=='1.0.0') throw new Error('Phiên bản release phải là 1.0.0');
for (const file of ['public/app.js','public/v5.js','public/v7.js','public/modern.css','src/index.js']) {
  const text=fs.readFileSync(file,'utf8').toLowerCase();
  if(text.includes('sky first mail') || text.includes('sky-first-mail')) throw new Error(`${file}: còn thương hiệu mail cũ`);
}
console.log('Bui Loc Mail V1 release check: PASS');
