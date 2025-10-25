
"use client";
import React, { useState, useEffect } from "react";
import { kpiData, attendanceChartData, teamProductivityData, productivityTrendData, taskCompletionData } from "@/lib/data"
import { KpiCard } from "@/components/kpi-card"
import { AttendanceTrendsChart } from "@/components/attendance-trends-chart"
import { EmployeeStatusTable } from "@/components/employee-status-table"
import { DepartmentPerformanceChart } from "@/components/department-performance-chart"
import { Clock, Zap, BarChart3, Users, FileDown, FileSpreadsheet, FileText, Video, VideoOff, Monitor } from "lucide-react"
import { ProductivityTrendChart } from "@/components/productivity-trend-chart"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { TaskCompletionPieChart } from "@/components/task-completion-pie-chart"
import { useEmployee } from "@/context/employee-context"
import { LiveChatWidget } from "@/components/live-chat-widget"


interface ActiveStream {
  user_id: number
  name: string
  username: string
  is_active: boolean
  last_updated: string
}

function AdminDashboardPage() {
  const { employees } = useEmployee();
  const [activeStreams, setActiveStreams] = useState<ActiveStream[]>([])

  // Fetch active camera streams
  const fetchActiveStreams = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/camera/active-streams')
      if (response.ok) {
        const data = await response.json()
        setActiveStreams(data)
        console.log('📹 Active streams:', data.length, 'users')
      }
    } catch (error) {
      console.error('Failed to fetch streams:', error)
    }
  }

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchActiveStreams()
    const interval = setInterval(fetchActiveStreams, 5000)
    return () => clearInterval(interval)
  }, [])
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
    <div className="space-y-6 relative">
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

      {/* Live AI Monitoring Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Live AI Monitoring</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeStreams.map((stream) => (
            <div
              key={stream.user_id}
              className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-500"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{stream.name}</h3>
                  <p className="text-sm text-gray-600">@{stream.username}</p>
                </div>

                {/* LIVE Badge */}
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700">LIVE</span>
                </div>
              </div>

              {/* Camera Status */}
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-3">
                <Video className="w-12 h-12 text-green-400 animate-pulse" />
              </div>

              {/* Action Button */}
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Monitor className="w-4 h-4" />
                View User Screen
              </button>
            </div>
          ))}

          {activeStreams.length === 0 && (
            <div className="col-span-full text-center py-12">
              <VideoOff className="w-16 h-16 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium text-gray-600">No active cameras</p>
              <p className="text-sm text-gray-500">Waiting for users to start monitoring...</p>
            </div>
          )}
        </div>
      </div>

      {/* Live Chat Widget - Floating */}
      <LiveChatWidget
        currentUserId={1} // Admin ID
        currentUserName="Admin User"
        otherUserId={2} // Default to John Doe
        otherUserName="John Doe"
        otherUserRole="user"
      />
    </div>
  )
}

export default React.memo(AdminDashboardPage);
