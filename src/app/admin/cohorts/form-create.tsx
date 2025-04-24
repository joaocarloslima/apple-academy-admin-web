"use client";

import { createCohort } from "@/actions/cohort-actions";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CheckCircle2, CirclePause, CirclePlay, CircleX, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialState = {
    name: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
};

const initialErrors = {
    name: "",
};

interface CohortFormCreateProps {
    onAdd: (cohort: Cohort) => void;
}

export function CohortFormCreate({onAdd}: CohortFormCreateProps) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [cohort, setCohort] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setCohort((prevCohort) => ({
            ...prevCohort,
            [name]: value,
        }));
    }

    function handleSubmit() {
        setPending(true);

        toast.promise(
            createCohort(cohort as Cohort),
            {
                loading: "Creating cohort...",
                success: (response) => {
                    onAdd(response);
                    setOpen(false);
                    return "Cohort created successfully";
                },
                error: (errors) => {
                    setErrors(errors);
                    return "Error creating cohort. "
                },
                finally: () => {
                    setPending(false);
                }
            }
        );


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="size-4" />
                        Create Cohort
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Cohort</DialogTitle>
                        <DialogDescription>
                            Create a new cohort. This will be the base for all your data.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py">
                        <div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    placeholder="e.g., 2024-2025"
                                    id="name"
                                    name="name"
                                    className="col-span-3"
                                    defaultValue={cohort.name}
                                    onBlur={handleChange}
                                    aria-invalid={!!errors.name}
                                />
                            </div>
                            <span className="text-sm text-destructive text-right block">{errors.name}</span>
                        </div>


                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startDate" className="text-right">Start Date</Label>
                            <DatePicker
                                name="startDate"
                                defaultValue={cohort.startDate}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="endDate" className="text-right">End Date</Label>
                            <DatePicker
                                name="endDate"
                                className="col-span-3"
                                defaultValue={cohort.endDate}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>

                            <Select
                                name="status"
                                defaultValue="ACTIVE"
                                className="col-span-3"
                                onValueChange={value => setCohort({ ...cohort, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectItem value="ACTIVE">
                                        <CirclePlay className="size-4 text-emerald-400" />
                                        Active
                                    </SelectItem>
                                    <SelectItem value="COMPLETED">
                                        <CheckCircle2 className="size-4 text-blue-400" />
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="CANCELED">
                                        <CircleX className="size-4 text-red-400" />
                                        Canceled
                                    </SelectItem>
                                    <SelectItem value="PENDING">
                                        <CirclePause className="size-4 text-amber-400" />
                                        Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={pending}>
                            {pending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating Cohort...
                                </>
                            ) : (
                                <>
                                    <Check className="size-4" />
                                    Create Cohort
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>

        </Dialog>
    )
}