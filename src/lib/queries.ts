import { createClient } from "@/lib/supabase/server";
import { ALLOWED_TABLES, type Row, type TableName } from "@/lib/types";

function isAllowed(table: string): table is TableName {
  return (ALLOWED_TABLES as readonly string[]).includes(table);
}

export async function getRows(table: string): Promise<Row[]> {
  if (!isAllowed(table)) return [];
  const supabase = await createClient();
  try {
    const { data } = await supabase.from(table).select("*");
    let rows = (data as Row[]) ?? [];
    if (rows.length && rows.some((r) => typeof r.orden === "number")) {
      rows = rows.sort((a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0));
    }
    return rows;
  } catch {
    return [];
  }
}

export async function getRowsForTable(table: string): Promise<Row[]> {
  return getRows(table);
}