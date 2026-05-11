/* ===== SecureBait Application Logic ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initBarCharts();
});

/* --- Navbar scroll effect & hamburger --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
  if (hamburger && links) {
    hamburger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
}

/* --- Intersection Observer for fade-in animations --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-in, .card, .metric-card, .info-box, .email-preview, .arch-diagram')
    .forEach((el) => observer.observe(el));
}

/* --- Animate chart bars when visible --- */
function initBarCharts() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.chart-bar-fill').forEach((bar) => {
            const width = bar.dataset.width;
            if (width) bar.style.width = width;
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.chart-bar-group').forEach((g) => {
    g.querySelectorAll('.chart-bar-fill').forEach((b) => { b.style.width = '0'; });
    observer.observe(g);
  });
}

/* --- Mouse glow effect on cards --- */
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.card').forEach((card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});
