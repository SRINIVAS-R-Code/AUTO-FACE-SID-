
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EmployeeTaskCompletionChart } from "./employee-task-completion-chart"
import { employeeTaskCompletionData, employeeProductivityData, employeeActivityTrendData, employeeActivityData } from "@/lib/data"
import { EmployeeProductivityChart } from "./employee-productivity-chart"
import { EmployeeActivityTrendChart } from "./employee-activity-trend-chart"
import { EmployeeActivityChart } from "./employee-activity-chart"


type EmployeePerformance = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  department: string;
  status: 'On Time' | 'Late' | 'Absent' | 'On Leave' | 'Active';
  lastSeen: string;
  performance: {
    productivity: number;
    taskCompletion: number;
  };
};

type EmployeePerformanceCardProps = {
  employee: EmployeePerformance
}

export function EmployeePerformanceCard({ employee }: EmployeePerformanceCardProps) {
  return (
    <Dialog>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="person face" />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{employee.name}</CardTitle>
            <CardDescription>{employee.position}</CardDescription>
          </div>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
                <ArrowUpRight className="h-4 w-4" />
            </Button>
          </DialogTrigger>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="text-muted-foreground">Productivity</span>
              <span className="font-bold">{employee.performance.productivity}%</span>
            </div>
            <Progress value={employee.performance.productivity} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span className="text-muted-foreground">Task Completion</span>
              <span className="font-bold">{employee.performance.taskCompletion}%</span>
            </div>
            <Progress value={employee.performance.taskCompletion} className="[&>div]:bg-green-500" />
          </div>
        </CardContent>
      </Card>
       <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Performance Dashboard: {employee.name}</DialogTitle>
          <DialogDescription>
            Detailed performance and activity breakdown for {employee.position}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <EmployeeProductivityChart data={employeeProductivityData} />
            <EmployeeActivityTrendChart data={employeeActivityTrendData} />
            <EmployeeTaskCompletionChart data={employeeTaskCompletionData} />
            <div className="lg:col-span-3">
              <EmployeeActivityChart data={employeeActivityData} />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
