
import { kpiData, attendanceChartData, teamProductivityData, productivityTrendData, taskCompletionData } from "@/lib/data"
import { KpiCard } from "@/components/kpi-card"
import { AttendanceTrendsChart } from "@/components/attendance-trends-chart"
import { EmployeeStatusTable } from "@/components/employee-status-table"
import { DepartmentPerformanceChart } from "@/components/department-performance-chart"
import { Clock, Zap, BarChart3, Users, FileDown, FileSpreadsheet, FileText } from "lucide-react"
import { ProductivityTrendChart } from "@/components/productivity-trend-chart"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TaskCompletionPieChart } from "@/components/task-completion-pie-chart"


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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Word
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {newKpiData.map((kpi) => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceTrendsChart data={attendanceChartData} />
        <ProductivityTrendChart data={productivityTrendData} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
            <EmployeeStatusTable />
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 gap-6">
          <DepartmentPerformanceChart />
        </div>
      </div>
    </div>
  )
}
