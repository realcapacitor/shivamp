document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Theme toggle (dark/light)
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');

  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light');
      themeToggle.textContent = '🌙';
    } else {
      document.body.classList.remove('light');
      themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', mode);
  }

  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    setTheme('dark');
  }

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    setTheme(nextTheme);
  });

  // Scrollspy: highlight nav links based on sections
  const sectionRefs = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.site-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0.2
  });

  sectionRefs.forEach(section => observer.observe(section));
});