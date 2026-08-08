export type Row = Record<string, unknown> & { id?: number };

export const ALLOWED_TABLES = [
  "home_hero",
  "estadisticas",
  "servicios",
  "materiales",
  "galeria",
  "certificacion",
  "pasos",
  "secciones",
  "cobertura_zonas",
  "contacto",
  "redes",
  "config_sitio",
] as const;

export type TableName = (typeof ALLOWED_TABLES)[number];