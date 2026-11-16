"use client";

import React, { useState } from "react";
import { MOCK_COMPARISONS } from "@/data/mockComparisonData";
import { ALL_MOCK_SITES } from "@/data/mockPlanetaryData";
import { AssessmentCard } from "./AssessmentCard";
import { RealTelemetryCard } from "./RealTelemetryCard";
import {
  ArrowRightLeft,
  CheckCircle,
  AlertOctagon,
  BarChart3,
  Globe,
  Moon,
  Flame,
  Satellite,
  HelpCircle,
  Database,
  Radio,
  Table,
  Calculator,
  Activity,
} from "lucide-react";

export function ComparisonSection() {
  const [selectedCompId, setSelectedCompId] = useState(MOCK_COMPARISONS[0].id);
  const [centerViewMode, setCenterViewMode] = useState<"chart" | "variables" | "telemetry">("chart");

  const currentComp =
    MOCK_COMPARISONS.find((c) => c.id === selectedCompId) || MOCK_COMPARISONS[0];

  const earthSite = ALL_MOCK_SITES.earth.find((s) => s.id === currentComp.earthSiteId);
  const targetSite =
    currentComp.targetBody === "Moon"
      ? ALL_MOCK_SITES.moon.find((s) => s.id === currentComp.targetSiteId)
      : ALL_MOCK_SITES.mars.find((s) => s.id === currentComp.targetSiteId);

  return (
    <section id="comparison" className="py-10 md:py-16 border-b border-space-800 bg-space-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>MULTI-CRITERIA DECISION ANALYSIS (MCDA)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Planetary Analog Compatibility Assessment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-sans">
              MCDA comparisons based on real open-data observations and documented case-specific criteria.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-space-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs self-start md:self-auto shadow-sm">
            <Calculator className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>CASE {currentComp.caseNumber} · MCDA SCORE: {currentComp.assessment.overallScore}/100</span>
          </div>
        </div>

        {/* Comparison Case Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {MOCK_COMPARISONS.map((comp) => {
            const isSelected = comp.id === selectedCompId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                  isSelected
                    ? "bg-space-850 text-cyan-300 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/30 font-bold"
                    : "bg-space-900/60 text-slate-400 border-space-800 hover:text-slate-200 hover:bg-space-850"
                }`}
              >
                <span className="text-cyan-400 font-bold">CASE {comp.caseNumber}:</span>
                <span className="text-slate-200 font-sans">
                  {comp.caseNumber === 1
                    ? "Makgadikgadi ↔ Jezero (Subsurface GPR / RIMFAX)"
                    : comp.caseNumber === 2
                    ? "Salar de Pajonales ↔ Jezero & Olympia (Gypsum / Biosignatures)"
                    : "Amundsen–Scott ↔ Lunar South Pole (Polar Operations)"}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                  {`S = ${comp.assessment.overallScore}/100`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlighted Research Question Banner for the Active Case */}
        <div className="p-4 rounded-xl bg-space-900/90 border border-cyan-500/30 shadow-md space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300 uppercase">
            <HelpCircle className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>Research Question — Case {currentComp.caseNumber}:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed italic pl-6">
            &quot;{currentComp.researchQuestion}&quot;
          </p>
          <div className="pl-6 pt-1 text-[11px] font-mono text-slate-400">
            <strong className="text-slate-300">Core Focus:</strong> {currentComp.analogFocus}
          </div>
        </div>

        {/* Main Comparison Dashboard: 3 Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column: Earth Site Card (3.5 cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-space-900/60 border border-cyan-500/30 p-4 space-y-3 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 font-semibold uppercase bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  <Globe className="h-3.5 w-3.5" />
                  <span>Earth Analog Site</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-cyan-300 bg-cyan-500/20 border border-cyan-500/30">
                  {earthSite?.tag}
                </span>
              </div>

              {earthSite && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white leading-snug">{earthSite.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{earthSite.shortDescription}</p>

                  <div className="p-2.5 rounded-lg bg-space-950/80 border border-space-800 text-xs font-mono space-y-1">
                    <div className="text-slate-400 text-[10px]">Coordinates:</div>
                    <div className="text-cyan-300 font-semibold">{earthSite.coordinates.formatted}</div>
                    <div className="text-slate-400 text-[10px] pt-1">Terrain Classification:</div>
                    <div className="text-slate-200 text-[11px] font-sans">{earthSite.terrainClassification}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Earth Datasets List */}
            <div className="pt-2 border-t border-space-850 text-[11px] font-mono text-slate-400 space-y-1.5 bg-space-950/60 p-2.5 rounded-lg mt-2">
              <span className="text-cyan-400 font-semibold flex items-center gap-1 text-[10px] uppercase">
                <Database className="h-3 w-3" />
                <span>Analyzed Earth Datasets:</span>
              </span>
              <ul className="space-y-1 text-[10px] text-slate-300 font-sans">
                {currentComp.earthDatasets.map((ds, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">•</span>
                    <span>{ds}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Column: Assessment Card + Variables Table + Telemetry Card (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between bg-space-900/80 border border-space-800 p-1.5 rounded-xl text-xs font-mono gap-1">
              <span className="text-slate-400 text-[11px] pl-2 font-semibold uppercase hidden sm:inline">
                Evaluation View:
              </span>
              <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setCenterViewMode("chart")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    centerViewMode === "chart"
                      ? "bg-space-800 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>Dimensions (S={currentComp.assessment.overallScore})</span>
                </button>
                <button
                  onClick={() => setCenterViewMode("variables")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    centerViewMode === "variables"
                      ? "bg-space-800 text-cyan-300 border border-cyan-500/40 shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Table className="h-3.5 w-3.5" />
                  <span>Variable Matrix ({currentComp.variables.length})</span>
                </button>
                <button
                  onClick={() => setCenterViewMode("telemetry")}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    centerViewMode === "telemetry"
                      ? "bg-space-800 text-cyan-300 border border-cyan-500/40 shadow-sm font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 text-cyan-400" />
                  <span>
                    {currentComp.caseNumber === 1 ? "Radar & Sounding Files" : "Data Inventory Checklist"}
                  </span>
                </button>
              </div>
            </div>

            {centerViewMode === "chart" ? (
              <AssessmentCard
                assessment={currentComp.assessment}
                targetBodyName={currentComp.targetBody}
              />
            ) : centerViewMode === "telemetry" ? (
              <RealTelemetryCard caseNumber={currentComp.caseNumber} />
            ) : (
              <div className="w-full rounded-2xl bg-[#03060c] border border-space-800 p-4 sm:p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-space-850">
                  <div>
                    <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-cyan-400" />
                      <span>Similarity Compatibility Function Variables</span>
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-300/90 flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-slate-400">Formula:</span>
                      <span className="font-serif italic text-emerald-400 font-bold">S</span>
                      <span>= 100 · [ 1 − ( ∑ w<sub className="text-[8px]">j</sub>·d<sub className="text-[8px]">j</sub> / ∑ w<sub className="text-[8px]">j</sub> ) ]</span>
                      <span className="text-slate-500">· Case {currentComp.caseNumber}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Σ w_j = {currentComp.variables.reduce((a, b) => a + b.weight, 0).toFixed(1)}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead className="bg-space-950/80 text-slate-300 border-b border-space-850">
                      <tr>
                        <th className="p-2 font-bold text-cyan-400">Dimension</th>
                        <th className="p-2 font-bold">Measurable Variable</th>
                        <th className="p-2 font-bold text-center">Earth (x_E)</th>
                        <th className="p-2 font-bold text-center">Planetary Target (x_P)</th>
                        <th className="p-2 font-bold text-center">Weight (w_j)</th>
                        <th className="p-2 font-bold text-center">Distance (d_j)</th>
                        <th className="p-2 font-bold text-right">Similarity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-space-850">
                      {currentComp.variables.map((v) => (
                        <tr key={v.id} className="hover:bg-space-900/60 transition-colors">
                          <td className="p-2 text-cyan-300 font-semibold whitespace-nowrap align-top">
                            <div>{v.dimensionLabel}</div>
                            {v.comparisonProfile && (
                              <span className="text-[9px] font-mono text-slate-400 block max-w-[120px] truncate" title={v.comparisonProfile}>
                                {v.comparisonProfile.split(":")[0]}
                              </span>
                            )}
                          </td>
                          <td className="p-2 text-slate-200 align-top">
                            <div className="font-semibold text-white">{v.name}</div>
                            <div className="text-[10px] text-cyan-400/90 font-mono mt-0.5">
                              {v.earthSource || v.scientificSource}
                            </div>
                            {v.targetSource && (
                              <div className="text-[9px] text-orange-400/80 font-mono">
                                vs {v.targetSource}
                              </div>
                            )}
                            {v.notes && (
                              <div className="text-[10px] text-slate-400 font-sans mt-1 italic border-l-2 border-slate-700 pl-1.5 leading-snug">
                                {v.notes}
                              </div>
                            )}
                          </td>
                          <td className="p-2 text-center text-slate-300 align-top bg-space-950/40">
                            <div className="font-medium text-white">{v.earthValue}</div>
                            <span className="text-slate-400 text-[10px]">{v.unit}</span>
                            {v.earthResolution && (
                              <div className="text-[9px] text-slate-500 mt-0.5">{v.earthResolution}</div>
                            )}
                          </td>
                          <td className="p-2 text-center text-orange-300 align-top bg-space-950/40">
                            <div className="font-medium text-orange-200">{v.targetValue}</div>
                            <span className="text-slate-400 text-[10px]">{v.unit}</span>
                            {v.targetResolution && (
                              <div className="text-[9px] text-slate-500 mt-0.5">{v.targetResolution}</div>
                            )}
                          </td>
                          <td className="p-2 text-center align-top whitespace-nowrap">
                            <span className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                              v.weight === 0
                                ? "bg-slate-800 text-slate-400 line-through"
                                : v.weight < 0.5
                                ? "bg-amber-950/60 text-amber-400 border border-amber-600/30"
                                : "text-amber-300"
                            }`}>
                              {v.weight.toFixed(1)}
                            </span>
                            {v.weight === 0 && (
                              <div className="text-[8px] text-slate-500 font-sans">Excl.</div>
                            )}
                          </td>
                          <td className="p-2 text-center text-slate-300 align-top whitespace-nowrap font-mono">
                            {v.weight === 0 ? "—" : v.normalizedDiff.toFixed(2)}
                          </td>
                          <td className="p-2 text-right font-bold align-top whitespace-nowrap">
                            {v.weight === 0 ? (
                              <span className="text-slate-500 text-[10px] italic">Not scored</span>
                            ) : (
                              <span className="text-emerald-400">
                                {v.similarity ?? v.calculatedSimilarity ?? Math.round((1 - v.normalizedDiff) * 100)}%
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-lg bg-space-950/80 border border-cyan-500/30 text-[11px] font-mono text-slate-300 leading-relaxed">
                  💡 <strong className="text-cyan-300">Active Scientific Dictionary:</strong> The variables above derive directly from peer-reviewed publications and archived repositories (Zenodo DOI 10.5281/zenodo.22256874, Frontiers in Astronomy DOI 10.3389/fspas.2025.1693302, NASA PDS, and AMRDC).
                </div>
              </div>
            )}

            {/* Methodological Instrument Comparison Note */}
            <div className="p-3.5 rounded-xl bg-space-900/60 border border-space-800 text-xs space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5" />
                <span>Instrumental Comparison & Methodological Correlation:</span>
              </span>
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {currentComp.instrumentComparisonNote}
              </p>
            </div>
          </div>

          {/* Right Column: Target Planetary Site Card (3.5 cols) */}
          <div
            className={`lg:col-span-3 rounded-2xl bg-space-900/60 border p-4 space-y-3 flex flex-col justify-between shadow-lg ${
              currentComp.targetBody === "Moon"
                ? "border-slate-500/40"
                : "border-orange-500/40"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase px-2.5 py-1 rounded-lg border ${
                    currentComp.targetBody === "Moon"
                      ? "bg-slate-800/60 text-slate-200 border-slate-500/30"
                      : "bg-orange-950/60 text-orange-300 border-orange-500/30"
                  }`}
                >
                  {currentComp.targetBody === "Moon" ? (
                    <Moon className="h-3.5 w-3.5" />
                  ) : (
                    <Flame className="h-3.5 w-3.5" />
                  )}
                  <span>Target on {currentComp.targetBody}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded text-orange-300 bg-orange-500/20 border border-orange-500/30">
                  {targetSite?.tag}
                </span>
              </div>

              {targetSite && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white leading-snug">{targetSite.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{targetSite.shortDescription}</p>

                  <div className="p-2.5 rounded-lg bg-space-950/80 border border-space-800 text-xs font-mono space-y-1">
                    <div className="text-slate-400 text-[10px]">Planetary Coordinates:</div>
                    <div
                      className={`font-semibold ${
                        currentComp.targetBody === "Moon" ? "text-slate-200" : "text-orange-300"
                      }`}
                    >
                      {targetSite.coordinates.formatted}
                    </div>
                    <div className="text-slate-400 text-[10px] pt-1">Classification:</div>
                    <div className="text-slate-200 text-[11px] font-sans">{targetSite.terrainClassification}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Planetary Datasets List */}
            <div className="pt-2 border-t border-space-850 text-[11px] font-mono text-slate-400 space-y-1.5 bg-space-950/60 p-2.5 rounded-lg mt-2">
              <span className="text-cyan-400 font-semibold flex items-center gap-1 text-[10px] uppercase">
                <Satellite className="h-3 w-3" />
                <span>Linked Planetary Datasets:</span>
              </span>
              <ul className="space-y-1 text-[10px] text-slate-300 font-sans">
                {currentComp.planetaryDatasets.map((ds, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">•</span>
                    <span>{ds}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Strengths & Limitations of Analog Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl bg-space-900/40 border border-emerald-500/30 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>
                Key Evaluation Capabilities of this Analog
              </span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300 font-sans">
              {currentComp.prosDemo.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-space-900/40 border border-amber-500/30 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
              <AlertOctagon className="h-3.5 w-3.5" />
              <span>Physical Boundaries & Analogy Breakdowns</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300 font-sans">
              {currentComp.limitationsDemo.map((lim, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
