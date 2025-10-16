
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebarNav } from "@/components/layout/admin-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { EmployeeProvider } from "@/context/employee-context";
import { AuthChecker } from "./AuthChecker";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
