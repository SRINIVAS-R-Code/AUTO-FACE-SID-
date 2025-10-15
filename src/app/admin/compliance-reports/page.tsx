
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, FileText, FileSpreadsheet, Clock, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { dataAccessLogs } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const complianceKpis = [
    { title: "Total Work Hours", value: "45,320", icon: Clock, trend: "+5% from last month" },
    { title: "Overtime Hours", value: "1,280", icon: AlertTriangle, trend: "-2% from last month" },
    { title: "Data Access Events", value: "542", icon: Eye, trend: "+12% from last month" },
];


export default function ComplianceReportsPage() {
  const getActionLink = (log: (typeof dataAccessLogs)[0]) => {
    switch (log.action) {
      case "Viewed Feed":
        return `/admin/security-cameras`; // General feed page
      case "Viewed Analytics":
        return log.targetId ? `/admin/performance-analytics/${log.targetId}` : `/admin/performance-analytics`;
      case "Exported Report":
        return `/admin/dashboard`; // Or wherever reports are generated
      default:
        return "#";
    }
  };


  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-semibold">Compliance Dashboard</h1>
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

        <div className="grid gap-4 md:grid-cols-3">
            {complianceKpis.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">{kpi.trend}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Data Access Log</CardTitle>
                <CardDescription>
                    Audit trail for access to sensitive employee data and camera feeds.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Administrator</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead className="text-right">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataAccessLogs.map((log) => (
                        <TableRow key={log.id} className="hover:bg-muted/50">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={log.adminAvatar} alt={log.adminName} data-ai-hint="person face" />
                                        <AvatarFallback>{log.adminName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="font-medium">{log.adminName}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link href={getActionLink(log)}>
                                    <Badge variant={
                                        log.action === "Viewed Feed" ? "default" : 
                                        log.action === "Viewed Analytics" ? "secondary" : "outline"
                                    } className="cursor-pointer">{log.action}</Badge>
                                </Link>
                            </TableCell>
                            <TableCell>
                                 <Link href={getActionLink(log)} className="hover:underline">
                                    {log.target}
                                 </Link>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
