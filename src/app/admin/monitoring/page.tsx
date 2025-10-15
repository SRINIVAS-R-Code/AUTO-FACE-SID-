import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { EmployeeMonitorList } from "@/components/employee-monitor-list"
import { ShieldCheck } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Live Worker Monitoring</h1>
          <p className="text-muted-foreground">Select an employee to view their live feed.</p>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Privacy and Security</AlertTitle>
          <AlertDescription>
            This system uses Face Recognition for attendance and monitoring purposes only. All data is handled securely.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CameraFeed />
          <CameraFeed />
        </div>
        <div className="lg:col-span-1">
          <EmployeeMonitorList />
        </div>
      </div>
    </div>
  )
}
