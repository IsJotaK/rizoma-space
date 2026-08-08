"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/actions";

const NAV = [
  { href: "/admin", key: "home", label: "Dashboard", icon: "🏠", exact: true },
];

const SECTIONS = [
  { href: "/admin/home", key: "home", label: "Portada (Hero)", icon: "🏠" },
  { href: "/admin/estadisticas", key: "estadisticas", label: "Métricas", icon: "📊" },
  { href: "/admin/servicios", key: "servicios", label: "Servicios", icon: "🧱" },
  { href: "/admin/materiales", key: "materiales", label: "Residuos que retiramos", icon: "🗑" },
  { href: "/admin/galeria", key: "galeria", label: "Galería", icon: "🖼" },
  { href: "/admin/certificacion", key: "certificacion", label: "Certificación", icon: "🛡" },
  { href: "/admin/pasos", key: "pasos", label: "Cómo Funciona", icon: "👣" },
  { href: "/admin/cobertura", key: "cobertura", label: "Cobertura", icon: "📍" },
  { href: "/admin/secciones", key: "secciones", label: "Títulos de sección", icon: "🏷" },
  { href: "/admin/contacto", key: "contacto", label: "Contacto", icon: "📞" },
  { href: "/admin/redes", key: "redes", label: "Redes sociales", icon: "🌐" },
  { href: "/admin/seo", key: "seo", label: "SEO y configuración", icon: "⚙️" },
];

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="sidebar__brand">
          <img className="sidebar__logo" src="/img/logo.webp" alt="Rizoma Space" width="38" height="38" />
          <span className="sidebar__brand-text">Rizoma Space</span>
        </div>
        <button className="sidebar-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          ☰
        </button>
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__label">Panel</span>
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={`sidebar__link ${active ? "sidebar__link--active" : ""}`} onClick={() => setOpen(false)}>
              <span className="ic">{item.icon}</span> {item.label}
            </Link>
          );
        })}

        <span className="sidebar__label">Contenido</span>
        {SECTIONS.slice(1).map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`sidebar__link ${active ? "sidebar__link--active" : ""}`} onClick={() => setOpen(false)}>
              <span className="ic">{item.icon}</span> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__foot">
        <div className="sidebar__user">{userEmail}</div>
        <button className="sidebar__logout-btn" onClick={logout} disabled={busy}>
          {busy ? "Cerrando…" : "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}