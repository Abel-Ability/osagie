# Prompt: Dr. Abel U. Osagie Portfolio

Create a complete personal academic and professional portfolio website for **Dr. Abel U. Osagie** — a Lecturer, Geophysicist, GIS Specialist, Researcher, Consultant, and Software Developer at the University of Abuja, Nigeria.

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** JavaScript (JSX)
- **Styling:** Tailwind CSS (v3) with CSS variables for theming
- **Animation:** Framer Motion
- **Routing:** React Router v6
- **UI Library:** shadcn/ui components (Radix primitives)
- **Icons:** Lucide React
- **Package Manager:** pnpm
- **Fonts:** Inter (body), Plus Jakarta Sans (heading), Playfair Display (display), JetBrains Mono (mono) via Google Fonts

## Project Structure

```
/
├── index.html                    # Entry HTML with dark mode script, meta tags
├── vite.config.js                # Vite config with @ alias, base path from env
├── tailwind.config.js            # Tailwind with custom colors (gold, navy), fonts, animations
├── postcss.config.js
├── eslint.config.js
├── jsconfig.json                 # Path alias config
├── components.json               # shadcn/ui config
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml           # allowBuilds for core-js, esbuild
├── wrangler.jsonc                # Cloudflare Workers config (static assets)
├── .gitignore
├── AGENTS.md                     # AI agent instructions
├── README.md
├── PROMPT.md
├── public/
└── src/
    ├── main.jsx                  # App entry point
    ├── App.jsx                   # Router setup with basename from import.meta.env.BASE_URL
    ├── index.css                 # Tailwind directives + CSS variables (gold, navy, etc.)
    ├── api/                      # API service files
    ├── hooks/
    │   ├── useTheme.js           # Dark/light theme toggle hook
    │   ├── useScrollReveal.js    # Intersection observer hook
    │   ├── useAnimatedCounter.js # Animated number counter hook
    │   └── use-mobile.jsx        # Mobile detection hook
    ├── lib/
    │   ├── utils.js              # cn() utility with tailwind-merge
    │   ├── query-client.js       # TanStack Query client
    │   └── publications-data.js  # Publications data
    ├── utils/
    │   └── index.ts
    ├── pages/
    │   ├── Home.jsx              # Composes HeroSection, StatsBar, Featured*, CTABanner
    │   ├── About.jsx
    │   ├── Publications.jsx
    │   ├── Gallery.jsx
    │   ├── Software.jsx
    │   ├── Services.jsx
    │   ├── Training.jsx
    │   ├── Blog.jsx
    │   ├── Payment.jsx           # Stripe integration
    │   └── Contact.jsx           # Contact form with react-hook-form + zod
    ├── components/
    │   ├── ScrollToTop.jsx       # Scrolls to top on route change
    │   ├── layout/
    │   │   ├── Header.jsx        # Fixed header with nav links, theme toggle, Hire Me button
    │   │   ├── Footer.jsx        # Social links (LinkedIn, ResearchGate, Google Scholar, ORCID)
    │   │   ├── SiteLayout.jsx    # Header + Outlet + Footer + HireMeModal
    │   │   ├── HireMeModal.jsx   # Dialog with prefill service
    │   │   └── ThemeToggle.jsx   # Dark/light mode toggle with next-themes
    │   ├── home/
    │   │   ├── HeroSection.jsx   # Profile photo, name, animated typewriter titles, university badge
    │   │   ├── StatsBar.jsx      # Animated stats counters
    │   │   ├── FeaturedPublications.jsx
    │   │   ├── FeaturedGallery.jsx
    │   │   ├── ServicesOverview.jsx
    │   │   ├── FeaturedSoftware.jsx
    │   │   └── CTABanner.jsx
    │   ├── shared/
    │   │   ├── SectionHeading.jsx
    │   │   └── AcademicProfileLinks.jsx
    │   └── ui/                   # shadcn/ui components (button, card, dialog, etc.)
    └── index.css
```

## Key Features

### 1. Hero Section
- Profile photo (Google Drive hosted)
- Animated entrance (Framer Motion)
- Name "Dr. Abel U. OSAGIE" (large heading)
- Typewriter effect cycling through titles: Lecturer, Geophysicist, GIS Specialist, Researcher, Consultant, Software Developer, Trainer
- "University of Abuja, Nigeria" badge
- CTA buttons: View Publications, Explore Gallery, View Services, Contact Me

### 2. Dark Mode
- Default dark (class added to html on load)
- Toggle via ThemeToggle component
- persisted with next-themes
- Gold accent (#hsl(42, 100%, 58%)) and navy colors

### 3. Routing (React Router v6)
- basename from `import.meta.env.BASE_URL` for subpath deployment
- Routes: /, /about, /publications, /gallery, /software, /services, /training, /blog, /payment, /contact
- SiteLayout wraps all routes with Header + Footer

### 4. Header
- Fixed position, transparent → solid on scroll
- Desktop nav with all route links + active state highlighting
- Mobile hamburger menu
- Theme toggle + "Hire Me" button

### 5. Home Page Sections
- **StatsBar** — Animated counters showing years of experience, publications, projects, etc.
- **FeaturedPublications** — Recent publications cards
- **FeaturedGallery** — GIS gallery preview
- **ServicesOverview** — Professional services cards
- **FeaturedSoftware** — Software projects
- **CTABanner** — Call-to-action section

### 6. Footer
- Social links (LinkedIn, ResearchGate, Google Scholar, ORCID)
- Capacity Building and Support (CBS) branding

### 7. Theme / Styling
- CSS variables for colors (--gold, --navy, --background, --foreground, etc.)
- dark mode via .dark class
- Fonts: heading (Plus Jakarta Sans), body (Inter), display (Playfair Display), mono (JetBrains Mono)
- Animations: fade-up, fade-in, count-up, accordion
- Gold accent color throughout

## Configuration Files Needed

### vite.config.js
- React plugin, @ alias, base from VITE_BASE_PATH env

### tailwind.config.js
- darkMode: "class"
- Custom colors: gold (#hsl(42, 100%, 58%)), navy (#hsl(222, 47%, 11%))
- Font families for heading, body, display, mono
- Custom animations: fade-up, fade-in, count-up

### postcss.config.js
- tailwindcss + autoprefixer

### wrangler.jsonc
- name: "abel"
- assets.directory: "./dist"
- assets.not_found_handling: "single-page-application"
- compatibility_flags: ["nodejs_compat"]

### pnpm-workspace.yaml
```yaml
packages:
  - "."
allowBuilds:
  core-js: true
  esbuild: true
```

## GitHub Actions Workflows

### .github/workflows/deploy.yml — Cloudflare Workers
- Trigger: push to main
- Steps: checkout, pnpm setup, node 22, install, build, npx wrangler deploy
- Env: CLOUDFLARE_API_TOKEN from secrets

### .github/workflows/deploy-github-pages.yml — GitHub Pages
- Trigger: push to main
- Permissions: pages write, id-token write
- Steps: checkout, pnpm setup, node 22, install, build (with VITE_BASE_PATH=/osagie/), configure-pages, upload-pages-artifact, deploy-pages

## Build Script
```json
"build": "vite build && node -e \"require('fs').copyFileSync('dist/index.html', 'dist/404.html')\""
```

## Deployment URLs
- **Cloudflare Workers:** https://abel.osagie.workers.dev
- **GitHub Pages:** https://abel-ability.github.io/osagie/
