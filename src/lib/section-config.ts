export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "switch"
  | "select"
  | "icon"
  | "image";

export interface FieldSpec {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  hint?: string;
  required?: boolean;
  warn?: string; // aviso de impacto (p.ej. afecta SEO / posicionamiento)
}

export interface SectionConfig {
  key: string;
  title: string;
  table: string;
  single?: boolean; // tabla de una sola fila
  description?: string;
  icon: string;
  fields: FieldSpec[];
}

export const SECTION_META: Record<string, SectionConfig> = {
  home: {
    key: "home",
    title: "Portada (Hero)",
    table: "home_hero",
    single: true,
    icon: "🏠",
    description: "Texto principal y botones de la primera pantalla.",
    fields: [
      { name: "badge_1", label: "Sello 1", type: "text" },
      { name: "badge_2", label: "Sello 2", type: "text" },
      { name: "titulo", label: "Título (antes) ", type: "text", warn: "El H1 es clave para el posicionamiento. Evita cambios frecuentes." },
      { name: "titulo_accento", label: "Palabra destacada", type: "text", warn: "El H1 es clave para el posicionamiento. Evita cambios frecuentes." },
      { name: "titulo_after", label: "Título (despu\u00e9s)", type: "text" },
      { name: "subtitulo", label: "Subtítulo", type: "textarea" },
      { name: "boton_primario_texto", label: "Botón primario", type: "text" },
      { name: "boton_primario_enlace", label: "Enlace botón primario", type: "text" },
      { name: "boton_secundario_texto", label: "Botón secundario", type: "text" },
      { name: "boton_secundario_enlace", label: "Enlace botón secundario", type: "text" },
      { name: "imagen_escritorio", label: "Imagen de portada (escritorio)", type: "image" },
      { name: "imagen_movil", label: "Imagen de portada (móvil)", type: "image" },
    ],
  },
  estadisticas: {
    key: "estadisticas", title: "M\u00e9tricas", table: "estadisticas", icon: "📊",
    description: "Números que aparecen bajo la portada.",
    fields: [
      { name: "icono", label: "Icono", type: "icon", hint: "p.ej. shield-check (opcional)" },
      { name: "numero", label: "Número", type: "number" },
      { name: "texto_fijo", label: "Texto fijo (24/7)", type: "text" },
      { name: "prefijo", label: "Prefijo (+, %)", type: "text" },
      { name: "sufijo", label: "Sufijo", type: "text" },
      { name: "etiqueta", label: "Etiqueta", type: "text", required: true },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  servicios: {
    key: "servicios", title: "Servicios", table: "servicios", icon: "🧱",
    description: "Tarjetas de servicios de la sección Servicios.",
    fields: [
      { name: "icono", label: "Icono", type: "icon" },
      { name: "titulo", label: "Título", type: "text", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea", required: true },
      { name: "boton_texto", label: "Texto del botón", type: "text" },
      { name: "boton_enlace", label: "Enlace del botón", type: "text" },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  materiales: {
    key: "materiales", title: "Residuos que retiramos", table: "materiales", icon: "🗑",
    description: "Lista de materiales aceptados / no aceptados.",
    fields: [
      { name: "tipo", label: "Tipo", type: "select", options: ["aceptados", "no_aceptados"], required: true },
      { name: "texto", label: "Texto", type: "text", required: true },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  galeria: {
    key: "galeria", title: "Galería", table: "galeria", icon: "🖼",
    description: "Imágenes de la galería. Se muestran en la página.",
    fields: [
      { name: "file_url", label: "Imagen", type: "image", required: true },
      { name: "titulo", label: "Título", type: "text" },
      { name: "descripcion", label: "Descripción", type: "text" },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  certificacion: {
    key: "certificacion", title: "Certificación", table: "certificacion", single: true, icon: "🛡",
    description: "Bloque de Resolución Sanitaria.",
    fields: [
      { name: "titulo", label: "Título de la sección", type: "text" },
      { name: "descripcion", label: "Descripción de la sección", type: "textarea" },
      { name: "tarjeta_titulo", label: "Título de la ficha", type: "text" },
      { name: "tarjeta_parrafo", label: "Texto de la ficha", type: "textarea" },
      { name: "badge_1", label: "Sello 1", type: "text" },
      { name: "badge_2", label: "Sello 2", type: "text" },
      { name: "badge_3", label: "Sello 3", type: "text" },
      { name: "extra_titulo", label: "Título extra", type: "text" },
      { name: "extra_parrafo", label: "Texto extra", type: "textarea" },
      { name: "boton_texto", label: "Texto del botón", type: "text" },
      { name: "boton_enlace", label: "Enlace del botón", type: "text" },
    ],
  },
  pasos: {
    key: "pasos", title: "Cómo Funciona", table: "pasos", icon: "👣",
    description: "Pasos de la sección Cómo Funciona.",
    fields: [
      { name: "numero", label: "Número", type: "number" },
      { name: "titulo", label: "Título", type: "text", required: true },
      { name: "descripcion", label: "Descripción", type: "textarea" },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  secciones: {
    key: "secciones", title: "Títulos de sección", table: "secciones", icon: "🏷",
    description: "Títulos y subtítulos de cada bloque de la página.",
    fields: [
      { name: "slug", label: "Bloque", type: "text", required: true, warn: "No cambies el slug: rompe los enlaces internos y el posicionamiento de esta sección.", hint: "servicios, galeria, cotiza, cobertura, contacto, como-funciona, certificacion" },
      { name: "titulo", label: "Título", type: "text", warn: "Los H2 afectan el posicionamiento de la sección." },
      { name: "descripcion", label: "Descripción", type: "textarea" },
    ],
  },
  cobertura: {
    key: "cobertura", title: "Cobertura", table: "cobertura_zonas", icon: "📍",
    description: "Zonas de cobertura y tarjeta de consulta.",
    fields: [
      { name: "tipo", label: "Tipo", type: "select", options: ["zona", "cta"] },
      { name: "titulo", label: "Título", type: "text", required: true },
      { name: "icono", label: "Icono", type: "icon" },
      { name: "descripcion", label: "Descripción (CTA)", type: "textarea" },
      { name: "boton_texto", label: "Texto botón (CTA)", type: "text" },
      { name: "boton_enlace", label: "Enlace (CTA)", type: "text" },
      { name: "sectores", label: "Sectores (uno por línea)", type: "textarea", hint: "Para zonas: una comuna por línea" },
      { name: "orden", label: "Orden", type: "number" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  contacto: {
    key: "contacto", title: "Contacto", table: "contacto", single: true, icon: "📞",
    description: "Datos de contacto.",
    fields: [
      { name: "telefono_1", label: "Teléfono 1", type: "text" },
      { name: "telefono_2", label: "Teléfono 2", type: "text" },
      { name: "whatsapp_1", label: "WhatsApp 1 (solo número)", type: "text" },
      { name: "whatsapp_2", label: "WhatsApp 2 (solo número)", type: "text" },
      { name: "email", label: "Correo", type: "text" },
      { name: "direccion", label: "Dirección", type: "text" },
      { name: "horario", label: "Horario", type: "text" },
    ],
  },
  redes: {
    key: "redes", title: "Redes sociales", table: "redes", icon: "🌐",
    description: "Enlaces de redes sociales.",
    fields: [
      { name: "nombre", label: "Nombre", type: "text", required: true },
      { name: "url", label: "URL", type: "text", required: true },
      { name: "icono", label: "Icono", type: "icon" },
      { name: "activo", label: "Visible", type: "switch" },
    ],
  },
  seo: {
    key: "seo", title: "SEO y Configuración", table: "config_sitio", single: true, icon: "⚙️",
    description: "Metadatos, pie de página y número de cotización.",
    fields: [
      { name: "nombre_sitio", label: "Nombre del sitio", type: "text", warn: "Afecta los metadatos y el posicionamiento global." },
      { name: "meta_titulo", label: "Título SEO", type: "text", warn: "Meta título: influye directamente en el posicionamiento y en los clics." },
      { name: "meta_descripcion", label: "Descripción SEO", type: "textarea", warn: "Meta descripción: influye en el CTR en buscadores." },
      { name: "og_titulo", label: "Open Graph título", type: "text", warn: "Texto que se muestra al compartir el link en redes." },
      { name: "og_descripcion", label: "Open Graph descripción", type: "textarea" },
      { name: "footer_texto", label: "Pie de página", type: "textarea" },
      { name: "cotizacion_whatsapp", label: "Número WhatsApp cotización", type: "text" },
    ],
  },
};

export const ICONS = [
  "truck", "trash", "circle-check", "recycle", "clipboard", "building",
  "city", "water", "tree", "mountain", "map-pin", "shield-check", "phone",
  "whatsapp", "instagram", "facebook", "email", "document", "clock",
];