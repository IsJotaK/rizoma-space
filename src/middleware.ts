import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Protección de rutas /admin (excepto login) + renovación de sesión global
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};