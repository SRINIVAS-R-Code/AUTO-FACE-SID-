import type { Kpi, Employee, AttendanceRecord } from "@/lib/types";
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
  { id: '1', name: 'Alicia Rodriguez', email: 'alicia.r@example.com', avatar: 'https://picsum.photos/seed/1/100/100', department: 'Engineering', status: 'On Time', lastSeen: '9:02 AM' },
  { id: '2', name: 'Ben Carter', email: 'ben.c@example.com', avatar: 'https://picsum.photos/seed/2/100/100', department: 'Marketing', status: 'Late', lastSeen: '9:17 AM' },
  { id: '3', name: 'Carla Diaz', email: 'carla.d@example.com', avatar: 'https://picsum.photos/seed/3/100/100', department: 'Sales', status: 'On Time', lastSeen: '8:55 AM' },
  { id: '4', name: 'David Lee', email: 'david.l@example.com', avatar: 'https://picsum.photos/seed/4/100/100', department: 'HR', status: 'On Leave', lastSeen: 'Yesterday' },
  { id: '5', name: 'Eva Green', email: 'eva.g@example.com', avatar: 'https://picsum.photos/seed/5/100/100', department: 'Engineering', status: 'Absent', lastSeen: 'Yesterday' },
  { id: '6', name: 'Frank Miller', email: 'frank.m@example.com', avatar: 'https://picsum.photos/seed/6/100/100', department: 'Sales', status: 'On Time', lastSeen: '9:01 AM' },
  { id: '7', name: 'Grace Hall', email: 'grace.h@example.com', avatar: 'https://picsum.photos/seed/7/100/100', department: 'Marketing', status: 'On Time', lastSeen: '8:59 AM' },
  { id: '8', name: 'Henry Ward', email: 'henry.w@example.com', avatar: 'https://picsum.photos/seed/8/100/100', department: 'Engineering', status: 'Late', lastSeen: '9:25 AM' },
  { id: '9', name: 'Ivy Chen', email: 'ivy.c@example.com', avatar: 'https://picsum.photos/seed/9/100/100', department: 'HR', status: 'On Time', lastSeen: '9:00 AM' },
  { id: '10', name: 'Jack Taylor', email: 'jack.t@example.com', avatar: 'https://picsum.photos/seed/10/100/100', department: 'Sales', status: 'On Time', lastSeen: '8:45 AM' },
  { id: '11', name: 'Kate Wilson', email: 'kate.w@example.com', avatar: 'https://picsum.photos/seed/11/100/100', department: 'Marketing', status: 'On Leave', lastSeen: 'Yesterday' },
  { id: '12', name: 'Leo Martin', email: 'leo.m@example.com', avatar: 'https://picsum.photos/seed/12/100/100', department: 'Engineering', status: 'On Time', lastSeen: '9:03 AM' },
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
