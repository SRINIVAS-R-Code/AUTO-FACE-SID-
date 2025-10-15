
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employeeData as initialEmployeeData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Circle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Employee } from "@/lib/types";

export default function EmployeeDirectoryPage() {
  const [employeeData, setEmployeeData] = useState<Employee[]>(initialEmployeeData);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', position: '', department: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields to add an employee.",
      });
      return;
    }

    const newEntry: Employee = {
      id: `emp${(employeeData.length + 1).toString().padStart(3, '0')}`,
      avatar: `https://picsum.photos/seed/${employeeData.length + 1}/100/100`,
      status: 'Active',
      workLocation: 'Office',
      lastSeen: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...newEmployee,
    };

    setEmployeeData([...employeeData, newEntry]);
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been added to the directory.`,
    });
    setNewEmployee({ name: '', email: '', position: '', department: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Enter the details for the new employee below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={newEmployee.name} onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" value={newEmployee.email} onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">Position</Label>
                <Input id="position" value={newEmployee.position} onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">Department</Label>
                <Input id="department" value={newEmployee.department} onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddEmployee}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employeeData.map((employee) => (
          <Card key={employee.id} className="bg-card/80 hover:bg-card/95 transition-colors">
            <CardHeader>
              <CardTitle>{employee.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-muted-foreground">Position: </span>
                <span>{employee.position}</span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Department: </span>
                <span>{employee.department}</span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Employee ID: </span>
                <span>{employee.id.toUpperCase()}</span>
              </div>
               <div>
                <span className="font-semibold text-muted-foreground">Status: </span>
                <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-400">
                    <Circle className="mr-1 h-2 w-2 fill-current" />
                    Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
