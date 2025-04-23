import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, CirclePause, CirclePlay, CircleX, Plus } from "lucide-react"

export function CohortFormCreate() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
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
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            placeholder="ex. 2024-2025"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startDate" className="text-right">
                            Start Date
                        </Label>
                        <DatePicker className="col-span-3"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endDate" className="text-right">
                            End Date
                        </Label>
                        <DatePicker className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup defaultValue={"ACTIVE"}>
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
                                        Pending
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
