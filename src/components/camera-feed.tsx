
"use client"

import { useEffect, useRef, useState, memo } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, VideoOff, Camera, Expand, Home, WifiOff } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { useNotification } from '@/context/notification-context'

type CameraFeedProps = {
  employeeId: string;
  employeeName: string;
  workLocation: Employee['workLocation'];
  placeholderImage: string;
}

function CameraFeedComponent({ employeeId, employeeName, workLocation, placeholderImage }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast();
  const { addNotification } = useNotification();
  const [isCameraOn, setIsCameraOn] = useState(false);
  
  const previousWorkLocation = useRef(workLocation);

  const isDisconnected = workLocation === 'Disconnected';

  useEffect(() => {
    let stream: MediaStream;
    if (isCameraOn && !isDisconnected) {
      const enableStream = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
          setIsCameraOn(false); 
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please grant camera permission in your browser settings.",
          });
        }
      };
      enableStream();

      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
    } else if (isDisconnected && isCameraOn) {
        setIsCameraOn(false);
    }
  }, [isCameraOn, isDisconnected, toast]); 

  useEffect(() => {
    if (previousWorkLocation.current !== workLocation) {
        const notificationTitle = workLocation === 'Disconnected' ? 'You are Disconnected' : 'You are Reconnected';
        const notificationDescription = `You have ${workLocation === 'Disconnected' ? 'lost network connection' : 'come back online'}.`;
        
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


  const toggleCamera = () => {
    if (isDisconnected) {
        toast({
            variant: "destructive",
            title: "Cannot Start Camera",
            description: "Your system is disconnected from the network.",
        });
        return;
    }
    const newCameraState = !isCameraOn;
    setIsCameraOn(newCameraState);
    
    addNotification({
        title: `Camera Stream ${newCameraState ? 'Started' : 'Stopped'}`,
        description: `Your camera stream has been turned ${newCameraState ? 'on' : 'off'}.`,
    });
  }

  const handleCapture = () => {
    if (isDisconnected) {
      toast({ variant: "destructive", title: "Cannot Capture", description: "You are disconnected." });
      return;
    }
    if (videoRef.current && isCameraOn) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        toast({
          title: "Snapshot Captured!",
          description: (
            <div className="mt-2">
              <Image
                src={dataUrl}
                alt={`Snapshot of ${employeeName}`}
                width={400}
                height={300}
                className="rounded-md object-contain"
              />
            </div>
          ),
          duration: 5000,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Camera is Off",
        description: "Please turn on your camera to capture a snapshot.",
      });
    }
  };

  const getStatusBadge = () => {
    switch(workLocation) {
      case 'Office':
        return <Badge variant={isCameraOn ? 'default' : 'outline'} className={isCameraOn ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>{isCameraOn ? 'Online' : 'Offline'}</Badge>;
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
      <video ref={videoRef} className={`h-full w-full object-cover ${isCameraOn ? '' : 'hidden'}`} autoPlay muted playsInline />
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
    <Dialog>
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
                  <Button variant="outline" size="icon" onClick={handleCapture} disabled={isDisconnected}>
                    <Camera className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Capture</p>
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
      </DialogContent>
    </Dialog>
  )
}

export const CameraFeed = memo(CameraFeedComponent);
