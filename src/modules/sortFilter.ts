/**
 * Modul för att filtrera och sortera uppgifter baserat på olika kriterier.
 *
 * Denna modul inehåller funktioner för att filtrera uppgifter baserat på medlem och kategori,
 * samt sortera uppgifter baserat på timestamp och titel.
 */
import { Task } from "./types";
import { getTasks } from "./api";

export function filterTasks(tasks: Task[], memberId: string, category: string): Task[] {
    return tasks.filter(task => {
        const matchesMember = memberId ? task.assigned === memberId : true;
        const matchesCategory = category ? task.category === category : true;
        return matchesMember && matchesCategory;
    });
}

export function sortTasks(tasks: Task[], sortBy: string): Task[] {
    return tasks.sort((a, b) => {
        const [sortField, order] = sortBy.split('-');

        if (sortField === "timestamp") {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return order === "asc" ? timeA - timeB : timeB - timeA;
        } else if (sortField === "title") {
            return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        return 0;
    });
}

export async function getFilteredAndSortedTasks(memberId: string, category: string, sortBy: string) {
    let tasks = await getTasks();
    tasks = filterTasks(tasks, memberId, category);
    tasks = sortTasks(tasks, sortBy);
    return tasks;
}