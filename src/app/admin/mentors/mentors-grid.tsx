"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Plus, UserPen } from "lucide-react"
import { useState } from "react"
import { MentorForm } from "./mentor-form"

interface MentorGridProps {
    mentors: Mentor[]
}

export default function MentorsGrid({mentors}: MentorGridProps) {
    const [data, setData] = useState<Mentor[]>(mentors)
    const [editing, setEditing] = useState<Mentor | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    function handleEdit(mentor: Mentor) {
        setEditing(mentor);
        setDialogOpen(true);
    }

    function handleAdd() {
        setEditing(null);
        setDialogOpen(true);
    }

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={handleAdd}>
                    <Plus className="size-4" />
                    Add Mentor
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((mentor) => (
                    <Card key={mentor.id} className="mb-4">
                        <CardHeader
                            className="h-56 bg-cover bg-center"
                            style={{ backgroundImage: `url('${mentor.avatarPath}')` }}
                        />
                        <CardContent>
                            <CardTitle>{mentor.name}</CardTitle>
                            <CardDescription>{mentor.expertise}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant={"outline"} className="w-full" onClick={() => handleEdit(mentor)}>
                                <UserPen /> Edit Mentor Profile
                            </Button>
                        </CardFooter>
                    </Card>
                ))}


            </div>

            <MentorForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                mentor={editing}
                onSuccess={(saved) => {
                    setDialogOpen(false);

                    if (editing) {
                        setData((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
                    } else {
                        setData((prev) => [...prev, saved]);
                    }
                    setEditing(null);
                }}
            />
        </>
    )
}