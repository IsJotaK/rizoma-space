-- ============================================================================
-- Rizoma Space — Seed inicial (contenido de la web publicada)
-- Ejecutar DESPUÉS de 00001_init.sql.
-- IDEMPOTENTE: borra y resetea las tablas antes de insertar (se puede correr
-- varias veces sin dar "duplicate key").
-- ============================================================================

truncate table
  public.home_hero,
  public.estadisticas,
  public.servicios,
  public.materiales,
  public.certificacion,
  public.pasos,
  public.galeria,
  public.secciones,
  public.cobertura_zonas,
  public.contacto,
  public.redes,
  public.config_sitio
restart identity cascade;

-- ---------------------------------------------------------------------------
-- HOME / HERO
-- ---------------------------------------------------------------------------
insert into public.home_hero
  (badge_1, badge_2, titulo, titulo_accento, titulo_after, subtitulo,
   boton_primario_texto, boton_primario_enlace, boton_secundario_texto,
   boton_secundario_enlace, imagen_escritorio, imagen_movil)
values
  ('Residuos No Peligrosos',
   'Certificado de Disposición Final',
   'Retiro de Escombros en',
   'Temuco',
   'Certificado',
   '¿Necesitas retiro de escombros en la Araucanía? Te dejamos el contenedor, lo llenas a tu ritmo y nosotros lo retiramos con certificación sanitaria. Gestión profesional de residuos no peligrosos para tu empresa o proyecto.',
   'Calcular Cotización',
   '#cotizacion',
   'Nuestros Servicios',
   '#servicios',
   'img/hero-truck.webp',
   'img/hero-truck-mobile.webp');

-- ---------------------------------------------------------------------------
-- ESTADÍSTICAS (barra de métricas)
-- ---------------------------------------------------------------------------
insert into public.estadisticas (icono, numero, texto_fijo, prefijo, sufijo, etiqueta, orden) values
  (null,    50,  null,   '+', '',  'Proyectos Completados', 1),
  (null,    100, null,   '',  '%', 'Cobertura Temuco',      2),
  (null,    null,'24/7', '',  '',  'Atención al Cliente',   3),
  (null,    1,   null,   '+', '',  'Año de Experiencia',    4),
  ('shield-check', null, null, '', '', 'Resolución Sanitaria', 5);

-- ---------------------------------------------------------------------------
-- SERVICIOS
-- ---------------------------------------------------------------------------
insert into public.servicios (icono, titulo, descripcion, orden, activo) values
  ('truck','Arriendo de Contenedores',
   'Contenedores de distintas capacidades para tu retiro de escombros en Temuco. Los dejamos en tu ubicación y los retiramos cuando tú decidas.',
   1, true),
  ('trash','Retiro de Escombros y Residuos',
   'Servicio profesional de retiro de escombros en Temuco. Nos encargamos del retiro y disposición final de tierra, hormigón, maderas y residuos no peligrosos con Resolución Sanitaria.',
   2, true);

-- ---------------------------------------------------------------------------
-- MATERIALES (aceptados / no aceptados)
-- ---------------------------------------------------------------------------
insert into public.materiales (tipo, texto, orden) values
  ('aceptados','Escombros de construcción',1),
  ('aceptados','Tierra y excavaciones',2),
  ('aceptados','Hormigón y cemento',3),
  ('aceptados','Maderas y restos de poda',4),
  ('aceptados','Residuos de demolición',5),
  ('aceptados','Restos de obra menor',6),
  ('aceptados','Escombros limpios en general',7),
  ('no_aceptados','Basura domiciliaria o residencial',1),
  ('no_aceptados','Residuos orgánicos o comida',2),
  ('no_aceptados','Residuos peligrosos o tóxicos',3),
  ('no_aceptados','Amianto o materiales con fibra',4),
  ('no_aceptados','Residuos líquidos o químicos',5),
  ('no_aceptados','Neumáticos fuera de uso',6);

-- ---------------------------------------------------------------------------
-- CERTIFICACIÓN
-- ---------------------------------------------------------------------------
insert into public.certificacion
  (titulo, descripcion, tarjeta_titulo, tarjeta_parrafo,
   badge_1, badge_2, badge_3,
   extra_titulo, extra_parrafo, boton_texto, boton_enlace)
values
  ('Resolución Sanitaria',
   'Cada servicio con todas las garantías legales y ambientales.',
   'Certificados para Residuos No Peligrosos',
   'Contamos con Resolución Sanitaria que nos autoriza para la recolección, transporte y evacuación(fin) de residuos no peligrosos (scombros, tierra, hormigón, maderas, etc.). Esto asegura que tu empresa cumpla con la normativa vigente, evitando multas y problemas legales.',
   'Recolección Autorizada',
   'Transporte Certificado',
   'Disposición Final Responsable',
   'Certificado de Disposición Final',
   'Por cada retiro emitimos un Certificado de Disposición Final, con reporte de trazabilidad para el MINSAL. Ideal para empresas que requieren respaldo documental en auditorías.',
   'Solicita más información',
   'https://wa.me/56986618409');

-- ---------------------------------------------------------------------------
-- PASOS ("Como" Funciona")
-- ---------------------------------------------------------------------------
insert into public.pasos (numero, titulo, descripcion, orden) values
  (1,'Nos Contactas','Escribe por WhatsApp o llama. Cuéntanos qué necesitas y te damos el contenedor adecuado.',1),
  (2,'Instalamos el Contenedor','Llevamos el contenedor a tu domicilio, obra o terreno y lo llenas en los días que acordemos.',2),
  (3,'Lo Retiramos','Pasamos a buscar el contenedor y nos encargamos de la disposición final responsable.',3);

-- ---------------------------------------------------------------------------
-- GALERÍA (6 imágenes actuales)
-- ---------------------------------------------------------------------------
insert into public.galeria (file_url, titulo, descripcion, orden, activo) values
  ('img/gallery-1.jpg','Contenedor en obra','Contenedor Rizoma Space en obra',1,true),
  ('img/gallery-2.jpg','Retiro de escombros','Retiro de escombros en Temuco',2,true),
  ('img/gallery-3.jpg','Residuos no peligrosos','Contenedor para residuos no peligrosos',3,true),
  ('img/gallery-4.jpg','Servicio de contenedor','Servicio de contenedor Rizoma Space',4,true),
  ('img/gallery-5.jpg','Camión contenedor','Camión contenedor Rizoma Space',5,true),
  ('img/gallery-6.jpg','Proyecto en Temuco','Proyecto Rizoma Space Temuco',6,true);

-- ---------------------------------------------------------------------------
-- SECCIONES
-- ---------------------------------------------------------------------------
insert into public.secciones (slug, titulo, descripcion) values
  ('servicios','Nuestros Servicios','Ofrecemos soluciones simples para la gestión de residuos no peligrosos en Temuco y sus alrededores, para constructoras, particulares, empresas y proyectos de toda escala.'),
  ('galeria','Galería de Trabajos','Conoce algunos proyectos donde hemos entregado nuestros servicios de arriendo de contenedores y retiro de escombros en Temuco.'),
  ('cotiza','Solicita tu Cotización','Déjanos tus datos y te enviaremos una cotización personalizada por WhatsApp.'),
  ('como-funciona','¿Cómo Funciona?','Tres pasos simples para tu retiro de escombros en Temuco.'),
  ('cobertura','Cobertura en La Araucanía','Cubrimos toda la Región de La Araucanía. Estamos donde nos necesites.'),
  ('certificacion','Resolución Sanitaria','Trabajamos con todas las garantías legales y ambientales.'),
  ('contacto','Contacta con Nosotros','Estamos listos para ayudarte. Elige el canal que prefieras.');

-- ---------------------------------------------------------------------------
-- COBERTURA (zonas + CTA)
-- ---------------------------------------------------------------------------
insert into public.cobertura_zonas (tipo, titulo, icono, sectores, orden) values
  ('zona','Temuco','building','{"Centro","Pueblo Nuevo","Amanecer","Santa Rosa","Las Quilas","Labranza","Parque Costanera"}',1),
  ('zona','Cautín Norte','city','{"Padre Las Casas","Lautaro","Vilcún","Freire","Nueva Imperial","Cholchol"}',2),
  ('zona','Cautín Sur','water','{"Pitrufquén","Gorbea","Loncoche","Villarrica","Pucón","Toltén"}',3),
  ('zona','Malleco Norte','tree','{"Angol","Collipulli","Renaico","Ercilla","Curacautín","Lonquimay"}',4),
  ('zona','Malleco Sur','mountain','{"Victoria","Traiguén","Purén","Los Sauces","Lumaco"}',5),
  ('cta','¿No encuentras tu comuna?','map-pin','{}',6);
update public.cobertura_zonas set descripcion='Escribenos y te confirmamos si llegamos a tu ubicación', boton_texto='Consultar', boton_enlace='https://wa.me/56986618409' where tipo='cta';

-- ---------------------------------------------------------------------------
-- CONTACTO
-- ---------------------------------------------------------------------------
insert into public.contacto
  (telefono_1, telefono_2, whatsapp_1, whatsapp_2, email)
values
  ('+56 9 8661 8409','+56 9 8811 5108','56986618409','56988115108','spacerizoma@gmail.com');

-- ---------------------------------------------------------------------------
-- REDES
-- ---------------------------------------------------------------------------
insert into public.redes (nombre, url, icono, activo) values
  ('instagram','https://www.instagram.com/rizoma_space_temuco/','instagram',true),
  ('facebook','https://www.facebook.com/profile.php?id=61576707989615','facebook',true),
  ('whatsapp_1','https://wa.me/56986618409','whatsapp',true),
  ('whatsapp_2','https://wa.me/56988115108','whatsapp',true);

-- ---------------------------------------------------------------------------
-- CONFIG SITIO
-- ---------------------------------------------------------------------------
insert into public.config_sitio
  (nombre_sitio, meta_titulo, meta_descripcion, og_titulo, og_descripcion,
   footer_texto, cotizacion_whatsapp)
values
  ('Rizoma Space',
   'Rizoma Space | Arriendo de Contenedores y Retiro de Escombros - Temuco',
   'Rizoma Space: arriendo de contenedores para escombros y residuos no peligrosos en Temuco. Retiro autorizado con Resolución Sanitaria.',
   'Rizoma Space | Arriendo de Contenedores y Retiro de Escombros - Temuco',
   'Arriendo de contenedores para escombros y residuos no peligrosos en Temuco.',
   'Rizoma Space - Retiro de escombros en Temuco. Gestión profesional de residuos no peligrosos.',
   '56986618409');