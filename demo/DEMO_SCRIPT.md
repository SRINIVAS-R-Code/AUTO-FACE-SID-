# 🎬 MonitorAI - Complete Demo Video Script

## Project Showcase Demo Guide
**Duration:** 8-10 minutes  
**Purpose:** Demonstrate full functionality for both Admin and User roles

---

## 📋 Pre-Recording Checklist

### Before You Start Recording:

✅ **Backend Running:**
```bash
cd backend
node server.js
# Should show: Server running on port 5000
```

✅ **Frontend Running:**
```bash
npm run dev
# Should show: Ready on http://localhost:3000
```

✅ **Database Connected:**
- PostgreSQL running
- Database: `auto_face_sid_db` exists
- Tables created and populated

✅ **Browser Setup:**
- Clear browser cache
- Close unnecessary tabs
- Use Chrome/Edge for best performance
- Have two browser windows ready (one for admin, one for user)

✅ **Screen Recording:**
- Use OBS Studio, Camtasia, or built-in screen recorder
- Set resolution to 1920x1080 (Full HD)
- Enable microphone for narration
- Test audio levels

---

## 🎥 DEMO SCRIPT - PART 1: INTRODUCTION (1 min)

### Scene 1: Landing Page
**URL:** http://localhost:3000

**Narration:**
> "Welcome to MonitorAI - a comprehensive employee monitoring and attendance tracking system. This full-stack application combines face recognition, real-time camera monitoring, screen sharing, and AI-powered analytics to help organizations manage their workforce effectively."

**Actions:**
- Show the landing page
- Briefly scroll to show features
- Highlight key technologies: Next.js, PostgreSQL, TypeScript

---

## 🎥 PART 2: USER REGISTRATION (2 min)

### Scene 2: Register as Employee
**URL:** http://localhost:3000/register

**Narration:**
> "Let's start by registering a new employee. The system supports role-based registration."

**Actions:**
1. Click "Sign Up" or navigate to register
2. Fill in the form:
   - **Username:** `sarah_johnson`
   - **Email:** `sarah@company.com`
   - **Password:** `user123`
   - **Confirm Password:** `user123`
   - **Role:** Select "Employee / User"
3. Click "Sign Up"

**Narration:**
> "Notice the role selection dropdown - users can register as either an Employee or an Admin. We're registering as an employee first."

**Expected Result:**
- Registration successful
- Redirected to user dashboard

---

### Scene 3: User Dashboard Tour
**URL:** http://localhost:3000/user/dashboard

**Narration:**
> "Here's the employee dashboard. Let's explore the key features available to regular employees."

**Actions & Features to Show:**

#### 3.1 Dashboard Overview (30 sec)
- Show KPI cards (Attendance Rate, Hours Worked, Tasks Completed)
- Point out the clean, modern interface
- Show dark/light theme toggle

#### 3.2 Attendance Calendar (30 sec)
- Navigate to "Attendance" tab
- Show the calendar view
- Point out attendance records
- Show check-in/check-out history

**Narration:**
> "Employees can view their attendance history, check-in and check-out times, and track their working hours."

#### 3.3 Wellness Tracking (20 sec)
- Navigate to "Wellness" section
- Show health metrics
- Display wellness suggestions

**Narration:**
> "The wellness tracker helps employees monitor their health and receive AI-powered wellness recommendations."

#### 3.4 AI Assistant (30 sec)
- Navigate to AI Assistant
- Click microphone icon
- Type or speak a question: "What are my attendance stats?"
- Show AI response

**Narration:**
> "The integrated AI assistant helps employees with queries about their performance, attendance, and company policies."

#### 3.5 Notifications (15 sec)
- Click notification bell
- Show notification panel
- Point out real-time updates

---

## 🎥 PART 3: ADMIN REGISTRATION & LOGIN (1.5 min)

### Scene 4: Logout and Register as Admin

**Actions:**
1. Click user profile → Logout
2. Navigate to Register page
3. Fill in admin details:
   - **Username:** `admin_mike`
   - **Email:** `mike@company.com`
   - **Password:** `admin123`
   - **Confirm Password:** `admin123`
   - **Role:** Select "Admin"
4. Click "Sign Up"

**Narration:**
> "Now let's see the admin experience. We'll register a new admin account to access the full monitoring capabilities."

**Expected Result:**
- Registration successful
- Redirected to admin dashboard

---

## 🎥 PART 4: ADMIN DASHBOARD - FULL TOUR (4 min)

### Scene 5: Admin Dashboard Overview
**URL:** http://localhost:3000/admin/dashboard

**Narration:**
> "The admin dashboard provides comprehensive oversight of the entire organization. Let's explore each feature."

#### 5.1 Dashboard KPIs (30 sec)
- Show key metrics:
  - Total Employees
  - Active Today
  - Attendance Rate
  - Average Performance
- Point out real-time data

**Narration:**
> "Admins get a bird's-eye view of organizational metrics including employee count, attendance rates, and performance indicators."

---

### Scene 6: Employee Directory
**URL:** http://localhost:3000/admin/employees

**Actions:**
- Show employee list with photos
- Filter by department
- Click on an employee to view details
- Show employee profile with:
  - Personal information
  - Attendance history
  - Performance metrics

**Narration:**
> "The employee directory provides detailed information about each team member, including their role, department, and performance history."

---

### Scene 7: Live Monitoring (SHOWCASE FEATURE!)
**URL:** http://localhost:3000/admin/monitoring

**Narration:**
> "This is one of our most powerful features - real-time employee monitoring with camera and screen sharing capabilities."

**Actions:**

#### 7.1 Camera Monitoring (45 sec)
1. Show the monitoring grid with all employees
2. Click "Start Camera" on an active employee
3. Show the live camera feed (video playing)
4. Point out the "LIVE" indicator
5. Show employee info overlay

**Narration:**
> "Admins can monitor employee camera feeds in real-time. The system shows live video with employee identification and status indicators."

#### 7.2 Screen Share Monitoring (45 sec)
1. Click "Start Screen Share" button
2. Switch to "Screen" tab
3. Show the screen share feed (video playing)
4. Point out application info and CPU usage

**Narration:**
> "Screen sharing allows admins to see exactly what employees are working on. The system displays active applications and system metrics."

#### 7.3 Screenshot Capture (20 sec)
1. Click camera icon to capture screenshot
2. Show download notification
3. Switch between Camera and Screen tabs

**Narration:**
> "Admins can capture screenshots of both camera and screen feeds for documentation and compliance purposes."

#### 7.4 Full-Screen View (20 sec)
1. Click expand icon
2. Show full-screen dialog
3. Demonstrate both camera and screen views
4. Close dialog

**Narration:**
> "The full-screen view provides an immersive monitoring experience for detailed observation."

---

### Scene 8: Attendance Management
**URL:** http://localhost:3000/admin/attendance

**Actions:**
- Show attendance table with all employees
- Filter by date range
- Show late arrivals
- Display attendance trends chart

**Narration:**
> "The attendance management system tracks all employee check-ins and check-outs, identifies late arrivals, and provides trend analysis."

---

### Scene 9: Performance Analytics
**URL:** http://localhost:3000/admin/analytics

**Actions:**
- Show performance charts:
  - Team productivity chart
  - Department performance
  - Task completion rates
  - Employee activity trends
- Hover over charts to show data points

**Narration:**
> "Comprehensive analytics help admins understand productivity patterns, identify top performers, and make data-driven decisions."

---

### Scene 10: Security & Audit Logs
**URL:** http://localhost:3000/admin/security

**Actions:**
- Show login events table
- Display activity logs
- Show face recognition logs
- Point out timestamps and IP addresses

**Narration:**
> "Security audit logs track all system activities including logins, face recognition events, and user actions for compliance and security monitoring."

---

### Scene 11: Real-Time Notifications
**URL:** Stay on any admin page

**Actions:**
1. Open a new incognito window
2. Login as the employee (sarah@company.com)
3. Switch back to admin window
4. Show toast notification appearing
5. Click notification bell
6. Show new login notification

**Narration:**
> "The system provides real-time notifications when employees log in. Admins are instantly alerted to all login events across the organization."

---

### Scene 12: AI Monitoring
**URL:** http://localhost:3000/admin/ai-monitoring

**Actions:**
- Show AI-powered insights
- Display behavior analysis
- Show productivity recommendations

**Narration:**
> "AI monitoring provides intelligent insights into employee behavior patterns and productivity trends."

---

## 🎥 PART 5: TECHNICAL OVERVIEW (1 min)

### Scene 13: Technology Stack

**Show on screen (text overlay or slides):**

**Frontend:**
- ⚛️ Next.js 15.3.3
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🧩 Radix UI Components
- 🤖 Google Gemini AI (Genkit)

**Backend:**
- 🟢 Node.js + Express.js
- 🐘 PostgreSQL Database
- 🔌 RESTful API (20+ endpoints)

**Features:**
- 🎥 Real-time video monitoring
- 🖥️ Screen sharing
- 👤 Face recognition ready
- 🔔 Real-time notifications
- 📊 Advanced analytics
- 🤖 AI assistant
- 🔒 Role-based access control

**Narration:**
> "MonitorAI is built with modern, production-ready technologies. The frontend uses Next.js 15 with TypeScript for type safety, while the backend leverages Node.js and PostgreSQL for robust data management."

---

## 🎥 PART 6: CONCLUSION (30 sec)

### Scene 14: Final Summary

**Show:** Dashboard overview or landing page

**Narration:**
> "MonitorAI provides a complete solution for employee monitoring and management. From real-time camera and screen monitoring to AI-powered analytics and attendance tracking, it offers everything organizations need to manage their workforce effectively. The system is production-ready, fully responsive, and built with security and scalability in mind."

**End Screen Text:**
```
MonitorAI - Employee Monitoring System
✅ Production Ready
✅ Full-Stack Application
✅ Real-Time Monitoring
✅ AI-Powered Analytics

Built with Next.js, TypeScript, PostgreSQL
```

---

## 📝 Recording Tips

### Audio:
- Speak clearly and at a moderate pace
- Use a good quality microphone
- Record in a quiet environment
- Add background music (optional, keep it subtle)

### Video:
- Use 1920x1080 resolution
- Keep cursor movements smooth
- Highlight important elements with cursor
- Use zoom-in effects for small details (in editing)

### Editing:
- Add transitions between scenes
- Include text overlays for key features
- Add subtle animations
- Include your project logo/branding
- Add timestamps in description

### Export Settings:
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Frame Rate: 30fps
- Bitrate: 8-10 Mbps

---

## 🎯 Key Points to Emphasize

1. **Full-Stack Application** - Complete frontend and backend
2. **Real-Time Monitoring** - Live camera and screen sharing
3. **Role-Based Access** - Different views for admin and users
4. **AI Integration** - Smart assistant and analytics
5. **Modern Tech Stack** - Next.js, TypeScript, PostgreSQL
6. **Production Ready** - Fully functional and deployable
7. **Responsive Design** - Works on all devices
8. **Security Features** - Audit logs and access control

---

## 📁 Demo Assets Folder Structure

```
demo/
├── DEMO_SCRIPT.md (this file)
├── RECORDING_CHECKLIST.md
├── DEMO_SLIDES.pptx (optional)
├── screenshots/
│   ├── 01-landing-page.png
│   ├── 02-register-user.png
│   ├── 03-user-dashboard.png
│   ├── 04-admin-dashboard.png
│   ├── 05-live-monitoring.png
│   ├── 06-screen-share.png
│   └── 07-analytics.png
└── final-video/
    └── MonitorAI-Demo.mp4
```

---

## 🚀 Quick Demo Commands

### Start Everything:
```bash
# Terminal 1 - Backend
cd backend && node server.js

# Terminal 2 - Frontend  
npm run dev
```

### Test Accounts:
**Admin:**
- Email: `admin@company.com`
- Password: `admin`

**User:**
- Email: `john@company.com`
- Password: `user`

---

**Good luck with your demo recording! 🎬**
