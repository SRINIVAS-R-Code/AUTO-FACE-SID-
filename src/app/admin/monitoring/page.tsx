import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Live Camera Monitoring</h1>
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Privacy and Security</AlertTitle>
        <AlertDescription>
          This system is for attendance purposes only. All data is handled securely and in compliance with company policy.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CameraFeed />
        <CameraFeed />
      </div>
    </div>
  )
}
