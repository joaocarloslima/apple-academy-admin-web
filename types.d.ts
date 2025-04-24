interface Cohort {
    id: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELED" | "PENDING";
    startDate: string;
    endDate: string;
    name: string;
}
