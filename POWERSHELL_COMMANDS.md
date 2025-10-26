# 🔧 PowerShell Commands Reference

## ✅ CORRECT STARTUP COMMANDS

### Backend Server
```powershell
cd "E:\final    frontend folder\full-frontened-auto-face\backend"
npm start  # NOT: npm run dev
```

**Expected Output:**
```
✅ Camera monitoring endpoints registered
Server is running on port 5000
Database connection pool initialized
🔍 Starting 24/7 Monitoring Service...
✅ 24/7 Monitoring Service started successfully!
```

### Frontend Server
```powershell
cd "E:\final    frontend folder\full-frontened-auto-face"
npm run dev  # This is correct for frontend
```

**Expected Output:**
```
▲ Next.js 15.3.3
- Local:        http://localhost:3000
- Network:      http://10.86.126.161:3000
✓ Ready in 4.2s
```

---

## 🔌 API TESTING COMMANDS (PowerShell)

### ❌ WRONG (Linux/macOS style - Don't use these!)
```bash
# These DON'T work in PowerShell:
curl -X POST "http://localhost:5000/api/camera/status" \
  -H "Content-Type: application/json" \
  -d '{"user_id":2,"is_active":true}'
```

### ✅ CORRECT (PowerShell style)

#### 1. Test Camera Status (POST)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" `
  -Method POST `
  -Body '{"user_id":2,"is_active":true}' `
  -ContentType "application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Camera status updated"
}
```

#### 2. Get Active Streams (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/active-streams"
```

**Expected Response:**
```json
[
  {
    "user_id": 2,
    "name": "User One",
    "username": "user",
    "is_active": true
  }
]
```

#### 3. Test Backend Data Endpoint
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/data"
```

**Expected Response:**
```json
{
  "message": "Hello from the backend!"
}
```

#### 4. Test Frontend (GET)
```powershell
Invoke-WebRequest -Uri "http://localhost:3000" | Select-Object StatusCode
```

**Expected Response:**
```
StatusCode
----------
       200
```

---

## 🛑 STOP SERVERS

### Kill All Node Processes
```powershell
taskkill /F /IM node.exe
```

### Check if Port is Free
```powershell
# Check port 5000 (backend)
netstat -ano | findstr :5000

# Check port 3000 (frontend)
netstat -ano | findstr :3000

# Should return nothing if ports are free
```

### Kill Specific Port Process
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill by PID (replace 1234 with actual PID)
taskkill /F /PID 1234
```

---

## 📊 MONITORING COMMANDS

### Check Server Status
```powershell
# Backend health check
Invoke-RestMethod -Uri "http://localhost:5000/api/data"

# Frontend health check
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing | Select-Object StatusCode
```

### View Backend Logs
```powershell
# If running in terminal, logs appear automatically
# Look for:
# ✅ Server is running on port 5000
# ✅ Database connection pool initialized
# ✅ 24/7 Monitoring Service started successfully!
```

### View Frontend Logs
```powershell
# If running in terminal, logs appear automatically
# Look for:
# ✓ Ready in Xs
# ○ Local: http://localhost:3000
```

---

## 🔍 DATABASE COMMANDS

### Connect to PostgreSQL
```powershell
psql -U postgres -d monitor_ai
```

### Check Database Connection
```powershell
# From backend directory
node -e "const db = require('./db'); db.query('SELECT NOW()').then(r => console.log(r.rows[0])).catch(e => console.error(e));"
```

---

## 🚀 COMPLETE STARTUP SEQUENCE

### Terminal 1 - Backend
```powershell
cd "E:\final    frontend folder\full-frontened-auto-face\backend"
npm start
```

Wait for:
```
✅ Camera monitoring endpoints registered
Server is running on port 5000
```

### Terminal 2 - Frontend
```powershell
cd "E:\final    frontend folder\full-frontened-auto-face"
npm run dev
```

Wait for:
```
✓ Ready in 4.2s
○ Local: http://localhost:3000
```

### Terminal 3 - Testing (Optional)
```powershell
# Test backend
Invoke-RestMethod -Uri "http://localhost:5000/api/data"

# Test camera endpoints
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/active-streams"

# Test frontend
Start-Process "http://localhost:3000"
```

---

## 📋 QUICK REFERENCE TABLE

| What | Where | Command |
|------|-------|---------|
| **Backend** | `backend/` folder | `npm start` |
| **Frontend** | Root folder | `npm run dev` |
| **Database** | Anywhere | `psql -U postgres -d monitor_ai` |
| **Stop All** | Anywhere | `taskkill /F /IM node.exe` |
| **Test API** | Anywhere | `Invoke-RestMethod -Uri "http://localhost:5000/api/..."` |
| **Open Browser** | Anywhere | `Start-Process "http://localhost:3000"` |

---

## 🎯 COMMON TASKS

### Start Everything
```powershell
# Terminal 1
cd backend ; npm start

# Terminal 2 (new window)
cd .. ; npm run dev
```

### Stop Everything
```powershell
taskkill /F /IM node.exe
```

### Restart Backend Only
```powershell
# Stop
taskkill /F /IM node.exe

# Start
cd backend
npm start
```

### Restart Frontend Only
```powershell
# Stop (Ctrl+C in terminal)
# Or force kill:
taskkill /F /IM node.exe

# Start
npm run dev
```

### Test All Endpoints
```powershell
# Backend data
Invoke-RestMethod -Uri "http://localhost:5000/api/data"

# Camera status
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" -Method POST -Body '{"user_id":2,"is_active":true}' -ContentType "application/json"

# Active streams
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/active-streams"

# Frontend
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing | Select-Object StatusCode
```

---

## 💡 TIPS

### Use Backticks for Multi-line Commands
```powershell
# Good - readable
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" `
  -Method POST `
  -Body '{"user_id":2,"is_active":true}' `
  -ContentType "application/json"

# Also works - single line
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" -Method POST -Body '{"user_id":2,"is_active":true}' -ContentType "application/json"
```

### Open Browser from PowerShell
```powershell
Start-Process "http://localhost:3000"
```

### Check if Server is Running
```powershell
# Returns 200 if running
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing | Select-Object StatusCode

# Returns data if running
Invoke-RestMethod -Uri "http://localhost:5000/api/data"
```

### View Process List
```powershell
# All node processes
Get-Process node

# With details
Get-Process node | Format-Table Id, ProcessName, CPU, WorkingSet
```

---

## 🎊 CURRENT STATUS

Based on your output, both servers are now running:

```
✅ Backend:  Running on port 5000
✅ Frontend: Running on port 3000
✅ Database: Connected
✅ 24/7 Monitoring: Active
```

### Access URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Network Access:** http://10.86.126.161:3000

### Test Credentials
- **Admin:** admin / admin
- **User:** any username / user

---

## 🚨 TROUBLESHOOTING

### Port Already in Use
```powershell
# Find what's using the port
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /F /PID <PID>
```

### Backend Won't Start
```powershell
# Check if database is running
psql -U postgres -d monitor_ai -c "SELECT 1"

# Check .env file exists
Test-Path backend\.env

# View .env contents
Get-Content backend\.env
```

### Frontend Won't Start
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Reinstall dependencies
npm install

# Try again
npm run dev
```

---

**Remember:** Always use `npm start` for backend, `npm run dev` for frontend! 🎯
