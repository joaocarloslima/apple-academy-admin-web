"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
    defaultValue?: string
    value?: string
    onChange?: (value: string) => void
    name?: string
    className?: string
}

function safeFormat(date: Date | undefined, formatStr: string) {
    return date && isValid(date) ? format(date, formatStr) : "";
}

export function DatePicker({ defaultValue, onChange, name, className }: DatePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const initialDate = defaultValue ? parse(defaultValue, "yyyy-MM-dd", new Date()) : undefined;

    const [date, setDate] = React.useState<Date | undefined>(
        isValid(initialDate) ? initialDate : undefined
    );

    const [inputValue, setInputValue] = React.useState(
        safeFormat(initialDate, "yyyy-MM-dd")
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const val = e.target.value;
        const parsed = parse(val, "yyyy-MM-dd", new Date());
        setInputValue(val);
        if (isValid(parsed) && val.length === 10) {
            const iso = parsed.toISOString().slice(0, 10);
            setDate(parsed);
            onChange?.(iso);
        }
    };

    const handleDateSelect = (selected: Date | undefined) => {
        if (!selected) return;

        const safeDate = new Date(Date.UTC(selected.getFullYear(), selected.getMonth(), selected.getDate()));
        const iso = selected.toISOString().slice(0, 10);

        setDate(safeDate);
        setInputValue(iso);
        onChange?.(iso)
        setIsOpen(false);
    };

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Input
                type="text"
                placeholder="yyyy-MM-dd"
                value={inputValue}
                onChange={handleInputChange}
                className="w-[160px]"
            />
            <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline">
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                        defaultMonth={date ?? new Date()}
                        className="pointer-events-auto"
                    />
                </PopoverContent>
            </Popover>
            {name && <input type="hidden" name={name} value={inputValue} />}
        </div>
    );
}
