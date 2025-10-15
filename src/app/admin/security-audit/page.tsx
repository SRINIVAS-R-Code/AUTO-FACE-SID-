
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { securityEvents } from "@/lib/data";
import type { SecurityEvent } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, UserX, KeyRound, AlertTriangle, FileOutput } from "lucide-react";

const eventTypeIcons: Record<SecurityEvent['type'], React.ElementType> = {
  'Failed Login': UserX,
  'Permission Change': KeyRound,
  'Unusual Activity': AlertTriangle,
  'Data Export': FileOutput,
};

const getBadgeVariant = (type: SecurityEvent['type']) => {
  switch (type) {
    case 'Failed Login':
      return 'destructive';
    case 'Permission Change':
      return 'default';
    case 'Unusual Activity':
      return 'secondary';
    case 'Data Export':
      return 'outline';
    default:
      return 'default';
  }
};

export default function SecurityAuditPage() {
  const [filterType, setFilterType] = useState<SecurityEvent['type'] | 'all'>('all');

  const filteredEvents = securityEvents.filter(event => 
    filterType === 'all' || event.type === filterType
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Security Audit Log</h1>
        <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="Failed Login">Failed Logins</SelectItem>
            <SelectItem value="Permission Change">Permission Changes</SelectItem>
            <SelectItem value="Unusual Activity">Unusual Activity</SelectItem>
            <SelectItem value="Data Export">Data Exports</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck /> Security Events</CardTitle>
          <CardDescription>
            An audit trail of important security-related events in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => {
                const Icon = eventTypeIcons[event.type];
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      <Badge variant={getBadgeVariant(event.type)}>
                        <Icon className="mr-1.5 h-3 w-3" />
                        {event.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                              <AvatarImage src={event.userAvatar} alt={event.user} data-ai-hint="person face" />
                              <AvatarFallback>{event.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{event.user}</div>
                      </div>
                    </TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell className="font-mono text-xs">{event.ipAddress}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{event.timestamp}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
