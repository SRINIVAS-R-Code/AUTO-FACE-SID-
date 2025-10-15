"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, VideoOff, Camera, Expand } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useToast } from '@/hooks/use-toast'

type CameraFeedProps = {
  employee: Employee
}

export function CameraFeed({ employee }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  const placeholderImage = `https://picsum.photos/seed/${employee.id}/400/300`;

  useEffect(() => {
    // This effect handles starting and stopping the camera stream
    let stream: MediaStream;
    if (isCameraOn) {
      const enableStream = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
          setIsCameraOn(false); // Turn button back off if permission is denied
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please grant camera permission in your browser settings.",
          });
        }
      };
      enableStream();

      // The cleanup function for this effect
      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };
    }
  }, [isCameraOn, toast]); // This effect re-runs whenever isCameraOn changes


  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
    if (isCameraOn) {
      // Clear snapshot when turning off camera
      setSnapshotUrl(null);
    }
  }

  const handleCapture = () => {
    if (videoRef.current && isCameraOn) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setSnapshotUrl(dataUrl);
        toast({
          title: "Snapshot Captured!",
          description: `A snapshot of ${employee.name} has been taken.`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Camera is Off",
        description: "Please turn on the camera to capture a snapshot.",
      });
    }
  };

  const VideoPlayer = ({ isFullView = false }: { isFullView?: boolean }) => (
    <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
      <video ref={videoRef} className={`h-full w-full object-cover ${isCameraOn ? '' : 'hidden'}`} autoPlay muted playsInline />
      {!isCameraOn && (
        <>
          <Image src={placeholderImage} alt={`${employee.name}'s feed placeholder`} fill objectFit="cover" data-ai-hint="office background" />
          {!isFullView && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <VideoOff className="h-12 w-12 text-white/80" />
              <p className="mt-2 text-sm text-white/90 font-semibold">Camera is off</p>
            </div>
          )}
        </>
      )}

      {isCameraOn && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
          LIVE
        </div>
      )}
       <div className="absolute bottom-2 left-2 bg-black/50 text-white rounded px-2 py-1 text-xs">
          <p>Status: {isCameraOn ? 'ONLINE' : 'OFFLINE'}</p>
      </div>
    </div>
  )

  return (
    <Dialog>
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">{employee.name}</CardTitle>
          <Badge variant={isCameraOn ? 'default' : 'outline'} className={isCameraOn ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
            {isCameraOn ? 'ONLINE' : 'OFFLINE'}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <VideoPlayer />
        </CardContent>
        <CardFooter className="mt-4 flex justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={toggleCamera} variant="outline" size="icon">
                    {isCameraOn ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isCameraOn ? 'Stop' : 'Start'} Stream</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleCapture}>
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
          <DialogTitle>{snapshotUrl ? `${employee.name} - Snapshot` : `${employee.name} - Live Feed`}</DialogTitle>
        </DialogHeader>
        {snapshotUrl ? (
          <div className="relative aspect-video w-full">
            <Image src={snapshotUrl} alt={`Snapshot of ${employee.name}`} fill objectFit="contain" />
          </div>
        ) : (
          <VideoPlayer isFullView />
        )}
      </DialogContent>
    </Dialog>
  )
}
