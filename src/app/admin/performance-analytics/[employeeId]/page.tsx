
"use client"

import { notFound, useParams } from 'next/navigation';
import { employeeProductivityData, employeeTaskCompletionData, employeeActivityTrendData, employeeActivityData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { EmployeeProductivityChart } from '@/components/employee-productivity-chart';
import { EmployeeTaskCompletionChart } from '@/components/employee-task-completion-chart';
import { EmployeeActivityTrendChart } from '@/components/employee-activity-trend-chart';
import { EmployeeActivityChart } from '@/components/employee-activity-chart';
import { useEmployee } from '@/context/employee-context';

export default function EmployeeAnalyticsPage() {
  const params = useParams();
  const employeeId = params?.employeeId as string;
  const { getEmployeeById } = useEmployee();
  const employee = getEmployeeById(employeeId);

  if (!employee) {
    // We can show a loading state while employee context is hydration on first load
    return null;
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="person face" />
                <AvatarFallback className="text-3xl">{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                <h1 className="text-3xl font-bold">{employee.name}</h1>
                <p className="text-muted-foreground">{employee.position} • {employee.department}</p>
                </div>
            </div>
            <Button asChild variant="outline">
                <Link href="/admin/performance-analytics">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to All Employees
                </Link>
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmployeeProductivityChart data={employeeProductivityData} />
            <EmployeeActivityTrendChart data={employeeActivityTrendData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <EmployeeActivityChart data={employeeActivityData} />
            </div>
            <div className="lg:col-span-1">
                 <EmployeeTaskCompletionChart data={employeeTaskCompletionData} />
            </div>
        </div>
    </div>
  );
}
