"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebarNav } from "@/components/layout/admin-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role === 'user') {
      router.push('/user/dashboard');
    } else if (role === null) {
      router.push('/');
    }
  }, [role, router]);

  if (role !== 'admin') {
    return null; // or a loading spinner
  }

  return (
    <SidebarProvider>
      <AdminSidebarNav />
      <SidebarInset className="min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
      <AIAssistant />
    </SidebarProvider>
  )
}
