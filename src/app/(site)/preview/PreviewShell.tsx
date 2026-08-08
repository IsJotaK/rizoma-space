"use client";

import { useEffect, useState } from "react";
import SitePage from "@/components/site/SitePage";
import type { SiteData } from "@/lib/site-assembly";

interface Sel {
  table: string;
  id?: number | null;
  slug?: string;
}

export default function PreviewShell({ initial }: { initial: SiteData }) {
  const [data, setData] = useState<SiteData | null>(initial ?? null);
  const [selected, setSelected] = useState<Sel | null>(null);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.type !== "ved-data") return;
      setData(d.data as SiteData);
      setSelected(d.selected ?? null);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  if (!data) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#888",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Cargando vista previa…
      </div>
    );
  }

  return (
    <SitePage
      data={data}
      editMode
      selected={selected}
      onSelect={(sel) => window.parent.postMessage({ type: "ved-select", sel }, "*")}
    />
  );
}