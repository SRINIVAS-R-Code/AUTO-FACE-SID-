# ⚡ Quick Fix - "Failed to Fetch" Error

## Problem
Getting "Error: Failed to fetch" in the frontend?

## ✅ Solution (Most Common)

**The backend server is not running!**

### Fix in 2 Steps:

#### 1. Start Backend
```bash
cd backend
npm start
```

**Wait for this message:**
```
✅ 24/7 Monitoring Service started successfully!
```

#### 2. Refresh Browser
Go to http://localhost:3000 and refresh

**That's it!** ✅

---

## Still Not Working?

### Check Backend is Running
```bash
curl http://localhost:5000/
```

Should return: "Backend is working with Database!"

### If Backend Won't Start
```bash
cd backend
npm install compression node-fetch cors express pg
npm start
```

---

## Complete Guide

See: `docs/FIX_FETCH_ERROR.md` for detailed troubleshooting

---

**90% of the time, you just need to start the backend!** 🚀
