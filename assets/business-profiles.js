/* MRR public BUSINESS PROFILE URLs only. Do not use owner dashboards or generic platform homepages.
   Put verified URLs in the empty strings below, then redeploy the site.
   Never paste login, invitation, invoice, or customer-specific URLs here. */
window.MRR_PROFILES = {
  "google": "https://www.google.com/maps/place/Michigan+RV+Repair/@42.8233115,-85.937241,9z/data=!4m16!1m9!3m8!1s0x27d2678e7ba29323:0xd7ec01c7873efe7b!2sMichigan+RV+Repair!8m2!3d42.8233115!4d-85.937241!9m1!1b1!16s%2Fg%2F11zwqxmz9m!3m5!1s0x27d2678e7ba29323:0xd7ec01c7873efe7b!8m2!3d42.8233115!4d-85.937241!16s%2Fg%2F11zwqxmz9m",
  "nextdoor": "https://nextdoor.com/page/michigan-rv-repair-wyoming-mi",
  "yelp": "",
  "bbb": "",
  "alignable": "",
  "bing": "",
  "apple": "",
  "angi": "",
  "rvnetwork": ""
};

(function () {
  function valid(u) {
    if (typeof u !== 'string' || !u.trim()) return null;
    try { var p = new URL(u.trim()); return p.protocol === 'https:' ? p.href : null; } catch(e) { return null; }
  }
  function setProfiles() {
    document.querySelectorAll('[data-profile]').forEach(function(card) {
      var id = card.getAttribute('data-profile');
      var u = valid((window.MRR_PROFILES || {})[id]);
      var button = card.querySelector('[data-profile-link]');
      var status = card.querySelector('[data-profile-status]');
      if (!button) return;
      if (u) {
        button.href = u; button.hidden = false; button.setAttribute('target','_blank');
        button.setAttribute('rel','noopener noreferrer');
        if (status) status.hidden = true;
      } else {
        button.removeAttribute('href'); button.hidden = true;
        if (status) status.hidden = false;
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setProfiles);
  else setProfiles();
})();
