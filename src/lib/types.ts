import type { LucideIcon } from "lucide-react";

export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: 'Engineering' | 'HR' | 'Marketing' | 'Sales';
  status: 'On Time' | 'Late' | 'Absent' | 'On Leave';
  lastSeen: string;
};

export type Kpi = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
};

export type AttendanceRecord = {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: 'Engineering' | 'HR' | 'Marketing' | 'Sales';
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'On Time' | 'Late' | 'Absent' | 'On Leave';
};
