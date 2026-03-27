You are working on a Next.js project (`sentinel_heritage`) that follows strict architecture and design rules.

A local folder named `stitch_design/` contains multiple subfolders.

* Each subfolder = one page design
* Each folder contains:

  * `index.html` (or HTML file)
  * preview image

Some pages may already be implemented in the project — DO NOT include them again.

---

## 🎯 Your Goal

Help implement ONE selected page from `stitch_design/` into the project using:

* Next.js (App Router)
* Tailwind CSS
* shadcn/ui
* React Hook Form (if forms exist)
* Fully typed (TypeScript)

---

## 🧩 Step 1: Discover Pages

1. Scan `stitch_design/`
2. List all available page folders
3. Exclude:

   * Pages already implemented in `/app`
4. Show remaining pages as selectable options

---

## ❓ Step 2: Ask User

Ask:

> "Which page would you like to implement?"

Wait for user input before proceeding.

---

## 📐 Step 3: Analyze Design

After user selects a page:

1. Parse HTML structure
2. Identify:

   * Layout sections
   * Components (header, cards, forms, etc.)
   * Reusable UI patterns
3. Check `DESIGN.md` from `sentinel_heritage`

   * Follow spacing, typography, color, and component rules strictly

---

## 🏗 Step 4: Architecture Rules

### Folder Structure (STRICT)

* `/app/...` → ONLY routing + page-level composition
* `/src/components/...` → ALL UI components

Example:

```
/app/dashboard/page.tsx
/src/components/dashboard/
  ├── dashboard-page.tsx
  ├── stats-card.tsx
  ├── user-table.tsx
```

---

### Component Rules

* Small, reusable components
* No large files
* Separate concerns properly
* Avoid duplication

---

### Server vs Client

* Default = Server Components
* Use `"use client"` ONLY when necessary:

  * forms
  * state
  * interactivity

---

### Forms

If forms exist:

* Use `react-hook-form`
* Use `shadcn/ui` form components
* Fully typed with Zod (if needed)

---

## 🧼 Code Quality Rules

### Must Have:

* Full TypeScript types
* Clean props interfaces
* No `any`
* Avoid using client component and only use if neccessary and if possible make seperate component that uses client to avoid making entire component client !important
* Proper naming conventions

---

### Documentation (IMPORTANT)

Each file should include:

* Short description (WHAT + WHY)
* Props explanation (if needed)

Avoid:

* Long unnecessary comments
* Over-explaining obvious code

---

### Performance

* Use `React.memo` where useful
* Extract constants
* Avoid re-renders
* Prefer server rendering

---

## 🧱 Step 5: Implementation Plan

Before writing code:

1. Show component breakdown
2. Show file structure
3. Ask for confirmation

---

## 💻 Step 6: Code Generation

Generate:

* Page route (`/app/...`)
* Components in `/src/components/...`
* Clean, modular files

Follow:

* Tailwind best practices
* shadcn patterns
* Consistent spacing/layout

---

## 🚫 Strict Rules

* DO NOT put UI code inside `/app` except page composition
* DO NOT create large monolithic components
* DO NOT ignore DESIGN.md
* DO NOT repeat code

---

## ✅ Output Format

1. Page options (initial step)
2. Wait for selection
3. Architecture plan
4. Code (modular, file-by-file)

---

## 🧠 Behavior Guidelines

* Be precise
* Ask before proceeding when needed
* Prefer clarity over cleverness
* Keep output clean and structured
