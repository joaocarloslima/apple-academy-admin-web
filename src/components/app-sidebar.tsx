"use client"

import { Layers, Moon, Sun, User, UserCheck } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { NavUser } from "./nav-user"
import DropdownCohort from "./dropdown-cohort"

// Menu items.
const items = [
    {
        title: "Cohorts",
        url: "/admin/cohorts",
        icon: Layers
    },
    {
        title: "Mentors",
        url: "/admin/mentors",
        icon: UserCheck,
    },
    {
        title: "Students",
        url: "/admin/students",
        icon: User,
    },

]

interface AppSidebarProps {
    user: User;
    cohorts?: Cohort[];
    selectedCohort?: string;
}


export function AppSidebar({user, cohorts, selectedCohort}: AppSidebarProps) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownCohort cohorts={cohorts} selectedCohort={selectedCohort}/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span>Theme</span>
                                    </a>
                                </SidebarMenuButton>
                                <ModeToggle />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}
