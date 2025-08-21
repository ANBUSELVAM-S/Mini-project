"use client"

import { useEffect, useState } from "react"
import type { FaultReport } from "@/lib/types"

interface ReportListProps {
  category: string
  onReportClick: (report: FaultReport) => void
}

export function ReportList({ category, onReportClick }: ReportListProps) {
  const [reports, setReports] = useState<FaultReport[]>([])
  const [selectedHostel, setSelectedHostel] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  useEffect(() => {
    const params = new URLSearchParams()
    if (category !== "dashboard") {
      params.append("category", category)
    }
    if (selectedHostel !== "all") {
      params.append("hostel", selectedHostel)
    }

    fetch(`/api/reports?${params.toString()}`)
      .then((res) => res.json())
      .then(setReports)
  }, [category, selectedHostel])

  const hostels = ["all", "Hostel A", "Hostel B", "Hostel C"]

  const handleStatusChange = async (reportId: string, currentStatus: string) => {
    const statusCycle = ["pending", "in-progress", "solved", "rejected"]
    const currentIndex = statusCycle.indexOf(currentStatus)
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length]

    try {
      const response = await fetch(`/api/reports/${reportId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      })

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) => (report.id === reportId ? { ...report, status: nextStatus as any } : report)),
        )
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-500 text-white hover:bg-red-600"
      case "in-progress":
        return "bg-yellow-500 text-white hover:bg-yellow-600"
      case "solved":
        return "bg-green-500 text-white hover:bg-green-600"
      case "rejected":
        return "bg-gray-500 text-white hover:bg-gray-600"
      default:
        return "bg-gray-500 text-white hover:bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress"
      case "solved":
        return "Solved"
      case "rejected":
        return "Rejected"
      default:
        return "Pending"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Select the hostel:</label>
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            {hostels.map((hostel) => (
              <option key={hostel} value={hostel}>
                {hostel === "all" ? "All Hostels" : hostel}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <img
              src={report.avatar || "/placeholder.svg"}
              alt={report.studentName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-medium text-sm">{report.studentName}</div>
              <div className="text-xs text-gray-600">Roll no: {report.rollNo}</div>
              <div className="text-xs text-gray-600">Room: {report.roomNo}</div>
              <div className="text-xs text-gray-600">Date: {report.date}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onReportClick(report)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
              >
                View All
              </button>
              <button
                onClick={() => handleStatusChange(report.id, report.status)}
                className={`px-3 py-1 rounded text-xs transition-colors ${getStatusStyle(report.status)}`}
                title="Click to change status"
              >
                {getStatusText(report.status)}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
