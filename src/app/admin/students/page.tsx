import { getStudents } from "@/actions/student-actions"
import { DataTableStudents } from "./data-table"

export default async function StudentsPage() {
    const students = await getStudents()
    
    return (
        <>
            <h1 className="text-2xl font-bold">Students</h1>

            <DataTableStudents students={students} />
        </>

    )
}