
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  CalendarCheck,
  Video,
  Settings,
  Bot,
  Users,
  Briefcase,
  LineChart,
  ShieldCheck,
  Cpu,
  FileText,
  Lock,
  Cog,
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
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

const navGroups = [
  {
    title: "EXECUTIVE DASHBOARD",
    items: [
      { href: "/admin/dashboard", icon: LayoutGrid, label: "Executive Summary" },
    ],
  },
  {
    title: "WORKFORCE MANAGEMENT",
    items: [
      { href: "/admin/employee-directory", icon: Users, label: "Employee Directory" },
      { href: "/admin/attendance", icon: CalendarCheck, label: "Time & Attendance" },
    ],
  },
  {
    title: "AI OPERATIONS",
    items: [
      { href: "/admin/performance-analytics", icon: LineChart, label: "Performance Analytics" },
      { href: "/admin/security-cameras", icon: Video, label: "Security Cameras" },
      { href: "/admin/ai-monitoring", icon: Cpu, label: "AI Monitoring" },
    ],
  },
  {
    title: "COMPLIANCE & REPORTS",
    items: [
      { href: "/admin/compliance-reports", icon: FileText, label: "Compliance Reports" },
      { href: "/admin/security-audit", icon: ShieldCheck, label: "Security Audit" },
    ],
  },
  {
    title: "SYSTEM ADMINISTRATION",
    items: [
      { href: "/admin/settings", icon: Cog, label: "Settings" },
    ]
  }
];


export function AdminSidebarNav() {
  const pathname = useSafePathname()
  const { state } = useSidebar()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {state === 'expanded' && <span className="text-lg font-semibold">AI Face System</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navGroups.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              {group.items.map((item) => (
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
            </SidebarGroup>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
