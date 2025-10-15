
"use client";

import { AttendanceTable } from "@/components/attendance-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FileDown, FileText, FileSpreadsheet } from "lucide-react"

export default function AttendancePage() {
  const handleExport = (format: 'csv' | 'word') => {
    let data = '';
    let mimeType = '';
    let fileExtension = '';

    if (format === 'csv') {
      data = 'Employee,Department,Date,Check In,Check Out,Status\nAlicia Rodriguez,Engineering,2024-07-22,09:02,17:58,On Time\nBen Carter,Marketing,2024-07-22,09:17,18:05,Late';
      mimeType = 'text/csv';
      fileExtension = 'csv';
    } else {
      data = 'Attendance Report\n\nEmployee: Alicia Rodriguez, Status: On Time\nEmployee: Ben Carter, Status: Late';
      mimeType = 'application/msword';
      fileExtension = 'doc';
    }

    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Attendance Records</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleExport('csv')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleExport('word')}>
              <FileText className="mr-2 h-4 w-4" />
              Word
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AttendanceTable />
    </div>
  )
}
