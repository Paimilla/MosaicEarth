"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Database,
  Globe,
  Radio,
  Workflow,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Server,
  Calculator,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { SPACE_AGENCY_RESOURCES } from "@/data/spaceAgencyResources";

export function MethodologySection() {
  const [selectedAgencyFilter, setSelectedAgencyFilter] = useState<string>("ALL");

  const filteredResources =
    selectedAgencyFilter === "ALL"
      ? SPACE_AGENCY_RESOURCES
      : SPACE_AGENCY_RESOURCES.filter((r) => r.agency === selectedAgencyFilter);

  // 3.2 Multidimensional feature matrix from the methodology
  const featureMatrix = [
    {
      dimension: "Geology",
      variables: "Lithology, mineral classes, surface materials",
      whyMatters: "Fundamental geological and mineralogical similarity",
      source: "CRISM (MRO) / OMEGA / USGS Maps",
    },
    {
      dimension: "Topography",
      variables: "Elevation, slopes, surface roughness (Hurst exponent)",
      whyMatters: "Safe landing, trafficability, and rover mobility",
      source: "MOLA / LOLA / SRTM / ASTER DEM",
    },
    {
      dimension: "Thermal",
      variables: "Day/night temperature, extreme seasonal oscillations",
      whyMatters: "Extreme environmental conditions and thermal shock",
      source: "LRO Diviner / MODIS LST / JAXA G-Portal",
    },
    {
      dimension: "Hydrology",
      variables: "Water ice, permafrost, brines, soil moisture",
      whyMatters: "Past aqueous processes and in-situ resources (ISRU)",
      source: "LEND / CRISM / Copernicus Sentinel-2",
    },
    {
      dimension: "Aeolian",
      variables: "Wind, suspended dust, abrasion and dune indicators",
      whyMatters: "Surface processes and panel/sensor wear",
      source: "HiRISE / CTX / Perseverance Cameras",
    },
    {
      dimension: "Spectral",
      variables: "Reflectance, albedo, diagnostic absorption bands",
      whyMatters: "Mineral characterization without destructive sampling",
      source: "CRISM / Sentinel-2 / Landsat",
    },
    {
      dimension: "Subsurface",
      variables: "Cavities, lava tubes, regolith thickness, strata",
      whyMatters: "Habitat exploration and radiation shielding",
      source: "RIMFAX (Perseverance) / GPR / ERT",
    },
    {
      dimension: "Operations",
      variables: "Accessibility, terrain hazards, logistics, light cycles",
      whyMatters: "Feasibility and sustainability of long-duration missions",
      source: "LROC (illumination) / Amundsen-Scott Records",
    },
  ];

  return (
    <section id="methodology" className="py-12 md:py-16 bg-space-950 border-b border-space-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Cpu className="h-4 w-4" />
            <span>SCIENTIFIC METHODOLOGY &amp; CORRELATION SCORING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Multi-Criteria Decision Analysis (MCDA) Methodological Framework
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            To evaluate which locations on Earth are viable analogs for permanent lunar bases and Mars missions, MOSAIC employs a transparent and explainable multi-criteria analysis model, avoiding unverifiable &quot;black box&quot; approaches.
          </p>
        </div>

        {/* Mathematical Formula Box */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#080d1a] via-[#040810] to-[#02050a] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden">
          {/* Subtle background ambient glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-space-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-sans tracking-tight">
                  Multi-Criteria Similarity Function (MCDA)
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Weighted &amp; Explainable Mathematical Model
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full self-start sm:self-auto shadow-sm">
              100% EXPLAINABLE · NO BLACK BOX
            </span>
          </div>

          {/* Mathematical Formula Display - Fraction Typesetting */}
          <div className="p-6 sm:p-8 rounded-xl bg-space-950/90 border border-space-850 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8 shadow-inner">
            {/* Left: Typeset Math Formula */}
            <div className="w-full lg:w-auto flex flex-col items-center justify-center space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold self-start sm:self-center">
                Master Global Similarity Equation
              </span>

              {/* Math Expression with Fraction Bar */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 px-4 sm:px-8 rounded-2xl bg-black/50 border border-cyan-500/20 shadow-lg">
                {/* S */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold italic text-emerald-400 font-serif drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                  S
                </span>

                {/* = 100 · */}
                <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-300 font-sans font-light">
                  =
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-white font-mono font-semibold">
                  100
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-cyan-400 font-sans">
                  ·
                </span>

                {/* Large Opening Bracket */}
                <span className="text-4xl sm:text-5xl lg:text-6xl text-slate-400 font-sans font-thin -mx-1">
                  [
                </span>

                {/* 1 - */}
                <div className="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl text-white font-sans font-light">
                  <span>1</span>
                  <span className="text-cyan-400 font-normal">−</span>
                </div>

                {/* Fraction */}
                <div className="inline-flex flex-col items-center justify-center px-2">
                  {/* Numerator */}
                  <div className="flex items-center gap-1.5 pb-1 text-sm sm:text-base lg:text-lg font-mono text-cyan-200 font-medium whitespace-nowrap">
                    <span className="text-lg sm:text-xl lg:text-2xl text-cyan-400 font-serif font-bold">∑</span>
                    <span className="text-xs text-cyan-400/80 -ml-1 font-mono">j</span>
                    <span>(</span>
                    <span className="italic text-cyan-300 font-serif">w</span>
                    <sub className="text-[10px] text-cyan-400 -ml-0.5">j</sub>
                    <span className="text-cyan-400">·</span>
                    <span className="italic text-amber-300 font-serif">d</span>
                    <sub className="text-[10px] text-amber-400 -ml-0.5">j</sub>
                    <span>)</span>
                  </div>

                  {/* Fraction Bar */}
                  <div className="w-full h-[2px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />

                  {/* Denominator */}
                  <div className="flex items-center gap-1.5 pt-1 text-sm sm:text-base lg:text-lg font-mono text-cyan-200 font-medium whitespace-nowrap">
                    <span className="text-lg sm:text-xl lg:text-2xl text-cyan-400 font-serif font-bold">∑</span>
                    <span className="text-xs text-cyan-400/80 -ml-1 font-mono">j</span>
                    <span className="italic text-cyan-300 font-serif">w</span>
                    <sub className="text-[10px] text-cyan-400 -ml-0.5">j</sub>
                  </div>
                </div>

                {/* Large Closing Bracket */}
                <span className="text-4xl sm:text-5xl lg:text-6xl text-slate-400 font-sans font-thin -mx-1">
                  ]
                </span>
              </div>

              {/* Sub-formula for d_j */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs text-slate-400">
                <span className="text-slate-500">where the normalized physical distance is:</span>
                <div className="inline-flex items-center gap-1.5 bg-space-900/90 border border-space-800 px-3 py-1 rounded-lg text-slate-200 shadow-sm">
                  <span className="italic text-amber-300 font-serif font-semibold">d</span>
                  <sub className="text-[9px] -ml-0.5 text-amber-400">j</sub>
                  <span className="text-cyan-400">=</span>
                  <div className="inline-flex flex-col items-center">
                    <span className="text-[11px] leading-tight">
                      |<span className="text-cyan-300">x</span><sub className="text-[8px]">E,j</sub> − <span className="text-orange-300">x</span><sub className="text-[8px]">P,j</sub>|
                    </span>
                    <div className="w-full h-[1px] bg-slate-600 my-0.5" />
                    <span className="italic text-[10px] text-slate-300 font-serif leading-tight">R<sub className="text-[8px]">j</sub></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Explanatory Parameter Cards */}
            <div className="w-full lg:w-80 space-y-2.5">
              <div className="p-3 rounded-xl bg-space-900/70 border border-emerald-500/30 space-y-0.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>S ∈ [0, 100]</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Global Score</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Final analog correlation index. 100 indicates perfect correspondence; 0 total disparity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-space-900/70 border border-cyan-500/30 space-y-0.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>w_j ≥ 0</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Mission Weight</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Weight of each variable. Allows irrelevant variables to be zeroed out (<code className="text-cyan-300">w_j = 0</code>) without penalizing the analog.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-space-900/70 border border-amber-500/30 space-y-0.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <span>d_j ∈ [0, 1]</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Physical Distance</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  Difference between Earth (<span className="text-cyan-300">x_E</span>) and Planet (<span className="text-orange-300">x_P</span>), bounded by the physical range <span className="text-slate-200">R_j</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Applied Example Box (Case 1) */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-space-900/60 to-cyan-950/40 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono font-bold text-emerald-300 uppercase text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Applied Example — Case 1 (Makgadikgadi ↔ Jezero):</span>
              </div>
              <p className="text-slate-300 font-sans text-[11px]">
                The Case 1 score is calculated from normalized comparison distances and mission-specific weights:
              </p>
            </div>
            <div className="font-mono px-3.5 py-2 rounded-lg bg-black/60 border border-emerald-500/40 text-emerald-300 whitespace-nowrap text-center self-start md:self-auto shadow-inner">
              <span className="text-slate-400 text-[10px] block">Calculated MCDA score:</span>
              S = 100 · (1 − Σ(w_j · d_j) / Σ w_j) = <strong className="text-emerald-400 text-sm font-bold">90.2/100</strong>
            </div>
          </div>

          {/* Justification of weights & no unfair penalization */}
          <div className="p-4 rounded-xl bg-space-900/50 border border-space-800 text-xs text-slate-300 space-y-2 leading-relaxed">
            <div className="flex items-center gap-2 font-mono font-bold text-cyan-300 text-xs uppercase">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span>Key Principle: Mission-Profile-Specific Evaluation</span>
            </div>
            <p>
              Not all dimensions are applicable to every planetary profile. For instance, a <strong>basaltic lava tube</strong> should not be penalized for failing to reproduce the Martian atmosphere, since its purpose is to test shielding and structural integrity in subsurface cavities. Similarly, a <strong>polar Antarctic base (Amundsen-Scott)</strong> is an operational analog for life support and heavy logistics, so its mineralogical similarity receives a minimal weight (w_geology = 0.2) to reflect its true operational value.
            </p>
          </div>
        </div>

        {/* 3.2 Multidimensional Feature Matrix Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Multidimensional Feature Matrix (3.2)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              8 Key Dimensions
            </span>
          </div>

          <div className="rounded-xl border border-space-800 overflow-x-auto bg-space-900/50">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-space-950/80 text-slate-300 border-b border-space-800">
                <tr>
                  <th className="p-3 font-bold text-cyan-300">Dimension</th>
                  <th className="p-3 font-bold">Measurable Variables</th>
                  <th className="p-3 font-bold">Mission Relevance</th>
                  <th className="p-3 font-bold text-right">Sensors / Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-space-850">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-space-850/40 transition-colors">
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{row.dimension}</td>
                    <td className="p-3 text-slate-300 font-sans">{row.variables}</td>
                    <td className="p-3 text-slate-300 font-sans">{row.whyMatters}</td>
                    <td className="p-3 text-right text-cyan-400 font-mono text-[11px] whitespace-nowrap">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Space Agency Official Resources Directory */}
        <div className="space-y-5 pt-4 border-t border-space-850">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-space-800">
            <div>
              <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                <Database className="h-4 w-4 text-cyan-400" />
                <span>Official Space Agency Portals &amp; Resources</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Data from NASA, CSA (Canada), ESA (Europe), and JAXA (Japan) for the three case studies.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedAgencyFilter("ALL")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${selectedAgencyFilter === "ALL"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                    : "bg-space-900 text-slate-400 hover:text-white"
                  }`}
              >
                All ({SPACE_AGENCY_RESOURCES.length})
              </button>
              <button
                onClick={() => setSelectedAgencyFilter("NASA")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${selectedAgencyFilter === "NASA"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                    : "bg-space-900 text-slate-400 hover:text-white"
                  }`}
              >
                NASA (5)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter("CSA")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${selectedAgencyFilter === "CSA"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                    : "bg-space-900 text-slate-400 hover:text-white"
                  }`}
              >
                CSA Canada (3)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter("ESA")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${selectedAgencyFilter === "ESA"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                    : "bg-space-900 text-slate-400 hover:text-white"
                  }`}
              >
                ESA Europe (2)
              </button>
              <button
                onClick={() => setSelectedAgencyFilter("JAXA")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${selectedAgencyFilter === "JAXA"
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/50"
                    : "bg-space-900 text-slate-400 hover:text-white"
                  }`}
              >
                JAXA Japan (1)
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-xl bg-space-900/60 border border-space-800 hover:border-space-700 flex flex-col justify-between space-y-3 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-space-950 border border-space-800 text-cyan-300">
                      {res.agency}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-space-950/80 px-2 py-0.5 rounded border border-space-850">
                      {res.targetScope}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-sans leading-snug">
                    {res.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {res.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-space-850">
                  <div className="text-[11px] bg-space-950/70 p-2.5 rounded-lg border border-space-850 space-y-1">
                    <span className="text-cyan-400 font-mono font-semibold block text-[10px] uppercase">
                      Use in MOSAIC:
                    </span>
                    <span className="text-slate-300 leading-tight block font-sans">
                      {res.analogRelevance}
                    </span>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-space-850 hover:bg-space-800 border border-space-700 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
                  >
                    <span>Open Official Portal</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency Declaration */}
        <div className="p-4 rounded-xl bg-space-900/50 border border-space-800 text-xs text-slate-400 space-y-1.5 leading-relaxed font-sans">
          <div className="flex items-center gap-2 text-slate-200 font-mono font-semibold text-xs">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>NASA Space Apps Challenge Transparency Declaration</span>
          </div>
          <p>
            MOSAIC is a platform developed for the <strong>NASA Space Apps Challenge 2026</strong>. It links real source datasets and processed observations from NASA PDS, ESA Copernicus, Zenodo, Frontiers, and AMRDC. Its MCDA scores compare normalized, case-specific dimensions using documented mission weights.
          </p>
        </div>
      </div>
    </section>
  );
}
