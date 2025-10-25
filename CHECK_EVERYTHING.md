# 🔍 Check Everything

## Run Connection Checker

```bash
cd backend
node check-connections.js
```

## What It Checks

1. ✅ **Database Connection** - PostgreSQL
2. ✅ **Backend Server** - Port 5000
3. ✅ **API Endpoints** - /api/data, /api/employees, /api/attendance
4. ✅ **Database Tables** - users, employees, attendance, performance

---

## Expected Output

### ✅ All Good:
```
🔍 Checking All Connections...

1️⃣ Testing Database Connection...
✅ Database: CONNECTED

2️⃣ Testing Backend Server (Port 5000)...
✅ Backend Server: RUNNING

3️⃣ Testing API Endpoints...
✅ /api/data: WORKING
✅ /api/employees: WORKING
✅ /api/attendance: WORKING

4️⃣ Testing Database Tables...
✅ Table 'users': EXISTS
✅ Table 'employees': EXISTS
✅ Table 'attendance': EXISTS
✅ Table 'performance': EXISTS

📊 SUMMARY
✅ ALL SYSTEMS OPERATIONAL

🚀 You can now start the frontend:
   npm run dev
```

---

## ❌ If Issues Found

The script will tell you exactly what's wrong and how to fix it.

### Common Issues:

**Database Not Connected:**
```
❌ Database: FAILED
🔧 Fix:
   1. Check PostgreSQL is running
   2. Check credentials in db.js
```

**Backend Not Running:**
```
❌ Backend Server: NOT RUNNING
🔧 Fix:
   cd backend && npm start
```

**API Endpoints Failed:**
```
❌ /api/data: FAILED
🔧 Fix:
   Backend server needs to be restarted
```

---

## Quick Fix Commands

### Start Backend
```bash
cd backend
npm start
```

### Check Database
```bash
cd backend
node check-db.js
```

### Install Dependencies
```bash
cd backend
npm install compression node-fetch cors express pg
```

---

## ✅ After Fixing

Run the checker again:
```bash
cd backend
node check-connections.js
```

Should show: `✅ ALL SYSTEMS OPERATIONAL`

Then start frontend:
```bash
npm run dev
```

---

**This checks EVERYTHING in one command!** 🔍
