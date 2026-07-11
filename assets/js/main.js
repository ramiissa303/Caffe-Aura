/* ══════════════════════════════════════════════════════
   CAFFÈ AURA — script.js
   ══════════════════════════════════════════════════════ */

'use strict';

/* ─── CUSTOM CURSOR ──────────────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
})();

/* ─── NAVBAR: SCROLL & ACTIVE LINK ──────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }, { passive: true });

  // Active link on scroll
  function updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollMid >= top && scrollMid < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  // Smooth close on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
})();

/* ─── INTERSECTION OBSERVER — REVEAL ANIMATIONS ─────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '-60px 0px',
    threshold:  0.1
  });

  items.forEach((item, i) => {
    // Stagger within the same parent
    const siblings = item.parentElement.querySelectorAll('.reveal-item');
    siblings.forEach((sib, idx) => {
      sib.style.transitionDelay = (idx * 0.1) + 's';
    });
    observer.observe(item);
  });
})();

/* ─── DYNAMIC MENU FILTER ────────────────────────────── */
(function initMenuFilter() {
  const tabs      = document.querySelectorAll('.menu-tabs .tab');
  const cards     = document.querySelectorAll('.menu-card');
  const menuEmpty = document.getElementById('menuEmpty');

  if (!tabs.length || !cards.length) return;

  function filterMenu(filter) {
    let visibleCount = 0;

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matches  = filter === 'all' || category === filter;

      if (matches) {
        card.classList.remove('hidden');
        card.classList.remove('fade-enter');
        // Force reflow for re-trigger animation
        void card.offsetWidth;
        card.classList.add('fade-enter');
        visibleCount++;
      } else {
        card.classList.add('hidden');
        card.classList.remove('fade-enter');
      }
    });

    if (menuEmpty) {
      menuEmpty.hidden = visibleCount > 0;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');
      filterMenu(filter);
    });
  });
})();

/* ─── ADD TO ORDER TOAST ─────────────────────────────── */
(function initOrderButtons() {
  const orderBtns = document.querySelectorAll('.btn-order');
  const toast     = document.getElementById('orderToast');
  const toastMsg  = document.getElementById('toastMsg');

  if (!toast) return;

  let toastTimer = null;

  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card     = btn.closest('.menu-card');
      const itemName = card ? card.querySelector('.card-name').textContent : 'Item';

      // Update toast message
      toastMsg.textContent = `"${itemName}" added to your order`;

      // Show toast
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);

      // Pulse animation on button
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => { btn.style.transform = ''; }, 150);
    });
  });
})();

/* ─── TESTIMONIAL CAROUSEL ───────────────────────────── */
(function initTestimonials() {
  const cards      = document.querySelectorAll('.testimonial-card');
  const dotsWrap   = document.getElementById('testimonialDots');

  if (!cards.length || !dotsWrap) return;

  let current  = 0;
  let autoPlay = null;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.dot');

  function goTo(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + cards.length) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoPlay = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    clearInterval(autoPlay);
  }

  // Init first card
  cards[0].classList.add('active');

  startAuto();

  // Pause on hover
  const track = document.getElementById('testimonialTrack');
  if (track) {
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
  }

  // Touch/swipe support
  let touchStartX = 0;
  document.querySelector('.testimonials')?.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.querySelector('.testimonials')?.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) {
      stopAuto();
      goTo(dx < 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });
})();

/* ─── BOOKING FORM ───────────────────────────────────── */
(function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById('guestDate');
  if (dateInput) {
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    const name   = document.getElementById('guestName').value.trim();
    const email  = document.getElementById('guestEmail').value.trim();
    const date   = document.getElementById('guestDate').value;
    const guests = document.getElementById('guestGuests').value;

    if (!name || !email || !date || !guests) {
      shakeForm();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('guestEmail').focus();
      document.getElementById('guestEmail').style.borderColor = '#c0392b';
      setTimeout(() => {
        document.getElementById('guestEmail').style.borderColor = '';
      }, 2000);
      return;
    }

    // Simulate success
    showFormSuccess(name);
  });

  function shakeForm() {
    form.style.animation = 'none';
    void form.offsetWidth;
    form.style.animation = 'formShake 0.4s ease';
    setTimeout(() => { form.style.animation = ''; }, 500);
  }

  function showFormSuccess(name) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Reservation Confirmed!</span>
    `;
    submitBtn.style.background = '#2b7a3c';
    submitBtn.disabled = true;

    // Show toast
    const toast   = document.getElementById('orderToast');
    const toastMsg = document.getElementById('toastMsg');
    if (toast && toastMsg) {
      toastMsg.textContent = `Table reserved for ${name}. See you soon!`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      form.reset();
    }, 4000);
  }
})();

/* Inject form shake keyframe */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes formShake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ─── FOOTER YEAR ────────────────────────────────────── */
(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─── HERO IMAGE PARALLAX (subtle) ──────────────────── */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const frame = document.querySelector('.hero-img-frame');
  if (!frame) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    if (scrollY > maxScroll) return;
    const offset = scrollY * 0.12;
    frame.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
})();

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
