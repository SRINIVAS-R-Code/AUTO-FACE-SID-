require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const pool = require('./db');
const monitoringService = require('./monitoring-service');
const cache = require('./cache');

const app = express();
const PORT = process.env.PORT || 5000;

// Performance optimizations
app.use(compression()); // Enable gzip compression
app.use(express.json({ limit: '10mb' })); // Limit payload size

// Simple CORS - Allow all origins (works with any port)
app.use(cors({
  origin: true,
  credentials: true
}));

// Cache control for static responses
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.url.includes('/api/')) {
    res.set('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend is working with Database!');
});

// API endpoint for general data
app.get('/api/data', (req, res) => {
  res.json({ message: 'Connected to backend successfully!' });
});

// Test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'connected', 
      timestamp: result.rows[0].now,
      message: 'Database connection successful!'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// ==================== USER ENDPOINTS ====================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, username, email, role FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // 🆕 UPDATE: Save last login time
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Log the login event
    await pool.query(
      'INSERT INTO activity (employee_id, activity_type, details) VALUES ((SELECT id FROM employees WHERE user_id = $1), $2, $3)',
      [user.id, 'login', `User ${user.username} logged in from ${req.ip}`]
    );

    // Create notification for admin
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ((SELECT id FROM users WHERE role = $1 LIMIT 1), $2, $3, $4)',
      ['admin', `${user.username} logged in`, `${user.role === 'admin' ? 'Admin' : 'Employee'} logged in at ${new Date().toLocaleTimeString()}`, 'info']
    );

    res.json({
      ...user,
      loginEvent: {
        timestamp: new Date().toISOString(),
        ipAddress: req.ip
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// REGISTRATION ENDPOINT (Updated)
// ========================================
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;

    // Validation
    if (!username || !password || !name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate role (only allow 'user' or 'admin')
    const userRole = (role === 'admin' || role === 'user') ? role : 'user';

    // Check if username already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Insert new user with selected role
    const result = await pool.query(
      `INSERT INTO users (username, password, name, email, role, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, username, name, email, role`,
      [username, password, name, email, userRole]  // Use selected role
    );

    console.log('New user registered:', result.rows[0].username, 'as', result.rows[0].role);

    res.status(201).json({
      message: 'Registration successful',
      user: result.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ==================== EMPLOYEE ENDPOINTS ====================

// Get all employees with user info (with caching)
app.get('/api/employees', async (req, res) => {
  const { department } = req.query;
  const cacheKey = `employees_${department || 'all'}`;
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }
  
  try {
    let query = `
      SELECT 
        e.id, 
        e.first_name || ' ' || e.last_name as name,
        u.email,
        e.department,
        e.position,
        e.hire_date,
        u.username,
        'Active' as status,
        'Office' as work_location
      FROM employees e
      JOIN users u ON e.user_id = u.id
    `;
    
    const params = [];
    if (department) {
      query += ' WHERE e.department = $1';
      params.push(department);
    }
    
    query += ' ORDER BY e.id';
    
    const result = await pool.query(query, params);
    
    // Cache the result for 30 seconds
    cache.set(cacheKey, result.rows, 30);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by ID
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const employeeResult = await pool.query(
      `SELECT 
        e.id, 
        e.first_name || ' ' || e.last_name as name,
        u.email,
        e.department,
        e.position,
        e.hire_date
      FROM employees e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = $1`,
      [id]
    );
    
    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const employee = employeeResult.rows[0];
    
    // Get attendance
    const attendanceResult = await pool.query(
      'SELECT * FROM attendance WHERE employee_id = $1 ORDER BY date DESC LIMIT 10',
      [id]
    );
    
    // Get performance
    const performanceResult = await pool.query(
      'SELECT * FROM performance WHERE employee_id = $1 ORDER BY date DESC LIMIT 1',
      [id]
    );
    
    res.json({
      ...employee,
      attendance: attendanceResult.rows,
      performance: performanceResult.rows[0] || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ATTENDANCE ENDPOINTS ====================

// Get all attendance records (with caching)
app.get('/api/attendance', async (req, res) => {
  const cacheKey = 'attendance_all';
  
  // Check cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }
  
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.employee_id,
        e.first_name || ' ' || e.last_name as employee_name,
        a.date,
        a.check_in,
        a.check_out,
        a.status
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      ORDER BY a.date DESC, a.check_in DESC
      LIMIT 50
    `);
    
    // Cache for 20 seconds
    cache.set(cacheKey, result.rows, 20);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create attendance record
app.post('/api/attendance', async (req, res) => {
  const { employee_id, check_in, check_out, date, status } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO attendance (employee_id, check_in, check_out, date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [employee_id, check_in, check_out, date, status || 'present']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PERFORMANCE ENDPOINTS ====================

// Get all performance records
app.get('/api/performance', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.*,
        e.first_name || ' ' || e.last_name as employee_name
      FROM performance p
      JOIN employees e ON p.employee_id = e.id
      ORDER BY p.date DESC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ACTIVITY ENDPOINTS ====================

// Get all activity
app.get('/api/activity', async (req, res) => {
  const { employee_id, limit = 50 } = req.query;
  
  try {
    let query = `
      SELECT 
        a.*,
        e.first_name || ' ' || e.last_name as employee_name
      FROM activity a
      JOIN employees e ON a.employee_id = e.id
    `;
    
    const params = [];
    if (employee_id) {
      query += ' WHERE a.employee_id = $1';
      params.push(employee_id);
    }
    
    query += ' ORDER BY a.timestamp DESC LIMIT $' + (params.length + 1);
    params.push(limit);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create activity record
app.post('/api/activity', async (req, res) => {
  const { employee_id, activity_type, details } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO activity (employee_id, activity_type, details) VALUES ($1, $2, $3) RETURNING *',
      [employee_id, activity_type, details]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== FACE RECOGNITION ENDPOINTS ====================

// Get face recognition logs
app.get('/api/face-recognition', async (req, res) => {
  const { employee_id, limit = 50 } = req.query;
  
  try {
    let query = `
      SELECT 
        f.*,
        e.first_name || ' ' || e.last_name as employee_name
      FROM face_recognition_logs f
      JOIN employees e ON f.employee_id = e.id
    `;
    
    const params = [];
    if (employee_id) {
      query += ' WHERE f.employee_id = $1';
      params.push(employee_id);
    }
    
    query += ' ORDER BY f.recognition_time DESC LIMIT $' + (params.length + 1);
    params.push(limit);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log face recognition
app.post('/api/face-recognition', async (req, res) => {
  const { employee_id, confidence_score, image_path, status } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO face_recognition_logs (employee_id, confidence_score, image_path, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [employee_id, confidence_score, image_path, status || 'recognized']
    );
    
    // Create notification for admin
    const employee = await pool.query(
      'SELECT first_name || \' \' || last_name as name FROM employees WHERE id = $1',
      [employee_id]
    );
    
    if (employee.rows.length > 0) {
      await pool.query(
        'INSERT INTO notifications (user_id, title, message, type) VALUES ((SELECT id FROM users WHERE role = $1 LIMIT 1), $2, $3, $4)',
        ['admin', 'Face Recognition', `${employee.rows[0].name} detected with ${confidence_score}% confidence`, 'info']
      );
    }
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== LIVE CHAT ENDPOINTS ====================

// Send message
app.post('/api/chat/send', async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;

    if (!sender_id || !receiver_id || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO live_chat (sender_id, receiver_id, message, timestamp)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [sender_id, receiver_id, message]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get conversation between two users
app.get('/api/chat/conversation/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const result = await pool.query(
      `SELECT c.*,
        s.name as sender_name,
        s.role as sender_role
       FROM live_chat c
       LEFT JOIN users s ON c.sender_id = s.id
       WHERE (c.sender_id = $1 AND c.receiver_id = $2)
          OR (c.sender_id = $2 AND c.receiver_id = $1)
       ORDER BY c.timestamp ASC
       LIMIT 100`,
      [userId1, userId2]
    );

    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Get unread message count
app.get('/api/chat/unread/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT COUNT(*) as count FROM live_chat WHERE receiver_id = $1 AND is_read = false',
      [userId]
    );

    res.json({ count: parseInt(result.rows[0].count) });

  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ error: 'Failed to fetch count' });
  }
});

// Mark messages as read
app.put('/api/chat/mark-read/:userId/:senderId', async (req, res) => {
  try {
    const { userId, senderId } = req.params;

    await pool.query(
      'UPDATE live_chat SET is_read = true WHERE receiver_id = $1 AND sender_id = $2',
      [userId, senderId]
    );

    res.json({ message: 'Messages marked as read' });

  } catch (error) {
    console.error('Error marking as read:', error);
    res.status(500).json({ error: 'Failed to update' });
  }
});

// ==================== FORGOT PASSWORD ENDPOINT ====================

app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if email exists in database
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal if email exists or not for security
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    const user = result.rows[0];

    // Generate reset token (simple implementation - in production use JWT or secure tokens)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store reset token in database (you might want to add a reset_tokens table for production)
    // For now, we'll just log it and return success
    console.log(`Password reset requested for ${email}`);
    console.log(`Reset token: ${resetToken} (expires: ${resetExpiry})`);

    // In production, you would:
    // 1. Store token in database with expiry
    // 2. Send email with reset link containing token
    // 3. Create reset-password page that accepts token

    res.json({
      message: 'If an account with that email exists, a password reset link has been sent.',
      // In development, you can show the token for testing
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// ==================== NOTIFICATION ENDPOINTS ====================

// Get notifications for a user
app.get('/api/notifications', async (req, res) => {
  const { user_id, limit = 20 } = req.query;
  
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [user_id, limit]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark notification as read
app.put('/api/notifications/:id/read', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// LOGIN EVENTS ENDPOINT (for monitoring)
// ========================================
app.get('/api/login-events', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Query recent login events
    const result = await pool.query(
      `SELECT
        u.id,
        u.username,
        COALESCE(e.first_name || ' ' || e.last_name, u.username) as name,
        u.role,
        u.last_login,
        u.created_at
      FROM users u
      LEFT JOIN employees e ON e.user_id = u.id
      WHERE u.last_login IS NOT NULL
      ORDER BY u.last_login DESC
      LIMIT $1`,
      [limit]
    );

    // Format as login events
    const events = result.rows.map(user => ({
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      timestamp: user.last_login,
      event: 'login'
    }));

    res.json(events);

  } catch (error) {
    console.error('Error fetching login events:', error);
    res.status(500).json({ error: 'Failed to fetch login events' });
  }
});

// ==================== STATISTICS ENDPOINTS ====================

// Get dashboard statistics
app.get('/api/stats/dashboard', async (req, res) => {
  try {
    const totalEmployees = await pool.query('SELECT COUNT(*) FROM employees');
    const todayAttendance = await pool.query(
      "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE AND status = 'present'"
    );
    const todayAbsent = await pool.query(
      "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE AND status = 'absent'"
    );
    const avgPerformance = await pool.query(
      'SELECT AVG(productivity_score) as avg_score FROM performance WHERE date >= CURRENT_DATE - INTERVAL \'30 days\''
    );
    
    res.json({
      totalEmployees: parseInt(totalEmployees.rows[0].count),
      presentToday: parseInt(todayAttendance.rows[0].count),
      absentToday: parseInt(todayAbsent.rows[0].count),
      avgPerformance: parseFloat(avgPerformance.rows[0].avg_score || 0).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== MONITORING SERVICE ENDPOINTS ====================

// Get monitoring events
app.get('/api/monitoring/events', async (req, res) => {
  const { limit = 50, type, since } = req.query;
  
  try {
    // Get events from both memory and database
    const memoryEvents = monitoringService.getEvents(parseInt(limit), type, since);
    const dbEvents = await monitoringService.getEventsFromDatabase(parseInt(limit), type, since);
    
    // Combine and deduplicate
    const allEvents = [...memoryEvents, ...dbEvents];
    const uniqueEvents = Array.from(
      new Map(allEvents.map(event => [event.id || event.timestamp.toString(), event])).values()
    );
    
    // Sort by timestamp
    uniqueEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json(uniqueEvents.slice(0, parseInt(limit)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monitoring summary
app.get('/api/monitoring/summary', (req, res) => {
  try {
    const summary = monitoringService.getSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get monitoring status
app.get('/api/monitoring/status', (req, res) => {
  res.json({
    isRunning: monitoringService.isRunning,
    totalEvents: monitoringService.events.length,
    lastCheck: monitoringService.events.length > 0 
      ? monitoringService.events[monitoringService.events.length - 1].timestamp 
      : null
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Database connection pool initialized');
  
  // Start 24/7 monitoring service
  console.log('');
  monitoringService.start();
  console.log('');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  monitoringService.stop();
  pool.end(() => {
    console.log('Database pool has ended');
    process.exit(0);
  });
});
