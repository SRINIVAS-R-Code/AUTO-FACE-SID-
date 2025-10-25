# ✅ Simple Setup - One Configuration

## CORS Fixed - Works with Any Port!

### What I Changed
**File:** `backend/server.js`

**Old (complicated):**
```javascript
origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003']
```

**New (simple):**
```javascript
origin: true  // Works with ANY port!
```

---

## 🚀 How to Start

### 1. Start Backend (Port 5000)
```bash
cd backend
npm start
```

### 2. Start Frontend (Any Port - 3000, 3001, 3003, etc.)
```bash
cd ..
npm run dev
```

**That's it!** ✅

---

## ✅ Benefits

- Works with **any frontend port**
- No more CORS errors
- Simple configuration
- One setting that works

---

## 🔄 Restart Backend

**IMPORTANT:** Restart backend for changes to take effect:

```bash
# Stop backend (Ctrl+C)
# Start again:
cd backend
npm start
```

---

**Now it works with any port - no more configuration needed!** 🎉
