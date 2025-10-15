
import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export default function LiveCameraPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Live Camera Feed</h1>
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Privacy and Security</AlertTitle>
        <AlertDescription>
          This system uses Face Recognition for attendance and monitoring purposes only. Your privacy is respected.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CameraFeed />
      </div>
    </div>
  )
}
