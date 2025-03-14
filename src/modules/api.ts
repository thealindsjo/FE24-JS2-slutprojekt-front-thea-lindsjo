/**
 * API-interaktionsfil som hanterar hämtning och manipulation av uppgifter och medlemmar.
 *
 * Denna fil innehåller funktioner för att hämta, lägga till, uppdatera och ta bort uppgifter,
 * samt hämta och lägga till medlemmar via ett REST API.
 */
import { Task, Member } from "./types";

const url = 'https://fe24-js2-slutprojekt-back-thea-lindsjo.onrender.com';

export async function getTasks(): Promise<Task[]> {
    const res = await fetch(`${url}/tasks`);
    return await res.json();
}

export async function addTask(task: Omit<Task, 'id'>) {
    await fetch(`${url}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
}

export async function updateTask(id: string, task: Task) {
    await fetch(`${url}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
}

export async function deleteTask(id: string) {
    await fetch(`${url}/tasks/${id}`, { method: 'DELETE' });
}

export async function getMembers(): Promise<Member[]> {
    const res = await fetch(`${url}/members`);
    return await res.json();
}

export async function addMember(member: Omit<Member, 'id'>) {
    await fetch(`${url}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
    });
}