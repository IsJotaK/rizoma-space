"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ImageField({
  value,
  onChange,
  label,
}: {
  value: string | undefined | null;
  onChange: (url: string) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const src = value
    ? /^(https?:)?\/\//.test(value) || value.startsWith("data:")
      ? value
      : `/${value.replace(/^\//, "")}`
    : undefined;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("La imagen supera el tamaño máximo (4 MB).");
      return;
    }

    setBusy(true);
    setError(null);
    const supabase = createClient();
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: upError } = await supabase.storage
      .from("images")
      .upload(fileName, file, { upsert: false });

    if (upError) {
      setError("No se pudo subir la imagen. Intenta de nuevo.");
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          type="button"
          className="btn btn--outline btn--sm"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          style={{ alignSelf: "flex-start" }}
        >
          {busy ? "Subiendo…" : value ? "Cambiar imagen" : "Subir imagen"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        {value ? (
          <div className="previews">
            <div className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </div>
          </div>
        ) : (
          <span className="hint">No hay imagen cargada.</span>
        )}
        {error && <span style={{ color: "var(--danger)", fontSize: 13 }}>{error}</span>}
      </div>
    </div>
  );
}