# Chump Family Fantasy Football League History

A Vite + React app containing league history through the 2025 season.

## Included

- Season Stats tab with 2021–2025 and an All-Time view
- Player/franchise history with sortable All-Time columns and an Exclude 2021 filter
- Champions & Chumps history
- All-Time Playoff Appearances
- No prize or money totals
- Responsive layout for desktop and mobile

## Run locally on Linux / Chromebook

Open a Linux terminal and run:

Extract the ZIP, open a terminal in the extracted `chump-family-ff-history` folder, then run:

```bash
npm install
npm run dev
```

Vite will print a local URL, normally:

```text
http://localhost:5173
```

Open that URL in Chrome.

## Put it on GitHub

From inside the project folder:

```bash
git init
git add .
git commit -m "Initial fantasy football history app"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Deploy with Vercel

Connect the GitHub repository to Vercel. Use these settings if Vercel does not detect them automatically:

- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Do not commit or upload `node_modules`, `dist`, `.vercel`, or `.env` files; they are already ignored by `.gitignore`.

## Editing names / aliases

All source league data lives near the top of `src/App.jsx`.

The `OWNER_ALIASES` object converts source names into the display names used throughout the app. For example:

```js
'G B': 'Jerry'
```

If any participant mapping needs to change, update that object only.

## Shared-team rule

For player history, every listed co-manager receives the full season's team stats. This lets each manager's history follow the team they managed in that season. The app does not split wins, losses, or points between co-managers.

## Franchise identity notes

- Beth and Matthew are separate All-Time entries for their individual 2021 teams. **Betthew** is a separate franchise entry covering only 2022–2025.
- Rick and Sharon remain separate players, including their shared 2021 team.
