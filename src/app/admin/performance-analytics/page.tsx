
"use client";

import { useState } from "react";
import Link from "next/link";
import { EmployeePerformanceCard } from "@/components/employee-performance-card";
import { employeeData } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, FileSpreadsheet, Search } from "lucide-react"
import { Input } from "@/components/ui/input";

const performanceData = employeeData.map(employee => ({
  ...employee,
  performance: {
    productivity: Math.floor(Math.random() * 21) + 80, // 80-100%
    taskCompletion: Math.floor(Math.random() * 21) + 75, // 75-95%
  }
}));

export default function PerformanceAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = performanceData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Employee Performance Analytics</h1>
        <div className="flex gap-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter employees..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Word
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <Link href={`/admin/performance-analytics/${employee.id}`} key={employee.id}>
            <EmployeePerformanceCard employee={employee} />
          </Link>
        ))}
      </div>
    </div>
  );
}
