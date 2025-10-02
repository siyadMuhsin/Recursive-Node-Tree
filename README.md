# 🌳 Recursive Node Tree App

A **full-stack single-page application (SPA)** to manage hierarchical data in a **recursive tree structure**.  
This project demonstrates **frontend, backend, and database skills**, focusing on **Repository architecture, recursion, and user-friendly interactions**.  

---

## 🎯 Project Objective

The goal of this project is to assess **full-stack skills** in:  

- Frontend development: **React + TypeScript**  
- Backend development: **Node.js + Express + Repository Pattern + InversifyJS**  
- Database management: **MongoDB**  

The application allows users to create, view, and delete nodes in a **recursive tree structure** with persistent storage.  

---

## 🛠 Features

### 1. Node Creation
- Create nodes with any name.  
- Support multiple root nodes.  
- Each node can have multiple child nodes.  
- Infinite nesting of child nodes.

### 2. Recursive Structure
- Display all nodes in a tree-like UI using recursion.  
- Each node has a toggle/expand/collapse button.  
- Nodes are collapsed by default and expand on click.  
- Child nodes follow the same behavior recursively.

### 3. Delete Functionality
- Each node has a Delete button.  
- Deleting a node removes it and all its descendant nodes recursively.

### 4. Additional Features
- Persistent tree structure in the database.  
- Simple and intuitive UI for adding nodes.  
- Reusable components: `Spinner`, `ConfirmModal`, `TreeNode`.  
- Error handling and loading states for better UX.  

---

## 🏗 Tech Stack

### Frontend
- React + TypeScript  
- TailwindCSS  
- Axios (for API calls)  
- React Toastify (notifications)

### Backend
- Node.js + Express  
- MongoDB + Mongoose  
- Repository Pattern for clean DB access  
- Dependency Injection using InversifyJS  
- Validation & duplicate node checks  

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Custom domain support  

---

Screenshorts
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/94a8db3a-3c05-4ece-a543-f82dfaa3d7bd" />



🌐 Deployment
Frontend: Vercel (npm run build → dist/)

Backend: Render (Node.js + MongoDB)


🏆 Deliverables
GitHub repository: https://github.com/siyadMuhsin/Recursive-Node-Tree

Live demo URL: https://recursive-node-tree-nine.vercel.app/

