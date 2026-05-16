// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Header on scroll
const header = document.getElementById('header');
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
