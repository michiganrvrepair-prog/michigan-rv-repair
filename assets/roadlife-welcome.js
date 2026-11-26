/* A polite optional first-visit prompt. No email collection and no newsletter opt-in here. */
(()=>{'use strict';
const dialog=document.getElementById('rl-welcome-overlay');
if(!dialog||document.body.dataset.noMemberPrompt==='true')return;
const key='mrr-roadlife-invite-dismissed-until-v1';
const now=Date.now();
let hiddenUntil=0;try{hiddenUntil=Number(localStorage.getItem(key)||0)}catch{}
if(now<hiddenUntil)return;
let lastFocus=null;let opened=false;
const btnClose=dialog.querySelector('[data-welcome-close]');
const active=()=>[...dialog.querySelectorAll('a[href],button:not([disabled])')].filter(n=>n.offsetParent!==null);
function hide(){if(!opened)return;dialog.hidden=true;opened=false;document.body.style.overflow='';try{localStorage.setItem(key,String(Date.now()+30*24*60*60*1000))}catch{}lastFocus?.focus?.();}
function show(){if(opened||document.visibilityState!=='visible')return;lastFocus=document.activeElement;dialog.hidden=false;opened=true;document.body.style.overflow='hidden';btnClose?.focus();}
function handleKey(e){if(!opened)return;if(e.key==='Escape'){e.preventDefault();hide()}else if(e.key==='Tab'){const xs=active();if(!xs.length)return;const first=xs[0],last=xs[xs.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}
for(const node of dialog.querySelectorAll('[data-welcome-close]'))node.addEventListener('click',hide);
dialog.addEventListener('click',e=>{if(e.target===dialog)hide()});
document.addEventListener('keydown',handleKey);
// Keep the welcome invitation optional; wait for meaningful engagement instead of interrupting entry.
let eligible=false;
function maybeShow(){if(eligible&&window.scrollY>Math.max(400,window.innerHeight*0.75)&&document.visibilityState==='visible'){window.removeEventListener('scroll',maybeShow);show();}}
window.addEventListener('scroll',maybeShow,{passive:true});
window.setTimeout(()=>{eligible=true;maybeShow();},20000);
})();
