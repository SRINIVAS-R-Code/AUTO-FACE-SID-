
"use client"

import { ScreenMonitor } from "@/components/screen-monitor"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Monitor } from "lucide-react"
import { useEmployee } from "@/context/employee-context"
import { Badge } from "@/components/ui/badge"

export default function MonitoringPage() {
  const { employees } = useEmployee();
  const activeEmployees = employees.filter(emp => emp.status === 'Active');
  const onlineCount = activeEmployees.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            Live Employee Monitoring
          </h1>
          <p className="text-muted-foreground">Real-time camera and screen monitoring of all employees.</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{employees.length} Total Employees</Badge>
            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
              {onlineCount} Online
            </Badge>
          </div>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Privacy and Security</AlertTitle>
          <AlertDescription>
            This system monitors employee activity for productivity and security purposes. All data is encrypted and handled securely.
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
