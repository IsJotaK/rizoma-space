import { createPublicClient } from "@/lib/supabase/public-client";
import { assembleSiteData, type RawData } from "@/lib/site-assembly";
import type { Row } from "@/lib/types";

// Re-exports para mantener compatibilidad con imports existentes
export * from "@/lib/site-assembly";

function lift<T = Row>(b: unknown): Promise<{ data: T[] | null }> {
  return b as Promise<{ data: T[] | null }>;
}

async function get<T = Row>(fetch: () => Promise<{ data: T[] | null }>): Promise<T[]> {
  try {
    const { data } = await fetch();
    return (data as T[]) ?? [];
  } catch {
    return [];
  }
}

export async function getSiteData(): Promise<ReturnType<typeof assembleSiteData>> {
  const supabase = createPublicClient();

  const [home_hero, estadisticas, servicios, materiales, certificacion, pasos, galeria, secciones, cobertura_zonas, contacto, redes, config_sitio] =
    await Promise.all([
      get(() => lift(supabase.from("home_hero").select("*").limit(1))),
      get(() => lift(supabase.from("estadisticas").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("servicios").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("materiales").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("certificacion").select("*").limit(1))),
      get(() => lift(supabase.from("pasos").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("galeria").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("secciones").select("*"))),
      get(() => lift(supabase.from("cobertura_zonas").select("*").eq("activo", true).order("orden"))),
      get(() => lift(supabase.from("contacto").select("*").limit(1))),
      get(() => lift(supabase.from("redes").select("*").eq("activo", true))),
      get(() => lift(supabase.from("config_sitio").select("*").limit(1))),
    ]);

  const raw: RawData = {
    home_hero,
    estadisticas,
    servicios,
    materiales,
    certificacion,
    pasos,
    galeria,
    secciones,
    cobertura_zonas,
    contacto,
    redes,
    config_sitio,
  };

  return assembleSiteData(raw);
}