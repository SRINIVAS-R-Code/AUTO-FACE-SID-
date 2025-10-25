const express = require('express');
const cors = require('cors');

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
  origin: 'http://localhost:3000',
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
app.get('/api/employees', (req, res) => {
  // Add filtering capability
  const { department } = req.query;
  
  if (department) {
    const filteredEmployees = mockData.employees.filter(emp => 
      emp.department.toLowerCase() === department.toLowerCase());
    return res.json(filteredEmployees);
  }
  
  res.json(mockData.employees);
});

// API endpoint for employee by ID
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const employee = mockData.employees.find(emp => emp.id === parseInt(id));
  
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  
  // Include attendance data for this employee
  const attendance = mockData.attendance.filter(a => a.employee_id === employee.id);
  const performance = mockData.performance.find(p => p.employee_id === employee.id);
  
  res.json({
    ...employee,
    attendance,
    performance
  });
});

// API endpoint for attendance data
app.get('/api/attendance', (req, res) => {
  res.json(mockData.attendance);
});

// API endpoint for performance data
app.get('/api/performance', (req, res) => {
  res.json(mockData.performance);
});

// API endpoint for activity data
app.get('/api/activity', (req, res) => {
  res.json(mockData.activity);
});

// API endpoint to post activity data
app.post('/api/activity', (req, res) => {
  const { employee_id, type, duration } = req.body;
  
  const newActivity = {
    id: mockData.activity.length + 1,
    employee_id,
    type,
    duration,
    date: new Date().toISOString().split('T')[0]
  };
  
  mockData.activity.push(newActivity);
  res.status(201).json(newActivity);
});

// API endpoint for face recognition data
app.post('/api/face-recognition', (req, res) => {
  const { employee_id, timestamp, confidence_score, location } = req.body;
  
  const newLog = {
    id: mockData.face_recognition_logs.length + 1,
    employee_id,
    timestamp: timestamp || new Date().toISOString(),
    confidence_score,
    location
  };
  
  mockData.face_recognition_logs.push(newLog);
  res.json(newLog);
});

// Authentication endpoints
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = mockData.users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  const existingUser = mockData.users.find(u => u.email === email);
  
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: mockData.users.length + 1,
    username,
    email,
    password,
    role: 'user'
  };
  
  mockData.users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});