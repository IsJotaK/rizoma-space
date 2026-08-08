"use client";

import { useState } from "react";
import { saveRows, deleteRow } from "@/lib/actions";
import { ICONS, type SectionConfig, type FieldSpec } from "@/lib/section-config";
import ImageField from "@/components/admin/ImageField";
import type { Row } from "@/lib/types";

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  return [];
}

function toFormValue(field: FieldSpec, row: Row) {
  const v = row[field.name];
  if (field.name === "sectores") return normalizeArray(v).join("\n");
  if (v === null || v === undefined) return "";
  return String(v);
}

function buildPayload(field: FieldSpec, rawValue: string, extra: Row) {
  switch (field.type) {
    case "number":
      return rawValue === "" ? null : Number(rawValue) || 0;
    case "switch":
      return extra[field.name] === true;
    case "image":
      return extra[field.name] || null;
    default: {
      if (field.name === "sectores") {
        return rawValue.split("\n").map((s) => s.trim()).filter(Boolean);
      }
      return rawValue;
    }
  }
}

export default function EditorForm({
  section,
  initialRows,
}: {
  section: SectionConfig;
  initialRows: Row[];
}) {
  const [rows, setRows] = useState<Row[]>(initialRows.length ? initialRows : [{}]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; msg: string } | null>(null);

  function addRow() {
    setRows((prev) => [...prev, {}]);
  }

  async function removeRow(rowIndex: number) {
    const row = rows[rowIndex];
    if (row.id !== undefined) {
      const res = await deleteRow(section.table, Number(row.id));
      if (!res.ok) {
        setNotice({ ok: false, msg: res.error || "Error al eliminar." });
        return;
      }
    }
    setRows((prev) => prev.filter((_, i) => i !== rowIndex));
    setNotice(null);
  }

  async function handleSave() {
    setBusy(true);
    setNotice(null);

    const payload = rows.map((row) => {
      const id = row.id !== undefined ? Number(row.id) : undefined;
      const obj: Record<string, unknown> = {} as Record<string, unknown>;
      if (id !== undefined) (obj as Row).id = id;
      section.fields.forEach((field) => {
        if (field.type === "switch") return;
        const value = toFormValue(field, row);
        (obj as Row)[field.name] = buildPayload(field, value, row);
      });
      section.fields.forEach((field) => {
        if (field.type !== "switch") return;
        (obj as Row)[field.name] = (row as Row)[field.name] === true;
      });
      return obj;
    });

    const res = await saveRows(section.table, payload as Row[]);
    setBusy(false);
    if (res.ok) {
      setNotice({ ok: true, msg: "Los cambios se guardaron correctamente." });
    } else {
      setNotice({ ok: false, msg: res.error || "Ocurrió un error al guardar." });
    }
  }

  function renderField(field: FieldSpec, row: Row, rowIndex: number) {
    const value = toFormValue(field, row);

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            className="textarea"
            value={value as string}
            onChange={(e) =>
              setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: e.target.value } : r)))
            }
          />
        );
      case "number":
        return (
          <input
            className="input"
            type="number"
            value={value as string}
            onChange={(e) =>
              setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: e.target.value } : r)))
            }
          />
        );
      case "select":
        return (
          <select
            className="select"
            value={value as string}
            onChange={(e) =>
              setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: e.target.value } : r)))
            }
          >
            {field.options?.map((o) => (
              <option key={o} value={o}>{o.replace(/_/g, " ")}</option>
            ))}
          </select>
        );
      case "icon":
        return (
          <>
            <input
              className="input"
              list="icon-options"
              placeholder="shield-check"
              value={value as string}
              onChange={(e) =>
                setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: e.target.value } : r)))
              }
            />
            <datalist id="icon-options">
              {ICONS.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </>
        );
      case "image":
        return (
          <ImageField
            label={field.label}
            value={(row as Row)[field.name] as string | undefined}
            onChange={(url) =>
              setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: url } : r)))
            }
          />
        );
      default:
        return (
          <input
            className="input"
            type="text"
            value={value as string}
            onChange={(e) =>
              setRows((prev) => prev.map((r, i) => (i === rowIndex ? { ...r, [field.name]: e.target.value } : r)))
            }
          />
        );
    }
  }

  return (
    <div>
      {notice && (
        <div className={`notice ${notice.ok ? "notice--ok" : "notice--err"}`}>
          {notice.msg}
        </div>
      )}

      <div className="rows">
        {rows.map((row, idx) => (
          <div className="row-item" key={idx}>
            <div className="row-item__head">
              <div className="row-item__title">
                {section.single
                  ? section.title
                  : `Elemento ${idx + 1}`}
              </div>
              <div className="row-item__tools">
                {!section.single && (
                  <button className="btn btn--danger btn--sm" type="button" onClick={() => removeRow(idx)}>
                    Eliminar
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid--2">
              {section.fields.map((field) => (
                <div key={field.name} style={{ gridColumn: field.type === "textarea" || field.type === "image" ? "1 / -1" : undefined }}>
                  {field.type === "image" ? null : <label className="label">{field.label}</label>}
                  {renderField(field, row, idx)}
                  {field.hint && <span className="hint">{field.hint}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="btn-group" style={{ marginTop: 20 }}>
        <button className="btn btn--primary" onClick={handleSave} disabled={busy}>
          {busy ? <span className="saving"><span className="spinner" /> Guardando…</span> : "Guardar cambios"}
        </button>
        {!section.single && (
          <button className="btn btn--outline" onClick={addRow} disabled={busy}>
            ＋ Agregar {section.title.toLowerCase() === "galeria" ? "imagen" : "elemento"}
          </button>
        )}
      </div>
    </div>
  );
}