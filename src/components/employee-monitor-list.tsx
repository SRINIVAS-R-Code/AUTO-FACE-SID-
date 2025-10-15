
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { employeeData } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Circle } from "lucide-react"

export function EmployeeMonitorList() {
  const [search, setSearch] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(employeeData[0].id)

  const filteredEmployees = employeeData.filter(employee => 
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: (typeof employeeData)[0]['status']) => {
    switch (status) {
      case 'On Time': return 'text-green-500 fill-green-500';
      case 'Late': return 'text-red-500 fill-red-500';
      case 'On Leave': return 'text-gray-500 fill-gray-500';
      case 'Absent': return 'text-yellow-500 fill-yellow-500';
      default: return 'text-gray-500 fill-gray-500';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <Input 
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <div className="space-y-2">
            {filteredEmployees.map(employee => (
              <div 
                key={employee.id} 
                onClick={() => setSelectedEmployee(employee.id)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors",
                  selectedEmployee === employee.id ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="person face" />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.department}</p>
                </div>
                <Circle className={cn("h-3 w-3", getStatusColor(employee.status))} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
