
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, UserPlus, Pencil, Trash2 } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Employee } from "@/lib/types";
import { useEmployee } from "@/context/employee-context";

export default function EmployeeDirectoryPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
  const [newEmployee, setNewEmployee] = useState({ id: '', name: '', email: '', position: '', department: '' });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const { toast } = useToast();

  const handleAddEmployee = () => {
    if (!newEmployee.id || !newEmployee.name || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill out all fields to add an employee.",
      });
      return;
    }
    
    addEmployee(newEmployee);
    setNewEmployee({ id: '', name: '', email: '', position: '', department: '' });
    setIsAddDialogOpen(false);
  };
  
  const handleEditClick = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEmployee = () => {
    if (!employeeToEdit) return;

    updateEmployee(employeeToEdit);
    setIsEditDialogOpen(false);
    setEmployeeToEdit(null);
  };
  
  const handleDeleteEmployee = () => {
    if (!employeeToDelete) return;

    deleteEmployee(employeeToDelete.id);
    setEmployeeToDelete(null);
  };


  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setNewEmployee({ ...newEmployee, id: `emp${(employees.length + 1).toString().padStart(3, '0')}` })}>
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
                <Label htmlFor="id" className="text-right">Employee ID</Label>
                <Input id="id" value={newEmployee.id} onChange={(e) => setNewEmployee({...newEmployee, id: e.target.value})} className="col-span-3" />
              </div>
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

       {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
                Update the employee's details below.
            </DialogDescription>
            </DialogHeader>
            {employeeToEdit && (
            <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-id" className="text-right">Employee ID</Label>
                    <Input id="edit-id" value={employeeToEdit.id} onChange={(e) => setEmployeeToEdit({...employeeToEdit, id: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">Name</Label>
                    <Input id="edit-name" value={employeeToEdit.name} onChange={(e) => setEmployeeToEdit({...employeeToEdit, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">Email</Label>
                    <Input id="edit-email" value={employeeToEdit.email} onChange={(e) => setEmployeeToEdit({...employeeToEdit, email: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-position" className="text-right">Position</Label>
                    <Input id="edit-position" value={employeeToEdit.position} onChange={(e) => setEmployeeToEdit({...employeeToEdit, position: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-department" className="text-right">Department</Label>
                    <Input id="edit-department" value={employeeToEdit.department} onChange={(e) => setEmployeeToEdit({...employeeToEdit, department: e.target.value})} className="col-span-3" />
                </div>
            </div>
            )}
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="button" onClick={handleUpdateEmployee}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="bg-card/80 hover:bg-card/95 transition-colors flex flex-col">
            <CardHeader>
              <CardTitle>{employee.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm flex-grow">
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
             <CardFooter className="pt-4 flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEditClick(employee)}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog onOpenChange={(open) => !open && setEmployeeToDelete(null)}>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setEmployeeToDelete(employee)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove {employeeToDelete?.name} from the directory.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteEmployee} className="bg-destructive hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
