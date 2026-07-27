# Portfolio Setup Guide

A complete, beginner-friendly walkthrough for running, customizing, and
publishing this portfolio. Follow the sections in order the first time.

---

## 1. What's in this project

```
portfolio/
├── index.html              ← main portfolio page
├── resume.html              ← browser-viewable / printable resume
├── SETUP-GUIDE.md            ← this file
├── generate_resume_pdf.py    ← regenerates resume.pdf from your data
├── css/
│   └── style.css             ← all styling, colors, fonts, layout, animations
├── js/
│   └── script.js             ← theme toggle, network animation, typing effect,
│                                scroll reveal, mobile menu, contact form logic
└── assets/
    ├── images/
    │   ├── favicon.svg
    │   └── project-minigit.svg   ← swap for a real screenshot any time
    └── resume/
        └── resume.pdf         ← downloadable resume (matches resume.html)
```

Everything is plain HTML, CSS, and JavaScript — no build step, no npm
install required to run it.

### About the design

This version is themed around cybersecurity rather than a generic
template look:

- **Dark theme by default** (terminal / SOC-console style) with a
  **light theme toggle** (top-right button) for a cleaner "audit report"
  look — your choice is remembered on return visits.
- **Animated network-graph background** (`#netCanvas` in `index.html`,
  logic in `js/script.js`) — subtle moving nodes and connecting lines,
  drawn with plain Canvas, no external libraries or video files needed.
- **Typewriter effect** in the hero that cycles through your roles
  ("Cybersecurity Enthusiast", "Aspiring SOC Analyst", etc.) — edit the
  `roles` array in `js/script.js` to change them.
- **Scroll-reveal animations** — sections fade/slide in as you scroll,
  handled by the `.reveal` class and `IntersectionObserver` in
  `js/script.js`.
- All animations respect `prefers-reduced-motion` automatically for
  visitors who have that accessibility setting turned on.

---

## 2. Download and save the project

1. Save all the files above into one folder on your computer, keeping the
   same folder structure (e.g. `css/style.css` must stay inside a `css`
   folder next to `index.html`).
2. If you received this as a ZIP: right-click the ZIP file →
   **Extract All** (Windows) or double-click it (Mac) → choose a location
   like `Documents/portfolio`.
3. Confirm the structure matches section 1 above before continuing.

---

## 3. Open the project in VS Code

1. Install [Visual Studio Code](https://code.visualstudio.com/) if you
   don't have it.
2. Open VS Code → **File → Open Folder** → select your `portfolio` folder.
3. Recommended extensions (install from the Extensions panel, `Ctrl+Shift+X`
   / `Cmd+Shift+X`):
   - **Live Server** (by Ritwick Dey) — instantly preview the site with
     auto-refresh.
   - **Prettier** — keeps your code formatting consistent.
   - **Auto Rename Tag** — renames matching HTML tags together.

---

## 4. Preview the site locally with Live Server

1. With the Live Server extension installed, right-click `index.html` in
   VS Code's file explorer.
2. Select **"Open with Live Server."**
3. Your default browser opens automatically at an address like
   `http://127.0.0.1:5500/index.html`.
4. Any time you save a file, the page refreshes automatically — no manual
   reload needed.

If you'd rather not install an extension, you can also just double-click
`index.html` to open it directly in a browser, though a couple of features
(like relative links refreshing cleanly) work best through Live Server.

---

## 5. Where to edit your content

Open `index.html` and search (`Ctrl+F` / `Cmd+F`) for `EDIT:` — every
placeholder has a comment right above it explaining what to change.

| What to edit | File | Look for |
|---|---|---|
| Name, tagline, cycling role titles | `index.html` (tagline) / `js/script.js` (`roles` array) | `id="hero"` |
| About / bio text | `index.html` | `id="about"` |
| Skills list | `index.html` | `id="skills"`, inside `<ul class="chip-list">` |
| Projects | `index.html` | `id="projects"`, each `<article class="project-card">` |
| Education | `index.html` | `id="education"`, each `<li class="timeline__item">` |
| Certifications | `index.html` | `id="certifications"`, each `<li class="cert-list__item">` |
| Resume content | `resume.html` **and** `generate_resume_pdf.py` | see section 8 |
| Contact info | `index.html` | `id="contact"`, `.contact__direct` list |
| Social links (GitHub/LinkedIn) | `index.html` | `.hero__socials` near the top, and `.contact__direct` |
| GitHub/LinkedIn URLs are placeholders | search for `your-username` / `your-profile` | replace once your profiles exist |
| Images | `assets/images/` | replace `project-minigit.svg` with a real screenshot, same filename (or update the `src=` in `index.html`) |
| Colors, fonts, theme palettes | `css/style.css` | the `:root[data-theme="dark"]` and `:root[data-theme="light"]` blocks at the top |
| Default theme (dark vs light) | `index.html` | `<html data-theme="dark">` at the very top |

**To add a new project:** copy one entire `<article class="project-card">…</article>`
block (there's already a "next project in progress" placeholder card you
can replace), paste it, and edit its contents.

**To add a new certification:** copy one `<li class="cert-list__item">…</li>`
block inside `id="certifications"` and edit the text and status label.

**To add a new education entry:** copy one `<li class="timeline__item">…</li>`
block inside `id="education"` and edit the details.

---

## 6. Contact form setup (EmailJS)

The contact form uses [EmailJS](https://www.emailjs.com/) so it can send
real emails without a backend server.

### Create a free account
1. Go to emailjs.com and sign up for a free account.
2. Confirm your email address.

### Create an Email Service
1. In the EmailJS dashboard, go to **Email Services → Add New Service**.
2. Choose your email provider (Gmail, Outlook, etc.) and connect your
   account.
3. Copy the generated **Service ID**.

### Create an Email Template
1. Go to **Email Templates → Create New Template**.
2. Add variables matching the form fields already in `index.html`:
   `{{from_name}}`, `{{reply_to}}`, `{{message}}`.
   Example template body:
   ```
   New message from {{from_name}} ({{reply_to}}):

   {{message}}
   ```
3. Save, then copy the generated **Template ID**.

### Find your Public Key
1. Go to **Account → General**.
2. Copy your **Public Key**.

### Connect it to the project
Open `js/script.js` and replace the three placeholder values near the top:

```js
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // paste your Public Key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // paste your Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // paste your Template ID
```

Save the file.

### Test it
1. Open the site with Live Server.
2. Fill out the contact form and click **Send Message**.
3. Check the inbox connected to your Email Service — you should receive
   the message within a minute. EmailJS's free plan includes 200 emails
   per month, which is plenty for a portfolio site.

If the form shows *"Contact form isn't connected yet"*, it means the
placeholder keys haven't been replaced yet.

---

## 7. Social links

Your email, phone, WhatsApp, LinkedIn, and GitHub are all filled in now,
in both the hero icons and the Contact section of `index.html`.

**One thing to double-check:** the GitHub link you sent — `github.com/Khu`
— looks like it may have been cut short (GitHub usernames are usually
longer). If that's not your full username, search for `Khu` in
`index.html` and replace it with your correct GitHub URL.

---

## 8. Updating your resume

There are two resume files that should stay in sync:

- **`resume.html`** — the browser-viewable, printable version. Edit the
  text directly (look for `EDIT:` comments).
- **`assets/resume/resume.pdf`** — the downloadable PDF, generated from
  `generate_resume_pdf.py`.

To update the PDF after changing your resume content:
1. Open `generate_resume_pdf.py`.
2. Edit the text inside the `story.append(...)` lines to match your
   updated resume.
3. Run it from a terminal inside the project folder:
   ```bash
   pip install reportlab
   python3 generate_resume_pdf.py
   ```
4. This overwrites `assets/resume/resume.pdf` with your changes.

**If you'd rather not run Python:** open `resume.html` in your browser,
press `Ctrl+P` / `Cmd+P`, and choose **"Save as PDF"** as the destination.
Save it as `resume.pdf` inside `assets/resume/`, replacing the old file.

The **Download Resume** buttons on the homepage already point to
`assets/resume/resume.pdf`, so as long as you keep that filename, they'll
keep working automatically.

---

## 9. Publishing your site online

### Option A — GitHub Pages (recommended, free, easiest to keep updating)

1. Create a free account at [github.com](https://github.com) if you don't
   have one.
2. Create a new repository (e.g. `portfolio`) — keep it **Public**.
3. Upload your project files: on the repository page, click
   **Add file → Upload files**, drag in all your project files and
   folders, then **Commit changes**.
4. Go to the repository's **Settings → Pages**.
5. Under **Source**, choose the `main` branch and `/ (root)` folder, then
   **Save**.
6. After a minute, your public URL appears at the top of that page,
   typically `https://your-username.github.io/portfolio/`.
7. **To update later:** edit files directly on GitHub, or upload new
   versions the same way — the live site updates automatically within a
   minute or two.

### Option B — Netlify (drag-and-drop, free)

1. Create a free account at [netlify.com](https://netlify.com).
2. From the dashboard, go to **Sites** and drag your entire project
   folder onto the **"Drag and drop your site output folder here"** area.
3. Netlify uploads it and gives you a public URL like
   `https://random-name-123.netlify.app` within seconds.
4. You can rename the site (Site settings → Change site name) to get a
   nicer URL like `https://khushi-portfolio.netlify.app`.
5. **To update later:** drag the updated folder onto the same site's
   **Deploys** tab to publish a new version.

### Option C — Vercel (great for future upgrades, e.g. React)

1. Create a free account at [vercel.com](https://vercel.com), ideally by
   signing in with GitHub.
2. Push your project to a GitHub repository (see Option A, steps 1–3).
3. In Vercel, click **Add New → Project**, select your GitHub repository,
   and click **Deploy**.
4. Vercel gives you a public URL like
   `https://portfolio-your-username.vercel.app`.
5. **To update later:** push changes to the connected GitHub repository —
   Vercel redeploys automatically.

### Which one should you pick?

- **New to this / want the simplest path:** Netlify's drag-and-drop is
  the fastest way to get a live URL.
- **Want to also learn Git/GitHub (a valuable skill):** GitHub Pages.
- **Might rebuild this later with a framework like React/Next.js:**
  Vercel, since it's built for that from day one.

All three are free for a personal portfolio and support custom domains.

---

## 10. Connecting a custom domain (optional)

Once your site is live on any of the options above, you can point a
domain you own (e.g. `www.khushighorpade.com`) at it:

1. Buy a domain from a registrar (e.g. Namecheap, GoDaddy, Google Domains).
2. In your hosting provider's dashboard:
   - **GitHub Pages:** Settings → Pages → Custom domain → enter your
     domain, then add the DNS records GitHub shows you at your registrar.
   - **Netlify:** Site settings → Domain management → Add custom domain,
     then follow the DNS instructions shown.
   - **Vercel:** Project → Settings → Domains → Add, then follow the DNS
     instructions shown.
3. DNS changes can take anywhere from a few minutes to 24 hours to fully
   take effect.

---

## 11. Keeping the site easy to update

This project is structured so future updates don't require touching the
design:

- **New project?** Duplicate a `.project-card` block in `index.html`.
- **New certification, workshop, or achievement?** Duplicate a
  `.timeline__item` block in the Experience section.
- **New skill?** Add a `<li>` inside the relevant `<ul class="chip-list">`.
- **Resume update?** Edit `resume.html`, then regenerate `resume.pdf`
  (section 8).

Because layout and content are separated (HTML for content, CSS for
appearance), adding items never requires redesigning anything — the grid
and card styles automatically accommodate new entries.

---

## 12. Quick troubleshooting

| Problem | Likely cause |
|---|---|
| Page looks unstyled (no colors/fonts) | `css/style.css` isn't in the `css` folder next to `index.html`, or the folder structure got flattened during download/extraction. |
| Fonts look like a generic serif/sans-serif | No internet connection — this project loads Google Fonts online; it'll look fine once you're back online. |
| Download Resume button does nothing | Confirm `assets/resume/resume.pdf` exists and the filename matches exactly (case-sensitive on some hosts). |
| Contact form shows "isn't connected yet" | You haven't replaced the placeholder EmailJS keys in `js/script.js` (section 6). |
| Images don't show | Check the file is inside `assets/images/` and the filename in `index.html`'s `src="..."` matches exactly. |

---

That's everything you need to run, customize, and publish this portfolio.
Good luck! 🎉
