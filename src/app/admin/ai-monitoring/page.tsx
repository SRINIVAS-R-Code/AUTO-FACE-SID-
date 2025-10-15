
"use client"

import { useState } from "react"
import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Cpu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEmployee } from "@/context/employee-context"

const aiStatuses = ["Active", "Idle", "Not Detected", "Low Engagement"];

export default function AIMonitoringPage() {
  const { employees } = useEmployee();
  const [cameraStates, setCameraStates] = useState<Record<string, boolean>>({});

  const setCameraState = (employeeId: string, isOn: boolean | ((prevState: boolean) => boolean)) => {
    setCameraStates(prev => ({
      ...prev,
      [employeeId]: typeof isOn === 'function' ? isOn(prev[employeeId] || false) : isOn,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2"><Cpu /> AI-Powered Insights</h1>
          <p className="text-muted-foreground">Real-time AI analysis of employee activity and status.</p>
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
        {employees.map((employee, index) => {
          const aiStatus = aiStatuses[index % aiStatuses.length];
          let badgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
          if (aiStatus === "Active") badgeVariant = "default";
          else if (aiStatus === "Idle") badgeVariant = "secondary";
          else if (aiStatus === "Not Detected") badgeVariant = "destructive";
          else if (aiStatus === "Low Engagement") badgeVariant = "outline";

          return (
            <div key={employee.id} className="relative">
              <CameraFeed 
                employee={employee}
                isCameraOn={cameraStates[employee.id] || false}
                setIsCameraOn={(isOn) => setCameraState(employee.id, isOn)}
              />
              <div className="absolute top-16 right-4">
                <Badge variant={badgeVariant}>{aiStatus}</Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

    