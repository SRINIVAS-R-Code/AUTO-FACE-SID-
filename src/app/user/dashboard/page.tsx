
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Clock,
  Activity,
  TimerOff,
  UserCheck,
  Computer,
  Smile,
  MapPin,
  Circle,
  Zap,
  Keyboard,
  Mouse,
  Eye
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function UserDashboardPage() {
  const [time, setTime] = useState(new Date());
  const { username } = useAuth();
  const [keyboardActivity, setKeyboardActivity] = useState(75);
  const [mouseActivity, setMouseActivity] = useState(90);
  const [screenFocus, setScreenFocus] = useState(85);


  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    const activityTimer = setInterval(() => {
        setKeyboardActivity(Math.floor(Math.random() * 21) + 70); // 70-90
        setMouseActivity(Math.floor(Math.random() * 21) + 75); // 75-95
        setScreenFocus(Math.floor(Math.random() * 16) + 80); // 80-95
      }, 3000);

    return () => {
        clearInterval(timer);
        clearInterval(activityTimer);
    }
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {username || 'Employee'}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      
      <Card className="bg-card/60">
        <CardContent className="pt-6 flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                <UserCheck size={32} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">Welcome, {username || 'Employee'}!</h2>
              <p className="text-muted-foreground">Software Engineer • Employee ID: EMP001</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Circle className="h-3 w-3 fill-green-500 text-green-500" /> Active</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Main Office</span>
                <span className="flex items-center gap-1"><Smile className="h-3 w-3" /> Wellness: Good</span>
                <span className="flex items-center gap-1"><UserCheck className="h-3 w-3" /> Face Detected</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-muted-foreground text-sm">Current Time</p>
            <p className="text-3xl font-bold text-primary">{formattedTime}</p>
            <div className="flex items-center justify-end gap-2 mt-2 text-sm text-green-500">
                <Zap size={16}/> AI Engine: 98.5%
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Today's Status <CheckCircle className="text-muted-foreground"/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Checked In</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Working Hours <Clock className="text-muted-foreground"/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.2h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Active Time <Activity className="text-muted-foreground"/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3.8h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex justify-between items-center">
              Idle Time <TimerOff className="text-muted-foreground"/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0.4h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserCheck /> Face Recognition</CardTitle>
             <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">AI-powered identity verification for secure attendance.</p>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <span className="text-sm font-medium">Authentication Status</span>
                <Badge variant="default" className="bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30">Face Detected</Badge>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-muted rounded-md">
                    <Computer className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <CardTitle>System Interaction</CardTitle>
                    <CardDescription>Real-time activity monitoring</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Keyboard /> Keyboard Activity</span>
                <span className="font-bold text-primary">{keyboardActivity}%</span>
              </div>
              <Progress value={keyboardActivity} />
            </div>
             <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Mouse /> Mouse Activity</span>
                <span className="font-bold text-green-500">{mouseActivity}%</span>
              </div>
              <Progress value={mouseActivity} className="[&>div]:bg-green-500" />
            </div>
             <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Eye /> Screen Focus</span>
                <span className="font-bold text-blue-500">{screenFocus}%</span>
              </div>
              <Progress value={screenFocus} className="[&>div]:bg-blue-500"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

