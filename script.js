/* =========================================================
   SCRIPT.JS — rendering + interaction logic.
   You shouldn't need to edit this file — update data.js instead.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderInterests();
  renderFavorites();
  renderHobbies();
  renderSocials();

  initTypewriter();
  initScrollReveal();
  initScrollSpy();
  initMobileNav();
  initFooterYear();
});

/* ---------- HERO ---------- */
function renderHero(){
  const { name, bio } = SITE_DATA.profile;

  document.querySelectorAll('#hero-title .glitch-base, #hero-title .glitch-layer')
    .forEach(el => el.textContent = name);

  const bioEl = document.getElementById('hero-bio');
  if (bioEl && bio) bioEl.textContent = bio;

  document.title = `${name} // Personal Terminal`;
}

/* ---------- INTERESTS ---------- */
function renderInterests(){
  const grid = document.getElementById('interests-grid');
  if (!grid) return;

  SITE_DATA.interests.forEach(item => {
    const card = document.createElement('article');
    card.className = 'hud-panel reveal';
    card.innerHTML = `
      <span class="hud-panel__tag">${escapeHTML(item.tag || '')}</span>
      <h3 class="hud-panel__title">${escapeHTML(item.title)}</h3>
      <p class="hud-panel__body">${escapeHTML(item.body)}</p>
    `;
    grid.appendChild(card);
  });
}

/* ---------- FAVORITES ---------- */
function renderFavorites(){
  const wrap = document.getElementById('favorites-archive');
  if (!wrap) return;

  SITE_DATA.favorites.forEach(group => {
    const section = document.createElement('div');
    section.className = 'archive__category reveal';

    const itemsHTML = group.items.map(it => `
      <div class="archive__item">
        <div class="archive__item-name">${escapeHTML(it.name)}</div>
        ${it.note ? `<div class="archive__item-note">${escapeHTML(it.note)}</div>` : ''}
      </div>
    `).join('');

    section.innerHTML = `
      <div class="archive__label">${escapeHTML(group.category)}</div>
      <div class="archive__items">${itemsHTML}</div>
    `;
    wrap.appendChild(section);
  });
}

/* ---------- HOBBIES ---------- */
function renderHobbies(){
  const list = document.getElementById('hobbies-list');
  if (!list) return;

  SITE_DATA.hobbies.forEach((hobby, i) => {
    const row = document.createElement('div');
    row.className = 'hobby reveal';
    row.innerHTML = `
      <div class="hobby__index">${String(i + 1).padStart(2, '0')}</div>
      <div>
        <div class="hobby__title">${escapeHTML(hobby.title)}</div>
        <p class="hobby__desc">${escapeHTML(hobby.body)}</p>
      </div>
    `;
    list.appendChild(row);
  });
}

/* ---------- SOCIALS ---------- */
function renderSocials(){
  const grid = document.getElementById('socials-grid');
  if (!grid) return;

  SITE_DATA.socials
    .filter(s => s.url)
    .forEach(s => {
      const a = document.createElement('a');
      a.className = 'social-link reveal';
      a.href = s.url;
      if (!s.url.startsWith('mailto:')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.innerHTML = `
        <span class="social-link__platform">${escapeHTML(s.platform)}</span>
        <span class="social-link__handle">${escapeHTML(s.handle || '')}</span>
      `;
      grid.appendChild(a);
    });
}

/* ---------- typewriter tagline ---------- */
function initTypewriter(){
  const el = document.getElementById('hero-tagline');
  const lines = SITE_DATA.profile.taglines;
  if (!el || !lines || !lines.length) return;

  const cursor = document.createElement('span');
  cursor.className = 'cursor';

  let lineIndex = 0, charIndex = 0, deleting = false;
  const TYPE_SPEED = 55, DELETE_SPEED = 30, HOLD = 1800;

  function tick(){
    const current = lines[lineIndex];
    if (!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      el.appendChild(cursor);
      if (charIndex === current.length){
        deleting = true;
        return setTimeout(tick, HOLD);
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      el.appendChild(cursor);
      if (charIndex === 0){
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }
    setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
  }
  tick();
}

/* ---------- scroll reveal ---------- */
function initScrollReveal(){
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){
    targets.forEach(t => t.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(t => obs.observe(t));
}

/* ---------- scroll spy for HUD nav ---------- */
function initScrollSpy(){
  const links = document.querySelectorAll('.hud-nav__list a');
  const sections = Array.from(document.querySelectorAll('.section'));
  if (!links.length || !sections.length) return;

  const setActive = (id) => {
    links.forEach(l => l.classList.toggle('active', l.dataset.target === id));
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ---------- mobile nav toggle ---------- */
function initMobileNav(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('hud-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- footer year ---------- */
function initFooterYear(){
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- utility ---------- */
function escapeHTML(str = ''){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}