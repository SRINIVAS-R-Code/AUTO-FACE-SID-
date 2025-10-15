"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Bot,
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

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
    { href: "/user/dashboard", icon: User, label: "My Dashboard" },
]

export function UserSidebarNav() {
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
    </Sidebar>
  )
}
