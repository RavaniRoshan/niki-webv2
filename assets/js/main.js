// Niki — Shared script for interactions, routing state, modals, and animation
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileDrawer();
  initCommandPalette();
  initHeroTyping();
  initTestimonials();
  initPricingToggle();
  initFAQAccordions();
  initModals();
  initVideoDemos();
  initExplorePage();
  initChangelogPage();
  initLoginGates();
  initCopyButtons();
});

// 1. Header scroll & dropdowns
function initHeader() {
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Tools Dropdown
  const toolsWrapper = document.querySelector('.nav-dropdown-wrapper');
  if (toolsWrapper) {
    const trigger = toolsWrapper.querySelector('.nav-dropdown-trigger');
    const menu = toolsWrapper.querySelector('.nav-dropdown');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menu.classList.toggle('is-open');
      });

      document.addEventListener('click', (e) => {
        if (!toolsWrapper.contains(e.target)) {
          menu.classList.remove('is-open');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          trigger.focus();
        }
      });
    }
  }
}

// 2. Mobile Drawer
function initMobileDrawer() {
  const menuBtn = document.querySelector('.menu-btn');
  const backdrop = document.querySelector('.mobile-backdrop');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!backdrop) return;

  const openDrawer = () => {
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// 3. Command Palette (⌘K)
function initCommandPalette() {
  const palette = document.getElementById('cmdPalette');
  const pills = document.querySelectorAll('.cmd-k-pill');
  if (!palette) return;

  const input = palette.querySelector('.cmd-input');
  const resultsContainer = palette.querySelector('.cmd-results');
  const closeBtn = palette.querySelector('.modal-close-btn');

  const items = [
    { title: 'cargo install niki-cli', type: 'CLI Install', url: '/extension' },
    { title: 'Rust Actix Web Sandbox', type: 'Sandbox Recipe', url: '/website/neu-team' },
    { title: 'TypeScript Next.js Runner', type: 'Sandbox Recipe', url: '/explore' },
    { title: 'Multi-Agent Pipeline Canvas', type: 'Workflow', url: '/canvas' },
    { title: 'Repository Readiness Benchmark', type: 'Analyzer', url: '/analyze' },
    { title: 'buttermax-net Repo Analysis', type: 'Benchmark Result', url: '/analyze/buttermax-net' },
    { title: 'MCP Execution Server for Claude', type: 'Integration', url: '/mcp' },
    { title: 'Niki Cloud Sandboxes & Pricing', type: 'Plans', url: '/pricing' },
    { title: 'GitHub: RavaniRoshan/niki', type: 'Open Source', url: 'https://github.com/RavaniRoshan/niki' },
    { title: 'Changelog v1.2.0 (Rust Engine)', type: 'Releases', url: '/changelog' }
  ];

  let selectedIdx = 0;

  function renderResults(filtered) {
    if (!resultsContainer) return;
    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div style="padding:16px; color:var(--faint); font-family:var(--f-mono); font-size:13px;">No matching Niki tools or sandboxes.</div>';
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <div class="cmd-item ${idx === selectedIdx ? 'selected' : ''}" data-url="${item.url}" data-idx="${idx}">
        <span>${item.title}</span>
        <span class="chip" style="font-size:11px;">${item.type}</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const targetUrl = el.dataset.url;
        if (targetUrl.startsWith('http')) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = targetUrl;
        }
      });
    });
  }

  function openPalette() {
    palette.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    selectedIdx = 0;
    renderResults(items);
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 50);
    }
  }

  function closePalette() {
    palette.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  pills.forEach(pill => pill.addEventListener('click', openPalette));
  if (closeBtn) closeBtn.addEventListener('click', closePalette);

  palette.addEventListener('click', (e) => {
    if (e.target === palette) closePalette();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (palette.classList.contains('is-active')) {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === 'Escape' && palette.classList.contains('is-active')) {
      closePalette();
    }
  });

  if (input) {
    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = items.filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
      selectedIdx = 0;
      renderResults(filtered);
    });

    input.addEventListener('keydown', (e) => {
      const resultItems = resultsContainer.querySelectorAll('.cmd-item');
      if (!resultItems.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = (selectedIdx + 1) % resultItems.length;
        updateSelection(resultItems);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = (selectedIdx - 1 + resultItems.length) % resultItems.length;
        updateSelection(resultItems);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const active = resultItems[selectedIdx];
        if (active && active.dataset.url) {
          const targetUrl = active.dataset.url;
          if (targetUrl.startsWith('http')) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          } else {
            window.location.href = targetUrl;
          }
        }
      }
    });
  }

  function updateSelection(resultItems) {
    resultItems.forEach((el, idx) => {
      el.classList.toggle('selected', idx === selectedIdx);
      if (idx === selectedIdx) el.scrollIntoView({ block: 'nearest' });
    });
  }
}

// 4. Hero window typing animation for Niki CLI
function initHeroTyping() {
  const typingTarget = document.getElementById('heroTypingText');
  if (!typingTarget) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typingTarget.textContent = 'niki run "Implement rate-limiter middleware" --hermetic';
    return;
  }

  const phrases = [
    'niki run "Implement rate-limiter middleware" --hermetic',
    'niki sandbox spawn --image rust:1.80-alpine --isolate',
    'niki test --suite unit_tests --coverage 98.4%',
    'niki review --ast --diff branch:feature/rate-limiter',
    'niki git branch checkout feature/rate-limiter --ready-for-pr'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPaused = false;
  let timer = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isPaused = !entry.isIntersecting;
    });
  });
  observer.observe(typingTarget);

  function tick() {
    if (isPaused) {
      timer = setTimeout(tick, 200);
      return;
    }

    const currentPhrase = phrases[phraseIdx];
    if (!isDeleting) {
      charIdx++;
      typingTarget.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx >= currentPhrase.length) {
        isDeleting = true;
        timer = setTimeout(tick, 3000);
        return;
      }
      timer = setTimeout(tick, 35);
    } else {
      charIdx--;
      typingTarget.textContent = currentPhrase.substring(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        timer = setTimeout(tick, 500);
        return;
      }
      timer = setTimeout(tick, 18);
    }
  }

  timer = setTimeout(tick, 400);
}

// 5. Testimonials Carousel
function initTestimonials() {
  const carousel = document.querySelector('.testimonial-box');
  if (!carousel) return;

  const quotes = [
    {
      counter: '01 / 04',
      quote: 'Niki solved our biggest fear with AI coding: destructive hallucinations. Agents test and compile everything in isolated containers, delivering pristine Git PRs.',
      name: 'Diego',
      role: 'VP of Engineering',
      initial: 'D'
    },
    {
      counter: '02 / 04',
      quote: 'We run Niki in our CI pipelines for automated bug fixes. It plans, codes in Rust, runs cargo test, and only cuts a branch when all suites pass 100%.',
      name: 'Pritam',
      role: 'Staff Infrastructure Engineer',
      initial: 'P'
    },
    {
      counter: '03 / 04',
      quote: 'Having the multi-agent system written in Rust makes container orchestration lightning fast. Startup time is under 15ms per sandbox.',
      name: 'Razi',
      role: 'AI Systems Architect',
      initial: 'R'
    },
    {
      counter: '04 / 04',
      quote: 'Niki is the first agent system I actually trust with production repositories. Zero host access, pure hermetic Docker execution, reviewable Git diffs.',
      name: 'Sebastian',
      role: 'Principal DevOps Lead',
      initial: 'S'
    }
  ];

  let currentIdx = 0;
  let autoTimer = null;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counterEl = carousel.querySelector('.testimonial-counter');
  const quoteEl = carousel.querySelector('.testimonial-quote');
  const avatarEl = carousel.querySelector('.testimonial-avatar');
  const nameEl = carousel.querySelector('.author-name');
  const roleEl = carousel.querySelector('.author-role');
  const prevBtn = carousel.querySelector('.prev-quote-btn');
  const nextBtn = carousel.querySelector('.next-quote-btn');

  function renderQuote(idx) {
    const item = quotes[idx];
    if (counterEl) counterEl.textContent = item.counter;
    if (quoteEl) quoteEl.textContent = `“${item.quote}”`;
    if (avatarEl) avatarEl.textContent = item.initial;
    if (nameEl) nameEl.textContent = item.name;
    if (roleEl) roleEl.textContent = item.role;
  }

  function nextQuote() {
    currentIdx = (currentIdx + 1) % quotes.length;
    renderQuote(currentIdx);
  }

  function prevQuote() {
    currentIdx = (currentIdx - 1 + quotes.length) % quotes.length;
    renderQuote(currentIdx);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevQuote(); resetAutoTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextQuote(); resetAutoTimer(); });

  function startAuto() {
    if (isReduced) return;
    autoTimer = setInterval(nextQuote, 6000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function resetAutoTimer() {
    stopAuto();
    startAuto();
  }

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  renderQuote(currentIdx);
  startAuto();
}

// 6. Pricing Toggle
function initPricingToggle() {
  const toggleWrap = document.querySelector('.pricing-toggle-wrap');
  if (!toggleWrap) return;

  const monthlyBtn = toggleWrap.querySelector('[data-plan="monthly"]');
  const yearlyBtn = toggleWrap.querySelector('[data-plan="yearly"]');

  const prices = {
    monthly: {
      basic: '$0',
      basicPeriod: 'forever',
      individual: '$19',
      individualPeriod: '/mo',
      team: '$49',
      teamPeriod: '/seat/mo'
    },
    yearly: {
      basic: '$0',
      basicPeriod: 'forever',
      individual: '$15.70',
      individualPeriod: '/mo (billed yearly $188)',
      team: '$40.60',
      teamPeriod: '/seat/mo (billed yearly $487)'
    }
  };

  function setMode(mode) {
    if (mode === 'yearly') {
      yearlyBtn?.classList.add('is-active');
      monthlyBtn?.classList.remove('is-active');
    } else {
      monthlyBtn?.classList.add('is-active');
      yearlyBtn?.classList.remove('is-active');
    }

    const basicPrice = document.getElementById('price-basic');
    const basicPeriod = document.getElementById('period-basic');
    const indPrice = document.getElementById('price-individual');
    const indPeriod = document.getElementById('period-individual');
    const teamPrice = document.getElementById('price-team');
    const teamPeriod = document.getElementById('period-team');

    if (basicPrice) basicPrice.textContent = prices[mode].basic;
    if (basicPeriod) basicPeriod.textContent = prices[mode].basicPeriod;
    if (indPrice) indPrice.textContent = prices[mode].individual;
    if (indPeriod) indPeriod.textContent = prices[mode].individualPeriod;
    if (teamPrice) teamPrice.textContent = prices[mode].team;
    if (teamPeriod) teamPeriod.textContent = prices[mode].teamPeriod;
  }

  monthlyBtn?.addEventListener('click', () => setMode('monthly'));
  yearlyBtn?.addEventListener('click', () => setMode('yearly'));
}

// 7. FAQ Accordions
function initFAQAccordions() {
  const accordions = document.querySelectorAll('.faq-accordion details');
  accordions.forEach(item => {
    item.addEventListener('toggle', () => {});
  });
}

// 8. Modals (Submit Recipe Modal, Note Modal)
function initModals() {
  const submitBtns = document.querySelectorAll('.btn-open-submit');
  const submitModal = document.getElementById('submitModal');
  const noteModal = document.getElementById('noteModal');
  const openNoteBtns = document.querySelectorAll('.btn-open-note');

  function setupModal(modal, triggers) {
    if (!modal) return;
    const closeBtn = modal.querySelector('.modal-close-btn');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  }

  setupModal(submitModal, submitBtns);
  setupModal(noteModal, openNoteBtns);
}

// 9. Video Demo Player & Sound Toggles
function initVideoDemos() {
  const soundBtns = document.querySelectorAll('.sound-toggle-btn');
  const videoModal = document.getElementById('videoModal');

  soundBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = btn.getAttribute('data-muted') !== 'false';
      btn.setAttribute('data-muted', isMuted ? 'false' : 'true');
      btn.setAttribute('title', isMuted ? 'Turn sound off' : 'Turn sound on');
      btn.innerHTML = isMuted
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
      showToast(isMuted ? 'Terminal audio enabled' : 'Terminal audio muted');
    });
  });

  if (videoModal) {
    const triggers = document.querySelectorAll('.btn-watch-video');
    const closeBtn = videoModal.querySelector('.modal-close-btn');

    triggers.forEach(trig => {
      trig.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        videoModal.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  }
}

// 10. Explore Page (tabs, filters, shuffle)
function initExplorePage() {
  const exploreGrid = document.querySelector('.explore-grid');
  if (!exploreGrid) return;

  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab');

  const tabWebsites = document.getElementById('tabWebsites');
  const tabElements = document.getElementById('tabElements');
  const sectionWebsites = document.getElementById('sectionWebsites');
  const sectionElements = document.getElementById('sectionElements');

  if (activeTab === 'elements') {
    if (tabElements) tabElements.classList.add('btn--solid');
    if (tabWebsites) { tabWebsites.classList.remove('btn--solid'); tabWebsites.classList.add('btn--ghost'); }
    if (sectionElements) sectionElements.style.display = 'grid';
    if (sectionWebsites) sectionWebsites.style.display = 'none';
  }

  // Shuffle button
  const shuffleBtn = document.getElementById('shuffleBtn');
  if (shuffleBtn && exploreGrid) {
    shuffleBtn.addEventListener('click', () => {
      const cards = Array.from(exploreGrid.children);
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        exploreGrid.appendChild(cards[j]);
      }
      showToast('Shuffled sandbox environments');
    });
  }
}

// 11. Changelog Pagination
function initChangelogPage() {
  const showMoreBtn = document.getElementById('btnShowMoreChangelog');
  if (!showMoreBtn) return;

  const hiddenEntries = document.querySelectorAll('.changelog-hidden-entry');
  showMoreBtn.addEventListener('click', () => {
    hiddenEntries.forEach(el => el.style.display = 'block');
    showMoreBtn.style.display = 'none';
    showToast('Loaded all 24 Niki releases');
  });
}

// 12. Login Gate Handler
function initLoginGates() {
  const gatedActions = document.querySelectorAll('.login-gate-btn');
  gatedActions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentPath = window.location.pathname + window.location.search;
      window.location.href = `/login?redirectTo=${encodeURIComponent(currentPath)}`;
    });
  });
}

// 13. Copy Buttons & Toasts
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.btn-copy-action');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy') || window.location.href;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Copied: ' + textToCopy);
      }).catch(() => {
        showToast('Copied to clipboard');
      });
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('is-active');
  setTimeout(() => {
    toast.classList.remove('is-active');
  }, 2600);
}
