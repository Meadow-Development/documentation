/* js/app.js */
(function(){
  const menuEl = document.getElementById('menu');
  const contentEl = document.getElementById('content');
  const searchInput = document.getElementById('searchInput');
  const langSelect = document.getElementById('langSelect');
  const yearEl = document.getElementById('year');

  yearEl.textContent = new Date().getFullYear();

  if(typeof DOCS === 'undefined'){
    console.error('DOCS is not loaded — check data/docs.js for syntax errors.');
    contentEl.innerHTML = '<div class="card"><h1>Fehler</h1><p>Die Dokumentationsdaten konnten nicht geladen werden. Öffne die Entwicklerkonsole (F12) und prüfe auf Syntaxfehler in <code>data/docs.js</code>.</p></div>';
    return;
  }

  console.log('DOCS loaded:', Object.keys(DOCS).length, 'scripts');

  const LS_LANG = 'fivem_docs_lang';
  let LANG = localStorage.getItem(LS_LANG) || (navigator.language && navigator.language.startsWith('en') ? 'en' : 'de');
  langSelect.value = LANG;

  langSelect.addEventListener('change', () => {
    LANG = langSelect.value;
    localStorage.setItem(LS_LANG, LANG);
    renderMenu(searchInput.value.trim());
    const {script, section} = parseHash();
    if(script && section) loadContent(script, section);
  });

  function parseHash(){
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if(!hash) return {};
    const parts = hash.split('/');
    return { script: parts[0], section: parts[1] };
  }

  function renderMenu(filter = '') {
    const q = filter.toLowerCase();
    menuEl.innerHTML = '';
    Object.keys(DOCS).forEach(scriptId => {
      const script = DOCS[scriptId];
      const group = document.createElement('div');
      group.className = 'nav-group';

      const title = document.createElement('div');
      title.className = 'nav-script';
      title.textContent = script.name[LANG] || script.name.de;
      group.appendChild(title);

      Object.keys(script.sections).forEach(sectionId => {
        const sec = script.sections[sectionId];
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
        group.appendChild(link);
      });

      menuEl.appendChild(group);
    });
    highlightActiveFromHash();
  }

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
    attachCopyButtons();
    contentEl.focus();
    highlightActiveFromHash();
  }

  function attachCopyButtons(){
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

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function highlightActiveFromHash(){
    const {script, section} = parseHash();
    const links = menuEl.querySelectorAll('.nav-link');
    links.forEach(l => {
      if(l.dataset.script === script && l.dataset.section === section) l.classList.add('active');
      else l.classList.remove('active');
    });
  }

  function firstScriptSection(){
    for(const scriptId of Object.keys(DOCS)){
      const secs = Object.keys(DOCS[scriptId].sections || {});
      if(secs.length) return { script: scriptId, section: secs[0] };
    }
    return null;
  }

  searchInput.addEventListener('input', (e) => {
    renderMenu(e.target.value.trim());
  });

  window.addEventListener('hashchange', () => {
    const {script, section} = parseHash();
    if(script && section) loadContent(script, section);
  });

  renderMenu('');
  const {script, section} = parseHash();
  if(script && section) loadContent(script, section);
  else {
    const first = firstScriptSection();
    if(first) {
      location.hash = `${first.script}/${first.section}`;
      loadContent(first.script, first.section);
    } else contentEl.innerHTML = '<div class="card"><p>Keine Inhalte vorhanden.</p></div>';
  }

  // for debugging convenience
  window.FIVEM_DOCS = { DOCS };

})();
