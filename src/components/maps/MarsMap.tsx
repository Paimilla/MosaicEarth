"use client";

import React, { useRef, useState, useEffect } from "react";
import { MockSite } from "@/types/planetary";
import { Flame, Eye, Navigation } from "lucide-react";

interface MarsMapProps {
  sites: MockSite[];
  selectedSite: MockSite | null;
  onSelectSite: (site: MockSite) => void;
  zoom: number;
  showGrid: boolean;
  currentLayer: string;
  onHoverCoords: (coords: { lat: number; lng: number } | null) => void;
}

export function MarsMap({
  sites,
  selectedSite,
  onSelectSite,
  zoom,
  showGrid,
  currentLayer,
  onHoverCoords,
}: MarsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredSite, setHoveredSite] = useState<MockSite | null>(null);

  // Safe areographic projection with margins so polar sites (e.g. Olympia Undae at 80.5°N) are never cut off
  const project = (lat: number, lng: number) => {
    const x = 30 + ((lng + 180) / 360) * 940;
    const y = 25 + ((90 - lat) / 180) * 450;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left - pan.x) / zoom;
      const relativeY = (e.clientY - rect.top - pan.y) / zoom;

      const normX = (relativeX - 30) / (rect.width - 60);
      const normY = (relativeY - 25) / (rect.height - 50);

      const lng = Math.max(-180, Math.min(180, normX * 360 - 180));
      const lat = Math.max(-90, Math.min(90, 90 - normY * 180));

      onHoverCoords({ lat, lng });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    setIsDragging(false);
    onHoverCoords(null);
  };

  useEffect(() => {
    if (zoom === 1) setPan({ x: 0, y: 0 });
  }, [zoom]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[540px] sm:h-[620px] bg-[#0c0807] overflow-hidden select-none flex items-center justify-center ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Martian backdrop grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#7c2d12_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Cartographic Header */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-space-950/90 border border-orange-500/40 text-orange-300 font-mono text-[10px] uppercase shadow-md backdrop-blur-md">
          <Flame className="h-3 w-3 text-orange-400" />
          <span>MARTIAN SURFACE — AREOGRAPHIC PROJECTION</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
          NASA MOLA / HiRISE / CRISM Reference Grid
        </span>
      </div>

      {/* Layer Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-space-900/90 border border-space-700 text-slate-300 backdrop-blur-md">
          <Eye className="h-3 w-3 text-orange-400" />
          <span>Layer: {currentLayer.toUpperCase()}</span>
        </span>
      </div>

      {/* Main Pan/Zoom Canvas */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out p-2"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-w-full drop-shadow-[0_0_35px_rgba(249,115,22,0.18)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="marsSurface" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="50%" stopColor="#2c1006" />
              <stop offset="100%" stopColor="#170803" />
            </radialGradient>

            <radialGradient id="olympusMonsGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="60%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1f0904" />
            </radialGradient>

            <linearGradient id="vallesMarineris" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#170803" />
              <stop offset="50%" stopColor="#0c0402" />
              <stop offset="100%" stopColor="#170803" />
            </linearGradient>

            <radialGradient id="polarCap" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </radialGradient>
          </defs>

          {/* Martian Surface Base */}
          <rect x="0" y="0" width="1000" height="500" fill="url(#marsSurface)" rx="8" />

          {/* Graticule Grid Lines */}
          {showGrid && (
            <g className="stroke-orange-500/20 stroke-[0.8]">
              <line x1="0" y1="83.33" x2="1000" y2="83.33" strokeDasharray="3 3" />
              <line x1="0" y1="166.66" x2="1000" y2="166.66" strokeDasharray="3 3" />
              <line x1="0" y1="250" x2="1000" y2="250" className="stroke-orange-400/50 stroke-[1.2]" />
              <line x1="0" y1="333.33" x2="1000" y2="333.33" strokeDasharray="3 3" />
              <line x1="0" y1="416.66" x2="1000" y2="416.66" strokeDasharray="3 3" />

              <line x1="166.66" y1="0" x2="166.66" y2="500" strokeDasharray="3 3" />
              <line x1="333.33" y1="0" x2="333.33" y2="500" strokeDasharray="3 3" />
              <line x1="500" y1="0" x2="500" y2="500" className="stroke-orange-400/50 stroke-[1.2]" />
              <line x1="666.66" y1="0" x2="666.66" y2="500" strokeDasharray="3 3" />
              <line x1="833.33" y1="0" x2="833.33" y2="500" strokeDasharray="3 3" />

              <text x="12" y="246" className="fill-orange-400/70 font-mono text-[9px]">
                MARTIAN EQUATOR 0°
              </text>
              <text x="506" y="20" className="fill-orange-400/70 font-mono text-[9px]">
                PRIME MERIDIAN (AIRY-0)
              </text>
              <text x="12" y="482" className="fill-orange-400/70 font-mono text-[9px]">
                SOUTH POLE (-90°)
              </text>
            </g>
          )}

          {/* North Polar Ice Cap (Planum Boreum) & Gypsum Erg */}
          <ellipse cx="500" cy="30" rx="95" ry="18" fill="url(#polarCap)" opacity="0.85" />
          <path
            d="M410,48 Q500,60 590,48 Q550,68 450,68 Z"
            className="fill-amber-900/40 stroke-amber-500/50 stroke-[0.8]"
          />

          {/* Valles Marineris Canyon System */}
          <path
            d="M260,265 C320,260 380,285 450,280"
            className="stroke-[url(#vallesMarineris)] stroke-[6] fill-none stroke-linecap-round filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          />
          <path
            d="M270,265 C330,262 385,283 445,280"
            className="stroke-amber-900/60 stroke-[2] fill-none"
          />

          {/* Major Volcanic Complexes (Tharsis & Olympus Mons) */}
          <g>
            <circle cx="210" cy="205" r="28" fill="url(#olympusMonsGrad)" className="stroke-orange-600/40 stroke-1" />
            <circle cx="210" cy="205" r="8" className="fill-[#1f0904] stroke-orange-500/50 stroke-[0.8]" />

            <circle cx="250" cy="210" r="14" fill="#381405" className="stroke-orange-700/50 stroke-1" />
            <circle cx="270" cy="240" r="15" fill="#381405" className="stroke-orange-700/50 stroke-1" />
            <circle cx="290" cy="270" r="14" fill="#381405" className="stroke-orange-700/50 stroke-1" />
          </g>

          {/* Impact Basins (Hellas & Isidis Planitia) */}
          <ellipse cx="690" cy="370" rx="65" ry="50" className="fill-[#1c0802] stroke-orange-700/40 stroke-1" />
          <ellipse cx="710" cy="215" rx="35" ry="28" className="fill-[#1f0a03] stroke-orange-800/40 stroke-1" />

          {/* Major Landmark Annotations */}
          <text x="180" y="170" className="fill-orange-400/90 font-mono text-[8px] pointer-events-none">
            Olympus Mons
          </text>
          <text x="320" y="252" className="fill-orange-400/90 font-mono text-[8px] pointer-events-none">
            Valles Marineris
          </text>
          <text x="660" y="375" className="fill-orange-500/80 font-mono text-[8px] pointer-events-none">
            Hellas Basin
          </text>
          <text x="690" y="180" className="fill-cyan-300 font-mono text-[8px] pointer-events-none font-semibold">
            Jezero Crater (Western Delta)
          </text>
          <text x="440" y="78" className="fill-amber-300 font-mono text-[8px] pointer-events-none font-semibold">
            Olympia Undae Gypsum Erg
          </text>

          {/* Interactive Target Markers */}
          {sites.map((site) => {
            const pos = project(site.coordinates.lat, site.coordinates.lng);
            const isSelected = selectedSite?.id === site.id;
            const isHovered = hoveredSite?.id === site.id;

            return (
              <g
                key={site.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSite(site);
                }}
                onMouseEnter={() => setHoveredSite(site)}
                onMouseLeave={() => setHoveredSite(null)}
                className="cursor-pointer"
              >
                {/* Pulse halo on selected */}
                {isSelected && (
                  <circle
                    r="24"
                    className="fill-orange-400/20 stroke-orange-400/60 stroke-1 animate-ping"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r={isSelected ? "14" : "10"}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-space-950 stroke-orange-400 stroke-2"
                      : "fill-black/80 stroke-orange-500/80 stroke-1.5 hover:stroke-orange-300"
                  }`}
                />

                {/* Center Core */}
                <circle
                  r={isSelected ? "6" : "4"}
                  className={isSelected ? "fill-orange-300" : "fill-white"}
                />

                {/* Tooltip Card on Hover */}
                {(isHovered || isSelected) && (
                  <g transform="translate(18, -35)" className="pointer-events-none z-30">
                    <rect
                      x="0"
                      y="0"
                      width="210"
                      height="52"
                      rx="6"
                      className="fill-black/95 stroke-orange-500/80 stroke-1 shadow-2xl backdrop-blur-md"
                    />
                    <text x="8" y="16" className="font-mono text-[9px] font-bold fill-white">
                      {site.name.slice(0, 28)}
                    </text>
                    <text x="8" y="30" className="font-mono text-[8px] fill-slate-300">
                      Coord: {site.coordinates.formatted}
                    </text>
                    <text x="8" y="44" className="font-mono text-[8px] fill-orange-400">
                      Click to inspect full telemetry
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Coordinate & Projection Legend bar */}
      <div className="absolute bottom-2 left-3 right-3 z-20 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 bg-space-950/90 px-3 py-1.5 rounded-lg border border-space-800 pointer-events-none backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-orange-300">
            <Navigation className="h-3 w-3" />
            <span>Reference: Areographic Coordinate System (MOLA / HiRISE)</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">2 Martian Analog Target Sites</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Drag to pan • Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
