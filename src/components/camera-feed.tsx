"use client"

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, VideoOff, Square, Circle } from 'lucide-react'

export function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

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
          videoRef.current.play()
        }
        setIsCameraOn(true)
      } catch (err) {
        console.error("Error accessing camera: ", err)
        alert("Could not access camera. Please check permissions.")
      }
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // TODO: Implement actual video recording logic
  }

  useEffect(() => {
    return () => {
      // Clean up camera stream on component unmount
      const stream = videoRef.current?.srcObject as MediaStream | null
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden flex items-center justify-center">
          <video ref={videoRef} className="h-full w-full object-cover" muted />
          {!isCameraOn && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50">
                <VideoOff className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Camera is off</p>
            </div>
          )}
          {isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-2/3 border-4 border-primary/50 rounded-lg shadow-lg animate-pulse border-dashed" />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Face Detection Active
              </div>
            </div>
          )}
           {isRecording && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-md">
                <Circle className="h-3 w-3 fill-white" />
                <span className="font-mono text-sm">REC</span>
              </div>
            )}
        </div>
        <div className="mt-4 flex gap-4">
          <Button onClick={toggleCamera} variant="outline">
            {isCameraOn ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
            {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </Button>
          <Button onClick={toggleRecording} disabled={!isCameraOn}>
             {isRecording ? <Square className="mr-2 h-4 w-4" /> : <Circle className="mr-2 h-4 w-4" />}
             {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
