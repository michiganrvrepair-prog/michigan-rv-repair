'use strict';
(()=>{
 const $=s=>document.querySelector(s);
 const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safeUrl=s=>{try{const u=new URL(s);return /^https?:$/.test(u.protocol)?u.href:''}catch{return ''}};
 const directory=$('#atlas-results'); if(!directory)return;
 const status=$('#atlas-results-status'),updated=$('#atlas-data-updated'),prev=$('#atlas-prev'),next=$('#atlas-next'),paging=$('#atlas-page-label');
 const search=$('#atlas-search'),state=$('#atlas-state'),kind=$('#atlas-kind');
 // Michigan is the featured default, not a restriction on national search.
 const initialParams=new URLSearchParams(location.search); state.value=initialParams.get('state')||'MI';
 let page=1,totalPages=1,requestToken=0;
 const link=(href,label,cls='')=>{const url=safeUrl(href);return url?`<a href="${safe(url)}" target="_blank" rel="noopener noreferrer" class="${cls}">${safe(label)} ↗</a>`:''};
 const stateNames={AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};
 function renderCard(item){
  const badges=[item.state?(stateNames[item.state]||item.state):'State unspecified',item.category].filter(Boolean).map(b=>`<span>${safe(b)}</span>`).join('');
  const site=link(item.official,'Campground website','atlas-external');
  const reserve=link(item.booking,'Reservation information','atlas-external atlas-primary');
  const map=link(item.map,'View on map','atlas-external');
  const actions=[reserve,site,map].filter(Boolean).join('')||'<span class="atlas-no-website">Direct website not supplied; confirm details with park agency.</span>';
  const loc=[item.city,item.state?stateNames[item.state]:null].filter(Boolean).join(', ');
  return `<article class="atlas-camp-card"><div class="atlas-card-top"><div class="atlas-card-tags">${badges}</div></div><h3>${safe(item.name||'Unnamed location')}</h3><p class="atlas-card-location">${safe(loc||'Location details unavailable')}</p>${item.description?`<p class="atlas-card-desc">${safe(item.description)}</p>`:''}<p class="atlas-source-small">Public data source: ${safe(item.source||'Not specified')} ${item.credit?' · '+safe(item.credit):''}</p><div class="atlas-card-links">${actions}</div></article>`;
 }
 function refreshPager(){ prev.disabled=page<=1;next.disabled=page>=totalPages;paging.textContent='Page '+page+' of '+totalPages; }
 async function load(){
  const token=++requestToken;
  status.textContent='Searching the national campground directory…';
  directory.innerHTML='<p class="atlas-loading">Checking public campground records…</p>';
  prev.disabled=true;next.disabled=true;
  const params=new URLSearchParams({kind:kind.value,state:state.value,q:search.value.trim(),page:String(page),limit:'18'});
  try{
   const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),27000);
   let resp;try{resp=await fetch('/.netlify/functions/campground-directory?'+params,{signal:controller.signal,headers:{Accept:'application/json'}})}finally{clearTimeout(timer)}
   const json=await resp.json();if(token!==requestToken)return;
   if(!resp.ok)throw Error(json.error||'Unable to load public listings');
   totalPages=Math.max(1,json.totalPages||1);
   if(page>totalPages){page=totalPages;return load()}
   status.textContent=new Intl.NumberFormat('en-US').format(json.total)+' record'+(json.total===1?'':'s')+' matched · '+new Intl.NumberFormat('en-US').format(json.datasetTotal)+' source records in this collection';
   updated.textContent='Public listings · No live campground availability';
   directory.innerHTML=(json.results||[]).length?json.results.map(renderCard).join(''):'<div class="atlas-empty"><h3>No matches found</h3><p>Try another state or name. The state park agency portals below remain available.</p></div>';
   refreshPager();
  }catch(err){
   if(token!==requestToken)return;
   status.textContent='National data is currently unavailable. Browse official state park links below.';
   updated.textContent='Featured source-checked examples shown as a fallback';
   totalPages=page=1;refreshPager();
   try{
    const resp=await fetch('/assets/mrr-campgrounds.json');if(!resp.ok)throw Error('Fallback not available');
    let rows=await resp.json();if(state.value)rows=rows.filter(x=>x.state===state.value);
    if(search.value.trim())rows=rows.filter(x=>(x.name+' '+x.region).toLowerCase().includes(search.value.trim().toLowerCase()));
    directory.innerHTML='<p class="atlas-fallback-label">Small offline sample only. These are not the complete national directory.</p>'+ (rows.length?rows.map((x,i)=>renderCard({id:'fallback-'+i,name:x.name,state:x.state,city:x.region,category:'Verified source link · featured example',source:x.source,official:x.url,description:x.note})).join(''):'<p class="atlas-empty">No sample results for this filter. Use the official state agency directory below.</p>');
   }catch{directory.innerHTML='<p class="atlas-empty">No records available. Use the official state park agency list below or try again later.</p>'}
  }
 }
 $('#atlas-search-form').addEventListener('submit',e=>{e.preventDefault();page=1;load()});
 state.addEventListener('change',()=>{page=1;load()});
 kind.addEventListener('change',()=>{page=1;load()});
 prev.addEventListener('click',()=>{if(page>1){page--;load();$('#browse-campgrounds').scrollIntoView({behavior:'smooth',block:'start'})}});
 next.addEventListener('click',()=>{if(page<totalPages){page++;load();$('#browse-campgrounds').scrollIntoView({behavior:'smooth',block:'start'})}});
 document.querySelectorAll('[data-state-explore]').forEach(b=>b.addEventListener('click',()=>{state.value=b.dataset.stateExplore;kind.value='campgrounds';search.value='';page=1;load();$('#browse-campgrounds').scrollIntoView({behavior:'smooth'})}));
 const stateFilter=$('#atlas-state-filter');if(stateFilter)stateFilter.addEventListener('input',()=>{const q=stateFilter.value.trim().toLowerCase();document.querySelectorAll('.atlas-state-card').forEach(card=>{card.hidden=!((card.dataset.state||'').includes(q)||(card.dataset.code||'').toLowerCase()===q)})});
 load();
})();
