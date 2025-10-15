"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  CalendarCheck,
  Video,
  Settings,
  User,
  Bot,
} from "lucide-react"

import { cn } from "@/lib/utils"
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

// A workaround for the issue of usePathname throwing a suspense error in production.
// This is a known issue with Next.js App Router.
// See: https://github.com/vercel/next.js/issues/59330
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

const adminNavItems = [
  { href: "/", icon: LayoutGrid, label: "Admin Dashboard" },
  { href: "/attendance", icon: CalendarCheck, label: "Attendance" },
  { href: "/monitoring", icon: Video, label: "Monitoring" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

const userNavItems = [
    { href: "/user-dashboard", icon: User, label: "My Dashboard" },
]

export function SidebarNav() {
  const pathname = useSafePathname()
  const { state } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {state === 'expanded' && <span className="text-lg font-semibold">MonitorAI</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <p className="text-xs text-muted-foreground px-4 py-2">Admin</p>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
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
        <SidebarMenu>
            <p className="text-xs text-muted-foreground px-4 py-2">User</p>
          {userNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
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
      </SidebarFooter>
    </Sidebar>
  )
}
