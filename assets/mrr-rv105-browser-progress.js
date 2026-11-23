/* Local-only reading markers, never formal academic records. */
(function(){
  'use strict';
  var root=document.getElementById('semester-course'); if(!root)return;
  var KEY='mrr-rv105-reviewed-weeks-v1';
  var checks=Array.prototype.slice.call(root.querySelectorAll('.mrr-semester-check'));
  var state={};
  try{var raw=JSON.parse(localStorage.getItem(KEY)||'{}');if(raw && typeof raw==='object')state=raw;}catch(e){}
  function update(){
    var count=0;
    checks.forEach(function(ch){if(ch.checked)count++;});
    var label=document.getElementById('mrr-semester-count'); if(label)label.textContent=count+' / '+checks.length;
  }
  checks.forEach(function(ch){
    var w=ch.getAttribute('data-week');ch.checked=state[w]===true;
    ch.addEventListener('change',function(){state[w]=ch.checked;try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}update();});
  });
  root.querySelectorAll('[data-open-week]').forEach(function(link){
    link.addEventListener('click',function(){
      var id='mrr-week-'+String(link.getAttribute('data-open-week')).padStart(2,'0');
      var target=document.getElementById(id);if(target)target.open=true;
    });
  });
  function openHash(){
    var target=document.getElementById(location.hash.replace('#',''));
    if(target && target.tagName.toLowerCase()==='details')target.open=true;
  }
  window.addEventListener('hashchange',openHash);openHash();update();
})();
