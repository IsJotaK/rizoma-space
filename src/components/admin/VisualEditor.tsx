"use client";

import { useMemo, useRef, useState } from "react";
import { assembleSiteData, type RawData } from "@/lib/site-assembly";
import { SECTION_META, ICONS } from "@/lib/section-config";
import { saveRows, deleteRow } from "@/lib/actions";
import SitePreview from "@/components/admin/SitePreview";
import ImageField from "@/components/admin/ImageField";
import type { Row } from "@/lib/types";

const SINGLE: Record<string, boolean> = {
  home_hero: true,
  certificacion: true,
  contacto: true,
  config_sitio: true,
};

const TABLE_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.values(SECTION_META).map((m) => [m.table, m.key])
);

// campo auxiliar (no se guarda en BD) para identificar filas nuevas
const TEMP = "__edKey";

interface FieldSpecLike {
  name: string;
  type: string;
  label?: string;
  hint?: string;
  options?: string[];
}

interface Sel {
  table: string;
  id?: number | null;
  slug?: string;
  _key?: string;
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T;
}

let seq = 0;
function nextTempKey() {
  seq -= 1;
  return `new-${seq}`;
}

function findRow(arr: Row[], sel: Sel): number {
  return arr.findIndex((r) =>
    sel._key !== undefined
      ? r[TEMP] === sel._key
      : sel.slug !== undefined
        ? r.slug === sel.slug
        : r.id === sel.id
  );
}

function fieldValue(row: Row, field: FieldSpecLike) {
  if (field.name === "sectores") {
    const v = row[field.name];
    return Array.isArray(v) ? (v as string[]).join("\n") : String(v ?? "");
  }
  const raw = row[field.name];
  if (raw === null || raw === undefined) return "";
  return String(raw);
}

export default function VisualEditor({ initial }: { initial: RawData }) {
  const baseRef = useRef<Record<string, Row[]>>(clone(initial) as unknown as Record<string, Row[]>);
  const [raw, setRaw] = useState<Record<string, Row[]>>(
    clone(initial) as unknown as Record<string, Row[]>
  );
  const [selected, setSelected] = useState<Sel | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; msg: string } | null>(null);

  const data = useMemo(() => assembleSiteData(raw as unknown as RawData), [raw]);
  const config = selected ? SECTION_META[TABLE_TO_KEY[selected.table]] : undefined;
  const single = selected ? !!SINGLE[selected.table] : false;
  const panelRow: Row | null = useMemo(() => {
    if (!selected) return null;
    const arr = raw[selected.table];
    if (!arr) return null;
    if (SINGLE[selected.table]) return arr[0] ?? {};
    const idx = findRow(arr, selected);
    return idx < 0 ? null : arr[idx];
  }, [selected, raw]);

  function patchField(name: string, type: string, value: unknown) {
    if (!selected) return;
    const table = selected.table;
    setRaw((prev) => {
      const next = { ...prev, [table]: clone(prev[table]) };
      const arr = next[table];
      if (SINGLE[table]) {
        arr[0] = { ...(arr[0] ?? {}), [name]: value };
      } else {
        const idx = findRow(arr, selected);
        if (idx < 0) {
          const seed: Row =
            selected.slug !== undefined
              ? { slug: selected.slug }
              : { [TEMP]: selected._key ?? nextTempKey() };
          arr.push({ ...seed, [name]: value });
        } else {
          arr[idx] = { ...arr[idx], [name]: value };
        }
      }
      return next;
    });
  }

  function addRow() {
    if (!selected) return;
    const table = selected.table;
    const seed: Row = { [TEMP]: nextTempKey(), activo: true };
    if (table === "materiales") seed.tipo = "aceptados";
    if (table === "cobertura_zonas") seed.tipo = "zona";
    setRaw((prev) => ({ ...prev, [table]: [...clone(prev[table]), seed] }));
    setSelected({ table, id: undefined, _key: seed[TEMP] as string });
    setNotice(null);
  }

  async function removeSelected() {
    if (!selected || single) return;
    const table = selected.table;
    const arr = raw[table];
    const idx = findRow(arr, selected);
    if (idx < 0) return;
    const rowId = typeof arr[idx].id === "number" ? (arr[idx].id as number) : undefined;
    if (rowId !== undefined && rowId >= 0) {
      const res = await deleteRow(table, rowId);
      if (!res.ok) {
        setNotice({ ok: false, msg: res.error || "Error al eliminar." });
        return;
      }
    }
    setRaw((prev) => ({
      ...prev,
      [table]: prev[table].filter((_, i) => i !== idx),
    }));
    setSelected(null);
    setNotice(null);
  }

  function dirtyTables() {
    const base = baseRef.current;
    const out: Record<string, boolean> = {};
    for (const t of Object.keys(raw)) {
      const a = raw[t];
      const b = base[t];
      if (JSON.stringify(a) !== JSON.stringify(b ?? [])) out[t] = true;
    }
    return out;
  }

  const dirty = dirtyTables();
  const dirtyCount = Object.keys(dirty).length;

  async function publish() {
    setBusy(true);
    setNotice(null);
    const tables = Object.keys(dirty);
    for (const table of tables) {
      const key = TABLE_TO_KEY[table];
      if (!key) continue;
      const cfg = SECTION_META[key];
      const payload = (raw[table] as Row[]).map((r) => {
        const obj: Record<string, unknown> = {};
        const rid = typeof r.id === "number" && r.id >= 0 ? r.id : undefined;
        if (rid !== undefined) obj.id = rid;
        for (const f of cfg.fields) {
          if (f.type === "switch") {
            obj[f.name] = r[f.name] === true;
            continue;
          }
          if (f.name === "sectores") {
            const v = r[f.name];
            obj[f.name] = (Array.isArray(v) ? v : String(v ?? "").split("\n"))
              .map((x) => String(x).trim())
              .filter(Boolean);
            continue;
          }
          if (f.type === "number") {
            const n = r[f.name];
            obj[f.name] = n === "" || n === null || n === undefined ? null : Number(n) || 0;
            continue;
          }
          const v = r[f.name];
          obj[f.name] = v === undefined || v === null ? "" : String(v);
        }
        return obj as Row;
      });
      const res = await saveRows(table, payload);
      if (!res.ok) {
        setBusy(false);
        setNotice({ ok: false, msg: `${cfg.title}: ${res.error || "error"}` });
        return;
      }
    }
    setBusy(false);
    setNotice({ ok: true, msg: "Cambios publicados correctamente." });
    window.location.reload();
  }

  function discard() {
    setRaw(clone(baseRef.current));
    setSelected(null);
    setNotice(null);
  }

  return (
    <div className="ved">
      <div className="ved__head">
        <div>
          <h1 className="content__title">Editor visual</h1>
          <p className="content__desc">
            Haz clic sobre una sección de la vista previa para editar su contenido. Publica cuando lo desees.
          </p>
        </div>
        <div className="ved__head-actions">
          <span className={`ved__dirty ${dirtyCount ? "is-dirty" : ""}`}>
            {dirtyCount ? `${dirtyCount} bloque(s) sin publicar` : "Sin cambios"}
          </span>
          <button className="btn btn--outline" onClick={discard} disabled={busy || dirtyCount === 0}>
            Descartar
          </button>
          <button className="btn btn--primary" onClick={publish} disabled={busy || dirtyCount === 0}>
            {busy ? <span className="saving"><span className="spinner" /> Publicando…</span> : "Publicar cambios"}
          </button>
        </div>
      </div>

      {notice && (
        <div className={`notice ${notice.ok ? "notice--ok" : "notice--err"}`}>{notice.msg}</div>
      )}

      <div className="ved__body">
        <div className="ved__canvas">
          <SitePreview data={data} selected={selected} onSelect={setSelected} />
        </div>

        <aside className="ved__panel">
          {!config || !panelRow ? (
            <div className="ved__empty">
              <div className="ved__empty-icon">✨</div>
              <p>
                Selecciona un elemento de la vista previa
                <br />
                para editar su contenido.
              </p>
            </div>
          ) : (
            <>
              <div className="ved__panel-title">
                {config.icon} {config.title}
                {selected?.slug ? ` · ${selected.slug}` : ""}
              </div>

              {config.fields
                .filter((f) => !(selected?.slug !== undefined && f.name === "slug"))
                .map((field) => (
                  <div className="ved__field" key={field.name}>
                    {field.type === "image" ? null : (
                      <label className="label">{field.label}</label>
                    )}
                    <FieldView
                      field={field}
                      row={panelRow}
                      onCommit={(v) => patchField(field.name, field.type, v)}
                    />
                    {field.hint && <span className="hint">{field.hint}</span>}
                  </div>
                ))}

              {!single && (
                <div className="ved__row-actions">
                  <button className="btn btn--outline btn--sm" onClick={addRow}>
                    ＋ Agregar elemento
                  </button>
                  <button className="btn btn--danger btn--sm" onClick={removeSelected}>
                    Eliminar
                  </button>
                </div>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function FieldView({
  field,
  row,
  onCommit,
}: {
  field: FieldSpecLike;
  row: Row;
  onCommit: (v: string | boolean) => void;
}) {
  const value = fieldValue(row, field);

  if (field.type === "switch") {
    return (
      <label className="switch-row">
        <input
          type="checkbox"
          checked={row[field.name] === true}
          onChange={(e) => onCommit(e.target.checked)}
        />
        <span className="switcher" />
        <span className="switch-label">{row[field.name] === true ? "Visible" : "Oculto"}</span>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <textarea
        className="textarea"
        value={value}
        onChange={(e) => onCommit(e.target.value)}
      />
    );
  }

  if (field.type === "number") {
    return (
      <input
        className="input"
        type="number"
        value={value}
        onChange={(e) => onCommit(e.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select className="select" value={value} onChange={(e) => onCommit(e.target.value)}>
        {field.options?.map((o) => (
          <option key={o} value={o}>
            {o.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "icon") {
    return (
      <>
        <input
          className="input"
          list="ved-icon-options"
          placeholder="shield-check"
          value={value}
          onChange={(e) => onCommit(e.target.value)}
        />
        <datalist id="ved-icon-options">
          {ICONS.map((i) => (
            <option key={i} value={i} />
          ))}
        </datalist>
      </>
    );
  }

  if (field.type === "image") {
    return (
      <ImageField
        label={field.label || ""}
        value={(row[field.name] as string | undefined) || undefined}
        onChange={(url) => onCommit(url)}
      />
    );
  }

  return (
    <input
      className="input"
      type="text"
      value={value}
      onChange={(e) => onCommit(e.target.value)}
    />
  );
}