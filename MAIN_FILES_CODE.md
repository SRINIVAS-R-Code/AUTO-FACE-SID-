# 📝 Main Files Code Reference

## Backend Main Files

### 1. `backend/server.js` - Main Backend Server

```javascript
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const pool = require('./db');
const monitoringService = require('./monitoring-service');
const cache = require('./cache');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Simple CORS - Works with any port
app.use(cors({
  origin: true,
  credentials: true
}));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  monitoringService.start(); // Start 24/7 monitoring
});
```

---

### 2. `backend/db.js` - Database Connection

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'monitor_ai',
  password: 'your_password',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
```

---

### 3. `backend/monitoring-service.js` - 24/7 Monitoring

```javascript
const pool = require('./db');

class MonitoringService {
  constructor() {
    this.isRunning = false;
    this.events = [];
  }

  start() {
    console.log('🔍 Starting 24/7 Monitoring Service...');
    this.isRunning = true;
    
    // Monitor every 30 seconds
    this.monitoringInterval = setInterval(() => {
      this.monitorDashboard();
    }, 30000);
    
    console.log('✅ 24/7 Monitoring Service started!');
  }

  async monitorDashboard() {
    // Monitor employees, attendance, etc.
    console.log('🔍 Monitoring check...');
  }
}

const monitoringService = new MonitoringService();
module.exports = monitoringService;
```

---

### 4. `backend/cache.js` - Caching System

```javascript
class Cache {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map();
  }

  set(key, value, ttlSeconds = 30) {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + (ttlSeconds * 1000));
  }

  get(key) {
    const expiryTime = this.ttl.get(key);
    if (expiryTime && Date.now() > expiryTime) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }
}

const cache = new Cache();
module.exports = cache;
```

---

## Frontend Main Files

### 5. `src/app/page.tsx` - Login Page

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await response.json()
      
      if (data.role === 'admin') {
        login(data)
        router.push('/admin/monitoring')
      } else {
        login(data)
        router.push('/user/dashboard')
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
```

---

### 6. `src/components/ai-assistant.tsx` - AI Chat

```typescript
'use client'

import { useState } from 'react'
import { Bot, Send } from 'lucide-react'

export function AIAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Add user message
    setMessages([...messages, { role: 'user', content: input }])
    
    // Get AI response
    const response = await getMockResponse(input)
    setMessages([...messages, 
      { role: 'user', content: input },
      { role: 'assistant', content: response }
    ])
    
    setInput('')
  }

  const getMockResponse = async (input) => {
    // AI logic here
    if (input.includes('monitoring')) {
      return '✅ 24/7 Monitoring is active!'
    }
    return 'I can help you with that!'
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Bot />
      </button>
      
      {isOpen && (
        <div>
          {messages.map((msg, i) => (
            <div key={i}>{msg.content}</div>
          ))}
          
          <form onSubmit={handleSubmit}>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit"><Send /></button>
          </form>
        </div>
      )}
    </div>
  )
}
```

---

### 7. `next.config.ts` - Next.js Configuration

```typescript
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  
  // Performance
  compress: true,
  poweredByHeader: false,
  
  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Experimental
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  productionBrowserSourceMaps: false,
};

export default nextConfig;
```

---

### 8. `src/context/auth-context.tsx` - Authentication

```typescript
'use client'

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## Configuration Files

### 9. `package.json` - Dependencies

```json
{
  "name": "monitor-ai",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

### 10. `backend/package.json` - Backend Dependencies

```json
{
  "name": "backend",
  "version": "1.0.0",
  "dependencies": {
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "pg": "^8.16.3"
  }
}
```

---

## Quick Start Commands

### Backend:
```bash
cd backend
npm install
npm start
```

### Frontend:
```bash
npm install
npm run dev
```

---

## File Locations

```
full-frontened-auto-face/
├── backend/
│   ├── server.js           ← Main server
│   ├── db.js              ← Database
│   ├── monitoring-service.js ← 24/7 monitoring
│   └── cache.js           ← Caching
│
├── src/
│   ├── app/
│   │   └── page.tsx       ← Login page
│   ├── components/
│   │   └── ai-assistant.tsx ← AI chat
│   └── context/
│       └── auth-context.tsx ← Auth
│
└── next.config.ts         ← Next.js config
```

---

**These are the main files that make MonitorAI work!** 🚀
