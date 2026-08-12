/* ===========================================================
   Bɔ̀ Bà — Moteur du lexique interactif
   Repère les occurrences des termes de MAMBILA_LEXICON dans le
   texte de la page, les enveloppe d'un <span class="lex-hit">
   sans jamais toucher aux balises HTML existantes (marche par
   TreeWalker sur les nœuds texte uniquement), et affiche une
   info-bulle au survol (souris) ou au clic (tactile/clavier).
   =========================================================== */
(function () {
  if (typeof MAMBILA_LEXICON === 'undefined') return;

  const SKIP_ANCESTORS_SELECTOR = 'a, .article-nav, .lex-term, .lexicon, .breadcrumb, h1, .brand, table.data';

  const entries = [];
  MAMBILA_LEXICON.forEach((item) => {
    entries.push({ match: item.term, ref: item });
    (item.variants || []).forEach((v) => entries.push({ match: v, ref: item }));
  });
  entries.sort((a, b) => b.match.length - a.match.length);

  if (!entries.length) return;

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const pattern = new RegExp('(' + entries.map((e) => escapeRegExp(e.match)).join('|') + ')', 'g');

  function findEntryFor(matchedText) {
    return entries.find((e) => e.match === matchedText);
  }

  const root = document.querySelector('.prose');
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement && node.parentElement.closest(SKIP_ANCESTORS_SELECTOR)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  let n;
  while ((n = walker.nextNode())) textNodes.push(n);

  const alreadyAnnotated = new Set();

  textNodes.forEach((textNode) => {
    const text = textNode.nodeValue;
    pattern.lastIndex = 0;
    if (!pattern.test(text)) return;
    pattern.lastIndex = 0;

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let match;
    let touched = false;

    while ((match = pattern.exec(text))) {
      const entry = findEntryFor(match[0]);
      if (!entry || alreadyAnnotated.has(entry.ref.term)) continue;

      touched = true;
      alreadyAnnotated.add(entry.ref.term);

      frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));

      const span = document.createElement('span');
      span.className = 'lex-hit';
      span.textContent = match[0];
      span.tabIndex = 0;
      span.setAttribute('role', 'button');
      span.setAttribute('aria-haspopup', 'true');
      span.dataset.term = entry.ref.term;
      frag.appendChild(span);

      lastIndex = match.index + match[0].length;
    }

    if (!touched) return;
    frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    textNode.parentNode.replaceChild(frag, textNode);
  });

  const tooltip = document.createElement('div');
  tooltip.className = 'lex-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  document.body.appendChild(tooltip);

  let activeHit = null;

  function findLexiconItem(term) {
    return MAMBILA_LEXICON.find((i) => i.term === term);
  }

  function showTooltip(hitEl) {
    const item = findLexiconItem(hitEl.dataset.term);
    if (!item) return;
    activeHit = hitEl;

    const onCurrentPage = window.location.pathname.split('/').pop() === item.page.split('#')[0];
    tooltip.innerHTML =
      '<span class="lex-tooltip-term">' + item.term + '</span>' +
      '<span class="lex-tooltip-def">' + item.def + '</span>' +
      (onCurrentPage ? '' :
        '<a class="lex-tooltip-link" href="' + item.page + '">En savoir plus →</a>');

    tooltip.hidden = false;
    positionTooltip(hitEl);
  }

  function hideTooltip() {
    tooltip.hidden = true;
    activeHit = null;
  }

  function positionTooltip(hitEl) {
    const rect = hitEl.getBoundingClientRect();
    const tipRect = tooltip.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - tipRect.width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - tipRect.width - 12));
    let top = rect.bottom + 8;
    if (top + tipRect.height > window.innerHeight - 12) {
      top = rect.top - tipRect.height - 8;
    }
    tooltip.style.left = left + window.scrollX + 'px';
    tooltip.style.top = top + window.scrollY + 'px';
  }

  document.querySelectorAll('.lex-hit').forEach((hit) => {
    hit.addEventListener('mouseenter', () => showTooltip(hit));
    hit.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!tooltip.matches(':hover') && activeHit !== null && !hit.matches(':hover')) {
          hideTooltip();
        }
      }, 120);
    });
    hit.addEventListener('focus', () => showTooltip(hit));
    hit.addEventListener('blur', () => hideTooltip());
    hit.addEventListener('click', (e) => {
      e.preventDefault();
      if (activeHit === hit && !tooltip.hidden) {
        hideTooltip();
      } else {
        showTooltip(hit);
      }
    });
  });

  tooltip.addEventListener('mouseleave', hideTooltip);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideTooltip();
  });

  document.addEventListener('scroll', () => {
    if (activeHit) positionTooltip(activeHit);
  }, { passive: true });
})();
