const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.sdg-card, .team-card, .value-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
  observer.observe(el);
});
