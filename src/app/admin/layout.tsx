import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Panel · Rizoma Space",
  description: "Panel de administración de Rizoma Space",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/img/favicon-32x32.png",
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}