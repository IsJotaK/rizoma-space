import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const file = path.join(process.cwd(), "src", "app", "(site)", "landing.css");
  try {
    const css = fs.readFileSync(file, "utf8");
    return new Response(css, {
      headers: { "Content-Type": "text/css; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch {
    return new Response("", { status: 404, headers: { "Content-Type": "text/css" } });
  }
}