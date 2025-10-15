
"use client";

import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

export default function UserDashboardPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
       <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Live Monitoring Feed</h1>
          <p className="text-muted-foreground">Your camera feed and activity status.</p>
        </div>
        <Alert className="max-w-md">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Privacy and Security</AlertTitle>
          <AlertDescription>
            This system uses Face Recognition for attendance and monitoring purposes only. Your privacy is respected.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex-grow grid grid-cols-1">
        <CameraFeed />
      </div>
    </div>
  )
}
