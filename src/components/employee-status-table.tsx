
"use client";

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { employeeData } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, Eye } from "lucide-react"

export function EmployeeStatusTable() {
  const getBadgeVariant = (status: (typeof employeeData)[0]['status']) => {
    switch (status) {
      case 'On Time':
        return 'default'
      case 'Late':
        return 'destructive'
      case 'On Leave':
        return 'secondary'
      case 'Absent':
        return 'outline'
      default:
        return 'default'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Status</CardTitle>
        <CardDescription>
          Live overview of employee check-in statuses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead>Live View</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={employee.avatar} alt={employee.name} data-ai-hint="person face" />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.lastSeen}</TableCell>
                <TableCell>
                  <Link href="/admin/monitoring">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={getBadgeVariant(employee.status)} className={cn(employee.status === 'On Time' && 'bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30', 'capitalize')}>
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild variant="link" className="text-primary">
          <Link href="/admin/attendance">
            View More
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
