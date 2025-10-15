import { UserAttendanceCalendar } from "@/components/user-attendance-calendar"
import { WellnessTracker } from "@/components/wellness-tracker"
import { NotificationsPanel } from "@/components/notifications-panel"

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Dashboard</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <WellnessTracker />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <UserAttendanceCalendar />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  )
}
