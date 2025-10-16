
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { UserSidebarNav } from "@/components/layout/user-sidebar-nav"
import { Header } from "@/components/layout/header"
import { AIAssistant } from "@/components/ai-assistant"
import { EmployeeProvider } from "@/context/employee-context";
import { AuthChecker } from "./AuthChecker";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <EmployeeProvider>
      <SidebarProvider>
        <UserSidebarNav />
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
