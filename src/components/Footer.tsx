"use client";

import React from "react";
import { Compass, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-space-950 border-t border-space-850 text-slate-400 text-xs font-mono py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-space-850">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-mono text-base font-extrabold tracking-wider text-white">
                MOSAIC
              </span>
            </div>
            <p className="text-slate-400 text-xs font-sans">
              Planetary analog platform for NASA Space Apps Challenge 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a href="#home" className="hover:text-cyan-300 transition-colors">
              Home
            </a>
            <span className="text-slate-700">•</span>
            <a href="#maps" className="hover:text-cyan-300 transition-colors">
              Maps (Earth / Moon / Mars)
            </a>
            <span className="text-slate-700">•</span>
            <a href="#comparison" className="hover:text-cyan-300 transition-colors">
              Explore Comparison
            </a>
            <span className="text-slate-700">•</span>
            <a href="#methodology" className="hover:text-cyan-300 transition-colors">
              Methodology
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span>
              Built with scientific data from NASA PDS, ESA Copernicus, Zenodo, and AMRDC. Not an official NASA recommendation.
            </span>
          </div>
          <div>
            Built with Next.js, React, TypeScript, and Tailwind CSS.
          </div>
        </div>
      </div>
    </footer>
  );
}
