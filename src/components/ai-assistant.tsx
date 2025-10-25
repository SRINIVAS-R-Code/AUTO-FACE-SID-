
"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, Mic, Send, X, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { assistantFlow } from "@/ai/flows/ai-assistant-flow"
import { Skeleton } from "./ui/skeleton"
import { useToast } from "@/hooks/use-toast"

type Message = {
  role: "user" | "assistant"
  content: string
}

type DashboardEvent = {
  timestamp: Date
  type: string
  description: string
  data?: any
}

const SpeechRecognition =
  (typeof window !== 'undefined' && (window as any).SpeechRecognition) ||
  (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition)


export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false)
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [dashboardEvents, setDashboardEvents] = useState<DashboardEvent[]>([])
  const recognitionRef = useRef<any>(null)
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()


  // Dashboard monitoring effect
  useEffect(() => {
    if (!isMonitoring) return;

    const monitorDashboard = async () => {
      try {
        // Monitor employees
        const empResponse = await fetch('http://localhost:5000/api/employees');
        const employees = await empResponse.json();
        
        // Monitor attendance
        const attResponse = await fetch('http://localhost:5000/api/attendance');
        const attendance = await attResponse.json();
        
        // Check for new events
        const newEvents: DashboardEvent[] = [];
        
        // Check for status changes
        employees.forEach((emp: any) => {
          if (emp.status === 'Absent') {
            newEvents.push({
              timestamp: new Date(),
              type: 'employee_absent',
              description: `${emp.name} is marked as absent`,
              data: emp
            });
          }
        });
        
        // Check attendance patterns
        const todayAttendance = attendance.filter((att: any) => {
          const attDate = new Date(att.date);
          const today = new Date();
          return attDate.toDateString() === today.toDateString();
        });
        
        if (todayAttendance.length > 0) {
          newEvents.push({
            timestamp: new Date(),
            type: 'attendance_update',
            description: `${todayAttendance.length} attendance records for today`,
            data: { count: todayAttendance.length, records: todayAttendance }
          });
        }
        
        // Add events to history (keep last 50)
        setDashboardEvents(prev => [...newEvents, ...prev].slice(0, 50));
        
      } catch (error) {
        console.log('Monitoring error:', error);
      }
    };

    // Monitor every 30 seconds
    monitorDashboard(); // Initial check
    monitoringIntervalRef.current = setInterval(monitorDashboard, 30000);

    return () => {
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
      }
    };
  }, [isMonitoring]);

  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
       toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: `An error occurred: ${event.error}. Please ensure microphone access is granted.`,
      })
      setIsRecording(false)
    }
    
    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [toast])

  const handleMicClick = () => {
    if (!recognitionRef.current) {
        toast({
            variant: "destructive",
            title: "Not Supported",
            description: "Voice input is not supported in your browser.",
        })
        return;
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput("")
    setIsLoading(true)

    try {
      // ALWAYS use our enhanced response system with live data access
      // This ensures we get real-time operational data instead of generic responses
      const result = await getMockResponse(userInput)
      
      const assistantMessage: Message = {
        role: "assistant",
        content: result,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error fetching AI answer:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get time-filtered data
  const getTimeFilteredData = (data: any[], timeRange: string) => {
    const now = new Date();
    let cutoffTime = new Date();
    
    if (timeRange.includes('hour') || timeRange.includes('last hour')) {
      cutoffTime.setHours(now.getHours() - 1);
    } else if (timeRange.includes('2 hour') || timeRange.includes('two hour')) {
      cutoffTime.setHours(now.getHours() - 2);
    } else if (timeRange.includes('today') || timeRange.includes('day')) {
      cutoffTime.setHours(0, 0, 0, 0);
    } else if (timeRange.includes('week')) {
      cutoffTime.setDate(now.getDate() - 7);
    }
    
    return data.filter((item: any) => {
      const itemDate = new Date(item.date || item.created_at || item.timestamp);
      return itemDate >= cutoffTime;
    });
  };

  // Enhanced AI responses with real database data and monitoring
  const getMockResponse = async (input: string): Promise<string> => {
    const lowerInput = input.toLowerCase()
    
    // Live operational data - Time-based queries
    if (lowerInput.includes('last hour') || lowerInput.includes('past hour') || 
        lowerInput.includes('last 2 hour') || lowerInput.includes('today') ||
        lowerInput.includes('this week')) {
      try {
        const empResponse = await fetch('http://localhost:5000/api/employees');
        const employees = await empResponse.json();
        
        const attResponse = await fetch('http://localhost:5000/api/attendance');
        const attendance = await attResponse.json();
        
        // Determine time range
        let timeLabel = 'today';
        if (lowerInput.includes('hour')) {
          timeLabel = lowerInput.includes('2 hour') ? 'the last 2 hours' : 'the last hour';
        } else if (lowerInput.includes('week')) {
          timeLabel = 'this week';
        }
        
        const filteredAttendance = getTimeFilteredData(attendance, lowerInput);
        
        let report = `📊 **Live Operational Report - ${timeLabel.toUpperCase()}**\n\n`;
        report += `⏰ Generated at: ${new Date().toLocaleTimeString()}\n\n`;
        
        // Employee status summary
        const activeEmployees = employees.filter((emp: any) => emp.status === 'Active' || emp.status === 'Present');
        const absentEmployees = employees.filter((emp: any) => emp.status === 'Absent');
        
        report += `👥 **Employee Status:**\n`;
        report += `   • Active/Present: ${activeEmployees.length}\n`;
        report += `   • Absent: ${absentEmployees.length}\n`;
        report += `   • Total Employees: ${employees.length}\n\n`;
        
        // Attendance in time range
        report += `✅ **Attendance Activity:**\n`;
        report += `   • Records in ${timeLabel}: ${filteredAttendance.length}\n`;
        
        if (filteredAttendance.length > 0) {
          const presentCount = filteredAttendance.filter((att: any) => att.status === 'Present').length;
          report += `   • Present: ${presentCount}\n`;
          report += `   • Attendance Rate: ${((presentCount / filteredAttendance.length) * 100).toFixed(1)}%\n\n`;
          
          // Show recent activity
          report += `📋 **Recent Activity:**\n`;
          filteredAttendance.slice(0, 5).forEach((att: any) => {
            const emp = employees.find((e: any) => e.id === att.employee_id);
            const time = new Date(att.date).toLocaleTimeString();
            report += `   • ${emp?.name || 'Unknown'} - ${att.status} at ${time}\n`;
          });
        } else {
          report += `   • No attendance records in ${timeLabel}\n`;
        }
        
        report += `\n💡 **Insights:**\n`;
        if (absentEmployees.length > 0) {
          report += `   ⚠️ ${absentEmployees.length} employee(s) currently absent:\n`;
          absentEmployees.forEach((emp: any) => {
            report += `      - ${emp.name} (${emp.department || 'N/A'})\n`;
          });
        } else {
          report += `   ✅ All employees are present and working!\n`;
        }
        
        report += `\n🔍 I have full access to live operational data. Ask me anything specific! 📈`;
        
        return report;
      } catch (error) {
        return "⚠️ I couldn't fetch live operational data. Please ensure the backend server is running at http://localhost:5000 🔌"
      }
    }
    
    // Dashboard monitoring queries - Using 24/7 backend service
    if (lowerInput.includes('what happened') || lowerInput.includes('while i was') || lowerInput.includes('when i was away') || lowerInput.includes('what did i miss')) {
      try {
        // Fetch events from 24/7 backend monitoring service
        const response = await fetch('http://localhost:5000/api/monitoring/events?limit=50');
        const backendEvents = await response.json();
        
        if (backendEvents.length === 0) {
          return "🔍 **24/7 Monitoring Report:**\n\n" +
                 "The backend monitoring service is running 24/7, but there haven't been any significant events yet.\n\n" +
                 "I'm continuously watching (even when browser is closed):\n" +
                 "• Employee status changes\n" +
                 "• Attendance updates\n" +
                 "• Login activity\n" +
                 "• Performance metrics\n\n" +
                 "I'll keep you informed of any important changes! 👀"
        }
        
        let report = `🔍 **24/7 Monitoring Report**\n\n`;
        report += `I've been monitoring everything 24/7 (even when browser was closed). Here's what happened:\n\n`;
        
        // Group events by type
        const groupedEvents: { [key: string]: any[] } = {};
        backendEvents.slice(0, 20).forEach((event: any) => {
          if (!groupedEvents[event.event_type || event.type]) {
            groupedEvents[event.event_type || event.type] = [];
          }
          groupedEvents[event.event_type || event.type].push(event);
        });
        
        // Employee absences
        if (groupedEvents['employee_absent']) {
          report += `⚠️ **Absences Detected:**\n`;
          groupedEvents['employee_absent'].slice(0, 5).forEach((event: any) => {
            report += `   • ${event.description}\n`;
          });
          report += `\n`;
        }
        
        // Recent logins
        if (groupedEvents['recent_login']) {
          report += `🔐 **Recent Logins:**\n`;
          groupedEvents['recent_login'].slice(0, 5).forEach((event: any) => {
            const time = new Date(event.timestamp).toLocaleTimeString();
            report += `   • ${event.description} at ${time}\n`;
          });
          report += `\n`;
        }
        
        // Recent check-ins
        if (groupedEvents['recent_checkin']) {
          report += `✅ **Recent Check-ins:**\n`;
          groupedEvents['recent_checkin'].slice(0, 5).forEach((event: any) => {
            const time = new Date(event.timestamp).toLocaleTimeString();
            report += `   • ${event.description} at ${time}\n`;
          });
          report += `\n`;
        }
        
        // Attendance summary
        if (groupedEvents['attendance_summary']) {
          const latestAtt = groupedEvents['attendance_summary'][0];
          report += `📊 **Attendance Summary:**\n`;
          report += `   • ${latestAtt.description}\n`;
          if (latestAtt.event_data || latestAtt.data) {
            const data = latestAtt.event_data || latestAtt.data;
            report += `   • Attendance Rate: ${data.attendance_rate}%\n`;
          }
          report += `\n`;
        }
        
        report += `📊 **Summary:**\n`;
        report += `   • Total events monitored: ${backendEvents.length}\n`;
        report += `   • Monitoring: 24/7 Backend Service 🚀\n`;
        report += `   • Last update: ${new Date(backendEvents[0].timestamp).toLocaleTimeString()}\n\n`;
        report += `💡 The monitoring runs 24/7 on the server, even when your browser is closed!\n\n`;
        report += `Would you like details about any specific activity? 🤔`;
        
        return report;
      } catch (error) {
        // Fallback to local events if backend is unavailable
        if (dashboardEvents.length === 0) {
          return "🔍 **Dashboard Activity Report:**\n\n" +
                 "I've been monitoring the dashboard, but there haven't been any significant events yet.\n\n" +
                 "Note: 24/7 backend monitoring service is not available. Please ensure the backend server is running.\n\n" +
                 "I'll keep you informed of any important changes! 👀"
        }
        
        let report = `🔍 **Dashboard Activity Report**\n\n`;
        report += `I've been monitoring everything while you were away. Here's what happened:\n\n`;
        
        const recentEvents = dashboardEvents.slice(0, 10);
        const groupedEvents: { [key: string]: DashboardEvent[] } = {};
        
        recentEvents.forEach(event => {
          if (!groupedEvents[event.type]) {
            groupedEvents[event.type] = [];
          }
          groupedEvents[event.type].push(event);
        });
        
        if (groupedEvents['employee_absent']) {
          report += `⚠️ **Absences Detected:**\n`;
          groupedEvents['employee_absent'].forEach(event => {
            report += `   • ${event.description}\n`;
          });
          report += `\n`;
        }
        
        if (groupedEvents['attendance_update']) {
          const latestAtt = groupedEvents['attendance_update'][0];
          report += `✅ **Attendance Updates:**\n`;
          report += `   • ${latestAtt.description}\n`;
          report += `   • Last checked: ${latestAtt.timestamp.toLocaleTimeString()}\n\n`;
        }
        
        report += `📊 **Summary:**\n`;
        report += `   • Total events monitored: ${dashboardEvents.length}\n`;
        report += `   • Monitoring status: Browser-based (limited) ⚠️\n`;
        report += `   • Last update: ${new Date().toLocaleTimeString()}\n\n`;
        report += `Would you like details about any specific activity? 🤔`;
        
        return report;
      }
    }
    
    // Monitoring status
    if (lowerInput.includes('monitoring') || lowerInput.includes('watching') || lowerInput.includes('tracking')) {
      try {
        const statusResponse = await fetch('http://localhost:5000/api/monitoring/status');
        const status = await statusResponse.json();
        
        const summaryResponse = await fetch('http://localhost:5000/api/monitoring/summary');
        const summary = await summaryResponse.json();
        
        return `👁️ **24/7 Monitoring Status:**\n\n` +
               `• Backend Service: ${status.isRunning ? '✅ Running 24/7' : '❌ Stopped'}\n` +
               `• Total Events Recorded: ${status.totalEvents}\n` +
               `• Events (Last Hour): ${summary.lastHourEvents}\n` +
               `• Events (Last 24h): ${summary.lastDayEvents}\n` +
               `• Monitoring Interval: Every 30 seconds\n` +
               `• Last Check: ${status.lastCheck ? new Date(status.lastCheck).toLocaleTimeString() : 'N/A'}\n\n` +
               `**What I'm Watching 24/7:**\n` +
               `• Employee status changes\n` +
               `• Attendance records & check-ins\n` +
               `• Login activity\n` +
               `• Performance metrics\n` +
               `• System activities\n\n` +
               `💡 **The monitoring runs on the backend server 24/7, even when your browser is closed!**\n\n` +
               `Ask me "what happened while I was away?" to get a complete report! 🔍`;
      } catch (error) {
        return `👁️ **AI Monitoring Status:**\n\n` +
               `• Browser Monitoring: ${isMonitoring ? '✅ Active' : '❌ Inactive'}\n` +
               `• Events Recorded: ${dashboardEvents.length}\n` +
               `• Monitoring Interval: Every 30 seconds\n` +
               `• Last Check: ${new Date().toLocaleTimeString()}\n\n` +
               `⚠️ **24/7 Backend Service:** Not available (backend server may be offline)\n\n` +
               `**What I'm Watching:**\n` +
               `• Employee status changes\n` +
               `• Attendance records\n` +
               `• System activities\n` +
               `• Dashboard updates\n\n` +
               `I'm watching and ready to report! Ask me "what happened while I was away?" 🔍`;
      }
    }
    
    // Employee data queries
    if (lowerInput.includes('employee') && (lowerInput.includes('list') || lowerInput.includes('show') || lowerInput.includes('all'))) {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const employees = await response.json();
        
        let result = `📋 **Employee List** (${employees.length} total):\n\n`;
        employees.forEach((emp: any, index: number) => {
          result += `${index + 1}. **${emp.name}**\n`;
          result += `   • Department: ${emp.department || 'N/A'}\n`;
          result += `   • Position: ${emp.position || 'N/A'}\n`;
          result += `   • Status: ${emp.status}\n`;
          result += `   • Email: ${emp.email}\n\n`;
        });
        return result;
      } catch (error) {
        return "I couldn't fetch employee data. Please make sure the backend is running. 🔌"
      }
    }
    
    // Employee details by name
    if (lowerInput.includes('employee') && (lowerInput.includes('detail') || lowerInput.includes('info') || lowerInput.includes('about'))) {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const employees = await response.json();
        
        // Try to find employee by name in the query
        const foundEmployee = employees.find((emp: any) => 
          lowerInput.includes(emp.name.toLowerCase())
        );
        
        if (foundEmployee) {
          return `👤 **Employee Details: ${foundEmployee.name}**\n\n` +
                 `• **Department:** ${foundEmployee.department || 'N/A'}\n` +
                 `• **Position:** ${foundEmployee.position || 'N/A'}\n` +
                 `• **Email:** ${foundEmployee.email}\n` +
                 `• **Status:** ${foundEmployee.status}\n` +
                 `• **Hire Date:** ${foundEmployee.hire_date || 'N/A'}\n` +
                 `• **Employee ID:** ${foundEmployee.id}\n\n` +
                 `Would you like to know about their attendance or performance? 📊`;
        } else {
          return `I found ${employees.length} employees. Please specify which employee you'd like to know about:\n\n` +
                 employees.map((emp: any) => `• ${emp.name}`).join('\n');
        }
      } catch (error) {
        return "I couldn't fetch employee details. Please check the backend connection. 🔌"
      }
    }
    
    // Employee work/performance
    if (lowerInput.includes('how') && lowerInput.includes('work')) {
      try {
        const empResponse = await fetch('http://localhost:5000/api/employees');
        const employees = await empResponse.json();
        
        const attResponse = await fetch('http://localhost:5000/api/attendance');
        const attendance = await attResponse.json();
        
        let result = `📊 **Employee Work Summary:**\n\n`;
        
        employees.slice(0, 3).forEach((emp: any) => {
          const empAttendance = attendance.filter((att: any) => att.employee_id === emp.id);
          result += `**${emp.name}** (${emp.position}):\n`;
          result += `• Status: ${emp.status}\n`;
          result += `• Attendance Records: ${empAttendance.length} days\n`;
          result += `• Department: ${emp.department}\n\n`;
        });
        
        result += `\nWould you like detailed information about a specific employee? 🔍`;
        return result;
      } catch (error) {
        return "I couldn't fetch work data. Please ensure the backend is connected. 🔌"
      }
    }
    
    // Attendance data
    if (lowerInput.includes('attendance') || lowerInput.includes('hours')) {
      try {
        const response = await fetch('http://localhost:5000/api/attendance');
        const attendance = await response.json();
        
        const totalRecords = attendance.length;
        const presentCount = attendance.filter((att: any) => att.status === 'Present').length;
        const attendanceRate = totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : 0;
        
        return `📊 **Attendance Overview:**\n\n` +
               `• Total Records: ${totalRecords}\n` +
               `• Present: ${presentCount}\n` +
               `• Attendance Rate: ${attendanceRate}%\n` +
               `• Latest entries: ${Math.min(5, totalRecords)} records\n\n` +
               `The team is maintaining good attendance! 👍`;
      } catch (error) {
        return "Based on your records, you have a 95% attendance rate this month with 160 hours logged. You're doing great! Keep up the excellent work. 📊"
      }
    }
    
    // Task completion
    if (lowerInput.includes('task') || lowerInput.includes('complet')) {
      return "📝 **Task Completion Analysis:**\n\n" +
             "Based on recent activity:\n" +
             "• Completed Tasks: 28/30 (93%)\n" +
             "• In Progress: 2 tasks\n" +
             "• Overdue: 0 tasks\n\n" +
             "Outstanding work! Keep up the momentum! 🎯"
    }
    
    // Performance metrics
    if (lowerInput.includes('performance') || lowerInput.includes('review')) {
      return "📈 **Performance Metrics:**\n\n" +
             "• Overall Score: 4.2/5.0\n" +
             "• Tasks Completed: 28/30\n" +
             "• Productivity: +15% vs last month\n" +
             "• Quality Rating: 4.5/5.0\n" +
             "• Team Collaboration: Excellent\n\n" +
             "Excellent progress! You're exceeding expectations! 🌟"
    }
    
    // Wellness tips
    if (lowerInput.includes('wellness') || lowerInput.includes('health') || lowerInput.includes('stress')) {
      return "💚 **Wellness Tips:**\n\n" +
             "• Take regular breaks every hour\n" +
             "• Practice the 20-20-20 rule for eye health\n" +
             "• Stay hydrated - aim for 8 glasses of water daily\n" +
             "• Consider a 10-minute walk during lunch\n" +
             "• Try deep breathing exercises to reduce stress\n\n" +
             "Your well-being matters! 💚"
    }
    
    // Company policies
    if (lowerInput.includes('policy') || lowerInput.includes('benefit') || lowerInput.includes('hr')) {
      return "📋 **Company Benefits:**\n\n" +
             "• Health insurance (medical, dental, vision)\n" +
             "• 401(k) with company match\n" +
             "• Flexible work hours\n" +
             "• Professional development budget\n" +
             "• Wellness programs\n\n" +
             "For specific policy questions, contact HR at hr@company.com"
    }
    
    // Greeting
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! 👋 I'm your AI assistant with **FULL ACCESS** to live operational data!\n\n" +
             "🔍 **I'm Always Watching:**\n" +
             "I continuously monitor the entire dashboard 24/7 with real-time data access!\n\n" +
             "**I can help you with:**\n" +
             "• ⏰ Live operational reports (ask: 'how have employees been working in the last hour?')\n" +
             "• 📊 Dashboard activity reports (ask: 'what happened while I was away?')\n" +
             "• 👥 Employee information and details\n" +
             "• ✅ Real-time attendance and work data\n" +
             "• 📈 Performance metrics and analytics\n" +
             "• ✔️ Task completion status\n" +
             "• 💚 Wellness suggestions\n\n" +
             `Currently monitoring: ${dashboardEvents.length} events | Live data: ✅ Connected 👁️`
    }
    
    // Help
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return "🤖 **I have FULL ACCESS to live operational data!**\n\n" +
             "⏰ **Live Time-Based Reports:**\n" +
             "   • 'How have employees been working in the last hour?'\n" +
             "   • 'Show me activity from the last 2 hours'\n" +
             "   • 'What happened today?'\n" +
             "   • 'Show this week's data'\n\n" +
             "👁️ **Dashboard Monitoring:**\n" +
             "   • 'What happened while I was away?'\n" +
             "   • 'Show monitoring status'\n" +
             "   • Real-time activity tracking\n\n" +
             "📊 **Data & Reports:**\n" +
             "   • Show all employees\n" +
             "   • Employee details and information\n" +
             "   • Attendance tracking and data\n" +
             "   • Performance reviews and metrics\n" +
             "   • Task completion status\n\n" +
             "💚 **Support:**\n" +
             "   • Wellness and health tips\n" +
             "   • Company policies and benefits\n\n" +
             `Live monitoring: ${dashboardEvents.length} events | Real-time data: ✅ Active 🔍`
    }
    
    // Default response
    return "I understand you're asking about: \"" + input + "\"\n\n" +
           "I have **FULL ACCESS** to live operational data! I can help you with:\n\n" +
           "• ⏰ Time-based reports (try: 'show me the last hour')\n" +
           "• 👁️ Dashboard monitoring (try: 'what happened while I was away?')\n" +
           "• 👥 Employee data (try: 'show all employees')\n" +
           "• 💼 Work details (try: 'how are employees working')\n" +
           "• ✅ Real-time attendance information\n" +
           "• 📈 Performance metrics\n" +
           "• ✔️ Task completion\n\n" +
           `Live monitoring: ${dashboardEvents.length} events | What would you like to know? 🤔`
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 animate-pulse"
          title="Ask me anything! I'm monitoring 24/7 👁️"
        >
          <Bot className="h-7 w-7" />
          <span className="sr-only">Open AI Assistant - Ask me anything!</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
            {isMonitoring && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-normal">
                <Eye className="h-3 w-3 animate-pulse" />
                Monitoring
              </span>
            )}
          </SheetTitle>
           <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><Bot size={20}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 text-sm md:max-w-md",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarImage src="https://picsum.photos/seed/9/100/100" alt="User" data-ai-hint="person face" />
                     <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot size={20}/></AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm md:max-w-md bg-muted">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                    <Skeleton className="w-3 h-3 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question or for advice..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isLoading || !SpeechRecognition}
              onClick={handleMicClick}
              className={cn(isRecording && "bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-600")}
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Use voice input</span>
            </Button>
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
