function processBiomarker(biomarkerData: any, biomarkerName: string, color: string) {
  const biomarker = biomarkerData[biomarkerName];
  if (!biomarker || !biomarker.history) {
    return {
      name: biomarkerName,
      data: [],
      color: color,
      referenceRange: { min: 0, max: 0 },
      unit: '',
    };
  }

  const data = biomarker.history
    .map((item: any) => {
      const value = parseFloat(item.value);
      return {
        date: item.date,
        value: isNaN(value) ? null : value,
        status: item.status,
      };
    })
    .filter((item: any) => item.value !== null);

  return {
    name: biomarkerName,
    data,
    color,
    referenceRange: biomarker.currentValue.referenceRange,
    unit: biomarker.currentValue.unit,
  };
}

export function getDynamicBiomarkerGroups(biomarkerData: any) {
  if (!biomarkerData) {
    return {};
  }
  
  return {
    "Lipid Profile": {
      title: "Lipid Profile Trends",
      biomarkers: [
        processBiomarker(biomarkerData, "Total Cholesterol", "#3b82f6"),
        processBiomarker(biomarkerData, "HDL Cholesterol", "#10b981"),
        processBiomarker(biomarkerData, "LDL Cholesterol", "#f59e0b"),
        processBiomarker(biomarkerData, "Triglycerides", "#ef4444"),
      ],
    },
    "Metabolic Panel": {
      title: "Metabolic & Kidney Function",
      biomarkers: [
        processBiomarker(biomarkerData, "Creatinine", "#0891b2"),
        processBiomarker(biomarkerData, "HbA1c", "#be185d"),
      ],
    },
    Vitamins: {
      title: "Vitamin Levels",
      biomarkers: [
        processBiomarker(biomarkerData, "Vitamin D", "#f59e0b"),
        processBiomarker(biomarkerData, "Vitamin B12", "#8b5cf6"),
      ],
    },
  }
} 