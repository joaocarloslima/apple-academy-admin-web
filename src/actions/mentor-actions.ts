import {api} from "./api";

api.setPath("/mentor")

export async function getMentors(): Promise<Mentor[]> {
    return await api.get("")
}

export async function createMentor(mentor: Mentor) {
    return await api.post("", mentor);
}

export async function updateMentor(mentor: Mentor) {
    return await api.put(`/${mentor.id}`, mentor);
}

export async function toggleActiveMentor(mentor: Mentor) {
    return await api.patch(`/${mentor.id}/toggle-active`);
}