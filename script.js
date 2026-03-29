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

  // Theme toggle (dark/light) with automatic time-based switching
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('theme');

  function getTimeBasedTheme() {
    const hour = new Date().getHours();
    // Day: 6 AM to 6 PM, Night: 6 PM to 6 AM
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  }

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

  // Set initial theme: use stored preference, or fall back to time-based
  let autoUpdateInterval;
  if (storedTheme) {
    setTheme(storedTheme);
  } else {
    const autoTheme = getTimeBasedTheme();
    setTheme(autoTheme);
    // For users without stored preference, check time every hour and update theme
    autoUpdateInterval = setInterval(() => {
      if (!localStorage.getItem('theme')) {
        const currentAutoTheme = getTimeBasedTheme();
        const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
        if (currentAutoTheme !== currentTheme) {
          setTheme(currentAutoTheme);
        }
      }
    }, 60 * 60 * 1000); // Check every hour
  }

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    setTheme(nextTheme);
  });

  // Double-click to reset to automatic time-based theme
  themeToggle.addEventListener('dblclick', () => {
    localStorage.removeItem('theme');
    const autoTheme = getTimeBasedTheme();
    setTheme(autoTheme);
    // Start automatic updating if not already running
    if (!autoUpdateInterval) {
      autoUpdateInterval = setInterval(() => {
        if (!localStorage.getItem('theme')) {
          const currentAutoTheme = getTimeBasedTheme();
          const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
          if (currentAutoTheme !== currentTheme) {
            setTheme(currentAutoTheme);
          }
        }
      }, 60 * 60 * 1000);
    }
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