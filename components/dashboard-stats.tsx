"use client"

import { useEffect, useState } from "react"
import type { DashboardStats } from "@/lib/types"

export function DashboardStatsComponent() {
  const [stats, setStats] = useState<DashboardStats>({ total: 0, solved: 0, unsolved: 0 })

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats)
  }, [])

  // Simple pie chart using CSS
  const solvedPercentage = stats.total > 0 ? (stats.solved / stats.total) * 100 : 0
  const unsolvedPercentage = 100 - solvedPercentage

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm">Total</div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.solved}</div>
          <div className="text-sm">Solved</div>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.unsolved}</div>
          <div className="text-sm">Unsolved</div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">This month</h3>
        <div className="relative w-32 h-32 mx-auto">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#10b981 0deg ${solvedPercentage * 3.6}deg, #ef4444 ${solvedPercentage * 3.6}deg 360deg)`,
            }}
          ></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-600">Reports</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Solved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Unsolved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
