# 🚀 Portfolio — Houyem Noomen

React + Vite portfolio · Deep blue & silver enterprise design
FR default · EN / AR (RTL) · Formspree contact · Resume download · Netlify CI/CD

---

## ⚡ Local development

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## 📁 How to update content (no coding needed)

### ➤ Update projects
Edit `src/data/projects.json`

Each project has:
| Field | Description |
|-------|-------------|
| `title` | Object with `fr`, `en`, `ar` keys |
| `description` | Object with `fr`, `en`, `ar` keys |
| `stack` | Array of tech strings |
| `impact` | Object with `fr`, `en`, `ar` keys |
| `previewUrl` | Live URL → enables Preview button opening in new tab |
| `githubUrl` | GitHub repo URL |
| `color` | `cyan` / `blue` / `indigo` / `silver` / `green` / `amber` |
| `icon` | Any emoji |

### ➤ Update experience
Edit `src/data/experience.json` — same multilingual structure.

### ➤ Add your resume
Place your PDF at `public/resume.pdf`
The download button in the Hero works automatically.

---

## 🌐 Free Hosting — Netlify (step by step)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "🚀 Portfolio launch"
# Create a repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/houyem-portfolio.git
git push -u origin main
```

### Step 2 — Deploy on Netlify (first time)
1. Go to **https://app.netlify.com** → Sign up free
2. Click **Add new site** → **Import an existing project** → **GitHub**
3. Authorize GitHub → select your repo
4. Build settings are auto-read from `netlify.toml` ✅
5. Click **Deploy site**
6. ✅ Live at `https://random-name.netlify.app`

**Custom subdomain (free):**
Site settings → Domain management → Options → Edit site name
→ e.g. `houyem-noomen.netlify.app`

### Step 3 — Set up CI/CD (auto-deploy on every push)

**Get your Netlify tokens:**
1. Netlify → avatar → **User settings** → **Applications** → **Personal access tokens** → **New token**
   → Copy it (save it, shown once!)
2. Netlify → your site → **Site configuration** → **General** → copy the **Site ID**

**Add secrets to GitHub:**
1. GitHub → your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** twice:
   - Name: `NETLIFY_AUTH_TOKEN` → Value: (your token)
   - Name: `NETLIFY_SITE_ID`    → Value: (your site ID)

### Step 4 — Done! 🎉
From now on:
```
git add . && git commit -m "update projects" && git push
```
→ GitHub Actions builds → deploys to Netlify → **live in ~60 seconds**

On Pull Requests: Netlify posts a **preview URL** in the PR comments automatically.

---

## ✉️ Formspree Setup (contact form → your inbox)

1. Go to **https://formspree.io** → free account (50 submissions/month)
2. Click **+ New Form** → name it "Portfolio Contact"
3. Copy your **Form ID** (e.g. `xpwzgkqr`)
4. Open `src/components/Contact.jsx` line ~10
5. Replace `YOUR_FORMSPREE_ID`:
   ```js
   const FORMSPREE_ID = 'xpwzgkqr'  // ← your real ID
   ```
6. Push → auto-deploys → every form submission (+ file attachment) arrives in `noomene.houyem@gmail.com`

---

## 🌍 Languages

| Code | Language | Direction |
|------|----------|-----------|
| `fr` | Français (default) | LTR |
| `en` | English | LTR |
| `ar` | العربية | RTL (auto) |

The page `dir` attribute switches automatically when Arabic is selected.

---

## 📂 Project structure

```
src/
├── components/
│   ├── Navbar.jsx      ← Language switcher
│   ├── Hero.jsx        ← Typewriter + stats
│   ├── Skills.jsx
│   ├── Experience.jsx  ← Expandable bullet cards
│   ├── Projects.jsx    ← Preview / GitHub buttons
│   ├── Education.jsx   ← + Organisations + Languages
│   ├── Contact.jsx     ← Formspree form + file upload
│   └── Footer.jsx
├── data/
│   ├── projects.json   ← ✏️  Edit to update projects
│   └── experience.json ← ✏️  Edit to update experience
├── i18n/
│   ├── fr.json         ← French translations
│   ├── en.json         ← English translations
│   └── ar.json         ← Arabic translations
└── styles.css          ← Deep blue/silver design tokens
public/
└── resume.pdf          ← ✏️  Place your CV here
```
