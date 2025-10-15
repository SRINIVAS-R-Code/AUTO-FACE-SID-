"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

const attendanceData = {
  "2024-07-01": "On Time",
  "2024-07-02": "On Time",
  "2024-07-03": "Late",
  "2024-07-04": "On Time",
  "2024-07-05": "On Leave",
  "2024-07-08": "On Time",
  "2024-07-09": "On Time",
  "2024-07-10": "On Time",
  "2024-07-11": "Absent",
  "2024-07-12": "On Time",
}

type AttendanceStatus = "On Time" | "Late" | "Absent" | "On Leave"

export function UserAttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Attendance</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          modifiers={{
            onTime: (day) => {
              const dateStr = day.toISOString().split("T")[0]
              return attendanceData[dateStr as keyof typeof attendanceData] === "On Time"
            },
            late: (day) => {
              const dateStr = day.toISOString().split("T")[0]
              return attendanceData[dateStr as keyof typeof attendanceData] === "Late"
            },
            absent: (day) => {
                const dateStr = day.toISOString().split("T")[0]
                return attendanceData[dateStr as keyof typeof attendanceData] === "Absent"
            },
            onLeave: (day) => {
                const dateStr = day.toISOString().split("T")[0]
                return attendanceData[dateStr as keyof typeof attendanceData] === "On Leave"
            }
          }}
          modifiersClassNames={{
            onTime: "bg-green-100 dark:bg-green-900",
            late: "bg-red-100 dark:bg-red-900",
            absent: "bg-yellow-100 dark:bg-yellow-900",
            onLeave: "bg-gray-200 dark:bg-gray-700",
          }}
        />
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 justify-center">
            <div className="flex items-center gap-2"><Badge className="bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900 dark:hover:bg-green-900 dark:text-green-200">On Time</Badge></div>
            <div className="flex items-center gap-2"><Badge variant="destructive">Late</Badge></div>
            <div className="flex items-center gap-2"><Badge className="bg-yellow-100 hover:bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-900 dark:text-yellow-200">Absent</Badge></div>
            <div className="flex items-center gap-2"><Badge variant="secondary">On Leave</Badge></div>
        </div>
      </CardContent>
    </Card>
  )
}
