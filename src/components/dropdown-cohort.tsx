import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";

interface DropdownCohortProps {
    cohorts?: Cohort[];
    selectedCohort?: string;
}

export default function DropdownCohort({ cohorts, selectedCohort }: DropdownCohortProps) {

    async function setCohort(cohort: Cohort) {
        await fetch('/api/set-cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'selectedCohort', value: cohort.id }),
        });
        window.location.reload(); 
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <span className="truncate">
                        {cohorts?.find((c) => c.id === selectedCohort)?.name || "Select Cohort"}
                    </span>
                    <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {cohorts?.map((cohort) => (
                    <DropdownMenuItem key={cohort.id} onClick={() => setCohort?.(cohort)}>
                        <span>{cohort.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}