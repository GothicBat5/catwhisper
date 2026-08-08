const heroImg = document.querySelector('.hero-img');
const heroOverlay = document.querySelector('.hero-overlay');
const navbar = document.getElementById('navbar');

const fadeDistance = window.innerHeight * 0.9;

let ticking = false;

function updateOnScroll() {
  const y = window.scrollY;

  const progress = Math.min(y / fadeDistance, 1);

  heroImg.style.opacity = 1 - progress;

  heroImg.style.transform = `scale(${1 + progress * 0.08})`;

  heroOverlay.style.opacity = 1 - progress * 0.6;

  navbar.classList.toggle('scrolled', y > 40);

  ticking = false;
}

window.addEventListener('scroll', () => {

  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }

}, { passive: true });


// mobile nav

const navToggle = document.getElementById('nav-toggle');

const navMenu = document.getElementById('nav-menu');


function closeMenu() {

  navMenu.classList.remove('open');

  navToggle.classList.remove('open');

  navToggle.setAttribute('aria-expanded', 'false');
}


navToggle.addEventListener('click', () => {

  const open = navMenu.classList.toggle('open');

  navToggle.classList.toggle('open', open);

  navToggle.setAttribute('aria-expanded', String(open));

});

// smooth scroll 

document
  .querySelectorAll('nav a, .scroll-cue')
  .forEach(link => {

    link.addEventListener('click', event => {

      const href =
        link.getAttribute('href');

      /*
       * Ignore links that aren't
       * internal page anchors.
       */
      if (!href || !href.startsWith('#')) {
        return;
      }

      const target =
        document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      closeMenu();

    });

  });


const sections = document.querySelectorAll('.section');


const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }

      });

    },

    {
      /*
       * Start animation slightly before
       * the section reaches the viewport.
       */
      threshold: 0.12,

      rootMargin:
        '0px 0px -60px 0px'
    }

  );


sections.forEach(section => {

  revealObserver.observe(section);

});
// initial state

updateOnScroll();
