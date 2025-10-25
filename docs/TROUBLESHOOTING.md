# 🔧 Troubleshooting Guide

## Current Issues & Solutions

### Issue 1: Backend Connection Failed ❌

**Error:** `Failed to fetch http://localhost:5000/api/login`

**Cause:** Backend server is not running or not accessible

**Solution:**

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Verify it's running:**
   - You should see: `Server running on port 5000`
   - Check: http://localhost:5000 in browser
   - Should show: "Backend is working with Database!"

3. **If port 5000 is in use:**
   ```bash
   # Windows - Kill process on port 5000
   netstat -ano | findstr :5000
   taskkill /F /PID <process_id>
   
   # Then restart backend
   node server.js
   ```

4. **Check database connection:**
   - Ensure PostgreSQL is running
   - Database `auto_face_sid_db` exists
   - Credentials in `backend/db.js` are correct

---

### Issue 2: Hydration Error ⚠️

**Error:** `Hydration failed because the server rendered HTML didn't match the client`

**Cause:** Browser extension adding `wfd-id` attribute (likely password manager or form filler)

**Solutions:**

**Option 1: Disable Browser Extensions (Recommended for Demo)**
1. Open browser in Incognito/Private mode
2. Or disable extensions temporarily:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. Disable password managers, form fillers, or autofill extensions

**Option 2: Ignore the Warning**
- This warning doesn't break functionality
- It's cosmetic and won't affect your demo
- The app still works perfectly

**Option 3: Add Suppression (if needed)**
```tsx
// In next.config.ts, add:
reactStrictMode: false
```

---

### Issue 3: Login API Not Working ❌

**Error:** Login fetch fails

**Cause:** Backend not running

**Solution:**

1. **Ensure backend is running** (see Issue 1)

2. **Test the login endpoint:**
   ```bash
   # In PowerShell or CMD
   curl http://localhost:5000/api/login -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"admin@company.com","password":"admin"}'
   ```

3. **Check backend logs:**
   - Look at terminal where backend is running
   - Should show incoming requests
   - Check for any error messages

---

## Quick Fix Checklist

### Before Starting Demo:

- [ ] **PostgreSQL is running**
  ```bash
  # Check if PostgreSQL service is running
  # Windows: Services → PostgreSQL
  ```

- [ ] **Backend server is running**
  ```bash
  cd backend
  node server.js
  # Should show: Server running on port 5000
  ```

- [ ] **Frontend is running**
  ```bash
  npm run dev
  # Should show: Ready on http://localhost:3000
  ```

- [ ] **Test backend connection**
  - Open: http://localhost:5000
  - Should see: "Backend is working with Database!"

- [ ] **Test database connection**
  - Open: http://localhost:5000/api/db-test
  - Should see: `{"status":"connected"}`

- [ ] **Use Incognito mode** (to avoid extension issues)

---

## Common Errors & Fixes

### Error: "EADDRINUSE: Port 5000 already in use"

**Fix:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <pid>

# Then restart
cd backend
node server.js
```

### Error: "Database connection failed"

**Fix:**
1. Check PostgreSQL is running
2. Verify database exists:
   ```sql
   psql -U postgres -l
   # Should list auto_face_sid_db
   ```
3. Check credentials in `backend/db.js`
4. Run schema if needed:
   ```bash
   psql -U postgres -d auto_face_sid_db -f backend/create_tables.sql
   ```

### Error: "Cannot find module"

**Fix:**
```bash
# Reinstall dependencies
npm install

# Backend
cd backend
npm install
```

### Error: "Port 3000 already in use"

**Fix:**
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /F /PID <pid>

# Or use different port
npm run dev -- -p 3001
```

---

## Testing Everything Works

### 1. Test Backend
```bash
# Terminal 1
cd backend
node server.js
```

Expected output:
```
Server running on port 5000
Database connection pool initialized
```

### 2. Test Frontend
```bash
# Terminal 2
npm run dev
```

Expected output:
```
▲ Next.js 15.3.3
- Local: http://localhost:3000
✓ Ready in 2.5s
```

### 3. Test Login
1. Open http://localhost:3000
2. Login with:
   - Email: `admin@company.com`
   - Password: `admin`
3. Should redirect to admin dashboard

### 4. Test Database
1. Open http://localhost:5000/api/db-test
2. Should see:
   ```json
   {
     "status": "connected",
     "message": "Database connection successful!"
   }
   ```

---

## For Your Demo

### Recommended Setup:

1. **Use Incognito/Private browsing**
   - Avoids extension conflicts
   - Clean slate for demo
   - No hydration warnings

2. **Have two terminals ready:**
   ```bash
   # Terminal 1: Backend
   cd backend && node server.js
   
   # Terminal 2: Frontend
   npm run dev
   ```

3. **Test before recording:**
   - Login works
   - Dashboard loads
   - Live monitoring works
   - AI assistant responds
   - No console errors

4. **Ignore harmless warnings:**
   - Hydration warnings (cosmetic only)
   - "Backend not connected" (if backend is actually running)

---

## Still Having Issues?

### Check These:

1. **Node.js version:**
   ```bash
   node --version
   # Should be 18 or higher
   ```

2. **PostgreSQL version:**
   ```bash
   psql --version
   # Should be 12 or higher
   ```

3. **Ports available:**
   ```bash
   netstat -ano | findstr :3000
   netstat -ano | findstr :5000
   # Should be empty or show your processes
   ```

4. **Environment variables:**
   ```bash
   # Check .env.local exists
   cat .env.local
   # Should show GEMINI_API_KEY
   ```

---

## Emergency Quick Start

If everything is broken, start fresh:

```bash
# 1. Kill all node processes
taskkill /F /IM node.exe

# 2. Reinstall dependencies
npm install
cd backend && npm install && cd ..

# 3. Start PostgreSQL
# (Use Services or pgAdmin)

# 4. Start backend
cd backend
node server.js

# 5. Start frontend (new terminal)
npm run dev

# 6. Open in incognito
# http://localhost:3000
```

---

## Contact for Help

If issues persist:
1. Check browser console (F12)
2. Check backend terminal for errors
3. Check PostgreSQL logs
4. Try restarting everything

---

**Most Common Fix:** Just restart the backend server! 🔄

```bash
cd backend
node server.js
```

Then refresh your browser. 90% of issues are solved by this!
