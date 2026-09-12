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
 try{
  const d=window.ATLAS;
  check(window.SatelliteAtlas,'app initialized');
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
  document.body.dataset.testResult='passed';
 }catch(error){document.body.dataset.testResult='failed';document.body.dataset.testError=error.message;}
});`;
try{
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8')
  .replaceAll('src="./','src="../dist/').replaceAll('href="./','href="../dist/')
  .replace('</body>','<script>'+tests+'</script></body>');
 const harness=path.join(temp,'check.html');fs.writeFileSync(harness,html);
 for(const width of [1280,390]){
  const result=spawnSync(browser,['--headless','--no-first-run','--no-default-browser-check',
   '--disable-background-networking','--disable-gpu','--disable-extensions',
   '--user-data-dir='+path.join(temp,'profile-'+width),'--window-size='+width+',900',
   '--virtual-time-budget=8000','--dump-dom',pathToFileURL(harness).href],
   {encoding:'utf8',timeout:45000,windowsHide:true,maxBuffer:8*1024*1024});
  if(result.error)throw result.error;
  assert.equal(result.status,0,result.stderr.slice(-1500));
  assert(result.stdout.includes('data-test-result="passed"'),result.stdout.match(/data-test-error="[^"]*/)?.[0]||'Browser did not complete checks: '+result.stderr.slice(-1000));
  console.log('Browser evidence flow passed at '+width+'px');
 }
}finally{
 // Verify the absolute cleanup target stays inside this workspace.
 const resolved=fs.realpathSync(temp);
 const relative=path.relative(fs.realpathSync(root),resolved);
 assert(relative.startsWith('.atlas-browser-')&&!relative.includes(path.sep));
 fs.rmSync(resolved,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
