export interface FaultReport {
  id: string
  studentName: string
  studentId: string
  roomNo: string
  rollNo: string
  date: string
  time: string
  category: "Room work" | "Electrical" | "Carpenter" | "Washroom" | "Vending"
  description: string
  status: "pending" | "in-progress" | "solved" | "rejected"
  hostel: string
  avatar?: string
}

export interface DashboardStats {
  total: number
  solved: number
  unsolved: number
}
