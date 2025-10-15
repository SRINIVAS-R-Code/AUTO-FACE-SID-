
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User, Settings, LogOut, Search, Bell, Moon, Sun } from "lucide-react"
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useNotification } from "@/context/notification-context";

export function Header() {
  const { role, logout, username } = useAuth();
  const { theme, setTheme } = useTheme();
  const { notifications } = useNotification();
  
  const userName = username || (role === 'admin' ? 'Admin User' : 'User');
  const userEmail = role === 'admin' ? 'admin@monitorai.com' : `${(username || 'user').toLowerCase()}@company.com`;
  const userFallback = username ? username.charAt(0).toUpperCase() : (role === 'admin' ? 'A' : 'U');
  const notificationsLink = role === 'admin' ? '/admin/notifications' : '/user/notifications';

  return (
    <header className="flex h-20 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <div className="relative">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                    </Button>
                    {notifications.length > 0 && 
                      <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">{notifications.length}</span>
                    }
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                    {notifications.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="grid grid-cols-[25px_1fr] items-start gap-3">
                             <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-primary" />
                             <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{notification.title}</p>
                                <p className="text-sm text-muted-foreground">{notification.description}</p>
                                <p className="text-xs text-muted-foreground pt-1">{notification.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={notificationsLink} className="justify-center">
                        View all notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://picsum.photos/seed/${username || role}/100/100`} alt={userName} data-ai-hint="person face" />
                <AvatarFallback>{userFallback}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={role === 'admin' ? '/admin/settings' : '/user/settings'}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={role === 'admin' ? '/admin/settings' : '/user/settings'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
