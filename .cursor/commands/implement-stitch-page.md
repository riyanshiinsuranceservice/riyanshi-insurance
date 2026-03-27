You are a **senior frontend architect** working on a **Next.js (App Router) project** called `sentinel_heritage`, following strict architecture, design system, and component reuse rules.

A local folder `stitch_design/` contains multiple subfolders:

- Each subfolder = one page design
- Each contains:
  - `index.html` (or HTML file)
  - preview image

A global design system exists in:

- `@stitch_design/sentinel_heritage/DESIGN.md`

A **shared component system** (Button, Header, Footer, Badge, Link, etc.) has already been created using:

- `shadcn/ui`
- `TailwindCSS`
- `class-variance-authority` (for variants)

⚠️ You MUST reuse and extend these shared components wherever possible. Do NOT rebuild them.

---

## 🎯 Your Goal

Implement **ONE selected page** from `stitch_design/` into the project using:

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui
- Existing shared components
- React Hook Form (if needed)
- Fully typed TypeScript

---

## 🧩 Step 1: Discover Pages

1. Scan `stitch_design/`
2. List all page folders
3. Exclude pages already implemented in `/app`
4. Output remaining pages as selectable options

---

## ❓ Step 2: Ask User

Ask:

> “Which page would you like to implement?”

Wait for user input.

---

## 📐 Step 3: Analyze Design

After selection:

1. Parse HTML structure
2. Identify:
   - Layout sections
   - UI components
   - Reusable patterns

3. Cross-check with `DESIGN.md`:
   - spacing
   - typography
   - colors
   - component usage

---

## 🔁 Step 3.5: Map to Existing Components (CRITICAL)

Before creating anything new:

1. Map UI elements to existing shared components:
   - Buttons → `Button`
   - Links → `Link`
   - Status → `Badge`
   - Layout → `Header`, `Footer`

2. If a component is close but not exact:
   - Extend via variants (CVA)

3. Only create new components if:
   - No existing component fits the need

---

## 🏗 Step 4: Architecture Rules

### App routes (single source of truth)

- **Never hardcode** internal URLs such as `"/en"`, `"/gu"`, or `` `/${lng}#contact` `` in components or pages.
- Import from **`@/routes`** instead:
  - **`ROUTE`** — resolved paths (e.g. `ROUTE.en.path`, `ROUTE.gu.path`) and **`ROUTE.hash`** for in-page fragments (`about`, `services`, `contact`).
  - **`localizedHref(lng, fragment?)`** — builds the correct locale home URL and optional hash (e.g. `localizedHref(lng, "contact")`).
- When you add a new page or anchor, extend **`src/routes/constants/api-routes.ts`** (`ROUTE_DEFINITIONS` and/or `ROUTE_HASH`), then use the updated **`ROUTE`** / **`localizedHref`** everywhere. Do not scatter path strings.

### Folder Structure (STRICT)

```
/app/...                → routing + page composition ONLY
/src/components/...    → ALL UI components
/src/routes/           → canonical paths (index exports ROUTE + helpers; utils + constants within)
```

Example:

```
/app/dashboard/page.tsx

/src/components/dashboard/
  ├── dashboard-page.tsx
  ├── stats-card.tsx
  ├── user-table.tsx
```

---

## 🧱 Component Rules

- Prefer **small, reusable components**
- Avoid duplication
- Use **composition**
- Keep files focused

### Shared closing CTA (mandatory)

- **Do not** add a new bottom-of-page CTA component per route or duplicate CTA copy in page-specific i18n files.
- **Do** reuse **`SiteFinalCta`** (`@/components/layout/site-final-cta`) for every marketing page that needs the Stitch-style trust-gradient band (same as the home page).
- **Strings:** always `home` namespace keys `finalCta.title`, `finalCta.description`, `finalCta.primary`, `finalCta.secondary` via `getT("home", { lng })`.
- **Links:** same as home—**`SITE_WHATSAPP_HREF`** for the primary action and **`SITE_CONSULT_TEL`** for the secondary action (from `@/lib/site-contact`). If a future page truly needs different targets, extend the shared component with optional props instead of forking markup.
- **Composition:** place `SiteFinalCta` at the end of the page’s `PageWrapper` (or equivalent); only wrap with `id="contact"` / `scroll-mt-*` when the page is the locale root and you need hash navigation to land on the band.

---

## ⚙️ Server vs Client

- Default = Server Components
- Use `"use client"` ONLY when necessary:
  - forms
  - local state
  - interactivity

⚠️ If needed:

- Isolate client logic into small subcomponents
- Do NOT convert entire page to client

---

## 📝 Forms

If present:

- Use `react-hook-form`
- Use `shadcn/ui` form components
- Use Zod for validation
- Fully typed

---

## 🧼 Code Quality Rules

### Required:

- Strict TypeScript (no `any`)
- Clear props interfaces
- Proper naming
- Reusable logic

### Avoid:

- Large monolithic files
- Mixing concerns
- Duplicating UI logic

---

## 📚 Documentation Rules

Each file must include:

- Short description (WHAT + WHY)
- Props explanation (if applicable)

Avoid over-commenting.

---

## ⚡ Performance

- Prefer Server Components
- Use `React.memo` when useful
- Extract constants
- Minimize re-renders

---

## 🧱 Step 5: Implementation Plan (MANDATORY)

Before coding:

1. Component breakdown
2. File structure
3. List reused shared components
4. Ask for confirmation

---

## 💻 Step 6: Code Generation

Generate:

- `/app/.../page.tsx` (composition only)
- `/src/components/...` (modular components)

Follow:

- Tailwind best practices
- shadcn patterns
- DESIGN.md strictly

---

## 🚫 Strict Rules

- ❌ No UI logic inside `/app`
- ❌ No rebuilding shared components
- ❌ No ignoring DESIGN.md
- ❌ No duplication
- ❌ No large components
- ❌ No hardcoded internal routes — use `@/routes` (`ROUTE`, `localizedHref`)
- ❌ No page-specific closing CTA components or duplicate CTA copy — use **`SiteFinalCta`** + **`home.finalCta`** + **`@/lib/site-contact`** (see **Shared closing CTA** above)

---

## ✅ Output Format

1. Page options
2. Wait for selection
3. Architecture plan
4. Code (file-by-file)
