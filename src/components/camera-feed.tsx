"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, VideoOff, Circle, Camera, Expand } from 'lucide-react'
import type { Employee } from '@/lib/types'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

type CameraFeedProps = {
  employee: Employee
}

export function CameraFeed({ employee }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  
  // Unique placeholder based on employee ID
  const placeholderImage = `https://picsum.photos/seed/${employee.id}/400/300`;

  const toggleCamera = async () => {
    if (isCameraOn) {
      const stream = videoRef.current?.srcObject as MediaStream | null
      stream?.getTracks().forEach((track) => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsCameraOn(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setIsCameraOn(true)
      } catch (err) {
        console.error("Error accessing camera: ", err)
        alert("Could not access camera. Please check permissions.")
      }
    }
  }

  useEffect(() => {
    return () => {
      // Clean up camera stream on component unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [])

  const VideoPlayer = ({ isFullView = false }: { isFullView?: boolean }) => (
    <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
      {isCameraOn ? (
         <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
      ) : (
        <Image src={placeholderImage} alt={`${employee.name}'s feed placeholder`} layout="fill" objectFit="cover" data-ai-hint="office background" />
      )}
      {!isCameraOn && !isFullView && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <VideoOff className="h-12 w-12 text-white/80" />
            <p className="mt-2 text-sm text-white/90 font-semibold">Camera is off</p>
        </div>
      )}
       {isCameraOn && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1/2 h-2/3 border-2 border-primary/50 rounded-lg shadow-lg animate-pulse border-dashed" />
          </div>
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-0.5 rounded-md text-xs font-bold flex items-center gap-1">
            <Circle className="h-2 w-2 fill-white" />
            LIVE
          </div>
          <div className="absolute bottom-2 left-2 text-white bg-black/50 rounded p-1 text-xs">
            <p>Status: ONLINE</p>
          </div>
        </>
      )}
    </div>
  )

  return (
    <Dialog>
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">{employee.name}</CardTitle>
          <Badge variant={employee.status === 'On Time' || employee.status === 'Late' ? 'default' : 'outline'} className={employee.status === 'On Time' || employee.status === 'Late' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}>
            <Circle className="mr-2 h-2 w-2 fill-current" />
            ONLINE
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow">
          <VideoPlayer />
        </CardContent>
        <CardFooter className="mt-4 flex justify-center gap-2">
            <Button onClick={toggleCamera} variant="outline" size="sm">
              {isCameraOn ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
              {isCameraOn ? 'Stop' : 'Start'} Stream
            </Button>
            <Button variant="outline" size="sm">
               <Camera className="mr-2 h-4 w-4" />
               Capture
            </Button>
            <DialogTrigger asChild>
               <Button variant="outline" size="icon" className="h-9 w-9">
                  <Expand className="h-4 w-4" />
               </Button>
            </DialogTrigger>
          </CardFooter>
      </Card>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{employee.name} - Live Feed</DialogTitle>
        </DialogHeader>
        <VideoPlayer isFullView />
      </DialogContent>
    </Dialog>
  )
}
