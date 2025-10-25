
"use client";
import React from "react";
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
import { useEmployee } from "@/context/employee-context"


function AdminDashboardPage() {
  const { employees } = useEmployee();
  const handleExport = (format: 'csv' | 'word') => {
    let data = '';
    let mimeType = '';
    let fileExtension = '';

    if (format === 'csv') {
      data = 'Metric,Value,Change\nTotal Employees,1250,+1.5%\nProductivity,99.2%,+1.2%';
      mimeType = 'text/csv';
      fileExtension = 'csv';
    } else {
      data = 'Dashboard Report\n\nTotal Employees: 1,250 (+1.5%)\nProductivity: 99.2% (+1.2%)';
      mimeType = 'application/msword';
      fileExtension = 'doc';
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-report.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const newKpiData = [
    {
      title: "Total Employees",
      value: employees.length.toString(),
      change: "+1.5%",
      changeType: "increase" as const,
      icon: Users,
    },
    {
      title: "Productivity",
      value: "99.2%",
      change: "+1.2%",
      changeType: "increase" as const,
      icon: Zap,
    },
    {
      title: "Overtime Hours",
      value: "120",
      change: "-5%",
      changeType: "decrease" as const,
      icon: Clock,
    },
     {
      title: "Active Employees",
      value: employees.filter(e => e.status === 'Active').length.toString(),
      change: "+10",
      changeType: "increase" as const,
      icon: Users,
    }
  ].slice(0, 4);


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
            <DropdownMenuItem onSelect={() => handleExport('csv')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleExport('word')}>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DepartmentPerformanceChart />
        <TaskCompletionPieChart data={taskCompletionData} />
      </div>
      
      <EmployeeStatusTable />
    </div>
  )
}

export default React.memo(AdminDashboardPage);
