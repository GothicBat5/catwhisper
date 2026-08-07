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
});

document.querySelectorAll('nav a, .scroll-cue').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
