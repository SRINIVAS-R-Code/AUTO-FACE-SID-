
"use client"

import { useEffect, useRef, useState, memo } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, VideoOff, Camera, Expand, Home, WifiOff, Download } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { useNotification } from '@/context/notification-context'
import { cn } from '@/lib/utils'

type CameraFeedProps = {
  employeeId: string;
  employeeName: string;
  workLocation: Employee['workLocation'];
  placeholderImage: string;
}

function CameraFeedComponent({ employeeId, employeeName, workLocation, placeholderImage }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const { addNotification } = useNotification();
  
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const previousWorkLocation = useRef(workLocation);
  const isDisconnected = workLocation === 'Disconnected';

  const toggleCamera = async () => {
    if (isDisconnected) {
        toast({
            variant: "destructive",
            title: "Cannot Start Camera",
            description: "Your system is disconnected from the network.",
        });
        return;
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setIsCameraOn(false);
      addNotification({
        title: `Camera Stream Stopped`,
        description: `Your camera stream has been turned off.`,
      });
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        setIsCameraOn(true);
        addNotification({
          title: `Camera Stream Started`,
          description: `Your camera stream has been turned on.`,
        });
      } catch (err) {
        console.error("Error accessing camera: ", err);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please grant camera permission in your browser settings.",
        });
      }
    }
  };

  useEffect(() => {
    // Automatically try to turn on camera on component mount
    if (!isCameraOn && !isDisconnected) {
      toggleCamera();
    }

    // Cleanup stream on component unmount
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Stop stream if disconnected
    if (isDisconnected && mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setIsCameraOn(false);
    }
  }, [isDisconnected, mediaStream]);

  useEffect(() => {
    // Notification for connection status change
    if (previousWorkLocation.current !== workLocation) {
        const notificationTitle = workLocation === 'Disconnected' ? `${employeeName} is Disconnected` : `${employeeName} is Reconnected`;
        const notificationDescription = `${employeeName} has ${workLocation === 'Disconnected' ? 'lost network connection' : 'come back online'}.`;
        
        addNotification({
            title: notificationTitle,
            description: notificationDescription,
        });

        toast({
            variant: workLocation === 'Disconnected' ? 'destructive' : 'default',
            title: notificationTitle,
            description: notificationDescription,
        });
        previousWorkLocation.current = workLocation;
    }
  }, [workLocation, employeeName, toast, addNotification]);

  useEffect(() => {
    const applyStream = (videoElement: HTMLVideoElement | null) => {
        if (videoElement && mediaStream) {
            if (videoElement.srcObject !== mediaStream) {
                videoElement.srcObject = mediaStream;
            }
        }
    }
    applyStream(videoRef.current);
    if(isDialogOpen) {
        applyStream(fullVideoRef.current);
    }
  }, [mediaStream, isDialogOpen]);

  const handleScreenshot = () => {
    const videoElement = isDialogOpen ? fullVideoRef.current : videoRef.current;

    if (!videoElement || !mediaStream || videoElement.readyState < 2) {
      toast({
        variant: "destructive",
        title: "Camera is Off or Not Ready",
        description: "Please turn on the camera to capture a screenshot.",
      });
      return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `screenshot-${employeeName.replace(' ', '_')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Screenshot Captured!",
        description: `A screenshot of ${employeeName} has been downloaded.`,
      });
    }
  };


  const getStatusBadge = () => {
    switch(workLocation) {
      case 'Office':
        return <Badge variant={isCameraOn ? 'default' : 'outline'} className={cn(isCameraOn && 'bg-green-500/20 text-green-700 border-green-500/30')}>{isCameraOn ? 'Online' : 'Offline'}</Badge>;
      case 'Home':
        return <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 border-blue-500/30"><Home className="mr-1.5 h-3 w-3" /> WFH</Badge>;
      case 'Disconnected':
        return <Badge variant="destructive"><WifiOff className="mr-1.5 h-3 w-3" /> Disconnected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  }

  const VideoPlayer = ({ isFullView = false }: { isFullView?: boolean }) => (
    <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
      <video ref={isFullView ? fullVideoRef : videoRef} className={`h-full w-full object-cover ${isCameraOn ? '' : 'hidden'}`} autoPlay muted playsInline />
      {!isCameraOn && (
        <>
          <Image src={placeholderImage} alt={`${employeeName}'s feed placeholder`} fill objectFit="cover" data-ai-hint="office background" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center">
            {isDisconnected ? (
               <Alert variant="destructive" className="max-w-xs bg-destructive/50 border-destructive/80 text-destructive-foreground">
                  <WifiOff className="h-4 w-4" />
                  <AlertTitle>Network Disconnected</AlertTitle>
                  <AlertDescription>
                    Unable to establish a connection.
                  </AlertDescription>
                </Alert>
            ) : (
                <>
                 <VideoOff className="h-12 w-12 text-white/80" />
                 <p className="mt-2 text-sm text-white/90 font-semibold">Camera is off</p>
                </>
            )}
          </div>
        </>
      )}

      {isCameraOn && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
          LIVE
        </div>
      )}
       <div className="absolute bottom-2 left-2 bg-black/50 text-white rounded px-2 py-1 text-xs flex items-center gap-1.5">
        <div className="flex items-center gap-1.5">Status:</div>
        {getStatusBadge()}
      </div>
    </div>
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">{employeeName}</CardTitle>
          {getStatusBadge()}
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <VideoPlayer />
        </CardContent>
        <CardFooter className="mt-auto flex justify-center gap-2 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={toggleCamera} variant="outline" size="icon" disabled={isDisconnected}>
                    {isCameraOn ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCameraOn ? 'Stop' : 'Start'} Stream</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleScreenshot} disabled={!isCameraOn}>
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
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{`${employeeName} - Live Feed`}</DialogTitle>
        </DialogHeader>
        <VideoPlayer isFullView />
        <div className="flex justify-end gap-2 mt-2">
            <Button onClick={handleScreenshot} variant="outline" disabled={!isCameraOn}>
                <Download className="mr-2 h-4 w-4" />
                Download Screenshot
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const CameraFeed = memo(CameraFeedComponent);
