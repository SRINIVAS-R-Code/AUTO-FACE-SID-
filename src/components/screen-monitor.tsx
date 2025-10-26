"use client"

import { useEffect, useRef, useState, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Monitor, MonitorOff, Camera, Expand, Download, Activity } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

type ScreenMonitorProps = {
  employeeId: string;
  employeeName: string;
  workLocation: Employee['workLocation'];
  status: Employee['status'];
}

function ScreenMonitorComponent({ employeeId, employeeName, workLocation, status }: ScreenMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const fullScreenVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'screen'>('camera');

  const isDisconnected = workLocation === 'Disconnected';
  const isOnline = status === 'Active';

  // Fetch camera status from backend on component mount and periodically
  useEffect(() => {
    const fetchCameraStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/camera/status/${employeeId}`);
        const data = await response.json();
        setIsCameraOn(data.is_active || false);
      } catch (error) {
        console.error('Failed to fetch camera status:', error);
      }
    };

    fetchCameraStatus();
    const interval = setInterval(fetchCameraStatus, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [employeeId]);

  // Demo video URLs - using free stock videos
  const cameraVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const screenVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  // Play video when camera is turned on
  useEffect(() => {
    const videos = [videoRef.current, fullVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    
    if (isCameraOn) {
      videos.forEach(video => {
        if (video) {
          video.load(); // Reload the video source
          video.play().catch(err => console.log('Video play error:', err));
        }
      });
    } else {
      videos.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [isCameraOn, isDialogOpen]);

  // Play screen video when screen sharing is turned on
  useEffect(() => {
    const videos = [screenVideoRef.current, fullScreenVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    
    if (isScreenSharing) {
      videos.forEach(video => {
        if (video) {
          video.load(); // Reload the video source
          video.play().catch(err => console.log('Video play error:', err));
        }
      });
    } else {
      videos.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [isScreenSharing, isDialogOpen]);

  // Ensure videos play when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setTimeout(() => {
        if (isCameraOn && fullVideoRef.current) {
          fullVideoRef.current.load();
          fullVideoRef.current.play().catch(err => console.log('Full video play error:', err));
        }
        if (isScreenSharing && fullScreenVideoRef.current) {
          fullScreenVideoRef.current.load();
          fullScreenVideoRef.current.play().catch(err => console.log('Full screen video play error:', err));
        }
      }, 100);
    }
  }, [isDialogOpen, isCameraOn, isScreenSharing]);

  const toggleCamera = () => {
    if (isDisconnected || !isOnline) {
        toast({
            variant: "destructive",
            title: "Cannot Start Camera",
            description: "Employee is not online or disconnected.",
        });
        return;
    }

    if (isCameraOn) {
      setIsCameraOn(false);
      toast({
        title: "Camera Stream Stopped",
        description: `Stopped monitoring ${employeeName}'s camera.`,
      });
    } else {
      setIsCameraOn(true);
      toast({
        title: "Camera Stream Started",
        description: `Monitoring ${employeeName}'s camera feed.`,
      });
    }
  };

  const toggleScreenShare = () => {
    if (isDisconnected || !isOnline) {
        toast({
            variant: "destructive",
            title: "Cannot Start Screen Share",
            description: "Employee is not online or disconnected.",
        });
        return;
    }

    if (isScreenSharing) {
      setIsScreenSharing(false);
      toast({
        title: "Screen Share Stopped",
        description: `Stopped monitoring ${employeeName}'s screen.`,
      });
    } else {
      setIsScreenSharing(true);
      setActiveTab('screen');
      toast({
        title: "Screen Share Started",
        description: `Monitoring ${employeeName}'s screen activity.`,
      });
    }
  };
  
  useEffect(() => {
    // Stop streams if disconnected
    if (isDisconnected) {
      setIsCameraOn(false);
      setIsScreenSharing(false);
    }
  }, [isDisconnected]);

  const handleScreenshot = (type: 'camera' | 'screen') => {
    const videoElement = isDialogOpen 
      ? (type === 'camera' ? fullVideoRef.current : fullScreenVideoRef.current)
      : (type === 'camera' ? videoRef.current : screenVideoRef.current);
    
    const isActive = type === 'camera' ? isCameraOn : isScreenSharing;

    if (!videoElement || !isActive) {
      toast({
        variant: "destructive",
        title: `${type === 'camera' ? 'Camera' : 'Screen'} is Off`,
        description: `Please start ${type === 'camera' ? 'camera' : 'screen share'} to capture.`,
      });
      return;
    }
    
    // Create canvas to capture video frame
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${type}-${employeeName.replace(/\s+/g, '_')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Screenshot Captured!",
        description: `${type === 'camera' ? 'Camera' : 'Screen'} screenshot saved.`,
      });
    }
  };

  const getStatusBadge = () => {
    if (!isOnline) return <Badge variant="outline">Offline</Badge>;
    if (isDisconnected) return <Badge variant="destructive">Disconnected</Badge>;
    if (isCameraOn || isScreenSharing) {
      return <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
        <Activity className="mr-1.5 h-3 w-3" /> Monitoring
      </Badge>;
    }
    return <Badge variant="outline">Idle</Badge>;
  }

  const VideoPlayer = ({ isFullView = false }: { isFullView?: boolean }) => (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'camera' | 'screen')} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="camera" disabled={!isCameraOn}>
          Camera {isCameraOn && <span className="ml-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />}
        </TabsTrigger>
        <TabsTrigger value="screen" disabled={!isScreenSharing}>
          Screen {isScreenSharing && <span className="ml-1 h-2 w-2 bg-red-500 rounded-full animate-pulse" />}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="camera" className="mt-4">
        <div className="relative aspect-video w-full bg-black rounded-md overflow-hidden flex items-center justify-center">
          <video 
            ref={isFullView ? fullVideoRef : videoRef}
            src={cameraVideoUrl}
            className={`h-full w-full object-cover ${isCameraOn ? '' : 'hidden'}`}
            loop
            muted
            playsInline
          />
          {!isCameraOn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
              <MonitorOff className="h-12 w-12 text-white/80" />
              <p className="mt-2 text-sm text-white/90 font-semibold">Camera is off</p>
              <p className="mt-1 text-xs text-white/70">Click &quot;Start Camera&quot; to begin monitoring</p>
            </div>
          )}
          {isCameraOn && (
            <>
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md text-xs">
                <p className="font-semibold">{employeeName}</p>
                <p className="text-[10px] text-white/80">Employee ID: {employeeId}</p>
              </div>
            </>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="screen" className="mt-4">
        <div className="relative aspect-video w-full bg-black rounded-md overflow-hidden flex items-center justify-center">
          <video 
            ref={isFullView ? fullScreenVideoRef : screenVideoRef}
            src={screenVideoUrl}
            className={`h-full w-full object-contain ${isScreenSharing ? '' : 'hidden'}`}
            loop
            muted
            playsInline
          />
          {!isScreenSharing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
              <MonitorOff className="h-12 w-12 text-white/80" />
              <p className="mt-2 text-sm text-white/90 font-semibold">Screen share is off</p>
              <p className="mt-1 text-xs text-white/70">Click &quot;Start Screen Share&quot; to begin monitoring</p>
            </div>
          )}
          {isScreenSharing && (
            <>
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
                <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
                SCREEN SHARE
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md text-xs">
                <p className="font-semibold">{employeeName}&apos;s Screen</p>
                <p className="text-[10px] text-white/80">Active applications: 3 | CPU: 45%</p>
              </div>
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">{employeeName}</CardTitle>
            <p className="text-xs text-muted-foreground">{workLocation}</p>
          </div>
          {getStatusBadge()}
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <VideoPlayer />
        </CardContent>
        <CardFooter className="mt-auto flex justify-center gap-2 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={toggleCamera} variant="outline" size="icon" disabled={isDisconnected || !isOnline}>
                    {isCameraOn ? <MonitorOff className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCameraOn ? 'Stop' : 'Start'} Camera</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={toggleScreenShare} variant="outline" size="icon" disabled={isDisconnected || !isOnline}>
                    <Monitor className={cn("h-4 w-4", isScreenSharing && "text-green-600")} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isScreenSharing ? 'Stop' : 'Start'} Screen Share</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleScreenshot(activeTab)} 
                      disabled={!isCameraOn && !isScreenSharing}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Capture Screenshot</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Expand className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Full View</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
      </Card>
      
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>{`${employeeName} - Live Monitoring`}</DialogTitle>
        </DialogHeader>
        <VideoPlayer isFullView />
        <div className="flex justify-end gap-2 mt-2">
            <Button onClick={() => handleScreenshot('camera')} variant="outline" disabled={!isCameraOn}>
                <Download className="mr-2 h-4 w-4" />
                Camera Screenshot
            </Button>
            <Button onClick={() => handleScreenshot('screen')} variant="outline" disabled={!isScreenSharing}>
                <Download className="mr-2 h-4 w-4" />
                Screen Screenshot
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const ScreenMonitor = memo(ScreenMonitorComponent);
