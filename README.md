# Commencement CMS

A MEN stack app for managing commencement awardees.

## Step Log

### Step 1 - Project Setup
- Created the Commencement CMS project folder and starter MVC structure.
- Installed core dependencies for Express, MongoDB, EJS, sessions, and auth.
- Added `.gitignore` to protect secret files and keep the repo clean.

**Why:** A clean foundation makes the rest of the app faster and safer to build.

**Engineering principle:** Separation of concerns (MVC) + clean project structure.

## Commit Prefix Cheat Sheet

We use **Conventional Commits** to keep the Git history clean and easy to understand.

Format:

type: short description

Example:
feat: add awardee CRUD routes

---

| Prefix | What it means (simple) | When to use it | Example for this project |
|------|------|------|------|
| feat | New functionality | When you add a new feature | `feat: implement session-based authentication` |
| fix | Fixing a bug | Something was broken and now works | `fix: prevent unauthorized awardee edits` |
| docs | Documentation only | README updates or explanations | `docs: add README with setup and deployment instructions` |
| style | Visual changes | CSS, layout, UI tweaks | `style: add responsive layout for admin dashboard` |
| refactor | Code cleanup | Improve code without changing behavior | `refactor: simplify awardee controller logic` |
| chore | Project setup / maintenance | config, dependencies, environment | `chore: initialize express server and project scaffold` |
| test | Tests added or updated | adding or fixing automated tests | `test: add user authentication tests` |

---

## Real Examples For This Project

feat: implement session-based authentication  
feat: add awardee CRUD routes and controllers  
feat: render awardees on public landing page  
fix: prevent unauthorized awardee edits  
style: add responsive layout for admin dashboard  
docs: add README with setup and deployment instructions  
chore: initialize express server and project scaffold  

---

## Why This Matters

Clean commits help developers quickly understand:

• what changed  
• why it changed  
• when it changed  

This is a **professional engineering practice used in real production teams.**

### Step 2 - EJS Rendering Setup
- Enabled EJS as the view engine.
- Added reusable head and nav partials.
- Rendered the landing page from `views/index.ejs`.
- Added starter CSS from the public folder.

**Why:** This changed the app from plain text responses to real webpages.

**Engineering principle:** Reusability with partials and separation of concerns.

### Step 3 - MongoDB Connection
- Added MongoDB connection using Mongoose.
- Stored database URI inside `.env`.
- Confirmed connection with a console log.

**Why:** Enables persistent data storage for Users and Awardees.

**Engineering principle:** Environment configuration and database abstraction.