# 🔧 Fix "Failed to Fetch" Error

## Problem
Frontend shows: **"Error: Failed to fetch"**

This means the frontend cannot connect to the backend server.

---

## ✅ Solution (3 Steps)

### Step 1: Check Backend is Running

Open a terminal and check if backend is running:

```bash
cd backend
npm start
```

**You should see:**
```
Server is running on port 5000
🔍 Starting 24/7 Monitoring Service...
✅ 24/7 Monitoring Service started successfully!
```

**If you see errors:**
```bash
# Install dependencies first
npm install compression node-fetch cors express pg

# Then start again
npm start
```

---

### Step 2: Test Backend Connection

Open a new terminal and test:

```bash
curl http://localhost:5000/
```

**Should return:**
```
Backend is working with Database!
```

**If it doesn't work:**
- Backend is not running
- Port 5000 is blocked
- Another app is using port 5000

---

### Step 3: Check Frontend Configuration

The frontend should connect to `http://localhost:5000`

**If backend is on different port:**

1. Check what port backend is using (look at terminal)
2. Update frontend API calls if needed

---

## 🔍 Troubleshooting

### Issue 1: Backend Not Starting

**Error:** `Cannot find module 'compression'`

**Fix:**
```bash
cd backend
npm install compression node-fetch cors express pg
npm start
```

---

### Issue 2: Port 5000 Already in Use

**Error:** `Port 5000 is already in use`

**Fix Option A - Kill the process:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Fix Option B - Use different port:**
```bash
# In backend folder, edit server.js
# Change: const PORT = process.env.PORT || 5000;
# To: const PORT = process.env.PORT || 5001;
```

---

### Issue 3: Database Not Connected

**Error:** Database connection failed

**Fix:**
```bash
cd backend
node check-db.js
```

If database is not connected, check PostgreSQL is running.

---

### Issue 4: CORS Error

**Error:** CORS policy blocked

**Fix:** Backend already has CORS enabled. Make sure backend is running.

---

## ✅ Quick Fix Checklist

- [ ] Backend server is running (`cd backend && npm start`)
- [ ] Backend shows "Server is running on port 5000"
- [ ] Can access http://localhost:5000/ in browser
- [ ] Frontend is running (`npm run dev`)
- [ ] Frontend is on http://localhost:3000
- [ ] No firewall blocking ports

---

## 🎯 Complete Restart

If nothing works, do a complete restart:

### 1. Stop Everything
- Close all terminals
- Stop all Node processes

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install compression node-fetch cors express pg

# Frontend
cd ..
npm install
```

### 3. Start Backend First
```bash
cd backend
npm start
```

**Wait for:** "✅ 24/7 Monitoring Service started successfully!"

### 4. Start Frontend (New Terminal)
```bash
cd full-frontened-auto-face
npm run dev
```

### 5. Open Browser
http://localhost:3000

---

## 🔍 Verify Connection

### Test 1: Backend Health
```bash
curl http://localhost:5000/
```
Should return: "Backend is working with Database!"

### Test 2: API Endpoint
```bash
curl http://localhost:5000/api/employees
```
Should return: JSON data

### Test 3: Frontend
Open http://localhost:3000 in browser
Should load without "Failed to fetch" error

---

## 💡 Common Causes

1. **Backend not running** (90% of cases)
   - Solution: Start backend first

2. **Wrong port**
   - Backend should be on port 5000
   - Frontend should be on port 3000

3. **Missing dependencies**
   - Solution: `npm install` in both folders

4. **Firewall blocking**
   - Solution: Allow Node.js in firewall

5. **Another app using port**
   - Solution: Kill the process or use different port

---

## ✅ Success Indicators

When everything works:

1. **Backend terminal shows:**
   ```
   Server is running on port 5000
   ✅ 24/7 Monitoring Service started successfully!
   ```

2. **Frontend loads without errors**

3. **AI Assistant works** (purple bot icon)

4. **Dashboard shows data**

---

## 🆘 Still Not Working?

### Check Logs

**Backend logs:**
Look at the terminal where you ran `npm start`

**Frontend logs:**
Open browser console (F12) and check for errors

**Common errors:**
- "ECONNREFUSED" = Backend not running
- "CORS" = Backend CORS issue (should be fixed)
- "404" = Wrong API endpoint

---

## 📞 Need More Help?

1. Check backend terminal for errors
2. Check browser console (F12) for errors
3. Make sure both servers are running
4. Try complete restart (see above)

---

**Most likely fix: Just start the backend server!** 🚀

```bash
cd backend
npm start
```
