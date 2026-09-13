(() => {
 const context=document.modelContext;
 if(!context?.registerTool||!window.SatelliteAtlas)return;
 let lifecycle=null;
 const atlas=window.SatelliteAtlas;
 const sourceInputs={field:['all',...window.ATLAS.fields.map(f=>f.id)],country:['all',...new Set(window.ATLAS.sources.map(s=>s.country))],type:['all',...new Set(window.ATLAS.sources.map(s=>s.type))]};
 const fail=()=>{throw new Error('유효한 입력을 확인해 주세요.');};
 const check=(input,allowed)=>{if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!allowed.includes(k)))fail();};
 const tools=[
  {name:'search_satellite_evidence_sources',title:'위성기술 근거 원문 검색',description:'수록된 원문을 확인 주장·발행기관·국가·자료 유형으로 검색합니다. 자동 웹 수집이 아닙니다.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:200},field:{type:'string',enum:['all',...window.ATLAS.fields.map(f=>f.id)]},country:{type:'string',enum:['all',...new Set(window.ATLAS.sources.map(s=>s.country))]},type:{type:'string',enum:['all',...new Set(window.ATLAS.sources.map(s=>s.type))]}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){check(input,['query','field','country','type']);if(typeof input.query!=='string'||input.query.length>200)fail();for(const key of ['field','country','type'])if(input[key]!==undefined&&!sourceInputs[key].includes(input[key]))fail();const {query,...filters}=input;const items=atlas.searchSources(query,filters);return {count:items.length,items,evidence:window.ATLAS.evidence.filter(e=>items.some(s=>s.id===e.source))};}},
  {name:'search_satellite_technology_records',title:'위성기술 자료 검색',description:'현재 공개자료 데이터셋에서 기술·기업·제품·임무를 검색합니다. 실시간 웹 검색이 아닙니다.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:200},field:{type:'string',enum:['all',...window.ATLAS.fields.map(f=>f.id)]}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){check(input,['query','field']);if(typeof input.query!=='string'||input.query.length>200||(input.field!==undefined&&!sourceInputs.field.includes(input.field)))fail();const results=atlas.search(input.query,input.field??'all');return {count:results.length,reviewed:window.ATLAS.reviewed,items:results.map(e=>({id:e.id,name:e.name,type:e.type,status:e.status}))};}},
  {name:'get_satellite_record_evidence',title:'항목과 근거 확인',description:'특정 항목의 확인 범위, 직접 연결, 공식 출처를 읽습니다.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input){check(input,['id']);if(typeof input.id!=='string')fail();const e=atlas.getEntity(input.id);if(!e)throw new Error('등록되지 않은 항목입니다.');return {record:e,connections:atlas.getConnections(input.id).map(n=>({id:n.entity.id,name:n.entity.name,relation:n.link.label,scope:n.link.scope,source:n.link.source,sources:n.link.sources||[n.link.source]})),sources:atlas.getSources(input.id),evidence:atlas.getEvidence(input.id)};}},
  {name:'navigate_satellite_relationship_map',title:'관계 지도 이동',description:'선택한 항목을 중심으로 화면의 관계 지도를 이동합니다. 데이터나 관심 목록은 변경하지 않습니다.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){check(input,['id']);if(typeof input.id!=='string'||!atlas.getEntity(input.id))fail();atlas.focus(input.id);return {view:atlas.getState().view,focus:atlas.getState().focus};}}
 ];
 const registerTools=()=>{
  if(lifecycle)return;
  lifecycle=new AbortController();
  tools.forEach(tool=>{try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}});
 };
 window.addEventListener('pagehide',()=>{lifecycle?.abort();lifecycle=null;});
 // Cached pages keep their script state, so restore registrations after Back/Forward.
 window.addEventListener('pageshow',event=>{if(event.persisted)registerTools();});
 registerTools();
})();
