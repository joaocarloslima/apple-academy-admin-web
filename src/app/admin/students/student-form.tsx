"use client";

import { createCohort, updateCohort } from "@/actions/cohort-actions";
import { createStudent, updateStudent } from "@/actions/student-actions";
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
    Code2,
    Loader2,
    Palette
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const initialState = {
    name: "",
    email: "",
    avatarPath: "",
    expertise: "",
};

const initialErrors = {
    name: "",
    email: "",
    avatarPath: ""
};

interface StudentFormProps {
    onSuccess: (student: Student) => void;
    student?: Student | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function StudentForm({ onSuccess, student, open, onOpenChange }: StudentFormProps) {
    const [pending, setPending] = useState(false);
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
        
        if (student) {
            setForm({
                name: student.name,
                email: student.email,
                avatarPath: student.avatarPath,
                expertise: student.expertise
            });
        } else {
            setForm(initialState);
        }
    }, [student]);

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
            student === null? createStudent(form as Student): updateStudent({ ...form, id: student?.id } as Student),
            {
                loading: student ? "Updating student..." : "Creating student...",
                success: (response) => {
                    onSuccess(response);
                    onOpenChange(false);
                    return student ? "Student updated successfully" : "Student created successfully";
                },
                error: (errors) => {
                    setErrors(errors);
                    return "Error submitting student.";
                },
                finally: () => setPending(false),
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{student ? "Edit Student" : "Create Student"}</DialogTitle>
                    <DialogDescription>
                        {student ? "Update student data." : "Add a new student to selected cohort"}
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

                    <div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">E-mail</Label>
                            <Input
                                placeholder="email@sp.senac.br"
                                id="email"
                                name="email"
                                type="email"
                                className="col-span-3"
                                value={form.email}
                                onChange={handleChange}
                                aria-invalid={!!errors.email}
                            />
                        </div>
                        <span className="text-sm text-destructive text-right block">{errors.email}</span>
                    </div>

                    <div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="avatarPath" className="text-right">Avatar Path</Label>
                            <Input
                                id="avatarPath"
                                name="avatarPath"
                                type="email"
                                className="col-span-3"
                                value={form.avatarPath}
                                onChange={handleChange}
                                aria-invalid={!!errors.avatarPath}
                            />
                        </div>
                        <span className="text-sm text-destructive text-right block">{errors.avatarPath}</span>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expertise" className="text-right">Expertise</Label>
                        <Select
                            value={form.expertise}
                            onValueChange={(value) => setForm({ ...form, expertise: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a expertise" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DEVELOPER">
                                    <Code2 className="size-4 text-emerald-400" /> Developer
                                </SelectItem>
                                <SelectItem value="DESIGNER">
                                    <Palette className="size-4 text-blue-400" /> Desinger
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
                                {student ? "Updating..." : "Creating..."}
                            </>
                        ) : (
                            <>
                                <Check className="size-4" />
                                {student ? "Update Student" : "Add Student"}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
