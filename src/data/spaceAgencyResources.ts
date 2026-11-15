export interface AgencyResource {
  id: string;
  agency: "NASA" | "CSA" | "ESA" | "JAXA";
  agencyFullName: string;
  targetScope: "Earth" | "Moon" | "Mars" | "Moon & Mars" | "Global";
  title: string;
  url: string;
  category: "Search Portal" | "Interactive Viewer" | "Scientific Archive" | "Mission Archive" | "Tutorial & Code";
  description: string;
  analogRelevance: string;
}

export const SPACE_AGENCY_RESOURCES: AgencyResource[] = [
  // NASA - Earth
  {
    id: "nasa-earthdata",
    agency: "NASA",
    agencyFullName: "National Aeronautics and Space Administration",
    targetScope: "Earth",
    title: "NASA Earthdata Search",
    url: "https://search.earthdata.nasa.gov/",
    category: "Search Portal",
    description:
      "NASA's primary search portal to discover, filter, and access multi-mission Earth science data across diverse spectral wavelengths.",
    analogRelevance:
      "Large-scale search for thermal grids, ASTER GDEM elevation, and environmental parameters across hyperarid deserts and polar analogs.",
  },
  {
    id: "nasa-worldview",
    agency: "NASA",
    agencyFullName: "National Aeronautics and Space Administration",
    targetScope: "Earth",
    title: "NASA Worldview",
    url: "https://worldview.earthdata.nasa.gov/",
    category: "Interactive Viewer",
    description:
      "Interactive map interface for exploring full-resolution, near-real-time satellite imagery and global geophysical observations.",
    analogRelevance:
      "Visual verification of snow/ice cover dynamics, desert dust storm activity, and surface albedo over planetary analog field sites.",
  },

  // NASA - Moon & Mars
  {
    id: "nasa-pds",
    agency: "NASA",
    agencyFullName: "National Aeronautics and Space Administration",
    targetScope: "Moon & Mars",
    title: "NASA Planetary Data System (PDS)",
    url: "https://pds.nasa.gov/",
    category: "Scientific Archive",
    description:
      "The official primary archive for all NASA planetary science mission observations, lander records, rover telemetry, and orbital remote sensing.",
    analogRelevance:
      "Direct access to calibrated imaging, cartography, geosciences, radar soundings (RIMFAX), and spectrometry across Moon and Mars targets.",
  },
  {
    id: "nasa-lro",
    agency: "NASA",
    agencyFullName: "National Aeronautics and Space Administration",
    targetScope: "Moon",
    title: "NASA Lunar Reconnaissance Orbiter (LRO)",
    url: "https://pds-geosciences.wustl.edu/missions/lro/",
    category: "Mission Archive",
    description:
      "Master repository for LRO instruments including LROC imaging, LOLA laser altimetry, Diviner radiometry, LEND neutron spectrometry, and Mini-RF radar.",
    analogRelevance:
      "Surface roughness modeling (LOLA), sub-meter morphological imaging (LROC), and hydrogen/volatile prospecting (LEND) near the lunar poles.",
  },
  {
    id: "nasa-lro-diviner",
    agency: "NASA",
    agencyFullName: "National Aeronautics and Space Administration",
    targetScope: "Moon",
    title: "NASA LRO Diviner Lunar Data",
    url: "https://pds-geosciences.wustl.edu/missions/lro/diviner.htm",
    category: "Mission Archive",
    description:
      "Multichannel infrared radiometer mapping lunar surface temperatures, diurnal thermal inertia, and permanently shadowed cold traps.",
    analogRelevance:
      "Cross-comparison of cryogenic lunar polar temperatures (< 40 K) against extreme terrestrial polar outposts (Amundsen–Scott Station).",
  },

  // CSA (Canadian Space Agency)
  {
    id: "csa-rcm",
    agency: "CSA",
    agencyFullName: "Canadian Space Agency / Agence spatiale canadienne",
    targetScope: "Earth",
    title: "RADARSAT Constellation Mission (RCM)",
    url: "https://donnees-data.asc-csa.gc.ca/en/dataset/rcm",
    category: "Search Portal",
    description:
      "Three-satellite synthetic aperture radar (SAR) constellation providing day-and-night C-band radar imaging through all atmospheric conditions.",
    analogRelevance:
      "Centimeter-scale surface roughness mapping, ice-sheet dynamics, and terrain deformation monitoring in Arctic and permafrost analog environments.",
  },
  {
    id: "csa-radarsat1",
    agency: "CSA",
    agencyFullName: "Canadian Space Agency / Agence spatiale canadienne",
    targetScope: "Earth",
    title: "RADARSAT-1 Open Data Archive",
    url: "https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1",
    category: "Scientific Archive",
    description:
      "Historical open microwave SAR repository capturing global radar imagery through cloud cover, smoke, and polar winter nights.",
    analogRelevance:
      "Time-series baseline for microwave penetration in dry sand and permafrost, informing subsurface structural radar models.",
  },
  {
    id: "csa-sar-tutorial",
    agency: "CSA",
    agencyFullName: "Canadian Space Agency",
    targetScope: "Earth",
    title: "Synthetic Aperture Radar (SAR) Python Tutorial",
    url: "https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial",
    category: "Tutorial & Code",
    description:
      "Official open-source guide for processing, speckle filtering, and geocoding SAR imagery using open scientific Python and QGIS pipelines.",
    analogRelevance:
      "Methodological guide for the MOSAIC software pipeline in estimating soil roughness and microwave dielectric properties.",
  },

  // ESA (European Space Agency)
  {
    id: "esa-copernicus",
    agency: "ESA",
    agencyFullName: "European Space Agency",
    targetScope: "Earth",
    title: "Copernicus Data Space Ecosystem",
    url: "https://dataspace.copernicus.eu/",
    category: "Search Portal",
    description:
      "Open access to Sentinel satellite constellations (Sentinel-1 SAR, Sentinel-2 optical, Sentinel-3 thermal) with cloud-native processing APIs.",
    analogRelevance:
      "Multispectral identification of phyllosilicates, zero-vegetation arid ground verification, and thermal profile modeling across analog sites.",
  },
  {
    id: "esa-open-science",
    agency: "ESA",
    agencyFullName: "European Space Agency",
    targetScope: "Global",
    title: "ESA Open Science Catalog",
    url: "https://opensciencedata.esa.int/",
    category: "Scientific Archive",
    description:
      "Public catalog of peer-reviewed geoscientific datasets, cross-agency experiments, and reproducible open-science analysis workflows.",
    analogRelevance:
      "Validation of analytical methodologies and open algorithms for topographic cross-correlation and spectral unmixing.",
  },

  // JAXA (Japan Aerospace Exploration Agency)
  {
    id: "jaxa-gportal",
    agency: "JAXA",
    agencyFullName: "Japan Aerospace Exploration Agency",
    targetScope: "Earth",
    title: "JAXA G-Portal",
    url: "https://gportal.jaxa.jp/gpr/",
    category: "Search Portal",
    description:
      "Earth observation portal providing access to Japanese satellite missions (GCOM-C, GCOM-W, ALOS, GPM) classified by geophysical variables.",
    analogRelevance:
      "Land surface temperature (LST), global precipitation patterns, and soil moisture measurements across extreme arid study sites.",
  },
];
