# 📝 Todo List App (CRUD API)

A modern and responsive Todo List application built with:

- **Next.js (App Router)**
- **Prisma ORM**
- **Tailwind CSS**
- **REST API (CRUD)**

![Todo App Screenshot](./screencapture-localhost-3000-2025-06-01-01_23_10.png)

---

## 🚀 Features

- 📥 Add new tasks
- ✅ Mark tasks as done/undone
- 🗑️ Delete tasks
- 📦 Full backend using Prisma + Next.js API routes

---

## 🛠️ Technologies Used

| Tech             | Description                 |
| ---------------- | --------------------------- |
| **Next.js**      | React framework for SSR/SSG |
| **Prisma**       | Type-safe ORM for DB access |
| **Tailwind CSS** | Utility-first CSS framework |

---

# 1. Install dependencies

npm install

# 2. Set up the DB

npx prisma generate
npx prisma migrate dev --name init

# 3. Run the dev server

npm run dev
