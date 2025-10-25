# ⚠️ Backend Not Running!

## Error
```
Error: Failed to fetch
at http://localhost:5000/api/data
```

## Problem
**The backend server is NOT running!**

---

## ✅ Solution

### Start the Backend Server:

```bash
cd backend
npm start
```

**You MUST see this message:**
```
Server is running on port 5000
Database connection pool initialized

🔍 Starting 24/7 Monitoring Service...
✅ 24/7 Monitoring Service started successfully!
```

---

## 🔍 If Backend Won't Start

### Error: "Cannot find module"
```bash
cd backend
npm install compression node-fetch cors express pg
npm start
```

### Error: "Port 5000 already in use"
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Then start again
npm start
```

### Error: Database connection
```bash
# Check database
node check-db.js
```

---

## ✅ Verify Backend is Running

### Test 1: Check in Browser
Open: http://localhost:5000/

Should show: "Backend is working with Database!"

### Test 2: Check in Terminal
```bash
curl http://localhost:5000/
```

Should return: "Backend is working with Database!"

---

## 📋 Checklist

- [ ] Backend terminal is open
- [ ] Ran `cd backend`
- [ ] Ran `npm start`
- [ ] See "Server is running on port 5000"
- [ ] See "✅ 24/7 Monitoring Service started"
- [ ] Can access http://localhost:5000/ in browser

---

## 🚀 Correct Startup Order

### 1. Start Backend FIRST
```bash
cd backend
npm start
```

### 2. Wait for Success Message
```
✅ 24/7 Monitoring Service started successfully!
```

### 3. Then Start Frontend (New Terminal)
```bash
npm run dev
```

---

**The backend MUST be running before the frontend!** 🔴

**Start it now:** `cd backend && npm start` 🚀
