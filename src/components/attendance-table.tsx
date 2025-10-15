"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { attendanceRecords } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
import { Button } from "./ui/button"

export function AttendanceTable() {
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [searchFilter, setSearchFilter] = useState("")

  const getBadgeVariant = (status: (typeof attendanceRecords)[0]['status']) => {
    switch (status) {
      case 'On Time': return 'default'
      case 'Late': return 'destructive'
      case 'On Leave': return 'secondary'
      case 'Absent': return 'outline'
      default: return 'default'
    }
  }

  const filteredRecords = attendanceRecords
    .filter((record) =>
      departmentFilter === "all" ? true : record.department === departmentFilter
    )
    .filter((record) =>
      record.employeeName.toLowerCase().includes(searchFilter.toLowerCase())
    )

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by name..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="max-w-xs"
          />
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Stream Live</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={record.employeeAvatar} alt={record.employeeName} data-ai-hint="person face" />
                        <AvatarFallback>{record.employeeName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{record.employeeName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>
                    <Link href="/admin/monitoring">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getBadgeVariant(record.status)} className={cn(record.status === 'On Time' && 'bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30', 'capitalize')}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
