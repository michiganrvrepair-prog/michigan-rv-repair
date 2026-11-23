/* MRR RoadLife. Browser uses only Supabase's PUBLIC publishable key.
 * Every stored member record is protected by Supabase Row Level Security.
 * Never add service_role, Truvo or any other private credentials here.
 */
(() => {
  'use strict';
  const SUPABASE_URL = 'https://qxolqdrdypfjtkqgbmoi.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_owYCTZ04rHA-keIw16413Q_CVdiW9t6';
  const $ = id => document.getElementById(id);
  const get = id => ($(id)?.value || '').trim();
  const state = { user: null, rvs: [], tasks: [], favorites: [], newsletter: null, passport: null, client: null, loading: false };
  const labels = {
    'travel-trailer': 'Travel trailer', 'fifth-wheel': 'Fifth wheel', 'motorhome': 'Motorhome',
    'campervan': 'Camper van', 'pop-up': 'Pop-up', 'truck-camper': 'Truck camper', 'other': 'RV'
  };
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = String(text ?? '');
    return node;
  };
  const button = (text, action, cls = 'rl-btn secondary small') => {
    const n = el('button', cls, text);
    n.type = 'button';
    n.addEventListener('click', action);
    return n;
  };
  const tell = (message, error = false, target = 'rl-message') => {
    const node = $(target);
    if (node) { node.textContent = message; node.classList.toggle('error', error); }
  };
  const display = (id, visible) => { $(id).hidden = !visible; };
  const friendly = err => (err && err.message) ? err.message : 'We could not complete that request. Please try again.';
  const validUrl = raw => {
    if (!raw) return null;
    try { const url = new URL(raw); return ['https:', 'http:'].includes(url.protocol) ? url.toString() : null; }
    catch { return null; }
  };
  const labelRV = rv => [rv.rv_year, rv.make, rv.model].filter(Boolean).join(' ') || (labels[rv.rv_type] || 'RV');
  const plainNote = text => el('p', '', text || '');
  const safeLink = (url, text) => {
    const a = el('a', '', text);
    a.href = validUrl(url) || '#'; a.target = '_blank'; a.rel = 'noopener noreferrer nofollow';
    return a;
  };
  async function handleSession(session) {
    const user = session?.user ?? null;
    if (user && user.is_anonymous) { tell('Use an email-based account to access RoadLife.', true, 'rl-login-status'); return; }
    state.user = user;
    display('rl-auth', !user); display('rl-dashboard', !!user);
    if (user) {
      $('rl-user-email').textContent = user.email || 'Member';
      await loadAll();
    } else {
      state.rvs = []; state.tasks = []; state.favorites = [];state.newsletter=null;state.passport=null;
    }
  }
  async function loadAll() {
    if (!state.user || state.loading) return;
    state.loading = true;
    tell('Loading your private RoadLife records…');
    const id = state.user.id;
    try {
      const [r, t, f, n, p] = await Promise.all([
        state.client.from('mrr_roadlife_rvs').select('id,user_id,nickname,rv_type,rv_year,make,model,notes,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(250),
        state.client.from('mrr_roadlife_tasks').select('id,user_id,rv_id,title,due_date,completed,notes,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(600),
        state.client.from('mrr_roadlife_favorites').select('id,user_id,campground_name,city,state,website_url,notes,created_at').eq('user_id', id).order('created_at', { ascending: false }).limit(300),
        state.client.from('mrr_roadlife_newsletter_preferences').select('user_id,subscribed,home_state,national_roundup,opted_in_at,opted_out_at').eq('user_id',id).maybeSingle(),
        state.client.from('mrr_roadlife_passports').select('user_id,code,percent_off,max_discount_usd,issued_at,expires_on,redemption_status').eq('user_id',id).maybeSingle()
      ]);
      const error = r.error || t.error || f.error || n.error || p.error;
      if (error) throw error;
      state.rvs = r.data || []; state.tasks = t.data || []; state.favorites = f.data || []; state.newsletter=n.data||null;
      state.passport=p.data||null;
      // First successful email-based member session: issue exactly one server-generated voucher.
      // Client has INSERT permission only on user_id. The DB generates code, discount and status.
      if (!state.passport) {
        const {data:issued,error:issueError}=await state.client.from('mrr_roadlife_passports')
          .insert({user_id:id})
          .select('user_id,code,percent_off,max_discount_usd,issued_at,expires_on,redemption_status').single();
        if (!issueError) state.passport=issued;
        else if (issueError.code==='23505') {
          const {data:existing}=await state.client.from('mrr_roadlife_passports')
            .select('user_id,code,percent_off,max_discount_usd,issued_at,expires_on,redemption_status')
            .eq('user_id',id).maybeSingle();state.passport=existing||null;
        } else tell('Your RV records loaded, but your Savings Passport could not be issued: '+friendly(issueError),true,'rl-passport-status');
      }
      paintAll(); tell('Your garage is ready. Changes save securely to your account.');
    } catch (err) { tell('Unable to load your data: ' + friendly(err), true); }
    finally { state.loading = false; }
  }
  function empty(parent, message) { parent.appendChild(el('div', 'rl-empty', message)); }
  function paintRVs() {
    const holder = $('rl-rv-list'); holder.replaceChildren();
    $('rl-rv-count').textContent = state.rvs.length;
    if (!state.rvs.length) empty(holder, 'Your garage is empty. Add your first RV using the form.');
    for (const rv of state.rvs) {
      const card = el('article', 'rl-item'); const content = el('div');
      content.appendChild(el('div', 'rl-item-title', rv.nickname));
      content.appendChild(el('div', 'rl-item-meta', labelRV(rv) + ' · ' + (labels[rv.rv_type] || 'RV')));
      if (rv.notes) content.appendChild(plainNote(rv.notes));
      const actions = el('div', 'rl-item-buttons');
      actions.appendChild(button('Edit', () => editRV(rv)));
      actions.appendChild(button('Delete', () => removeRV(rv), 'rl-btn ghost small'));
      card.append(content, actions); holder.appendChild(card);
    }
    const select = $('rl-task-rv'); select.replaceChildren();
    if (!state.rvs.length) select.appendChild(el('option', '', 'Add an RV first'));
    for (const rv of state.rvs) {
      const option = el('option', '', rv.nickname + ' — ' + labelRV(rv));
      option.value = rv.id; select.appendChild(option);
    }
    $('rl-task-form').querySelector('button[type=submit]').disabled = !state.rvs.length;
  }
  function paintTasks() {
    const holder = $('rl-task-list'); holder.replaceChildren();
    const sorted = [...state.tasks].sort((a,b) => Number(a.completed) - Number(b.completed) || (a.due_date || '9999').localeCompare(b.due_date || '9999'));
    if (!sorted.length) empty(holder, 'No maintenance tasks saved yet. Add a roof inspection, annual service, or other reminder.');
    const today = new Date().toISOString().slice(0,10);
    for (const task of sorted) {
      const rv = state.rvs.find(v => v.id === task.rv_id);
      const card = el('article', 'rl-item'); const content = el('div');
      const heading = el('div', 'rl-item-title', task.title); if (task.completed) heading.style.textDecoration = 'line-through';
      content.appendChild(heading);
      content.appendChild(el('div','rl-item-meta', (rv?.nickname || 'RV') + (task.due_date ? ' · Due ' + task.due_date : ' · No due date')));
      const status = el('span', 'rl-pill' + ((!task.completed && task.due_date && task.due_date < today) ? ' due' : ''), task.completed ? 'Completed' : (task.due_date && task.due_date < today ? 'Past due' : 'Open'));
      content.appendChild(status);
      if (task.notes) content.appendChild(plainNote(task.notes));
      const actions = el('div', 'rl-item-buttons');
      actions.appendChild(button(task.completed ? 'Reopen' : 'Done', () => toggleTask(task)));
      actions.appendChild(button('Remove', () => removeRecord('mrr_roadlife_tasks', task, 'task')));
      card.append(content,actions);holder.appendChild(card);
    }
  }
  function paintFavorites() {
    const holder = $('rl-favorite-list'); holder.replaceChildren();
    if (!state.favorites.length) empty(holder, 'No campgrounds saved yet. Add one from your travel plans.');
    for (const favorite of state.favorites) {
      const card = el('article','rl-item'); const content = el('div');
      content.appendChild(el('div', 'rl-item-title', favorite.campground_name));
      content.appendChild(el('div', 'rl-item-meta', [favorite.city,favorite.state].filter(Boolean).join(', ')));
      if (favorite.notes) content.appendChild(plainNote(favorite.notes));
      if (validUrl(favorite.website_url)) content.appendChild(safeLink(favorite.website_url, 'Visit campground website ↗'));
      const actions = el('div', 'rl-item-buttons');
      actions.appendChild(button('Remove', () => removeRecord('mrr_roadlife_favorites',favorite,'campground')));
      card.append(content,actions);holder.appendChild(card);
    }
  }
  const STATES = [['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming']];
  function paintPassport(){
    const pass=state.passport, code=$('rl-passport-code'), status=$('rl-passport-status');
    if(!code)return;
    $('rl-passport-copy').disabled=!pass;
    $('rl-passport-print').disabled=!pass;
    code.textContent=pass?.code||'Sign in to generate your member code';
    $('rl-passport-meta').textContent=pass
      ? `Member pass · ${pass.percent_off}% off eligible MRR labor (up to $${Number(pass.max_discount_usd).toFixed(0)}) · Expires ${pass.expires_on} · Status: ${pass.redemption_status}`
      : 'Contact MRR if your pass does not appear after signing in.';
    if(pass){status.textContent=pass.redemption_status==='redeemed'?'This voucher was already redeemed. Your free membership remains active.':
      pass.redemption_status==='void'?'This voucher is unavailable. Contact MRR for details.':'Your one-time MRR service voucher is ready. Save your code and mention it before approving your estimate.';
      const mail=new URL('mailto:service@michigan-rv-repair.com');
      mail.searchParams.set('subject','RoadLife member repair request — '+pass.code);
      mail.searchParams.set('body','Hello MRR, I am a RoadLife member and would like an eligible service estimate. My code is '+pass.code+'. Please confirm the service area, the labor discount, and availability before scheduling.');
      $('rl-passport-service').href=mail.toString();
    }
  }
  function paintNewsletter(){ const n=state.newsletter;
    $('rl-news-optin').checked=!!n?.subscribed;
    $('rl-news-state').value=n?.home_state||'MI';
    $('rl-news-national').checked=n?.national_roundup!==false;
    tell(n?.subscribed?'Email preference saved. Monthly editions are not sending yet; we will announce launch after the sender and deals are verified.':'No marketing subscription is active.',false,'rl-news-status');
  }
  async function saveNewsletter(event){event.preventDefault();if(!state.user)return;
    const subscribed=$('rl-news-optin').checked;
    const now=new Date().toISOString();
    const input={user_id:state.user.id,subscribed,home_state:get('rl-news-state'),national_roundup:$('rl-news-national').checked,
      opted_in_at: subscribed ? (state.newsletter?.subscribed ? (state.newsletter.opted_in_at||now) : now) : (state.newsletter?.opted_in_at||null),
      opted_out_at:subscribed?null:now,
      consent_version:subscribed?'2026-11-roadlife-deals-v1':(state.newsletter?.subscribed?'2026-11-roadlife-deals-v1':null),
      updated_at:now};
    $('rl-news-save').disabled=true;
    try{const {error}=await state.client.from('mrr_roadlife_newsletter_preferences').upsert(input,{onConflict:'user_id'});if(error)throw error;
      state.newsletter={...input};paintNewsletter();tell(subscribed?'Saved! Your interest is recorded. Monthly emails are not sending yet.':'Unsubscribed from MRR monthly deal emails.',false,'rl-news-status');
    }catch(err){tell('Could not save email preferences: '+friendly(err),true,'rl-news-status')}
    finally{$('rl-news-save').disabled=false}
  }
  function paintAll() { paintPassport(); paintRVs(); paintTasks(); paintFavorites(); paintNewsletter(); }
  function editRV(rv) {
    $('rl-rv-id').value = rv.id;
    $('rl-rv-name').value = rv.nickname || '';
    $('rl-rv-type').value = rv.rv_type || 'other';
    $('rl-rv-year').value = rv.rv_year || '';
    $('rl-rv-make').value = rv.make || '';
    $('rl-rv-model').value = rv.model || '';
    $('rl-rv-notes').value = rv.notes || '';
    $('rl-rv-save').textContent = 'Update RV';
    $('rl-rv-name').focus();
    document.getElementById('rl-rv-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function clearRV() { $('rl-rv-form').reset(); $('rl-rv-id').value=''; $('rl-rv-save').textContent='Save RV'; }
  async function saveRV(event) {
    event.preventDefault();
    const user = state.user; if (!user) return;
    const year = get('rl-rv-year');
    const data = {
      nickname:get('rl-rv-name'), rv_type:get('rl-rv-type'), rv_year:year ? Number(year) : null,
      make:get('rl-rv-make') || null, model:get('rl-rv-model') || null,
      notes:get('rl-rv-notes') || null, updated_at:new Date().toISOString()
    };
    if (!data.nickname || (year && (Number(year)<1900 || Number(year)>2100))) return tell('Enter a nickname and a valid RV year.',true);
    const existingId = get('rl-rv-id'); let result;
    if (existingId) result = await state.client.from('mrr_roadlife_rvs').update(data).eq('id',existingId).eq('user_id',user.id);
    else result = await state.client.from('mrr_roadlife_rvs').insert({...data,user_id:user.id});
    if (result.error) return tell('Could not save RV: '+friendly(result.error),true);
    clearRV(); await loadAll();
  }
  async function removeRV(rv) {
    if (!confirm(`Delete "${rv.nickname}" and all its saved maintenance tasks? This can't be undone.`)) return;
    await removeRecord('mrr_roadlife_rvs',rv,'RV',true);
    clearRV();
  }
  async function removeRecord(table, record, description, silent = false) {
    if (!silent && !confirm(`Remove this ${description} from RoadLife?`)) return;
    const {error} = await state.client.from(table).delete().eq('id',record.id).eq('user_id',state.user.id);
    if (error) return tell('Could not delete: '+friendly(error),true);
    await loadAll();
  }
  async function saveTask(event) {
    event.preventDefault(); if (!state.user || !state.rvs.length) return;
    const rvId = get('rl-task-rv');
    if (!state.rvs.some(rv => rv.id === rvId)) return tell('Choose one of your RVs before adding a task.',true);
    const {error} = await state.client.from('mrr_roadlife_tasks').insert({
      user_id:state.user.id,rv_id:rvId,title:get('rl-task-title'),due_date:get('rl-task-date') || null,notes:get('rl-task-notes') || null
    });
    if (error) return tell('Could not save task: '+friendly(error),true);
    $('rl-task-form').reset(); await loadAll();
  }
  async function toggleTask(task) {
    const {error} = await state.client.from('mrr_roadlife_tasks').update({completed:!task.completed,updated_at:new Date().toISOString()}).eq('id',task.id).eq('user_id',state.user.id);
    if (error) return tell('Could not update task: '+friendly(error),true);
    await loadAll();
  }
  async function saveFavorite(event) {
    event.preventDefault(); if (!state.user) return;
    const rawUrl = get('rl-fav-url'), url = rawUrl ? validUrl(rawUrl) : null;
    if (rawUrl && !url) return tell('Enter a valid http or https campground website address.',true);
    const {error} = await state.client.from('mrr_roadlife_favorites').insert({
      user_id:state.user.id,campground_name:get('rl-fav-name'),city:get('rl-fav-city') || null,
      state:get('rl-fav-state').toUpperCase(), website_url:url,notes:get('rl-fav-notes') || null
    });
    if (error) return tell('Could not save campground: '+friendly(error),true);
    $('rl-favorite-form').reset(); $('rl-fav-state').value='MI'; await loadAll();
  }
  function saveExport() {
    if (!state.user) return;
    const content = JSON.stringify({exported_at:new Date().toISOString(),format:'MRR RoadLife export v1',
      rvs:state.rvs,tasks:state.tasks,campgrounds:state.favorites,newsletter_preferences:state.newsletter,savings_passport:state.passport},null,2);
    const url = URL.createObjectURL(new Blob([content], {type:'application/json'}));
    const a = document.createElement('a'); a.href=url; a.download='mrr-roadlife-backup-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
    tell('Download started. Store your backup securely because it contains personal RV notes.');
  }
  async function deleteAll() {
    if (!state.user) return;
    if (prompt('To permanently remove ALL saved RVs, reminders and campgrounds, type DELETE') !== 'DELETE') return;
    tell('Deleting your saved RoadLife records…');
    // Keep the one-time service voucher against reissue. Voucher erasure requires a verified account deletion request.
    for (const table of ['mrr_roadlife_newsletter_preferences','mrr_roadlife_tasks','mrr_roadlife_favorites','mrr_roadlife_rvs']) {
      const {error} = await state.client.from(table).delete().eq('user_id',state.user.id);
      if (error) { tell('Stopped: '+friendly(error),true); return; }
    }
    clearRV(); await loadAll(); tell('All saved RoadLife records deleted. Your email login still exists.');
  }
  function tabs(event) {
    const tab = event.currentTarget.dataset.tab;
    document.querySelectorAll('.rl-tab').forEach(btn=>btn.setAttribute('aria-selected', String(btn.dataset.tab===tab)));
    ['passport','garage','maintenance','favorites','newsletter'].forEach(name=> { $( `rl-${name}-pane` ).hidden=name!==tab; });
  }
  async function sendLogin(event) {
    event.preventDefault();
    $('rl-login-button').disabled=true;
    tell('Sending sign-in email…',false,'rl-login-status');
    try {
      const {error}=await state.client.auth.signInWithOtp({
        email:get('rl-email'),
        options:{emailRedirectTo:window.location.origin+'/roadlife/',shouldCreateUser:true}
      });
      if (error) throw error;
      tell('Check your email for the RoadLife sign-in link. You can safely close this tab.',false,'rl-login-status');
    } catch(e) {tell('Unable to send email: '+friendly(e),true,'rl-login-status');}
    finally{$('rl-login-button').disabled=false;}
  }
  async function init() {
    if (!window.supabase?.createClient) {
      tell('Member sign-in cannot load right now. Please check your connection or try another browser.',true,'rl-login-status');
      $('rl-setup-note').textContent='Member services temporarily unavailable.';
      return;
    }
    try {
      state.client = window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{
        auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'implicit'}
      });
      $('rl-setup-note').textContent='Your private member area is prepared. Email links require MRR to activate verified email delivery.';
      state.client.auth.onAuthStateChange((_event, session) => {setTimeout(()=>handleSession(session),0);});
      const {data,error}=await state.client.auth.getSession();
      if (error) throw error;
      await handleSession(data.session);
    } catch(e){tell('RoadLife sign-in could not initialize: '+friendly(e),true,'rl-login-status');}
  }
  $('rl-login-form').addEventListener('submit',sendLogin);
  $('rl-rv-form').addEventListener('submit',saveRV);
  $('rl-rv-clear').addEventListener('click',clearRV);
  $('rl-task-form').addEventListener('submit',saveTask);
  $('rl-favorite-form').addEventListener('submit',saveFavorite);
  $('rl-news-form').addEventListener('submit',saveNewsletter);
  $('rl-passport-copy').addEventListener('click',async()=>{
    if(!state.passport)return;
    try{await navigator.clipboard.writeText(state.passport.code);tell('Member code copied.',false,'rl-passport-status')}
    catch{tell('Copy unavailable in this browser. Select the code above to copy it.',true,'rl-passport-status')}
  });
  $('rl-passport-print').addEventListener('click',()=>window.print());
  const newsSelect=$('rl-news-state');newsSelect.replaceChildren();
  for(const [code,name] of STATES){const option=el('option','',name);option.value=code;newsSelect.append(option)}
  $('rl-export').addEventListener('click',saveExport);
  $('rl-delete-all').addEventListener('click',deleteAll);
  $('rl-signout').addEventListener('click', async()=> {
    await state.client.auth.signOut();
    tell('Signed out.');
    window.location.hash='account';
  });
  document.querySelectorAll('.rl-tab').forEach(btn=>btn.addEventListener('click',tabs));
  init();
})();
