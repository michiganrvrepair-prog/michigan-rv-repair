/* MRR referral measurement hook. No cookies, storage, identifiers or network requests.
   Analytics export is disabled unless a separately configured consent integration explicitly grants it. */
(()=>{'use strict';
 if(window.__mrrReferralHookInstalled)return;
 window.__mrrReferralHookInstalled=true;
 const partners=new Map([
  ['https://www.jdoqocy.com/click-101918470-17219037?utm_source=chatgpt.com','rvshare'],
  ['https://www.outdoorsy.com/invite/briceb305353','outdoorsy'],
  ['https://i.refs.cc/1dWNtQ4R','rv_parts_giant'],
  ['https://www.truvo.com/r/michigan','truvo']
 ]);
 function handle(event){
  if(event.type==='auxclick'&&event.button!==1)return;
  const link=event.target instanceof Element?event.target.closest('a[href]'):null;
  if(!link)return;
  const partner=partners.get(link.getAttribute('href'));
  if(!partner)return;
  const detail={partner,source_path:location.pathname};
  document.dispatchEvent(new CustomEvent('mrr:affiliate-click',{detail}));
  if(window.MRR_ANALYTICS_CONSENT===true){
   window.dataLayer=window.dataLayer||[];
   window.dataLayer.push({event:'mrr_affiliate_click',...detail});
  }
 }
 document.addEventListener('click',handle,true);
 document.addEventListener('auxclick',handle,true);
})();
