
"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

const attendanceData: Record<string, AttendanceStatus> = {
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
  "2024-07-15": "Half Day",
}

type AttendanceStatus = "On Time" | "Late" | "Absent" | "On Leave" | "Half Day";

export function UserAttendanceCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const attendanceSummary = useMemo(() => {
    const summary = {
      present: 0,
      absent: 0,
      halfDay: 0,
      onLeave: 0,
      onTime: 0,
      late: 0,
    };

    const month = date ? date.getMonth() : new Date().getMonth();
    const year = date ? date.getFullYear() : new Date().getFullYear();

    Object.entries(attendanceData).forEach(([dateStr, status]) => {
      const entryDate = new Date(dateStr);
      if(entryDate.getMonth() === month && entryDate.getFullYear() === year) {
        if(status === "On Time" || status === "Late" || status === "Half Day") {
            summary.present++;
        }
        if (status === "Absent") summary.absent++;
        if (status === "Half Day") summary.halfDay++;
        if (status === "On Leave") summary.onLeave++;
        if (status === "On Time") summary.onTime++;
        if (status === "Late") summary.late++;
      }
    });

    return summary;
  }, [date]);

  const summaryItems = [
    { label: "Present", value: attendanceSummary.present, variant: "default" as const, className: "bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900 dark:hover:bg-green-900 dark:text-green-200" },
    { label: "Absent", value: attendanceSummary.absent, variant: "destructive" as const, className: "bg-yellow-100 hover:bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-900 dark:text-yellow-200" },
    { label: "Half Day", value: attendanceSummary.halfDay, variant: "secondary" as const, className: "bg-purple-100 hover:bg-purple-100 text-purple-800 dark:bg-purple-900 dark:hover:bg-purple-900 dark:text-purple-200" },
    { label: "On Leave", value: attendanceSummary.onLeave, variant: "secondary" as const },
    { label: "On Time", value: attendanceSummary.onTime, variant: "default" as const, className: "bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900 dark:hover:bg-green-900 dark:text-green-200" },
    { label: "Late", value: attendanceSummary.late, variant: "destructive" as const },
  ];

  return (
    <Card>
        <CardHeader>
            <CardTitle>My Attendance</CardTitle>
            <CardDescription>Select a date to view your attendance status for that day.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
                <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-auto"
                modifiers={{
                    onTime: (day) => {
                    const dateStr = day.toISOString().split("T")[0]
                    return attendanceData[dateStr] === "On Time"
                    },
                    late: (day) => {
                    const dateStr = day.toISOString().split("T")[0]
                    return attendanceData[dateStr] === "Late"
                    },
                    absent: (day) => {
                        const dateStr = day.toISOString().split("T")[0]
                        return attendanceData[dateStr] === "Absent"
                    },
                    onLeave: (day) => {
                        const dateStr = day.toISOString().split("T")[0]
                        return attendanceData[dateStr] === "On Leave"
                    },
                    halfDay: (day) => {
                        const dateStr = day.toISOString().split("T")[0]
                        return attendanceData[dateStr] === "Half Day"
                    }
                }}
                modifiersClassNames={{
                    onTime: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200",
                    late: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200",
                    absent: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200",
                    onLeave: "bg-gray-200 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300",
                    halfDay: "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200",
                }}
                />
            </div>
            
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Monthly Summary</CardTitle>
                    <CardDescription>Your attendance overview for the selected month.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    {summaryItems.map(item => (
                        <div key={item.label} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                            <span className="font-medium text-sm text-muted-foreground">{item.label}</span>
                            <Badge variant={item.variant} className={item.className}>{item.value}</Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </CardContent>
    </Card>
  )
}
