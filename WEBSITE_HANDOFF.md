# Website Handoff (1-Page)

Quick build guide for recreating this portfolio fast.

## Quick Edit Map (2 minutes)
- **Hero name + subtitle:** `index.html` in `#profile` (`.title`, `#typing-text` source in `script.js`)
- **Resume button file:** `index.html` button `window.open('./assets/...pdf')`
- **About summary + metrics line:** `index.html` in `#about` (`.text-container`, `.hero-metrics`)
- **Impact numbers:** `index.html` in `#achievements` (`data-target` values + labels)
- **Experience cards:** `index.html` in `#experience` (`.experience-date`, `.exp-bullets`)
- **Skills cards:** `index.html` in `#skills`
- **Projects (title/image/link):** `index.html` in `#projects` (`.project-card`, image path, GitHub URL)
- **Theme colors:** `style.css` in `:root` and `[data-theme=\"dark\"]`
- **Mobile layout fixes:** `mediaqueries.css`
- **Typing words:** `script.js` array inside `initTypingAnimation()`

## Stack
- Static site: `index.html`, `style.css`, `mediaqueries.css`, `script.js`
- No framework, no build tools
- Font: Google `Poppins`

## Required files
- `index.html`
- `style.css`
- `mediaqueries.css`
- `script.js`
- `assets/` images + `Marium_Ashraf_Resume_.pdf`

## Page sections (order)
1. `#profile` Hero
2. `#about`
3. `#certifications`
4. `#achievements`
5. `#experience`
6. `#skills`
7. `#analysis-delivery`
8. `#projects`
9. `#contact`
10. Footer

## Navigation
- Desktop nav: links to all section IDs + theme toggle
- Mobile nav: hamburger menu with same links + theme toggle
- Links are anchor-based (`href="#section-id"`)

## Theme system
Use CSS variables in `:root` and `[data-theme="dark"]`:
- `--bg-color`
- `--text-color`
- `--text-secondary`
- `--border-color`
- `--card-bg`
- `--hover-color`

All UI should reference these vars for dark-mode compatibility.

## Key UI components
- **Scroll progress bar**: `#scroll-progress` (fixed top, width updates on scroll)
- **Cards**: `.details-container` (rounded bordered blocks)
- **Hero social buttons**: `.social-icon-link` (circular white background for visibility)
- **Achievements cards**: `.achievement-card` + animated numbers
- **Project badges**: `.metric-badge`
- **Tech stack row**: `.tech-stack` with emoji icons
- **Experience bullets**: `.exp-bullets`
- **Contact form**: `#contact-form`

## Interactions (JS)
Implemented in `script.js`:
- `toggleMenu()` / `closeMenu()`
- `toggleTheme()` + `localStorage` persistence
- Scroll reveal animations via `IntersectionObserver`
- Achievement count-up animation
- Hero typing animation (`#typing-text`)
- Scroll progress bar updates on window scroll
- Contact form submits via `mailto:` and shows temporary toast

## Responsive rules
- `<=1200px`: hide desktop nav, show hamburger nav, hide arrow icons
- `<=600px`: single-column layout, smaller type/icons, contact stack
- Skills/experience grids collapse to 1 column on mobile

## Assets used in HTML
- `assets/profile-pic.png`
- `assets/about-pic.png`
- `assets/experience.png`
- `assets/education.png`
- `assets/linkedin.png`
- `assets/github.png`
- `assets/email.png`
- `assets/arrow.png`
- `assets/project-1.png`
- `assets/dashboard.png`
- `assets/project-3.png`
- `assets/project-4.png`
- `assets/Marium_Ashraf_Resume_.pdf`

## Content style guide (current)
- Keep copy short and scannable
- Metrics first
- Use compact bullets for experience
- Use short blurbs + one-line details in projects

## Run / test
- Open `index.html` directly in browser
- Test:
  - Desktop + mobile nav
  - Theme toggle + persistence
  - Arrow section jumps
  - Contact form mailto
  - Animations + counters

## Deploy
- Any static host (GitHub Pages / Netlify / Vercel static)
- Ensure all `assets/` files are committed
