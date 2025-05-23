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

interface User {
    id: string;
    name: string;
    email: string;
    avatarPath: string;
}
