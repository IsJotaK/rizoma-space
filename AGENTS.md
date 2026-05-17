# Rizoma Space - Sitio Web

## Información del Negocio
- **Empresa:** Rizoma Space
- **Servicio:** Arriendo de contenedores para residuos no peligrosos (escombros)
- **Cobertura:** Temuco, Chile
- **WhatsApp 1:** +56986618409
- **WhatsApp 2:** +56988115108
- **Email:** spacerizoma@gmail.com
- **Instagram:** @rizoma_space_temuco
- **Certificación:** Resolución Sanitaria para residuos no peligrosos
- **Público objetivo:** Empresas (B2B) y particulares

## Tecnología
- Landing page estática: HTML + CSS + JS puro
- Hosting: GitHub Pages
- Repo: https://github.com/IsJotaK/rizoma-space
- URL: https://isjotak.github.io/rizoma-space/

## Estructura del Proyecto
```
rizoma-space/
├── index.html        # Página principal
├── styles.css        # Estilos (blanco + verdes)
├── script.js         # Interactividad (menú móvil, formulario)
├── AGENTS.md         # Contexto del proyecto
└── img/
    ├── logo.png                    # Logo de la empresa
    ├── gallery-1.jpg a gallery-6.jpg  # Imágenes de Instagram
```

## Secciones de la Página
1. Hero (portada) - con badge de Resolución Sanitaria
2. Trusted Bar - estadísticas (+50 proyectos, 100% cobertura, 24/7, +5 años, certificación)
3. Servicios - Arriendo de Contenedores, Retiro de Residuos No Peligrosos
4. Cotización - formulario que envía datos por WhatsApp
5. Galería - 6 imágenes en grid
6. Cómo Funciona - 3 pasos
7. Certificación - Resolución Sanitaria con badges
8. Cobertura - Temuco y alrededores
9. CTA
10. Contacto
11. Footer

## Decisiones de Diseño
- Colores: blanco (#fff) + verdes (verde oscuro #0d3b1e a verde claro #2ecc71)
- Tipografía: Inter (Google Fonts)
- Estilo: moderno, profesional, orientado a empresas
- WhatsApp flotante con animación pulse
- Diseño responsive (desktop, tablet, móvil)

## Funcionalidades Especiales
- Formulario de cotización envía datos estructurados por WhatsApp
- Botón "Cotizar" destacado en el menú (verde)
- Navegación suave (scroll平滑)
- Header con blur al hacer scroll
- Imagen de portada desde galería

## Pendientes / Ideas
- Construir app con base de datos (Supabase + RLS) para que empresas
  se registren, vean su historial de pedidos, y cada una solo acceda a
  sus propios datos. Stack: Next.js + Supabase + Vercel.
- (más ideas aquí)

## Cómo Desplegar Cambios
```powershell
cd C:\Users\Jordan\Documents\claude\rizoma-space
git add -A
git commit -m "descripción del cambio"
git push
```
La página se actualiza automáticamente en GitHub Pages.

## Design Tips & Learnings (del video)
Guardar para próximos proyectos:

### Mesh Gradients
- Fondos con múltiples `radial-gradient` superpuestos en distintas posiciones
- Crean profundidad orgánica sin distraer (opacidad 3-8%)
- Aplicar en secciones de fondo plano para darles vida

### Full-Page Scroll Snap
- `scroll-snap-type: y mandatory` en contenedor con `height: 100vh`
- Cada sección: `height: 100vh; scroll-snap-align: start; scroll-snap-stop: always`
- Contenido centrado verticalmente con flexbox
- Padding-top en secciones para navbar fixed

### Animaciones y Hover Effects
- **3D Tilt**: `perspective(800px) rotateX/rotateY` siguiendo el mouse (±8° máx)
- **Counter animation**: números cuentan desde 0 con easing cúbico vía IntersectionObserver
- **Scroll reveal**: fadeInUp con delays escalonados (.reveal, .visible)
- **Button sweep**: `::after` con slide overlay en botones
- **Card gradient border**: `::before` con gradient top border en hover
- **Image hover zoom**: scale(1.1) con overlay gradient en galería
- **Float animation**: keyframes en hero image

### Navbar / Layout
- Bootstrap 5 vía CDN para grid, navbar, forms
- Navbar delgada (56px min-height) con blur backdrop
- Logo + texto de marca compactos
- Navegación smooth con scroll-padding-top

### General
- B2B debe verse profesional, no llamativo
- Menos es más: efectos sutiles (opacidades bajas, ángulos pequeños)
- Mobile-first en padding, desktop en layout
