"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Employee } from '@/lib/types';
import { employeeData as initialEmployeeData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'avatar' | 'status' | 'workLocation' | 'lastSeen'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: string) => void;
  getEmployeeById: (employeeId: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployeeData);
  const { toast } = useToast();

  const addEmployee = (employee: Omit<Employee, 'avatar' | 'status' | 'workLocation' | 'lastSeen'>) => {
    const newEntry: Employee = {
      ...employee,
      avatar: `https://picsum.photos/seed/${employees.length + 1}/100/100`,
      status: 'Active',
      workLocation: 'Office',
      lastSeen: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setEmployees(prev => [...prev, newEntry]);
    toast({
      title: "Employee Added",
      description: `${employee.name} has been added to the directory.`,
    });
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    toast({
        title: "Employee Updated",
        description: `${updatedEmployee.name}'s information has been updated.`,
    });
  };
  
  const deleteEmployee = (employeeId: string) => {
    const employeeToDelete = employees.find(e => e.id === employeeId);
    if (!employeeToDelete) return;
    
    setEmployees(prev => prev.filter(e => e.id !== employeeId));
    toast({
        title: "Employee Removed",
        description: `${employeeToDelete.name} has been removed from the directory.`,
    });
  };

  const getEmployeeById = (employeeId: string) => {
    return employees.find(e => e.id === employeeId);
  }

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployeeById }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
