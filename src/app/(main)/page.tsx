import { kpiData, attendanceChartData } from "@/lib/data"
import { KpiCard } from "@/components/kpi-card"
import { AttendanceTrendsChart } from "@/components/attendance-trends-chart"
import { EmployeeStatusTable } from "@/components/employee-status-table"
import { DepartmentPerformanceChart } from "@/components/department-performance-chart"
import { Clock, Zap, BarChart3, Users } from "lucide-react"
import { ChartContainer } from "@/components/ui/chart"

const newKpiData = [
  ...kpiData,
  {
    title: "Productivity",
    value: "99.2%",
    change: "+1.2%",
    changeType: "increase",
    icon: Zap,
  },
  {
    title: "Overtime Hours",
    value: "120",
    change: "-5%",
    changeType: "decrease",
    icon: Clock,
  },
  {
    title: "Task Completion",
    value: "95%",
    change: "+2%",
    changeType: "increase",
    icon: BarChart3,
  },
   {
    title: "Active Employees",
    value: "1,245",
    change: "+10",
    changeType: "increase",
    icon: Users,
  }
].slice(0, 4);


export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {newKpiData.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <AttendanceTrendsChart data={attendanceChartData} />
        </div>
        <div className="lg:col-span-2">
          <DepartmentPerformanceChart />
        </div>
      </div>
      <EmployeeStatusTable />
    </div>
  )
}
