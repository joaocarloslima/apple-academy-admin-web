"use client"

import * as React from "react"
import { Moon, MoreHorizontal, Settings, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuAction } from "./ui/sidebar"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                    <MoreHorizontal />
                </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}
