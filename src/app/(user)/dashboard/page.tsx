import { UserAttendanceCalendar } from "@/components/user-attendance-calendar"
import { WellnessTracker } from "@/components/wellness-tracker"
import { NotificationsPanel } from "@/components/notifications-panel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Clock, TrendingUp, Zap } from "lucide-react"

const userPerformance = {
  productivity: "97%",
  punctuality: "99%",
  tasksCompleted: 124,
  overtimeHours: 5,
};

const activityFeed = [
  { id: 1, action: "Checked in", time: "9:02 AM" },
  { id: 2, action: "Completed task 'Design new landing page'", time: "11:30 AM" },
  { id: 3, action: "Submitted wellness check-in", time: "1:00 PM" },
  { id: 4, action: "Checked out", time: "5:58 PM" },
];

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Dashboard</h1>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>Your key metrics at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center space-y-1 bg-muted/50 p-4 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">{userPerformance.productivity}</span>
                <span className="text-xs text-muted-foreground">Productivity</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1 bg-muted/50 p-4 rounded-lg">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">{userPerformance.punctuality}</span>
                <span className="text-xs text-muted-foreground">Punctuality</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1 bg-muted/50 p-4 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">{userPerformance.tasksCompleted}</span>
                <span className="text-xs text-muted-foreground">Tasks Done</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1 bg-muted/50 p-4 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">{userPerformance.overtimeHours}</span>
                <span className="text-xs text-muted-foreground">Overtime (h)</span>
              </div>
            </CardContent>
          </Card>
          <WellnessTracker />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm">{item.action}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <UserAttendanceCalendar />
          <NotificationsPanel />
        </div>
      </div>
    </div>
  )
}
