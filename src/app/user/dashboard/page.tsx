
"use client";

import { CameraFeed } from "@/components/camera-feed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck, ListChecks, Activity, BarChart, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context";

const quickStats = [
    { title: "Status", value: "Active", icon: CheckCircle },
    { title: "Productivity", value: "94%", icon: BarChart },
];

const tasks = [
    { id: 1, title: "Finalize Q3 report", completed: false },
    { id: 2, title: "Submit expense claims", completed: false },
    { id: 3, title: "Team meeting follow-up", completed: true },
];

const recentActivity = [
    { id: 1, description: "You checked in at 9:02 AM." },
    { id: 2, description: "AI wellness suggestion is available." },
    { id: 3, description: "Weekly performance summary is ready." },
]

export default function UserDashboardPage() {
    const { username } = useAuth();
  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
            <h1 className="text-2xl font-semibold">Welcome, {username || 'Employee'}!</h1>
            <p className="text-muted-foreground">Here's your live feed and daily overview.</p>
            </div>
            <Alert className="max-w-md">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Privacy and Security</AlertTitle>
            <AlertDescription>
                This system uses Face Recognition for attendance and monitoring purposes only. Your privacy is respected.
            </AlertDescription>
            </Alert>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    {quickStats.map(stat => (
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ListChecks /> My Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     {tasks.map(task => (
                        <div key={task.id} className="flex items-center">
                            <CheckCircle className={`h-4 w-4 mr-3 ${task.completed ? 'text-green-500' : 'text-muted-foreground/50'}`} />
                            <span className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
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

        <div>
            <CameraFeed />
        </div>
    </div>
  )
}
