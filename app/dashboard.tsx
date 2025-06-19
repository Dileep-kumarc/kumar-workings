"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from "framer-motion"
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MobileResponsiveHeader } from '@/components/mobile-responsive-header'
import { BiomarkerSummaryCard } from '@/components/biomarker-summary-card'
import { MultiSeriesChart } from '@/components/multi-series-chart'
import { HealthInsights } from '@/components/health-insights'
import { ActionPlan } from '@/components/action-plan'
import { ClinicalInterpretationGuide } from '@/components/clinical-interpretation-guide'
import { UploadReport } from '@/components/upload-report'
import { getDynamicBiomarkerGroups } from '@/utils/biomarker-utils'
import { realBiomarkerData as initialBiomarkerData, realPatientInfo as initialPatientInfo } from '@/data/real-patient-data'
import type { BiomarkerData, PatientInfo } from '@/types/biomarker'

// Removing unused type
// interface BiomarkerGroupData {}

interface ExtractedData {
  patient?: PatientInfo;
  patientInfo?: PatientInfo;
  biomarkers: Record<string, { value: string; unit: string; status?: string }>;
  report_date?: string;
  ai_score?: number;
  timestamp?: string;
}

type BiomarkerGroup = "Lipid Profile" | "Metabolic Panel" | "Vitamins"

type BiomarkerSummary = {
  name: string;
  data: { date: string; value: number | null; status: string }[];
  color: string;
  referenceRange: { min: number; max: number; optimal?: number };
  unit: string;
};

export default function EcoTownHealthDashboard() {
  // State declarations
  const [isClient, setIsClient] = useState(false)
  const [biomarkerData, setBiomarkerData] = useState<Record<string, BiomarkerData>>(initialBiomarkerData)
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo)
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date('2023-01-01'), new Date()])
  const [showUpload, setShowUpload] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<BiomarkerGroup>("Lipid Profile")
  const [uploadedBiomarkerData, setUploadedBiomarkerData] = useState<ExtractedData | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const biomarkerNameMapping: { [key: string]: string } = useMemo(() => ({
    "Total Cholesterol": "Total Cholesterol",
    "HDL": "HDL Cholesterol",
    "LDL": "LDL Cholesterol",
    "Triglycerides": "Triglycerides",
    "Creatinine": "Creatinine",
    "Vitamin D": "Vitamin D",
    "HbA1c": "HbA1c",
    "Vitamin B12": "Vitamin B12"
  }), []);

  // Memoized values
  const biomarkerKeys = useMemo(() => Object.keys(biomarkerData), [biomarkerData])
  const [biomarkerGroups, setBiomarkerGroups] = useState(() => getDynamicBiomarkerGroups(biomarkerData));

  const chartData = useMemo(() => {
    if (!selectedGroup || !biomarkerGroups[selectedGroup]) {
      return [];
    }
    const [startDate, endDate] = dateRange;

    // Debug logging
    console.log('Preparing chart data for group:', selectedGroup);
    console.log('Current biomarker data:', biomarkerData);

    const processedData = biomarkerGroups[selectedGroup].biomarkers.map(biomarker => {
      const biomarkerState = biomarkerData[biomarker.name];
      if (!biomarkerState) {
        console.warn(`No data found for biomarker: ${biomarker.name}`);
        return null;
      }

      const data = biomarkerState.history
        .filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= startDate && entryDate <= endDate;
        })
        .map(entry => ({
          date: entry.date,
          value: typeof entry.value === 'string' ? parseFloat(entry.value) : entry.value,
          status: entry.status
        }));

      console.log(`Processed data for ${biomarker.name}:`, data);

      return {
        name: biomarker.name,
        data,
        color: biomarker.color,
        referenceRange: biomarkerState.currentValue.referenceRange || { min: 0, max: 100 },
        unit: biomarkerState.currentValue.unit || ''
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    console.log('Final processed chart data:', processedData);
    return processedData;
  }, [selectedGroup, biomarkerGroups, biomarkerData, dateRange]);

  // Add a chart key for forcing re-renders
  const chartKey = useMemo(() => {
    return `chart-${selectedGroup}-${Object.values(biomarkerData).map(b => b.currentValue.value).join('-')}`;
  }, [selectedGroup, biomarkerData]);

  // Debug effect to track data changes
  useEffect(() => {
    console.log('Chart data changed:', chartData);
  }, [chartData]);

  // Move handleExportReport before handleExportClick
  const handleExportReport = useCallback(() => {
    const reportData = {
      patient: patientInfo,
      biomarkers: biomarkerData,
      reportMetadata: {
        sourceReports: ["MR. MANJUNATH SWAMY Health Report", "Date: 16-06-2025"],
        generatedAt: new Date().toISOString(),
        clinicalSummary: {
          riskFactors: biomarkerKeys.filter(
            (key) =>
              biomarkerData[key].currentValue.status === "High" ||
              biomarkerData[key].currentValue.status === "Low",
          ),
          improvements: biomarkerKeys.filter((key) => {
            const history = biomarkerData[key].history
            return history.length >= 2 && history[history.length - 1].value !== history[history.length - 2].value
          }),
        },
      },
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `ecotown-health-${patientInfo.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link) // Required for Firefox
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [patientInfo, biomarkerData, biomarkerKeys])

  const handleExportClick = useCallback(() => {
    handleExportReport()
  }, [handleExportReport])

  const handleGroupChange = useCallback((value: string) => {
    setSelectedGroup(value as BiomarkerGroup)
  }, [])

  // Simple handlers
  const handleDateRangeChange = useCallback((value: string) => {
    let startDate: Date;
    let endDate: Date;

    switch (value) {
      case 'all-time':
        startDate = new Date('2023-01-01');
        endDate = new Date();
        break;
      case 'last-3-months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        endDate = new Date();
        break;
      case 'last-6-months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        endDate = new Date();
        break;
      case 'last-year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate = new Date();
        break;
      default:
        console.error('Invalid date range:', value);
        return;
    }
    
    setDateRange([startDate, endDate]);
  }, [])

  const handleUploadClick = useCallback(() => {
    setShowUpload(prev => !prev)
  }, [])

  // Memoized value for string date range
  const dateRangeString = useMemo(() => {
    const [start] = dateRange;
    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    if (start <= new Date('2023-01-01')) {
      return 'all-time';
    } else if (start >= threeMonthsAgo) {
      return 'last-3-months';
    } else if (start >= sixMonthsAgo) {
      return 'last-6-months';
    } else if (start >= oneYearAgo) {
      return 'last-year';
    }
    return 'all-time';
  }, [dateRange]);

  // Complex handlers with dependencies
  const handlePDFDataExtracted = useCallback((extractedData: ExtractedData) => {
    if (!extractedData || !extractedData.biomarkers) {
      console.error('Invalid data format: missing biomarkers', extractedData);
      setUploadMessage("Failed to process report: Invalid data format.");
      return;
    }

    console.log('Processing new PDF data:', extractedData);
    const newPatientInfo = (extractedData.patient || extractedData.patientInfo) as unknown as Record<string, unknown>;
    const reportDate = extractedData.report_date || (newPatientInfo?.report_date as string | undefined);

    if (newPatientInfo) {
      const patientUpdate = { ...newPatientInfo } as Record<string, unknown>;
      delete patientUpdate.report_date;
      setPatientInfo(prev => ({ ...prev, ...patientUpdate }));
    }
    if (extractedData.ai_score !== undefined) {
      setAiScore(extractedData.ai_score);
    }

    let updatesFound = false;

    setBiomarkerData(prevBiomarkerData => {
      console.log('Current biomarker data:', prevBiomarkerData);
      const newBiomarkerData = { ...prevBiomarkerData };
      let hasUpdates = false;

      Object.entries(extractedData.biomarkers).forEach(([apiKey, newValues]) => {
        const biomarkerName = biomarkerNameMapping[apiKey] || apiKey;
        console.log(`Processing biomarker ${biomarkerName}:`, newValues);
        const existingBiomarker = prevBiomarkerData[biomarkerName];
        
        if (existingBiomarker && newValues.value && String(newValues.value).trim() !== "") {
          const value = parseFloat(String(newValues.value));
          if (isNaN(value)) {
            console.warn(`Skipping invalid value for ${biomarkerName}:`, newValues.value);
            return;
          }
          
          updatesFound = true;
          hasUpdates = true;

          const newHistoryEntry = {
            value: value,
            unit: newValues.unit || existingBiomarker.currentValue.unit,
            status: newValues.status || "Normal",
            trend: "stable",
            date: reportDate || new Date().toISOString().split('T')[0],
            referenceRange: existingBiomarker.currentValue.referenceRange,
          };

          console.log(`New history entry for ${biomarkerName}:`, newHistoryEntry);

          newBiomarkerData[biomarkerName] = {
            ...existingBiomarker,
            currentValue: newHistoryEntry,
            history: [...existingBiomarker.history, newHistoryEntry]
          };
        }
      });

      console.log('Updated biomarker data:', newBiomarkerData);
      return hasUpdates ? newBiomarkerData : prevBiomarkerData;
    });

    if (updatesFound) {
      if (reportDate && reportDate.trim() !== '') {
        setUploadMessage("Report processed successfully. Dashboard has been updated.");
      } else {
        setUploadMessage("Biomarker values updated. Chart not updated due to missing report date.");
      }
    } else {
      setUploadMessage("No new biomarker data available in this report.");
    }
  }, [biomarkerNameMapping]);

  const handleUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadError(null);

    if (!file.type.includes('pdf')) {
      setUploadError('Please upload a PDF file');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      const responseText = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e, 'Response text:', responseText);
        throw new Error('Server returned an invalid response format');
      }

      if (!response.ok) {
        throw new Error(responseData.error || 'Unknown server error');
      }

      if (!responseData.biomarkers || typeof responseData.biomarkers !== 'object') {
        throw new Error('Server returned invalid data format');
      }

      setUploadedBiomarkerData({ ...responseData, timestamp: new Date().toISOString() });
      
      handlePDFDataExtracted(responseData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [handlePDFDataExtracted]);

  // Effects
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setBiomarkerGroups(getDynamicBiomarkerGroups(biomarkerData));
  }, [biomarkerData]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Mobile Responsive Header */}
      <MobileResponsiveHeader
        patientInfo={patientInfo}
        dateRange={dateRangeString}
        onDateRangeChange={handleDateRangeChange}
        onUploadClick={handleUploadClick}
        onExportClick={handleExportClick}
        isClient={isClient}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        {isClient && showUpload && (
          <motion.div 
            className="mb-4 sm:mb-6 glass-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UploadReport 
              onUpload={handleUpload} 
              isUploading={isUploading}
              uploadError={uploadError}
            />
          </motion.div>
        )}

        {/* Last Extracted Data Summary */}
        {uploadedBiomarkerData && (
          <motion.div 
            className="mb-4 sm:mb-6 p-3 sm:p-4 glass-card rounded-xl border border-green-100 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Last Uploaded Report</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {uploadMessage || `Processed on ${uploadedBiomarkerData.timestamp ? new Date(uploadedBiomarkerData.timestamp).toLocaleString() : 'Unknown'}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {aiScore !== null && (
                  <Badge variant="default" className="text-xs h-6 bg-blue-500 text-white">
                    AI Score: {aiScore}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs self-start sm:self-center">
                  {Object.keys(uploadedBiomarkerData.biomarkers).length} biomarkers extracted
                </Badge>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Biomarker Groups */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            <motion.div 
              className="glass-card rounded-xl border border-gray-100 shadow-xl p-3 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-block"
                >
                  Biomarker Overview
                </motion.div>
              </h2>
              <Tabs value={selectedGroup} onValueChange={handleGroupChange} className="w-full">
                <TabsList className="w-full justify-start mb-4 bg-gray-100/50 p-1 overflow-x-auto flex-nowrap">
                  {Object.keys(biomarkerGroups).map((group) => (
                    <TabsTrigger
                      key={group}
                      value={group}
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap"
                    >
                      {group}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(biomarkerGroups).map(([group, data]) => (
                  <TabsContent key={`tab-${group}`} value={group} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {data.biomarkers.map((biomarker: BiomarkerSummary) => (
                        <motion.div
                          key={`biomarker-${biomarker.name}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <BiomarkerSummaryCard
                            biomarker={biomarkerData[biomarker.name]}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>

            <motion.div
              className="glass-card rounded-xl border border-gray-100 shadow-xl p-3 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                  Trend Analysis
              </h2>
              <div className="h-[400px] w-full">
                <MultiSeriesChart
                  key={chartKey}
                  title={biomarkerGroups[selectedGroup]?.title || "Trend Analysis"}
                  biomarkers={chartData}
                />
              </div>
            </motion.div>

            <div className="glass-card rounded-xl border border-gray-100 shadow-xl p-3 sm:p-4 mt-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                  Clinical Interpretation Guide
                </h2>
                <ClinicalInterpretationGuide
                  patientInfo={patientInfo}
                  biomarkerData={biomarkerData}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column - Health Insights & Action Plan */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            <motion.div 
              className="glass-card rounded-xl border border-gray-100 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className="inline-block"
                >
                  Health Insights
                </motion.div>
              </h2>
              <HealthInsights biomarkerData={biomarkerData} patientInfo={patientInfo} />
            </motion.div>

            <motion.div 
              className="glass-card rounded-xl border border-gray-100 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="inline-block"
                >
                  Personalized Action Plan
                </motion.div>
              </h2>
              <ActionPlan biomarkerData={biomarkerData} patientInfo={patientInfo} />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}