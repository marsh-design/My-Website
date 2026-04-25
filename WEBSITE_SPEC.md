# Portfolio website — full spec & recreation guide

Single-page personal portfolio for **Marium Ashraf**. Static HTML/CSS/JS (no build step). Dark/light theme, smooth scroll, animated counters, typing hero, contact form via `mailto:`.

---

## 1. File structure

```
my-website/
├── index.html          # All sections, content, structure
├── style.css           # Global styles, components, themes
├── mediaqueries.css    # Responsive overrides (loads after style.css)
├── script.js           # Theme, menu, animations, form, counters, typing, scroll bar
├── WEBSITE_SPEC.md     # This document
└── assets/
    ├── Marium_Ashraf_Resume_.pdf   # Resume (download button)
    ├── profile-pic.png             # Hero headshot
    ├── about-pic.png               # About section photo
    ├── experience.png              # Small icon, About summary card
    ├── education.png               # Small icon, About summary card
    ├── linkedin.png                # Social + contact
    ├── github.png                  # Social
    ├── email.png                   # Contact
    ├── arrow.png                   # Section-to-section navigation (desktop)
    ├── project-1.png               # CapsuleOS card
    ├── dashboard.png               # FastAPI observability card
    ├── project-3.png               # Finance dashboard card
    └── project-4.png               # Robo Advisor card
```

**Head (`index.html`):**

- Charset, viewport, X-UA-Compatible  
- `meta description`, `meta keywords`  
- `<title>Marium Ashraf — Strategy, Data & Delivery</title>`  
- Stylesheets: `style.css` then `mediaqueries.css`  
- Script: `script.js` at end of `<body>`

---

## 2. Visual design system

### Typography

- **Font:** [Google Fonts — Poppins](https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap)  
- Weights used: 300, 400, 500, 600  
- **Primary headings (`.title`):** `3rem`, centered  
- **Section eyebrow (`.section__text__p1`):** smaller label above main title, centered  
- **Body / cards:** `Poppins`, secondary color for paragraphs

### Color tokens (CSS variables)

Defined on `:root` (light) and `[data-theme="dark"]`:

| Token | Light | Dark |
|--------|--------|------|
| `--bg-color` | `#ffffff` | `#1a1a1a` |
| `--text-color` | `#000000` | `#ffffff` |
| `--text-secondary` | `rgb(85, 85, 85)` | `#b3b3b3` |
| `--border-color` | `rgb(163, 163, 163)` | `#404040` |
| `--card-bg` | `rgb(250, 250, 250)` | `#2a2a2a` |
| `--hover-color` | `rgb(53, 53, 53)` | `#ffffff` |

All major surfaces (body, cards, borders, buttons) should use these variables so dark mode works.

### Layout patterns

- **Sections (`section`):** Top padding `4vh`, min-height `fit-content`, horizontal margin `0 10rem` (narrower on tablet/mobile via media queries).  
- **Cards (`.details-container`):** Rounded (`2rem`), border `0.1rem solid`, background `var(--card-bg)`.  
- **Project cards:** Add `.color-container` for slightly different background.  
- **Grids:**  
  - **Skills:** `.about-containers.skills-four` → CSS Grid `repeat(2, 1fr)`  
  - **Experience:** `.about-containers.experience-grid` → same  
  - **Achievements:** `.achievements-container` → `repeat(3, 1fr)` desktop, `1fr` mobile  
- **Profile hero:** Flex row, large circular image container (~400×400), text column centered.

### Components (high level)

| Component | Purpose |
|-----------|---------|
| `#scroll-progress` | Fixed 4px bar at top; width = scroll % of page |
| `#desktop-nav` / `#hamburger-nav` | Desktop: logo + links + theme. Mobile: hamburger + slide menu |
| `.theme-toggle` | Circle button; moon (light mode) / sun (dark mode) |
| `.btn-color-1` / `.btn-color-2` | Primary/secondary CTA; use variables for contrast in both themes |
| `.social-icon-link` | Circular light background behind LinkedIn/GitHub icons on hero |
| `.achievement-card` | Icon + animated number + `%` or `+` + label + short description |
| `.certification-card` | Featured card can have stronger border (`.featured`) |
| `.project-metrics` | Pill badges (`.metric-badge`) |
| `.tech-stack` | Emoji “tech icons” with `title` tooltips |
| `.exp-bullets` | Left-aligned `<ul>` under each job for scannable bullets |
| `.section-intro` | Centered intro paragraph under section title (Analysis & Delivery) |
| `.hero-metrics` | One line of key metrics under About copy |
| `.contact-container` | Two columns: info + `mailto` form |

### Motion

- **Links / buttons:** `transition: all 300ms ease`  
- **Sections / cards:** IntersectionObserver — fade in + `translateY` when visible  
- **Achievement numbers:** Count up from 0 to `data-target` over ~2s when section enters viewport  
- **Hero typing:** Cycles through 4 short strings; type → pause → delete → next  
- **Scroll progress:** Updates `width` on `scroll` (no debounce required for simplicity)

---

## 3. Page flow (top → bottom)

Anchor order matches nav:

1. **`#profile`** — Hero  
2. **`#about`** — About Me  
3. **`#certifications`** — Certifications  
4. **`#achievements`** — At a glance (metrics)  
5. **`#experience`** — Roles  
6. **`#skills`** — Skills & tools  
7. **`#analysis-delivery`** — Analysis & Delivery  
8. **`#projects`** — Projects  
9. **`#contact`** — Contact  

**Arrows:** Each section (except last) has a bottom-right `.icon.arrow` image that `onclick` scrolls to the **next** section’s id (desktop only; arrows hidden &lt;1200px).

---

## 4. Section-by-section content model

Recreate the **structure** and swap copy for your own brand.

### Hero (`#profile`)

- Left: profile image in `.section__pic-container`  
- Right: “Hello, I’m”, name as `<h1 class="title">`, **typing line** in `#typing-text` + `.typing-cursor` (blinking `|`)  
- Buttons: Download Resume (opens PDF), Contact Info (`#contact`)  
- Social: LinkedIn + GitHub in `.social-icon-link` circles  

### About (`#about`)

- Title “About Me”, eyebrow “Overview”  
- Two small cards: Experience summary, Education summary  
- `.text-container`: 3 blocks — value prop, `.hero-metrics` line, stack/tools line  

### Certifications (`#certifications`)

- Two cards: featured (DaRMoD) + degree; emoji badges; optional `.cert-skill` pills  

### Achievements (`#achievements`)

- Three `.achievement-card`s: each has `.achievement-number[data-target]` + `.achievement-symbol` (`%` or `+`) + label + one-line description  

### Experience (`#experience`)

- Grid of role cards: title, `.experience-date`, `<ul class="exp-bullets">` with 2–3 `<li>` items each  

### Skills (`#skills`)

- Four pillars in 2×2 grid; each one short paragraph or keyword line  

### Analysis & Delivery (`#analysis-delivery`)

- `.section-intro` one-liner  
- Three `.details-container` columns: insight, structured delivery, stakeholder comms  

### Projects (`#projects`)

- Each project: image, title, `.tech-stack` emojis, `.project-metrics` badges, blurb, details, GitHub button  
- Optional: `data-category` on cards if you re-enable filtering in JS/HTML  

### Contact (`#contact`)

- Left: heading, short line, email + LinkedIn row  
- Right: form `id="contact-form"` — name, email, subject, message; submit builds `mailto:` and shows toast notification  

### Footer

- Repeat nav links + copyright line  

---

## 5. JavaScript behavior (`script.js`)

| Function | Behavior |
|----------|----------|
| `toggleMenu()` / `closeMenu()` | Toggle `.open` on `.menu-links` and `.hamburger-icon` |
| `toggleTheme()` | Toggle `data-theme` on `body`, swap emoji, `localStorage.theme` |
| `DOMContentLoaded` | Restore theme; init animations, form, counters, typing, scroll bar; delegate click on `#menu-links` anchors to `closeMenu()` |
| `initScrollAnimations()` | IntersectionObserver on `section`, `.details-container`, `.skill-tag` |
| `initContactForm()` | Prevent default; `mailto:` with encoded subject/body; notification; reset |
| `initAchievementCounters()` | Observe `.achievement-number`, run `animateCounter` once |
| `initTypingAnimation()` | Typewriter loop over string array |
| `initScrollProgress()` | Set `#scroll-progress` width from scroll ratio |

**Note:** `filterProjects()` exists in `script.js` but filter buttons were removed from HTML; safe to delete or re-add UI if needed.

**Theme icons:** Two `.theme-icon` nodes (desktop + mobile) — same class means `querySelector` only updates the first unless you use `querySelectorAll` and loop. If mobile icon desyncs, assign unique IDs or loop all `.theme-icon` on toggle.

---

## 6. Responsive behavior (`mediaqueries.css`)

| Breakpoint | Behavior |
|------------|----------|
| **≤1400px** | Profile height tweak; `#contact` / `#projects` `height: fit-content`; `.about-containers` wraps |
| **≤1200px** | Hide `#desktop-nav`, show `#hamburger-nav`; profile + about stack vertically; hide `.arrow`; section side margins `5%`; smaller profile pic box |
| **≤600px** | Smaller titles/logo; nav links stack; contact/footer height tweaks; contact form full width; achievements single column; skills/experience grids → 1 column; certifications stack; smaller achievement numbers, tech icons, etc. |
| **Nested ≤900px** | Extra rule forcing achievements to 1 column (redundant with above in some cases) |

---

## 7. How to recreate from scratch

1. **Create** `index.html` with semantic structure: `nav` ×2, sequential `section` elements with ids above, `footer`, `script` at bottom.  
2. **Add** `style.css`: reset, `:root` + `[data-theme="dark"]`, `body`, `#scroll-progress`, nav, profile, sections, `.details-container`, buttons, projects, contact, certifications, achievements, grids, `.exp-bullets`, `.social-icon-link`, etc.  
3. **Add** `mediaqueries.css` with the three breakpoints; load **after** main CSS.  
4. **Add** `script.js` with functions in section 5; ensure form `id` matches.  
5. **Place assets** under `assets/` with paths matching `index.html`.  
6. **Test:** keyboard nav, focus states (add `:focus-visible` if you want a11y polish), both themes, mobile menu open/close + link navigation, form submit in a client that supports `mailto:`.

---

## 8. Deployment notes

- Works on **GitHub Pages**, **Netlify**, **Vercel** static hosting, or any static file host.  
- **No** `package.json` required unless you add a build later.  
- Ensure **PDF and images** are committed if you use Git hosting.

---

## 9. Optional improvements for a fork

- Add `@font-face` fallback if Google Fonts blocked  
- Use `querySelectorAll('.theme-icon')` in `toggleTheme` for sync  
- Remove dead `filterProjects` or restore filter UI  
- Add `prefers-reduced-motion` to disable animations  
- Add skip link and landmark roles (`<main>`, `aria-current`) for accessibility  

---

*Generated from the `my-website` codebase layout and conventions. Update this file when you change structure or design tokens.*
