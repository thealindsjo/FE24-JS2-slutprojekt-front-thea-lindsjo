# **Scrum Board**
## **Description**
This project is a web-based **Scrum Board** application designed to manage tasks and team members efficiently. Users can add members, create tasks, assign them to team members, and move tasks through different stages: **New**, **In Progress**, and **Done**. The application provides filtering and sorting options to help users organize and track progress effectively.


### **Features**
- **Add Members:** Register team members and assign roles (**UX**, **Frontend**, **Backend**).
- **Create Tasks**: Define tasks with a **title**, **description**, and **category**.
- **Assign Tasks**: Allocate tasks to specific team members based on their roles.
- **Task Management**: Move tasks through different workflow stages (**New → In Progress → Done**).
- **Filtering & Sorting**: Filter tasks by **member or category** and sort them by **date or title**.

---

## **Technologies**
- **TypeScript**: Used for writing structured and scalable code.

- **HTML & CSS**: Frontend interface design and styling.

- **Fetch API**: Uses a backend API.

---


## **Project Structure**
### **Frontend**
- **`index.html`**: The main HTML structure of the Scrum Board.
- **`css/style.css`**: Styling for the application layout and design.
- **`main.ts`**: Handles event listeners and overall functionality.

### **Modules**
- **`api.ts`**: Handles API requests (fetching, adding, updating, and deleting tasks and members).
- **`sortFilter.ts`**: Manages task sorting and filtering logic.
- **`ui.ts`**: Responsible for rendering and updating UI elements dynamically.
- **`types.ts`**: Defines TypeScript types for tasks and members.
- **`Task.ts`**: Class representing a Task object.
- **`Members.ts`**: Class representing a Member object.

---

## **How to Use the Project**
- **Add Members**: Enter a name and select roles, then click **"Add"**.
  
- **Create a Task**: Provide a title, description, and category, then click **"Add"**.
  
- **Assign Tasks**: Move tasks to **"In Progress"** by assigning them to a member.

- **Mark as Done**: Move tasks to **"Done"** when completed.

-**Filter & Sort**: Use the dropdown menus to **filter tasks by member or category** and **sort them by date or title**.

