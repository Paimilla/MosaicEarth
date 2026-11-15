"use client";

import React, { useState } from "react";
import { Compass, Layers, ArrowRightLeft, Cpu, Menu, X } from "lucide-react";

interface HeaderProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ currentSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "maps", label: "Map Viewer", icon: Layers },
    { id: "comparison", label: "Explore Comparison", icon: ArrowRightLeft },
    { id: "methodology", label: "Methodology & APIs", icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-space-800 bg-space-950/90 backdrop-blur-md">
      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-amber-500/20 border border-cyan-500/40 text-cyan-300 group-hover:border-cyan-400 transition-colors shadow-inner">
                <Compass className="h-4 w-4 text-cyan-300 group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-extrabold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                    MOSAIC
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block -mt-1 hidden sm:block">
                  Mission-Oriented Search for Analog Environments on Earth
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-space-900/80 p-1 rounded-xl border border-space-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${isActive
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-space-850"
                    }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-space-900 border border-space-800 text-slate-300"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-space-800 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono text-slate-200 hover:bg-space-900 rounded-lg text-left"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
