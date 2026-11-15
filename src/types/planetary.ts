export type CelestialBody = "earth" | "moon" | "mars";

export interface MockAnalogParameter {
  id: string;
  name: string;
  simulatedValue: string;
  unit: string;
  status?: string;
  mockNotes?: string;
}

export interface MockSite {
  id: string; // e.g. "EARTH-01", "CASE-01"
  name: string; // e.g. "Makgadikgadi Basin, Botswana"
  body: CelestialBody;
  bodyLabel: "Earth" | "Moon" | "Mars";
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
  };
  simulatedAnalogType: string;
  targetTargetBody: string;
  simulatedSimilarityIndex: string; // e.g. "90.2/100"
  shortDescription: string;
  fullMockDescription: string;
  features: string[];
  parameters: MockAnalogParameter[];
  terrainClassification: string;
  disclaimer?: string;
  researchFocus?: string;
  researchQuestion?: string;
  earthDatasets?: string[];
  planetaryDatasets?: string[];
  instrumentComparison?: string;
}

// Comparison eligibility types defined in the scientific specification
export type ComparisonType =
  | "direct_numerical"
  | "direct_categorical"
  | "direct_geometric"
  | "indirect_process"
  | "earth_only"
  | "operational"
  | "contextual";

export type EvidenceConfidence =
  | "high"
  | "medium"
  | "low"
  | "pending_validation";

// Standardized basic formula variable for MCDA calculation
export interface FormulaVariable {
  id: string;
  dimension: string;
  dimensionLabel: string;
  name: string;
  earthValue: string;
  targetValue: string;
  unit: string;
  weight: number; // w_j >= 0
  normalizedDiff: number; // d_j in [0, 1]
  rangeRj?: string; // Pre-established normalization range R_j
  calculatedSimilarity?: number; // S_j compatibility alias
  similarity?: number | null; // S_j in [0, 100] if scientifically justified
  scientificSource?: string; // Quick reference label
  earthSource?: string;
  targetSource?: string;
  comparisonProfile?: string;
  earthResolution?: string;
  targetResolution?: string;
  notes?: string;
}

// Standardized Variable Dictionary for the Compatibility Engine (19 fields)
export interface MasterVariable extends FormulaVariable {
  caseId: "makgadikgadi_mars" | "pajonales_mars" | "antarctica_moon";
  comparisonProfile?: string;
  earthSite: string;
  planetaryTarget: string;
  earthSource: string;
  targetSource: string;
  earthResolution: string;
  targetResolution?: string;
  uncertaintyEarth?: string;
  uncertaintyTarget?: string;
  comparisonType?: ComparisonType;
  evidenceConfidence?: EvidenceConfidence;
  isScored?: boolean;
  notes: string;
}

export interface AssessmentDimension {
  key: string;
  label: string; // e.g. "Geological Compatibility"
  score: number; // e.g. 93 (out of 100)
  max: number; // 100
  weight: number; // w_j (e.g. 1.0, 0.8)
  normalizedDiff: number; // d_j in [0, 1]
  explanation: string;
}

export interface SiteAssessment {
  overallScore: number; // S in [0, 100]
  overallMax: number; // 100
  title: string;
  subtitle: string;
  formulaNote?: string;
  dimensions: AssessmentDimension[];
  footerNote?: string;
}

export interface SubComparisonProfile {
  id: string; // "profile-A", "profile-B", "profile-C"
  code: string; // "Profile A", "Profile B", "Profile C"
  title: string;
  earthSubSite: string;
  specificMartianReferences: string;
  description: string;
  keyDatasets: string[];
}

export interface MockComparisonItem {
  id: string;
  caseNumber: number; // 1, 2, 3
  earthSiteId: string;
  targetSiteId: string;
  targetBody: "Moon" | "Mars";
  title: string;
  analogFocus: string;
  researchQuestion: string;
  subProfiles?: SubComparisonProfile[]; // Case 1 has profiles A, B, C
  earthDatasets: string[];
  planetaryDatasets: string[];
  instrumentComparisonNote: string;
  scientificLimitations?: string[];
  simulatedCorrelationScore: string;
  tag?: string;
  mockSummary: string;
  assessment: SiteAssessment;
  variables: (FormulaVariable | MasterVariable)[];
  radarScores: {
    morphology: number; // 0-100
    thermalBehavior: number;
    regolithComposition: number;
    insolationPattern: number;
    logisticsViability: number;
  };
  prosDemo: string[];
  limitationsDemo: string[];
}
