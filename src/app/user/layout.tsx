"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { UserSidebarNav } from "@/components/layout/user-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role !== 'user') {
      router.push('/');
    }
  }, [role, router]);

  if (role !== 'user') {
    return null; // or a loading spinner
  }

  return (
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
  )
}
