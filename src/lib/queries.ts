import { createClient } from "@/lib/supabase/server";
import { ALLOWED_TABLES, type Row, type TableName } from "@/lib/types";

function isAllowed(table: string): table is TableName {
  return (ALLOWED_TABLES as readonly string[]).includes(table);
}

export async function getRows(table: string): Promise<Row[]> {
  if (!isAllowed(table)) return [];
  const supabase = await createClient();
  const { data } = await supabase.from(table).select("*").order("orden", { ascending: true });
  return (data as Row[]) ?? [];
}

export async function getRowsForTable(table: string): Promise<Row[]> {
  return getRows(table);
}