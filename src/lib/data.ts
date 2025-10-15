
import type { Kpi, Employee, AttendanceRecord, DataAccessLog, SecurityEvent } from "@/lib/types";
import { Users, Clock, AlertTriangle, UserCheck } from "lucide-react";

export const kpiData: Kpi[] = [
  {
    title: "Total Employees",
    value: "1,250",
    change: "+1.5%",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "On Time",
    value: "98.2%",
    change: "+0.5%",
    changeType: "increase",
    icon: UserCheck,
  },
  {
    title: "Late Arrivals",
    value: "1.8%",
    change: "-0.2%",
    changeType: "decrease",
    icon: Clock,
  },
  {
    title: "Absences",
    value: "0.5%",
    change: "+0.1%",
    changeType: "increase",
    icon: AlertTriangle,
  },
];

export const employeeData: Employee[] = [
  { id: 'adm001', name: 'Admin User', email: 'admin@example.com', avatar: 'https://picsum.photos/seed/1/100/100', position: 'System Administrator', department: 'IT', status: 'Active', workLocation: 'Office', lastSeen: '9:02 AM' },
  { id: 'emp004', name: 'Alice Brown', email: 'alice.b@example.com', avatar: 'https://picsum.photos/seed/2/100/100', position: 'HR Specialist', department: 'HR', status: 'Active', workLocation: 'Office', lastSeen: '9:17 AM' },
  { id: 'emp003', name: 'Bob Johnson', email: 'bob.j@example.com', avatar: 'https://picsum.photos/seed/3/100/100', position: 'Sales Representative', department: 'Sales', status: 'Active', workLocation: 'Home', lastSeen: '8:55 AM' },
  { id: 'emp005', name: 'Charlie Wilson', email: 'charlie.w@example.com', avatar: 'https://picsum.photos/seed/4/100/100', position: 'Accountant', department: 'Finance', status: 'Active', workLocation: 'Disconnected', lastSeen: 'Yesterday' },
  { id: 'emp006', name: 'Diana Davis', email: 'diana.d@example.com', avatar: 'https://picsum.photos/seed/5/100/100', position: 'Operations Manager', department: 'Operations', status: 'Active', workLocation: 'Office', lastSeen: 'Yesterday' },
  { id: 'emp007', name: 'Edward Miller', email: 'edward.m@example.com', avatar: 'https://picsum.photos/seed/6/100/100', position: 'System Administrator', department: 'IT', status: 'Active', workLocation: 'Home', lastSeen: '9:01 AM' },
  { id: 'emp008', name: 'Fiona Garcia', email: 'fiona.g@example.com', avatar: 'https://picsum.photos/seed/7/100/100', position: 'Support Specialist', department: 'Customer Service', status: 'Active', workLocation: 'Office', lastSeen: '8:59 AM' },
  { id: 'emp009', name: 'George Lee', email: 'george.l@example.com', avatar: 'https://picsum.photos/seed/8/100/100', position: 'Research Analyst', department: 'Research', status: 'Active', workLocation: 'Disconnected', lastSeen: '9:25 AM' },
  { id: 'emp010', name: 'Helen Taylor', email: 'helen.t@example.com', avatar: 'https://picsum.photos/seed/9/100/100', position: 'Legal Counsel', department: 'Legal', status: 'Active', workLocation: 'Home', lastSeen: '9:00 AM' },
  { id: 'emp011', name: 'Jane Smith', email: 'jane.s@example.com', avatar: 'https://picsum.photos/seed/10/100/100', position: 'Marketing Manager', department: 'Marketing', status: 'Active', workLocation: 'Office', lastSeen: '8:45 AM' },
  { id: 'emp012', name: 'John Doe', email: 'john.d@example.com', avatar: 'https://picsum.photos/seed/11/100/100', position: 'Software Developer', department: 'Engineering', status: 'Active', workLocation: 'Office', lastSeen: 'Yesterday' },
  { id: 'emp013', name: 'User One', email: 'user@example.com', avatar: 'https://picsum.photos/seed/12/100/100', position: 'Staff Member', department: 'General', status: 'Active', workLocation: 'Office', lastSeen: '9:03 AM' },
];


export const attendanceChartData = [
  { month: "Jan", attendance: 97.5 },
  { month: "Feb", attendance: 98.1 },
  { month: "Mar", attendance: 98.0 },
  { month: "Apr", attendance: 97.8 },
  { month: "May", attendance: 98.5 },
  { month: "Jun", attendance: 98.2 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'rec1', employeeName: 'Alicia Rodriguez', employeeAvatar: 'https://picsum.photos/seed/1/100/100', department: 'Engineering', date: '2024-07-22', checkIn: '09:02', checkOut: '17:58', status: 'On Time' },
  { id: 'rec2', employeeName: 'Ben Carter', employeeAvatar: 'https://picsum.photos/seed/2/100/100', department: 'Marketing', date: '2024-07-22', checkIn: '09:17', checkOut: '18:05', status: 'Late' },
  { id: 'rec3', employeeName: 'Carla Diaz', employeeAvatar: 'https://picsum.photos/seed/3/100/100', department: 'Sales', date: '2024-07-22', checkIn: '08:55', checkOut: '17:30', status: 'On Time' },
  { id: 'rec4', employeeName: 'David Lee', employeeAvatar: 'https://picsum.photos/seed/4/100/100', department: 'HR', date: '2024-07-22', checkIn: '-', checkOut: '-', status: 'On Leave' },
  { id: 'rec5', employeeName: 'Frank Miller', employeeAvatar: 'https://picsum.photos/seed/6/100/100', department: 'Engineering', date: '2024-07-22', checkIn: '08:59', checkOut: '17:45', status: 'On Time' },
  { id: 'rec6', employeeName: 'Grace Hall', employeeAvatar: 'https://picsum.photos/seed/7/100/100', department: 'Marketing', date: '2024-07-22', checkIn: '09:05', checkOut: '17:50', status: 'On Time' },
];

export const notifications = [
  { id: 1, title: 'System Update', description: 'Scheduled maintenance this weekend.', time: '2h ago' },
  { id: 2, title: 'Policy Change', description: 'New remote work policy is now in effect.', time: '1d ago' },
  { id: 3, title: 'Holiday Reminder', description: 'Upcoming public holiday next Monday.', time: '3d ago' },
];

export const productivityTrendData = [
  { month: 'Jan', productivity: 88 },
  { month: 'Feb', productivity: 90 },
  { month: 'Mar', productivity: 89 },
  { month: 'Apr', productivity: 92 },
  { month: 'May', productivity: 93 },
  { month: 'Jun', productivity: 91 },
];

export const taskCompletionData = [
    { status: "On Track", count: 75, fill: "hsl(var(--chart-1))" },
    { status: "Excelling", count: 15, fill: "hsl(var(--chart-2))" },
    { status: "Behind", count: 10, fill: "hsl(var(--chart-3))" },
]

export const employeeProductivityData = [
  { month: "Jan", productivity: 85 },
  { month: "Feb", productivity: 88 },
  { month: "Mar", productivity: 86 },
  { month: "Apr", productivity: 90 },
  { month: "May", productivity: 91 },
  { month: "Jun", productivity: 89 },
];

export const employeeTaskCompletionData = [
  { status: 'Completed', tasks: 120, fill: 'hsl(var(--chart-1))' },
  { status: 'Pending', tasks: 25, fill: 'hsl(var(--chart-3))' },
  { status: 'Overdue', tasks: 8, fill: 'hsl(var(--chart-5))' },
]

export const employeeActivityData = [
  { metric: "Productivity", value: 92 },
  { metric: "Task Completion", value: 85 },
  { metric: "Focus", value: 95 },
  { metric: "Keyboard", value: 75 },
  { metric: "Mouse", value: 80 },
]

export const employeeActivityTrendData = [
  { month: 'Jan', activity: 82 },
  { month: 'Feb', activity: 85 },
  { month: 'Mar', activity: 88 },
  { month: 'Apr', activity: 86 },
  { month: 'May', activity: 90 },
  { month: 'Jun', activity: 92 },
];

export const dataAccessLogs: DataAccessLog[] = [
  { id: 'log1', adminName: 'Admin User', adminAvatar: 'https://picsum.photos/seed/1/100/100', action: 'Viewed Feed', target: 'Alice Brown', targetId: 'emp004', timestamp: '2024-07-23 10:45 AM' },
  { id: 'log2', adminName: 'Admin User', adminAvatar: 'https://picsum.photos/seed/1/100/100', action: 'Viewed Analytics', target: 'Bob Johnson', targetId: 'emp003', timestamp: '2024-07-23 10:42 AM' },
  { id: 'log3', adminName: 'Edward Miller', adminAvatar: 'https://picsum.photos/seed/6/100/100', action: 'Exported Report', target: 'All Employees', targetId: null, timestamp: '2024-07-22 03:15 PM' },
  { id: 'log4', adminName: 'Admin User', adminAvatar: 'https://picsum.photos/seed/1/100/100', action: 'Viewed Feed', target: 'Jane Smith', targetId: 'emp011', timestamp: '2024-07-22 11:01 AM' },
];

export const securityEvents: SecurityEvent[] = [
  { id: 'sec1', timestamp: '2024-07-24 09:15 AM', type: 'Failed Login', user: 'Unknown', userAvatar: 'https://picsum.photos/seed/13/100/100', description: 'Attempted login with invalid credentials.', ipAddress: '192.168.1.101' },
  { id: 'sec2', timestamp: '2024-07-24 08:30 AM', type: 'Data Export', user: 'Admin User', userAvatar: 'https://picsum.photos/seed/1/100/100', description: 'Exported performance-report.csv', ipAddress: '192.168.1.100' },
  { id: 'sec3', timestamp: '2024-07-23 05:00 PM', type: 'Permission Change', user: 'Edward Miller', userAvatar: 'https://picsum.photos/seed/6/100/100', description: 'Assigned "Admin" role to user "Charlie Wilson"', ipAddress: '192.168.1.105' },
  { id: 'sec4', timestamp: '2024-07-23 11:20 AM', type: 'Unusual Activity', user: 'Diana Davis', userAvatar: 'https://picsum.photos/seed/5/100/100', description: 'Anomalous after-hours system access detected.', ipAddress: '203.0.113.5' },
  { id: 'sec5', timestamp: '2024-07-22 09:05 AM', type: 'Failed Login', user: 'bob.j@example.com', userAvatar: 'https://picsum.photos/seed/3/100/100', description: 'Attempted login with invalid credentials.', ipAddress: '192.168.1.112' },
];
