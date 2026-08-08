import type { Metadata } from "next";
import { getSiteData } from "@/lib/site";
import SitePage from "@/components/site/SitePage";
import { SiteBehaviors } from "./behaviors";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const d = await getSiteData();
    return {
      title: d.config.meta_titulo,
      description: d.config.meta_descripcion,
      openGraph: {
        title: d.config.og_titulo,
        description: d.config.og_descripcion,
        url: "https://rizoma-space.vercel.app/",
        type: "website",
        locale: "es_CL",
        siteName: d.config.nombre_sitio,
      },
      icons: { icon: "/img/favicon-32x32.png" },
    };
  } catch {
    return {};
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const d = await getSiteData();

  return (
    <>
      <SitePage data={d} />
      <SiteBehaviors whatsapp={d.config.cotizacion_whatsapp || d.contacto.whatsapp_1 || "56986618409"} />
    </>
  );
}