// Run from the repository root: node tools/seo-audit.mjs
// Static checks only: not an HTTP crawler, renderer, or Google indexing report.
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), domain='https://michigan-rv-repair.com';
const exists=p=>fs.existsSync(path.join(root,p));
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const urls=[...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const issues=[], titles=new Map(), descriptions=new Map();
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
const note=(p,problem)=>issues.push({page:p,problem});
function record(map,value,p){if(!value)return;const v=value.trim();map.set(v,[...(map.get(v)||[]),p]);}
function localFile(u){let r=u.replace(/^\//,'');if(!r||r.endsWith('/'))r+='index.html';if(exists(r)&&fs.statSync(path.join(root,r)).isFile())return r;if(exists(r+'/index.html'))return r+'/index.html';return null;}
if(new Set(urls).size!==urls.length)note('sitemap.xml','duplicate URL');
let checked=0;
for(const u of new Set(urls)){
 if(!u.startsWith(domain+'/')){note(u,'unexpected sitemap host');continue;}
 const p=localFile(u.slice(domain.length));if(!p){note(u,'missing sitemap file');continue;}
 const s=read(p), h=s.split(/<\/head>/i)[0], title=h.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
 const metas=[...h.matchAll(/<meta\b[^>]*>/gi)].map(m=>attrs(m[0]));
 const desc=metas.find(x=>x.name==='description')?.content;
 const canon=[...h.matchAll(/<link\b[^>]*>/gi)].map(m=>attrs(m[0])).filter(x=>x.rel==='canonical');
 if(!title)note(p,'missing title');if(!desc)note(p,'missing description');
 record(titles,title,p);record(descriptions,desc,p);
 if(canon.length!==1||canon[0].href!==u)note(p,'missing or mismatched canonical');
 if(metas.some(x=>x.name==='robots'&&/noindex/i.test(x.content||'')))note(p,'noindex URL in sitemap');
 if([...s.matchAll(/<h1\b/gi)].length!==1)note(p,'expected one H1');
 for(const m of s.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{JSON.parse(m[1]);}catch{note(p,'invalid JSON-LD');}}
 const links=new Set([...s.matchAll(/(?:href|src)=["'](\/(?!\/)[^"'#?]*)(?:[?#][^"']*)?["']/gi)].map(m=>m[1]));
 for(const l of links){if(!localFile(l))note(p,'missing internal target '+l);}
 checked++;
}
for(const [v,ps] of titles)if(ps.length>1)note(ps.join(', '),'duplicate title: '+v);
for(const [v,ps] of descriptions)if(ps.length>1)note(ps.join(', '),'duplicate description: '+v);
console.log(JSON.stringify({sitemapUrls:urls.length,checked,issues},null,2));
process.exitCode=issues.length?1:0;
