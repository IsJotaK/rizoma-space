import type { Metadata } from "next";
import "./landing.css";

export const metadata: Metadata = {
  title: "Rizoma Space | Arriendo de Contenedores y Retiro de Escombros - Temuco",
  description:
    "Rizoma Space: arriendo de contenedores para escombros y residuos no peligrosos en Temuco. Retiro con Resolución Sanitaria.",
  icons: {
    icon: [
      { url: "/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/img/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/img/favicon-32x32.png",
  },
  metadataBase: new URL("https://rizoma-space.vercel.app"),
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}