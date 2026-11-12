// ======================================
// Dark / Light Mode Toggle
// ======================================

const themeSwitch = document.getElementById('themeSwitch');

// Default is LIGHT mode
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');

  if (themeSwitch) {
    themeSwitch.checked = true;
  }
}

if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {

    document.body.classList.toggle('dark-mode');

    const theme = document.body.classList.contains('dark-mode')
      ? 'dark'
      : 'light';

    localStorage.setItem('theme', theme);
  });
}


// ======================================
// Countdown Timer
// Event: 14 November 2026 - 9:30 AM
// ======================================

const targetDate = new Date('2026-11-14T09:30:00').getTime();

function updateCountdown() {

  const now = new Date().getTime();
  const distance = targetDate - now;

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownEl = document.getElementById('countdown');

  if (
    !daysEl ||
    !hoursEl ||
    !minutesEl ||
    !secondsEl ||
    !countdownEl
  ) {
    return;
  }

  if (distance <= 0) {

    countdownEl.innerHTML =
      '<div class="time"><span>LIVE</span>Session Started</div>';

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();

setInterval(updateCountdown, 1000);


// ======================================
// FAQ Accordion
// ======================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {

  question.addEventListener('click', () => {

    const answer = question.nextElementSibling;
    const icon = question.querySelector('span');

    // Close other FAQs
    faqQuestions.forEach(item => {

      if (item !== question) {

        const otherAnswer = item.nextElementSibling;
        const otherIcon = item.querySelector('span');

        if (otherAnswer) {
          otherAnswer.style.display = 'none';
        }

        if (otherIcon) {
          otherIcon.textContent = '+';
        }
      }
    });

    // Toggle current FAQ
    if (answer) {

      if (answer.style.display === 'block') {

        answer.style.display = 'none';

        if (icon) {
          icon.textContent = '+';
        }

      } else {

        answer.style.display = 'block';

        if (icon) {
          icon.textContent = '−';
        }
      }
    }

  });

});


// ======================================
// Scroll Reveal Animation
// ======================================

const revealElements = document.querySelectorAll(
  '.card, .testimonial, .about-wrap, .hero-content, .hero-image'
);

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';

        }

      });

    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => {

    el.style.opacity = '0';

    el.style.transform = 'translateY(40px)';

    el.style.transition =
      'opacity 0.7s ease, transform 0.7s ease';

    observer.observe(el);

  });

}


// ======================================
// Smooth Scroll for Internal Links
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', function (e) {

    const targetSelector = this.getAttribute('href');

    if (!targetSelector || targetSelector === '#') {
      return;
    }

    const target = document.querySelector(targetSelector);

    if (target) {

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  });

});


// ======================================
// IMPACT NUMBER COUNTER
// ======================================

document.addEventListener('DOMContentLoaded', function () {

  const impactNumbers =
    document.querySelectorAll('.impact-number');

  if (!impactNumbers.length) {
    return;
  }

  const animateCounter = (element) => {

    const target = Number(element.dataset.target);

    if (isNaN(target)) {
      return;
    }

    const duration = 1800;

    let startTime = null;

    const updateCounter = (currentTime) => {

      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut =
        1 - Math.pow(1 - progress, 3);

      const currentValue =
        Math.floor(easeOut * target);

      element.textContent =
        currentValue.toLocaleString();

      if (progress < 1) {

        requestAnimationFrame(updateCounter);

      } else {

        element.textContent =
          target.toLocaleString();

      }

    };

    requestAnimationFrame(updateCounter);

  };


  if ('IntersectionObserver' in window) {

    const impactObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              const number = entry.target;

              // Prevent animation from running again
              if (number.dataset.animated === 'true') {
                return;
              }

              number.dataset.animated = 'true';

              animateCounter(number);

              observer.unobserve(number);

            }

          });

        },
        {
          threshold: 0.4
        }
      );


    impactNumbers.forEach(number => {
      impactObserver.observe(number);
    });

  } else {

    // Fallback for older browsers
    impactNumbers.forEach(number => {

      const target = Number(number.dataset.target);

      if (!isNaN(target)) {
        number.textContent =
          target.toLocaleString();
      }

    });

  }

});


// ======================================
// Dynamic Footer Year
// ======================================

const footer = document.querySelector('footer');

if (footer) {

  footer.innerHTML =
    '© ' +
    new Date().getFullYear() +
    ' Multimanttra Solutions | Business Coach Miinal Patil';

}


// ======================================
// REGISTRATION FORM
// Google Sheet + Thank You Dialog
// ======================================

const form =
  document.getElementById('registrationForm');

const submitBtn =
  document.getElementById('submitBtn');

const nameInput =
  document.getElementById('name');

const phoneInput =
  document.getElementById('phone');

const categorySelect =
  document.getElementById('business_category');


// ======================================
// FORM VALIDATION
// ======================================

function validateForm() {

  // Make sure required elements exist
  if (
    !nameInput ||
    !phoneInput ||
    !categorySelect ||
    !submitBtn
  ) {
    return;
  }

  const name =
    nameInput.value.trim();

  const phone =
    phoneInput.value.trim();

  const businessCategory =
    categorySelect.value;

  // Mobile number must be exactly 10 digits
  const phoneValid =
    /^[6-9]\d{9}$/.test(phone);

  if (
    name !== '' &&
    phoneValid &&
    businessCategory !== ''
  ) {

    submitBtn.disabled = false;

    submitBtn.classList.add('enabled');

  } else {

    submitBtn.disabled = true;

    submitBtn.classList.remove('enabled');

  }

}


// Add validation listeners
if (nameInput) {

  nameInput.addEventListener(
    'input',
    validateForm
  );

}

if (phoneInput) {

  phoneInput.addEventListener(
    'input',
    validateForm
  );

}

if (categorySelect) {

  categorySelect.addEventListener(
    'change',
    validateForm
  );

}


// Initial validation
validateForm();


// ======================================
// FORM SUBMISSION
// ======================================

if (form) {

  form.addEventListener('submit', function (e) {

    e.preventDefault();


    // ======================================
    // GET FORM DATA
    // ======================================

    const name =
      document.getElementById('name').value.trim();

    const email =
      document.getElementById('email').value.trim();

    const phone =
      document.getElementById('phone').value.trim();

    //const category =
    //  document.getElementById('business_category').value.trim();


    // ======================================
    // CREATE GOOGLE SHEET FORM DATA
    // ======================================

    const formData =
      new FormData(form);


    // ======================================
    // RAZORPAY PAYMENT PAGE
    // KEPT FOR FUTURE USE
    // ======================================

    const razorpayUrl = new URL(
      'https://pages.razorpay.com/businessdiagnosis'
    );


    // ======================================
    // RAZORPAY PREFILL PARAMETERS
    // KEPT FOR FUTURE USE
    // ======================================

    razorpayUrl.searchParams.set(
      'name',
      name.trim()
    );

    razorpayUrl.searchParams.set(
      'email',
      email.trim()
    );

    razorpayUrl.searchParams.set(
      'phone',
      phone.trim()
    );


    // ======================================
    // RAZORPAY BUSINESS CATEGORY
    // KEPT FOR FUTURE USE
    // ======================================

    //razorpayUrl.searchParams.set(
    //  'business_category',
      //category
    //);


    // ======================================
    // SHOW PROCESSING MESSAGE
    // ======================================

    if (submitBtn) {

      submitBtn.disabled = true;

      submitBtn.textContent =
        'Processing...';

    }


    // ======================================
    // SAVE DATA TO GOOGLE SHEET
    // ======================================

    fetch(
      'https://script.google.com/macros/s/AKfycby7atbnveQRq49CewnZXRodeZSH4WuuWwcpHu_UORdZ9gXzgukj87kPeYo7FYKKdw8/exec',
      {
        method: 'POST',
        body: formData
      }
    )

    .then(response => {

      // Check whether the request itself succeeded
      if (!response.ok) {

        throw new Error(
          'Google Sheet submission failed'
        );

      }

      return response.text();

    })

.then(result => {

    console.log('Google Sheet Response:', result);

    if (String(result).trim().toLowerCase() !== 'success') {
        throw new Error('Google Sheet submission failed');
    }

    if (typeof fbq === 'function') {
        console.log('Automatic Lead event triggered');

        fbq('track', 'Lead');
    } else {
        console.error('Meta Pixel is not available');
    }

    const thankYouDialog =
        document.getElementById('thankYouDialog');

    if (thankYouDialog) {
        thankYouDialog.classList.add('show');
    }

    setTimeout(() => {
        window.location.href = razorpayUrl.toString();
    }, 2000);

})

    .catch(error => {

      console.error(
        'Google Sheet Error:',
        error
      );


      // ======================================
      // RAZORPAY REDIRECT ON ERROR
      // CURRENTLY DISABLED
      // KEEPING FOR FUTURE USE
      // ======================================


      // ======================================
      // RESTORE BUTTON
      // ======================================

      if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.textContent =
          'Book Your Seat';

      }


      // ======================================
      // SHOW ERROR
      // ======================================

      alert(
        'Something went wrong while submitting your details. Please try again.'
      );

    });

  });

}


// ======================================
// THANK YOU DIALOG CONTROLS
// ======================================

const thankYouDialog =
  document.getElementById('thankYouDialog');

const closeThankYouDialog =
  document.getElementById(
    'closeThankYouDialog'
  );

const thankYouOkBtn =
  document.getElementById(
    'thankYouOkBtn'
  );


// Close using X
if (closeThankYouDialog) {

  closeThankYouDialog.addEventListener(
    'click',
    function () {

      if (thankYouDialog) {

        thankYouDialog.classList.remove('show');

      }

    }
  );

}


// Close using Okay button
if (thankYouOkBtn) {

  thankYouOkBtn.addEventListener(
    'click',
    function () {

      if (thankYouDialog) {

        thankYouDialog.classList.remove('show');

      }

    }
  );

}


// ======================================
// VIDEO CAROUSEL
// Infinite Seamless Loop
// ======================================

document.addEventListener(
  'DOMContentLoaded',
  function () {

    const carousel =
      document.getElementById(
        'videoCarousel'
      );

    const nextBtn =
      document.querySelector(
        '.carousel-next'
      );

    const prevBtn =
      document.querySelector(
        '.carousel-prev'
      );


    // If carousel doesn't exist, stop
    if (!carousel) {
      return;
    }


    const originalCards =
      Array.from(
        carousel.querySelectorAll(
          '.video-card'
        )
      );


    // If no cards exist, stop
    if (!originalCards.length) {
      return;
    }


    let isPaused = false;

    let autoScrollTimer = null;

    let correctingPosition = false;


    // ======================================
    // CREATE CLONES
    // ======================================

    const beforeFragment =
      document.createDocumentFragment();

    const afterFragment =
      document.createDocumentFragment();


    originalCards.forEach(function (card) {

      const cloneBefore =
        card.cloneNode(true);

      const cloneAfter =
        card.cloneNode(true);


      beforeFragment.appendChild(
        cloneBefore
      );

      afterFragment.appendChild(
        cloneAfter
      );

    });


    carousel.insertBefore(
      beforeFragment,
      carousel.firstChild
    );


    carousel.appendChild(
      afterFragment
    );


    // ======================================
    // GET COMPLETE SET WIDTH
    // ======================================

    function getSetWidth() {

      const firstOriginal =
        carousel.children[
          originalCards.length
        ];


      if (!firstOriginal) {
        return 0;
      }


      const cardWidth =
        firstOriginal.offsetWidth;


      const styles =
        getComputedStyle(carousel);


      const gap =
        parseFloat(
          styles.columnGap ||
          styles.gap
        ) || 0;


      return (
        (cardWidth + gap) *
        originalCards.length
      );

    }


    // ======================================
    // INITIAL POSITION
    // ======================================

    function setInitialPosition() {

      const firstOriginal =
        carousel.children[
          originalCards.length
        ];


      if (!firstOriginal) {
        return;
      }


      carousel.style.scrollBehavior =
        'auto';


      carousel.scrollLeft =
        firstOriginal.offsetLeft;


      carousel.style.scrollBehavior =
        '';

    }


    setInitialPosition();


    // ======================================
    // CARD DISTANCE
    // ======================================

    function getCardDistance() {

      const card =
        carousel.querySelector(
          '.video-card'
        );


      if (!card) {
        return 300;
      }


      const styles =
        getComputedStyle(carousel);


      const gap =
        parseFloat(
          styles.columnGap ||
          styles.gap
        ) || 0;


      return (
        card.offsetWidth + gap
      );

    }


    // ======================================
    // NEXT
    // ======================================

    function nextSlide() {

      if (isPaused) {
        return;
      }


      carousel.scrollBy({

        left:
          getCardDistance(),

        behavior:
          'smooth'

      });

    }


    // ======================================
    // PREVIOUS
    // ======================================

    function previousSlide() {

      carousel.scrollBy({

        left:
          -getCardDistance(),

        behavior:
          'smooth'

      });

    }


    // ======================================
    // SEAMLESS POSITION CORRECTION
    // ======================================

    carousel.addEventListener(
      'scroll',
      function () {

        if (correctingPosition) {
          return;
        }


        const setWidth =
          getSetWidth();


        if (!setWidth) {
          return;
        }


        // Reached right clone area
        if (
          carousel.scrollLeft >
          setWidth * 1.5
        ) {

          correctingPosition =
            true;


          carousel.style.scrollBehavior =
            'auto';


          carousel.scrollLeft =
            carousel.scrollLeft -
            setWidth;


          carousel.style.scrollBehavior =
            '';


          requestAnimationFrame(
            function () {

              correctingPosition =
                false;

            }
          );

        }


        // Reached left clone area
        if (
          carousel.scrollLeft <
          setWidth * 0.5
        ) {

          correctingPosition =
            true;


          carousel.style.scrollBehavior =
            'auto';


          carousel.scrollLeft =
            carousel.scrollLeft +
            setWidth;


          carousel.style.scrollBehavior =
            '';


          requestAnimationFrame(
            function () {

              correctingPosition =
                false;

            }
          );

        }

      }
    );


    // ======================================
    // ARROWS
    // ======================================

    if (nextBtn) {

      nextBtn.addEventListener(
        'click',
        function () {

          nextSlide();

          restartAutoScroll();

        }
      );

    }


    if (prevBtn) {

      prevBtn.addEventListener(
        'click',
        function () {

          previousSlide();

          restartAutoScroll();

        }
      );

    }


    // ======================================
    // AUTO SCROLL
    // ======================================

    function startAutoScroll() {

      clearInterval(
        autoScrollTimer
      );


      autoScrollTimer =
        setInterval(
          function () {

            if (!isPaused) {

              nextSlide();

            }

          },
          4500
        );

    }


    // ======================================
    // STOP AUTO SCROLL
    // ======================================

    function stopAutoScroll() {

      clearInterval(
        autoScrollTimer
      );

    }


    // ======================================
    // RESTART AUTO SCROLL
    // ======================================

    function restartAutoScroll() {

      stopAutoScroll();


      setTimeout(
        function () {

          if (!isPaused) {

            startAutoScroll();

          }

        },
        3000
      );

    }


    // ======================================
    // PAUSE ON HOVER
    // ======================================

    carousel.addEventListener(
      'mouseenter',
      function () {

        isPaused = true;

      }
    );


    carousel.addEventListener(
      'mouseleave',
      function () {

        isPaused = false;

      }
    );


    // ======================================
    // PAUSE WHEN VIDEO PLAYS
    // ======================================

    carousel.addEventListener(
      'play',
      function (event) {

        if (
          event.target.tagName ===
          'VIDEO'
        ) {

          isPaused = true;

        }

      },
      true
    );


    // ======================================
    // RESUME WHEN VIDEO PAUSES
    // ======================================

    carousel.addEventListener(
      'pause',
      function (event) {

        if (
          event.target.tagName ===
          'VIDEO'
        ) {

          isPaused = false;

        }

      },
      true
    );


    // ======================================
    // RESUME WHEN VIDEO ENDS
    // ======================================

    carousel.addEventListener(
      'ended',
      function (event) {

        if (
          event.target.tagName ===
          'VIDEO'
        ) {

          isPaused = false;

        }

      },
      true
    );


    // ======================================
    // TOUCH SUPPORT
    // ======================================

    carousel.addEventListener(
      'touchstart',
      function () {

        isPaused = true;

      },
      {
        passive: true
      }
    );


    carousel.addEventListener(
      'touchend',
      function () {

        isPaused = false;

        restartAutoScroll();

      },
      {
        passive: true
      }
    );


    // ======================================
    // RESIZE
    // ======================================

    window.addEventListener(
      'resize',
      function () {

        setTimeout(
          function () {

            const setWidth =
              getSetWidth();


            if (!setWidth) {
              return;
            }


            if (
              carousel.scrollLeft <
              setWidth * 0.5
            ) {

              carousel.scrollLeft +=
                setWidth;

            }


            if (
              carousel.scrollLeft >
              setWidth * 1.5
            ) {

              carousel.scrollLeft -=
                setWidth;

            }

          },
          150
        );

      }
    );


    // ======================================
    // START AUTO SCROLL
    // ======================================

    startAutoScroll();

  }
);

/* ==========================================
   PODCAST SLIDER
========================================== */

document.addEventListener("DOMContentLoaded", function () {

  const slider = document.getElementById("podcastSlider");
  const previousButton = document.querySelector(".podcast-prev");
  const nextButton = document.querySelector(".podcast-next");

  if (!slider || !previousButton || !nextButton) return;

  function getScrollAmount() {
    const card = slider.querySelector(".podcast-card");

    if (!card) return 300;

    return card.getBoundingClientRect().width + 25;
  }

  previousButton.addEventListener("click", function () {
    slider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  nextButton.addEventListener("click", function () {
    slider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

});
