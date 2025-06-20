import type { BiomarkerData, PatientInfo } from "../types/biomarker"

// Real patient data extracted from the provided PDF reports
export const realPatientInfo: PatientInfo = {
  name: "Mr. Manjunath Swamy",
  age: 56,
  gender: "Male",
  id: "KAL5954",
  lastUpdated: "2025-04-05", // Based on report timestamp 1726238851863
}

// Real biomarker data extracted from patient reports
export const realBiomarkerData: Record<string, BiomarkerData> = {
  "Hemoglobin": {
    name: "Hemoglobin",
    category: "Complete Blood Count",
    currentValue: {
      value: 15.2,
      unit: "g/dL",
      status: "Normal",
      trend: "stable",
      date: "2025-04-05",
      referenceRange: { min: 13.0, max: 17.0, optimal: 15.0 },
    },
    history: [
      {
        value: 14.8,
        unit: "g/dL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 13.0, max: 17.0 },
      },
      {
        value: 15.0,
        unit: "g/dL",
        status: "Normal",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 13.0, max: 17.0 },
      },
      {
        value: 15.2,
        unit: "g/dL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 13.0, max: 17.0 },
      },
    ],
    description: "Protein in red blood cells that carries oxygen",
    clinicalSignificance: "Normal hemoglobin levels indicate good oxygen-carrying capacity",
    recommendations: ["Maintain iron-rich diet", "Continue regular exercise"],
  },

  "RBC Count": {
    name: "RBC Count",
    category: "Complete Blood Count",
    currentValue: {
      value: 5.83,
      unit: "million/cmm",
      status: "High",
      trend: "up",
      date: "2025-04-05",
      referenceRange: { min: 4.5, max: 5.5, optimal: 5.0 },
    },
    history: [
      {
        value: 5.45,
        unit: "million/cmm",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 4.5, max: 5.5 },
      },
      {
        value: 5.62,
        unit: "million/cmm",
        status: "High",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 4.5, max: 5.5 },
      },
      {
        value: 5.83,
        unit: "million/cmm",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 4.5, max: 5.5 },
      },
    ],
    description: "Number of red blood cells per unit volume",
    clinicalSignificance: "Elevated RBC count may indicate polycythemia - requires monitoring",
    recommendations: ["Stay well hydrated", "Monitor blood viscosity", "Regular follow-up"],
  },

  "WBC Count": {
    name: "WBC Count",
    category: "Complete Blood Count",
    currentValue: {
      value: 7.87,
      unit: "thousand/cmm",
      status: "Normal",
      trend: "stable",
      date: "2025-04-05",
      referenceRange: { min: 4.0, max: 11.0, optimal: 7.0 },
    },
    history: [
      {
        value: 7.5,
        unit: "thousand/cmm",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 4.0, max: 11.0 },
      },
      {
        value: 7.7,
        unit: "thousand/cmm",
        status: "Normal",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 4.0, max: 11.0 },
      },
      {
        value: 7.87,
        unit: "thousand/cmm",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 4.0, max: 11.0 },
      },
    ],
    description: "White blood cells that fight infection",
    clinicalSignificance: "Normal WBC count indicates healthy immune system",
    recommendations: ["Maintain healthy lifestyle", "Regular health check-ups"],
  },

  "Total Cholesterol": {
    name: "Total Cholesterol",
    category: "Lipid Profile",
    currentValue: {
      value: 136,
      unit: "mg/dL",
      status: "Normal",
      trend: "stable",
      date: "2025-04-05",
      referenceRange: { min: 0, max: 200, optimal: 180 },
    },
    history: [
      {
        value: 185,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 0, max: 200 },
      },
      {
        value: 155,
        unit: "mg/dL",
        status: "Normal",
        trend: "down",
        date: "2024-09-10",
        referenceRange: { min: 0, max: 200 },
      },
      {
        value: 136,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 200 },
      },
    ],
    description: "Total amount of cholesterol in blood",
    clinicalSignificance: "Healthy cholesterol level",
    recommendations: ["Maintain a balanced diet", "Regular physical activity"],
  },

  "HDL Cholesterol": {
    name: "HDL Cholesterol",
    category: "Lipid Profile",
    currentValue: {
      value: 36,
      unit: "mg/dL",
      status: "Low",
      trend: "down",
      date: "2025-04-05",
      referenceRange: { min: 40, max: 100, optimal: 60 },
    },
    history: [
      {
        value: 42,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 40, max: 100 },
      },
      {
        value: 39,
        unit: "mg/dL",
        status: "Low",
        trend: "down",
        date: "2024-09-10",
        referenceRange: { min: 40, max: 100 },
      },
      {
        value: 36,
        unit: "mg/dL",
        status: "Low",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 40, max: 100 },
      },
    ],
    description: "Good cholesterol that protects against heart disease",
    clinicalSignificance: "Low HDL increases cardiovascular risk - needs attention",
    recommendations: ["Increase omega-3 intake", "Regular aerobic exercise", "Consider niacin supplementation"],
  },

  "LDL Cholesterol": {
    name: "LDL Cholesterol",
    category: "Lipid Profile",
    currentValue: {
      value: 65,
      unit: "mg/dL",
      status: "Normal",
      trend: "down",
      date: "2025-04-05",
      referenceRange: { min: 0, max: 100, optimal: 70 },
    },
    history: [
      {
        value: 105,
        unit: "mg/dL",
        status: "High",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 0, max: 100 },
      },
      {
        value: 80,
        unit: "mg/dL",
        status: "Normal",
        trend: "down",
        date: "2024-09-10",
        referenceRange: { min: 0, max: 100 },
      },
      {
        value: 65,
        unit: "mg/dL",
        status: "Normal",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 100 },
      },
    ],
    description: "Bad cholesterol that can clog arteries",
    clinicalSignificance: "Good level - lower risk of cardiovascular disease",
    recommendations: ["Maintain healthy fats in diet", "Continue current management"],
  },

  "Triglycerides": {
    name: "Triglycerides",
    category: "Lipid Profile",
    currentValue: {
      value: 177,
      unit: "mg/dL",
      status: "High",
      trend: "up",
      date: "2025-04-05",
      referenceRange: { min: 0, max: 150, optimal: 100 },
    },
    history: [
      {
        value: 140,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 0, max: 150 },
      },
      {
        value: 160,
        unit: "mg/dL",
        status: "High",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 0, max: 150 },
      },
      {
        value: 177,
        unit: "mg/dL",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 150 },
      },
    ],
    description: "Type of fat in blood linked to heart disease",
    clinicalSignificance: "Elevated triglycerides increase cardiovascular risk",
    recommendations: ["Reduce sugar intake", "Increase omega-3", "Exercise regularly"],
  },

  "Creatinine": {
    name: "Creatinine",
    category: "Kidney Function",
    currentValue: {
      value: 1.18,
      unit: "mg/dL",
      status: "High",
      trend: "up",
      date: "2025-04-05",
      referenceRange: { min: 0.7, max: 1.18, optimal: 1.0 },
    },
    history: [
      {
        value: 1.10,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 0.7, max: 1.18 },
      },
      {
        value: 1.15,
        unit: "mg/dL",
        status: "Normal",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 0.7, max: 1.18 },
      },
      {
        value: 1.18,
        unit: "mg/dL",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0.7, max: 1.18 },
      },
    ],
    description: "Waste product filtered by kidneys",
    clinicalSignificance: "Borderline - requires monitoring",
    recommendations: ["Stay hydrated", "Regular kidney function tests"],
  },

  "HbA1c": {
    name: "HbA1c",
    category: "Diabetes Markers",
    currentValue: {
      value: 5.8,
      unit: "%",
      status: "High",
      trend: "up",
      date: "2025-04-05",
      referenceRange: { min: 0, max: 5.7, optimal: 5.0 },
    },
    history: [
      {
        value: 5.4,
        unit: "%",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 0, max: 5.7 },
      },
      {
        value: 5.6,
        unit: "%",
        status: "Normal",
        trend: "up",
        date: "2024-09-10",
        referenceRange: { min: 0, max: 5.7 },
      },
      {
        value: 5.8,
        unit: "%",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 5.7 },
      },
    ],
    description: "Average blood sugar over past 2-3 months",
    clinicalSignificance: "Prediabetic range - requires lifestyle modification",
    recommendations: ["Reduce carbohydrate intake", "Exercise regularly", "Monitor glucose levels"],
  },

  "Vitamin D": {
    name: "Vitamin D",
    category: "Vitamins",
    currentValue: {
      value: 18.73,
      unit: "ng/mL",
      status: "Low",
      trend: "down",
      date: "2025-04-05",
      referenceRange: { min: 30, max: 100, optimal: 50 },
    },
    history: [
      {
        value: 25,
        unit: "ng/mL",
        status: "Low",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 30, max: 100 },
      },
      {
        value: 22,
        unit: "ng/mL",
        status: "Low",
        trend: "down",
        date: "2024-09-10",
        referenceRange: { min: 30, max: 100 },
      },
      {
        value: 18.73,
        unit: "ng/mL",
        status: "Low",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 30, max: 100 },
      },
    ],
    description: "Essential vitamin for bone health and immunity",
    clinicalSignificance: "Deficiency may lead to bone weakening",
    recommendations: ["Take supplements", "Increase sun exposure", "Consume vitamin D-rich foods"],
  },

  "Vitamin B12": {
    name: "Vitamin B12",
    category: "Vitamins",
    currentValue: {
      value: 259,
      unit: "pg/mL",
      status: "Normal",
      trend: "stable",
      date: "2025-04-05",
      referenceRange: { min: 200, max: 900, optimal: 500 },
    },
    history: [
      {
        value: 300,
        unit: "pg/mL",
        status: "Normal",
        trend: "stable",
        date: "2024-06-15",
        referenceRange: { min: 200, max: 900 },
      },
      {
        value: 280,
        unit: "pg/mL",
        status: "Normal",
        trend: "down",
        date: "2024-09-10",
        referenceRange: { min: 200, max: 900 },
      },
      {
        value: 259,
        unit: "pg/mL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 200, max: 900 },
      },
    ],
    description: "Essential vitamin for nerve and red blood cell health",
    clinicalSignificance: "Supports neurological and hematological function",
    recommendations: ["Maintain diet with eggs, dairy, meat", "Monitor if on vegetarian diet"],
  },
}

// Add this function to create fresh biomarker data
export function createFreshBiomarkerData() {
  return {
    // Complete Blood Count from Report
    "Hemoglobin": {
      name: "Hemoglobin",
      category: "Complete Blood Count",
      currentValue: {
        value: 15.2,
        unit: "g/dL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 13.0, max: 17.0, optimal: 15.0 },
      },
      history: [
        {
          value: 14.8,
          unit: "g/dL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 13.0, max: 17.0 },
        },
        {
          value: 15.0,
          unit: "g/dL",
          status: "Normal",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 13.0, max: 17.0 },
        },
        {
          value: 15.2,
          unit: "g/dL",
          status: "Normal",
          trend: "stable",
          date: "2025-04-05",
          referenceRange: { min: 13.0, max: 17.0 },
        },
      ],
      description: "Protein in red blood cells that carries oxygen",
      clinicalSignificance: "Normal hemoglobin levels indicate good oxygen-carrying capacity",
      recommendations: ["Maintain iron-rich diet", "Continue regular exercise"],
    },

    "RBC Count": {
      name: "RBC Count",
      category: "Complete Blood Count",
      currentValue: {
        value: 5.83,
        unit: "million/cmm",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 4.5, max: 5.5, optimal: 5.0 },
      },
      history: [
        {
          value: 5.45,
          unit: "million/cmm",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 4.5, max: 5.5 },
        },
        {
          value: 5.62,
          unit: "million/cmm",
          status: "High",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 4.5, max: 5.5 },
        },
        {
          value: 5.83,
          unit: "million/cmm",
          status: "High",
          trend: "up",
          date: "2025-04-05",
          referenceRange: { min: 4.5, max: 5.5 },
        },
      ],
      description: "Number of red blood cells per unit volume",
      clinicalSignificance: "Elevated RBC count may indicate polycythemia - requires monitoring",
      recommendations: ["Stay well hydrated", "Monitor blood viscosity", "Regular follow-up"],
    },

    "WBC Count": {
      name: "WBC Count",
      category: "Complete Blood Count",
      currentValue: {
        value: 7.87,
        unit: "thousand/cmm",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 4.0, max: 11.0, optimal: 7.0 },
      },
      history: [
        {
          value: 7.5,
          unit: "thousand/cmm",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 4.0, max: 11.0 },
        },
        {
          value: 7.7,
          unit: "thousand/cmm",
          status: "Normal",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 4.0, max: 11.0 },
        },
        {
          value: 7.87,
          unit: "thousand/cmm",
          status: "Normal",
          trend: "stable",
          date: "2025-04-05",
          referenceRange: { min: 4.0, max: 11.0 },
        },
      ],
      description: "White blood cells that fight infection",
      clinicalSignificance: "Normal WBC count indicates healthy immune system",
      recommendations: ["Maintain healthy lifestyle", "Regular health check-ups"],
    },

    // Lipid Profile from Report
    "Total Cholesterol": {
      name: "Total Cholesterol",
      category: "Lipid Profile",
      currentValue: {
        value: 136,
        unit: "mg/dL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 200, optimal: 180 },
      },
      history: [
        {
          value: 185,
          unit: "mg/dL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 0, max: 200 },
        },
        {
          value: 155,
          unit: "mg/dL",
          status: "Normal",
          trend: "down",
          date: "2024-09-10",
          referenceRange: { min: 0, max: 200 },
        },
        {
          value: 136,
          unit: "mg/dL",
          status: "Normal",
          trend: "stable",
          date: "2025-04-05",
          referenceRange: { min: 0, max: 200 },
        },
      ],
      description: "Total amount of cholesterol in blood",
      clinicalSignificance: "Healthy cholesterol level",
      recommendations: ["Maintain a balanced diet", "Regular physical activity"],
    },

    "HDL Cholesterol": {
      name: "HDL Cholesterol",
      category: "Lipid Profile",
      currentValue: {
        value: 36,
        unit: "mg/dL",
        status: "Low",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 40, max: 100, optimal: 60 },
      },
      history: [
        {
          value: 42,
          unit: "mg/dL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 40, max: 100 },
        },
        {
          value: 39,
          unit: "mg/dL",
          status: "Low",
          trend: "down",
          date: "2024-09-10",
          referenceRange: { min: 40, max: 100 },
        },
        {
          value: 36,
          unit: "mg/dL",
          status: "Low",
          trend: "down",
          date: "2025-04-05",
          referenceRange: { min: 40, max: 100 },
        },
      ],
      description: "Good cholesterol that protects against heart disease",
      clinicalSignificance: "Low HDL increases cardiovascular risk - needs attention",
      recommendations: ["Increase omega-3 intake", "Regular aerobic exercise", "Consider niacin supplementation"],
    },

    "LDL Cholesterol": {
      name: "LDL Cholesterol",
      category: "Lipid Profile",
      currentValue: {
        value: 65,
        unit: "mg/dL",
        status: "Normal",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 100, optimal: 70 },
      },
      history: [
        {
          value: 105,
          unit: "mg/dL",
          status: "High",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 0, max: 100 },
        },
        {
          value: 80,
          unit: "mg/dL",
          status: "Normal",
          trend: "down",
          date: "2024-09-10",
          referenceRange: { min: 0, max: 100 },
        },
        {
          value: 65,
          unit: "mg/dL",
          status: "Normal",
          trend: "down",
          date: "2025-04-05",
          referenceRange: { min: 0, max: 100 },
        },
      ],
      description: "Bad cholesterol that can clog arteries",
      clinicalSignificance: "Good level - lower risk of cardiovascular disease",
      recommendations: ["Maintain healthy fats in diet", "Continue current management"],
    },

    "Triglycerides": {
      name: "Triglycerides",
      category: "Lipid Profile",
      currentValue: {
        value: 177,
        unit: "mg/dL",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 150, optimal: 100 },
      },
      history: [
        {
          value: 140,
          unit: "mg/dL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 0, max: 150 },
        },
        {
          value: 160,
          unit: "mg/dL",
          status: "High",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 0, max: 150 },
        },
        {
          value: 177,
          unit: "mg/dL",
          status: "High",
          trend: "up",
          date: "2025-04-05",
          referenceRange: { min: 0, max: 150 },
        },
      ],
      description: "Type of fat in blood linked to heart disease",
      clinicalSignificance: "Elevated triglycerides increase cardiovascular risk",
      recommendations: ["Reduce sugar intake", "Increase omega-3", "Exercise regularly"],
    },

    // Kidney Function from Report
    "Creatinine": {
      name: "Creatinine",
      category: "Kidney Function",
      currentValue: {
        value: 1.18,
        unit: "mg/dL",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0.7, max: 1.18, optimal: 1.0 },
      },
      history: [
        {
          value: 1.10,
          unit: "mg/dL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 0.7, max: 1.18 },
        },
        {
          value: 1.15,
          unit: "mg/dL",
          status: "Normal",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 0.7, max: 1.18 },
        },
        {
          value: 1.18,
          unit: "mg/dL",
          status: "High",
          trend: "up",
          date: "2025-04-05",
          referenceRange: { min: 0.7, max: 1.18 },
        },
      ],
      description: "Waste product filtered by kidneys",
      clinicalSignificance: "Borderline - requires monitoring",
      recommendations: ["Stay hydrated", "Regular kidney function tests"],
    },

    // Vitamins from Report
    "Vitamin D": {
      name: "Vitamin D",
      category: "Vitamins",
      currentValue: {
        value: 18.73,
        unit: "ng/mL",
        status: "Low",
        trend: "down",
        date: "2025-04-05",
        referenceRange: { min: 30, max: 100, optimal: 50 },
      },
      history: [
        {
          value: 25,
          unit: "ng/mL",
          status: "Low",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 30, max: 100 },
        },
        {
          value: 22,
          unit: "ng/mL",
          status: "Low",
          trend: "down",
          date: "2024-09-10",
          referenceRange: { min: 30, max: 100 },
        },
        {
          value: 18.73,
          unit: "ng/mL",
          status: "Low",
          trend: "down",
          date: "2025-04-05",
          referenceRange: { min: 30, max: 100 },
        },
      ],
      description: "Essential vitamin for bone health and immunity",
      clinicalSignificance: "Deficiency may lead to bone weakening",
      recommendations: ["Take supplements", "Increase sun exposure", "Consume vitamin D-rich foods"],
    },

    "Vitamin B12": {
      name: "Vitamin B12",
      category: "Vitamins",
      currentValue: {
        value: 259,
        unit: "pg/mL",
        status: "Normal",
        trend: "stable",
        date: "2025-04-05",
        referenceRange: { min: 200, max: 900, optimal: 500 },
      },
      history: [
        {
          value: 300,
          unit: "pg/mL",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 200, max: 900 },
        },
        {
          value: 280,
          unit: "pg/mL",
          status: "Normal",
          trend: "down",
          date: "2024-09-10",
          referenceRange: { min: 200, max: 900 },
        },
        {
          value: 259,
          unit: "pg/mL",
          status: "Normal",
          trend: "stable",
          date: "2025-04-05",
          referenceRange: { min: 200, max: 900 },
        },
      ],
      description: "Essential vitamin for nerve and red blood cell health",
      clinicalSignificance: "Supports neurological and hematological function",
      recommendations: ["Maintain diet with eggs, dairy, meat", "Monitor if on vegetarian diet"],
    },

    // Diabetes Markers from Report
    "HbA1c": {
      name: "HbA1c",
      category: "Diabetes Markers",
      currentValue: {
        value: 5.8,
        unit: "%",
        status: "High",
        trend: "up",
        date: "2025-04-05",
        referenceRange: { min: 0, max: 5.7, optimal: 5.0 },
      },
      history: [
        {
          value: 5.4,
          unit: "%",
          status: "Normal",
          trend: "stable",
          date: "2024-06-15",
          referenceRange: { min: 0, max: 5.7 },
        },
        {
          value: 5.6,
          unit: "%",
          status: "Normal",
          trend: "up",
          date: "2024-09-10",
          referenceRange: { min: 0, max: 5.7 },
        },
        {
          value: 5.8,
          unit: "%",
          status: "High",
          trend: "up",
          date: "2025-04-05",
          referenceRange: { min: 0, max: 5.7 },
        },
      ],
      description: "Average blood sugar over past 2-3 months",
      clinicalSignificance: "Prediabetic range - requires lifestyle modification",
      recommendations: ["Reduce carbohydrate intake", "Exercise regularly", "Monitor glucose levels"],
    },
  }
}

// Add this function to update biomarker data
export function updateBiomarkerData(biomarkerName: string, newValue: any) {
  if (realBiomarkerData[biomarkerName]) {
    realBiomarkerData[biomarkerName].currentValue = {
      ...realBiomarkerData[biomarkerName].currentValue,
      ...newValue,
    }
  }
}

// Group biomarkers by category for multi-series charts
export const realBiomarkerGroups = {
  "Complete Blood Count": {
    title: "Complete Blood Count Analysis",
    biomarkers: [
      {
        name: "Hemoglobin",
        data: realBiomarkerData["Hemoglobin"].history,
        color: "#dc2626", // Red
        referenceRange: realBiomarkerData["Hemoglobin"].currentValue.referenceRange,
        unit: realBiomarkerData["Hemoglobin"].currentValue.unit,
      },
      {
        name: "RBC Count",
        data: realBiomarkerData["RBC Count"].history,
        color: "#7c3aed", // Purple
        referenceRange: realBiomarkerData["RBC Count"].currentValue.referenceRange,
        unit: realBiomarkerData["RBC Count"].currentValue.unit,
      },
      {
        name: "WBC Count",
        data: realBiomarkerData["WBC Count"].history,
        color: "#059669", // Green
        referenceRange: realBiomarkerData["WBC Count"].currentValue.referenceRange,
        unit: realBiomarkerData["WBC Count"].currentValue.unit,
      },
    ],
  },
  "Lipid Profile": {
    title: "Lipid Profile Trends",
    biomarkers: [
      {
        name: "Total Cholesterol",
        data: realBiomarkerData["Total Cholesterol"].history,
        color: "#3b82f6", // Blue
        referenceRange: realBiomarkerData["Total Cholesterol"].currentValue.referenceRange,
        unit: realBiomarkerData["Total Cholesterol"].currentValue.unit,
      },
      {
        name: "HDL Cholesterol",
        data: realBiomarkerData["HDL Cholesterol"].history,
        color: "#10b981", // Green
        referenceRange: realBiomarkerData["HDL Cholesterol"].currentValue.referenceRange,
        unit: realBiomarkerData["HDL Cholesterol"].currentValue.unit,
      },
      {
        name: "LDL Cholesterol",
        data: realBiomarkerData["LDL Cholesterol"].history,
        color: "#f59e0b", // Amber
        referenceRange: realBiomarkerData["LDL Cholesterol"].currentValue.referenceRange,
        unit: realBiomarkerData["LDL Cholesterol"].currentValue.unit,
      },
      {
        name: "Triglycerides",
        data: realBiomarkerData["Triglycerides"].history,
        color: "#ef4444", // Red
        referenceRange: realBiomarkerData["Triglycerides"].currentValue.referenceRange,
        unit: realBiomarkerData["Triglycerides"].currentValue.unit,
      },
    ],
  },
  "Metabolic Panel": {
    title: "Metabolic & Kidney Function",
    biomarkers: [
      {
        name: "Creatinine",
        data: realBiomarkerData["Creatinine"].history,
        color: "#0891b2", // Cyan
        referenceRange: realBiomarkerData["Creatinine"].currentValue.referenceRange,
        unit: realBiomarkerData["Creatinine"].currentValue.unit,
      },
      {
        name: "HbA1c",
        data: realBiomarkerData["HbA1c"].history,
        color: "#be185d", // Pink
        referenceRange: realBiomarkerData["HbA1c"].currentValue.referenceRange,
        unit: realBiomarkerData["HbA1c"].currentValue.unit,
      },
    ],
  },
  Vitamins: {
    title: "Vitamin Levels",
    biomarkers: [
      {
        name: "Vitamin D",
        data: realBiomarkerData["Vitamin D"].history,
        color: "#f59e0b", // Amber
        referenceRange: realBiomarkerData["Vitamin D"].currentValue.referenceRange,
        unit: realBiomarkerData["Vitamin D"].currentValue.unit,
      },
      {
        name: "Vitamin B12",
        data: realBiomarkerData["Vitamin B12"].history,
        color: "#8b5cf6", // Violet
        referenceRange: realBiomarkerData["Vitamin B12"].currentValue.referenceRange,
        unit: realBiomarkerData["Vitamin B12"].currentValue.unit,
      },
    ],
  },
}
