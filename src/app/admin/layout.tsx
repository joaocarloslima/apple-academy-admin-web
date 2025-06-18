import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"
import { getCohorts } from "@/actions/cohort-actions"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies()
  const name = cookiesStore.get("name")?.value
  const user = {
    id: "1",
    name: name || "",
    email: cookiesStore.get("email")?.value || "",
    avatarPath: cookiesStore.get("avatarPath")?.value || `https://avatar.iran.liara.run/username?username=${name}`,
  }

  const cohorts = await getCohorts()
  const selectedCohort = cookiesStore.get("selectedCohort")?.value || cohorts[0]?.id


  return (
    <SidebarProvider>
      <AppSidebar user={user} cohorts={cohorts} selectedCohort={selectedCohort} />
      <main className="flex flex-col gap-4 p-6 w-full ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
