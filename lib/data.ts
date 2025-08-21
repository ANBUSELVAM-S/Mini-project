import type { FaultReport, DashboardStats } from "./types"

// Mock data for the fault reporting system
export const mockReports: FaultReport[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentId: "STU001",
    roomNo: "138",
    rollNo: "737623TCSXXX",
    date: "11/01/2005",
    time: "9:35",
    category: "Room work",
    description: "My fan is not working so please take immediate action for this problem",
    status: "pending",
    hostel: "Hostel A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    studentId: "STU002",
    roomNo: "142",
    rollNo: "737624TCSXXX",
    date: "11/01/2005",
    time: "10:15",
    category: "Electrical",
    description: "Power socket not working in room",
    status: "solved",
    hostel: "Hostel A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    studentName: "Mike Johnson",
    studentId: "STU003",
    roomNo: "156",
    rollNo: "737625TCSXXX",
    date: "11/01/2005",
    time: "11:20",
    category: "Washroom",
    description: "Tap leaking in washroom",
    status: "pending",
    hostel: "Hostel B",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    studentName: "Sarah Wilson",
    studentId: "STU004",
    roomNo: "201",
    rollNo: "737626TCSXXX",
    date: "12/01/2005",
    time: "14:30",
    category: "Carpenter",
    description: "Door handle broken",
    status: "solved",
    hostel: "Hostel A",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    studentName: "Alex Brown",
    studentId: "STU005",
    roomNo: "178",
    rollNo: "737627TCSXXX",
    date: "12/01/2005",
    time: "16:45",
    category: "Vending",
    description: "Vending machine not dispensing items",
    status: "pending",
    hostel: "Hostel C",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const reports = mockReports

export function getDashboardStats(): DashboardStats {
  const total = mockReports.length
  const solved = mockReports.filter((report) => report.status === "solved").length
  const unsolved = total - solved

  return { total, solved, unsolved }
}

export function getReportsByCategory(category?: string) {
  if (!category) return mockReports
  return mockReports.filter((report) => report.category === category)
}

export function getReportsByHostel(hostel?: string) {
  if (!hostel) return mockReports
  return mockReports.filter((report) => report.hostel === hostel)
}
