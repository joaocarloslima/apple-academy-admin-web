import { format } from "date-fns";
import { api } from "./api";

api.setPath("/cohort")

export async function getCohorts() {
    return await api.get("")
}

export async function createCohort(data: Cohort) {
    data.startDate = format(new Date(data.startDate), "yyyy-MM-dd");
    data.endDate = format(new Date(data.endDate), "yyyy-MM-dd");    

    return await api.post("", data)
}
    
    