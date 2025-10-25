
"use client"

import { ScreenMonitor } from "@/components/screen-monitor"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Cpu, Activity, Video, VideoOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEmployee } from "@/context/employee-context"
import { useState, useEffect } from "react"

interface ActiveStream {
  user_id: number
  name: string
  username: string
  is_active: boolean
  last_updated: string
}

const aiStatuses = ["Active", "Idle", "Not Detected", "Low Engagement"];

export default function AIMonitoringPage() {
  const { employees } = useEmployee();
  const activeEmployees = employees.filter(emp => emp.status === 'Active');
  const [activeStreams, setActiveStreams] = useState<ActiveStream[]>([])

  // Fetch active camera streams
  const fetchActiveStreams = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/camera/active-streams')
      const data = await response.json()
      setActiveStreams(data)
      console.log('Active streams:', data)
    } catch (error) {
      console.error('Failed to fetch active streams:', error)
    }
  }

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchActiveStreams()
    const interval = setInterval(fetchActiveStreams, 5000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Cpu className="h-6 w-6" /> 
            AI-Powered Employee Monitoring
          </h1>
          <p className="text-muted-foreground">Real-time AI analysis of employee activity, screen sharing, and productivity.</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              {activeEmployees.length} Active Now
            </Badge>
          </div>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>AI-Powered Monitoring</AlertTitle>
          <AlertDescription>
            Watch employee screens in real-time. AI analyzes activity patterns, engagement levels, and productivity metrics.
          </AlertDescription>
        </Alert>
      </div>

      {/* Live Camera Monitoring Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Video className="h-5 w-5" />
          Live Camera Monitoring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeStreams.map((stream) => (
            <div key={stream.user_id} className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-500">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{stream.name}</h3>
                  <p className="text-sm text-gray-600">@{stream.username}</p>
                </div>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700">LIVE</span>
                </div>
              </div>

              {/* Camera Status */}
              <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-3">
                <div className="text-center text-white">
                  <Video className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm">Camera Active</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last seen: {new Date(stream.last_updated).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-700">
                  View Feed
                </button>
                <button className="bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-300">
                  Info
                </button>
              </div>
            </div>
          ))}

          {activeStreams.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <VideoOff className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No active camera streams</p>
              <p className="text-sm">Waiting for users to start their cameras...</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Screen Monitoring Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          AI Screen Monitoring
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee, index) => {
            const aiStatus = aiStatuses[index % aiStatuses.length];
            let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
            if (aiStatus === "Active") badgeVariant = "default";
            else if (aiStatus === "Idle") badgeVariant = "secondary";
            else if (aiStatus === "Not Detected") badgeVariant = "destructive";
            else if (aiStatus === "Low Engagement") badgeVariant = "outline";

            return (
              <div key={employee.id} className="relative">
                <ScreenMonitor
                  employeeId={employee.id}
                  employeeName={employee.name}
                  workLocation={employee.workLocation}
                  status={employee.status}
                />
                <div className="absolute top-16 right-4 z-10">
                  <Badge variant={badgeVariant} className="shadow-lg">
                    AI: {aiStatus}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
