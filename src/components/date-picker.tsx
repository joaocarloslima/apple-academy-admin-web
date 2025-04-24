// components/date-picker.tsx
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
    defaultValue?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    name?: string;
    className?: string;
}

export function DatePicker({ defaultValue, onChange, name, className }: DatePickerProps) {
    const [date, setDate] = React.useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    );
    const [inputValue, setInputValue] = React.useState(
        defaultValue ? format(new Date(defaultValue), "MM/dd/yyyy") : ""
    );
    const [isOpen, setIsOpen] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        const parsedDate = parse(val, "MM/dd/yyyy", new Date());
        if (isValid(parsedDate)) {
            setDate(parsedDate);
            onChange?.(e);
        }
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            const formatted = format(selectedDate, "MM/dd/yyyy");
            setInputValue(formatted);
            onChange?.({
                target: {
                    name,
                    value: formatted,
                },
            } as React.ChangeEvent<HTMLInputElement>);
            setIsOpen(false);
        }
    };

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Input
                type="text"
                placeholder="MM/DD/YYYY"
                value={inputValue}
                onChange={handleInputChange}
                className="w-[200px]"
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
                        month={date}
                        className="pointer-events-auto"
                    />
                </PopoverContent>
            </Popover>
            {name && <input type="hidden" name={name} value={defaultValue} />}
        </div>
    );
}