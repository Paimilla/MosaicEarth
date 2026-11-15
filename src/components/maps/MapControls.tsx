"use client";

import React from "react";
import { Plus, Minus, RotateCcw, Grid, Layers, Eye, Maximize2, Minimize2 } from "lucide-react";

interface MapControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  currentLayer: string;
  onChangeLayer: (layer: string) => void;
  availableLayers: { id: string; label: string; badge: string }[];
  hoverCoords: { lat: number; lng: number } | null;
  bodyLabel: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function MapControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  showGrid,
  onToggleGrid,
  currentLayer,
  onChangeLayer,
  availableLayers,
  hoverCoords,
  bodyLabel,
  isExpanded,
  onToggleExpand,
}: MapControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-space-900/90 border-b border-space-800 text-xs font-mono">
      {/* Left controls: zoom & view */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center bg-space-950 rounded-lg border border-space-800 p-0.5 shadow-sm">
          <button
            onClick={onZoomIn}
            disabled={zoom >= 3.5}
            className="p-1.5 hover:bg-space-800 text-slate-300 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Zoom in"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
          <span className="px-2 text-[11px] text-slate-400 select-none min-w-[45px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={onZoomOut}
            disabled={zoom <= 0.8}
            className="p-1.5 hover:bg-space-800 text-slate-300 hover:text-white rounded disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Zoom out"
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-space-950 hover:bg-space-800 border border-space-800 rounded-lg text-slate-300 hover:text-white transition-colors"
          title="Reset map view"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={onToggleGrid}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
            showGrid
              ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-300"
              : "bg-space-950 border-space-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Toggle coordinate grid"
        >
          <Grid className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Grid</span>
        </button>

        <button
          onClick={onToggleExpand}
          className="p-1.5 bg-space-950 hover:bg-space-800 border border-space-800 rounded-lg text-slate-300 hover:text-white transition-colors"
          title={isExpanded ? "Collapse view" : "Expand view"}
          aria-label={isExpanded ? "Collapse view" : "Expand view"}
        >
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>

      {/* Layer selector */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-space-950 border border-space-800 rounded-lg px-2 py-1">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px] text-slate-400 hidden md:inline">Layer:</span>
          <select
            value={currentLayer}
            onChange={(e) => onChangeLayer(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-mono focus:outline-none cursor-pointer"
          >
            {availableLayers.map((layer) => (
              <option key={layer.id} value={layer.id} className="bg-space-900 text-slate-200">
                {layer.label} {layer.badge}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Coordinate display */}
      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 bg-space-950 px-2.5 py-1 rounded-lg border border-space-800">
        <span className="text-cyan-400 font-semibold">{bodyLabel}:</span>
        {hoverCoords ? (
          <span>
            {Math.abs(hoverCoords.lat).toFixed(1)}°{hoverCoords.lat >= 0 ? "N" : "S"},{" "}
            {Math.abs(hoverCoords.lng).toFixed(1)}°{hoverCoords.lng >= 0 ? "E" : "W"}
          </span>
        ) : (
          <span className="text-slate-500">Move cursor over map</span>
        )}
      </div>
    </div>
  );
}
