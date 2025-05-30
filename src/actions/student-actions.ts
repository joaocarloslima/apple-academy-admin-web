import { apiGet, apiPost, apiPut } from "./api";

const PATH = "/student";

export async function getStudents(): Promise<Student[]> {
    return await apiGet(PATH);
}

export async function createStudent(student: Student) {
    //mocky data for MVP
    const data = {
        ...student,
        password: "123456",
        cohort: {
            id: "e723c7fe-a46a-415d-bdb3-f711dbe71f56"
        },
        birthDate: "2000-01-01",
        deliveryMode: "IN_PERSON",
        program: "BCC"
    }
    return await apiPost(PATH, data);
}

export async function updateStudent(student: Student) {
    return await apiPut(`${PATH}/${student.id}`, student);
}
