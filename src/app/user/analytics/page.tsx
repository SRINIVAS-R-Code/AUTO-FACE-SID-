
"use client";

import { taskCompletionData, teamProductivityData, employeeActivityData } from "@/lib/data"
import { KpiCard } from "@/components/kpi-card"
import { TaskCompletionPieChart } from "@/components/task-completion-pie-chart"
import { Users, Zap, Clock, UserCheck } from "lucide-react"
import { useAuth } from "@/context/auth-context";
import { TeamProductivityChart } from "@/components/team-productivity-chart";
import { EmployeeActivityChart } from "@/components/employee-activity-chart";
import { ActivityMonitor } from "@/components/activity-monitor";

export default function AnalyticsPage() {
    const { username } = useAuth();
    const userKpiData = [
        {
          title: "My Productivity",
          value: "94.5%",
          change: "+2.1%",
          changeType: "increase",
          icon: Zap,
        },
        {
          title: "On-Time Rate",
          value: "99.1%",
          change: "+0.8%",
          changeType: "increase",
          icon: UserCheck,
        },
        {
          title: "Avg. Focus Time",
          value: "6.8h",
          change: "-0.2h",
          changeType: "decrease",
          icon: Clock,
        },
         {
          title: "Tasks Completed",
          value: "134",
          change: "+12",
          changeType: "increase",
          icon: Users,
        }
      ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Performance Analytics</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userKpiData.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityMonitor />
        <EmployeeActivityChart data={employeeActivityData} />
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TaskCompletionPieChart data={taskCompletionData} />
        <TeamProductivityChart data={teamProductivityData} />
      </div>
    </div>
  );
}
