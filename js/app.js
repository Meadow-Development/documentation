/* js/app.js */
(function(){
  const menuEl = document.getElementById('menu');
  const contentEl = document.getElementById('content');
  const searchInput = document.getElementById('searchInput');
  const langSelect = document.getElementById('langSelect');
  const yearEl = document.getElementById('year');

  yearEl.textContent = new Date().getFullYear();

  // Sprache: localStorage fallback
  const LS_LANG = 'fivem_docs_lang';
  let LANG = localStorage.getItem(LS_LANG) || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'de');
  langSelect.value = LANG;

  langSelect.addEventListener('change', () => {
    LANG = langSelect.value;
    localStorage.setItem(LS_LANG, LANG);
    renderMenu(searchInput.value.trim());
    // attempt to reload current hash
    const {script, section} = parseHash();
    if(script && section) loadContent(script, section); else {
      // default first
      const first = firstScriptSection();
      if(first) loadContent(first.script, first.section);
    }
  });

  // Parse hash: #script/section
  function parseHash(){
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if(!hash) return {};
    const parts = hash.split('/');
    return { script: parts[0], section: parts[1] };
  }

  // Build menu based on DOCS
  function renderMenu(filter = '') {
    const q = filter.toLowerCase();
    menuEl.innerHTML = '';
    Object.keys(DOCS).forEach(scriptId => {
      const script = DOCS[scriptId];
      const group = document.createElement('div');
      group.className = 'nav-group';

      // title
      const title = document.createElement('div');
      title.className = 'nav-script';
      title.textContent = script.name[LANG] || script.name.de;
      group.appendChild(title);

      // list sections
      Object.keys(script.sections).forEach(sectionId => {
        const sec = script.sections[sectionId];
        // search check: matches script name OR section title OR content
        const hay = (script.name.de + ' ' + script.name.en + ' ' + (sec.title.de || '') + ' ' + (sec.title.en || '') + ' ' + (sec.html.de || '') + ' ' + (sec.html.en || '')).toLowerCase();
        if(q && !hay.includes(q)) return;

        const link = document.createElement('div');
        link.className = 'nav-link';
        link.tabIndex = 0;
        link.textContent = sec.title[LANG] || sec.title.de;
        link.dataset.script = scriptId;
        link.dataset.section = sectionId;
        link.addEventListener('click', () => {
          location.hash = `${scriptId}/${sectionId}`;
          loadContent(scriptId, sectionId);
        });
        link.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); link.click(); }
        });

        group.appendChild(link);
      });

      menuEl.appendChild(group);
    });

    // highlight active from hash
    highlightActiveFromHash();
  }

  // load content area
  function loadContent(scriptId, sectionId) {
    const script = DOCS[scriptId];
    if(!script) {
      contentEl.innerHTML = `<div class="card"><h1>404</h1><p>Script nicht gefunden: ${scriptId}</p></div>`;
      return;
    }
    const sec = script.sections[sectionId];
    if(!sec) {
      contentEl.innerHTML = `<div class="card"><h1>404</h1><p>Section nicht gefunden: ${sectionId}</p></div>`;
      return;
    }

    const title = (script.name[LANG] || script.name.de) + ' — ' + (sec.title[LANG] || sec.title.de);
    contentEl.innerHTML = `
      <div class="card" role="region" aria-labelledby="pageTitle">
        <h1 id="pageTitle">${escapeHtml(title)}</h1>
        <div class="page-body">${sec.html[LANG] || sec.html.de}</div>
      </div>
    `;

    // Attach copy handlers to <pre> blocks within content
    attachCopyButtons();

    // set focus for accessibility
    contentEl.focus();

    // update active link highlight
    highlightActiveFromHash();
  }

  function attachCopyButtons(){
    // For every pre, add a copy button if not present
    const pres = contentEl.querySelectorAll('pre');
    pres.forEach(pre => {
      if(pre.dataset.hasCopy) return;
      pre.dataset.hasCopy = '1';
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.innerText = (LANG === 'de') ? 'Kopieren' : 'Copy';
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          const old = btn.innerText;
          btn.innerText = (LANG === 'de') ? 'Kopiert!' : 'Copied!';
          setTimeout(() => btn.innerText = old, 1200);
        });
      });
      pre.parentNode.insertBefore(btn, pre.nextSibling);
    });
  }

  // Escape helper for small titles
  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  // Highlight active nav link based on location.hash
  function highlightActiveFromHash(){
    const {script, section} = parseHash();
    const links = menuEl.querySelectorAll('.nav-link');
    links.forEach(l => {
      if(l.dataset.script === script && l.dataset.section === section) l.classList.add('active');
      else l.classList.remove('active');
    });
  }

  // return first script+section
  function firstScriptSection(){
    for(const scriptId of Object.keys(DOCS)){
      const secs = Object.keys(DOCS[scriptId].sections || {});
      if(secs.length) return { script: scriptId, section: secs[0] };
    }
    return null;
  }

  // Search input
  searchInput.addEventListener('input', (e) => {
    renderMenu(e.target.value.trim());
  });

  // React to hashchange (back/forward)
  window.addEventListener('hashchange', () => {
    const {script, section} = parseHash();
    if(script && section) loadContent(script, section);
  });

  // Initial render
  renderMenu('');
  // Try to load from hash or default
  const {script, section} = parseHash();
  if(script && section) loadContent(script, section);
  else {
    const first = firstScriptSection();
    if(first) {
      location.hash = `${first.script}/${first.section}`;
      loadContent(first.script, first.section);
    } else contentEl.innerHTML = '<div class="card"><p>Keine Inhalte vorhanden.</p></div>';
  }

  // Expose some for debugging (optional)
  window.FIVEM_DOCS = { renderMenu, loadContent, DOCS };

})();
