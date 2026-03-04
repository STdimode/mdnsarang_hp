document.addEventListener('DOMContentLoaded', () => {
  /* ─── FadeUp Logic ─── */
  const fadeElements = document.querySelectorAll('.fade-up-init');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-delay') || '0';

            // Apply delay inline to match react behavior exactly
            el.style.transitionDelay = `${delay}ms, ${delay}ms`;

            // Set visible class
            el.classList.add('fade-up-active');

            fadeObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeElements.forEach((el) => {
      fadeObserver.observe(el);
    });
  }

  /* ─── Gallery Carousel Logic ─── */
  const galleryContainer = document.querySelector('.mdn-gallery-container');
  const galleryTrack = document.querySelector('.mdn-gallery-track');
  const gallerySlides = document.querySelectorAll('.mdn-gallery-slide');
  const galleryDots = document.querySelectorAll('.mdn-gallery-dot');
  const btnPrev = document.querySelector('.mdn-gallery-btn-prev');
  const btnNext = document.querySelector('.mdn-gallery-btn-next');
  const svgPrev = document.querySelector('.mdn-gallery-btn-prev svg');
  const svgNext = document.querySelector('.mdn-gallery-btn-next svg');

  if (galleryContainer && galleryTrack && gallerySlides.length > 0) {
    const GALLERY_GAP = 20;
    const N = 6; // original images count
    let slideW = 0;
    let visibleCount = 5;
    let idx = N; // Start at copy1 (index 6)
    let anim = true;
    let isDragging = false;
    let dragOffset = 0;
    let dragStartX = 0;
    let autoplayEnabled = true;

    function getVisibleCount(width) {
      if (width < 640) return 2;
      if (width < 900) return 3;
      return 5;
    }

    function measure() {
      const cw = galleryContainer.clientWidth;
      visibleCount = getVisibleCount(cw);
      const gap = cw < 480 ? 10 : GALLERY_GAP;
      slideW = (cw - gap * (visibleCount - 1)) / visibleCount;

      // Update inline styles based on responsive calculations
      galleryContainer.style.padding = visibleCount <= 2 ? '0 16px' : '0';
      galleryTrack.style.gap = `${gap}px`;

      const imgHeight = visibleCount <= 2 ? 200 : 260;
      gallerySlides.forEach(slide => {
        slide.style.width = `${slideW}px`;
        slide.style.height = `${imgHeight}px`;
      });

      // Update SVG Arrows width
      if (svgPrev) svgPrev.style.width = visibleCount <= 2 ? '60px' : '160px';
      if (svgNext) svgNext.style.width = visibleCount <= 2 ? '60px' : '160px';

      render();
    }

    function render() {
      const cw = galleryContainer.clientWidth;
      const gap = cw < 480 ? 10 : GALLERY_GAP;
      const translateX = idx * (slideW + gap) - dragOffset;

      galleryTrack.style.transform = `translateX(-${translateX}px)`;
      galleryTrack.style.transition = anim ? 'transform 0.5s ease' : 'none';

      // Update dots
      const activeDot = ((idx % N) + N) % N;
      galleryDots.forEach((dot, i) => {
        if (i === activeDot) {
          dot.classList.add('active');
          dot.style.width = '20px';
          dot.style.background = '#4A90D9';
        } else {
          dot.classList.remove('active');
          dot.style.width = '8px';
          dot.style.background = '#ccc';
        }
      });
    }

    window.addEventListener('resize', measure);
    measure(); // Initial call

    // Autoplay
    setInterval(() => {
      if (autoplayEnabled) {
        anim = true;
        idx++;
        render();
      }
    }, 3500);

    // Infinite loop jump
    galleryTrack.addEventListener('transitionend', () => {
      if (idx >= N * 2) {
        anim = false;
        idx -= N;
        render();
        // Force reflow and re-enable anim
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            anim = true;
          });
        });
      } else if (idx < N) {
        anim = false;
        idx += N;
        render();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            anim = true;
          });
        });
      }
    });

    // Arrows
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        anim = true;
        idx--;
        render();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        anim = true;
        idx++;
        render();
      });
    }

    // Dots
    galleryDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        anim = true;
        idx = N + i;
        render();
      });
    });

    // Drag Logic
    function handleDragStart(x) {
      isDragging = true;
      autoplayEnabled = false;
      anim = false;
      dragStartX = x;
      dragOffset = 0;
      galleryContainer.classList.add('dragging');
    }

    function handleDragMove(x) {
      if (!isDragging) return;
      dragOffset = x - dragStartX;
      render();
    }

    function handleDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      autoplayEnabled = true;
      galleryContainer.classList.remove('dragging');

      const threshold = slideW * 0.3;
      if (dragOffset < -threshold) {
        anim = true;
        idx++;
      } else if (dragOffset > threshold) {
        anim = true;
        idx--;
      } else {
        anim = true; // snap back
      }
      dragOffset = 0;
      render();
    }

    // Mouse events
    galleryContainer.addEventListener('mousedown', (e) => handleDragStart(e.clientX));
    window.addEventListener('mousemove', (e) => handleDragMove(e.clientX));
    window.addEventListener('mouseup', handleDragEnd);
    galleryContainer.addEventListener('mouseleave', handleDragEnd);

    // Touch events
    galleryContainer.addEventListener('touchstart', (e) => handleDragStart(e.touches[0].clientX), {passive: true});
    window.addEventListener('touchmove', (e) => handleDragMove(e.touches[0].clientX), {passive: false});
    window.addEventListener('touchend', handleDragEnd);
  }
});
