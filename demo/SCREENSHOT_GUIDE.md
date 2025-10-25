# 📸 Screenshot Guide for Demo

## Screenshots to Capture

Take these screenshots before or after recording for documentation:

---

## 1. Landing Page
**File:** `01-landing-page.png`
- URL: http://localhost:3000
- Show: Full landing page with features
- Highlight: Clean design, feature list

---

## 2. Registration - User
**File:** `02-register-user.png`
- URL: http://localhost:3000/register
- Show: Registration form with "Employee / User" selected
- Highlight: Role dropdown

---

## 3. Registration - Admin
**File:** `03-register-admin.png`
- URL: http://localhost:3000/register
- Show: Registration form with "Admin" selected
- Highlight: Role selection

---

## 4. User Dashboard
**File:** `04-user-dashboard.png`
- URL: http://localhost:3000/user/dashboard
- Show: User dashboard with KPIs
- Highlight: Attendance, wellness, performance cards

---

## 5. User Attendance Calendar
**File:** `05-user-attendance.png`
- URL: http://localhost:3000/user/attendance
- Show: Calendar view with attendance records
- Highlight: Check-in/check-out times

---

## 6. User AI Assistant
**File:** `06-user-ai-assistant.png`
- URL: http://localhost:3000/user/ai-assistant
- Show: AI chat interface
- Highlight: Voice input, chat messages

---

## 7. Admin Dashboard
**File:** `07-admin-dashboard.png`
- URL: http://localhost:3000/admin/dashboard
- Show: Admin dashboard with all KPIs
- Highlight: Employee metrics, charts

---

## 8. Employee Directory
**File:** `08-employee-directory.png`
- URL: http://localhost:3000/admin/employees
- Show: Grid of employees with photos
- Highlight: Filter options, employee cards

---

## 9. Live Monitoring - Camera
**File:** `09-live-monitoring-camera.png`
- URL: http://localhost:3000/admin/monitoring
- Show: Camera feed active with LIVE indicator
- Highlight: Video playing, employee info overlay

---

## 10. Live Monitoring - Screen Share
**File:** `10-live-monitoring-screen.png`
- URL: http://localhost:3000/admin/monitoring
- Show: Screen share active
- Highlight: Screen content, CPU usage

---

## 11. Live Monitoring - Full Screen
**File:** `11-monitoring-fullscreen.png`
- URL: http://localhost:3000/admin/monitoring
- Show: Full-screen dialog with video
- Highlight: Large view, controls

---

## 12. Attendance Management
**File:** `12-attendance-management.png`
- URL: http://localhost:3000/admin/attendance
- Show: Attendance table with all employees
- Highlight: Date filters, status indicators

---

## 13. Performance Analytics
**File:** `13-performance-analytics.png`
- URL: http://localhost:3000/admin/analytics
- Show: Charts and graphs
- Highlight: Productivity trends, department performance

---

## 14. Security Audit Logs
**File:** `14-security-logs.png`
- URL: http://localhost:3000/admin/security
- Show: Login events and activity logs
- Highlight: Timestamps, IP addresses

---

## 15. Real-Time Notifications
**File:** `15-notifications.png`
- Show: Notification panel open with alerts
- Highlight: Login notifications, toast messages

---

## 16. AI Monitoring
**File:** `16-ai-monitoring.png`
- URL: http://localhost:3000/admin/ai-monitoring
- Show: AI insights and recommendations
- Highlight: Behavior analysis

---

## 17. Mobile Responsive - User
**File:** `17-mobile-user.png`
- Show: User dashboard on mobile view (resize browser)
- Highlight: Responsive design

---

## 18. Mobile Responsive - Admin
**File:** `18-mobile-admin.png`
- Show: Admin dashboard on mobile view
- Highlight: Responsive layout

---

## 19. Dark Theme
**File:** `19-dark-theme.png`
- Show: Any page in dark mode
- Highlight: Theme toggle, dark colors

---

## 20. Technology Stack
**File:** `20-tech-stack.png`
- Create a slide or graphic showing:
  - Next.js logo
  - TypeScript logo
  - PostgreSQL logo
  - Node.js logo
  - Tailwind CSS logo

---

## Screenshot Settings

### Browser
- Resolution: 1920x1080
- Zoom: 100%
- Full screen (F11) or hide bookmarks bar

### Tools
- Windows: Snipping Tool, Win + Shift + S
- Mac: Cmd + Shift + 4
- Browser Extension: Awesome Screenshot
- Professional: Snagit, Lightshot

### Format
- Save as PNG (best quality)
- Name files consistently
- Store in `demo/screenshots/` folder

### Editing (Optional)
- Add arrows/highlights
- Blur sensitive data
- Add text annotations
- Crop to focus area
- Adjust brightness/contrast

---

## Quick Capture Script

### Windows PowerShell
```powershell
# Create screenshots folder
New-Item -ItemType Directory -Force -Path "demo/screenshots"

# Open browser to each URL and capture manually
Start-Process "http://localhost:3000"
```

### Tips
1. Capture at key moments during demo
2. Get multiple angles of same feature
3. Show both light and dark themes
4. Include mobile responsive views
5. Capture error states (if relevant)
6. Get before/after comparisons

---

## Screenshot Checklist

- [ ] All 20 screenshots captured
- [ ] Files named correctly
- [ ] Saved in demo/screenshots/
- [ ] PNG format
- [ ] Good quality (not blurry)
- [ ] No sensitive data visible
- [ ] Consistent browser size
- [ ] Clean UI (no dev tools open)

---

**Use these screenshots for:**
- Documentation
- README.md
- Presentation slides
- Video thumbnail
- Social media posts
- Portfolio showcase
