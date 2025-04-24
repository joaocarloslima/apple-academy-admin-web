import { format } from "date-fns";
import { api } from "./api";
import { redirect } from "next/navigation";

const cohortApi = api.extend((options) => ({ prefixUrl: `${options.prefixUrl}/cohort` }));

export async function getCohorts() {
    const json = await cohortApi.get("").json<Cohort[]>()
    return json
}

export async function createCohort(data: Cohort) {
    data.startDate = format(new Date(data.startDate), "yyyy-MM-dd");
    data.endDate = format(new Date(data.endDate), "yyyy-MM-dd");    

    const response = await fetch("http://localhost:8080/cohort", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {

        if (response.status === 400) {
            const error = await response.json()
            console.error("Error creating cohort", error)
        }
        
    }

    return await response.json()
}
    
    