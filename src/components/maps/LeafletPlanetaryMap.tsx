"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { CelestialBody, MockSite } from "@/types/planetary";
import { TileProvider } from "@/data/mapTileProviders";

interface LeafletPlanetaryMapProps {
  body: CelestialBody;
  sites: MockSite[];
  selectedSite: MockSite | null;
  onSelectSite: (site: MockSite) => void;
  tileProvider: TileProvider;
  onHoverCoords: (coords: { lat: number; lng: number } | null) => void;
}

export default function LeafletPlanetaryMap({
  body,
  sites,
  selectedSite,
  onSelectSite,
  tileProvider,
  onHoverCoords,
}: LeafletPlanetaryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [tileLoadError, setTileLoadError] = useState(false);

  // Helper to project polar latitudes safely within Web Mercator bounds (-85° to +85°)
  const getRenderCoordinates = (lat: number, lng: number): [number, number] => {
    const clampedLat = Math.max(-84.0, Math.min(84.0, lat));
    return [clampedLat, lng];
  };

  // Helper to get clean display label for markers
  const getMarkerLabel = (site: MockSite): string => {
    if (site.body === "earth") {
      if (site.name.includes("1") || site.name.includes("Makgadikgadi")) return "CASE 1";
      if (site.name.includes("2") || site.name.includes("Pajonales")) return "CASE 2";
      if (site.name.includes("3") || site.name.includes("Amundsen")) return "CASE 3";
      return "EARTH";
    }
    if (site.body === "moon") {
      if (site.name.includes("Shackleton")) return "SHACKLETON";
      if (site.name.includes("Tranquillitatis")) return "TRANQUILLITATIS";
      return "MOON";
    }
    if (site.body === "mars") {
      if (site.name.includes("Jezero")) return "JEZERO";
      if (site.name.includes("Olympia")) return "OLYMPIA UNDAE";
      return "MARS";
    }
    return site.name.slice(0, 12).toUpperCase();
  };

  // Initialize map once per celestial body
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialCenters: Record<CelestialBody, [number, number]> = {
      earth: [10, 10],
      moon: [0, 0],
      mars: [20, 0],
    };

    const initialZooms: Record<CelestialBody, number> = {
      earth: 2,
      moon: 2,
      mars: 2,
    };

    const map = L.map(mapContainerRef.current, {
      center: initialCenters[body],
      zoom: initialZooms[body],
      minZoom: 1,
      maxZoom: tileProvider.maxZoom || 18,
      zoomControl: false,
      attributionControl: true,
      worldCopyJump: true,
      maxBounds: [
        [-86, -185],
        [86, 185],
      ],
      maxBoundsViscosity: 0.7,
    });

    L.control.zoom({ position: "topright" }).addTo(map);

    map.on("mousemove", (e: L.LeafletMouseEvent) => {
      onHoverCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    map.on("mouseout", () => {
      onHoverCoords(null);
    });

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [body]);

  // Update tile layer when provider changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setTileLoadError(false);

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    try {
      const newTileLayer = L.tileLayer(tileProvider.url, {
        attribution: tileProvider.attribution,
        maxZoom: tileProvider.maxZoom || 18,
        subdomains: tileProvider.subdomains || ["a", "b", "c"],
        noWrap: false,
      });

      newTileLayer.on("tileerror", () => {
        setTileLoadError(true);
      });

      newTileLayer.addTo(map);
      tileLayerRef.current = newTileLayer;
    } catch {
      setTileLoadError(true);
    }
  }, [tileProvider]);

  // Update markers when sites or selectedSite changes
  useEffect(() => {
    const markersGroup = markersLayerRef.current;
    if (!markersGroup) return;

    markersGroup.clearLayers();

    sites.forEach((site) => {
      const isSelected = selectedSite?.id === site.id;
      const markerLabel = getMarkerLabel(site);
      const renderCoords = getRenderCoordinates(site.coordinates.lat, site.coordinates.lng);

      const accentColor =
        body === "earth"
          ? "#00d2ff"
          : body === "moon"
            ? "#e2e8f0"
            : "#ff6b4a";

      const haloColor =
        body === "earth"
          ? "rgba(0, 210, 255, 0.45)"
          : body === "moon"
            ? "rgba(226, 232, 240, 0.45)"
            : "rgba(255, 107, 74, 0.45)";

      const customIcon = L.divIcon({
        className: "custom-planetary-marker",
        iconSize: [90, 52],
        iconAnchor: [45, 38],
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; position: relative;">
            <div style="
              background: rgba(6, 8, 14, 0.95);
              border: 1px solid ${isSelected ? accentColor : "#334155"};
              border-radius: 4px;
              padding: 2px 7px;
              font-family: monospace;
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 0.05em;
              color: ${isSelected ? "#ffffff" : accentColor};
              box-shadow: 0 4px 12px rgba(0,0,0,0.85);
              white-space: nowrap;
              margin-bottom: 3px;
            ">
              ${markerLabel}
            </div>

            <div style="position: relative; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
              <div style="
                position: absolute;
                width: ${isSelected ? "26px" : "18px"};
                height: ${isSelected ? "26px" : "18px"};
                border-radius: 50%;
                background: ${haloColor};
                animation: ${isSelected ? "pulse 1.5s infinite" : "none"};
              "></div>
              <div style="
                width: ${isSelected ? "13px" : "10px"};
                height: ${isSelected ? "13px" : "10px"};
                border-radius: 50%;
                background: ${isSelected ? "#ffffff" : accentColor};
                border: 2px solid #06080e;
                box-shadow: 0 0 12px ${accentColor};
              "></div>
            </div>
          </div>
        `,
      });

      const marker = L.marker(renderCoords, {
        icon: customIcon,
      });

      marker.on("click", () => {
        onSelectSite(site);
      });

      marker.bindTooltip(
        `<div style="font-family: monospace; font-size: 11px;">
           <strong style="color: #ffffff;">${site.name}</strong><br/>
           <span style="color: #94a3b8; font-size: 10px;">${site.coordinates.formatted}</span>
         </div>`,
        {
          direction: "top",
          offset: [0, -28],
          className: "bg-space-950 text-white border border-space-700 font-mono text-xs p-2 rounded-lg shadow-2xl",
        }
      );

      marker.addTo(markersGroup);
    });
  }, [sites, selectedSite, body, onSelectSite]);

  // Center on selected site if clicked
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedSite) return;

    const renderCoords = getRenderCoordinates(selectedSite.coordinates.lat, selectedSite.coordinates.lng);
    map.flyTo(renderCoords, Math.max(map.getZoom(), 4), {
      duration: 1.2,
    });
  }, [selectedSite]);

  return (
    <div className="relative w-full h-full min-h-[500px] sm:min-h-[620px] bg-space-950">
      <div ref={mapContainerRef} className="w-full h-full min-h-[500px] sm:min-h-[620px]" />

      {/* Fallback notification if tile service network is blocked or slow */}
      {tileLoadError && (
        <div className="absolute bottom-10 left-4 z-[500] max-w-sm p-3 rounded-lg bg-slate-900/95 border border-amber-500/50 text-slate-200 text-xs font-mono backdrop-blur-md shadow-xl">
          <div className="font-bold uppercase tracking-wider text-[11px] text-amber-300 mb-1">
            Basemap Tile Service Notice
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            The external tile service is slow or restricted by the local network. You can switch to another basemap layer using the &quot;Map Provider&quot; menu.
          </p>
        </div>
      )}
    </div>
  );
}
