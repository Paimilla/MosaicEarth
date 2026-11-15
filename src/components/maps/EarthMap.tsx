"use client";

import React, { useRef, useState, useEffect } from "react";
import { MockSite } from "@/types/planetary";
import { MapPin, Navigation, Eye } from "lucide-react";

interface EarthMapProps {
  sites: MockSite[];
  selectedSite: MockSite | null;
  onSelectSite: (site: MockSite) => void;
  zoom: number;
  showGrid: boolean;
  currentLayer: string;
  onHoverCoords: (coords: { lat: number; lng: number } | null) => void;
}

export function EarthMap({
  sites,
  selectedSite,
  onSelectSite,
  zoom,
  showGrid,
  currentLayer,
  onHoverCoords,
}: EarthMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredSite, setHoveredSite] = useState<MockSite | null>(null);

  // Convert lat/lng (-90 to 90, -180 to 180) to SVG coordinates (width: 1000, height: 500)
  // Equirectangular projection
  const project = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 500;
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

      // Map back to lat/lng based on SVG viewBox (1000x500)
      const svgWidth = rect.width;
      const svgHeight = rect.height;
      const normX = relativeX / svgWidth;
      const normY = relativeY / svgHeight;

      const lng = Math.max(-180, Math.min(180, normX * 360 - 180));
      const lat = Math.max(-90, Math.min(90, 90 - normY * 180));

      onHoverCoords({ lat, lng });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    onHoverCoords(null);
  };

  // Reset pan when zoom changes significantly or on reset
  useEffect(() => {
    if (zoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[520px] sm:h-[580px] bg-space-950 overflow-hidden select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Decorative background grid and stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      {/* Cartographic Header */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-space-950/90 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase shadow-md backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>TERRESTRIAL SURFACE — WGS84 PROJECTION</span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
          SRTM / Sentinel-2 Global Reference Grid
        </span>
      </div>

      {/* Layer Badge */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-space-900/90 border border-space-700 text-slate-300 backdrop-blur-md">
          <Eye className="h-3 w-3 text-cyan-400" />
          <span>Layer: {currentLayer.toUpperCase()}</span>
        </span>
      </div>

      {/* Main Pan/Zoom Canvas */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[90%] drop-shadow-[0_0_35px_rgba(14,165,233,0.15)]"
        >
          <defs>
            {/* Ocean Gradient */}
            <radialGradient id="earthOcean" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0c1e36" />
              <stop offset="100%" stopColor="#06101e" />
            </radialGradient>

            {/* Land pattern for topography layer */}
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={currentLayer === "topo" ? "#1e3a5f" : currentLayer === "thermal" ? "#312e81" : "#13273e"}
              />
              <stop
                offset="100%"
                stopColor={currentLayer === "topo" ? "#0f2338" : currentLayer === "thermal" ? "#1e1b4b" : "#0d1a29"}
              />
            </linearGradient>

            {/* Marker pulse filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ocean Background */}
          <rect x="0" y="0" width="1000" height="500" fill="url(#earthOcean)" rx="6" />

          {/* Graticule Grid Lines */}
          {showGrid && (
            <g className="stroke-cyan-500/20 stroke-[0.8] stroke-dasharray-[2,4]">
              {/* Latitude lines */}
              <line x1="0" y1="83.33" x2="1000" y2="83.33" strokeDasharray="3 3" />
              <line x1="0" y1="166.66" x2="1000" y2="166.66" strokeDasharray="3 3" />
              <line x1="0" y1="250" x2="1000" y2="250" className="stroke-cyan-400/40 stroke-[1.2]" />
              <line x1="0" y1="333.33" x2="1000" y2="333.33" strokeDasharray="3 3" />
              <line x1="0" y1="416.66" x2="1000" y2="416.66" strokeDasharray="3 3" />

              {/* Longitude lines */}
              <line x1="166.66" y1="0" x2="166.66" y2="500" strokeDasharray="3 3" />
              <line x1="333.33" y1="0" x2="333.33" y2="500" strokeDasharray="3 3" />
              <line x1="500" y1="0" x2="500" y2="500" className="stroke-cyan-400/40 stroke-[1.2]" />
              <line x1="666.66" y1="0" x2="666.66" y2="500" strokeDasharray="3 3" />
              <line x1="833.33" y1="0" x2="833.33" y2="500" strokeDasharray="3 3" />

              {/* Equator & Meridian labels */}
              <text x="10" y="246" className="fill-cyan-400/60 font-mono text-[9px]">
                EQUATOR 0°
              </text>
              <text x="505" y="20" className="fill-cyan-400/60 font-mono text-[9px]">
                PRIME MERIDIAN 0°
              </text>
            </g>
          )}

          {/* Continents Vector Geometry (High Quality stylized cartography) */}
          <g className="fill-[url(#landGradient)] stroke-cyan-500/30 stroke-[1.2]">
            {/* North America */}
            <path d="M120,70 L240,65 L270,110 L280,160 L240,180 L220,230 L200,240 L180,210 L150,170 L110,130 Z" />
            {/* Central America & Caribbean */}
            <path d="M200,240 L240,260 L260,280 L230,285 L215,260 Z" />
            {/* South America */}
            <path d="M260,280 L340,310 L350,360 L320,440 L280,470 L260,420 L240,330 Z" />
            {/* Eurasia */}
            <path d="M470,80 L560,70 L720,75 L840,90 L880,150 L840,210 L760,220 L680,180 L620,190 L520,180 L480,120 Z" />
            {/* Europe */}
            <path d="M460,95 L520,90 L530,130 L490,160 L450,140 Z" />
            {/* Africa */}
            <path d="M460,180 L560,180 L590,260 L570,340 L520,400 L470,330 L440,250 Z" />
            {/* Australia */}
            <path d="M780,310 L870,320 L890,380 L840,410 L780,380 Z" />
            {/* Antarctica */}
            <path d="M100,480 L900,480 L880,495 L120,495 Z" />
            {/* Iceland / Arctic islands */}
            <path d="M440,75 L460,70 L455,85 Z" />
            <path d="M520,40 L550,45 L540,60 Z" />
            {/* Japan & East Asia islands */}
            <path d="M860,160 L875,180 L865,200 Z" />
          </g>

          {/* Thermal or rough layer simulation */}
          {currentLayer === "topo" && (
            <g className="fill-none stroke-amber-500/25 stroke-[0.8] stroke-dasharray-[1,3]">
              <circle cx="210" cy="180" r="28" />
              <circle cx="280" cy="410" r="35" />
              <circle cx="450" cy="78" r="14" />
              <circle cx="530" cy="50" r="20" />
            </g>
          )}

          {/* Interactive Demonstration Markers */}
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
                className="cursor-pointer group"
              >
                {/* Ping animation halo */}
                <circle
                  r={isSelected ? 16 : isHovered ? 14 : 10}
                  className={`fill-none transition-all duration-300 ${
                    isSelected
                      ? "stroke-cyan-300 stroke-[2] animate-ping opacity-60"
                      : "stroke-cyan-400 stroke-[1.2] opacity-40 group-hover:opacity-80"
                  }`}
                />

                {/* Outer ring */}
                <circle
                  r={isSelected ? 10 : 7}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "fill-cyan-400/30 stroke-cyan-200 stroke-2"
                      : "fill-space-950 stroke-cyan-400 stroke-[1.5] group-hover:fill-cyan-500/20"
                  }`}
                />

                {/* Inner pin point */}
                <circle
                  r={isSelected ? 4 : 2.5}
                  className={`${
                    isSelected ? "fill-white" : "fill-cyan-300 group-hover:fill-white"
                  }`}
                />

                {/* Marker ID Tag above pin */}
                <g transform="translate(0, -14)">
                  <rect
                    x="-32"
                    y="-12"
                    width="64"
                    height="14"
                    rx="3"
                    className={`transition-colors ${
                      isSelected
                        ? "fill-cyan-900/95 stroke-cyan-300 stroke-1"
                        : "fill-space-950/90 stroke-space-700 stroke-[0.8] group-hover:border-cyan-500"
                    }`}
                  />
                  <text
                    x="0"
                    y="-2"
                    textAnchor="middle"
                    className="font-mono text-[8px] font-bold fill-cyan-200 tracking-wider pointer-events-none"
                  >
                    {site.id}
                  </text>
                </g>

                {/* Hover Quick Card */}
                {isHovered && !isSelected && (
                  <g transform="translate(18, -35)" className="pointer-events-none z-30">
                    <rect
                      x="0"
                      y="0"
                      width="210"
                      height="52"
                      rx="6"
                      className="fill-space-950/95 stroke-cyan-500/60 stroke-1 shadow-2xl backdrop-blur-md"
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
          <span className="flex items-center gap-1 text-cyan-300">
            <Navigation className="h-3 w-3" />
            <span>Reference: WGS84 Geographic Coordinate System (SRTM / Sentinel-2)</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">3 Terrestrial Analog Research Cases</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Drag to pan • Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}
