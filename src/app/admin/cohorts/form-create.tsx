"use client";

import { createCohort, updateCohort } from "@/actions/cohort-actions";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Check,
    CheckCircle2,
    CirclePause,
    CirclePlay,
    CircleX,
    Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
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
    onSuccess: (cohort: Cohort) => void;
    cohort?: Cohort | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CohortFormCreate({ onSuccess, cohort, open, onOpenChange }: CohortFormCreateProps) {
    const [pending, setPending] = useState(false);
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
        console.log("CohortFormCreate useEffect", cohort);
        if (cohort) {
            setForm({
                name: cohort.name,
                startDate: cohort.startDate,
                endDate: cohort.endDate,
                status: cohort.status,
            });
        } else {
            setForm(initialState);
        }
    }, [cohort]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleDateChange(name: string, value: string) {
        console.log("handleDateChange", name, value);
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        setPending(true);
        toast.promise(
            cohort === null? createCohort(form as Cohort): updateCohort({ ...form, id: cohort?.id } as Cohort),
            {
                loading: cohort ? "Updating cohort..." : "Creating cohort...",
                success: (response) => {
                    onSuccess(response);
                    onOpenChange(false);
                    return cohort ? "Cohort updated successfully" : "Cohort created successfully";
                },
                error: (errors) => {
                    setErrors(errors);
                    return "Error submitting cohort.";
                },
                finally: () => setPending(false),
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{cohort ? "Edit Cohort" : "Create Cohort"}</DialogTitle>
                    <DialogDescription>
                        {cohort ? "Update cohort data." : "Create a new cohort. This will be the base for all your data."}
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
                                value={form.name}
                                onChange={handleChange}
                                aria-invalid={!!errors.name}
                            />
                        </div>
                        <span className="text-sm text-destructive text-right block">{errors.name}</span>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">Start Date</Label>
                        <DatePicker
                            name="startDate"
                            defaultValue={form.startDate}
                            onChange={(e) => handleDateChange("startDate", e)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">End Date</Label>
                        <DatePicker
                            name="endDate"
                            defaultValue={form.endDate}
                            onChange={(e) => handleDateChange("endDate", e)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select
                            value={form.status}
                            onValueChange={(value) => setForm({ ...form, status: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ACTIVE">
                                    <CirclePlay className="size-4 text-emerald-400" /> Active
                                </SelectItem>
                                <SelectItem value="COMPLETED">
                                    <CheckCircle2 className="size-4 text-blue-400" /> Completed
                                </SelectItem>
                                <SelectItem value="CANCELED">
                                    <CircleX className="size-4 text-red-400" /> Canceled
                                </SelectItem>
                                <SelectItem value="PENDING">
                                    <CirclePause className="size-4 text-amber-400" /> Pending
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                {cohort ? "Updating..." : "Creating Cohort..."}
                            </>
                        ) : (
                            <>
                                <Check className="size-4" />
                                {cohort ? "Update Cohort" : "Create Cohort"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
