// Bɔ̀ Bà — script partagé
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.main');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Nav sub-menus ("Culture", "Ressources") — click/tap to open, closes on
  // outside click, Escape, or when another sub-menu opens.
  const navGroups = document.querySelectorAll('.nav-group');
  navGroups.forEach(group => {
    const groupToggle = group.querySelector('.nav-group__toggle');
    const groupMenu = group.querySelector('.nav-group__menu');
    if (!groupToggle || !groupMenu) return;

    groupToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = groupMenu.classList.contains('is-open');
      navGroups.forEach(g => {
        g.querySelector('.nav-group__menu').classList.remove('is-open');
        g.querySelector('.nav-group__toggle').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        groupMenu.classList.add('is-open');
        groupToggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => {
    navGroups.forEach(g => {
      g.querySelector('.nav-group__menu').classList.remove('is-open');
      g.querySelector('.nav-group__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navGroups.forEach(g => {
        g.querySelector('.nav-group__menu').classList.remove('is-open');
        g.querySelector('.nav-group__toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Article side-nav: highlight active section on scroll
  const articleNavLinks = document.querySelectorAll('.article-nav a');
  if (articleNavLinks.length) {
    const targets = Array.from(articleNavLinks)
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const setActive = (id) => {
      articleNavLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    };

    if ('IntersectionObserver' in window) {
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
      targets.forEach(t => io2.observe(t));
    }
  }

  // Article side-nav on mobile: collapsed by default behind a toggle
  // button, so the summary doesn't push the actual article text further
  // down the page on small screens. No HTML change required — the button
  // is injected here and only takes effect below the 880px breakpoint
  // (see .article-nav.is-collapsed in CSS, ignored above that width).
  const articleNav = document.querySelector('.article-nav');
  if (articleNav) {
    const label = articleNav.querySelector('.lab');
    if (label) {
      const summaryToggle = document.createElement('button');
      summaryToggle.type = 'button';
      summaryToggle.className = 'article-nav__toggle';
      summaryToggle.setAttribute('aria-expanded', 'false');
      summaryToggle.innerHTML = label.textContent + ' <span class="article-nav__chevron">▾</span>';
      label.replaceWith(summaryToggle);
      articleNav.classList.add('is-collapsed');

      summaryToggle.addEventListener('click', () => {
        const collapsed = articleNav.classList.toggle('is-collapsed');
        summaryToggle.setAttribute('aria-expanded', String(!collapsed));
      });
    }
  }

  // Reading progress bar — only on pages with a long .prose article.
  // Tracks scroll position across the .prose block itself (not the whole
  // page), so the bar reaches 100% when the article text is finished,
  // regardless of how much footer/CTA content follows it.
  const proseEl = document.querySelector('.prose');
  if (proseEl) {
    const barWrap = document.createElement('div');
    barWrap.className = 'read-progress';
    barWrap.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('div');
    bar.className = 'read-progress__bar';
    barWrap.appendChild(bar);
    document.body.appendChild(barWrap);

    const updateProgress = () => {
      const rect = proseEl.getBoundingClientRect();
      const proseTop = rect.top + window.scrollY;
      const proseHeight = proseEl.offsetHeight;
      const viewportH = window.innerHeight;
      const scrolled = window.scrollY + viewportH - proseTop;
      const pct = Math.max(0, Math.min(100, (scrolled / proseHeight) * 100));
      bar.style.width = pct + '%';
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
  }
});
