"use client";

import React from "react";
import {
  Activity,
  Layers,
  Radio,
  ExternalLink,
  CheckCircle2,
  Compass,
} from "lucide-react";

interface RealTelemetryCardProps {
  caseNumber: number;
}

export function RealTelemetryCard({ caseNumber }: RealTelemetryCardProps) {
  if (caseNumber === 1) {
    return (
      <div className="w-full rounded-2xl bg-[#03060c] border border-cyan-500/40 p-4 sm:p-5 shadow-2xl space-y-5">
        {/* Header with Live Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-space-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>Observational Telemetry — Case 1</span>
              </h3>
            </div>
            <p className="text-[11px] font-mono text-cyan-300/80 mt-0.5">
              Case 1: Makgadikgadi Basin (Botswana) ↔ Jezero Crater (Mars)
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 bg-space-900 border border-cyan-500/40 px-2.5 py-1 rounded-lg self-start sm:self-auto font-semibold">
            7 SCIENTIFIC DATASETS ANALYZED
          </span>
        </div>

        {/* Telemetry Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Card 1: SRTM vs MOLA Topography */}
          <div className="rounded-xl bg-space-900/60 border border-space-800 p-3.5 space-y-2.5 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-cyan-400" />
                <span>Altimetric Topography (DEM)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Match: 98% (d=0.014)
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Earth: SRTMGL1 (S21E024 / S21E025)</span>
                  <span className="text-cyan-400">465 GPS pts</span>
                </div>
                <div className="text-slate-200 font-semibold pt-0.5">
                  Median Slope: <strong className="text-white">0.78°</strong> (mean elevation 906.6 m)
                </div>
                <div className="text-[10px] text-slate-500">Local pan range: 0.0° to 5.66° · 12.9M cells/tile</div>
              </div>

              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Mars: MOLA (megt90n000eb) + HiRISE DTM</span>
                  <span className="text-orange-400">1.01 m/px</span>
                </div>
                <div className="text-orange-200 font-semibold pt-0.5">
                  Mean 3x3 Jezero Slope: <strong className="text-orange-300">0.85°</strong> (elevation -2586.6 m)
                </div>
                <div className="text-[10px] text-slate-500">70.2M valid elevation pixels in DTM DTEEC_045994_1985 (-2679 to -2388 m)</div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-sans italic border-l-2 border-emerald-500/60 pl-2">
              Empirical difference of just <strong>0.07°</strong> between the Makgadikgadi floor and the basal plain of Jezero Delta.
            </p>
          </div>

          {/* Card 2: Sentinel-2 vs CRISM Spectral */}
          <div className="rounded-xl bg-space-900/60 border border-space-800 p-3.5 space-y-2.5 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>Multispectral Reflectance</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Match: 91% (d=0.09)
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Earth: Sentinel-2 L2A</span>
                  <span className="text-cyan-400">6 GeoTIFF bands</span>
                </div>
                <div className="text-slate-200 text-[10px] grid grid-cols-3 gap-1 pt-0.5">
                  <div>B04 (R): <strong className="text-white">0.248</strong></div>
                  <div>B08 (NIR): <strong className="text-white">0.313</strong></div>
                  <div>B11 (SWIR): <strong className="text-white">0.452</strong></div>
                </div>
                <div className="text-[10px] text-slate-400 pt-0.5">
                  NDVI: <strong className="text-emerald-400">0.110</strong> (arid) · NDWI: <strong className="text-cyan-400">-0.187</strong> (dry)
                </div>
              </div>

              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Mars: CRISM FRT000047A3</span>
                  <span className="text-orange-400">489 bands</span>
                </div>
                <div className="text-orange-200 font-semibold pt-0.5">
                  Rover traverse window: <strong className="text-orange-300">4,401 valid samples</strong>
                </div>
                <div className="text-[10px] text-slate-500">MTRDR targeted cube (1.28 GB) · Coordinates 18.462°N, 77.436°E</div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-sans italic border-l-2 border-emerald-500/60 pl-2">
              Desiccated mineral ground with strong SWIR absorption and zero active photosynthesis, modeling Martian regolith.
            </p>
          </div>

          {/* Card 3: GPR vs RIMFAX Radar Subsurface */}
          <div className="rounded-xl bg-space-900/60 border border-space-800 p-3.5 space-y-2.5 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-cyan-400" />
                <span>Subsurface Radar (GPR ↔ RIMFAX)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Match: 85% (d=0.15)
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Earth: Makgadikgadi GPR Survey</span>
                  <span className="text-cyan-400">10 SEG-Y files</span>
                </div>
                <div className="text-slate-200 font-semibold pt-0.5">
                  Continuous Subhorizontal Reflectors (v ≈ 0.085 m/ns)
                </div>
                <div className="text-[10px] text-slate-500">RTA 30 MHz &amp; 50 MHz antennas (res. ~0.67m / ~0.40m) · Franchi et al., 2026</div>
              </div>

              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Mars: RIMFAX Sol 400</span>
                  <span className="text-orange-400">2.38 GB</span>
                </div>
                <div className="text-orange-200 font-semibold pt-0.5">
                  10,505 Active Soundings · FMCW 150-1200 MHz
                </div>
                <div className="text-[10px] text-slate-500">Sols 134-204 (~15 m) &amp; Sols 400-566 Séítah (~20 m, dip ~12°). Structural architecture match.</div>
              </div>
            </div>

            {/* Radargram Thumbnails */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-space-950/90 border border-space-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src="/data/makgadikgadi_gpr_radargram_gpr06.png"
                    alt="Makgadikgadi GPR06 Radargram"
                    className="h-8 w-14 object-cover rounded border border-space-700 shrink-0"
                  />
                  <div className="text-[9px] font-mono truncate">
                    <div className="text-slate-200 font-semibold truncate">GPR 30/50 MHz</div>
                    <div className="text-slate-500 truncate">Makgadikgadi</div>
                  </div>
                </div>
                <a
                  href="/data/makgadikgadi_gpr_radargram_gpr06.png"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 shrink-0"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>

              <div className="p-2 rounded-lg bg-space-950/90 border border-space-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <img
                    src="/data/rimfax_abrowse_00400.png"
                    alt="RIMFAX Sol 400 Radargram"
                    className="h-8 w-14 object-cover rounded border border-space-700 shrink-0"
                  />
                  <div className="text-[9px] font-mono truncate">
                    <div className="text-slate-200 font-semibold truncate">RIMFAX Sol 400</div>
                    <div className="text-slate-500 truncate">Jezero (Mars)</div>
                  </div>
                </div>
                <a
                  href="/data/rimfax_abrowse_00400.png"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[9px] font-mono text-cyan-400 hover:text-cyan-300 shrink-0"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 4: ERT Geoelectrics */}
          <div className="rounded-xl bg-space-900/60 border border-space-800 p-3.5 space-y-2.5 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                <span>Electrical Resistivity ERT (Earth)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                w_j = 0.0 (Contextual)
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Line A: 25,841 points · Line B: 11,146 points</span>
                  <span className="text-cyan-400">Total 36,987</span>
                </div>
                <div className="text-slate-200 font-semibold pt-0.5">
                  Median Resistivity: <strong className="text-emerald-400">0.67 to 0.95 Ω·m</strong>
                </div>
                <div className="text-[10px] text-slate-500">Log10 range: -0.92 to 0.70 · Files Line A_res.dat &amp; Line B_xyz.dat</div>
              </div>

              <div className="p-2 rounded-lg bg-space-950/80 border border-space-850">
                <div className="text-slate-400 text-[10px]">Planetary Context</div>
                <div className="text-slate-300 text-[11px] pt-0.5">
                  No electrical resistivity instrument on active Mars rovers.
                </div>
                <div className="text-[10px] text-slate-500">Excluded from S score calculation to avoid penalizing Mars targets.</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-space-950/90 border border-space-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/data/makgadikgadi_ert_pseudosection.png"
                  alt="Makgadikgadi ERT Section"
                  className="h-9 w-20 object-cover rounded border border-space-700"
                />
                <div className="text-[10px] font-mono">
                  <div className="text-slate-200 font-semibold">ERT Tomography Line A</div>
                  <div className="text-slate-500">25,841 soundings (saline brine)</div>
                </div>
              </div>
              <a
                href="/data/makgadikgadi_ert_pseudosection.png"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View plot</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <p className="text-[10px] text-slate-400 font-sans italic border-l-2 border-amber-500/60 pl-2">
              Extremely low resistivity (&lt; 1 Ω·m) confirms a confined hypersaline brine aquifer beneath the paleolake floor.
            </p>
          </div>
        </div>

        {/* Verification Footer Note */}
        <div className="p-2.5 rounded-xl bg-space-950/90 border border-space-800 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Open research datasets verified from Zenodo (DOI: 10.5281/zenodo.22256874) and NASA PDS.</span>
          </div>
        </div>
      </div>
    );
  }

  // Cases 2 & 3: Data Summary
  return (
    <div className="w-full rounded-2xl bg-[#03060c] border border-space-800 p-4 sm:p-5 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-space-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white font-sans">
              Observational Telemetry — Case {caseNumber}
            </h3>
          </div>
          <p className="text-[11px] font-mono text-cyan-300/80 mt-0.5">
            {caseNumber === 2
              ? "Case 2: Salar de Pajonales (Chile) ↔ Mars (Gypsum / Biosignatures)"
              : "Case 3: Amundsen–Scott Station (Antarctica) ↔ Lunar South Pole"}
          </p>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-space-900 border border-cyan-500/40 px-2.5 py-1 rounded-lg self-start sm:self-auto font-semibold">
          DATA INVENTORY VERIFIED
        </span>
      </div>

      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        {caseNumber === 2
          ? "Case 2 evaluated with analytical laboratory and orbital remote sensing datasets:"
          : "Case 3 evaluated with polar operations records and cryogenic environmental time series:"}
      </p>

      {/* Calibrated Data Sources */}
      <div className="space-y-2">
        {caseNumber === 2 ? (
          <>
            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>1. Geochemical &amp; Mineralogical Analytical Data — Frontiers in Astronomy</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Table S6 (meteorology ATA17-08: Tmin -5.7°C, Tmax 37.9°C), Table S7 (sample-specific XRD: stromatolites ~91% gypsum vs crusts ~55% halite + ~38% gypsum), and Table S9 (aw 0.39-0.86).
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>2. Sentinel-2 L2A Multispectral Imagery (Salar de Pajonales)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  7 GeoTIFF bands (B02, B03, B04, B08, B11, B12, True Color) from Copernicus Data Space. Coordinates: <strong>25° 08&apos; S, 68° 49&apos; W</strong>.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>3. SRTM 30m Digital Elevation Model (S26W069)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  1-arcsecond mosaic (25.96 MB, 3601×3601). Basin elevation: 3,522 to 4,734 m, median catchment slope: 4.04°.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>4. CRISM &amp; CTX Targeted Cubes (Martian Targets)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  CRISM FRT000047A3 (Jezero Delta phyllosilicates) and HRL000040FF (Olympia Undae circumpolar gypsum dunes SWIR hydration bands at 1.4, 1.93, 2.2 µm).
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>1. AMRDC Meteorological Records (2019–2026)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  59 continuous weekly summary archives (DOI: 10.48567/vcma-jv23) and 1957–2007 surface baseline (DOI: 10.48567/r6wy-as19). Temperature range: -73.1°C to -19.3°C (mean -46.8°C), pressure 658.7-701.8 mb.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>2. LOLA DEM Site04 — Shackleton Crater</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  GeoTIFF (3200×3200 at 5 m/px). Total vertical relief: 4,651.5 m (-2,846.5 to +1,805.0 m), median slope: 20.43°, maximum rim wall: 43.12°.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>

            <div className="p-3 rounded-xl bg-space-900/60 border border-space-800 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>3. LRO Diviner Thermal Radiometry</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Calibrated brightness temperature range: &lt; 40 K (-233 °C) in permanently shadowed regions (PSRs), ~110 K illuminated polar peak surface.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">✓ OK</span>
            </div>
          </>
        )}
      </div>

      {/* Verification Footer */}
      <div className="p-2.5 rounded-xl bg-space-950/90 border border-space-800 text-[11px] font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            {caseNumber === 2
              ? "Sources: Frontiers in Astronomy (DOI: 10.3389/fspas.2025.1693302) + ESA Copernicus + NASA Earthdata"
              : "Sources: AMRDC (DOI: 10.48567/vcma-jv23 & 10.48567/r6wy-as19) + NASA LRO LOLA / Diviner"}
          </span>
        </div>
      </div>
    </div>
  );
}
