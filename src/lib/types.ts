
import type { LucideIcon } from "lucide-react";

export type Employee = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  department: string;
  status: 'On Time' | 'Late' | 'Absent' | 'On Leave' | 'Active';
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

export type DataAccessLog = {
  id: string;
  adminName: string;
  adminAvatar: string;
  action: 'Viewed Feed' | 'Viewed Analytics' | 'Exported Report';
  target: string;
  targetId: string | null;
  timestamp: string;
};
