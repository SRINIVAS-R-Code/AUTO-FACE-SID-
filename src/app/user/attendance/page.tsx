
import React from "react";
import { UserAttendanceCalendar } from "@/components/user-attendance-calendar"

function UserAttendancePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Attendance</h1>
      <UserAttendanceCalendar />
    </div>
  )
}

export default React.memo(UserAttendancePage);
