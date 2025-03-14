/**
 * Klass för att representera en uppgift.
 */
import { Task as TaskType } from "./types";

export class Task implements TaskType {
    id: string;
    title: string;
    description: string;
    category: "UX" | "Frontend" | "Backend";
    status: "new" | "in progress" | "done";
    assigned: string | undefined;
    timestamp: Date;

    constructor(task: TaskType) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.category = task.category;
        this.status = task.status;
        this.assigned = task.assigned;
        this.timestamp = task.timestamp;
    }
}