"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Upload, Calendar, Download, Menu, Heart, XCircle } from "lucide-react"

interface MobileResponsiveHeaderProps {
  patientInfo: {
    name: string
    age: number
    gender: string
    id: string
    lastUpdated: string
  }
  dateRange: string
  onDateRangeChange: (value: string) => void
  onUploadClick: () => void
  onExportClick: () => void
  isClient: boolean;
}

export function MobileResponsiveHeader({
  patientInfo,
  dateRange,
  onDateRangeChange,
  onUploadClick,
  onExportClick,
  isClient,
}: MobileResponsiveHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleDateRangeChange = useCallback((value: string) => {
    onDateRangeChange(value)
  }, [onDateRangeChange])

  if (!isClient) {
    return (
      <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[88px]">
          {/* Placeholder for header */}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-blue-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-br from-blue-600 to-green-500 bg-clip-text text-transparent">
                EcoTown Health
              </h1>
              <p className="text-sm text-gray-600 font-medium">{patientInfo.name}</p>
            </div>
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="hover:bg-gray-50">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
  side="right"
  className="w-80 bg-white/95 backdrop-blur-xl"
  title="Navigation Menu"
>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <XCircle  className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Patient Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">
                      {patientInfo.name}, {patientInfo.age}Y/{patientInfo.gender}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs font-medium">
                        ID: {patientInfo.id}
                      </Badge>
                      <Badge variant="secondary" className="text-xs font-medium">
                        Updated: {new Date(patientInfo.lastUpdated).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Select 
                    defaultValue={dateRange} 
                    onValueChange={handleDateRangeChange}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">All Time</SelectItem>
                      <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                      <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    onClick={onUploadClick} 
                    className="w-full bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Report
                  </Button>

                  <Button 
                    variant="outline" 
                    onClick={onExportClick} 
                    className="w-full bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center space-x-5">
            <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white p-3.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Heart className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-green-500 bg-clip-text text-transparent">
                EcoTown Health Dashboard
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                <p className="text-lg text-gray-600 font-medium">
                  {patientInfo.name}, {patientInfo.age}Y/{patientInfo.gender}
                </p>
                <Badge variant="outline" className="text-xs font-medium">
                  ID: {patientInfo.id}
                </Badge>
                <Badge variant="secondary" className="text-xs font-medium">
                  Last Updated: {new Date(patientInfo.lastUpdated).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={onDateRangeChange}>
              <SelectTrigger className="w-48 bg-white">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={onUploadClick}
              className="bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Report
            </Button>
            <Button 
              variant="outline" 
              onClick={onExportClick}
              className="bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
