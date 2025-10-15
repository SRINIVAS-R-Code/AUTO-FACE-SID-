
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle,
  Clock,
  Activity,
  TimerOff,
  UserCheck,
  Smile,
  MapPin,
  Circle,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function UserDashboardPage() {
  const [time, setTime] = useState(new Date());
  const { username } = useAuth();
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
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
    </div>
  );
}
