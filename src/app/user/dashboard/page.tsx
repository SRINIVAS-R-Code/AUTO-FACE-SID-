
"use client";

import { useState, useEffect, useRef } from "react";
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

const ACTIVITY_DECAY_RATE = 0.5; // smaller is slower
const ACTIVITY_UPDATE_INTERVAL = 1000; // ms

export default function UserDashboardPage() {
  const [time, setTime] = useState(new Date());
  const { username } = useAuth();
  
  const [keyboardActivity, setKeyboardActivity] = useState(100);
  const [mouseActivity, setMouseActivity] = useState(100);
  const [screenFocus, setScreenFocus] = useState(100);

  const keyActivityTimeoutRef = useRef<NodeJS.Timeout>();
  const mouseActivityTimeoutRef = useRef<NodeJS.Timeout>();


  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    const handleKeyDown = () => {
      setKeyboardActivity(100);
      if (keyActivityTimeoutRef.current) clearTimeout(keyActivityTimeoutRef.current);
    };

    const handleMouseMove = () => {
      setMouseActivity(100);
      if (mouseActivityTimeoutRef.current) clearTimeout(mouseActivityTimeoutRef.current);
    };
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setScreenFocus(0);
      } else {
        setScreenFocus(100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const activityDecayTimer = setInterval(() => {
        setKeyboardActivity(prev => Math.max(0, prev - ACTIVITY_DECAY_RATE));
        setMouseActivity(prev => Math.max(0, prev - ACTIVITY_DECAY_RATE));
        if (!document.hidden) {
             setScreenFocus(prev => Math.max(0, prev - ACTIVITY_DECAY_RATE));
        }
    }, ACTIVITY_UPDATE_INTERVAL);


    return () => {
        clearInterval(timer);
        clearInterval(activityDecayTimer);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        if (keyActivityTimeoutRef.current) clearTimeout(keyActivityTimeoutRef.current);
        if (mouseActivityTimeoutRef.current) clearTimeout(mouseActivityTimeoutRef.current);
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
                <span className="font-bold text-primary">{Math.round(keyboardActivity)}%</span>
              </div>
              <Progress value={keyboardActivity} />
            </div>
             <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Mouse /> Mouse Activity</span>
                <span className="font-bold text-green-500">{Math.round(mouseActivity)}%</span>
              </div>
              <Progress value={mouseActivity} className="[&>div]:bg-green-500" />
            </div>
             <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground"><Eye /> Screen Focus</span>
                <span className="font-bold text-blue-500">{Math.round(screenFocus)}%</span>
              </div>
              <Progress value={screenFocus} className="[&>div]:bg-blue-500"/>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    