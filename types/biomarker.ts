export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  id: string;
  lastUpdated: string;
  reportDate?: string;  // Added for compatibility
}

export interface BiomarkerValue {
  value: number;
  unit: string;
  status: string;
  trend: string;
  date: string;
  referenceRange: {
    min: number;
    max: number;
    optimal?: number;
  };
}

export interface BiomarkerData {
  name: string;
  category: string;
  currentValue: BiomarkerValue;
  history: BiomarkerValue[];
  description?: string;
  clinicalSignificance?: string;
  recommendations?: string[];
  // Add these for direct value access
  value?: number;
  unit?: string;
  status?: string;
  referenceRange?: {
    min: number;
    max: number;
    optimal?: number;
  };
}

// New interface for chart data points where value is strictly a number
export interface ChartDataPoint {
  date: string;
  value: number; // Must be a number for chart rendering
  status: string;
  formattedDate?: string; // Optional: if needed for XAxis or tooltips
}

export interface BiomarkerSummary {
  name: string;
  data: ChartDataPoint[];
  color: string;
  referenceRange: { min: number; max: number; optimal?: number };
  unit: string;
}
