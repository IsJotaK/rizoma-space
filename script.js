// Close mobile nav on link click
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');
const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (bsCollapse && navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});

// Header shadow on scroll
const header = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    header.style.borderBottomColor = 'rgba(0,0,0,0.06)';
  } else {
    header.style.boxShadow = 'none';
    header.style.borderBottomColor = 'var(--gray-200)';
  }
});

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const steps = 30;
  const increment = target / steps;
  let current = 0;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// 3D Tilt effect on cards
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const rx = ((y - h / 2) / h) * -8;
    const ry = ((x - w / 2) / w) * 8;
    card.style.setProperty('--rx', rx + 'deg');
    card.style.setProperty('--ry', ry + 'deg');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

// Quote form - send via WhatsApp
const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const company = document.getElementById('company').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const volume = document.getElementById('volume').value;
  const location = document.getElementById('location').value.trim();
  const message = document.getElementById('message').value.trim();

  const serviceLabels = { 'arriendo-contenedor': 'Arriendo de Contenedor', 'retiro-residuos': 'Retiro de Residuos No Peligrosos', 'otro': 'Otro' };
  const volumeLabels = { 'pequeno': 'Pequeño (menos de 3m³)', 'mediano': 'Mediano (3m³ - 7m³)', 'grande': 'Grande (más de 7m³)', 'no-seguro': 'No estoy seguro' };

  let whatsappMsg = `Hola Rizoma Space, quiero cotizar:%0A%0A`;
  whatsappMsg += `*Nombre:* ${name}%0A`;
  if (company) whatsappMsg += `*Empresa:* ${company}%0A`;
  whatsappMsg += `*Email:* ${email}%0A`;
  whatsappMsg += `*Teléfono:* ${phone}%0A`;
  if (service) whatsappMsg += `*Servicio:* ${serviceLabels[service]}%0A`;
  if (volume) whatsappMsg += `*Volumen:* ${volumeLabels[volume]}%0A`;
  if (location) whatsappMsg += `*Dirección:* ${location}%0A`;
  if (message) whatsappMsg += `*Mensaje:* ${message}%0A`;

  window.open(`https://wa.me/56986618409?text=${whatsappMsg}`, '_blank');
});
