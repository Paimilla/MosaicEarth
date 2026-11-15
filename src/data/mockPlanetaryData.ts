import { MockSite } from "@/types/planetary";

export const MOCK_SITES_EARTH: MockSite[] = [
  {
    id: "EARTH-01",
    name: "Case 1: Makgadikgadi Basin, Botswana",
    body: "earth",
    bodyLabel: "Earth",
    tag: "Subsurface Geophysics & Paleolakes",
    coordinates: {
      lat: -20.5333,
      lng: 25.4167,
      formatted: "20° 32' S, 25° 25' E",
    },
    simulatedAnalogType: "Paleolake stratigraphy, continuous GPR reflectors, and subsurface hypersaline brine",
    targetTargetBody: "Mars",
    simulatedSimilarityIndex: "90.2/100",
    shortDescription:
      "Vast Kalahari evaporitic basin evaluated with SRTM (0.78° slope), Sentinel-2 L2A multispectral data, 10 SEG-Y GPR profiles (30/50 MHz antennas), and 36,987 ERT resistivity soundings.",
    fullMockDescription:
      "Terrestrial analog site selected to investigate subsurface stratigraphy, sedimentary architectures, and ancient aqueous processes in fossil lacustrine basins. The survey includes 10 subsurface ground-penetrating radar (GPR) profiles acquired with rough-terrain 30 MHz and 50 MHz antennas, 36,987 electrical resistivity tomography (ERT) readings revealing deep hypersaline aquifers (< 1 Ω·m), calibrated field GPS topography matched against SRTM (median slope 0.78°), and Sentinel-2 L2A multispectral imagery (NDVI = 0.11), methodologically compared with rover observations at Jezero Crater.",
    terrainClassification: "Sedimentary basin paleolake, evaporite duricrusts, and desiccated mudflats",
    disclaimer:
      "Evaluated using SRTMGL1 (S21E024/025), Sentinel-2 L2A (Nov 12, 2026), ERT tomography, and SEG-Y GPR profiles from Makgadikgadi (Zenodo DOI: 10.5281/zenodo.22256874).",
    researchFocus:
      "Subsurface geology, lacustrine sedimentary sequences, evaporitic processes, and groundwater-controlled structural reflectors.",
    researchQuestion:
      "How can ground-penetrating radar (GPR) and ERT electrical resistivity observations from the Makgadikgadi Basin constrain the stratigraphic interpretation of subsurface radar reflections detected by RIMFAX at Jezero Crater?",
    earthDatasets: [
      "10 GPR profiles (SEG-Y) with 30 MHz and 50 MHz RTA antennas; ERT tomography Lines A & B (36,987 soundings, Zenodo DOI: 10.5281/zenodo.22256874)",
      "SRTM 30m Digital Elevation Models (S21E024 & S21E025, 12.9M cells each)",
      "Sentinel-2 L2A multispectral reflectance (B02-B12, NDVI=0.11, NDWI=-0.19)",
      "Differential field GPS topography (852 survey stations across profiles GPR06 and RM4)",
    ],
    planetaryDatasets: [
      "RIMFAX Ground-Penetrating Radar on Perseverance (10,505 active soundings on Sol 400, PDS urn:nasa:pds:mars2020_rimfax)",
      "Mars Orbiter Laser Altimeter (MOLA megt90n000eb, regional slope 0.85°)",
      "HiRISE DTM DTEEC_045994_1985 (1.01 m/px, 70.2M elevation points)",
      "CRISM spectral cube FRT000047A3 (489 spectral bands, Fe/Mg-smectites and carbonates)",
    ],
    instrumentComparison:
      "Methodological architectural comparison: Terrestrial GPR with 30/50 MHz antennas (vertical resolution ~0.67 m and ~0.40 m) matched structurally against RIMFAX Sol 400 soundings at Jezero Crater, contrasting continuous subhorizontal sedimentary facies with ~12° dipping reflectors in Séítah.",
    features: [
      "Median topographic slope (SRTM 30m): 0.78° (mean basin elevation: 912.4 m)",
      "Subsurface electrical resistivity (ERT): 0.67 to 0.95 Ω·m (36,987 soundings in Lines A & B)",
      "Sentinel-2 L2A surface reflectance: B04=0.248, B08=0.313, B11=0.452; NDVI=0.110",
      "GPR Stratigraphy: 10 SEG-Y profiles displaying continuous subhorizontal reflectors (v ≈ 0.085 m/ns)",
    ],
    parameters: [
      {
        id: "param-1",
        name: "Median Topographic Slope (SRTM)",
        simulatedValue: "0.78",
        unit: "degrees",
        mockNotes: "Calculated from 465 field GPS points cross-referenced with SRTM S21E024/025 tiles.",
      },
      {
        id: "param-2",
        name: "Median Subsurface Electrical Resistivity (ERT)",
        simulatedValue: "0.67 - 0.95",
        unit: "Ω·m",
        mockNotes: "Median log10 ρ: -0.17 to -0.02. Confirms deep confined hypersaline brine layer.",
      },
      {
        id: "param-3",
        name: "Vegetation & Aridity Index (NDVI)",
        simulatedValue: "0.110",
        unit: "dimensionless",
        mockNotes: "Sentinel-2 L2A over GPR06 profile: desiccated mineral ground without active vegetation.",
      },
      {
        id: "param-4",
        name: "GPR Antenna Frequencies & Resolution",
        simulatedValue: "30 & 50",
        unit: "MHz (res. 0.67 & 0.40 m)",
        mockNotes: "Profiles DELTA_GPR1-5 and GPR1-6 (RTA 30/50 MHz antennas, v ≈ 0.085 m/ns) across lacustrine basin.",
      },
    ],
  },
  {
    id: "EARTH-02",
    name: "Case 2: Salar de Pajonales, Chile",
    body: "earth",
    bodyLabel: "Earth",
    tag: "Evaporitic Sulfates & Biosignatures",
    coordinates: {
      lat: -25.1333,
      lng: -68.8167,
      formatted: "25° 08' S, 68° 49' W",
    },
    simulatedAnalogType: "Gypsum deposits, evaporitic sulfate crusts, and endolithic biosignature preservation",
    targetTargetBody: "Mars",
    simulatedSimilarityIndex: "91.5/100",
    shortDescription:
      "High-altitude Atacama salt flat with structural gypsum domes and endolithic microbial habitats, serving as an analog for Jezero and Olympia Undae sulfates.",
    fullMockDescription:
      "Hyperarid, high-UV solar radiation analog environment located in the Chilean Altiplano-Puna (~3,537 m ASL). Utilized to understand how calcium sulfate dihydrate (CaSO4·2H2O) crystalline micro-architectures protect endolithic microbial colonies and preserve molecular biosignatures in sulfate-rich Martian settings. Analytical sample data reveals gypsum stromatolites dominated by gypsum (~91% wt, <5% anhydrite) with water activity aw 0.39-0.86, contrasted with mixed salt crusts (~55% halite, 38% gypsum, aw 0.50-0.53).",
    terrainClassification: "Sulfate crusts, polygonal gypsum domes, and clay-rich evaporites",
    disclaimer:
      "Evaluated using SRTM 30m DEM (s26_w069_1arc_v3.tif), Sentinel-2 L2A multispectral bands, and in-situ geochemical/meteorological data from Frontiers in Astronomy (ATA17-08, DOI: 10.3389/fspas.2025.1693302).",
    researchFocus:
      "Gypsum deposits, evaporite environments, hydration-dehydration dynamics, and endolithic biosignature taphonomy.",
    researchQuestion:
      "How do gypsum crystal habits and endolithic microhabitats in Salar de Pajonales guide the robotic detection of biosignatures and hydrated sulfates at Jezero Crater and Olympia Undae?",
    earthDatasets: [
      "XRD mineralogy and water activity by sample (Frontiers in Astronomy DOI: 10.3389/fspas.2025.1693302, Tables S6–S9)",
      "In-situ meteorological time series from station ATA17-08 (RH median 20–45%, UV flux, air temperature)",
      "SRTM 30m Digital Elevation Model (s26_w069_1arc_v3.tif, 3,537 m ASL)",
      "Sentinel-2 L2A surface reflectance (B02-B12, 10-20 m resolution)",
      "Endolithic 16S rRNA gene sequencing and photosynthetic pigment assays (DDBJ PRJDB19570)",
    ],
    planetaryDatasets: [
      "CRISM spectral observations (polar targeted cube HRL000040FF over Olympia Undae gypsum dunes and FRT000047A3 at Jezero)",
      "OMEGA / Mars Express hydrated sulfate spectral cubes",
      "HiRISE DTM high-resolution terrain models of layered Martian sulfate sequences",
      "Perseverance rover in-situ astrobiological investigations (SHERLOC and PIXL instruments)",
    ],
    instrumentComparison:
      "Comparison with Jezero Crater layered sulfate-bearing units and the circumpolar Olympia Undae erg (pure gypsum dune field).",
    features: [
      "Sample-specific mineralogy: Stromatolites (~91% gypsum, <5% anhydrite); Crusts (~55% halite, 38% gypsum)",
      "In-situ microclimate: Median RH 20–45% with episodic saturation events; aw in microhabitats = 0.39–0.86",
      "Planetary target analogs: Olympia Undae gypsum erg and Jezero Crater layered sulfate sequences",
    ],
    parameters: [
      {
        id: "param-5",
        name: "Gypsum Abundance in Stromatolites (XRD)",
        simulatedValue: "~91",
        unit: "% wt",
        mockNotes: "X-ray diffraction (XRD) of specific gypsum stromatolite samples (Frontiers in Astronomy, 2026).",
      },
      {
        id: "param-6",
        name: "In-Situ Air Temperature Regime (ATA17-08)",
        simulatedValue: "-5.7 to 37.9 (mean 16.5)",
        unit: "°C",
        mockNotes: "Meteorological station ATA17-08 at 3,715 m ASL (2017–2020 record).",
      },
      {
        id: "param-7",
        name: "Median Basin Slope (SRTM 30m)",
        simulatedValue: "4.04",
        unit: "degrees",
        mockNotes: "Calculated across regional catchment from s26_w069_1arc_v3.tif (3601x3601).",
      },
    ],
  },
  {
    id: "EARTH-03",
    name: "Case 3: Amundsen–Scott South Pole Station, Antarctica",
    body: "earth",
    bodyLabel: "Earth",
    tag: "Polar Operations & Cryogenic Regime",
    coordinates: {
      lat: -90.0,
      lng: 0.0,
      formatted: "90° 00' S, 00° 00' E",
    },
    simulatedAnalogType: "Operational and logistical analog for permanent polar surface outposts",
    targetTargetBody: "Moon",
    simulatedSimilarityIndex: "86.7/100",
    shortDescription:
      "South Pole research outpost utilized to study closed-loop habitat architecture, cryogenic survival, and isolated logistics for the Lunar South Pole Artemis Base Camp.",
    fullMockDescription:
      "Operational and logistical analog rather than a direct petrological twin. Models the continuous human presence, life support challenges, overland supply lines, and extreme cryogenic isolation required to maintain long-duration outposts near the rim of Shackleton Crater and adjacent permanently shadowed regions (PSRs).",
    terrainClassification: "Polar ice plateau, firn ice, and sastrugi fields (AMRDC / NSF Polar Programs)",
    disclaimer:
      "Evaluated using 59 weeks of continuous AMRDC meteorological records (2019–2026, DOI: 10.48567/vcma-jv23), historical surface data 1957–2007 (DOI: 10.48567/r6wy-as19), SPoT traverse data (1,600 km), and LRO Diviner.",
    researchFocus:
      "Polar research station operations, extreme cryogenic environments, life-support infrastructure, and sustained human activity.",
    researchQuestion:
      "What operational, logistical, and life-support principles proven through decades of continuous winter-over isolation at Amundsen–Scott directly inform the design of permanent lunar south polar bases?",
    earthDatasets: [
      "Continuous weekly meteorological summaries from Amundsen–Scott (59 weeks, AMRDC DOI: 10.48567/vcma-jv23)",
      "Historical surface meteorological observations 1957–2007 (AMRDC DOI: 10.48567/r6wy-as19)",
      "Reference Elevation Model of Antarctica (REMA 2m DEM) and plateau sastrugi surveys",
      "NSF Polar Programs life-support, fuel logistics, and electrical generation technical documentation",
      "South Pole Overland Traverse (SPoT) heavy logistics data (1,600 km traverse from McMurdo Station)",
    ],
    planetaryDatasets: [
      "LRO Diviner: Surface radiometric brightness maps and PSR cold traps (< 40 K)",
      "LOLA: Laser altimetry, slope maps, and polar roughness (Shackleton Site 04, 5 m/px DEM)",
      "LROC: High-resolution imaging of quasi-permanent illumination ridges and permanent shadows",
      "LEND and Mini-RF: Volatile hydrogen mapping and subsurface radar ice detection",
    ],
    instrumentComparison:
      "Operational comparison with the Lunar South Pole (Artemis Base Camp): extreme thermal isolation, extended solar blackout periods, and resupply logistical lifelines.",
    features: [
      "Annual thermal range (2019–2026): -73.1 °C to -19.3 °C (mean -46.8 °C; record low -82.8 °C)",
      "Logistical resupply traverse: ~1,600 km overland heavy snow tractors (SPoT)",
      "Analog focus: Pressurized modular habitats, uninterrupted microgrid power, and ECLSS life support",
    ],
    parameters: [
      {
        id: "param-8",
        name: "Annual Mean Surface Temperature (AMRDC)",
        simulatedValue: "-46.8 (min -73.1)",
        unit: "°C",
        mockNotes: "Derived from 59 continuous weekly summary archives (DOI: 10.48567/vcma-jv23).",
      },
      {
        id: "param-9",
        name: "Winter Logistical Isolation Period",
        simulatedValue: "8.5",
        unit: "months closed",
        mockNotes: "Full winter-over crew of ~42 personnel without aerial ingress or medical evacuation capability.",
      },
      {
        id: "param-10",
        name: "Mean Surface Atmospheric Pressure",
        simulatedValue: "682.2 (range 658.7 - 701.8)",
        unit: "mb",
        mockNotes: "Station barometric pressure at 2,835 m ASL (physiological altitude equivalent: 3,162 m).",
      },
    ],
  },
];

export const MOCK_SITES_MOON: MockSite[] = [
  {
    id: "MOON-01",
    name: "Lunar South Pole: Shackleton Crater Rim",
    body: "moon",
    bodyLabel: "Moon",
    tag: "Cryogenic Cold Traps & Illumination Ridges",
    coordinates: {
      lat: -89.54,
      lng: 0.0,
      formatted: "89° 32' S, 00° 00' E",
    },
    simulatedAnalogType: "Quasi-permanently illuminated peak adjacent to volatile-bearing cold traps",
    targetTargetBody: "Moon",
    simulatedSimilarityIndex: "86.7/100",
    shortDescription:
      "Prime candidate landing site for permanent lunar infrastructure (Artemis Base Camp), evaluated with LOLA 5 m/px DEM and Diviner PSR thermometry.",
    fullMockDescription:
      "High-priority lunar south pole target site paired with Case 3 (Amundsen–Scott Station). Evaluated with NASA LOLA 5 m/px orbital laser altimetry (Site 04, 3200×3200 elevation grid) and extreme cryogenic thermal radiometry from LRO Diviner (< 40 K within shadowed crater interior).",
    terrainClassification: "Polar anorthositic regolith and steep impact crater inner walls (LOLA Site 04)",
    disclaimer:
      "Evaluated using LOLA 5 m/px polar DEM (Site04_final_adj_5mpp_surf.tif, Barker et al., 2021) and LRO Diviner RDR thermal observations.",
    features: [
      "Illumination on ridge peaks: ~86% of the annual lunar cycle (LROC)",
      "PSR cold trap minimum temperature: < 40 K (-233 °C) measured by LRO Diviner",
      "Total vertical topographic relief: 4,651.5 m from rim crest to crater floor (LOLA Site 04)",
      "Terrestrial operational analog: Case 3 (Amundsen–Scott South Pole Station, Antarctica)",
    ],
    parameters: [
      {
        id: "param-l1",
        name: "Minimum Temperature in PSR Cold Trap (Diviner)",
        simulatedValue: "-233",
        unit: "°C (40 K)",
        mockNotes: "Calibrated radiometric observations from NASA LRO Diviner RDR.",
      },
      {
        id: "param-l2",
        name: "Topographic Elevation Relief (LOLA 5m)",
        simulatedValue: "4,651.5 (-2846.5 to +1805.0)",
        unit: "meters",
        mockNotes: "Calculated across Site04_final_adj_5mpp_surf.tif (3200x3200 grid).",
      },
      {
        id: "param-l3",
        name: "Median Slope on Rim and Wall Facets (LOLA)",
        simulatedValue: "20.43 (max 43.12)",
        unit: "degrees",
        mockNotes: "Derived from high-resolution LOLA slope modeling across Shackleton Site 04.",
      },
    ],
  },
  {
    id: "MOON-02",
    name: "Mare Tranquillitatis: Basaltic Skylight Pit",
    body: "moon",
    bodyLabel: "Moon",
    tag: "Subsurface Lava Tube Cavities",
    coordinates: {
      lat: 8.335,
      lng: 33.222,
      formatted: "08° 20' N, 33° 13' E",
    },
    simulatedAnalogType: "Collapsed basaltic lava tube conduit and protected subsurface cavern",
    targetTargetBody: "Moon",
    simulatedSimilarityIndex: "84.0/100",
    shortDescription:
      "88×100 m collapse pit with 105 m vertical depth in mare basalt (LROC NAC M144255986R), candidate site for shielded underground human habitats.",
    fullMockDescription:
      "Prominent lunar collapse pit in Mare Tranquillitatis imaged at sub-meter resolution by LROC NAC (observation M144255986R; Wagner & Robinson, 2014). Exhibits an 88 × 100 m elliptical aperture with near-vertical 105 m walls opening into a sub-basaltic subsurface void. Thermal radiometry from LRO Diviner (Horvath et al., 2022) indicates a stable interior temperature of ~17 °C (290 K), thermally decoupled from the severe lunar surface diurnal swings (-130 °C to +120 °C) and shielded from cosmic radiation.",
    terrainClassification: "High-titanium basaltic flows and subsurface lava tube voids (NASA LRO)",
    disclaimer:
      "Evaluated using LROC NAC geometric measurements (M144255986R) and LRO Diviner stable interior thermal modeling (~17 °C).",
    features: [
      "Aperture dimensions: 88 × 100 m elliptical collapse (LROC NAC)",
      "Vertical collapse depth: 105 m (LOLA / shadow geometry)",
      "Interior thermal stability: ~17 °C (290 K constant, LRO Diviner)",
      "Natural shielding: Continuous protection from galactic cosmic rays and micrometeoroids",
    ],
    parameters: [
      {
        id: "param-l4",
        name: "Skylight Aperture Dimensions (LROC NAC)",
        simulatedValue: "88 x 100",
        unit: "meters",
        mockNotes: "Measured from LROC observation M144255986R (Wagner & Robinson, 2014).",
      },
      {
        id: "param-l5",
        name: "Vertical Pit Depth to Floor",
        simulatedValue: "105",
        unit: "meters",
        mockNotes: "Derived from shadow length analysis and LOLA altimetry profiles.",
      },
      {
        id: "param-l6",
        name: "Stable Interior Cavern Temperature (Diviner)",
        simulatedValue: "~17 (290 K)",
        unit: "°C",
        mockNotes: "Horvath et al., 2022; thermally buffered underground cavity.",
      },
    ],
  },
];

export const MOCK_SITES_MARS: MockSite[] = [
  {
    id: "MARS-01",
    name: "Jezero Crater: River Delta & Sedimentary Fan",
    body: "mars",
    bodyLabel: "Mars",
    tag: "Lacustrine Stratigraphy & Subsurface Radar",
    coordinates: {
      lat: 18.38,
      lng: 77.58,
      formatted: "18° 23' N, 77° 35' E",
    },
    simulatedAnalogType: "Paleolake sedimentary sequence, river delta fan, and RIMFAX radar profile",
    targetTargetBody: "Mars",
    simulatedSimilarityIndex: "90.2/100",
    shortDescription:
      "Mars 2020 Perseverance landing site evaluated with regional MOLA altimetry (0.85° slope), HiRISE DTM (1.01 m/px), CRISM spectrometry, and RIMFAX Sol 400 radar.",
    fullMockDescription:
      "Primary Martian target for Case 1 (Makgadikgadi Basin). Analyzed through coordinated orbital and rover datasets: regional MOLA topography (-2586.6 m mean elevation, 0.85° regional slope), micro-topographic HiRISE DTM (70.2M pixels), CRISM FRT000047A3 spectrometry (Fe/Mg phyllosilicates and carbonates), and 10,505 active subsurface radar soundings from RIMFAX on Sol 400 (PDS urn:nasa:pds:mars2020_rimfax).",
    terrainClassification: "Lacustrine sedimentary strata, fluvial delta deposits, and aeolian regolith",
    disclaimer:
      "Evaluated using MOLA megt90n000eb, HiRISE DTM DTEEC_045994_1985, CRISM FRT000047A3, and RIMFAX Sol 400 calibrated data.",
    features: [
      "Regional topographic slope (MOLA 3x3 window): 0.85° (mean elevation -2586.6 m)",
      "HiRISE DTM Jezero: 70.2 million elevation cells at 1.01 m/px (-2679 to -2388 m)",
      "CRISM FRT000047A3: 489 channels and 4,401 spatial pixels across Sol 400 traverse",
      "RIMFAX Sol 400 profile: 10,505 active soundings at 18.462°N, 77.436°E (Sols 400–566 Séítah)",
    ],
    parameters: [
      {
        id: "param-m1",
        name: "Regional Topographic Slope (MOLA)",
        simulatedValue: "0.85",
        unit: "degrees",
        mockNotes: "Median computed over a 3x3 window of product megt90n000eb (16 px/°).",
      },
      {
        id: "param-m2",
        name: "Spatial Resolution of HiRISE DTM",
        simulatedValue: "1.0097",
        unit: "m/pixel",
        mockNotes: "DTM DTEEC_045994_1985 with Mars 2000 coordinate datum.",
      },
      {
        id: "param-m3",
        name: "Active RIMFAX Radar Soundings (Sol 400)",
        simulatedValue: "10,505",
        unit: "traces",
        mockNotes: "149.7M samples analyzed; time sweep 49 to 1162 ns (PDS urn:nasa:pds:mars2020_rimfax).",
      },
      {
        id: "param-m4",
        name: "Hyperspectral Channels (CRISM MTRDR)",
        simulatedValue: "489",
        unit: "bands",
        mockNotes: "Corrected cube FRT000047A3 (18 m/px, Western Delta).",
      },
    ],
  },
  {
    id: "MARS-02",
    name: "Olympia Undae: Circumpolar Gypsum Erg",
    body: "mars",
    bodyLabel: "Mars",
    tag: "Aeolian Hydrated Sulfate Dunes",
    coordinates: {
      lat: 80.5,
      lng: -175.0,
      formatted: "80° 30' N, 175° 00' W",
    },
    simulatedAnalogType: "Aeolian sand sea composed of calcium sulfate dihydrate (Gypsum)",
    targetTargetBody: "Mars",
    simulatedSimilarityIndex: "91.5/100",
    shortDescription:
      "Vast circumpolar gypsum dune field (470,000 km²) exhibiting diagnostic SWIR absorption bands at 1.4, 1.93, and 2.2 µm confirmed by CRISM HRL000040FF and OMEGA.",
    fullMockDescription:
      "The largest continuous hydrated sulfate reservoir on Mars, identified in the north polar erg of Olympia Undae by the OMEGA imaging spectrometer (Mars Express; Langevin et al., 2005) and characterized in high resolution by MRO CRISM (targeted polar cube HRL000040FF; Roach et al., 2010). The dune sands show characteristic absorption signatures of gypsum (CaSO4·2H2O) with sharp absorption minima at 1.4 µm, 1.93 µm, and 2.2 µm. Serves as the planetary counterpart to Case 2 (Salar de Pajonales, Chile) for modeling sulfate chemical stability and biosignature preservation.",
    terrainClassification: "Hydrated calcium sulfate aeolian erg and polar cryosphere boundary",
    disclaimer:
      "Evaluated using MRO CRISM targeted cube HRL000040FF and Mars Express OMEGA spectral observations.",
    features: [
      "Dune mineral composition: Calcium sulfate dihydrate (Gypsum) confirmed by CRISM & OMEGA",
      "Analog geological processes: Aeolian saltation, transport, and long-term sulfate preservation in hyperaridity",
      "Diagnostic absorption bands: 1.4 µm, 1.93 µm, and 2.2 µm (structural crystal-lattice H2O)",
      "Terrestrial analog counterpart: Case 2 (Salar de Pajonales, gypsum domes and stromatolites)",
    ],
    parameters: [
      {
        id: "param-m5",
        name: "Areal Extent of Gypsum Dune Field",
        simulatedValue: "470,000",
        unit: "km²",
        mockNotes: "Circumpolar sand sea surrounding Planum Boreum.",
      },
      {
        id: "param-m6",
        name: "Estimated Gypsum Purity (CRISM / OMEGA)",
        simulatedValue: "50 to 65",
        unit: "% sulfate in sand",
        mockNotes: "Volumetric mineral fraction derived from radiative transfer modeling (Roach et al., 2010).",
      },
      {
        id: "param-m7",
        name: "Diagnostic SWIR Hydration Bands",
        simulatedValue: "1.4, 1.93 & 2.2",
        unit: "µm",
        mockNotes: "Bound structural water in CaSO4·2H2O lattice matching Salar de Pajonales.",
      },
    ],
  },
];

export const ALL_MOCK_SITES: Record<"earth" | "moon" | "mars", MockSite[]> = {
  earth: MOCK_SITES_EARTH,
  moon: MOCK_SITES_MOON,
  mars: MOCK_SITES_MARS,
};
