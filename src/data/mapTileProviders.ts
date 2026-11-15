export interface TileProvider {
  id: string;
  name: string;
  provider: string;
  url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string[];
  isRealApi: boolean;
  notes: string;
}

export const PLANETARY_TILE_PROVIDERS: Record<"earth" | "moon" | "mars", TileProvider[]> = {
  earth: [
    {
      id: "esri-sat",
      name: "Esri World Imagery (Satellite)",
      provider: "Esri / Maxar / Earthstar",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP",
      maxZoom: 18,
      isRealApi: true,
      notes: "High-resolution real-time optical satellite imagery.",
    },
    {
      id: "osm",
      name: "OpenStreetMap Standard",
      provider: "OpenStreetMap Contributors",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
      subdomains: ["a", "b", "c"],
      isRealApi: true,
      notes: "Global open topographic basemap with topographic contours and place names.",
    },
  ],
  moon: [
    {
      id: "opm-moon",
      name: "OpenPlanetary Moon Basemap (LROC)",
      provider: "OpenPlanetary / NASA LROC / USGS",
      url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-moon-basemap-v0-1/all/{z}/{x}/{y}.png",
      attribution: "Map &copy; OpenPlanetary | Imagery: NASA LROC, USGS Astrogeology",
      maxZoom: 8,
      isRealApi: true,
      notes: "LRO WAC morphological mosaic optimized for Leaflet Web Mercator clients.",
    },
    {
      id: "nasa-moon-trek",
      name: "NASA Moon Trek (LRO Global Mosaic)",
      provider: "NASA Solar System Treks",
      url: "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      attribution: "NASA / GSFC / Arizona State University / JPL",
      maxZoom: 7,
      isRealApi: true,
      notes: "Official NASA Solar System Treks WMTS tile service for the Moon.",
    },
  ],
  mars: [
    {
      id: "nasa-mars-viking",
      name: "NASA Mars Trek (Viking MDIM21 Mosaic)",
      provider: "NASA Mars Trek / USGS",
      url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      attribution: "NASA / JPL / USGS Astrogeology",
      maxZoom: 7,
      isRealApi: true,
      notes: "Georeferenced true-color global mosaic compiled from NASA Viking orbiter missions.",
    },
    {
      id: "nasa-mars-mola",
      name: "NASA Mars MOLA (Hypsometric Relief)",
      provider: "NASA Solar System Treks",
      url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
      attribution: "NASA / MGS / MOLA Science Team",
      maxZoom: 7,
      isRealApi: true,
      notes: "Color-coded shaded relief map derived from the Mars Global Surveyor laser altimeter.",
    },
    {
      id: "opm-mars",
      name: "OpenPlanetary Mars Basemap (MOLA)",
      provider: "OpenPlanetary / NASA MOLA / USGS",
      url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png",
      attribution: "Map &copy; OpenPlanetary | Imagery: NASA MOLA, USGS Astrogeology",
      maxZoom: 8,
      isRealApi: true,
      notes: "Global mosaic integrating MOLA laser topography with calibrated Martian surface albedo.",
    },
  ],
};
