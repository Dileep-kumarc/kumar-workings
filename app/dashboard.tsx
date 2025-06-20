"use client"

import React, { useCallback, useMemo } from 'react'
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
import type { BiomarkerData, PatientInfo, BiomarkerStatus, BiomarkerTrend } from '@/types/biomarker'

interface ExtractedData {
  patient?: PatientInfo;
  patientInfo?: PatientInfo;
  biomarkers: Record<string, { value: string; unit: string; status?: string; trend?: string }>;
  report_date?: string;
  ai_score?: number;
  timestamp?: string;
}

type BiomarkerSummary = {
  name: string;
  data: { date: string; value: number | null; status: string }[];
  color: string;
  referenceRange: { min: number; max: number; optimal?: number };
  unit: string;
};

// Add type for biomarker group data
interface BiomarkerGroupData {
  title: string
  biomarkers: Array<{
    name: string
    data: Array<{
      date: string
      value: number | null
      status: string
    }>
    color: string
    referenceRange: {
      min: number
      max: number
      optimal?: number
    }
    unit: string
  }>
}

interface BiomarkerGroups {
  [key: string]: BiomarkerGroupData
  "Lipid Profile": BiomarkerGroupData;
  "Metabolic Panel": BiomarkerGroupData;
  "Vitamins": BiomarkerGroupData;
}

export default function EcoTownHealthDashboard() {
  const [, setSelectedBiomarker] = React.useState<string | null>(null)
  const [dateRange, setDateRange] = React.useState("all-time")
  const [showUpload, setShowUpload] = React.useState(false)
  const [selectedGroup, setSelectedGroup] = React.useState("Lipid Profile")
  const [uploadedBiomarkerData, setUploadedBiomarkerData] = React.useState<ExtractedData | null>(null)
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  // NEW: Use state for patient info and biomarker data with correct types
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>(initialPatientInfo)
  const [biomarkerData, setBiomarkerData] = React.useState<Record<string, BiomarkerData>>(initialBiomarkerData)

  const biomarkerKeys = useMemo(() => Object.keys(biomarkerData), [biomarkerData])

  // Calculate dynamic summary statistics
  const [summaryStats, setSummaryStats] = React.useState({
    total: 0,
    normal: 0,
    outOfRange: 0,
    improving: 0,
  })

  // Function to calculate summary statistics, not memoized with useCallback
  const calculateStats = (keys: string[], data: Record<string, BiomarkerData>) => {
    const total = keys.length
    const normal = keys.filter((key) => data[key].currentValue.status === "Normal").length
    const outOfRange = keys.filter(
      (key) =>
        data[key].currentValue.status === "Low" ||
        data[key].currentValue.status === "High" ||
        data[key].currentValue.status === "Critical",
    ).length
    const improving = keys.filter((key) => {
      const history = data[key].history
      if (history.length < 2) return false
      const latest = history[history.length - 1].value
      const previous = history[history.length - 2].value

      // Ensure latest and previous are not null before comparison
      if (latest === null || previous === null) return false;

      // Improvement logic based on biomarker type
      if (key === "HDL Cholesterol" || key === "Vitamin D" || key === "Hemoglobin" || key === "Vitamin B12") {
        return latest > previous // Higher is better
      } else if (
        key === "Total Cholesterol" ||
        key === "LDL Cholesterol" ||
        key === "Triglycerides" ||
        key === "Creatinine" ||
        key === "HbA1c"
      ) {
        return latest < previous // Lower is better
      }
      return false
    }).length
    return { total, normal, outOfRange, improving }
  }

  React.useEffect(() => {
    const stats = calculateStats(biomarkerKeys, biomarkerData);
    setSummaryStats(stats);
  }, [biomarkerKeys, biomarkerData])

  const handlePDFDataExtracted = useCallback((extractedData: ExtractedData) => {
    console.log("Extracted data received:", extractedData)
    // Update patient info with proper date handling
    const updatedPatientInfo = {
      ...extractedData.patientInfo,
      lastUpdated: extractedData.report_date || extractedData.patientInfo?.lastUpdated || new Date().toLocaleDateString('en-IN')
    }

    // Only update patient info if there's a change to prevent infinite re-renders
    const patientInfoChanged = (
      updatedPatientInfo.name !== patientInfo.name ||
      updatedPatientInfo.age !== patientInfo.age ||
      updatedPatientInfo.gender !== patientInfo.gender ||
      updatedPatientInfo.id !== patientInfo.id ||
      updatedPatientInfo.lastUpdated !== patientInfo.lastUpdated
    );

    if (patientInfoChanged) {
      setPatientInfo(updatedPatientInfo as PatientInfo)
    }
    
    // Optimize biomarker data update to prevent unnecessary re-renders
    let hasBiomarkerDataChanged = false;
    const updatedBiomarkerData = { ...biomarkerData }; // Shallow copy to start

    Object.keys(extractedData.biomarkers).forEach((biomarkerName) => {
      if (updatedBiomarkerData[biomarkerName]) {
        hasBiomarkerDataChanged = true;
        const newData = extractedData.biomarkers[biomarkerName];
        console.log(`Processing biomarker: ${biomarkerName}, raw value: ${newData.value}, type: ${typeof newData.value}`);
        
        const rawDate = extractedData.patientInfo?.reportDate; // Use optional chaining
        const currentDate = rawDate && !isNaN(new Date(rawDate).getTime()) ? rawDate : new Date().toISOString().split('T')[0];

        const newHistoryEntry = {
          value: !isNaN(Number.parseFloat(newData.value.toString())) ? Number.parseFloat(newData.value.toString()) : null,
          unit: newData.unit,
          status: (newData.status as BiomarkerStatus) || 'Unknown',
          trend: (newData.trend as BiomarkerTrend) || 'stable',
          date: currentDate,
          referenceRange: updatedBiomarkerData[biomarkerName].currentValue.referenceRange,
        };

        // Create a new object for currentValue to ensure immutability
        updatedBiomarkerData[biomarkerName] = {
          ...updatedBiomarkerData[biomarkerName],
          currentValue: {
            ...updatedBiomarkerData[biomarkerName].currentValue,
            value: newHistoryEntry.value, // Use the parsed value from newHistoryEntry
            date: currentDate,
            status: newHistoryEntry.status,
          },
          // Add to history (keep last 6 entries)
          history: [
            ...updatedBiomarkerData[biomarkerName].history.slice(-5),
            newHistoryEntry,
          ],
        };
      }
    });

    if (hasBiomarkerDataChanged) {
      setBiomarkerData(updatedBiomarkerData);
    }

    setUploadedBiomarkerData(extractedData);
    setTimeout(() => {
      setShowUpload(false);
    }, 3000);
  }, [biomarkerData, setPatientInfo, setBiomarkerData, setUploadedBiomarkerData]); // Added dependencies to handlePDFDataExtracted useCallback

  const handleUpload = useCallback(async (file: File) => {
    console.log("Processing uploaded file:", file.name)
    setIsUploading(true); // Set uploading state
    setUploadError(null); // Clear previous errors
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      })

      const responseText = await response.text()
      let responseData
      try {
        responseData = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response as JSON:', e, 'Response text:', responseText)
        throw new Error('Server returned an invalid response format')
      }

      if (!response.ok) {
        throw new Error(responseData.error || 'Unknown server error')
      }

      if (!responseData.biomarkers || typeof responseData.biomarkers !== 'object') {
        throw new Error('Server returned invalid data format')
      }
      handlePDFDataExtracted(responseData)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
      setUploadError(errorMessage); // Set upload error
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  }, [handlePDFDataExtracted, setIsUploading, setUploadError]); // Added dependencies to handleUpload useCallback

  const handleExportReport = useCallback(() => {
    const reportData = {
      patient: patientInfo,
      biomarkers: biomarkerData,
      summary: summaryStats,
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
    link.click()
    URL.revokeObjectURL(url)
  }, [patientInfo, biomarkerData, summaryStats, biomarkerKeys]); // Added dependencies to handleExportReport useCallback

  const onUploadClick = useCallback(() => setShowUpload(prev => !prev), [setShowUpload]);

  // Type the biomarker groups
  const biomarkerGroups: BiomarkerGroups = getDynamicBiomarkerGroups(biomarkerData)

  // Function to render chart for current group
  const renderBiomarkerChart = (group: string) => {
    const groupData = biomarkerGroups[group]
    if (!groupData) return null

    const filteredBiomarkers = groupData.biomarkers.map((biomarker) => ({
      ...biomarker,
      data: biomarker.data.filter(item => item.value !== null && !isNaN(item.value as number)) as { date: string; value: number; status: string }[],
    }));

    return (
      <motion.div 
        className="bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Trend Analysis</h2>
        <MultiSeriesChart
          title={groupData.title}
          biomarkers={filteredBiomarkers}
          height={400}
        />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Mobile Responsive Header */}
      <MobileResponsiveHeader
        patientInfo={patientInfo}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onUploadClick={onUploadClick}
        onExportClick={handleExportReport}
        isClient={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Upload Section */}
        {showUpload && (
          <motion.div 
            className="mb-4 sm:mb-6 glass-card"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <UploadReport onUpload={handleUpload} isUploading={isUploading} uploadError={uploadError} />
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
                  Processed on {new Date(uploadedBiomarkerData?.timestamp || '').toLocaleString()}
                </p>
              </div>
                <Badge variant="outline" className="text-xs self-start sm:self-center">
                  {Object.keys(uploadedBiomarkerData.biomarkers).length} biomarkers extracted
                </Badge>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4"
                >
                <h2>Biomarker Overview</h2>
                </motion.div>
              <Tabs value={selectedGroup} onValueChange={setSelectedGroup} className="w-full">
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
                  <TabsContent key={group} value={group} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {data.biomarkers.map((biomarker: BiomarkerSummary) => (
                        <motion.div
                          key={biomarker.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <BiomarkerSummaryCard
                            biomarker={biomarkerData[biomarker.name]}
                            onClick={() => setSelectedBiomarker(biomarker.name)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>

            {/* Charts Section */}
            <motion.div
              className="glass-card rounded-xl border border-gray-100 shadow-xl p-3 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4"
              >
                <h2>Trend Analysis</h2>
              </motion.div>
              {renderBiomarkerChart(selectedGroup)}
            </motion.div>

            {/* Clinical Interpretation Guide - now centered below the chart */}
            <motion.div
              className="glass-card rounded-xl border border-gray-100 shadow-xl p-3 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4"
              >
                <h2>Clinical Interpretation Guide</h2>
              </motion.div>
              <ClinicalInterpretationGuide patientInfo={patientInfo} biomarkerData={biomarkerData} />
            </motion.div>
          </div>

          {/* Right Column - Health Insights & Action Plan */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            <motion.div 
              className="glass-card rounded-xl border border-gray-100 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4"
                >
                <h2>Health Insights</h2>
                </motion.div>
              <HealthInsights patientInfo={patientInfo} biomarkerData={biomarkerData} uploadedReportMetadata={uploadedBiomarkerData as unknown as { biomarkers: Record<string, unknown>; report_date?: string }} />
            </motion.div>

            <motion.div 
              className="glass-card rounded-xl border border-gray-100 shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-4"
                >
                <h2>Personalized Action Plan</h2>
                </motion.div>
              <ActionPlan patientInfo={patientInfo} biomarkerData={biomarkerData} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}