
"use client";

import { useRef } from "react";
import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, Activity, ScreenShare, Briefcase, Coffee, VideoOff, LogIn, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context";
import { ActivityMonitor } from "@/components/activity-monitor";
import { useEmployee } from "@/context/employee-context";

const timeStats = [
    { title: "Log In Time", value: "09:02 AM", icon: LogIn },
    { title: "Screen Time", value: "6h 15m", icon: ScreenShare },
    { title: "Working Time", value: "7h 30m", icon: Briefcase },
    { title: "Break Time", value: "45m", icon: Coffee },
    { title: "Stream Off", value: "15m", icon: VideoOff },
    { title: "Log Out Time", value: "17:58 PM", icon: LogOut },
];

const recentActivity = [
    { id: 1, description: "You checked in at 9:02 AM." },
    { id: 2, description: "AI wellness suggestion is available." },
    { id: 3, description: "Weekly performance summary is ready." },
]

export default function UserDashboardPage() {
    const { username } = useAuth();
    const { employees } = useEmployee();
    const cameraRef = useRef<HTMLDivElement>(null);
    
    // Find the current user's employee data
    const currentUser = employees.find(e => e.name === username) || employees.find(e => e.email.startsWith(username?.toLowerCase() || '')) || employees[0];

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
            <h1 className="text-2xl font-semibold">Welcome, {username || 'Employee'}!</h1>
            <p className="text-muted-foreground">Here's your live feed and daily overview.</p>
            </div>
             <div className="flex gap-2">
                <Alert className="max-w-md">
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Privacy and Security</AlertTitle>
                    <AlertDescription>
                        This system uses Face Recognition for attendance and monitoring purposes only. Your privacy is respected.
                    </AlertDescription>
                </Alert>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Daily Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {timeStats.map(stat => (
                            <div key={stat.title} className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <stat.icon className="h-4 w-4" />
                                    <h4 className="text-sm font-medium">{stat.title}</h4>
                                </div>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity /> Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     {recentActivity.map(activity => (
                        <div key={activity.id} className="flex items-start text-sm">
                            <span className="text-muted-foreground mr-2">•</span>
                            <span>{activity.description}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2" ref={cameraRef}>
                <CameraFeed 
                    employeeId={currentUser.id}
                    employeeName={currentUser.name}
                    workLocation={currentUser.workLocation}
                    placeholderImage={currentUser.avatar}
                />
            </div>
            <div className="lg:col-span-1">
                <ActivityMonitor />
            </div>
        </div>
    </div>
  )
}
