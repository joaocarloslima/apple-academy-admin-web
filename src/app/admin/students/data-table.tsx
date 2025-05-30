"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle2, ChevronDown, CirclePause, CirclePlay, CircleX, Code, Copy, MoreHorizontal, Palette, Pencil, Plus, Square, Trash2 } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { StudentForm } from "./student-form"
import { toast } from "sonner"
import { apiDelete } from "@/actions/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const PATH = "/student"

interface DataTableStudentProps {
    students: Student[]
}

export function DataTableStudents({ students }: DataTableStudentProps) {
    const [data, setData] = React.useState<Student[]>(students)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [editing, setEditing] = React.useState<Student | null>(null)
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const columns = React.useMemo<ColumnDef<Student>[]>(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "avatarPath",
            header: "",
            cell: ({ row }) => {
                return (
                    <Avatar>
                        <AvatarImage src={row.getValue("avatarPath")} alt={row.getValue("name")} />
                        <AvatarFallback>ST</AvatarFallback>
                    </Avatar>
                )
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "expertise",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Expertise
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="lowercase flex items-center gap-1">
                    {row.getValue("expertise") === "DEVELOPER" && <Code className="size-4 text-emerald-400" />}
                    {row.getValue("expertise") === "DESIGNER" && <Palette className="size-4 text-blue-400" />}
                    
                    {row.getValue("expertise")}
                </div>
            ),
        },
        {
            id: "presences",
            header: "Presences",
            cell: ({ row }) => { return(
                 <div className="flex items-center justify-center">
                   <Square className="opacity-80 size-3 fill-emerald-500 text-emerald-500" />
                   <Square className="opacity-80 size-3 fill-emerald-500 text-emerald-500" />
                   <Square className="opacity-80 size-3 fill-red-500 text-red-500" />
                   <Square className="opacity-80 size-3 fill-emerald-500 text-emerald-500" />
                   <Square className="opacity-80 size-3 fill-amber-500 text-amber-500" />
                 </div>
            )}
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const student = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(student.id)}
                            >
                                <Copy className="size-4" />
                                Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(student.id)}>
                                <Trash2 className="size-4" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(student)}>
                                <Pencil className="size-4" />
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], [handleDelete]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    function add(newStudent: Student) {
        setData((prev) => [...prev, newStudent])
    }

    function handleDelete(id: string) {
        toast.promise(
            apiDelete(`${PATH}/${id}`),
            {
                loading: "Deleting student...",
                success: () => {
                    setData((prev) => prev.filter((item) => item.id !== id));
                    return "Student deleted successfully";
                },
                error: (error) => `Error deleting cohort. ${error}`,
            }
        );
    }

    function handleEdit(student: Student) {
        setEditing(student);
        setDialogOpen(true);
    }

    function handleAdd() {
        setEditing(null);
        setDialogOpen(true);
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4 space-x-2">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button onClick={handleAdd}>
                    <Plus className="size-4" />
                    Add Student
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <StudentForm
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                student={editing}
                onSuccess={(saved: Student) => {
                    setDialogOpen(false);

                    if (editing) {
                        setData((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
                    } else {
                        setData((prev) => [...prev, saved]);
                    }
                    setEditing(null);
                }}
            />
        </div>
    )
}
