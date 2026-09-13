import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Payload budget: the whole app is client-side with no pagination, so the
// data files below are downloaded and parsed in full on every visit. The
// dataset has grown ~30-50% per recent update; this budget is a generous
// multiple of the current size so ordinary growth passes silently, but an
// unexpectedly large jump fails the build instead of shipping unnoticed.
// If this genuinely needs raising, that should be a deliberate decision
// (and a good moment to revisit lazy-loading a file like mission-programs.js).
const DATA_FILES=['dist/data.js','dist/evidence-data.js','dist/mission-data.js','dist/mission-programs.js','dist/research.js'];
const fileSizes=Object.fromEntries(DATA_FILES.map(f=>[f,fs.statSync(f).size]));
const totalDataBytes=Object.values(fileSizes).reduce((a,b)=>a+b,0);
const DATA_BUDGET_BYTES=360*1024;
assert(totalDataBytes<=DATA_BUDGET_BYTES,'Client-side data payload is '+totalDataBytes+' bytes, over the '+DATA_BUDGET_BYTES+'-byte budget ('+DATA_FILES.join(', ')+'). All of this loads unconditionally in every browser with no pagination or lazy-loading; raise the budget only as a deliberate choice, and consider splitting/lazy-loading large views instead.');

// Load-order guard tests: data.js -> evidence-data.js -> mission-data.js ->
// mission-programs.js mutate one shared global in sequence. Loading a later
// file before its prerequisite must fail with a clear, specific error instead
// of a generic "Cannot read properties of undefined" or, worse, silently
// leaving window.ATLAS half-built.
for(const [file,expected] of [
 ['dist/evidence-data.js',/evidence-data\.js requires data\.js/],
 ['dist/mission-data.js',/mission-data\.js requires data\.js/],
 ['dist/mission-programs.js',/mission-programs\.js requires data\.js and mission-data\.js/]
]){
 assert.throws(()=>vm.runInNewContext(fs.readFileSync(file,'utf8'),{window:{}}),expected,file+' must fail clearly when its prerequisite has not run');
}
{
 const dataOnly={window:{}};
 vm.runInNewContext(fs.readFileSync('dist/data.js','utf8'),dataOnly);
 assert.throws(()=>vm.runInNewContext(fs.readFileSync('dist/mission-programs.js','utf8'),dataOnly),/mission-data\.js/,'mission-programs.js must also require mission-data.js, not just data.js');
}

const ctx={window:{}};
vm.runInNewContext(fs.readFileSync('dist/data.js','utf8'),ctx);
vm.runInNewContext(fs.readFileSync('dist/evidence-data.js','utf8'),ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-data.js','utf8'),ctx);
vm.runInNewContext(fs.readFileSync('dist/mission-programs.js','utf8'),ctx);
const d=ctx.window.ATLAS;
const ids=new Set(d.entities.map(e=>e.id));
const sources=new Set(d.sources.map(s=>s.id));
for(const e of d.entities.filter(e=>e.type==='mission')){
 const m=e.demonstration;
 assert(m&&m.objective&&m.result&&m.conditions&&Array.isArray(m.tests),'missing mission profile '+e.id);
 assert(e.sources.includes(m.source),'mission source not attached '+e.id);
 if(m.conditionSource)assert(e.sources.includes(m.conditionSource),'missing condition source '+e.id);
 const program=m.program;
 assert(program&&/^\d{4}-\d{2}-\d{2}$/.test(program.reviewed)&&program.reviewed<=d.reviewed,'missing or invalid program review '+e.id);
 for(const key of ['purpose','organization','architecture','verification']){
  assert(typeof program[key]?.text==='string'&&program[key].text.trim(),'missing program '+key+' '+e.id);
 }
 assert(Array.isArray(program.considerations)&&program.considerations.length>=3,'missing engineering considerations '+e.id);
 for(const item of program.considerations)assert(item.topic&&item.detail,'incomplete engineering consideration '+e.id);
 for(const entry of [program.purpose,program.organization,program.architecture,program.verification,...program.considerations]){
  assert(Array.isArray(entry.sources)&&entry.sources.length,'uncited program content '+e.id);
  for(const id of entry.sources)assert(sources.has(id)&&e.sources.includes(id),'missing program source '+e.id+': '+id);
 }
}
assert.equal(ids.size,d.entities.length,'duplicate entity IDs');
assert.equal(sources.size,d.sources.length,'duplicate source IDs');
assert.equal(new Set(d.fields.map(f=>f.id)).size,d.fields.length,'duplicate field IDs');
for(const group of [d.links,d.events])assert.equal(new Set(group.map(e=>e.id)).size,group.length,'duplicate record IDs');
for(const e of d.entities){assert(e.sources.length,e.id+' lacks sources');for(const id of e.sources)assert(sources.has(id),id);assert(d.fields.some(f=>f.id===e.field));assert(e.name&&e.summary);}
for(const l of d.links){assert(ids.has(l.from)&&ids.has(l.to),'broken edge '+l.id);assert(sources.has(l.source),'missing source '+l.id);assert(l.scope&&l.label);for(const id of l.sources||[l.source])assert(sources.has(id),'missing corroborating source '+id);if(l.sources)assert(l.sources.includes(l.source));}
for(const s of d.sources){assert(new URL(s.url).protocol==='https:');assert(s.reviewed);}
for(const e of d.events){assert(ids.has(e.entity));assert(sources.has(e.source));assert(/^\d{4}(-\d{2})?(-\d{2})?$/.test(e.date));assert(e.date<=d.reviewed);}
for(const f of d.fields){
 const root=d.entities.find(e=>e.id===f.root);
 assert(root&&root.type==='technology'&&root.field===f.id,'invalid field root '+f.id);
 assert(d.entities.some(e=>e.field===f.id&&e.type!=='technology')||d.links.some(l=>l.from===f.root&&d.entities.some(e=>e.id===l.to&&e.type!=='technology')),'field lacks concrete evidence '+f.id);
}
for(const e of d.entities)assert(d.links.some(l=>l.from===e.id||l.to===e.id),'orphan '+e.id);
for(const path of ['dist/data.js','dist/evidence-data.js','dist/research.js','dist/app.js','dist/webmcp.js'])new vm.Script(fs.readFileSync(path,'utf8'),{filename:path});
assert.equal(new Set(d.sources.map(s=>new URL(s.url).href)).size,d.sources.length,'duplicate source URLs');
assert.equal(new Set(d.evidence.map(e=>e.id)).size,d.evidence.length,'duplicate evidence IDs');
for(const item of d.evidence){
 assert(sources.has(item.source));
 assert(item.entities.length&&item.claim&&item.kind&&item.locator&&item.limitation);
 assert(item.reviewed<=d.reviewed);
 for(const id of item.entities){assert(ids.has(id));assert(d.entities.find(e=>e.id===id).sources.includes(item.source));}
}
for(const source of d.sources){
 assert(source.country&&source.originGroup);
 assert(source.date===null||/^\d{4}(-\d{2})?(-\d{2})?$/.test(source.date));
 if(source.date)assert(source.date<=source.reviewed,'document after review '+source.id);
 if(source.access==='본문 확인')assert(d.evidence.some(e=>e.source===source.id),'unmapped source '+source.id);
}
vm.runInNewContext(fs.readFileSync('dist/research.js','utf8'),ctx);
const research=ctx.window.createAtlasResearch(d);
assert(research.search('제논 홀').some(e=>e.id==='bht200'),'multi-word search must include notes');
assert(research.search('제어권 회수').some(e=>e.id==='opssat-mission'),'program engineering considerations are searchable');
assert(research.search('슈퍼커패시터').some(e=>e.id==='spirit'),'program architecture is searchable');
assert(research.search('미세유체').some(e=>e.id==='biosentinel'),'expanded science project is searchable');
assert.equal(d.sources.find(source=>source.id==='dlr-o4c-record').originGroup,d.sources.find(source=>source.id==='dlr-o4c-paper').originGroup,'repository abstract is not an independent publisher');
assert(research.search('ＢＨＴ－２００').some(e=>e.id==='bht200'),'unicode search');
assert(research.search('초분광','sensing').some(e=>e.id==='intuition1'),'cross-field evidence');
assert.equal(research.search('BHT-200','power').length,0,'field isolation');
assert.equal(research.search('없는검색어').length,0);
assert.equal(research.search('').length,d.entities.length);
const servisMissions=research.search('servis','ai').filter(e=>e.type==='mission');
assert.deepEqual(Array.from(servisMissions,e=>e.id).sort(),['servis1','servis2'],'SERVIS missions must be discoverable');
for(const query of ['SERVIS-2','servis 2','서비스 2','서비즈 2'])assert(research.search(query).some(e=>e.id==='servis2'),'SERVIS alias '+query);
assert.deepEqual(Array.from(research.search('서비스 1'),e=>e.id),['servis1'],'numbered mission alias must not match incidental years');
assert.deepEqual(Array.from(research.search('servis 2'),e=>e.id),['servis2']);
assert.equal(research.search('SERVIS','servicing').filter(e=>e.type==='mission').length,0,'SERVIS is component verification, not servicing');
for(const id of ['servis1','servis2','rapis1','tet1']){
 assert(research.evidenceFor(id).length>0,'mission evidence '+id);
 assert(d.events.some(e=>e.entity===id&&e.kind==='발사'),'launch timeline '+id);
}
assert(d.entities.find(e=>e.id==='tet1').notes.includes('최종 성공'),'preserve TET-1 evidence limits');
assert(research.searchSources('인도 VNIR').some(s=>s.id==='isro-hysis-image'),'claims and country search');
assert(research.searchSources('Q8S',{country:'캐나다',type:'제조사 사양서'}).some(s=>s.id==='xiphos-q8s'));
assert.equal(research.searchSources('Q8S',{country:'인도'}).length,0);
assert.equal(research.searchSources('',{field:'invalid'}).length,0);
assert(research.evidenceFor('adras-j').some(e=>e.limitation.includes('포획')),'preserve limits');
assert.equal(research.evidenceFor('invalid').length,0);
assert(research.sourceIds(d.entities.find(e=>e.id==='tbird-terminal')).includes('mit-tbird'));
for(const field of d.fields)assert(d.evidence.some(e=>e.entities.some(id=>d.entities.find(n=>n.id===id).field===field.id)),'no new evidence in '+field.id);
// Validate the actual WebMCP schema and execution with the shared query engine.
const registered=[];
const registrationSignals=[];
const pageListeners=new Map();
const webContext={window:{ATLAS:d,SatelliteAtlas:{search:research.search,searchSources:research.searchSources,getEvidence:research.evidenceFor,getEntity:id=>d.entities.find(e=>e.id===id),getConnections:research.neighbors,getSources:id=>research.sourceIds(d.entities.find(e=>e.id===id)).map(id=>d.sources.find(s=>s.id===id))},addEventListener:(name,listener)=>pageListeners.set(name,listener)},document:{modelContext:{registerTool:(tool,{signal})=>{registered.push(tool);registrationSignals.push(signal);}}},AbortController};
vm.runInNewContext(fs.readFileSync('dist/webmcp.js','utf8'),webContext);
assert.equal(registered.length,4,'register each WebMCP tool on initial load');
assert.equal(new Set(registered.map(tool=>tool.name)).size,4,'unique WebMCP tools');
assert(registrationSignals.every(signal=>!signal.aborted),'initial registrations stay active');
const searchTool=registered.find(t=>t.name==='search_satellite_technology_records');
for(const f of d.fields){
 assert(searchTool.inputSchema.properties.field.enum.includes(f.id));
 assert(searchTool.execute({query:'',field:f.id}).count>0,'WebMCP field '+f.id);
}
assert.throws(()=>searchTool.execute({query:'',field:'invalid'}));
assert.throws(()=>searchTool.execute({query:'',field:null}),'null field violates WebMCP schema');
assert.throws(()=>searchTool.execute({query:42}));
assert.equal(searchTool.execute({query:''}).count,d.entities.length,'omitted field defaults to all');
assert.equal(searchTool.execute({query:'SERVIS',field:'ai'}).items.filter(e=>e.type==='mission').length,2);
const sourceTool=registered.find(t=>t.name==='search_satellite_evidence_sources');
const detachedSourceExecute=sourceTool.execute;
assert(detachedSourceExecute({query:'',country:'일본'}).count>0,'host can invoke execute without binding');
assert(sourceTool.execute({query:'',country:'대한민국'}).items.some(s=>s.id==='kari-kompsat3a'));
assert.throws(()=>sourceTool.execute({query:'',country:'invalid'}));
assert.throws(()=>sourceTool.execute({query:'',type:3}));
assert.throws(()=>sourceTool.execute({query:'',unknown:true}));
const evidenceTool=registered.find(t=>t.name==='get_satellite_record_evidence');
assert(evidenceTool.execute({id:'tetraplex'}).evidence.some(e=>e.source==='telepix-flight'));
assert.equal(evidenceTool.execute({id:'rapis1'}).record.demonstration.program.considerations.length,3,'WebMCP exposes mission engineering considerations');
pageListeners.get('pageshow')({persisted:false});
assert.equal(registered.length,4,'ordinary pageshow must not duplicate tools');
pageListeners.get('pagehide')({persisted:true});
assert(registrationSignals.every(signal=>signal.aborted),'pagehide releases tool registrations');
pageListeners.get('pageshow')({persisted:true});
assert.equal(registered.length,8,'cache restoration registers all tools again');
assert(registrationSignals.slice(4).every(signal=>!signal.aborted),'restored tools use an active signal');
assert.notEqual(registrationSignals[0],registrationSignals[4],'restoration creates a fresh lifecycle');
pageListeners.get('pageshow')({persisted:true});
assert.equal(registered.length,8,'repeated pageshow must not duplicate tools');
pageListeners.get('pagehide')({persisted:true});
assert(registrationSignals.every(signal=>signal.aborted),'restored page also releases registrations');
pageListeners.get('pageshow')({persisted:true});
assert.equal(registered.length,12,'tools survive repeated cache restorations');
pageListeners.get('pagehide')({persisted:false});
assert(registrationSignals.every(signal=>signal.aborted),'ordinary navigation releases registrations');
const html=fs.readFileSync('dist/index.html','utf8');
for(const m of html.matchAll(/(?:src|href)="\.\/([^"?#]+)"/g))assert(fs.existsSync('dist/'+m[1]),'missing asset '+m[1]);
assert(html.includes('lang="ko"'));
{
 // The structured-data block advertises entity/source counts for search engines; keep it honest
 // by cross-checking those numbers against the live dataset instead of letting them silently drift.
 const ldMatch=html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
 assert(ldMatch,'index.html is missing its JSON-LD structured data block');
 const ld=JSON.parse(ldMatch[1]);
 assert.equal(ld['@type'],'Dataset');
 assert.equal(ld.dateModified,d.reviewed,'JSON-LD dateModified is stale relative to the dataset');
 const counted=(label,expected)=>assert(ld.variableMeasured.includes(`${expected} ${label}`),`JSON-LD variableMeasured out of date for "${label}" (expected ${expected})`);
 counted('entities',d.entities.length);
 counted('cited sources',d.sources.length);
 counted('timeline events',d.events.length);
 counted('technology fields',d.fields.length);
}
// The hosting manifest is present only in the original Sites checkout.
// Render and other static hosts validate the same portable app without it.
if(fs.existsSync('.openai/hosting.json')){
  const manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));
  assert.equal(manifest.static.directory,'dist');assert(manifest.project_id);
}
console.log(JSON.stringify({entities:d.entities.length,organizations:d.entities.filter(e=>e.type==='organization').length,products:d.entities.filter(e=>e.type==='product').length,missions:d.entities.filter(e=>e.type==='mission').length,technologies:d.entities.filter(e=>e.type==='technology').length,relations:d.links.length,sources:d.sources.length,countries:new Set(d.sources.map(s=>s.country)).size,evidence:d.evidence.length,coverage:research.coverage(),events:d.events.length,dataPayloadBytes:{...fileSizes,total:totalDataBytes,budget:DATA_BUDGET_BYTES},status:'passed'},null,2));
