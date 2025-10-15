
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Bot,
  LayoutDashboard,
  Video,
  CalendarCheck,
  BarChart2,
  Heart,
  Bell,
  Settings,
  Pencil,
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const useSafePathname = () => {
  try {
    return usePathname()
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("could not be found in the navigation tree")
    ) {
      return "/"
    }
    throw error
  }
}

const userNavItems = [
    { href: "/user/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "#", icon: Video, label: "Live Camera" },
    { href: "#", icon: CalendarCheck, label: "Attendance" },
    { href: "#", icon: BarChart2, label: "Analytics" },
    { href: "/user/wellness", icon: Heart, label: "Wellness" },
    { href: "#", icon: Bell, label: "Notifications" },
    { href: "#", icon: Settings, label: "Settings" },
]

export function UserSidebarNav() {
  const pathname = useSafePathname()
  const { state } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          {state === 'expanded' && <span className="text-lg font-semibold">Employee Portal</span>}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-grow">
        <div className="p-4 space-y-2">
            <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/20 text-primary text-3xl">S</AvatarFallback>
            </Avatar>
            <div className="relative">
                <h3 className="font-semibold">srinivas</h3>
                <p className="text-xs text-muted-foreground">user@company.com</p>
                <button className="absolute top-0 right-0 text-muted-foreground hover:text-foreground">
                    <Pencil size={14} />
                </button>
            </div>
        </div>
        <SidebarMenu>
          {userNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {/* Can add footer items here if needed */}
      </SidebarFooter>
    </Sidebar>
  )
}
