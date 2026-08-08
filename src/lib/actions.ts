"use server";

import { createClient } from "@/lib/supabase/server";
import { ALLOWED_TABLES, type Row, type TableName } from "@/lib/types";

function isAllowed(table: string): table is TableName {
  return (ALLOWED_TABLES as readonly string[]).includes(table);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function saveRows(table: string, rows: Row[]): Promise<{ ok: boolean; error?: string }> {
  if (!isAllowed(table)) return { ok: false, error: "Tabla no permitida." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  for (const row of rows) {
    const { id, ...payload } = row;
    if (id) {
      const { error } = await supabase.from(table).update(payload).eq("id", id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { error } = await supabase.from(table).insert(payload);
      if (error) return { ok: false, error: error.message };
    }
  }
  return { ok: true };
}

export async function deleteRow(table: string, id: number): Promise<{ ok: boolean; error?: string }> {
  if (!isAllowed(table)) return { ok: false, error: "Tabla no permitida." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "No autorizado." };

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}