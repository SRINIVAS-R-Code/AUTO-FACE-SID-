const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Mock data for database-less operation
const mockData = {
  users: [
    { id: 1, username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', email: 'user@example.com', password: 'user123', role: 'user' }
  ],
  employees: [
    { id: 1, name: 'John Doe', position: 'Developer', department: 'Engineering', hire_date: '2022-01-15' },
    { id: 2, name: 'Jane Smith', position: 'Designer', department: 'Design', hire_date: '2022-02-20' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', department: 'Operations', hire_date: '2021-11-10' }
  ],
  attendance: [
    { id: 1, employee_id: 1, date: '2023-05-01', check_in: '09:00:00', check_out: '17:00:00', status: 'present' },
    { id: 2, employee_id: 2, date: '2023-05-01', check_in: '08:45:00', check_out: '17:30:00', status: 'present' },
    { id: 3, employee_id: 3, date: '2023-05-01', check_in: '09:15:00', check_out: '18:00:00', status: 'present' },
    { id: 4, employee_id: 1, date: '2023-05-02', check_in: '09:05:00', check_out: '17:10:00', status: 'present' },
    { id: 5, employee_id: 2, date: '2023-05-02', check_in: null, check_out: null, status: 'absent' }
  ],
  performance: [
    { id: 1, employee_id: 1, month: 'May 2023', rating: 4.5, comments: 'Excellent work on the new feature' },
    { id: 2, employee_id: 2, month: 'May 2023', rating: 4.2, comments: 'Great design improvements' },
    { id: 3, employee_id: 3, month: 'May 2023', rating: 4.0, comments: 'Good team management' }
  ],
  activity: [
    { id: 1, employee_id: 1, type: 'coding', duration: 240, date: '2023-05-01' },
    { id: 2, employee_id: 1, type: 'meeting', duration: 60, date: '2023-05-01' },
    { id: 3, employee_id: 2, type: 'design', duration: 180, date: '2023-05-01' },
    { id: 4, employee_id: 2, type: 'meeting', duration: 90, date: '2023-05-01' },
    { id: 5, employee_id: 3, type: 'planning', duration: 120, date: '2023-05-01' }
  ],
  face_recognition_logs: [
    { id: 1, employee_id: 1, timestamp: '2023-05-01T09:00:00Z', confidence_score: 0.95, location: 'Main Entrance' },
    { id: 2, employee_id: 2, timestamp: '2023-05-01T08:45:00Z', confidence_score: 0.92, location: 'Main Entrance' },
    { id: 3, employee_id: 3, timestamp: '2023-05-01T09:15:00Z', confidence_score: 0.97, location: 'Side Entrance' }
  ]
};

// Configure middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true
}));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// API endpoint for general data
app.get('/api/data', (req, res) => {
  res.json({ message: 'Connected to backend successfully!' });
});

// API endpoint for employees
app.get('/api/employees', async (req, res) => {
  try {
    const { department } = req.query;
    let query = `
      SELECT e.*, u.username, u.email, u.role
      FROM employees e
      JOIN users u ON e.user_id = u.id
    `;
    const params = [];

    if (department) {
      query += ' WHERE e.department = $1';
      params.push(department);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for employee by ID
app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get employee details
    const employeeQuery = `
      SELECT e.*, u.username, u.email, u.role
      FROM employees e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = $1
    `;
    const employeeResult = await pool.query(employeeQuery, [id]);

    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const employee = employeeResult.rows[0];

    // Get attendance records
    const attendanceQuery = 'SELECT * FROM attendance WHERE employee_id = $1 ORDER BY date DESC';
    const attendanceResult = await pool.query(attendanceQuery, [id]);

    // Get performance records
    const performanceQuery = 'SELECT * FROM performance WHERE employee_id = $1 ORDER BY date DESC';
    const performanceResult = await pool.query(performanceQuery, [id]);

    res.json({
      ...employee,
      attendance: attendanceResult.rows,
      performance: performanceResult.rows
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for attendance data
app.get('/api/attendance', async (req, res) => {
  try {
    const query = 'SELECT * FROM attendance ORDER BY date DESC, check_in DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for performance data
app.get('/api/performance', async (req, res) => {
  try {
    const query = 'SELECT * FROM performance ORDER BY date DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching performance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for activity data
app.get('/api/activity', async (req, res) => {
  try {
    const query = 'SELECT * FROM activity ORDER BY timestamp DESC';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to post activity data
app.post('/api/activity', async (req, res) => {
  try {
    const { employee_id, type, duration, details } = req.body;

    const query = `
      INSERT INTO activity (employee_id, activity_type, timestamp, details)
      VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
      RETURNING *
    `;
    const values = [employee_id, type, details || null];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for face recognition data
app.post('/api/face-recognition', async (req, res) => {
  try {
    const { employee_id, confidence_score, image_path, status } = req.body;

    const query = `
      INSERT INTO face_recognition_logs (employee_id, confidence_score, image_path, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [employee_id, confidence_score, image_path || null, status || 'recognized'];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating face recognition log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login events tracking
const loginEvents = [];

// Authentication endpoints
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Log the login event (you might want to create a login_events table for this)
    const loginEvent = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      timestamp: new Date().toISOString(),
      ipAddress: req.ip || 'Unknown'
    };

    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, loginEvent });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent login events (for admin notifications) - Note: This would need a login_events table in production
app.get('/api/login-events', (req, res) => {
  // For now, return empty array since we don't have persistent login events
  // In production, you'd query a login_events table
  res.json([]);
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
    const existingResult = await pool.query(existingQuery, [email, username]);

    if (existingResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Insert new user
    const insertQuery = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, 'user')
      RETURNING id, username, email, role, created_at
    `;
    const insertResult = await pool.query(insertQuery, [username, email, password]);

    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});