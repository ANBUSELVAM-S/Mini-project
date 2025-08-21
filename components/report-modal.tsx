"use client"

import type { FaultReport } from "@/lib/types"

interface ReportModalProps {
  report: FaultReport | null
  onClose: () => void
}

export function ReportModal({ report, onClose }: ReportModalProps) {
  if (!report) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        <div className="mb-4">
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <h3 className="font-semibold text-lg mb-2">Frame 1</h3>
            <div className="text-sm space-y-1">
              <div>
                <strong>Name:</strong> {report.studentName}
              </div>
              <div>
                <strong>Room no:</strong> {report.roomNo}
              </div>
              <div>
                <strong>Roll no:</strong> {report.rollNo}
              </div>
              <div>
                <strong>Date:</strong> {report.date}
              </div>
              <div>
                <strong>Time:</strong> {report.time}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <img
              src={report.avatar || "/placeholder.svg"}
              alt={report.studentName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="text-sm">
                <strong>Description:</strong> {report.description}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
