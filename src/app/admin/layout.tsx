import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col gap-4 p-6 w-full ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
