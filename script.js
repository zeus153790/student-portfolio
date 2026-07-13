/* ═══════════════════════════════════════════════════════
   ThreePoints Portfolio — v2 JavaScript
   Smooth scroll, dark mode, accordion, scroll reveal,
   counter animation, mobile menu, magnetic buttons
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Theme Toggle ──────────────────────────────── */
  const toggle = document.getElementById('themeToggle');
  const root   = document.documentElement;
  root.setAttribute('data-theme', localStorage.getItem('tp-theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('tp-theme', next);
  });


  /* ─── Mobile Menu ───────────────────────────────── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ─── Smooth Scroll ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });


  /* ─── Navbar Scroll State ───────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ─── Scroll Reveal (IntersectionObserver) ──────── */
  const reveals = document.querySelectorAll('.anim-reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObs.observe(el));


  /* ─── Number Counter Animation ──────────────────── */
  let countersDone = false;
  const counters = document.querySelectorAll('.counter-num');

  function runCounters() {
    if (countersDone) return;
    countersDone = true;
    counters.forEach(el => {
      const target = +el.dataset.target;
      let current  = 0;
      const step   = target / 60; // ~60 frames
      const tick = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.ceil(current);
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      };
      tick();
    });
  }

  const heroSection = document.getElementById('hero');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounters();
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counterObs.observe(heroSection);


  /* ─── Services Accordion ────────────────────────── */
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach(item => {
    const header = item.querySelector('.service-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      serviceItems.forEach(s => {
        s.classList.remove('active');
        s.querySelector('.service-toggle').textContent = '↗';
      });

      // Open clicked (unless it was already open)
      if (!isActive) {
        item.classList.add('active');
        item.querySelector('.service-toggle').textContent = '×';
      }
    });
  });


  /* ─── Magnetic Hover on Buttons ─────────────────── */
  document.querySelectorAll('.btn-fill, .btn-ghost, .contact-pill').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });


  /* ─── Parallax on Hero Bento Cards ───────────── */
  const heroBento = document.querySelector('.hero-bento');
  if (heroBento && window.innerWidth > 1024) {
    const bentoItems = heroBento.querySelectorAll('.bento-item');
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      bentoItems.forEach((card, i) => {
        const factor = (i + 1) * 0.35;
        card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }


  /* ─── Project Card Tilt ─────────────────────────── */
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
