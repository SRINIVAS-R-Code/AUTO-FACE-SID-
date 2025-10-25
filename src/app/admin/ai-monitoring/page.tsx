
"use client"

import { ScreenMonitor } from "@/components/screen-monitor"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Cpu, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEmployee } from "@/context/employee-context"

const aiStatuses = ["Active", "Idle", "Not Detected", "Low Engagement"];

export default function AIMonitoringPage() {
  const { employees } = useEmployee();
  const activeEmployees = employees.filter(emp => emp.status === 'Active');
  
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
  )
}
