/* MRR Michigan Campgrounds | Search via MRR's read-only Netlify/Supabase API.
 * Does not request external ArcGIS data for each visitor.
 * Starter examples only show if the server endpoint is unavailable.
 */
'use strict';
(() => {
  const root = document.querySelector('#mrr-michigan-main');
  if (!root) return;
  const $ = (s) => root.querySelector(s);
  const safe = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const verifiedUrl = (s) => { try { const u = new URL(s); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } };
  const DNR = 'https://www.michigan.gov/recsearch/locator';
  const BOOK = 'https://www.midnrreservations.com/';
  const results = $('#mi-campground-results'), status = $('#mi-status'), sourceStatus = $('#mi-source-status');
  const search = $('#mi-search'), category = $('#mi-category'), region = $('#mi-region');
  const prev = $('#mi-prev'), next = $('#mi-next'), pageLabel = $('#mi-page-label');
  const PER = 18;
  let page = 1, total = 0, mode = 'starting', current = [], offline = [], timer = null, runNumber = 0;
  function mapUrl(x) {
    const lat = Number(x.latitude ?? x.lat), lon = Number(x.longitude ?? x.lon);
    const has = Number.isFinite(lat) && Number.isFinite(lon) && lat >= 41 && lat <= 49 && lon >= -91 && lon <= -82;
    const loc = has ? `${lat.toFixed(5)},${lon.toFixed(5)}` : `${x.name}, ${x.city || ''}, Michigan`;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(loc);
  }
  function adapt(row) {
    return {
      name: row.name || 'Unidentified campground', city: row.city || '', category: row.category || 'other',
      categoryName: row.category_label || ({'state-park':'State park campground','state-forest':'State forest campground'}[row.category] || 'Campground / RV park'),
      region: row.region || 'unknown', lat: row.latitude, lon: row.longitude,
      site: verifiedUrl(row.website_url), booking: verifiedUrl(row.booking_url),
      map: mapUrl(row), source: row.source_name || 'MRR campground listing',
      sourceUrl: verifiedUrl(row.source_url), isUnverified: row.verification_status === 'unverified',
      searchText: [row.name, row.city, row.county].join(' ').toLowerCase()
    };
  }
  function renderCard(x) {
    let links = `<a href="${safe(verifiedUrl(x.map))}" target="_blank" rel="noopener noreferrer" class="mi-link mi-primary">Locate campground ↗</a>`;
    if (x.site) links += `<a href="${safe(x.site)}" target="_blank" rel="noopener noreferrer" class="mi-link">Campground website ↗</a>`;
    if (x.booking) links += `<a href="${safe(x.booking)}" target="_blank" rel="noopener noreferrer" class="mi-link">Campground booking ↗</a>`;
    else if (x.category === 'state-park') links += `<a href="${BOOK}" target="_blank" rel="noopener noreferrer" class="mi-link">Search state reservations ↗</a>`;
    if (x.category === 'state-park' || x.category === 'state-forest') links += `<a href="${DNR}" target="_blank" rel="noopener noreferrer" class="mi-link">DNR directory ↗</a>`;
    if (x.sourceUrl) links += `<a href="${safe(x.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="mi-link">Listing source ↗</a>`;
    return `<article class="mi-result-card"><div class="mi-result-top"><span>${safe(x.categoryName)}</span></div><h3>${safe(x.name)}</h3><p class="mi-location">${safe([x.city,'Michigan'].filter(Boolean).join(', '))}</p><p class="mi-source-label">Source: ${safe(x.source)}</p>${x.isUnverified ? '<p class="mi-source-label">Details not recently verified</p>' : ''}<div class="mi-result-links">${links}</div></article>`;
  }
  function display(data) {
    const pages = Math.max(1, Math.ceil(total / PER));
    page = Math.min(page, pages);
    results.innerHTML = data.length ? data.map(renderCard).join('') : '<div class="mi-empty"><h3>No listings found</h3><p>Try another destination or category, or use the official Michigan resources below.</p></div>';
    pageLabel.textContent = `Page ${page} of ${pages}`;
    prev.disabled = page <= 1;
    next.disabled = page >= pages;
    const label = mode === 'database' ? 'MRR database listings' : 'illustrative Michigan examples';
    status.textContent = `${total.toLocaleString()} matching ${label} · page ${page}`;
  }
  async function loadExamples() {
    try {
      const r = await fetch('/assets/mrr-michigan-featured.json');
      if (!r.ok) throw new Error('Local starter file missing');
      const arr = await r.json();
      offline = arr.map(x => ({
        ...x, category: /Independent/i.test(x.category) ? 'other' : 'state-park',
        categoryName: x.category, site: verifiedUrl(x.site || ''), booking: '',
        isUnverified: true, searchText: [x.name, x.city, x.region].join(' ').toLowerCase(),
        sourceUrl: '',
        region: x.region === 'Upper Peninsula' ? 'up' : x.region === 'Northern Lower Peninsula' ? 'northern' :
          ['West Michigan','Eastern Lower Peninsula','South Central Michigan'].includes(x.region) ? 'central' : 'southern'
      }));
    } catch { offline = []; }
  }
  async function query() {
    const thisRun = ++runNumber;
    const qs = new URLSearchParams({ page: String(page), q: search.value.trim(), category: category.value, region: region.value });
    try {
      const res = await fetch('/.netlify/functions/michigan-campgrounds?' + qs.toString(), { headers: { Accept:'application/json' } });
      if (!res.ok) throw new Error('API not configured or unavailable');
      const data = await res.json();
      if (thisRun !== runNumber) return;
      mode = 'database'; total = data.total || 0;
      current = (data.results || []).map(adapt);
      sourceStatus.textContent = 'MRR Supabase directory · links shown when known';
    } catch {
      if (thisRun !== runNumber) return;
      mode = 'starter';
      const needle = search.value.toLowerCase().trim(), cat = category.value, reg = region.value;
      const matches = offline.filter(x => (cat === 'all' || cat === x.category) && (reg === 'all' || reg === x.region) && (!needle || x.searchText.includes(needle)));
      total = matches.length;
      current = matches.slice((page - 1) * PER, page * PER);
      sourceStatus.textContent = 'Illustrative starter examples · live database not connected';
    }
    display(current);
  }
  function schedule() { page = 1; clearTimeout(timer); timer = setTimeout(query, 180); }
  $('#mi-search-form').addEventListener('submit', e => { e.preventDefault(); page = 1; query(); });
  [search,category,region].forEach(el => el.addEventListener(el === search ? 'input' : 'change', schedule));
  root.querySelectorAll('[data-mi-city]').forEach(button => button.addEventListener('click', () => {
    search.value = button.dataset.miCity || ''; category.value = 'all'; region.value = 'all'; page = 1; query();
    $('#michigan-directory').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  prev.addEventListener('click', () => { if (page > 1) { page--; query(); $('#michigan-directory').scrollIntoView({behavior:'smooth'}); } });
  next.addEventListener('click', () => { if (page * PER < total) { page++; query(); $('#michigan-directory').scrollIntoView({behavior:'smooth'}); } });
  loadExamples().then(query);
})();
