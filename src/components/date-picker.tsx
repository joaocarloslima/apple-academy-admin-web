"use client"

import * as React from "react"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  className?: string
}

export function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()
  const [inputValue, setInputValue] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [calendarMonth, setCalendarMonth] = React.useState<Date | undefined>(undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    const parsedDate = parse(value, "MM/dd/yyyy", new Date())
    if (isValid(parsedDate)) {
      setDate(parsedDate)
      setCalendarMonth(parsedDate)
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      setInputValue(format(selectedDate, "MM/dd/yyyy"))
      setCalendarMonth(selectedDate)
      setIsOpen(false)
    }
  }

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
            month={calendarMonth}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}