"use client"

import { useState, useEffect } from "react"
import { X, Bot, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AIAssistantHint() {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Don't show on login page
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      return
    }
    
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('ai-assistant-hint-seen')
    
    if (!hasSeenHint) {
      // Show hint after 2 seconds
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem('ai-assistant-hint-seen', 'true')
  }

  if (!showHint) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4 max-w-xs relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background text-foreground hover:bg-background/90"
          onClick={dismissHint}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start gap-3">
          <Bot className="h-6 w-6 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">AI Assistant is Here!</h3>
            <p className="text-sm opacity-90 mb-2">
              Click the button below to ask me anything about your dashboard, employees, or monitoring data!
            </p>
            <p className="text-xs opacity-75">
              I'm monitoring 24/7 and can tell you what happened while you were away! 👁️
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
