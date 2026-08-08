"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SitePage from "@/components/site/SitePage";
import type { SiteData } from "@/lib/site-assembly";

const LANDING_VARS: Record<string, string> = {
  "--green-900": "#0d3b1e",
  "--green-800": "#14532d",
  "--green-700": "#1a6b3c",
  "--green-600": "#228b4a",
  "--green-500": "#2ecc71",
  "--green-400": "#5de08a",
  "--green-300": "#8eedb0",
  "--green-200": "#b8f5ce",
  "--green-100": "#d9fae5",
  "--green-50": "#f0fdf4",
  "--white": "#fff",
  "--dark": "#1a1a2e",
  "--gray-600": "#4a4a5a",
  "--gray-400": "#8888a0",
  "--gray-200": "#e2e2ea",
  "--radius": "12px",
  "--radius-lg": "20px",
  "--sans": "Inter, system-ui, sans-serif",
  "--display": "'Space Grotesk', system-ui, sans-serif",
};

const EDITOR_CSS = `
.editor-sel{outline:2px solid #2ecc71;outline-offset:2px;cursor:pointer;position:relative;box-shadow:0 0 0 6px rgba(46,204,113,.12)}
[data-ed-inactive="true"]{opacity:.5}
[data-ed-inactive="true"]::after{content:"oculto";position:absolute;top:4px;right:4px;background:rgba(0,0,0,.65);color:#fff;font-size:10px;font-weight:600;padding:2px 6px;border-radius:6px;z-index:10;font-family:system-ui,sans-serif}
.site-render.is-edit{cursor:pointer}
.site-render.is-edit a{cursor:pointer}
.site-render.is-edit .navbar,
.site-render.is-edit .navbar.fixed-top{
  position:sticky !important;top:0;left:0;right:0;width:100%;
  border-radius:0 0 12px 12px;
}
`;

export default function SitePreview({
  data,
  selected,
  onSelect,
}: {
  data: SiteData;
  selected: { table: string; id?: number | null; slug?: string } | null;
  onSelect: (sel: { table: string; id?: number | null; slug?: string }) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  const [ready, setReady] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    const host = hostRef.current;
    if (!host) return;
    booted.current = true;

    const shadow = host.attachShadow({ mode: "open" });
    shadowRef.current = shadow;

    for (const [k, v] of Object.entries(LANDING_VARS)) {
      host.style.setProperty(k, v);
    }

    fetch("/api/site-css")
      .then((r) => (r.ok ? r.text() : ""))
      .then((css) => {
        const style = document.createElement("style");
        style.textContent =
          "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');" +
          css +
          EDITOR_CSS;
        shadow.appendChild(style);
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  return (
    <div className="editor-preview" ref={hostRef}>
      {ready && shadowRef.current
        ? createPortal(
            <SitePage data={data} editMode selected={selected} onSelect={onSelect} />,
            shadowRef.current
          )
        : <div className="editor-preview__loading">Cargando vista previa…</div>}
    </div>
  );
}