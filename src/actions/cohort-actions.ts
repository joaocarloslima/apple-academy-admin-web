import { apiGet, apiPost, apiPut } from "./api"
const PATH = "/cohort"

export async function getCohorts() {
    return await apiGet(PATH)
}

export async function createCohort(data: Cohort) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return await apiPost(PATH, data)
}

export async function updateCohort(data: Cohort) {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return await apiPut(`${PATH}/${data.id}`, data)
}

