-- Create database
CREATE DATABASE auto_face_sid_db;

-- Connect to the database
\c auto_face_sid_db;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  department VARCHAR(50),
  position VARCHAR(50),
  hire_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attendance table
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'present',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create face_recognition_logs table
CREATE TABLE face_recognition_logs (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  recognition_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confidence_score DECIMAL(5,2),
  image_path VARCHAR(255),
  status VARCHAR(20) DEFAULT 'recognized'
);

-- Create notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create activity table
CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  activity_type VARCHAR(50) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create performance table
CREATE TABLE performance (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  date DATE NOT NULL,
  productivity_score DECIMAL(5,2),
  task_completion_rate DECIMAL(5,2),
  quality_score DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@company.com', 'admin', 'admin'),
('john_doe', 'john@company.com', 'user', 'user'),
('jane_smith', 'jane@company.com', 'user', 'user');

INSERT INTO employees (user_id, first_name, last_name, department, position) VALUES
(2, 'John', 'Doe', 'Engineering', 'Software Developer'),
(3, 'Jane', 'Smith', 'HR', 'HR Manager');