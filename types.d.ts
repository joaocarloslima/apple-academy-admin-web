interface Cohort {
    id: string;
    status: "active" | "completed" | "canceled" | "pending";
    startDate: string;
    endDate: string;
    name: string;
}
