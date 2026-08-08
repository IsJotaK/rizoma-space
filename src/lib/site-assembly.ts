import type { Row } from "@/lib/types";

/* ------------------------------------------------------------------
 * Tipos del sitio (con `id` para identificar filas al editar)
 * ------------------------------------------------------------------ */
export interface Hero {
  id?: number;
  badge_1: string;
  badge_2: string;
  titulo: string;
  titulo_accento: string;
  titulo_after: string;
  subtitulo: string;
  boton_primario_texto: string;
  boton_primario_enlace: string;
  boton_secundario_texto: string;
  boton_secundario_enlace: string;
  imagen_escritorio: string;
  imagen_movil: string;
}

export interface Stat {
  id?: number;
  activo?: boolean;
  icono?: string;
  numero?: number | null;
  texto_fijo?: string | null;
  prefijo?: string;
  sufijo?: string;
  etiqueta: string;
}

export interface Service {
  id?: number;
  activo?: boolean;
  icono?: string;
  titulo: string;
  descripcion: string;
}

export interface Cert {
  id?: number;
  titulo: string;
  descripcion: string;
  tarjeta_titulo: string;
  tarjeta_parrafo: string;
  badge_1: string;
  badge_2: string;
  badge_3: string;
  extra_titulo: string;
  extra_parrafo: string;
  boton_texto: string;
  boton_enlace: string;
}

export interface Paso {
  id?: number;
  activo?: boolean;
  numero: number;
  titulo: string;
  descripcion: string;
}

export interface GalleryItem {
  id?: number;
  activo?: boolean;
  file_url: string;
  titulo?: string;
}

export interface MaterialItem {
  id?: number;
  activo?: boolean;
  texto: string;
}

export interface Zona {
  id?: number;
  activo?: boolean;
  titulo: string;
  icono?: string;
  sectores: string[];
}

export interface Cta {
  id?: number;
  activo?: boolean;
  titulo: string;
  descripcion: string;
  boton_texto: string;
  boton_enlace: string;
}

export interface Contacto {
  id?: number;
  telefono_1?: string;
  telefono_2?: string;
  whatsapp_1?: string;
  whatsapp_2?: string;
  email?: string;
}

export interface Red {
  id?: number;
  activo?: boolean;
  nombre: string;
  url: string;
  icono?: string;
}

export interface Config {
  id?: number;
  nombre_sitio: string;
  meta_titulo: string;
  meta_descripcion: string;
  og_titulo: string;
  og_descripcion: string;
  footer_texto: string;
  cotizacion_whatsapp: string;
}

export interface SeccionMeta {
  id?: number;
  slug?: string;
  titulo?: string;
  descripcion?: string;
}

export interface SiteData {
  hero: Hero;
  stats: Stat[];
  services: Service[];
  aceptados: MaterialItem[];
  noAceptados: MaterialItem[];
  certificacion: Cert;
  pasos: Paso[];
  secciones: Record<string, SeccionMeta>;
  galeria: GalleryItem[];
  zonas: Zona[];
  cta: Cta;
  contacto: Contacto;
  redes: Red[];
  config: Config;
}

/* ------------------------------------------------------------------
 * Datos brutos por tabla (lo que devuelve Supabase)
 * ------------------------------------------------------------------ */
export interface RawData {
  home_hero: Row[];
  estadisticas: Row[];
  servicios: Row[];
  materiales: Row[];
  certificacion: Row[];
  pasos: Row[];
  galeria: Row[];
  secciones: Row[];
  cobertura_zonas: Row[];
  contacto: Row[];
  redes: Row[];
  config_sitio: Row[];
}

const s = (v: unknown): string => (typeof v === "string" ? v : "");
const num = (v: unknown): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

function fill(value: string, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

function normalizeImg(v: string): string {
  if (/^(https?:|data:|blob:|\/)/.test(v)) return v;
  return "/" + v.replace(/^\.?\//, "");
}

function sectionsToMap(rows: unknown[]): Record<string, SeccionMeta> {
  const map: Record<string, SeccionMeta> = {};
  for (const r of rows as { id?: number; slug?: string; titulo?: string; descripcion?: string }[]) {
    if (r.slug) map[r.slug] = { id: r.id, slug: r.slug, titulo: r.titulo, descripcion: r.descripcion };
  }
  return map;
}

function splitSectores(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean);
  return s(v)
    .split(/[\n,]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export const DEFAULT_SITE: SiteData = {
  hero: {
    badge_1: "Residuos No Peligrosos",
    badge_2: "Certificado de Disposición Final",
    titulo: "Retiro de Escombros en",
    titulo_accento: "Temuco",
    titulo_after: "Certificado",
    subtitulo:
      "¿Necesitas retiro de escombros en la Araucanía? Te dejamos el contenedor, lo llenas a tu ritmo y nosotros lo retiramos con certificación sanitaria. Gestión profesional de residuos no peligrosos para tu empresa o proyecto.",
    boton_primario_texto: "Calcular Cotización",
    boton_primario_enlace: "#cotizacion",
    boton_secundario_texto: "Nuestros Servicios",
    boton_secundario_enlace: "#servicios",
    imagen_escritorio: "img/hero-truck.webp",
    imagen_movil: "img/hero-truck-mobile.webp",
  },
  stats: [
    { numero: 50, prefijo: "+", sufijo: "", etiqueta: "Proyectos Completados" },
    { numero: 100, sufijo: "%", etiqueta: "Cobertura Temuco" },
    { texto_fijo: "24/7", etiqueta: "Atención al Cliente" },
    { numero: 1, prefijo: "+", etiqueta: "Año de Experiencia" },
    { icono: "shield-check", etiqueta: "Resolución Sanitaria" },
  ],
  services: [
    {
      icono: "truck",
      titulo: "Arriendo de Contenedores",
      descripcion:
        "Contenedores de distintas capacidades para tu retiro de escombros en Temuco. Los dejamos en tu ubicación y los retiramos cuando tú decidas.",
    },
    {
      icono: "trash",
      titulo: "Retiro de Escombros y Residuos",
      descripcion:
        "Servicio profesional de retiro de escombros en Temuco. Nos encargamos del retiro y disposición final de tierra, hormigón, maderas y residuos no peligrosos con Resolución Sanitaria.",
    },
  ],
  aceptados: [
    { texto: "Escombros de construcción" },
    { texto: "Tierra y excavaciones" },
    { texto: "Hormigón y cemento" },
    { texto: "Maderas y restos de poda" },
    { texto: "Residuos de demolición" },
    { texto: "Restos de obra menor" },
    { texto: "Escombros limpios en general" },
  ],
  noAceptados: [
    { texto: "Basura domiciliaria o residencial" },
    { texto: "Residuos orgánicos o comida" },
    { texto: "Residuos peligrosos o tóxicos" },
    { texto: "Amianto o materiales con fibra" },
    { texto: "Residuos líquidos o químicos" },
    { texto: "Neumáticos fuera de uso" },
  ],
  certificacion: {
    titulo: "Resolución Sanitaria",
    descripcion: "Trabajamos con todas las garantías legales y ambientales.",
    tarjeta_titulo: "Certificados para Residuos No Peligrosos",
    tarjeta_parrafo:
      "Contamos con Resolución Sanitaria que nos autoriza para la recolección, transporte y disposición final de residuos no peligrosos (escombros, tierra, hormigón, maderas, etc.). Esto asegura que tu empresa cumpla con la normativa vigente al contratar nuestros servicios, evitando multas y problemas legales.",
    badge_1: "Recolección Autorizada",
    badge_2: "Transporte Certificado",
    badge_3: "Disposición Final Responsable",
    extra_titulo: "Certificado de Disposición Final",
    extra_parrafo:
      "Por cada retiro emitimos un Certificado de Disposición Final, con el reporte de trazabilidad completo para el MINSAL. Este documento acredita que tus residuos fueron gestionados en instalaciones autorizadas. Ideal para empresas que requieren respaldo documental en auditorías.",
    boton_texto: "Solicita más información",
    boton_enlace: "https://wa.me/56986618409",
  },
  pasos: [
    {
      numero: 1,
      titulo: "NosContactas",
      descripcion:
        "Escríbenos por WhatsApp o llámanos. Cuéntanos qué necesitas y te daremos el contenedor adecuado.",
    },
    {
      numero: 2,
      titulo: "Instalamos elContenedor",
      descripcion:
        "Llevamos el contenedor a tu domicilio, obra o terreno. Lo llenas en los días que acordemos.",
    },
    {
      numero: 3,
      titulo: "LoRetiramos",
      descripcion:
        "Pasamos a buscar el contenedor y nos encargamos de la disposición final responsable de los residuos.",
    },
  ],
  secciones: {
    servicios: {
      titulo: "Nuestros Servicios",
      descripcion:
        "Ofrecemos soluciones simples para la gestión de residuos no peligrosos en Temuco y sus alrededores, para constructoras, particulares, empresas y proyectos de toda escala.",
    },
    galeria: {
      titulo: "Galería de Trabajos",
      descripcion:
        "Conoce algunos de los proyectos donde hemos entregado nuestros servicios de arriendo de contenedores y retiro de escombros en Temuco.",
    },
    cotiza: {
      titulo: "Solicita tu Cotización",
      descripcion:
        "Déjanos tus datos y te enviaremos una cotización personalizada por WhatsApp.",
    },
    "como-funciona": {
      titulo: "¿Cómo Funciona?",
      descripcion: "Tres pasos simples para tu retiro de escombros en Temuco.",
    },
    cobertura: {
      titulo: "Cobertura en La Araucanía",
      descripcion: "Cubrimos toda la Región de La Araucanía. Estamos donde nos necesites.",
    },
    certificacion: {
      titulo: "Resolución Sanitaria",
      descripcion: "Trabajamos con todas las garantías legales y ambientales.",
    },
    contacto: {
      titulo: "Contácta con Nosotros",
      descripcion: "Estamos listos para ayudarte. Elige el canal que prefieras.",
    },
  },
  galeria: [
    { file_url: "img/gallery-1.jpg", titulo: "Contenedor en obra" },
    { file_url: "img/gallery-2.jpg", titulo: "Retiro de escombros" },
    { file_url: "img/gallery-3.jpg", titulo: "Residuos no peligrosos" },
    { file_url: "img/gallery-4.jpg", titulo: "Servicio de contenedor" },
    { file_url: "img/gallery-5.jpg", titulo: "Camión contenedor" },
    { file_url: "img/gallery-6.jpg", titulo: "Proyecto en Temuco" },
  ],
  zonas: [
    { titulo: "Temuco", icono: "building", sectores: ["Centro", "Pueblo Nuevo", "Amanecer", "Santa Rosa", "LasQuilas", "Labranza", "ParqueCostanera"] },
    { titulo: "Cautín Norte", icono: "city", sectores: ["PadreLasCasas", "Lautaro", "Vilcún", "Freire","NuevaImperial", "Cholchol"] },
    { titulo: "Cautín Sur", icono: "water", sectores: ["Pitrufquén", "Gorbea", "Loncoche", "Villarrica", "Pucón","Toltén"] },
    { titulo: "Malleco Norte", icono: "tree", sectores: ["Angol", "Collipulli", "Renaico", "Ercilla", "Curacautín", "Lonquimay"] },
    { titulo: "Malleco Sur", icono: "mountain", sectores: ["Victoria", "Traiguén", "Purén", "LosSauces", "Lumaco"] },
  ],
  cta: {
    titulo: "¿No encuentras tu comuna?",
    descripcion: "Escríbenos y te confirmamos si llegamos a tu ubicación",
    boton_texto: "Consultar",
    boton_enlace: "https://wa.me/56986618409",
  },
  contacto: {
    telefono_1: "+56 9 8661 8409",
    telefono_2: "+56 9 8811 5108",
    whatsapp_1: "56986618409",
    whatsapp_2: "56988115108",
    email: "spacerizoma@gmail.com",
  },
  redes: [
    { nombre: "instagram", url: "https://www.instagram.com/rizoma_space_temuco/", icono: "instagram" },
    { nombre: "facebook", url: "https://www.facebook.com/profile.php?id=61576707989615", icono: "facebook" },
    { nombre: "whatsapp_1", url: "https://wa.me/56986618409", icono: "whatsapp" },
    { nombre: "whatsapp_2", url: "https://wa.me/56988115108", icono: "whatsapp" },
  ],
  config: {
    nombre_sitio: "Rizoma Space",
    meta_titulo: "Rizoma Space | Arriendo de Contenedores y Retiro de Escombros - Temuco",
    meta_descripcion:
      "Rizoma Space: arriendo de contenedores para escombros y residuos no peligrosos en Temuco. Retiro autorizado con Resolución Sanitaria.",
    og_titulo: "Rizoma Space | Arriendo de Contenedores y Retiro de Escombros - Temuco",
    og_descripcion: "Arriendo de contenedores para escombros y residuos no peligrosos en Temuco.",
    footer_texto: "Rizoma Space - Retiro profesional de escombros en Temuco.",
    cotizacion_whatsapp: "56986618409",
  },
};

export function assembleSiteData(raw: RawData): SiteData {
  const d = DEFAULT_SITE;

  const hero = (raw.home_hero[0] ?? {}) as Record<string, unknown>;
  const cert = (raw.certificacion[0] ?? {}) as Record<string, unknown>;
  const contacto = (raw.contacto[0] ?? {}) as Record<string, unknown>;
  const config = (raw.config_sitio[0] ?? {}) as Record<string, unknown>;

  const zonas: Zona[] = [];
  let cta: Cta = d.cta;
  for (const z of raw.cobertura_zonas as Record<string, unknown>[]) {
    if (z.tipo === "cta") {
      cta = {
        id: typeof z.id === "number" ? z.id : undefined,
        activo: z.activo === true,
        titulo: fill(s(z.titulo), d.cta.titulo),
        descripcion: fill(s(z.descripcion), d.cta.descripcion),
        boton_texto: fill(s(z.boton_texto), d.cta.boton_texto),
        boton_enlace: fill(s(z.boton_enlace), d.cta.boton_enlace),
      };
    } else {
      zonas.push({
        id: typeof z.id === "number" ? z.id : undefined,
        activo: z.activo === true,
        titulo: fill(s(z.titulo), ""),
        icono: s(z.icono) || undefined,
        sectores: splitSectores(z.sectores),
      });
    }
  }
  if (zonas.length === 0) zonas.push(...d.zonas);

  const stats: Stat[] = raw.estadisticas.map((st) => ({
    id: typeof st.id === "number" ? st.id : undefined,
    activo: st.activo === true,
    icono: s(st.icono) || undefined,
    numero: num(st.numero),
    texto_fijo: s(st.texto_fijo) || null,
    prefijo: s(st.prefijo),
    sufijo: s(st.sufijo),
    etiqueta: fill(s(st.etiqueta), ""),
  }));

  const services: Service[] = raw.servicios.map((sr) => ({
    id: typeof sr.id === "number" ? sr.id : undefined,
    activo: sr.activo === true,
    icono: s(sr.icono) || undefined,
    titulo: fill(s(sr.titulo), ""),
    descripcion: fill(s(sr.descripcion), ""),
  }));

  const pasos: Paso[] = raw.pasos.map((p) => ({
    id: typeof p.id === "number" ? p.id : undefined,
    activo: p.activo === true,
    numero: num(p.numero) ?? 0,
    titulo: fill(s(p.titulo), ""),
    descripcion: fill(s(p.descripcion), ""),
  }));

  const galeria: GalleryItem[] = raw.galeria.map((g) => ({
    id: typeof g.id === "number" ? g.id : undefined,
    activo: g.activo === true,
    file_url: normalizeImg(s(g.file_url)),
    titulo: s(g.titulo),
  }));

  const redes: Red[] = raw.redes
    .map((r) => ({
      id: typeof r.id === "number" ? r.id : undefined,
      activo: r.activo === true,
      nombre: s(r.nombre),
      url: s(r.url),
      icono: s(r.icono) || undefined,
    }))
    .filter((r) => r.nombre && r.url);

  const materiales: MaterialItem[] = raw.materiales
    .filter((m) => m.tipo === "aceptados")
    .map((m) => ({
      id: typeof m.id === "number" ? m.id : undefined,
      activo: m.activo === true,
      texto: s(m.texto),
    }));
  const noMat: MaterialItem[] = raw.materiales
    .filter((m) => m.tipo === "no_aceptados")
    .map((m) => ({
      id: typeof m.id === "number" ? m.id : undefined,
      activo: m.activo === true,
      texto: s(m.texto),
    }));

  const secMap = sectionsToMap(raw.secciones);
  for (const key of Object.keys(d.secciones)) {
    if (!secMap[key]) secMap[key] = { ...d.secciones[key], slug: key };
  }
  for (const key of Object.keys(secMap)) {
    if (!secMap[key]) continue;
    const fb = d.secciones[key];
    secMap[key] = {
      id: secMap[key].id,
      slug: key,
      titulo: fill(s(secMap[key].titulo), fb?.titulo ?? ""),
      descripcion: fill(s(secMap[key].descripcion), fb?.descripcion ?? ""),
    };
  }

  return {
    hero: {
      id: typeof hero.id === "number" ? hero.id : undefined,
      badge_1: fill(s(hero.badge_1), d.hero.badge_1),
      badge_2: fill(s(hero.badge_2), d.hero.badge_2),
      titulo: fill(s(hero.titulo), d.hero.titulo),
      titulo_accento: fill(s(hero.titulo_accento), d.hero.titulo_accento),
      titulo_after: fill(s(hero.titulo_after), d.hero.titulo_after),
      subtitulo: fill(s(hero.subtitulo), d.hero.subtitulo),
      boton_primario_texto: fill(s(hero.boton_primario_texto), d.hero.boton_primario_texto),
      boton_primario_enlace: fill(s(hero.boton_primario_enlace), d.hero.boton_primario_enlace),
      boton_secundario_texto: fill(s(hero.boton_secundario_texto), d.hero.boton_secundario_texto),
      boton_secundario_enlace: fill(s(hero.boton_secundario_enlace), d.hero.boton_secundario_enlace),
      imagen_escritorio: normalizeImg(fill(s(hero.imagen_escritorio), d.hero.imagen_escritorio)),
      imagen_movil: normalizeImg(fill(s(hero.imagen_movil), d.hero.imagen_movil)),
    },
    stats: stats.length ? stats : d.stats,
    services: services.length ? services : d.services,
    aceptados: materiales.length ? materiales : d.aceptados,
    noAceptados: noMat.length ? noMat : d.noAceptados,
    certificacion: {
      id: typeof cert.id === "number" ? cert.id : undefined,
      titulo: fill(s(cert.titulo), d.certificacion.titulo),
      descripcion: fill(s(cert.descripcion), d.certificacion.descripcion),
      tarjeta_titulo: fill(s(cert.tarjeta_titulo), d.certificacion.tarjeta_titulo),
      tarjeta_parrafo: fill(s(cert.tarjeta_parrafo), d.certificacion.tarjeta_parrafo),
      badge_1: fill(s(cert.badge_1), d.certificacion.badge_1),
      badge_2: fill(s(cert.badge_2), d.certificacion.badge_2),
      badge_3: fill(s(cert.badge_3), d.certificacion.badge_3),
      extra_titulo: fill(s(cert.extra_titulo), d.certificacion.extra_titulo),
      extra_parrafo: fill(s(cert.extra_parrafo), d.certificacion.extra_parrafo),
      boton_texto: fill(s(cert.boton_texto), d.certificacion.boton_texto),
      boton_enlace: fill(s(cert.boton_enlace), d.certificacion.boton_enlace),
    },
    pasos: pasos.length ? pasos : d.pasos,
    secciones: secMap,
    galeria: galeria.length ? galeria : d.galeria,
    zonas,
    cta,
    contacto: {
      id: typeof contacto.id === "number" ? contacto.id : undefined,
      telefono_1: fill(s(contacto.telefono_1), d.contacto.telefono_1 ?? ""),
      telefono_2: fill(s(contacto.telefono_2), d.contacto.telefono_2 ?? ""),
      whatsapp_1: fill(s(contacto.whatsapp_1), d.contacto.whatsapp_1 ?? ""),
      whatsapp_2: fill(s(contacto.whatsapp_2), d.contacto.whatsapp_2 ?? ""),
      email: fill(s(contacto.email), d.contacto.email ?? ""),
    },
    redes: redes.length ? redes : d.redes,
    config: {
      id: typeof config.id === "number" ? config.id : undefined,
      nombre_sitio: fill(s(config.nombre_sitio), d.config.nombre_sitio),
      meta_titulo: fill(s(config.meta_titulo), d.config.meta_titulo),
      meta_descripcion: fill(s(config.meta_descripcion), d.config.meta_descripcion),
      og_titulo: fill(s(config.og_titulo), d.config.og_titulo),
      og_descripcion: fill(s(config.og_descripcion), d.config.og_descripcion),
      footer_texto: fill(s(config.footer_texto), d.config.footer_texto),
      cotizacion_whatsapp: fill(s(config.cotizacion_whatsapp), d.config.cotizacion_whatsapp),
    },
  };
}