import { AttendanceTable } from "@/components/attendance-table"

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Attendance Records</h1>
      <AttendanceTable />
    </div>
  )
}
