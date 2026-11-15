"use client";

import React from "react";
import { Compass, Sparkles, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onMethodologyClick: () => void;
}

export function HeroSection({ onExploreClick, onMethodologyClick }: HeroSectionProps) {
  return (
    <section id="home" className="relative pt-8 pb-10 md:pt-12 md:pb-14 border-b border-space-850 bg-gradient-to-b from-space-950 via-space-900/50 to-space-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-900 border border-space-800 text-xs font-mono text-cyan-300 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Built for NASA Space Apps Challenge 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
          MOSAIC
          <span className="block text-xl sm:text-2xl md:text-3xl font-mono font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-orange-400 mt-1">
            Mission-Oriented Search for Analog Environments on Earth
          </span>
        </h1>

        {/* Concise description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A visual platform for exploring and comparing terrestrial locations that serve as analogs for future permanent bases on the <strong className="text-slate-100">Moon</strong> and missions to <strong className="text-orange-300">Mars</strong>.
        </p>

        {/* Compact CTA */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-space-950 font-mono font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-600/20"
          >
            <Compass className="h-4 w-4" />
            <span>Open Map Viewer</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onMethodologyClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-space-900 hover:bg-space-850 border border-space-800 text-slate-300 font-mono text-xs sm:text-sm transition-colors"
          >
            <span>View Roadmap & APIs</span>
          </button>
        </div>
      </div>
    </section>
  );
}
