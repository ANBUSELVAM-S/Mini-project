"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardStatsComponent } from "@/components/dashboard-stats"
import { ReportList } from "@/components/report-list"
import { ReportModal } from "@/components/report-modal"
import type { FaultReport } from "@/lib/types"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("dashboard")
  const [selectedReport, setSelectedReport] = useState<FaultReport | null>(null)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {activeCategory === "dashboard" ? (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <DashboardStatsComponent />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-6">{activeCategory} Reports</h1>
              <ReportList category={activeCategory} onReportClick={setSelectedReport} />
            </div>
          )}
        </div>
      </div>

      <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
    </div>
  )
}
