
"use client"

import { ScreenMonitor } from "@/components/screen-monitor"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Video } from "lucide-react"
import { useEmployee } from "@/context/employee-context"
import { Badge } from "@/components/ui/badge"

export default function SecurityCamerasPage() {
  const { employees } = useEmployee();
  const activeEmployees = employees.filter(emp => emp.status === 'Active');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Video className="h-6 w-6" />
            Security Command Center
          </h1>
          <p className="text-muted-foreground">Central hub for all live employee camera feeds and screen monitoring.</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{employees.length} Total Cameras</Badge>
            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
              {activeEmployees.length} Active
            </Badge>
          </div>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Security Monitoring</AlertTitle>
          <AlertDescription>
            Monitor employee cameras and screens for security and compliance. All feeds are recorded and encrypted.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
           <ScreenMonitor 
            key={employee.id}
            employeeId={employee.id}
            employeeName={employee.name}
            workLocation={employee.workLocation}
            status={employee.status}
          />
        ))}
      </div>
    </div>
  )
}
