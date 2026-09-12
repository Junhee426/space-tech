/* Shared query index for the UI and WebMCP. No external requests. */
window.createAtlasResearch = D => {
 'use strict';
 const entities=new Map(D.entities.map(e=>[e.id,e]));
 const fields=new Map(D.fields.map(f=>[f.id,f]));
 const sources=new Map(D.sources.map(s=>[s.id,s]));
 const evidence=D.evidence||[];
 const evidenceByEntity=new Map(D.entities.map(e=>[e.id,[]]));
 const evidenceBySource=new Map(D.sources.map(s=>[s.id,[]]));
 for(const item of evidence){
  evidenceBySource.get(item.source).push(item);
  for(const id of item.entities)evidenceByEntity.get(id).push(item);
 }
 const adjacency=new Map(D.entities.map(e=>[e.id,[]]));
 for(const link of D.links){
  adjacency.get(link.from).push({entity:entities.get(link.to),link});
  adjacency.get(link.to).push({entity:entities.get(link.from),link});
 }
 const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[\s·_/-]/g,'');
 const tokens=query=>String(query??'').normalize('NFKC').trim().split(/\s+/u).map(normalize).filter(Boolean);
 // Recognized numbered names are identifiers: "서비스 1" must not match
 // SERVIS-2 merely because its description contains a year with the digit 1.
 const numberedName=/^[\p{L}]+[\s-]*\d+$/u;
 const identifierIndex=new Map();
 for(const e of D.entities)for(const name of [e.name,...(e.aliases||[])]){
  const value=String(name).normalize('NFKC').trim();
  if(!numberedName.test(value))continue;
  const key=normalize(value);
  if(!identifierIndex.has(key))identifierIndex.set(key,new Set());
  identifierIndex.get(key).add(e.id);
 }
 const texts=new Map(D.entities.map(e=>[e.id,normalize([
  e.name,e.subtitle,e.summary,e.status,e.notes,e.demonstration ? Object.values(e.demonstration).flat(2).join(" ") : "",...(e.aliases||[]),
  ...(e.metrics||[]).flat(),fields.get(e.field).name,fields.get(e.field).short
 ].join(' '))]));
 const neighbors=id=>adjacency.get(id)||[];
 const sourceIds=e=>[...new Set([...e.sources,...neighbors(e.id).flatMap(n=>n.link.sources||[n.link.source])])];
 const evidenceFor=id=>evidenceByEntity.get(id)||[];
 const sourceEvidence=id=>evidenceBySource.get(id)||[];
 const inField=(e,field)=>field==='all'||e.field===field||neighbors(e.id).some(n=>n.entity.field===field);
 const matches=(e,query)=>{
  const value=String(query??'').normalize('NFKC').trim();
  const exact=numberedName.test(value)?identifierIndex.get(normalize(value)):null;
  return exact?exact.has(e.id):tokens(query).every(token=>texts.get(e.id)?.includes(token));
 };
 const sourceTexts=new Map(D.sources.map(s=>[s.id,normalize([
  s.title,s.publisher,s.country,s.type,s.note,s.originGroup,
  ...sourceEvidence(s.id).flatMap(item=>[item.claim,item.limitation,item.locator,...item.entities.map(id=>entities.get(id).name)])
 ].join(' '))]));
 function searchSources(query='',{field='all',country='all',type='all'}={}){
  const applicable=new Set(D.entities.filter(e=>inField(e,field)).flatMap(sourceIds));
  return D.sources.filter(s=>applicable.has(s.id)&&(country==='all'||s.country===country)&&(type==='all'||s.type===type)&&tokens(query).every(token=>sourceTexts.get(s.id).includes(token)));
 }
 function coverage(list=D.entities){
  return {entities:list.length,sources:new Set(list.flatMap(sourceIds)).size,
   directMultiplePublishers:list.filter(e=>new Set(e.sources.map(id=>sources.get(id).originGroup||sources.get(id).publisher)).size>1).length,
   withClaimEvidence:list.filter(e=>evidenceFor(e.id).length>0).length};
 }
 return {normalize,neighbors,inField,matches,sourceIds,evidenceFor,sourceEvidence,searchSources,coverage,search:(query='',field='all')=>D.entities.filter(e=>inField(e,field)&&matches(e,query))};
};
