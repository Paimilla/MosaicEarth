"use client";

import React from "react";
import { MockSite } from "@/types/planetary";
import {
  X,
  MapPin,
  Compass,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

interface SiteDetailCardProps {
  site: MockSite | null;
  onClose: () => void;
  onCompareWith?: (site: MockSite) => void;
}

export function SiteDetailCard({ site, onClose, onCompareWith }: SiteDetailCardProps) {
  const [copied, setCopied] = React.useState(false);

  if (!site) return null;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(
      `${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bodyColors = {
    earth: {
      border: "border-cyan-500/50",
      bgBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      accent: "text-cyan-400",
    },
    moon: {
      border: "border-slate-400/50",
      bgBadge: "bg-slate-400/20 text-slate-200 border-slate-400/30",
      accent: "text-slate-200",
    },
    mars: {
      border: "border-orange-500/50",
      bgBadge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      accent: "text-orange-400",
    },
  }[site.body];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md md:max-w-lg bg-space-950/95 border-l border-space-800 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* Card Header */}
      <div className="p-5 border-b border-space-850 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded border ${bodyColors.bgBadge}`}
            >
              {site.bodyLabel}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded border border-space-700 bg-space-900 text-slate-300">
              {site.tag}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-space-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close card"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white font-sans leading-snug">
          {site.name}
        </h3>

        {/* Coordinates bar */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-space-900/90 border border-space-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className={`h-4 w-4 ${bodyColors.accent}`} />
            <span>{site.coordinates.formatted}</span>
          </div>
          <button
            onClick={handleCopyCoords}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
            title="Copy coordinates"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
        {/* Core Analog Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Planetary Analog Characterization
          </h4>
          <div className="p-3 rounded-xl bg-space-900/70 border border-space-800 space-y-2">
            <p className="text-slate-200 font-medium leading-relaxed">{site.simulatedAnalogType}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-slate-400">
                Target Body:
              </span>
              <span className="text-xs font-mono font-semibold text-cyan-300 bg-space-950 px-2 py-0.5 rounded border border-space-800">
                {site.targetTargetBody}
              </span>
              <span className="text-[11px] font-mono text-slate-400 ml-auto">
                MCDA compatibility score:
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/15 text-emerald-300">
                {site.simulatedSimilarityIndex}
              </span>
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Geological Description & Scientific Observations
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed bg-space-900/40 p-3 rounded-lg border border-space-850">
            {site.fullMockDescription}
          </p>
          <p className="text-[11px] text-slate-400 italic">
            Terrain Classification: {site.terrainClassification}
          </p>
        </div>

        {/* Parameters Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Physical & Environmental Parameters
            </h4>
          </div>

          <div className="rounded-xl border border-space-800 overflow-hidden bg-space-900/50">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-space-950/80 text-slate-400 border-b border-space-800">
                <tr>
                  <th className="p-2.5 font-medium">Variable</th>
                  <th className="p-2.5 font-medium text-right">Measured Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-space-850">
                {site.parameters.map((param) => (
                  <tr key={param.id} className="hover:bg-space-850/50 transition-colors">
                    <td className="p-2.5 text-slate-300">
                      <div className="font-medium text-slate-200">{param.name}</div>
                      {param.mockNotes && (
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">{param.mockNotes}</div>
                      )}
                    </td>
                    <td className="p-2.5 text-slate-200 font-semibold whitespace-nowrap text-right">
                      {param.simulatedValue} <span className="text-slate-400 font-normal">{param.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature list */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Key Scientific Characteristics
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {site.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-space-900/30 p-2 rounded border border-space-850">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Data Provenance Box */}
        {site.disclaimer && (
          <div className="p-3.5 rounded-xl border border-space-800 bg-space-900/40 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-mono font-bold text-[11px] uppercase text-cyan-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>Scientific Data Provenance</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300/90">{site.disclaimer}</p>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 border-t border-space-850 bg-space-950 flex items-center justify-between gap-3">
        {onCompareWith && (
          <button
            onClick={() => onCompareWith(site)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-space-950 font-mono font-bold text-xs transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Explore in Comparison</span>
          </button>
        )}
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl bg-space-900 hover:bg-space-850 border border-space-800 text-slate-300 font-mono text-xs transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
