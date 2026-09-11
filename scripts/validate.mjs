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
assert.equal(new Set(d.fields.map(f=>f.id)).size,d.fields.length,'duplicate field IDs');
for(const group of [d.links,d.events])assert.equal(new Set(group.map(e=>e.id)).size,group.length,'duplicate record IDs');
for(const e of d.entities){assert(e.sources.length,e.id+' lacks sources');for(const id of e.sources)assert(sources.has(id),id);assert(d.fields.some(f=>f.id===e.field));assert(e.name&&e.summary);}
for(const l of d.links){assert(ids.has(l.from)&&ids.has(l.to),'broken edge '+l.id);assert(sources.has(l.source),'missing source '+l.id);assert(l.scope&&l.label);}
for(const s of d.sources){assert(new URL(s.url).protocol==='https:');assert(s.reviewed);}
for(const e of d.events){assert(ids.has(e.entity));assert(sources.has(e.source));assert(/^\d{4}(-\d{2})?(-\d{2})?$/.test(e.date));assert(e.date<=d.reviewed);}
for(const f of d.fields){
 const root=d.entities.find(e=>e.id===f.root);
 assert(root&&root.type==='technology'&&root.field===f.id,'invalid field root '+f.id);
 assert(d.entities.some(e=>e.field===f.id&&e.type!=='technology')||d.links.some(l=>l.from===f.root&&d.entities.some(e=>e.id===l.to&&e.type!=='technology')),'field lacks concrete evidence '+f.id);
}
for(const e of d.entities)assert(d.links.some(l=>l.from===e.id||l.to===e.id),'orphan '+e.id);
for(const path of ['dist/data.js','dist/research.js','dist/app.js','dist/webmcp.js'])new vm.Script(fs.readFileSync(path,'utf8'),{filename:path});
vm.runInNewContext(fs.readFileSync('dist/research.js','utf8'),ctx);
const research=ctx.window.createAtlasResearch(d);
assert(research.search('제논 홀').some(e=>e.id==='bht200'),'multi-word search must include notes');
assert(research.search('ＢＨＴ－２００').some(e=>e.id==='bht200'),'unicode search');
assert(research.search('초분광','sensing').some(e=>e.id==='intuition1'),'cross-field evidence');
assert.equal(research.search('BHT-200','power').length,0,'field isolation');
assert.equal(research.search('없는검색어').length,0);
assert.equal(research.search('').length,d.entities.length);
// Validate the actual WebMCP schema and execution with the shared query engine.
const registered=[];
const webContext={window:{ATLAS:d,SatelliteAtlas:{search:research.search},addEventListener(){}},document:{modelContext:{registerTool:t=>registered.push(t)}},AbortController};
vm.runInNewContext(fs.readFileSync('dist/webmcp.js','utf8'),webContext);
const searchTool=registered.find(t=>t.name==='search_satellite_technology_records');
for(const f of d.fields){
 assert(searchTool.inputSchema.properties.field.enum.includes(f.id));
 assert(searchTool.execute({query:'',field:f.id}).count>0,'WebMCP field '+f.id);
}
assert.throws(()=>searchTool.execute({query:'',field:'invalid'}));
assert.throws(()=>searchTool.execute({query:42}));
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
