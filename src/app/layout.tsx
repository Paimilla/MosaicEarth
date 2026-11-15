import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOSAIC: Mission-Oriented Search for Analog Environments on Earth",
  description:
    "Planetary analog evaluation platform for NASA Space Apps Challenge 2026. Characterizing and comparing terrestrial planetary analogs for candidate lunar bases and Martian exploration sites using open scientific datasets from NASA PDS, ESA Copernicus, Zenodo, and AMRDC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-space-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
