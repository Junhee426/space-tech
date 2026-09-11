/* Shared query index for the UI and WebMCP. No external requests. */
window.createAtlasResearch = D => {
 'use strict';
 const entities=new Map(D.entities.map(e=>[e.id,e]));
 const fields=new Map(D.fields.map(f=>[f.id,f]));
 const adjacency=new Map(D.entities.map(e=>[e.id,[]]));
 for(const link of D.links){
  adjacency.get(link.from).push({entity:entities.get(link.to),link});
  adjacency.get(link.to).push({entity:entities.get(link.from),link});
 }
 const normalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[\s·_/-]/g,'');
 const tokens=query=>String(query??'').normalize('NFKC').trim().split(/\s+/u).map(normalize).filter(Boolean);
 const texts=new Map(D.entities.map(e=>[e.id,normalize([
  e.name,e.subtitle,e.summary,e.status,e.notes,...(e.aliases||[]),
  ...(e.metrics||[]).flat(),fields.get(e.field).name,fields.get(e.field).short
 ].join(' '))]));
 const neighbors=id=>adjacency.get(id)||[];
 const inField=(e,field)=>field==='all'||e.field===field||neighbors(e.id).some(n=>n.entity.field===field);
 const matches=(e,query)=>tokens(query).every(token=>texts.get(e.id)?.includes(token));
 return {normalize,neighbors,inField,matches,search:(query='',field='all')=>D.entities.filter(e=>inField(e,field)&&matches(e,query))};
};
