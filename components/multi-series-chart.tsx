"use client"

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Brush,
  Legend,
  ReferenceArea,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
// Removing unused import: import { ChartTooltip } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    color?: string;
    payload?: {
      [key: string]: string | number;
    };
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-2 border rounded shadow">
      <p className="text-sm font-semibold">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

interface MultiSeriesChartProps {
  title: string
  biomarkers: Array<{
    name: string
    data: Array<{
      date: string
      value: number
      status: string
    }>
    color: string
    referenceRange: { min: number; max: number; optimal?: number }
    unit: string
  }>
  height?: number
}

export function MultiSeriesChart({
  title,
  biomarkers,
  height = 400,
}: MultiSeriesChartProps) {
  const [activeBiomarkers, setActiveBiomarkers] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [chartHeight, setChartHeight] = useState(height)
  const [zoomDomain, setZoomDomain] = useState<{ startIndex?: number; endIndex?: number }>({})
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (biomarkers && biomarkers.length > 0) {
      setActiveBiomarkers([biomarkers[0].name])
    }
  }, [biomarkers])

  // Handle mobile responsiveness
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      setChartHeight(isMobileView ? 300 : height)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [height])

  // Process data for chart
  const combinedData = useMemo(() => {
    const dataMap = new Map<string, Record<string, unknown>>()

    biomarkers.forEach(biomarker => {
      biomarker.data.forEach(dataPoint => {
        const { date, value, status } = dataPoint as { date: string; value: number; status: string };
        const dateStr = new Date(date).toISOString().split('T')[0];
        if (!dataMap.has(dateStr)) {
          dataMap.set(dateStr, {
            date: dateStr,
            formattedDate: new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: isMobile ? "short" : "long",
              day: "numeric",
            }),
          });
        }
        const entry = dataMap.get(dateStr)!;
        entry[biomarker.name] = value;
        entry[`${biomarker.name}_status`] = status;
      });
    });

    return Array.from(dataMap.values()).sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime())
  }, [biomarkers, isMobile])

  // Calculate Y-axis domain
  const yDomain = useMemo(() => {
    const allValues = biomarkers
      .filter(b => activeBiomarkers.includes(b.name))
      .reduce((acc, biomarker) => {
        const dataValues = biomarker.data.map(d => d.value)
        if (biomarker.referenceRange) {
          const rangeValues = [biomarker.referenceRange.min, biomarker.referenceRange.max]
          if (biomarker.referenceRange.optimal) {
            rangeValues.push(biomarker.referenceRange.optimal)
          }
          return acc.concat(dataValues, rangeValues)
        }
        return acc.concat(dataValues)
      }, [] as number[])

    if (allValues.length === 0) {
      const activeBiomarker = biomarkers.find(b => b.name === activeBiomarkers[0])
      if (activeBiomarker) {
        return [activeBiomarker.referenceRange.min * 0.9, activeBiomarker.referenceRange.max * 1.1]
      }
      return [0, 100] as [number, number]
    }

    const min = Math.min(...allValues)
    const max = Math.max(...allValues)
    const padding = (max - min) * 0.2

    return [min - padding, max + padding] as [number, number]
  }, [biomarkers, activeBiomarkers])

  const handleBiomarkerToggle = (biomarkerName: string) => {
    setActiveBiomarkers(prev => {
      if (prev.includes(biomarkerName)) {
        return prev.filter(b => b !== biomarkerName)
      } else {
        return [...prev, biomarkerName]
      }
    })
  }

  const handleDownloadPNG = useCallback(() => {
    if (!chartRef.current) return;
    
    try {
      // Create a canvas element
      const svgElement = chartRef.current.querySelector('svg');
      if (!svgElement) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width;
      canvas.height = svgRect.height;

      // Convert SVG to string
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svg);

      // Create image from SVG
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        // Convert to PNG and download
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${title.replace(/\s+/g, '-')}-chart.png`;
        link.href = pngUrl;
        link.click();
        
        // Cleanup
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (error) {
      console.error('Error generating PNG:', error);
    }
  }, [title]);

  // Reset zoom when data changes
  useEffect(() => {
    setZoomDomain({});
  }, [combinedData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadPNG}
              disabled={!combinedData.length}
            >
              Download Graph
            </Button>
          </div>
        </div>

        {/* Biomarker Toggle Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {biomarkers.map((biomarker) => (
            <Badge
              key={biomarker.name}
              variant={activeBiomarkers.includes(biomarker.name) ? "default" : "outline"}
              className="cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundColor: activeBiomarkers.includes(biomarker.name) ? biomarker.color : "transparent",
                borderColor: biomarker.color,
                color: activeBiomarkers.includes(biomarker.name) ? "white" : biomarker.color,
              }}
              onClick={() => handleBiomarkerToggle(biomarker.name)}
            >
              {biomarker.name}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent ref={chartRef}>
        <div
          className={`chart-container bg-white ${isMobile ? 'p-1' : 'p-4'} rounded-lg`}
          style={{
            width: isMobile ? '100vw' : '100%',
            maxWidth: '100%',
            marginLeft: isMobile ? '-16px' : undefined, // compensate for container padding
            marginRight: isMobile ? '-16px' : undefined,
            overflowX: 'auto',
          }}
        >
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart
              data={combinedData}
              margin={{
                top: 5,
                right: isMobile ? 10 : 30,
                left: isMobile ? -10 : 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate"
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 30}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={yDomain}
                width={isMobile ? 30 : 50}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {biomarkers.map((biomarker) =>
                activeBiomarkers.includes(biomarker.name) && (
                  <Line
                    key={biomarker.name}
                    type="monotone"
                    dataKey={biomarker.name}
                    stroke={biomarker.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                    name={biomarker.name}
                  />
                )
              )}
              {activeBiomarkers.length === 1 && biomarkers.find(b => b.name === activeBiomarkers[0])?.referenceRange && (
                <>
                  <ReferenceArea
                    y1={biomarkers.find(b => b.name === activeBiomarkers[0])!.referenceRange.min}
                    y2={biomarkers.find(b => b.name === activeBiomarkers[0])!.referenceRange.max}
                    stroke="transparent"
                    fill="green"
                    fillOpacity={0.1}
                  />
                  {biomarkers.find(b => b.name === activeBiomarkers[0])!.referenceRange.optimal && (
                    <ReferenceLine
                      y={biomarkers.find(b => b.name === activeBiomarkers[0])!.referenceRange.optimal}
                      label="Optimal"
                      stroke="green"
                      strokeDasharray="3 3"
                    />
                  )}
                </>
              )}
              {combinedData.length > 1 && (
                <Brush
                  dataKey="formattedDate"
                  height={30}
                  stroke="#8884d8"
                  startIndex={zoomDomain.startIndex}
                  endIndex={zoomDomain.endIndex}
                  onChange={(domain) => {
                    if (domain && 
                        typeof domain.startIndex === 'number' && 
                        typeof domain.endIndex === 'number') {
                      setZoomDomain({
                        startIndex: domain.startIndex,
                        endIndex: domain.endIndex
                      });
                    }
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
