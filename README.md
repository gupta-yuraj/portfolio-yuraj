<<<<<<< HEAD
# Yuraj Gupta — Premium Portfolio (with Admin Panel + Supabase Backend)

A premium, animated personal-brand portfolio for **Yuraj Gupta** — plus a password-protected `/admin` panel backed by **Supabase** so every section of the site (profile, skills, projects, achievements, resume, contact messages…) can be edited without touching code.

## Tech Stack

- **React 19 + Vite** — frontend tooling
- **Tailwind CSS 3** — design system / styling
- **Framer Motion** — animations & scroll reveals
- **React Router DOM** — routes `/` (public site) and `/admin` (CMS)
- **React Icons** — icon set
- **Lenis** — smooth scrolling
- **Supabase** — Postgres database, Auth, and file storage (the "backend")
- **EmailJS** *(optional)* — extra email notification on top of the contact form

## How it fits together

```
Public site (/)  ──reads──▶  Supabase tables  ◀──writes──  Admin panel (/admin)
Contact form (/) ──inserts─▶ "messages" table  ◀──reads───  Admin → Messages
```

- **No Supabase configured?** The public site still works perfectly — every section falls back to the built-in content in `src/data/portfolioData.js`, and `/admin` shows a "not configured" notice instead of a login form.
- **Supabase configured?** The public site fetches live content on load (and auto-refreshes if the admin edits something elsewhere, via Supabase Realtime). The admin panel lets you edit everything and see it reflected instantly.

## 1. Frontend setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

## 2. Backend setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it. This creates every table (profile, certification, dashboard metrics, education, skills, projects, languages, attributes, achievements, messages), sets up Row Level Security so the public can only *read* content and *submit* messages while only a signed-in admin can write, creates a public `resume` storage bucket, and seeds it all with the site's default content.
3. Go to **Authentication → Users → Add user** and create your single admin account (any email + password you choose).
4. Copy your project's **Project Settings → API → Project URL** and **anon public key**.
5. In the project root, copy `.env.example` to `.env` and fill in:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ADMIN_EMAIL=the-email-you-created-in-step-3
   ```
6. Restart `npm run dev`. The site now reads/writes from Supabase.

> The admin login screen only asks for a **password** — it always signs in with the fixed `VITE_ADMIN_EMAIL` under the hood via Supabase Auth, so there's nothing extra to remember while still using real, secure sessions (not a hardcoded client-side password).

## 3. Using the admin panel

Go to `/admin`, enter the password you set in Supabase, and you'll see a sidebar with:

| Section | What it edits |
|---|---|
| Profile & Hero | Name, titles, contact info, objective, hero subtitle, typing speed, **resume PDF upload** |
| Hero Dashboard Metrics | The animated stat bars in the hero card |
| About — Counters | The animated counters under the About section |
| Education | Add/edit/delete timeline entries |
| Core Business Skills | The bento-grid skill cards |
| Accounting & Software Skills | TallyPrime / GST / Office cards |
| Academic Projects | Project cards |
| Certification | The certification card |
| Languages | Circular language proficiency cards |
| Personal Attributes | The attribute chips |
| Why Hire Me | The "why hire me" cards |
| Achievements | The stat grid |
| Messages | Every contact-form submission, with read/unread state and delete |

List-type sections (skills, projects, education, etc.) support add / edit / delete with drag-free ordering via an `order_index`; icons are chosen from a dropdown of the same icon set used on the live site (`src/lib/iconMap.js`).

## 4. Contact form → Messages

The public contact form validates client-side, then inserts directly into the `messages` table (RLS allows public **insert only** — nobody but the signed-in admin can read past submissions). They show up immediately under **Admin → Messages**, newest first, with an unread badge.

Optionally, you can *also* fire an EmailJS notification on submit: open `src/components/Contact.jsx` and replace the `YOUR_SERVICE_ID` / `YOUR_TEMPLATE_ID` / `YOUR_PUBLIC_KEY` placeholders with your own [EmailJS](https://www.emailjs.com/) credentials. This is optional — messages are saved to Supabase either way.
=======
# Yuraj Gupta — Premium Portfolio

A premium, animated personal-brand portfolio website for **Yuraj Gupta**, a Business Administration graduate focused on Operations & Business Development — built to feel like a modern SaaS product site (Apple / Stripe / Linear / Vercel inspired), not a resume.

## Tech Stack

- **React 19 + Vite** — fast dev/build tooling
- **Tailwind CSS 3** — utility-first styling with a custom design system
- **Framer Motion** — scroll reveals, staggered animations, page-load sequence
- **React Router DOM** — installed and ready for multi-page expansion
- **React Icons** — icon set (Feather / Material / BoxIcons)
- **Lenis** (`@studio-freight/lenis`) — buttery smooth scrolling
- **EmailJS** (`@emailjs/browser`) — contact form email delivery
- **Canvas API** — mouse-reactive particle background (no extra 3D dependency needed; Three.js can be added later if you want a 3D hero)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder, ready to deploy to Vercel, Netlify, GitHub Pages, or any static host.

### 4. Preview the production build locally

```bash
npm run preview
```

## Connecting the Contact Form (EmailJS)

The contact form is fully built (validation, states, glass UI) but needs your own EmailJS credentials to actually send mail:

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Create an Email Service and an Email Template.
3. Open `src/components/Contact.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   ```
   with the values from your EmailJS dashboard.

Until configured, submitting the form will show a friendly error state.

## Adding Your Resume

Place your resume PDF in `public/` and name it `Yuraj_Gupta_Resume.pdf` (a placeholder text file is included at that path to show where it goes — delete it once you add the real PDF). The **Download Resume** button in the hero section already links to `/Yuraj_Gupta_Resume.pdf`.
>>>>>>> 3e28ed9 (fix vercel deployment issue)

## Folder Structure

```
src/
<<<<<<< HEAD
  components/          Public-site sections & reusable UI (Hero, About, Skills, Contact, …)
  pages/
    PortfolioSite.jsx   Assembles all public sections
  admin/                The /admin CMS
    AdminApp.jsx          Switches between Login and Dashboard based on session
    AuthContext.jsx        Single-admin, password-only Supabase Auth
    Login.jsx
    Dashboard.jsx          Sidebar + section router
    ProfileEditor.jsx      Profile/hero fields + resume upload
    CertificationEditor.jsx
    SectionEditor.jsx      Generic add/edit/delete UI, driven by lib/sections.js
    Messages.jsx            Contact-form inbox
  context/
    PortfolioDataContext.jsx  Fetches Supabase content (or falls back to defaults) for the public site
  lib/
    supabaseClient.js       Supabase client (safely no-ops if unconfigured)
    api.js                   Generic Supabase table/storage helpers used by the admin panel
    sections.js              Declarative config: which tables the generic SectionEditor manages
    iconMap.js                String-key ⇄ icon-component registry shared by site + admin
  data/
    portfolioData.js         Static fallback content (used when Supabase isn't configured)
  hooks/, animations/, utils/, constants/   Reserved / smaller helpers
supabase/
  schema.sql               Full backend: tables, RLS policies, storage bucket, seed data
public/
  favicon.svg
.env.example               Supabase + admin env vars to copy into .env
```

## Design System

| Token | Value |
|---|---|
| Primary | `#0F172A` |
| Secondary | `#111827` |
| Accent | `#2563EB` |
| Highlight | `#60A5FA` |
| White | `#FFFFFF` |
| Headings | Poppins |
| Body | Inter |

## Notes

- Row Level Security is configured so that even with your `anon` key exposed in the frontend bundle (normal for Supabase), visitors can only ever *read* content and *submit* a message — never edit content or read other people's messages. Only a signed-in admin session can write.
- The public site and admin panel share the exact same icon registry (`src/lib/iconMap.js`), so any icon you can pick in the admin dropdown is guaranteed to render correctly on the live site.
- GSAP/Three.js were listed as optional in the original brief; all requested motion (particles, blobs, magnetic buttons, ripple, glow, parallax, scroll reveals) is achieved with Framer Motion + Canvas to keep the bundle lean. Both can be added later with `npm install gsap three` if you want a 3D hero.

---

Designed & developed with React, Tailwind CSS, and Supabase.
=======
  components/     All UI sections & reusable pieces
    Navbar.jsx
    Hero.jsx
    About.jsx
    Education.jsx
    Skills.jsx
    Projects.jsx
    Certification.jsx
    Languages.jsx
    Attributes.jsx
    WhyHireMe.jsx
    Achievements.jsx
    Contact.jsx
    Footer.jsx
    Loader.jsx
    Cursor.jsx
    Background.jsx
    ScrollProgress.jsx
    MagneticButton.jsx
    SectionHeading.jsx
  data/
    portfolioData.js   Single source of truth for all content (edit this to update copy)
  hooks/
    useLenis.js         Smooth-scroll setup
    useCountUp.js        Animated counters
  pages/               Reserved for future multi-page routes
  animations/          Reserved for shared motion variants
  utils/               Reserved for helper functions
  App.jsx
  main.jsx
  index.css            Design tokens, glassmorphism, cursor, shine, gradients
public/
  favicon.svg
  Yuraj_Gupta_Resume.pdf   ← add your real resume here
```

## Editing Content

Almost everything on the page — name, title, skills, projects, achievements, contact info — is centralized in **`src/data/portfolioData.js`**. Update that file and the whole site updates automatically; you shouldn't need to touch individual components for copy changes.

## Design System

| Token       | Value      |
|-------------|------------|
| Primary     | `#0F172A`  |
| Secondary   | `#111827`  |
| Accent      | `#2563EB`  |
| Highlight   | `#60A5FA`  |
| White       | `#FFFFFF`  |
| Headings    | Poppins    |
| Body        | Inter      |

## Features Implemented

- Sticky glass navbar with scroll-spy active link and mobile menu
- Animated loading screen
- Custom cursor (desktop only; falls back to native cursor on touch devices)
- Mouse-reactive particle background, gradient blobs, glassmorphism throughout
- Framer Motion scroll reveals on every section
- Animated hero "business dashboard" card with progress bars
- Animated counters (About section)
- Vertical education timeline
- Bento-grid business skills + interactive software/GST skill cards
- Academic project cards
- Certification card with shine/shimmer sweep animation
- Animated circular language proficiency indicators
- Personal attribute & "Why Hire Me" glass cards with hover glow
- Achievements stat grid
- Contact form with client-side validation, EmailJS integration point, and an embedded map
- Magnetic buttons with ripple click effect
- Scroll progress indicator
- Fully responsive (mobile, tablet, laptop, desktop)
- Respects `prefers-reduced-motion`

## Notes on "Optional" Libraries

The original brief listed GSAP and Three.js as optional. This build achieves all requested motion (page load, scroll reveals, hover/glow, magnetic buttons, particles, parallax blobs) using **Framer Motion + Canvas**, keeping the bundle lean. If you'd like a 3D hero element or GSAP-driven scroll choreography layered on top, both libraries can be added with `npm install gsap three` and wired into `Hero.jsx` / `Background.jsx`.

---

Designed & developed with React + Tailwind CSS.
>>>>>>> 3e28ed9 (fix vercel deployment issue)
