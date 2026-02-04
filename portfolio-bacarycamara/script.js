// =============================
// 🎯 script.js – Portfolio Bacary Camara
// Navigation mobile, année dynamique, texte rotatif,
// mode clair/sombre, bouton retour en haut,
// galerie images + lightbox / diapo + AUTO-SLIDE
// =============================

(function () {

  /* ====== MENU MOBILE ====== */
  function setupMenuToggle(toggleId) {
    const btn = document.getElementById(toggleId);
    const nav = document.querySelector('.main-nav');
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
  setupMenuToggle('navToggle');
  setupMenuToggle('navToggle2');
  setupMenuToggle('navToggle3');

  /* ====== ANNÉE AUTOMATIQUE ====== */
  const year = new Date().getFullYear();
  ['year', 'year2', 'year3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  /* ====== TEXTE DYNAMIQUE ====== */
  const words = ['Informaticien', 'Développeur', 'Administrateur Systèmes'];
  const dyn = document.getElementById('dyn');
  let i = 0;
  if (dyn) {
    setInterval(() => {
      dyn.textContent = words[i];
      i = (i + 1) % words.length;
    }, 2500);
  }

  /* ====== BOUTON RETOUR EN HAUT ====== */
  const topBtn = document.getElementById('backToTop');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', window.scrollY > 200);
    });
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ====== MODE CLAIR / SOMBRE ====== */
  const themeToggle = document.createElement('button');
  themeToggle.textContent = '🌙';
  themeToggle.id = 'theme-toggle';
  Object.assign(themeToggle.style, {
    position: 'fixed',
    right: '20px',
    bottom: '70px',
    background: 'var(--card)',
    border: '1px solid rgba(255,255,255,0.05)',
    color: 'var(--text)',
    borderRadius: '10px',
    padding: '8px',
    cursor: 'pointer',
    zIndex: '200'
  });
  document.body.appendChild(themeToggle);

  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
  });

  /* ====== ANIMATION D’APPARITION ====== */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(el);
  });

  /* ====== GALERIE + LIGHTBOX + AUTO-SLIDE ====== */
  const galleryImages = document.querySelectorAll('.gallery-img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox .close');
  const nextBtn = document.querySelector('.lightbox .next');
  const prevBtn = document.querySelector('.lightbox .prev');

  let currentIndex = 0;
  let autoSlide = null;
  const AUTO_DELAY = 3000; // ⏱️ 3 secondes (recommandé)

  function showImage() {
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage();
    }, AUTO_DELAY);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  if (galleryImages.length && lightbox) {

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index;
        showImage();
        lightbox.classList.add('show');
        startAutoSlide(); // ▶️ AUTO-SLIDE
      });
    });

    nextBtn?.addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage();
    });

    prevBtn?.addEventListener('click', () => {
      stopAutoSlide();
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage();
    });

    closeBtn?.addEventListener('click', () => {
      lightbox.classList.remove('show');
      stopAutoSlide();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('show')) return;
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'Escape') {
        lightbox.classList.remove('show');
        stopAutoSlide();
      }
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
        stopAutoSlide();
      }
    });
  }

})();
