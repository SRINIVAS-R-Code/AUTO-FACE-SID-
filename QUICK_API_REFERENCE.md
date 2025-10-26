# 🚀 Quick API Reference Card

## ✅ ALL 12 APIs WORKING!

---

## 📋 QUICK TEST COMMAND

```powershell
cd "E:\final    frontend folder\full-frontened-auto-face"
.\test-all-apis.ps1
```

**Expected Result:** 12/12 PASSED ✅

---

## 🔌 API ENDPOINTS

### 1. Health Check
```
GET http://localhost:5000/
```

### 2. Backend Test
```
GET http://localhost:5000/api/data
```

### 3. Database Test
```
GET http://localhost:5000/api/db-test
```

### 4. Get Users (4 users)
```
GET http://localhost:5000/api/users
```

### 5. Get Employees (2 employees)
```
GET http://localhost:5000/api/employees
```

### 6. Get Attendance
```
GET http://localhost:5000/api/attendance
```

### 7. Get Performance
```
GET http://localhost:5000/api/performance
```

### 8. Get Active Camera Streams
```
GET http://localhost:5000/api/camera/active-streams
```

### 9. Get Monitoring Events
```
GET http://localhost:5000/api/monitoring/events?limit=5
```

### 10. Get Monitoring Summary
```
GET http://localhost:5000/api/monitoring/summary
```

### 11. Get Monitoring Status
```
GET http://localhost:5000/api/monitoring/status
```

### 12. Update Camera Status (POST)
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" `
  -Method POST `
  -Body '{"user_id":2,"is_active":true}' `
  -ContentType "application/json"
```

---

## 🎯 CURRENT STATUS

```
✅ Backend:     RUNNING (Port 5000)
✅ Frontend:    RUNNING (Port 3000)
✅ Database:    CONNECTED
✅ APIs:        12/12 WORKING
✅ Monitoring:  ACTIVE
```

---

## 🚀 START SERVERS

```powershell
# Backend
cd backend
npm start

# Frontend (new terminal)
cd ..
npm run dev
```

---

## 🛑 STOP SERVERS

```powershell
taskkill /F /IM node.exe
```

---

## 📊 DATA AVAILABLE

- Users: 4
- Employees: 2
- Monitoring Events: 6+
- Camera Streams: Ready
- Attendance: Ready (empty)
- Performance: Ready (empty)

---

**All APIs tested and working! ✅**
