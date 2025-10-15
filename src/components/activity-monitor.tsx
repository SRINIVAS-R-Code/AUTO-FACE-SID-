
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Keyboard, Mouse, Eye } from "lucide-react";

const ACTIVITY_DECAY_RATE = 0.5; // smaller is slower
const ACTIVITY_UPDATE_INTERVAL = 1000; // ms

export function ActivityMonitor() {
  const [keyboardActivity, setKeyboardActivity] = useState(100);
  const [mouseActivity, setMouseActivity] = useState(100);
  const [screenFocus, setScreenFocus] = useState(100);

  useEffect(() => {
    const handleKeyDown = () => setKeyboardActivity(100);
    const handleMouseMove = () => setMouseActivity(100);
    const handleVisibilityChange = () => {
      setScreenFocus(document.hidden ? 0 : 100);
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
        clearInterval(activityDecayTimer);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Activity</CardTitle>
        <CardDescription>Real-time interaction with your system.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><Keyboard size={16}/> Keyboard</span>
            <span className="font-bold text-primary">{Math.round(keyboardActivity)}%</span>
          </div>
          <Progress value={keyboardActivity} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><Mouse size={16}/> Mouse</span>
            <span className="font-bold text-green-500">{Math.round(mouseActivity)}%</span>
          </div>
          <Progress value={mouseActivity} className="[&>div]:bg-green-500" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><Eye size={16}/> Focus</span>
            <span className="font-bold text-blue-500">{Math.round(screenFocus)}%</span>
          </div>
          <Progress value={screenFocus} className="[&>div]:bg-blue-500"/>
        </div>
      </CardContent>
    </Card>
  );
}
