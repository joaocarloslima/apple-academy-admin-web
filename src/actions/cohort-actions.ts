import { format } from "date-fns";
import { api } from "./api";

api.setPath("/cohort")

export async function getCohorts() {
    return await api.get("")
}

export async function createCohort(data: Cohort) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return await api.post("", data)
}

export async function updateCohort(data: Cohort) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return await api.put(`/${data.id}`, data)
}
    
    