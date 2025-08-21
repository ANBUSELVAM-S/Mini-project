import { type NextRequest, NextResponse } from "next/server"
import { mockReports } from "@/lib/data"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const hostel = searchParams.get("hostel")

  let filteredReports = mockReports

  if (category && category !== "all") {
    filteredReports = filteredReports.filter((report) => report.category === category)
  }

  if (hostel && hostel !== "all") {
    filteredReports = filteredReports.filter((report) => report.hostel === hostel)
  }

  return NextResponse.json(filteredReports)
}
