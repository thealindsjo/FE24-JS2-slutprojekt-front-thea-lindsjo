/**
 * Modul för att hantera användargränssnittet för uppgifter.
 *
 * Denna modul innehåller funktioner för att ladda, rendera och uppdatera uppgifter i UI,
 * samt hantera filtrering och sortering av uppgifter.
 */
import { Task as TaskType} from "./types";
import { getTasks, updateTask, deleteTask, getMembers } from "./api";
import { getFilteredAndSortedTasks } from "./sortFilter";
import { Task } from "./Tasks";
import { Member } from "./Members";

//Returnerar en färgkod till bakgrundsfärgen på uppgifterna baserat på uppgiftens kategori.
function getCategoryColor(category: string): string {
    switch (category) {
        case "UX":
            return "#aae3f2";
        case "Frontend":
            return "#ffeb99";
        case "Backend":
            return "#eacbff";
        default:
            return "#f5cba7";
    }
}

export async function loadTasks() {
    const tasks = await getTasks();
    updateTaskDisplay(tasks);
}

async function renderTask(taskData: TaskType) {
    const task = new Task(taskData); 
    const taskElement = document.createElement("div");
    taskElement.className = "task";

    taskElement.style.backgroundColor = getCategoryColor(task.category);

    let assignedMemberName = "";
    // Kontrollerar om uppgiften är tilldelad en medlem
    if (task.assigned) {
        try {
            const members = await getMembers();
            const assignedMember = members.find(member => member.id === task.assigned);
            assignedMemberName = assignedMember ? assignedMember.name : "Okänd medlem";
        } catch (error) {
            console.error("Fel vid hämtning av medlemmar:", error);
            assignedMemberName = "Fel vid hämtning";
        }
    }

    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Kategori: ${task.category}</p>
        <p>Skapad: ${new Date(task.timestamp).toLocaleString()}</p>
        ${task.assigned ? `<p>Tilldelad: ${assignedMemberName}</p>` : ""}
    `;

    // Hanterar olika statusar för uppgiften och skapar relevanta knappar
    if (task.status === "new") {
        const assignButton = document.createElement("button");
        assignButton.innerText = "Tilldela";
        assignButton.onclick = async () => {
            const members = await getMembers();
            const memberSelect = document.createElement("select");

            members.forEach(memberData => {
                const member = new Member(memberData); 
                if (member.roles.includes(task.category)) {
                    const option = document.createElement("option");
                    option.value = member.id;
                    option.innerText = member.name;
                    memberSelect.appendChild(option);
                }
            });

            const confirmButton = document.createElement("button");
            confirmButton.innerText = "Bekräfta";
            confirmButton.onclick = async () => {
                task.assigned = memberSelect.value;
                task.status = "in progress";
                await updateTask(task.id, task);
                loadTasks();
            };

            taskElement.appendChild(memberSelect);
            taskElement.appendChild(confirmButton);
        };
        taskElement.appendChild(assignButton);
    } else if (task.status === "in progress") {
        const doneButton = document.createElement("button");
        doneButton.innerText = "Klar";
        doneButton.onclick = async () => {
            task.status = "done";
            await updateTask(task.id, task);
            loadTasks();
        };
        taskElement.appendChild(doneButton);
    } else {
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Ta bort";
        deleteButton.onclick = async () => {
            await deleteTask(task.id);
            loadTasks();
        };
        taskElement.appendChild(deleteButton);
    }

    return taskElement;
}

async function updateTaskDisplay(tasks: TaskType[]) {
    const newTasksContainer = document.querySelector("#newTasks") as HTMLDivElement;
    const inProgressTasksContainer = document.querySelector("#inProgressTasks") as HTMLDivElement;
    const doneTasksContainer = document.querySelector("#doneTasks") as HTMLDivElement;

    newTasksContainer.innerHTML = "<h2>Nya</h2>";
    inProgressTasksContainer.innerHTML = "<h2>Pågående</h2>";
    doneTasksContainer.innerHTML = "<h2>Klara</h2>";

    await Promise.all(tasks.map(async task => {
        const taskElement = await renderTask(task);
        if (task.status === "new") {
            newTasksContainer.appendChild(taskElement);
        } else if (task.status === "in progress") {
            inProgressTasksContainer.appendChild(taskElement);
        } else {
            doneTasksContainer.appendChild(taskElement);
        }
    }));
}

async function applyFiltersAndSort() {
    const filterMember = (document.querySelector("#filterMember") as HTMLSelectElement).value;
    const filterCategory = (document.querySelector("#filterCategory") as HTMLSelectElement).value;
    const sortBy = (document.querySelector("#sortSelect") as HTMLSelectElement).value; 

    const tasks = await getFilteredAndSortedTasks(filterMember, filterCategory, sortBy);
    updateTaskDisplay(tasks);
}

async function setupFilteringAndSorting() {
    const filterMember = document.querySelector("#filterMember") as HTMLSelectElement;
    const filterCategory = document.querySelector("#filterCategory") as HTMLSelectElement;
    const sortSelect = document.querySelector("#sortSelect") as HTMLSelectElement;

    const members = await getMembers();
    filterMember.innerHTML = '<option value="">Alla medlemmar</option>';
    members.forEach(memberData => {
        const member = new Member(memberData);
        const option = document.createElement("option");
        option.value = member.id;
        option.innerText = member.name;
        filterMember.appendChild(option);
    });

    sortSelect.innerHTML = `
        <option value="">Ingen sortering</option>
        <option value="timestamp-asc">Äldst först</option>
        <option value="timestamp-desc">Nyast först</option>
        <option value="title-asc">A-Ö</option>
        <option value="title-desc">Ö-A</option>
    `;

    filterMember.addEventListener("change", applyFiltersAndSort);
    filterCategory.addEventListener("change", applyFiltersAndSort);
    sortSelect.addEventListener("change", applyFiltersAndSort);
}

setupFilteringAndSorting();