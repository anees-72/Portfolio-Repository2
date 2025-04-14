import emailjs from '@emailjs/browser';
document.addEventListener('DOMContentLoaded', () => {
    // Configurations
    const config = {
      scrollOffset: 80,
      typingDelay: 50,
      formResetDelay: 3000,
      observerThreshold: 0.1,
    };
  let colors={};
    // Cached Selectors
    const $ = {
      cursor: document.querySelector('.custom-cursor'),
      sectionIcons:document.querySelectorAll('.section-icon'),
      socialIcons: document.querySelectorAll('.hover-icon'),
      links: document.querySelectorAll('a, button'),
      fadeUps: document.querySelectorAll('.fade-up'),
      navLinks: document.querySelectorAll('.nav-link'),
      navbar: document.querySelector('.navbar'),
      form: document.querySelector('#contact form'),
      heroTitle: document.querySelector('.hero-title'),
      hero: document.querySelector('.hero'),
      contact: document.querySelector('#contact'),
      timelineContent: document.querySelectorAll('.timeline-content'),
      projectTags: document.querySelectorAll('.project-tag'),
      projectCards: document.querySelectorAll('.project-card'),
      filterRow: document.querySelector('#projects .row'),
      footer: document.querySelector('#footer'),
      toggleNavIconsBtn:document.getElementById('toggleNavIcons'),
    };


    //navicons toggle functionality
    let isIconMode = false;
    $.navLinks.forEach(link => {
      link.dataset.text = link.textContent.trim();
    });
    $.toggleNavIconsBtn.addEventListener('click', () => {
      isIconMode = !isIconMode;
      $.navLinks.forEach(link => {
        const iconClass = link.dataset.icon;
        const text = link.dataset.text;
        if (isIconMode) {
          link.innerHTML = `<i class="fas ${iconClass}"></i>`;
          link.classList.add('icon-mode');
          const icon=link.querySelector('i');
          icon.addEventListener('mouseover',()=>{
            icon.classList.add('fa-bounce');
          });
          icon.addEventListener('mouseleave',()=>{
            icon.classList.remove('fa-bounce');
          });
        } else {
          link.innerHTML = text;
          link.classList.remove('icon-mode');
        }
      });

      $.toggleNavIconsBtn.querySelector('i').classList.toggle('fa-icons');
      $.toggleNavIconsBtn.querySelector('i').classList.toggle('fa-text-height');
    });
    // Custom Cursor
    if ($.cursor) {
      document.addEventListener('mousemove', (e) => {
        $.cursor.style.left = `${e.clientX}px`;
        $.cursor.style.top = `${e.clientY}px`;
      });
      $.links.forEach((link) => {
        link.addEventListener('mouseenter', () => $.cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () =>
          $.cursor.classList.remove('hover')
        );
      });
    }

    // Fade-Up Animation using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: config.observerThreshold }
    );
    $.fadeUps.forEach((el) => observer.observe(el));

    // Smooth Scrolling
    $.navLinks.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - config.scrollOffset,
            behavior: 'smooth',
          });
        }
      });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      $.navbar.style.padding =
        window.scrollY > 50 ? '0.5rem 2rem' : '1rem 2rem';
      $.navbar.style.boxShadow =
        window.scrollY > 50
          ? `0 5px 15px rgba(${colors['--primary-rgb']}, 0.1)`
          : 'none';
    });

    // Form Submission Handling
    if ($.form) {
      $.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = $.form.querySelectorAll('input, textarea, button');
        inputs.forEach((el) => (el.disabled = true));
        const form ={"name":$.form.name.value,"subject":$.form.subject.value,"email":$.form.email.value,"message":$.form.message.value}
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
        emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form)
          .then(() => {
            const success = Object.assign(document.createElement('div'), {
              className: 'alert alert-success mt-3',
              textContent: 'Thank you! I’ll reply soon.',
            });
            $.form.closest('.contact-form').appendChild(success);
            $.form.reset();
            inputs.forEach((el) => (el.disabled = false));
            setTimeout(() => success.remove(), 3000);
          }, (error) => {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again.');
            inputs.forEach((el) => (el.disabled = false));
          });
      });
    }

    // Typing Effect for Hero Title
    if ($.heroTitle && $.hero) {
      const text = $.heroTitle.innerHTML;
      $.heroTitle.innerHTML = '';
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          $.heroTitle.innerHTML += text.charAt(i++);
          setTimeout(typeWriter, config.typingDelay);
        }
      };
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          typeWriter();
          observer.unobserve(entry.target);
        }
      }).observe($.hero);
    }

    // Dark Mode Toggle
    const darkModeToggle = Object.assign(document.createElement('button'), {
      className: 'dark-mode-toggle',
      innerHTML: '<i class="fas fa-moon"></i>',
      style:
        'position: fixed; bottom: 20px; right: 20px; z-index: 1000; width: 50px; height: 50px; border-radius: 50%; background: var(--primary); color: white; border: none; box-shadow: 0 3px 10px rgba(0,0,0,0.2); cursor: pointer; transition: all 0.3s ease;',
    });
    document.body.appendChild(darkModeToggle);

    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    darkModeToggle.innerHTML =
      savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    updateDarkModeStyles(savedTheme === 'dark');

    darkModeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      darkModeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateDarkModeStyles(isDark);
    });

    function updateDarkModeStyles(isDark) {
       colors = isDark
        ? {
            '--primary': '#64b5f6',
            '--secondary': '#1e1e1e',
            '--dark': '#ffffff',
            '--light': '#121212',
            '--navbar-bg': '#000000',
            '--text-color': '#ffffff',
            '--footer-backgroundColor': '#212529',
            '--footer-color': 'white',
            '--primary-rgb': '100, 181, 246',
          }
        : {
            '--primary': '#2d46b9',
            '--secondary': '#f8f9fa',
            '--dark': '#212529',
            '--light': '#ffffff',
            '--navbar-bg': 'rgba(255, 255, 255, 0.95)',
            '--text-color': '#212529',
            '--footer-backgroundColor': '#ffffff',
            '--footer-color': '#212529',
            '--primary-rgb':'45, 70, 185',
          };

      Object.entries(colors).forEach(([key, value]) =>
        document.documentElement.style.setProperty(key, value)
      );
      $.sectionIcons.forEach(icon=>{
        icon.style.color=colors['--primary'];
        icon.style.filter=`drop-shadow(5px 8px 5px rgba(${colors['--primary-rgb']},0.5))`;
      });

      $.sectionIcons.forEach(icon=>{
        icon.addEventListener('mouseover',()=>{
          icon.classList.add('fa-bounce');
          icon.style.cursor='pointer';
        });
        icon.addEventListener('mouseleave',()=>{
          icon.classList.remove('fa-bounce');
        });
      });
      $.footer.style.backgroundColor = colors['--footer-backgroundColor'];
      $.footer.style.color = colors['--footer-color'];
      $.navbar.style.backgroundColor = colors['--navbar-bg'];
      $.navLinks.forEach(nav=>{nav.style.color = colors['--text-color']});
      $.socialIcons.forEach(icon=>{
        icon.style.color=colors['--primary'];
      });
      $.contact.style.backgroundColor=colors['--secondary'];
    }
  });

