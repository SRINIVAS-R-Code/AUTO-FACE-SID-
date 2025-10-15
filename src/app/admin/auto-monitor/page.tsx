
"use client"

import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"
import { employeeData } from "@/lib/data"

export default function AutoMonitorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Auto Monitor</h1>
          <p className="text-muted-foreground">Automated monitoring of employee camera feeds.</p>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Privacy and Security</AlertTitle>
          <AlertDescription>
            This system uses Face Recognition for attendance and monitoring purposes only. All data is handled securely.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employeeData.map(employee => (
          <CameraFeed key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  )
}
