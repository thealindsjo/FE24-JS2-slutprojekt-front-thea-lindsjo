/**
 * Huvudfil som hanterar formulärinlämningar, medlemslistor och uppgiftslistor.
 *
 * Denna fil initierar formulärhantering för att lägga till uppgifter och medlemmar,
 * samt renderar listor över medlemmar och uppgifter genom att interagera med API:et.
 */
import { addTask, addMember, getMembers } from "./modules/api";
import { loadTasks } from "./modules/ui";
import { Member } from "./modules/Members";

const addTaskForm = document.querySelector('#addTaskForm') as HTMLFormElement;
const addMemberForm = document.querySelector('#addMemberForm') as HTMLFormElement;
const memberList = document.querySelector('#memberList') as HTMLUListElement;

/**
 * Renderar medlemslistan genom att hämta medlemmar från API:et och skapa listelement.
 *
 * Denna funktion rensar den befintliga medlemslistan, hämtar medlemmar från API:et,
 * skapar Member-instanser och lägger till dem i en lista i användargränssnittet.
 */
async function renderMemberList() {
    memberList.innerHTML = '';
    try {
        const members = await getMembers();
        members.forEach(memberData => {
            const member = new Member(memberData);
            const listItem = document.createElement('li');
            listItem.textContent = `${member.name} (${member.roles.join(', ')})`;
            memberList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Fel vid hämtning av medlemmar:", error);
    }
}

/**
 * Visar ett felmeddelande i användargränssnittet.
 *
 * Denna funktion visar ett felmeddelande i en div med id "errorMessage" och döljer det efter 10 sekunder.
 */
function showError(message: string) {
    const errorDiv = document.getElementById("errorMessage") as HTMLDivElement;
    errorDiv.textContent = message;
    errorDiv.style.display = "block";

    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 10000);
}

/**
 * Hanterar inlämning av formuläret för att lägga till en ny uppgift.
 *
 * Denna händelsehanterare samlar in formulärdata, validerar den och skickar en POST-förfrågan
 * till API:et för att lägga till en ny uppgift.
 */
addTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addTaskForm);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as "UX" | "Frontend" | "Backend";

    if (!title || !title.trim()) {
        showError("Titel måste anges.");
        return;
    }

    if (!description || !description.trim()) {
        showError("Beskrivning måste anges.");
        return;
    }

    if (!category) {
        showError("Kategori måste väljas.");
        return;
    }

    try {
        await addTask({
            timestamp: new Date(),
            title: title,
            description: description,
            category: category,
            status: "new",
            assigned: undefined
        });
        addTaskForm.reset();
        loadTasks();
    } catch (error) {
        showError("Ett fel uppstod vid skapandet av uppgiften. Försök igen.");
        console.error("Fel vid skapande av uppgift:", error);
    }
});

/**
 * Hanterar inlämning av formuläret för att lägga till en ny medlem.
 *
 * Denna händelsehanterare samlar in formulärdata, validerar den och skickar en POST-förfrågan
 * till API:et för att lägga till en ny medlem.
 */
addMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addMemberForm);
    const name = formData.get("name") as string;
    const roles = formData.getAll("roles") as ("UX" | "Frontend" | "Backend")[];

    if (!name.trim()) {
        showError("Namnet får inte vara tomt.");
        return;
    }

    if (roles.length === 0) {
        showError("Minst en roll måste väljas.");
        return;
    }

    try {
        await addMember({ name, roles });
        addMemberForm.reset();
        renderMemberList();
    } catch (error) {
        showError("Ett fel uppstod vid skapandet av medlemmen. Försök igen.");
        console.error("Fel vid skapande av medlem:", error);
    }
});

loadTasks();
renderMemberList();