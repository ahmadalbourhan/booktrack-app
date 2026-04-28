# Contribution Guide

This document explains how to collaborate on the **Book Track Application** project.  
We keep `main` clean, use `docs/*` branches for documentation, and work together on `develop`.

---

## 🎯 Why We Work on `develop`

- **Main stays clean:**  
  `main` is reserved for stable, production-ready code. By keeping it untouched, we ensure deployments or references to `main` are always safe and reliable.

- **Collaborative sandbox:**  
  `develop` is our shared development branch. Everyone contributes here, so we can integrate features, fixes, and experiments without risking the stability of `main`.

- **Organized workflow:**  
  Documentation lives in `docs/*` branches, while features and fixes branch off from `develop`. This separation keeps responsibilities clear:
  - `main` → clean and stable
  - `docs/*` → documentation only
  - `develop` → active development and collaboration

- **Easy merging later:**  
  Once the project is complete and tested, we merge `develop` into `main` in one controlled step.

---

## 🚀 Starting from Scratch

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmadalbourhan/booktrack-app
   cd booktrack-app
   ```

2. **Checkout the collaborative branch**

   ```bash
   git fetch origin
   git checkout develop
   ```

3. **Install dependencies (example for Next.js)**
   ```bash
   npm install
   npm run dev
   ```

---

## 👥 For Existing Clones

1. **Update your local repo**

   ```bash
   git fetch origin
   ```

2. **Switch to the collaborative branch**
   ```bash
   git checkout develop
   git pull origin develop
   ```

---

## 📌 Daily Workflow

### 1. Stay up to date

Always work on `develop` and keep it synced:

```bash
git checkout develop
git pull origin develop
```

### 2. Create a feature branch

- Always branch **from `develop`**.
- Use clear naming conventions:
  - `feature/<short-description>` → new features
  - `fix/<short-description>` → bug fixes
  - `docs/<short-description>` → documentation updates

Example:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/add-login-page
```

### 3. Make changes

```bash
git add .
git commit -m "feat: add login page with form validation"
```

### 4. Push your branch

```bash
git push origin feature/add-login-page
```

### 5. Merge your branch

- **Option A: Pull Request (recommended)**
  - Go to GitHub.
  - Open a Pull Request from your branch → `develop`.
  - Request review and merge after approval.

- **Option B: CLI merge (for small fixes)**
  ```bash
  git checkout develop
  git pull origin develop
  git merge feature/add-login-page
  git push origin develop
  ```

### 6. Tell others to stay up to date

After merging, teammates should run:

```bash
git checkout develop
git pull origin develop
```

---

## 🧹 Branch Policy

- `main` → always clean, production-ready.
- `docs/*` → documentation updates only.
- `develop` → active development branch for all collaborators.
- `feature/*` and `fix/*` → temporary branches for specific tasks, merged back into `develop`.

---

## 🛠️ Essential Git Commands (with caution)

### Check status

```bash
git status
```

- Shows current branch, staged changes, and untracked files.
- Use often to avoid mistakes.

### List branches

```bash
git branch -vv
```

- Lists local branches and their tracking info.

```bash
git branch -r
```

- Lists remote branches.

### Delete a branch (⚠️ careful!)

```bash
git branch -d branch-name
```

- Safe delete (only if merged).

```bash
git branch -D branch-name
```

- Force delete (⚠️ can lose work).

```bash
git push origin --delete branch-name
```

- Deletes branch from remote.

**When to delete:**

- After merging a feature/fix branch back into `develop`.
- To clean up stale or unused branches.
- Never delete `main` or `develop`.

---

## ✅ Tips

- Run `git fetch --prune` regularly to clean up stale branches.
- Communicate before renaming or deleting branches.
- Use clear commit messages (`feat:`, `fix:`, `docs:`).
- Prefer Pull Requests for visibility and review.

---

## ⚔️ Conflict Resolution

Merge conflicts happen when two branches change the same part of a file differently. Here’s how to resolve them:

### 1. Detect the conflict

After a merge or pull, Git will warn you:

```
CONFLICT (content): Merge conflict in <file>
```

Run:

```bash
git status
```

to see which files are conflicted.

### 2. Open the conflicted file

Conflicted sections look like this:

```text
<<<<<<< HEAD
your changes
=======
incoming changes
>>>>>>> branch-name
```

### 3. Decide what to keep

- Edit the file manually.
- Keep your changes, the incoming changes, or combine them.
- Remove the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

### 4. Mark conflict as resolved

```bash
git add <file>
```

### 5. Complete the merge

```bash
git commit
```

Git will create a merge commit noting the resolution.

### 6. Push the resolved branch

```bash
git push origin develop
```

---

## 🧭 Best Practices

- Communicate with teammates before resolving — make sure you agree on the correct version.
- Resolve conflicts **locally** before pushing.
- Keep commits small and focused to reduce conflict risk.
- Pull frequently (`git pull origin develop`) to stay up to date.

---
