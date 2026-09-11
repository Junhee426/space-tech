import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('dist/data.js','utf8'),ctx);
const d=ctx.window.ATLAS;
const ids=new Set(d.entities.map(e=>e.id));
const sources=new Set(d.sources.map(s=>s.id));
assert.equal(ids.size,d.entities.length,'duplicate entity IDs');
assert.equal(sources.size,d.sources.length,'duplicate source IDs');
assert.equal(d.entities.filter(e=>e.type==='mission').length,10);
for(const e of d.entities){assert(e.sources.length,e.id+' lacks sources');for(const id of e.sources)assert(sources.has(id),id);assert(d.fields.some(f=>f.id===e.field));assert(e.name&&e.summary);}
for(const l of d.links){assert(ids.has(l.from)&&ids.has(l.to),'broken edge '+l.id);assert(sources.has(l.source),'missing source '+l.id);assert(l.scope&&l.label);}
for(const s of d.sources){assert(new URL(s.url).protocol==='https:');assert(s.reviewed);}
for(const e of d.events){assert(ids.has(e.entity));assert(sources.has(e.source));assert(/^\d{4}(-\d{2})?(-\d{2})?$/.test(e.date));assert(e.date<=d.reviewed);}
for(const f of d.fields)assert(ids.has(f.root));
for(const e of d.entities)assert(d.links.some(l=>l.from===e.id||l.to===e.id),'orphan '+e.id);
for(const path of ['dist/data.js','dist/app.js','dist/webmcp.js'])new vm.Script(fs.readFileSync(path,'utf8'),{filename:path});
const html=fs.readFileSync('dist/index.html','utf8');
for(const m of html.matchAll(/(?:src|href)="\.\/([^"?#]+)"/g))assert(fs.existsSync('dist/'+m[1]),'missing asset '+m[1]);
assert(html.includes('lang="ko"'));
// The hosting manifest is present only in the original Sites checkout.
// Render and other static hosts validate the same portable app without it.
if(fs.existsSync('.openai/hosting.json')){
  const manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));
  assert.equal(manifest.static.directory,'dist');assert(manifest.project_id);
}
console.log(JSON.stringify({entities:d.entities.length,organizations:d.entities.filter(e=>e.type==='organization').length,products:d.entities.filter(e=>e.type==='product').length,missions:d.entities.filter(e=>e.type==='mission').length,technologies:d.entities.filter(e=>e.type==='technology').length,relations:d.links.length,sources:d.sources.length,events:d.events.length,status:'passed'},null,2));
