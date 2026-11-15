import { MockComparisonItem } from "@/types/planetary";
import { SCIENTIFIC_MASTER_VARIABLES } from "./scientificVariableMatrix";

export const MOCK_COMPARISONS: MockComparisonItem[] = [
  {
    id: "CASE-01",
    caseNumber: 1,
    earthSiteId: "EARTH-01", // Makgadikgadi Basin
    targetSiteId: "MARS-01", // Jezero Crater
    targetBody: "Mars",
    title: "Case 1: Makgadikgadi Basin, Botswana ↔ Mars (Jezero Crater)",
    analogFocus:
      "Subsurface geology, shallow lacustrine sedimentary sequences, evaporitic processes, and closed-basin stratigraphic architecture.",
    researchQuestion:
      "How can ground-penetrating radar (GPR) and electrical resistivity tomography (ERT) observations from the Makgadikgadi Basin guide the stratigraphic interpretation of subsurface radar reflections detected by RIMFAX at Jezero Crater?",
    earthDatasets: [
      "Subsurface Ground-Penetrating Radar observations (profiles DELTA_GPR1-5 and GPR1-6, RTA 30 MHz & 50 MHz antennas, Zenodo DOI: 10.5281/zenodo.22256874)",
      "Electrical Resistivity Tomography (ERT Lines A & B, 10 m electrode spacing, confined hypersaline aquifer < 1 Ω·m)",
      "SRTM 30m Digital Elevation Models (SRTMGL1 S21E024 and S21E025)",
      "Sentinel-2 L2A multispectral surface reflectance (Nov 12, 2026, bands B02-B12, NDVI=0.11)",
      "Geological mapping of fossil paleolakes and evaporitic calcrete horizons",
    ],
    planetaryDatasets: [
      "RIMFAX Ground-Penetrating Radar on Mars 2020 Perseverance (PDS urn:nasa:pds:mars2020_rimfax:data_calibrated_csv, Sol 400)",
      "Mars Orbiter Laser Altimeter (MOLA MEGDR megt90n000eb) and stereo HiRISE DTM DTEEC_045994_1985",
      "High-resolution HiRISE (0.25 m/px) and CTX imaging from Mars Reconnaissance Orbiter",
      "Corrected CRISM MTRDR orbital spectrometry (FRT000047A3, Fe/Mg-smectites and carbonates)",
    ],
    instrumentComparisonNote:
      "Methodological GPR vs RIMFAX Comparison: Terrestrial GPR at Makgadikgadi operated with low-frequency rough-terrain antennas at 30 MHz (vertical resolution ~0.67 m) and 50 MHz (~0.40 m), with an estimated radar velocity v ≈ 0.085 m/ns. On Mars, RIMFAX (FMCW 150–1200 MHz) recorded subsurface reflectors at ~15 m depth in the delta front (Sols 134–204) and at ~20 m with a ~12° structural dip and dielectric permittivity transition (ε_r ≈ 9 → 7) in the Séítah formation (Sols 400–566). A structural and dielectric contrast analogy is established (saline/clay-rich versus volcanic strata), ruling out direct metric depth matches.",
    simulatedCorrelationScore: "90.2/100",
    tag: "Subsurface Radar Stratigraphy",
    mockSummary:
      "Comparative analysis: SRTMGL1 (S21E024/025), Sentinel-2 L2A, MGS MOLA, HiRISE DTM, and RIMFAX Sol 400 calibrated data.",
    assessment: {
      overallScore: 90.2,
      overallMax: 100,
      title: "Compatibility Assessment — Case 1",
      subtitle: "Multi-Criteria Decision Analysis (MCDA) Compatibility Score: S = 90.2/100",
      formulaNote:
        "MCDA evaluation framework: ∑ w_j = 4.7, ∑ (w_j · d_j) = 0.4622 → weighted mean distance d = 0.0983 → S = 100 · (1 - d) = 90.2/100. Weights: Topography (SRTM vs MOLA, w=0.8, d=0.014), Spectrometry (Sentinel-2 vs CRISM, w=0.9, d=0.090), Subsurface Geophysics (GPR vs RIMFAX, w=1.0, d=0.150), Stratigraphy (w=1.0, d=0.120), Hydrology (w=1.0, d=0.100). ERT excluded from direct Martian score (w=0).",
      dimensions: [
        {
          key: "geology",
          label: "Geological Compatibility",
          score: 88,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.12,
          explanation: "Correlation between shallow lacustrine sedimentary sequences and fossil evaporitic duricrusts in an endorheic basin.",
        },
        {
          key: "topography",
          label: "Topographic Compatibility",
          score: 98,
          max: 100,
          weight: 0.8,
          normalizedDiff: 0.014,
          explanation: "Median SRTM slope along GPR06 profile (0.78°) compared with MOLA 3x3 median at Jezero (0.85°). Empirical delta of 0.07°.",
        },
        {
          key: "spectral",
          label: "Spectral Compatibility",
          score: 91,
          max: 100,
          weight: 0.9,
          normalizedDiff: 0.09,
          explanation: "Desiccated mineral ground in Sentinel-2 (NDVI=0.11) compared with Fe/Mg-smectites and carbonates in CRISM FRT000047A3.",
        },
        {
          key: "hydrology",
          label: "Hydrological Processes",
          score: 90,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.10,
          explanation: "Confined hypersaline aquifers mapped by ERT (< 1 Ω·m) serving as an analog model for deep residual subsurface brines.",
        },
        {
          key: "subsurface",
          label: "Subsurface Geophysics (GPR ↔ RIMFAX)",
          score: 85,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.15,
          explanation: "Terrestrial subhorizontal stratigraphic reflectors (v ≈ 0.085 m/ns) compared with dipping structural reflectors in RIMFAX (v ≈ 0.10 m/ns, ε_r ≈ 9→7).",
        },
      ],
      footerNote:
        "MCDA evaluation framework based on available open datasets: SRTMGL1 S21E024/025, Sentinel-2 L2A, MOLA megt90n000eb, HiRISE DTM DTEEC_045994_1985, and RIMFAX Sol 400 calibrated data.",
    },

    variables: SCIENTIFIC_MASTER_VARIABLES.filter((v) => v.caseId === "makgadikgadi_mars"),

    radarScores: {
      morphology: 85,
      thermalBehavior: 64,
      regolithComposition: 88,
      insolationPattern: 75,
      logisticsViability: 84,
    },
    prosDemo: [
      "Characterization of GPR reflectors in saline sedimentary media with rough-terrain 30 and 50 MHz antennas",
      "Stratigraphic architectural interpretation compared against calibrated RIMFAX profiles at Jezero (Sol 400)",
      "Close slope match between terrestrial SRTM (0.78°) and MOLA on the Jezero floor (0.85°)",
    ],
    limitationsDemo: [
      "Differences in dielectric permittivity and attenuation from active groundwater brines on Earth",
      "Disparate radar frequency bands between terrestrial GPR (30/50 MHz) and Martian RIMFAX (150–1200 MHz)",
      "Surface biogenic and chemical weathering on Earth absent under contemporary Martian hyperaridity",
    ],
  },
  {
    id: "CASE-02",
    caseNumber: 2,
    earthSiteId: "EARTH-02", // Salar de Pajonales
    targetSiteId: "MARS-02", // Olympia Undae & Jezero
    targetBody: "Mars",
    title: "Case 2: Salar de Pajonales, Chile ↔ Mars (Jezero & Olympia Undae)",
    analogFocus:
      "Gypsum mineralogy, hyperarid microclimates, mineral hydration, and endolithic biosignature preservation microhabitats.",
    researchQuestion:
      "How do gypsum crystal habits and endolithic microhabitats in Salar de Pajonales guide the robotic detection of biosignatures and hydrated sulfates at Jezero Crater and Olympia Undae?",
    earthDatasets: [
      "Sample-specific XRD mineralogy and water activity (Frontiers in Astronomy DOI: 10.3389/fspas.2025.1693302, Tables S6–S9)",
      "In-situ meteorological time series from station ATA17-08 (temperature, median RH 20–45%, UV radiation flux)",
      "SRTM 30m Digital Elevation Model (s26_w069_1arc_v3.tif, 3,537 m ASL)",
      "Sentinel-2 L2A surface reflectance (bands B02-B12, 10-20 m resolution)",
      "Endolithic 16S rRNA gene sequencing and photosynthetic pigment assays (DDBJ PRJDB19570)",
    ],
    planetaryDatasets: [
      "CRISM targeted spectral observations (polar cube HRL000040FF over Olympia Undae gypsum dunes and FRT000047A3 at Jezero)",
      "OMEGA / Mars Express hydrated sulfate spectral cubes",
      "HiRISE DTM high-resolution stereo terrain models of layered sedimentary sequences",
      "Perseverance rover in-situ astrobiological investigations (SHERLOC and PIXL instruments)",
    ],
    instrumentComparisonNote:
      "Sample-Specific Mineralogy and Microclimate: Laboratory field data (Frontiers in Astronomy, 2026) demonstrates differentiated mineralogy: gypsum stromatolites (~91% gypsum, <5% anhydrite, aw ≈ 0.39–0.86) versus regional salt crusts (~55% halite, 38% gypsum, aw ≈ 0.50–0.53). Environmental relative humidity at station ATA17-08 fluctuates with a median of 20–45% and episodic saturation events. Diagnostic mineralogical comparison is established with the circumpolar gypsum dunes of Olympia Undae and stratified sulfate units at Jezero.",
    simulatedCorrelationScore: "91.5/100",
    tag: "Evaporite Astrobiology",
    mockSummary:
      "Mineralogical, spectral, and microclimatic analysis: SRTM 30m, Sentinel-2 L2A, and Frontiers in Astronomy analytical data (ATA17-08).",
    assessment: {
      overallScore: 91.5,
      overallMax: 100,
      title: "Compatibility Assessment — Case 2",
      subtitle: "Multi-Criteria Decision Analysis (MCDA) Compatibility Score: S = 91.5/100",
      formulaNote:
        "MCDA evaluation framework: ∑ w_j = 4.7, ∑ (w_j · d_j) = 0.4020 → weighted mean distance d = 0.0855 → S = 100 · (1 - d) = 91.5/100. Weights: Gypsum Mineralogy by Sample (w=1.0, d=0.060), SWIR 1.93 µm Spectral Absorption (w=1.0, d=0.070), Endolithic Preservation (w=1.0, d=0.100), Microclimate & aw (w=0.9, d=0.120), Basin Relief (w=0.8, d=0.080).",
      dimensions: [
        {
          key: "geology",
          label: "Geological Compatibility",
          score: 94,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.06,
          explanation: "Gypsum stromatolites (~91% gypsum) and salt crusts; mineral analog to Olympia Undae dunes and Jezero sulfates.",
        },
        {
          key: "spectral",
          label: "Spectral Compatibility",
          score: 93,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.07,
          explanation: "Diagnostic triplet absorption bands of structural crystal-lattice water in gypsum confirmed in field spectra and CRISM/OMEGA cubes.",
        },
        {
          key: "biosignature",
          label: "Biosignature Preservation",
          score: 90,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.10,
          explanation: "Endolithic cyanobacterial communities protected by the UV attenuation of gypsum crystals (analog for SHERLOC biosignature searches).",
        },
        {
          key: "hydrology",
          label: "Microclimate & Water Activity",
          score: 88,
          max: 100,
          weight: 0.9,
          normalizedDiff: 0.12,
          explanation: "Ambient median RH of 20–45% and microhabitat water activity aw = 0.39–0.86 compared against terrestrial metabolic thresholds.",
        },
        {
          key: "topography",
          label: "Topographic Compatibility",
          score: 92,
          max: 100,
          weight: 0.8,
          normalizedDiff: 0.08,
          explanation: "Decametric dome morphology and evaporite plains comparable to sedimentary terraces and sulfate deposits in Jezero.",
        },
      ],
      footerNote:
        "MCDA evaluation framework based on peer-reviewed geochemical and microclimatic datasets from Frontiers in Astronomy (DOI: 10.3389/fspas.2025.1693302), SRTM 30m, Sentinel-2 L2A, and CRISM/OMEGA cubes.",
    },

    variables: SCIENTIFIC_MASTER_VARIABLES.filter((v) => v.caseId === "pajonales_mars"),

    radarScores: {
      morphology: 82,
      thermalBehavior: 74,
      regolithComposition: 94,
      insolationPattern: 95,
      logisticsViability: 89,
    },
    prosDemo: [
      "Selective UV attenuation by natural gypsum crystals documented in-situ by station ATA17-08",
      "Astrobiological reference analog for microfossil detection protocols with Perseverance SHERLOC",
      "Diagnostic triplet hydration absorption bands (1.4, 1.93, 2.2 µm) directly comparable with CRISM",
    ],
    limitationsDemo: [
      "Terrestrial atmospheric surface pressure (~660 hPa at 3,500 m) exceeds Martian pressure (~6 hPa), limiting rapid sublimation",
      "Oxidizing Earth atmosphere with O2 versus anoxic Martian atmosphere dominated by CO2",
      "Martian perchlorate salt effects absent in equivalent concentrations at Salar de Pajonales",
    ],
  },
  {
    id: "CASE-03",
    caseNumber: 3,
    earthSiteId: "EARTH-03", // Amundsen-Scott
    targetSiteId: "MOON-01", // Shackleton Crater
    targetBody: "Moon",
    title: "Case 3: Amundsen–Scott Station, Antarctica ↔ Moon (Lunar South Pole)",
    analogFocus:
      "Outpost operations in extreme isolation, heavy polar logistics, closed-loop life support, and cryogenic thermal regimes.",
    researchQuestion:
      "What operational, logistical, and life-support principles proven through decades of continuous isolation at Amundsen–Scott Station directly inform the design of permanent lunar south polar bases?",
    earthDatasets: [
      "Continuous weekly meteorological summaries 2019–2026 from AMRDC (59 archived weeks, DOI: 10.48567/vcma-jv23)",
      "Historical surface meteorological observations 1957–2007 (DOI: 10.48567/r6wy-as19)",
      "Reference Elevation Model of Antarctica (REMA 2m DEM) from Polar Geospatial Center",
      "Operational records from the South Pole Overland Traverse (SPoT, 1,600 km heavy tractor resupply route)",
      "Closed-loop life support, water reclamation, and microgrid power generation reports from NSF Polar Programs",
    ],
    planetaryDatasets: [
      "LRO Diviner Lunar Radiometer Experiment RDR (radiometric thermal brightness maps of PSR cold traps < 40 K)",
      "LOLA Lunar Orbiter Laser Altimeter DEM (5 m/px resolution around Shackleton Crater rim)",
      "LROC high-resolution illumination models across Connecting Ridge and crater rims",
      "Mini-RF radar and LEND epithermal neutron spectrometry for polar volatile mapping",
    ],
    instrumentComparisonNote:
      "Operational & Environmental Analog Evaluation: This study models human operations under extreme isolation (8.5-month winter-over), heavy overland traverse logistics (SPoT, 1,600 km), and continuous cold-induced materials fatigue (AMRDC vcma-jv23 and r6wy-as19). Surface ice lithology is formally de-weighted (w=0.1), acknowledging that firn ice does not reproduce lunar anorthositic regolith or space vacuum.",
    simulatedCorrelationScore: "86.7/100",
    tag: "Polar Logistics & Habitat Operations",
    mockSummary:
      "Operational, thermal, and logistical analysis: 59 weeks of AMRDC meteorological records (DOI: 10.48567/vcma-jv23), SPoT traverse data (1,600 km), and NASA LRO Diviner/LOLA datasets.",
    assessment: {
      overallScore: 86.7,
      overallMax: 100,
      title: "Compatibility Assessment — Case 3",
      subtitle: "Multi-Criteria Decision Analysis (MCDA) Compatibility Score: S = 86.7/100",
      formulaNote:
        "MCDA evaluation framework: ∑ w_j = 3.8, ∑ (w_j · d_j) = 0.5060 → weighted mean distance d = 0.1332 → S = 100 · (1 - d) = 86.7/100. Weights: Operational Isolation (w=1.0, d=0.050), Overland Heavy Logistics (w=1.0, d=0.080), Cryogenic Thermal Regime (AMRDC vs Diviner, w=0.9, d=0.150), Topography & Mobility (REMA vs LOLA, w=0.8, d=0.220), Substrate Lithology (de-weighted, w=0.1, d=0.650).",
      dimensions: [
        {
          key: "operations",
          label: "Operational Relevance",
          score: 95,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.05,
          explanation: "Complete 8.5-month winter-over isolation (~42 personnel) with closed-loop life support protocols.",
        },
        {
          key: "logistics",
          label: "Logistics & Supply Chain",
          score: 92,
          max: 100,
          weight: 1.0,
          normalizedDiff: 0.08,
          explanation: "1,600 km heavy cargo transit over unpaved snow terrain serving as a model for sustained planetary surface transport.",
        },
        {
          key: "thermal",
          label: "Thermal Regime",
          score: 85,
          max: 100,
          weight: 0.9,
          normalizedDiff: 0.15,
          explanation: "AMRDC 2019–2026 data (DOI: 10.48567/vcma-jv23) and historical records (DOI: 10.48567/r6wy-as19) compared with LRO Diviner RDR.",
        },
        {
          key: "topography",
          label: "Topographic Compatibility",
          score: 78,
          max: 100,
          weight: 0.8,
          normalizedDiff: 0.22,
          explanation: "Plateau slopes (<3°) with 0.3–1.2 m sastrugi compared against Shackleton Crater rim ridges (5°–15°) in LOLA LDEM.",
        },
        {
          key: "geology",
          label: "Substrate Lithology (De-weighted)",
          score: 35,
          max: 100,
          weight: 0.1,
          normalizedDiff: 0.65,
          explanation: "De-weighted (w=0.1): the polar research station is not penalized for lacking lunar anorthositic rock formations.",
        },
      ],
      footerNote:
        "MCDA evaluation framework based on weekly AMRDC meteorological archives (DOI: 10.48567/vcma-jv23), historical surface data (DOI: 10.48567/r6wy-as19), REMA 2m DEM, and NASA LRO (Diviner/LOLA) products.",
    },

    variables: SCIENTIFIC_MASTER_VARIABLES.filter((v) => v.caseId === "antarctica_moon"),

    radarScores: {
      morphology: 72,
      thermalBehavior: 85,
      regolithComposition: 35,
      insolationPattern: 88,
      logisticsViability: 95,
    },
    prosDemo: [
      "Field-proven protocols for closed-loop life support and microgrid energy redundancy in sustained cryogenic conditions",
      "Decades of continuous operational experience with physical isolation during polar winter-overs",
      "Overland heavy snow traverse logistics (SPoT) providing an operational model for lunar surface cargo transport",
    ],
    limitationsDemo: [
      "Terrestrial gravity (1 g) compared with reduced lunar surface gravity (0.166 g)",
      "Protection from Earth's thick atmosphere and geomagnetic field against cosmic rays and micrometeoroids",
      "6-month continuous night cycle versus lunar polar illumination peaks with ~86% annual sunlight",
    ],
  },
];
