/* ============================================
   AIMHOP EDUCATIONAL TRUST – MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== SKELETON SCREEN HANDLER =====
  const hideSkeleton = () => {
    const skeletonOverlay = document.getElementById('skeleton-overlay');
    if (skeletonOverlay) {
      skeletonOverlay.style.opacity = '0';
      skeletonOverlay.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => {
        skeletonOverlay.remove();
        document.body.classList.remove('loading-skeleton');
      }, 500);
    }
  };

  // Simulate a smoother loading feel
  window.addEventListener('load', () => {
    setTimeout(hideSkeleton, 800); // 800ms to show off the skeleton screen as "premium" feel
  });

  // ===== STICKY HEADER & SCROLL TOP =====
  const stickyScroll = () => {
    const mainHeader = document.getElementById('mainHeader');
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 80) {
      mainHeader?.classList.add('scrolled');
      scrollTop?.classList.add('visible');
    } else {
      mainHeader?.classList.remove('scrolled');
      scrollTop?.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', stickyScroll);
  stickyScroll(); // Initial check

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  const navOverlay = document.getElementById('navOverlay');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.add('open');
      if (navOverlay) navOverlay.classList.add('visible');
      document.body.style.overflow = 'hidden'; 
    });

    const closeBtn = document.getElementById('mobileClose');
    const closeMenu = () => {
      mainNav.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('visible');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    // Close on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (!link.classList.contains('acc-trigger')) closeMenu();
      });
    });

    // Accordion Logic for Mobile Menu (Clean & Robust)
    mainNav.addEventListener('click', (e) => {
      const arrow = e.target.closest('.toggle-arrow');
      if (arrow && window.innerWidth <= 1100) {
        e.preventDefault();
        e.stopPropagation();
        const parent = arrow.closest('.mobile-acc');
        if (parent) {
          const wasActive = parent.classList.contains('active');
          // Close others to keep it clean
          mainNav.querySelectorAll('.mobile-acc').forEach(item => {
            item.classList.remove('active');
          });
          // Toggle current
          if (!wasActive) parent.classList.add('active');
        }
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#mainNav') && !e.target.closest('#hamburger')) {
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== TESTIMONIALS SLIDER =====
  initTestimonials();

  // ===== ANIMATIONS ON SCROLL =====
  const animateEls = document.querySelectorAll('.animate, .stat-card, .course-card, .activity-card, .award-card, .testimonial-card, .mvv-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== HERO SLIDER =====
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let heroCurrent = 0;
    const showHeroSlide = (idx) => {
      heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    };
    const nextHeroSlide = () => {
      heroCurrent = (heroCurrent + 1) % heroSlides.length;
      showHeroSlide(heroCurrent);
    };
    let heroInterval = setInterval(nextHeroSlide, 5000);

    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => { clearInterval(heroInterval); heroCurrent = (heroCurrent - 1 + heroSlides.length) % heroSlides.length; showHeroSlide(heroCurrent); heroInterval = setInterval(nextHeroSlide, 5000); };
      nextBtn.onclick = () => { clearInterval(heroInterval); nextHeroSlide(); heroInterval = setInterval(nextHeroSlide, 5000); };
    }
  }
});

// ===== GLOBAL FUNCTIONS =====

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openVideo(url) {
  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('videoFrame');
  if (!modal || !frame) return;
  let embedUrl = url.replace('watch?v=', 'embed/');
  embedUrl += '?autoplay=1&rel=0';
  frame.src = embedUrl;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('videoFrame');
  if (frame) frame.src = '';
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Esc to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideo();
});

// Testimonials Slider Logic
let currentSlide = 0;
let slidesPerView = 1;

function getSlidesPerView() {
  if (window.innerWidth <= 900) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 3;
}

function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track?.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('testiDots');
  if (!cards || !cards.length) return;

  slidesPerView = getSlidesPerView();
  const totalSlides = Math.ceil(cards.length / slidesPerView);
  currentSlide = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => { currentSlide = i; updateSlider(); };
      dotsContainer.appendChild(dot);
    }
  }
  updateSlider();
}

function updateSlider() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.testi-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function prevTestimonial() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track?.querySelectorAll('.testimonial-card');
  if (!cards || !cards.length) return;
  
  slidesPerView = getSlidesPerView();
  const totalSlides = Math.ceil(cards.length / slidesPerView);
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function nextTestimonial() {
  const track = document.getElementById('testimonialsTrack');
  const cards = track?.querySelectorAll('.testimonial-card');
  if (!cards || !cards.length) return;
  
  slidesPerView = getSlidesPerView();
  const totalSlides = Math.ceil(cards.length / slidesPerView);
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

window.addEventListener('resize', initTestimonials);
