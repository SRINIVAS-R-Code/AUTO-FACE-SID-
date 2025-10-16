"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { UserSidebarNav } from "@/components/layout/user-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { EmployeeProvider } from "@/context/employee-context";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== 'user') {
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  }, [role, router, isLoading]);

  if (isLoading || role !== 'user') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <EmployeeProvider>
      <SidebarProvider>
        <UserSidebarNav />
        <SidebarInset className="min-h-screen">
          <Header />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
        <AIAssistant />
      </SidebarProvider>
    </EmployeeProvider>
  )
}
