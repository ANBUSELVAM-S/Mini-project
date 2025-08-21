import { type NextRequest, NextResponse } from "next/server"
import { reports } from "@/lib/data"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    const reportIndex = reports.findIndex((report) => report.id === params.id)

    if (reportIndex === -1) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    reports[reportIndex].status = status

    return NextResponse.json({
      message: "Status updated successfully",
      report: reports[reportIndex],
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
