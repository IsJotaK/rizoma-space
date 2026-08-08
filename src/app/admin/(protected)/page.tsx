import { getRowsForTable } from "@/lib/queries";
import Link from "next/link";

const SECTIONS = [
  { href: "/admin/home", label: "Portada (Hero)", icon: "🏠", table: "home_hero" },
  { href: "/admin/estadisticas", label: "Métricas", icon: "📊", table: "estadisticas" },
  { href: "/admin/servicios", label: "Servicios", icon: "🧱", table: "servicios" },
  { href: "/admin/materiales", label: "Residuos que retiramos", icon: "🗑", table: "materiales" },
  { href: "/admin/galeria", label: "Galería", icon: "🖼", table: "galeria" },
  { href: "/admin/certificacion", label: "Certificación", icon: "🛡", table: "certificacion" },
  { href: "/admin/pasos", label: "Cómo Funciona", icon: "👣", table: "pasos" },
  { href: "/admin/cobertura", label: "Cobertura", icon: "📍", table: "cobertura_zonas" },
  { href: "/admin/secciones", label: "Títulos de sección", icon: "🏷", table: "secciones" },
  { href: "/admin/contacto", label: "Contacto", icon: "📞", table: "contacto" },
  { href: "/admin/redes", label: "Redes sociales", icon: "🌐", table: "redes" },
  { href: "/admin/seo", label: "SEO y configuración", icon: "⚙️", table: "config_sitio" },
];

export default async function DashboardPage() {
  const counts: Record<string, number> = {};
  await Promise.all(
    SECTIONS.map(async (s) => {
      const rows = await getRowsForTable(s.table);
      counts[s.table] = rows.length;
    })
  );

  return (
    <>
      <div className="content__head">
        <h1 className="content__title">Dashboard</h1>
        <p className="content__desc">
          Bienvenido al panel de Rizoma Space. Elige una sección para editar su contenido.
        </p>
      </div>

      <div className="card" style={{ background: "linear-gradient(135deg, var(--green-900), var(--green-700))", color: "#fff", border: "none" }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Edita y guarda</div>
        <p style={{ margin: 0, color: "rgba(255,255,255,.8)", fontSize: 14 }}>
          Haz cambios, presiona «Guardar cambios» y la página pública se actualizará al guardar.
        </p>
      </div>

      <div className="grid grid--2">
        <div className="quick" style={{ gridColumn: "1 / -1" }}>
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href}>
              <span className="ic">{s.icon}</span>
              <span className="t">{s.label}</span>
              <span className="stat__label">{counts[s.table] ?? 0} elemento(s)</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}