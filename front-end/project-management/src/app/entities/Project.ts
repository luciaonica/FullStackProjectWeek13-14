import { Client } from "./Client";

export interface Project {
    projectId?: number,
    name: string,
    startDate: Date,
    endDate: Date,
    status: string,
    client: Client
}