import { getCohorts } from "@/actions/cohort-actions";
import { DataTableCohorts } from "./data-table";

export default async function DashboardPage() {
    const cohorts = await getCohorts()
    return (
        <>
            <h1 className="text-2xl font-bold">Cohorts</h1>
            <DataTableCohorts cohorts={cohorts}/>
        </>

    )
}