"use client"

import { useEffect, useRef } from 'react';
import { useNotification } from '@/context/notification-context';
import { useToast } from '@/hooks/use-toast';

interface LoginEvent {
  id: number;
  userId: number;
  username: string;
  email: string;
  role: string;
  timestamp: string;
  ipAddress: string;
}

export function useLoginMonitor(isAdmin: boolean) {
  const { addNotification } = useNotification();
  const { toast } = useToast();
  const lastEventIdRef = useRef<number>(0);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (!isAdmin) return;

    const checkForNewLogins = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/login-events?limit=5');
        if (!response.ok) return;
        
        const events: LoginEvent[] = await response.json();
        
        if (events.length === 0) return;
        
        // On first load, just set the last event ID without showing notifications
        if (isFirstLoadRef.current) {
          lastEventIdRef.current = events[0].id;
          isFirstLoadRef.current = false;
          return;
        }
        
        // Check for new events
        const newEvents = events.filter(event => event.id > lastEventIdRef.current);
        
        if (newEvents.length > 0) {
          // Update the last event ID
          lastEventIdRef.current = newEvents[0].id;
          
          // Show notifications for new logins
          newEvents.reverse().forEach(event => {
            const loginTime = new Date(event.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            addNotification({
              title: `${event.username} logged in`,
              description: `${event.role === 'admin' ? 'Admin' : 'Employee'} logged in at ${loginTime}`,
            });
            
            toast({
              title: "New Login Detected",
              description: `${event.username} (${event.role}) logged in at ${loginTime}`,
            });
          });
        }
      } catch (error) {
        console.error('Error checking login events:', error);
      }
    };

    // Check immediately on mount
    checkForNewLogins();
    
    // Then poll every 5 seconds
    const interval = setInterval(checkForNewLogins, 5000);
    
    return () => clearInterval(interval);
  }, [isAdmin, addNotification, toast]);
}
