import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies()
  const name = cookiesStore.get("name")?.value
  const user = {
    id: "1",
    name: name || "",
    email: cookiesStore.get("email")?.value || "",
    avatarPath: cookiesStore.get("avatarPath")?.value || `https://avatar.iran.liara.run/username?username=${name}`,
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="flex flex-col gap-4 p-6 w-full ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
