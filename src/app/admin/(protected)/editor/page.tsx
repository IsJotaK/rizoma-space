import { getRows } from "@/lib/queries";
import type { RawData } from "@/lib/site-assembly";
import VisualEditor from "@/components/admin/VisualEditor";

export const dynamic = "force-dynamic";

export default async function EditorPage() {
  const [home_hero, estadisticas, servicios, materiales, certificacion, pasos, galeria, secciones, cobertura_zonas, contacto, redes, config_sitio] =
    await Promise.all([
      getRows("home_hero"),
      getRows("estadisticas"),
      getRows("servicios"),
      getRows("materiales"),
      getRows("certificacion"),
      getRows("pasos"),
      getRows("galeria"),
      getRows("secciones"),
      getRows("cobertura_zonas"),
      getRows("contacto"),
      getRows("redes"),
      getRows("config_sitio"),
    ]);

  const initial: RawData = {
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

  return (
    <>
      <VisualEditor initial={initial} />
    </>
  );
}