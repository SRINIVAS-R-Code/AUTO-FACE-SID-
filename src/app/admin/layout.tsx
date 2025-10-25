
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebarNav } from "@/components/layout/admin-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { EmployeeProvider } from "@/context/employee-context";
import { AuthChecker } from "./AuthChecker";
import { useLoginMonitor } from "@/hooks/use-login-monitor";
import { useAuth } from "@/context/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role } = useAuth();
  
  // Monitor for employee logins and send notifications
  useLoginMonitor(role === 'admin');

  return (
    <EmployeeProvider>
      <SidebarProvider>
        <AdminSidebarNav />
        <SidebarInset className="min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6">
            <AuthChecker>
              {children}
            </AuthChecker>
          </main>
        </SidebarInset>
        <AIAssistant />
      </SidebarProvider>
    </EmployeeProvider>
  )
}
