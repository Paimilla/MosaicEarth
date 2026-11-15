"use client";

import React, { useRef, useState, useEffect } from "react";
import { MockSite } from "@/types/planetary";
import { Moon, Eye, Navigation } from "lucide-react";

interface MoonMapProps {
  sites: MockSite[];
  selectedSite: MockSite | null;
  onSelectSite: (site: MockSite) => void;
  zoom: number;
  showGrid: boolean;
  currentLayer: string;
  onHoverCoords: (coords: { lat: number; lng: number } | null) => void;
}

export function MoonMap({
  sites,
  selectedSite,
  onSelectSite,
  zoom,
  showGrid,
  currentLayer,
  onHoverCoords,
}: MoonMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredSite, setHoveredSite] = useState<MockSite | null>(null);

  // Safe selenographic projection with margins so polar sites (e.g. Shackleton at -89.54°) are never cut off
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
      className={`relative w-full h-[540px] sm:h-[620px] bg-[#07090e] overflow-hidden select-none flex items-center justify-center ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Lunar backdrop grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Cartographic Header */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-space-950/90 border border-slate-400/40 text-slate-200 font-mono text-[10px] uppercase shadow-md backdrop-blur-md">
          <Moon className="h-3 w-3 text-slate-300" />
          <span>LUNAR SURFACE — SELENOGRAPHIC PROJECTION</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
          NASA LRO (LOLA / LROC / Diviner) Reference Grid
        </span>
      </div>

      {/* Layer Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-space-900/90 border border-space-700 text-slate-300 backdrop-blur-md">
          <Eye className="h-3 w-3 text-slate-300" />
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
          className="w-full h-full max-w-full drop-shadow-[0_0_35px_rgba(203,213,225,0.12)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Lunar Regolith Background */}
            <radialGradient id="moonRegolith" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#252c38" />
              <stop offset="60%" stopColor="#1a202c" />
              <stop offset="100%" stopColor="#0f141d" />
            </radialGradient>

            {/* Maria fill */}
            <radialGradient id="mariaFill" cx="40%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#111620" />
              <stop offset="100%" stopColor="#0a0e14" />
            </radialGradient>
          </defs>

          {/* Lunar Surface Base */}
          <rect x="0" y="0" width="1000" height="500" fill="url(#moonRegolith)" rx="8" />

          {/* Graticule Grid Lines */}
          {showGrid && (
            <g className="stroke-slate-500/25 stroke-[0.8]">
              <line x1="0" y1="83.33" x2="1000" y2="83.33" strokeDasharray="3 3" />
              <line x1="0" y1="166.66" x2="1000" y2="166.66" strokeDasharray="3 3" />
              <line x1="0" y1="250" x2="1000" y2="250" className="stroke-slate-400/50 stroke-[1.2]" />
              <line x1="0" y1="333.33" x2="1000" y2="333.33" strokeDasharray="3 3" />
              <line x1="0" y1="416.66" x2="1000" y2="416.66" strokeDasharray="3 3" />

              <line x1="166.66" y1="0" x2="166.66" y2="500" strokeDasharray="3 3" />
              <line x1="333.33" y1="0" x2="333.33" y2="500" strokeDasharray="3 3" />
              <line x1="500" y1="0" x2="500" y2="500" className="stroke-slate-400/50 stroke-[1.2]" />
              <line x1="666.66" y1="0" x2="666.66" y2="500" strokeDasharray="3 3" />
              <line x1="833.33" y1="0" x2="833.33" y2="500" strokeDasharray="3 3" />

              <text x="12" y="246" className="fill-slate-400/70 font-mono text-[9px]">
                LUNAR EQUATOR 0°
              </text>
              <text x="506" y="20" className="fill-slate-400/70 font-mono text-[9px]">
                PRIME MERIDIAN 0°
              </text>
              <text x="12" y="482" className="fill-slate-400/70 font-mono text-[9px]">
                LUNAR SOUTH POLE (-90°)
              </text>
            </g>
          )}

          {/* Lunar Maria (Dark basaltic plains: Oceanus Procellarum, Mare Imbrium, Serenitatis, Tranquillitatis) */}
          <g className="fill-[url(#mariaFill)] stroke-slate-600/40 stroke-[0.8]">
            <path d="M380,140 Q440,120 460,180 Q480,240 430,280 Q370,290 350,220 Z" />
            <path d="M430,120 Q500,110 520,160 Q490,200 440,190 Z" />
            <path d="M530,150 Q580,140 600,180 Q590,240 540,240 Q520,200 530,150 Z" />
            <ellipse cx="660" cy="190" rx="35" ry="25" />
            <path d="M450,420 Q500,400 560,420 Q580,470 500,480 Q440,470 450,420 Z" className="stroke-slate-500/50 stroke-dasharray-[2,2]" />
          </g>

          {/* Major Impact Craters */}
          <g className="fill-none stroke-slate-400/50 stroke-[1]">
            <circle cx="470" cy="370" r="14" />
            <line x1="470" y1="350" x2="450" y2="290" strokeDasharray="2 4" className="stroke-slate-400/30" />
            <line x1="480" y1="365" x2="560" y2="340" strokeDasharray="2 4" className="stroke-slate-400/30" />
            <line x1="465" y1="380" x2="410" y2="440" strokeDasharray="2 4" className="stroke-slate-400/30" />

            <circle cx="445" cy="225" r="12" />
            <circle cx="395" cy="228" r="7" />
            <circle cx="370" cy="180" r="8" className="stroke-slate-200" />
            <ellipse cx="475" cy="110" rx="14" ry="7" className="fill-slate-900/60" />
            <circle cx="500" cy="470" r="12" className="stroke-cyan-400/70 stroke-dasharray-[2,2]" />
          </g>

          {/* Craters & Terrain annotations */}
          <text x="590" y="210" className="fill-slate-400 font-mono text-[8px] pointer-events-none">
            Mare Tranquillitatis
          </text>
          <text x="440" y="145" className="fill-slate-400 font-mono text-[8px] pointer-events-none">
            Mare Imbrium
          </text>
          <text x="360" y="195" className="fill-slate-400 font-mono text-[8px] pointer-events-none">
            Oceanus Procellarum
          </text>
          <text x="450" y="460" className="fill-cyan-300 font-mono text-[8px] pointer-events-none font-semibold">
            South Pole — Shackleton Basin
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
                    className="fill-cyan-400/20 stroke-cyan-400/60 stroke-1 animate-ping"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r={isSelected ? "14" : "10"}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-slate-900 stroke-cyan-400 stroke-2"
                      : "fill-slate-950/80 stroke-slate-300/80 stroke-1.5 hover:stroke-cyan-300"
                  }`}
                />

                {/* Center Core */}
                <circle
                  r={isSelected ? "6" : "4"}
                  className={isSelected ? "fill-cyan-300" : "fill-white"}
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
                      className="fill-black/95 stroke-slate-400/80 stroke-1 shadow-2xl backdrop-blur-md"
                    />
                    <text x="8" y="16" className="font-mono text-[9px] font-bold fill-white">
                      {site.name.slice(0, 28)}
                    </text>
                    <text x="8" y="30" className="font-mono text-[8px] fill-slate-300">
                      Coord: {site.coordinates.formatted}
                    </text>
                    <text x="8" y="44" className="font-mono text-[8px] fill-cyan-400">
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
          <span className="flex items-center gap-1 text-slate-300">
            <Navigation className="h-3 w-3" />
            <span>Reference: Selenographic Coordinate System (LOLA / LROC)</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">2 Lunar Analog Target Sites</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Drag to pan • Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
