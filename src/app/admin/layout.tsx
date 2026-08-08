import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Panel · Rizoma Space",
  description: "Panel de administración de Rizoma Space",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}