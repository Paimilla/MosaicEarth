"use client";

import React, { useState, useEffect } from "react";
import { CelestialBody, MockSite } from "@/types/planetary";
import { ALL_MOCK_SITES } from "@/data/mockPlanetaryData";
import { PLANETARY_TILE_PROVIDERS, TileProvider } from "@/data/mapTileProviders";
import DynamicLeafletMap from "@/components/maps/DynamicLeafletMap";
import {
  Globe,
  Moon,
  Flame,
  Layers,
  MapPin,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Compass,
  ArrowRight,
} from "lucide-react";

interface PlanetaryViewerProps {
  activeTab: CelestialBody;
  onSelectTab: (tab: CelestialBody) => void;
  onNavigateToComparison: (siteId: string) => void;
}

export function PlanetaryViewer({
  activeTab,
  onSelectTab,
  onNavigateToComparison,
}: PlanetaryViewerProps) {
  const [selectedSite, setSelectedSite] = useState<MockSite | null>(ALL_MOCK_SITES.earth[0]);
  const [sidebarTab, setSidebarTab] = useState<"detail" | "list" | "resources">("detail");
  const [hoverCoords, setHoverCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copied, setCopied] = useState(false);

  // Tile provider state per celestial body
  const providers = PLANETARY_TILE_PROVIDERS[activeTab];
  const [selectedProviderId, setSelectedProviderId] = useState<string>(providers[0]?.id || "");

  useEffect(() => {
    const bodyProviders = PLANETARY_TILE_PROVIDERS[activeTab];
    setSelectedProviderId(bodyProviders[0]?.id || "");
  }, [activeTab]);

  const activeProvider: TileProvider =
    providers.find((p) => p.id === selectedProviderId) || providers[0];

  const currentSites = ALL_MOCK_SITES[activeTab];

  const handleBodyChange = (body: CelestialBody) => {
    onSelectTab(body);
    const bodyProviders = PLANETARY_TILE_PROVIDERS[body];
    setSelectedProviderId(bodyProviders[0]?.id || "");
    setSelectedSite(ALL_MOCK_SITES[body][0]);
    setSidebarTab("detail");
  };

  const handleCopyCoords = () => {
    if (!selectedSite) return;
    navigator.clipboard.writeText(
      `${selectedSite.coordinates.lat.toFixed(4)}, ${selectedSite.coordinates.lng.toFixed(4)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bodyAccent = {
    earth: {
      color: "text-cyan-400",
      border: "border-cyan-500/40",
      bgBadge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    moon: {
      color: "text-slate-200",
      border: "border-slate-400/40",
      bgBadge: "bg-slate-500/20 text-slate-200 border-slate-400/40",
    },
    mars: {
      color: "text-orange-400",
      border: "border-orange-500/40",
      bgBadge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    },
  }[activeTab];

  const getCleanSiteBadge = (site: MockSite): string => {
    if (site.body === "earth") {
      if (site.name.includes("1") || site.name.includes("Makgadikgadi")) return "Case 1";
      if (site.name.includes("2") || site.name.includes("Pajonales")) return "Case 2";
      if (site.name.includes("3") || site.name.includes("Amundsen")) return "Case 3";
      return "Earth";
    }
    if (site.body === "moon") {
      if (site.name.includes("Shackleton")) return "Lunar South Pole";
      if (site.name.includes("Tranquillitatis")) return "Lava Tube Skylight";
      return "Moon";
    }
    if (site.body === "mars") {
      if (site.name.includes("Jezero")) return "Delta & Lake Floor";
      if (site.name.includes("Olympia")) return "Circumpolar Erg";
      return "Mars";
    }
    return site.tag;
  };

  const getOfficialPortalLinks = (site: MockSite) => {
    const lat = site.coordinates.lat;
    const lng = site.coordinates.lng;

    if (site.body === "earth") {
      return [
        {
          label: "NASA Worldview (Satellite Near-Real-Time)",
          url: `https://worldview.earthdata.nasa.gov/?v=${lng - 4},${lat - 3},${lng + 4},${lat + 3}`,
          agency: "NASA",
        },
        {
          label: "NASA Earthdata Search (Science Catalog)",
          url: `https://search.earthdata.nasa.gov/search?q=${encodeURIComponent(site.name.split(":")[0])}`,
          agency: "NASA",
        },
        {
          label: "Copernicus Data Space (Sentinel-1 / Sentinel-2)",
          url: "https://dataspace.copernicus.eu/",
          agency: "ESA",
        },
        {
          label: "CSA RADARSAT (SAR Roughness Analysis)",
          url: "https://donnees-data.asc-csa.gc.ca/en/dataset/rcm",
          agency: "CSA",
        },
      ];
    } else if (site.body === "moon") {
      return [
        {
          label: "NASA LRO Diviner (Polar Temperatures & PSR)",
          url: "https://pds-geosciences.wustl.edu/missions/lro/diviner.htm",
          agency: "NASA",
        },
        {
          label: "NASA LRO Geosciences Node (Master Repository)",
          url: "https://pds-geosciences.wustl.edu/missions/lro/",
          agency: "NASA",
        },
        {
          label: "NASA Planetary Data System (PDS)",
          url: "https://pds.nasa.gov/",
          agency: "NASA",
        },
      ];
    } else {
      return [
        {
          label: "NASA Planetary Data System (PDS Mars)",
          url: "https://pds.nasa.gov/",
          agency: "NASA",
        },
        {
          label: "NASA Mars Trek (Interactive Mission Explorer)",
          url: "https://trek.nasa.gov/mars/",
          agency: "NASA",
        },
      ];
    }
  };

  return (
    <section id="maps" className="w-full bg-space-950 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Control Bar: Body selector + Tile API selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-space-900/90 border border-space-800 p-2.5 rounded-2xl backdrop-blur-md shadow-xl">
          {/* Celestial Body Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-xs font-mono text-slate-400 px-2 font-semibold uppercase hidden sm:inline">
              Body:
            </span>

            <button
              onClick={() => handleBodyChange("earth")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeTab === "earth"
                  ? "bg-earth-blue/25 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-space-850"
              }`}
            >
              <Globe className="h-4 w-4 text-cyan-400" />
              <span>Earth</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-space-950 text-cyan-300">
                3 cases
              </span>
            </button>

            <button
              onClick={() => handleBodyChange("moon")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeTab === "moon"
                  ? "bg-slate-700/50 text-slate-100 border border-slate-400/60 shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-space-850"
              }`}
            >
              <Moon className="h-4 w-4 text-slate-300" />
              <span>Moon</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-space-950 text-slate-300">
                2 targets
              </span>
            </button>

            <button
              onClick={() => handleBodyChange("mars")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                activeTab === "mars"
                  ? "bg-mars-rust/25 text-orange-300 border border-orange-500/50 shadow-md shadow-orange-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-space-850"
              }`}
            >
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Mars</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-space-950 text-orange-300">
                2 targets
              </span>
            </button>
          </div>

          {/* Right Toolbar: Map Tile API Selector + Live Coordinates */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tile Layer API Selector */}
            <div className="flex items-center gap-2 bg-space-950 border border-space-800 rounded-xl px-3 py-1.5">
              <Layers className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap hidden sm:inline">
                Basemap Layer:
              </span>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="bg-transparent text-xs text-slate-200 font-mono focus:outline-none cursor-pointer max-w-[220px] sm:max-w-none truncate"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id} className="bg-space-900 text-slate-200">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Coordinate HUD */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-space-950 border border-space-800 px-3 py-1.5 rounded-xl">
              <span className="text-cyan-400 font-semibold">Coord:</span>
              {hoverCoords ? (
                <span>
                  {Math.abs(hoverCoords.lat).toFixed(2)}°{hoverCoords.lat >= 0 ? "N" : "S"},{" "}
                  {Math.abs(hoverCoords.lng).toFixed(2)}°{hoverCoords.lng >= 0 ? "E" : "W"}
                </span>
              ) : (
                <span className="text-slate-500">Move cursor</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Workstation Layout: Map (Left/Center) + Integrated Side Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-2xl border border-space-800 bg-space-900/40 p-2 sm:p-3 shadow-2xl overflow-hidden">
          {/* Map Viewport (8 Cols on Desktop) */}
          <div className="lg:col-span-8 rounded-xl overflow-hidden border border-space-800/80 relative shadow-inner bg-space-950 flex flex-col">
            {/* Sub-header badge on map */}
            <div className="absolute top-3 left-3 z-[400] flex flex-col gap-1 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-space-950/90 border border-space-700 text-xs font-mono text-slate-200 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold uppercase tracking-wider">
                  {activeTab.toUpperCase()} — GIS EXPLORER
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm self-start">
                Source: {activeProvider.provider}
              </span>
            </div>

            {/* Live Leaflet Map Component */}
            <DynamicLeafletMap
              body={activeTab}
              sites={currentSites}
              selectedSite={selectedSite}
              onSelectSite={(site) => {
                setSelectedSite(site);
                setSidebarTab("detail");
              }}
              tileProvider={activeProvider}
              onHoverCoords={setHoverCoords}
            />

            {/* Bottom Map Status Bar */}
            <div className="p-2 bg-space-950/95 border-t border-space-850 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 px-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-semibold">{activeProvider.name}</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="hidden sm:inline text-slate-400">{activeProvider.notes}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden md:inline">Click any marker to inspect</span>
              </div>
            </div>
          </div>

          {/* Integrated Side Panel (4 Cols on Desktop) */}
          <div className="lg:col-span-4 rounded-xl border border-space-800 bg-space-950 flex flex-col justify-between overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="flex items-center border-b border-space-850 bg-space-900/60 p-1.5 gap-1">
              <button
                onClick={() => setSidebarTab("detail")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  sidebarTab === "detail"
                    ? "bg-space-850 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Site Details
              </button>
              <button
                onClick={() => setSidebarTab("list")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  sidebarTab === "list"
                    ? "bg-space-850 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sites ({currentSites.length})
              </button>
              <button
                onClick={() => setSidebarTab("resources")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  sidebarTab === "resources"
                    ? "bg-space-850 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Data Portals
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 max-h-[520px]">
              {sidebarTab === "resources" ? (
                /* Space Agency Portals Linked for this Body */
                <div className="space-y-3">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pb-1 border-b border-space-850">
                    <span>OFFICIAL DATA PORTALS:</span>
                    <span className="text-cyan-400 font-bold">{activeTab.toUpperCase()}</span>
                  </div>

                  {selectedSite && (
                    <div className="p-2.5 rounded-lg bg-space-900/70 border border-space-800 text-xs space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 block">
                        Selected Site:
                      </span>
                      <div className="font-bold text-white font-sans">{selectedSite.name}</div>
                      <div className="font-mono text-[11px] text-cyan-300">
                        {selectedSite.coordinates.formatted}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {selectedSite &&
                      getOfficialPortalLinks(selectedSite).map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-space-900/50 hover:bg-space-850 border border-space-800 hover:border-cyan-500/50 flex items-center justify-between gap-2 group transition-all"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-space-950 text-cyan-300 border border-space-800">
                              {link.agency}
                            </span>
                            <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                              {link.label}
                            </div>
                          </div>
                          <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-300 shrink-0" />
                        </a>
                      ))}
                  </div>

                  <p className="text-[10px] font-mono text-slate-500 pt-1">
                    * Direct access to open data archives from NASA, ESA, CSA, and USGS.
                  </p>
                </div>
              ) : sidebarTab === "list" ? (
                /* List of Sites View */
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pb-1">
                    <span>SELECT A SITE:</span>
                    <span className="text-cyan-400 font-mono text-[10px]">ANALOG CATALOG</span>
                  </div>

                  {currentSites.map((site) => {
                    const isSelected = selectedSite?.id === site.id;
                    const siteBadge = getCleanSiteBadge(site);

                    return (
                      <div
                        key={site.id}
                        onClick={() => {
                          setSelectedSite(site);
                          setSidebarTab("detail");
                        }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "bg-space-850 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/30"
                            : "bg-space-900/50 border-space-800 hover:border-space-700 hover:bg-space-850/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            {siteBadge}
                          </span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-space-700 bg-space-950 text-slate-300 font-medium">
                            {site.tag}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{site.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {site.shortDescription}
                        </p>
                        <div className="mt-2 pt-2 border-t border-space-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>{site.coordinates.formatted}</span>
                          <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                            View details <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : selectedSite ? (
                /* Detail Card View */
                <div className="space-y-4">
                  {/* Header info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-space-900 border border-space-700 text-cyan-300">
                          {getCleanSiteBadge(selectedSite)}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${bodyAccent.bgBadge}`}
                        >
                          {selectedSite.bodyLabel}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-space-700 bg-space-900 text-slate-300">
                        {selectedSite.tag}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-sans leading-snug">
                      {selectedSite.name}
                    </h3>
                  </div>

                  {/* Coordinates bar */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-space-900/90 border border-space-800 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className={`h-3.5 w-3.5 ${bodyAccent.color}`} />
                      <span>{selectedSite.coordinates.formatted}</span>
                    </div>
                    <button
                      onClick={handleCopyCoords}
                      className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Analog classification summary */}
                  <div className="p-3 rounded-xl bg-space-900/70 border border-space-800 space-y-1.5 text-xs">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      Analog Characterization:
                    </div>
                    <p className="text-slate-200 font-medium leading-relaxed">{selectedSite.simulatedAnalogType}</p>
                    <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
                      <span className="text-slate-400">Target Body:</span>
                      <span className="text-cyan-300 font-semibold">{selectedSite.targetTargetBody}</span>
                      <span className="text-slate-400">Illustrative score:</span>
                      <span className="font-bold text-emerald-300">{selectedSite.simulatedSimilarityIndex}</span>
                    </div>
                  </div>

                  {/* Parameters Table - Clean display without redundant status badges */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>PHYSICAL & ENVIRONMENTAL PARAMETERS</span>
                    </div>
                    <div className="rounded-lg border border-space-850 overflow-hidden bg-space-900/50">
                      <table className="w-full text-left text-[11px] font-mono">
                        <tbody className="divide-y divide-space-850">
                          {selectedSite.parameters.map((param) => (
                            <tr key={param.id} className="hover:bg-space-850/40">
                              <td className="p-2 text-slate-300">
                                <div className="font-medium text-slate-200">{param.name}</div>
                                {param.mockNotes && (
                                  <div className="text-[10px] text-slate-500 font-sans mt-0.5">{param.mockNotes}</div>
                                )}
                              </td>
                              <td className="p-2 text-slate-200 font-semibold whitespace-nowrap text-right">
                                {param.simulatedValue} <span className="text-slate-400 font-normal">{param.unit}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs font-mono text-slate-400">
                  Select a marker on the map to inspect its telemetry.
                </div>
              )}
            </div>

            {/* Sidebar Bottom Action */}
            {selectedSite && (
              <div className="p-3 border-t border-space-850 bg-space-950 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigateToComparison(selectedSite.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-space-950 font-mono font-bold text-xs transition-colors shadow-sm"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Open in Comparison Analysis</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
