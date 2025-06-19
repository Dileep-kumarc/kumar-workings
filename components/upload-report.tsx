"use client"

import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, XCircle } from "lucide-react"



interface UploadReportProps {
  onUpload: (file: File) => void
  isUploading: boolean
  uploadError: string | null
}

export function UploadReport({ onUpload, isUploading, uploadError }: UploadReportProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isUploading) {
      setProgress(0)
      const totalDuration = 15000 // Simulate a 15-second upload/analysis
      const interval = totalDuration / 100
      
      timer = setInterval(() => {
        setProgress(oldProgress => {
          if (oldProgress >= 95) { // Stop at 95% to wait for completion
            clearInterval(timer)
            return oldProgress
          }
          return oldProgress + 1
        })
      }, interval)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isUploading])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0])
      }
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: isUploading,
  })

  return (
    <motion.div
      {...getRootProps()}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative w-full p-6 text-center bg-white rounded-2xl
        border-2 border-dashed
        cursor-pointer transition-all duration-300 ease-in-out
        hover:border-primary hover:bg-primary/5
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        ${isDragActive ? "border-primary bg-primary/10 shadow-inner" : "border-gray-300"}
        ${uploadError ? "border-red-500 bg-red-50" : ""}
        ${isUploading ? "cursor-wait bg-gray-50" : ""}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[150px]">
        {isUploading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-4 w-full"
          >
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-primary h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-primary">Analyzing Report ({progress}%)</p>
              <p className="text-sm text-gray-500">This may take a moment. Please wait.</p>
            </div>
          </motion.div>
        ) : uploadError ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <XCircle className="h-12 w-12 text-red-500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">Upload Failed</p>
              <p className="text-sm text-gray-500">{uploadError}</p>
              <p className="text-xs text-gray-500 mt-2">Please try again.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                Click to upload or drag & drop
              </p>
              <p className="text-sm text-gray-500">PDF (max. 10MB)</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
