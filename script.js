(function(){'use strict';

// Navbar toggle
var navToggle = document.getElementById('navToggle');
var navMenu = document.getElementById('navbarNav');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
  });
  navMenu.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Header shadow on scroll
var header = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    header.style.borderBottomColor = 'rgba(0,0,0,0.06)';
  } else {
    header.style.boxShadow = 'none';
    header.style.borderBottomColor = 'var(--gray-200)';
  }
});

// Scroll reveal
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

// Counter animation
function animateCounter(el) {
  var target = parseInt(el.dataset.target);
  var duration = 1500;
  var start = performance.now();
  function update(now) {
    var progress = Math.min((now - start) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}
var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(function(el) { counterObserver.observe(el); });

// 3D Tilt
document.querySelectorAll('.tilt').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left, y = e.clientY - rect.top;
    card.style.setProperty('--rx', ((y - rect.height/2) / rect.height * -8) + 'deg');
    card.style.setProperty('--ry', ((x - rect.width/2) / rect.width * 8) + 'deg');
  });
  card.addEventListener('mouseleave', function() {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

// Form validation & WhatsApp
var sendBtn = document.getElementById('sendQuoteBtn');
var newQuoteBtn = document.getElementById('newQuoteBtn');
var toast = document.getElementById('thankyouToast');

function getVal(id) { return (document.getElementById(id) || {}).value || ''; }
function showError(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('show');
}
function hideError(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('show');
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function sendWhatsApp() {
  var name = getVal('qname').trim();
  var email = getVal('qemail').trim();
  var phone = getVal('qphone').trim();
  var location = getVal('qlocation').trim();
  var company = getVal('qcompany').trim();
  var when = getVal('qwhen');
  var message = getVal('qmessage').trim();

  var valid = true;
  hideError('nameError'); hideError('emailError'); hideError('phoneError'); hideError('locationError');

  if (name.split(' ').length < 2) { showError('nameError'); valid = false; }
  if (!validateEmail(email)) { showError('emailError'); valid = false; }
  if (!phone || phone.length !== 8 || !/^\d+$/.test(phone)) { showError('phoneError'); valid = false; }
  if (!location) { showError('locationError'); valid = false; }

  if (!valid) return;

  var msg = 'Hola Rizoma Space, quiero cotizar:%0A%0A';
  msg += '\u2501\u2501 DATOS DEL CLIENTE \u2501\u2501%0A';
  msg += '*Nombre:* ' + name + '%0A';
  if (company) msg += '*Empresa:* ' + company + '%0A';
  msg += '*Email:* ' + email + '%0A';
  msg += '*Tel\u00e9fono:* +56 9 ' + phone + '%0A';
  msg += '\u2501\u2501 DETALLE DEL SERVICIO \u2501\u2501%0A';
  if (location) msg += '*Direcci\u00f3n:* ' + location + '%0A';
  if (when) msg += '*Fecha solicitada:* ' + when + '%0A';
  if (message) msg += '*Detalles:* ' + message + '%0A';

  window.open('https://wa.me/56986618409?text=' + encodeURIComponent(msg.replace(/%0A/g, '\n').replace(/\*/g, '')).replace(/%250A/g, '%0A').replace(/%252A/g, '*'), '_blank');

  if (toast) toast.classList.add('show');
}

if (sendBtn) sendBtn.addEventListener('click', sendWhatsApp);
if (newQuoteBtn && toast) {
  newQuoteBtn.addEventListener('click', function() {
    toast.classList.remove('show');
    ['qname','qcompany','qemail','qphone','qlocation','qwhen','qmessage'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    ['nameError','emailError','phoneError','locationError'].forEach(hideError);
    document.getElementById('qname').focus();
  });
}

// Hero background fallback
(function() {
  var heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;
  var isMobile = window.innerWidth <= 768;
  var img = new Image();
  img.onload = function() {
    heroBg.style.backgroundImage = isMobile ? "url('img/hero-truck-mobile.webp')" : "url('img/hero-truck.webp')";
  };
  img.onerror = function() {
    heroBg.style.backgroundImage = isMobile ? "url('img/hero-truck-mobile.png')" : "url('img/hero-truck.png')";
  };
  img.src = 'img/hero-truck.webp';
})();

})();
