"use client";

import { useEffect, useRef, useCallback } from "react";
import type { SiteData } from "@/lib/site-assembly";

interface Sel {
  table: string;
  id?: number | null;
  slug?: string;
}

const FRAME_WIDTH = 1280;

export default function SitePreview({
  data,
  selected,
  onSelect,
}: {
  data: SiteData;
  selected: Sel | null;
  onSelect: (sel: Sel) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const dataRef = useRef(data);
  const selRef = useRef(selected);
  dataRef.current = data;
  selRef.current = selected;

  const send = useCallback(() => {
    const w = frameRef.current?.contentWindow;
    if (!w) return;
    w.postMessage({ type: "ved-data", data: dataRef.current, selected: selRef.current }, "*");
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === "ved-ready") send();
      if (e.data && e.data.type === "ved-select") onSelect(e.data.sel);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [send, onSelect]);

  useEffect(() => {
    const t = setTimeout(send, 0);
    return () => clearTimeout(t);
  }, [data, selected, send]);

  return (
    <iframe
      ref={frameRef}
      src="/preview"
      onLoad={send}
      title="Vista previa del sitio"
      className="ved__frame"
      style={{ width: FRAME_WIDTH, height: "100%", border: 0, display: "block", background: "#fff" }}
    />
  );
}