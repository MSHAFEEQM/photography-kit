// Interactivity for FAQ Accordion & Countdown Timer

document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion logic
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isOpen = faqItem.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isOpen) {
        faqItem.classList.add('active');
      }
    });
  });

  // Countdown Timer Logic (Dynamic 4 hours count down)
  let totalSeconds = 4 * 3600 + 32 * 60 + 15;

  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    if (totalSeconds <= 0) {
      totalSeconds = 4 * 3600; // loop timer for live feel
    }

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(mins).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(secs).padStart(2, '0');

    totalSeconds--;
  }

  setInterval(updateTimer, 1000);
  updateTimer();

  // Reviews Carousel Logic
  const slides = document.querySelectorAll('.review-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('reviewsPrev');
  const nextBtn = document.getElementById('reviewsNext');
  const carouselWrapper = document.querySelector('.reviews-carousel-wrapper');

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoSlideTimer = null;

    function goToSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        startAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        startAutoSlide();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        startAutoSlide();
      });
    });

    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
      carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize
    goToSlide(0);
    startAutoSlide();
  }

  // Meta Pixel Event Tracking for CTA Buttons (InitiateCheckout)
  const ctaButtons = document.querySelectorAll('a[href*="superprofile.bio"], .btn-primary, .btn-sticky');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', {
          content_name: 'Complete Ultimate Photography & Video Bundle 2026',
          value: 299,
          currency: 'INR'
        });
      }
    });
  });
});
