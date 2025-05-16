"use client";

import { createCohort, updateCohort } from "@/actions/cohort-actions";
import { createMentor, updateMentor } from "@/actions/mentor-actions";
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
    Briefcase,
    Check,
    CheckCircle2,
    CirclePause,
    CirclePlay,
    CircleX,
    Code,
    Loader2,
    Palette
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
    name: "",
    email: "",
    expertise: "",
    password: "",
    avatarPath: "",
};

const initialErrors = {
    name: "",
    email: "",
    expertise: "",
    password: "",
    avatarPath: "",
};

interface MentorFormCreateProps {
    onSuccess: (mentor: Mentor) => void;
    mentor?: Mentor | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MentorForm({ onSuccess, mentor, open, onOpenChange }: MentorFormCreateProps) {
    const [pending, setPending] = useState(false);
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
        
        if (mentor) {
            setForm({
                name: mentor.name,
                email: mentor.email,
                expertise: mentor.expertise,
                password: mentor.password,
                avatarPath: mentor.avatarPath,
            });
        } else {
            setForm(initialState);
        }
    }, [mentor]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        setPending(true);
        toast.promise(
            mentor === null? createMentor(form as Mentor): updateMentor({ ...form, id: mentor?.id } as Mentor),
            {
                loading: mentor ? "Updating mentor..." : "Creating mentor...",
                success: (response) => {
                    onSuccess(response);
                    onOpenChange(false);
                    return mentor ? "Mentor updated successfully" : "Mentor created successfully";
                },
                error: (errors) => {
                    setErrors(errors);
                    return "Error submitting mentor.";
                },
                finally: () => setPending(false),
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{mentor ? "Edit Mentor" : "Create Mentor"}</DialogTitle>
                    <DialogDescription>
                        {mentor ? "Update mentor data." : "Create a new mentor user."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py">
                    <div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
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
                        <Label htmlFor="email" className="text-right">E-mail</Label>
                        <Input
                            placeholder="e.g., mentor@sp.senac.br"
                            id="email"
                            name="email"
                            className="col-span-3"
                            value={form.email}
                            onChange={handleChange}
                            aria-invalid={!!errors.email}
                            autoComplete="new-email"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            className="col-span-3"
                            value={form.password}
                            onChange={handleChange}
                            aria-invalid={!!errors.password}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expertise" className="text-right">Expertise</Label>
                        <Select
                            value={form.expertise}
                            onValueChange={(value) => setForm({ ...form, expertise: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an expertise" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DEVELOPER">
                                    <Code className="size-4 text-emerald-400" /> Developer
                                </SelectItem>
                                <SelectItem value="DESIGNER">
                                    <Palette className="size-4 text-blue-400" /> Designer
                                </SelectItem>
                                <SelectItem value="BUSINESS">
                                    <Briefcase className="size-4 text-red-400" /> Business
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="avatarPath" className="text-right">Avatar URL</Label>
                        <Input
                            id="avatarPath"
                            name="avatarPath"
                            className="col-span-3"
                            value={form.avatarPath}
                            onChange={handleChange}
                            aria-invalid={!!errors.avatarPath}
                        />
                        <span className="text-sm text-destructive text-right block">{errors.avatarPath}</span>
                    </div>

                    
                </div>

                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={pending}>
                        {pending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                {mentor ? "Updating..." : "Creating Mentor..."}
                            </>
                        ) : (
                            <>
                                <Check className="size-4" />
                                {mentor ? "Update Mentor" : "Create Mentor"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
