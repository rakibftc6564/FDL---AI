document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('rakib-theme');
  if (savedTheme === 'light') body.classList.add('light');
  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('rakib-theme', body.classList.contains('light') ? 'light' : 'dark');
  });

  const menuButton = document.getElementById('mobileMenu');
  const mainNav = document.getElementById('mainNav');
  menuButton?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
    if (window.lucide) lucide.createIcons();
  });
  mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  }));

  // Dynamic role text animation
  const role = document.getElementById('typedRole');
  const words = ['Developer', 'Problem Solver', 'Backend Engineer'];
  let wordIndex = 0, charIndex = words[0].length, deleting = true;
  function typeRole() {
    const word = words[wordIndex];
    charIndex += deleting ? -1 : 1;
    role.textContent = word.slice(0, charIndex);
    let delay = deleting ? 55 : 95;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
    else if (deleting && charIndex === 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 350; }
    setTimeout(typeRole, delay);
  }
  setTimeout(typeRole, 1600);

  // Scroll reveal and active navigation state
  const revealTargets = document.querySelectorAll('.section-heading,.about-copy,.fact-card,.skill,.project-card,.faq-item,.contact-panel');
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealTargets.forEach(el => revealObserver.observe(el));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link,.side-link');
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
  document.getElementById('year').textContent = new Date().getFullYear();
});
