    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');
    const counters = document.querySelectorAll('[data-count]');

    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.textContent = navLinks.classList.contains('open') ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.textContent = '☰';
      });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }

      animateCounters();
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let countersStarted = false;

    function animateCounters() {
      if (countersStarted || counters.length === 0) return;

      const firstCounterTop = counters[0].getBoundingClientRect().top;
      if (firstCounterTop > window.innerHeight - 100) return;

      countersStarted = true;

      counters.forEach(counter => {
        const target = Number(counter.dataset.count);
        let current = 0;
        const duration = 1400;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, stepTime);
      });
    }

    bookingForm.addEventListener('submit', async event => {
      event.preventDefault();

      const formData = new FormData(bookingForm);
      const payload = Object.fromEntries(formData.entries());

      /*
        ربط الباك إند لاحقاً:
        استبدل التعليق التالي بطلب API حقيقي مثل:

        await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      */

      console.log('Consultation Request:', payload);
      formMessage.classList.add('success');
      bookingForm.reset();

      setTimeout(() => {
        formMessage.classList.remove('success');
      }, 4500);
    });

    animateCounters();