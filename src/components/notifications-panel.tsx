
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from 'lucide-react'
import { useNotification } from "@/context/notification-context"

export function NotificationsPanel() {
  const { notifications } = useNotification();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Bell className="h-5 w-5" />
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
