import { apiGet, apiPatch, apiPost, apiPut } from "./api";


const PATH = "/mentor";

export async function getMentors(): Promise<Mentor[]> {
    return await apiGet(PATH);
}

export async function createMentor(mentor: Mentor) {
    return await apiPost(PATH, mentor);
}

export async function updateMentor(mentor: Mentor) {
    return await apiPut(`${PATH}/${mentor.id}`, mentor);
}

export async function toggleActiveMentor(mentor: Mentor) {
    return await apiPatch(`${PATH}/${mentor.id}/`, {});
}