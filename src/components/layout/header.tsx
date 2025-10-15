
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
import { User, Settings, LogOut, Search, Bell, Moon } from "lucide-react"
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export function Header() {
  const { role, logout, username } = useAuth();
  
  const userName = username || (role === 'admin' ? 'Admin User' : 'User');
  const userEmail = role === 'admin' ? 'admin@monitorai.com' : `${(username || 'user').toLowerCase()}@company.com`;
  const userFallback = username ? username.charAt(0).toUpperCase() : (role === 'admin' ? 'A' : 'U');

  return (
    <header className="flex h-20 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
        </Button>
        <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Moon className="h-5 w-5" />
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
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={logout} variant="destructive" className="bg-red-500 hover:bg-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
        </Button>
      </div>
    </header>
  )
}
