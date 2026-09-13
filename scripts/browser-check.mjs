import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';

const root=path.resolve(import.meta.dirname,'..');
const browser=process.env.ATLAS_BROWSER||[
 'C:/Program Files/Google/Chrome/Application/chrome.exe',
 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(p=>fs.existsSync(p));
assert(browser,'Set ATLAS_BROWSER to a Chromium executable.');
const temp=fs.mkdtempSync(path.join(root,'.atlas-browser-'));
const tests=String.raw`
window.addEventListener('load',async()=>{
 const check=(condition,message)=>{if(!condition)throw new Error(message);};
 const select=(id,value)=>{const el=document.getElementById(id);el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}));};
 const search=query=>{const el=document.getElementById('search');el.value=query;el.dispatchEvent(new Event('input',{bubbles:true}));};
 const changeHash=action=>new Promise((resolve,reject)=>{
  const done=()=>{clearTimeout(timer);resolve();};
  const timer=setTimeout(()=>{window.removeEventListener('hashchange',done);reject(new Error('Navigation did not complete'));},2000);
  window.addEventListener('hashchange',done,{once:true});
  action();
 });
 try{
  const d=window.ATLAS;
  check(window.SatelliteAtlas,'app initialized');
  if(location.hash.startsWith('#sources')){
   const state=window.SatelliteAtlas.getState();
   check(state.field==='ai'&&state.sourceCountry==='대한민국'&&state.sourceType==='개발사 발표','shared URL restores source filters on load');
   check(document.getElementById('search').value==='597','shared URL restores search input on load');
   check(document.querySelectorAll('.source-record').length===1,'shared URL restores filtered results on load');
   document.getElementById('clear-filters').click();
   document.querySelector('[data-view="missions"]').click();
  }
  check(window.SatelliteAtlas.getState().view==='missions','mission landing page');
  check(document.querySelectorAll('.mission-card').length===24,'all mission profiles render');
  check(document.documentElement.scrollWidth<=innerWidth,'landing page has no horizontal overflow');
  document.querySelector('[data-view="catalog"]').click();
  select('type-filter','product');
  document.querySelector('[data-view="missions"]').click();
  check(document.querySelectorAll('.mission-card').length===24,'product filter does not hide missions');
  search('SHP163');
  check(document.querySelector('[data-open="rapis1"]'),'equipment details searchable');
  document.querySelector('[data-open="rapis1"]').click();
  check(document.querySelectorAll('.test-list>div').length===7,'RAPIS seven experiment details');
  check(document.querySelector('.mission-outcome a'),'result has direct citation');
  document.getElementById('detail-dialog').close();
  search('servis');
  check(document.querySelectorAll('.mission-card').length===2,'both SERVIS missions are listed');
  document.querySelector('[data-open="servis2"]').click();
  check(document.getElementById('detail-dialog').open,'SERVIS detail opens');
  check(document.getElementById('dialog-content').textContent.includes('2010-06-02'),'SERVIS-2 launch date');
  check(document.getElementById('dialog-content').textContent.includes('Japan Space Systems'),'SERVIS primary source');
  document.getElementById('detail-dialog').close();
  search('서비스 1');
  check(document.querySelectorAll('.mission-card').length===1,'Korean SERVIS alias');
  search('');
  document.querySelector('[data-view="sources"]').click();
  check(document.querySelectorAll('.source-record').length===d.sources.length,'all source records render');
  select('source-country','대한민국');
  check(document.querySelectorAll('.source-record').length===2,'country filter');
  search('597');
  check(document.querySelectorAll('.source-record').length===1,'claim text search');
  let exported;
  URL.createObjectURL=blob=>{exported=blob;return 'blob:test-export';};
  URL.revokeObjectURL=()=>{};
  document.addEventListener('click',event=>{if(event.target.closest('a[download]'))event.preventDefault();});
  document.getElementById('export-button').click();
  const csv=await exported.text();
  check(csv.includes('확인 주장·위치·한계')&&csv.includes('597')&&csv.includes('prnewswire.com'),'source CSV preserves evidence');
  document.getElementById('clear-filters').click();
  select('source-type','연구 논문');
  check(document.querySelectorAll('.source-record').length===d.sources.filter(s=>s.type==='연구 논문').length,'paper filter');
  search('검색결과없음');
  check(document.querySelector('.empty-state'),'empty state');
  document.querySelector('[data-reset]').click();
  check(document.querySelectorAll('.source-record').length===d.sources.length,'reset evidence filters');
  window.SatelliteAtlas.focus('adras-j');
  check(document.querySelector('.claim-evidence').textContent.includes('15 m'),'entity claims visible');
  check(document.querySelector('.claim-evidence').textContent.includes('포획'),'limitations visible');
  document.querySelector('[data-open="adras-j"]').click();
  check(document.getElementById('detail-dialog').open,'detail dialog opens');
  document.getElementById('detail-dialog').close();
  document.getElementById('export-button').click();
  const entityCsv=await exported.text();
  check(entityCsv.includes('주장별 근거')&&entityCsv.includes('확인')&&entityCsv.includes('astroscale.com'),'entity CSV includes claim sources');
  document.querySelector('[data-view="timeline"]').click();
  check(document.getElementById('view-content').textContent.includes('ADRAS-J 근접 접근·자동 중단 결과 발표'),'new evidence events render');
  window.SatelliteAtlas.focus('tbird-terminal');
  const edge=d.links.find(l=>l.from==='tbird-terminal'&&l.to==='tbird-mission');
  document.querySelector('[data-edge="'+edge.id+'"]').dispatchEvent(new MouseEvent('click',{bubbles:true}));
  check(document.getElementById('dialog-content').textContent.includes('MIT Lincoln Laboratory'),'relationship includes added source');
  document.getElementById('detail-dialog').close();

  // Search, filters and browser history describe the same visible results.
  document.querySelector('[data-view="sources"]').click();
  document.getElementById('clear-filters').click();
  document.getElementById('source-country').focus();
  select('source-country','대한민국');
  check(document.activeElement.id==='source-country','country filter retains keyboard focus');
  document.getElementById('source-type').focus();
  select('source-type','개발사 발표');
  check(document.activeElement.id==='source-type','source type retains keyboard focus');
  document.getElementById('mobile-field').focus();
  select('mobile-field','ai');
  check(document.activeElement.id==='mobile-field','field filter retains keyboard focus');
  const historyBeforeSearch=history.length;
  search('59');search('597');
  check(history.length===historyBeforeSearch,'typing does not add a history entry per keystroke');
  const sharedHash=location.hash;
  const params=new URLSearchParams(sharedHash.slice(sharedHash.indexOf('?')+1));
  check(params.get('q')==='597'&&params.get('field')==='ai'&&params.get('country')==='대한민국'&&params.get('sourceType')==='개발사 발표','URL includes active search and filters');
  document.querySelector('[data-view="catalog"]').focus();
  document.querySelector('[data-view="catalog"]').click();
  check(document.activeElement.dataset.view==='catalog','navigation retains keyboard focus');
  await changeHash(()=>history.back());
  check(location.hash===sharedHash&&document.querySelectorAll('.source-record').length===1,'Back restores source search');
  check(document.getElementById('source-country').value==='대한민국'&&document.getElementById('source-type').value==='개발사 발표','Back restores filter controls');
  await changeHash(()=>history.forward());
  check(window.SatelliteAtlas.getState().view==='catalog','Forward restores next view');
  select('type-filter','product');
  check(new URLSearchParams(location.hash.split('?')[1]).get('type')==='product','entity type is serialized');
  const specialQuery='서비스 ? 2 & # <test>';
  search(specialQuery);
  const specialHash=location.hash;
  await changeHash(()=>{location.hash=sharedHash;});
  check(document.querySelectorAll('.source-record').length===1,'opening a shared URL replaces previous filter state');
  await changeHash(()=>{location.hash=specialHash;});
  check(document.getElementById('search').value===specialQuery&&window.SatelliteAtlas.getState().type==='product','URL restores punctuation and entity type');
  await changeHash(()=>{location.hash='#missions?field=invalid&focus=invalid&type=invalid&country=invalid&sourceType=invalid';});
  const resetState=window.SatelliteAtlas.getState();
  check(resetState.field==='all'&&resetState.focus===d.fields[0].root&&resetState.type==='all'&&resetState.sourceCountry==='all'&&resetState.sourceType==='all'&&resetState.query==='','invalid or omitted URL filters use defaults');
  check(document.querySelectorAll('.mission-card').length===24,'invalid URL filters do not hide missions');
  search('servis');
  const beforeSkip=location.hash;
  document.querySelector('.skip-link').click();
  check(document.activeElement.id==='main'&&location.hash===beforeSkip&&window.SatelliteAtlas.getState().query==='servis','skip link focuses main without replacing the search URL');
  await changeHash(()=>document.querySelector('.brand').click());
  check(window.SatelliteAtlas.getState().query===''&&document.querySelectorAll('.mission-card').length===24,'bare mission link clears previous search');
  await changeHash(()=>history.back());
  check(window.SatelliteAtlas.getState().query==='servis'&&document.querySelectorAll('.mission-card').length===2,'Back after skip and brand links restores search');
  await changeHash(()=>history.forward());

  // Saving and removing records stays consistent across cards and details.
  document.querySelector('[data-save="servis1"]').click();
  document.querySelector('[data-save="servis2"]').click();
  document.querySelector('[data-view="saved"]').click();
  check(document.querySelectorAll('.entity-card').length===2,'saved records appear in collection');
  document.querySelector('[data-view="missions"]').click();
  const savedButton=document.querySelector('[data-save="servis2"]');
  check(savedButton.classList.contains('is-saved')&&savedButton.getAttribute('aria-pressed')==='true'&&savedButton.getAttribute('aria-label').includes('해제'),'mission save button preserves state after rerender');
  document.querySelector('[data-open="servis2"]').click();
  const detailSave=document.querySelector('#dialog-content [data-save="servis2"]');
  check(detailSave.getAttribute('aria-label').includes('해제'),'saved detail button announces removal');
  document.getElementById('detail-dialog').close();
  document.querySelector('[data-view="saved"]').click();
  const removeButton=document.querySelector('#view-content [data-save="servis1"]');
  removeButton.focus();removeButton.click();
  check(document.activeElement.dataset.save==='servis2','removing a saved card focuses the remaining card');
  document.activeElement.click();
  check(document.querySelector('.empty-state')&&document.activeElement.hasAttribute('data-reset'),'removing last saved card focuses empty-state action');
  check(window.SatelliteAtlas.getSaved().length===0&&document.querySelector('.nav-count').textContent==='0','saved count stays in sync');
  document.body.dataset.testResult='passed';
 }catch(error){document.body.dataset.testResult='failed';document.body.dataset.testError=error.message;}
});`;
try{
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8')
  .replaceAll('src="./','src="../dist/').replaceAll('href="./','href="../dist/')
  .replace('</body>','<script>'+tests+'</script></body>');
 const harness=path.join(temp,'check.html');fs.writeFileSync(harness,html);
 for(const width of [1280,390])for(const scenario of ['landing','shared-search']){
  const url=new URL(pathToFileURL(harness));
  if(scenario==='shared-search')url.hash='sources?'+new URLSearchParams({field:'ai',country:'대한민국',sourceType:'개발사 발표',q:'597'});
  const result=spawnSync(browser,['--headless','--no-first-run','--no-default-browser-check',
   '--disable-background-networking','--disable-gpu','--disable-extensions',
   '--user-data-dir='+path.join(temp,'profile-'+width+'-'+scenario),'--window-size='+width+',900',
   '--virtual-time-budget=8000','--dump-dom',url.href],
   {encoding:'utf8',timeout:45000,windowsHide:true,maxBuffer:8*1024*1024});
  if(result.error)throw result.error;
  assert.equal(result.status,0,result.stderr.slice(-1500));
  assert(result.stdout.includes('data-test-result="passed"'),result.stdout.match(/data-test-error="[^"]*/)?.[0]||'Browser did not complete checks: '+result.stderr.slice(-1000));
  console.log('Browser evidence, navigation and saved-item flows passed at '+width+'px ('+scenario+')');
 }
}finally{
 // Verify the absolute cleanup target stays inside this workspace.
 const resolved=fs.realpathSync(temp);
 const relative=path.relative(fs.realpathSync(root),resolved);
 assert(relative.startsWith('.atlas-browser-')&&!relative.includes(path.sep));
 fs.rmSync(resolved,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
