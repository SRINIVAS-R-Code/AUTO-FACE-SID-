
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EmployeeProductivityChart } from "./employee-productivity-chart"
import { EmployeeTaskCompletionChart } from "./employee-task-completion-chart"
import { EmployeeActivityChart } from "./employee-activity-chart"
import { employeeProductivityData, employeeTaskCompletionData, employeeActivityData } from "@/lib/data"


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
       <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Performance Analytics: {employee.name}</DialogTitle>
          <DialogDescription>
            Detailed performance breakdown for {employee.position}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-4">
            <EmployeeProductivityChart data={employeeProductivityData} />
            <EmployeeTaskCompletionChart data={employeeTaskCompletionData} />
            <EmployeeActivityChart data={employeeActivityData} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
