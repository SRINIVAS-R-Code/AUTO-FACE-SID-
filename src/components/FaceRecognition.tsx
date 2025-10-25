import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { faceRecognitionApi } from '@/lib/api';

interface FaceRecognitionProps {
  employeeId: number;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ 
  employeeId, 
  onSuccess, 
  onError 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setSuccess(null);
    setIsCapturing(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      setIsCapturing(false);
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to base64 image
    return canvas.toDataURL('image/jpeg');
  };

  const processRecognition = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    
    try {
      const imageData = captureImage();
      if (!imageData) {
        throw new Error('Failed to capture image');
      }
      
      // In a real app, you would send the image to a face recognition API
      // For demo purposes, we'll simulate a successful recognition
      const recognitionData = {
        employee_id: employeeId,
        timestamp: new Date().toISOString(),
        confidence_score: 0.95, // Simulated confidence score
        location: 'Main Office',
        image_data: imageData.split(',')[1] // Remove the data:image/jpeg;base64, part
      };
      
      // Send to backend
      const result = await faceRecognitionApi.recordRecognition(recognitionData);
      
      setSuccess('Face recognition successful!');
      if (onSuccess) onSuccess(result);
      
      // Stop the camera after successful recognition
      stopCamera();
    } catch (err: any) {
      setError(err.message || 'Face recognition failed');
      if (onError) onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 640, mx: 'auto', mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Face Recognition
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ 
            width: '100%', 
            borderRadius: '8px',
            display: isCapturing ? 'block' : 'none'
          }}
        />
        
        <canvas 
          ref={canvasRef} 
          style={{ display: 'none' }}
        />
        
        {!isCapturing && !isProcessing && (
          <Box 
            sx={{ 
              width: '100%', 
              height: 320, 
              bgcolor: 'grey.200', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Camera is off
            </Typography>
          </Box>
        )}
        
        {isProcessing && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '8px'
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {!isCapturing ? (
          <Button 
            variant="contained" 
            onClick={startCamera}
            disabled={isProcessing}
          >
            Start Camera
          </Button>
        ) : (
          <>
            <Button 
              variant="outlined" 
              onClick={stopCamera}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={processRecognition}
              disabled={isProcessing}
            >
              Recognize Face
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default FaceRecognition;