interface Cohort {
    id: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELED" | "PENDING";
    startDate: string;
    endDate: string;
    name: string;
}

interface Mentor {
    id: string;
    name: string;
    expertise: string;
    avatarPath  : string;
    email: string;
    password: string;
    active: boolean;
}

interface Student {
    id: string;
    name: string;
    avatarPath: string;
    email: string;
    password: string;
    expertise: string;
    deliveryMode: "IN_PERSON" | "ONLINE";
    program: string;
    birthDate: string;
    cohort: Cohort;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatarPath: string;
}

