/**
 * Typdefinitioner för uppgifter och medlemmar.
 */
export type Task = {
    id: string;
    title: string;
    description: string;
    category: "UX" | "Frontend" | "Backend";
    status: "new" | "in progress" | "done";
    assigned: string | undefined;
    timestamp: Date;
};

export type Member = {
    id: string;
    name: string;
    roles: ("UX" | "Frontend" | "Backend")[];
};