# Caffè Aura

**A premium specialty coffee house landing page — built with pure HTML, CSS, and vanilla JavaScript. No frameworks. No dependencies.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)

---

## Overview

Caffè Aura is a high-fidelity, single-page website for a fictional specialty coffee shop set in Montmartre, Paris. Built as a front-end portfolio piece, it demonstrates advanced UI/UX techniques using nothing but the native web platform — semantic HTML5, modern CSS3, and modular vanilla JavaScript.

The design language is warm, editorial, and restrained — premium typography, muted espresso tones, and deliberate whitespace that lets the content breathe.

---

## Features

- **Smooth scroll-triggered animations** — powered by IntersectionObserver with staggered entrance delays
- **Custom animated cursor** — gold dot with lagging follower ring (desktop only, respects `hover: none`)
- **Dynamic menu filtering** — animated category tabs (All / Hot Coffee / Cold Brews / Pastries)
- **Testimonial carousel** — auto-rotating with dot navigation and touch/swipe support
- **Table reservation form** — client-side validation with shake feedback and success confirmation
- **Order toast notifications** — per-item feedback when adding to an order
- **Parallax hero image** — subtle depth effect on scroll (disabled for `prefers-reduced-motion`)
- **Sticky navbar** — frosted glass effect on scroll with active section tracking
- **Responsive at every breakpoint** — mobile-first, tested from 320px to 1440px+
- **Accessible** — semantic HTML5, ARIA labels, keyboard navigable, screen-reader friendly
- **Zero dependencies** — no build step, no npm, no framework

---

## Tech Stack

| Layer      | Technology                                               |
|------------|----------------------------------------------------------|
| Markup     | HTML5 (semantic elements, ARIA)                          |
| Styling    | CSS3 (custom properties, Grid, Flexbox, `clamp()`)       |
| Scripting  | Vanilla JavaScript ES6+ (IIFE modules, IntersectionObserver) |
| Fonts      | Google Fonts — Cormorant Garamond, Jost, Playfair Display |
| Images     | Local photography + Unsplash                             |

---

## Folder Structure

```
caffe-aura/
├── assets/
│   ├── css/
│   │   └── style.css          # All styles, organized by component
│   ├── js/
│   │   └── main.js            # 10 self-contained IIFE modules
│   └── img/
│       ├── SpanishLatte.jpg
│       ├── V60PourOver.jpg
│       ├── SignatureColdBrew.jpg
│       ├── KyotoIcedLatte.jpg
│       ├── SparklingBrew.jpg
│       ├── CardamomBun.jpg
│       ├── ValrhonaTart.jpg
│       └── favicon-coffee-menu.png
├── index.html                 # Single-page entry point
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

No build tools, no package manager, no configuration required.

### Option 1 — Open directly

Double-click `index.html` or drag it into any browser.

### Option 2 — Live Server (VS Code)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

### Option 3 — Python simple server

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

---

## Screenshots

> _Add screenshots of the live site here._

| Hero Section | Menu Section |
|---|---|
| _(screenshot)_ | _(screenshot)_ |

| Gallery | Contact Form |
|---|---|
| _(screenshot)_ | _(screenshot)_ |

---

## Live Demo

> _Add your GitHub Pages / Netlify / Vercel URL here once deployed._

**Suggested deployment:** Push to GitHub → Settings → Pages → Deploy from `main` branch root. No build step needed.

---

## GitHub Repository

> [github.com/ramiissa303/caffe-aura](https://github.com/ramiissa303/caffe-aura)

---

## Future Improvements

- [ ] Compress images to WebP format (currently ~22 MB of JPEG assets)
- [ ] Add dark mode with `prefers-color-scheme` and a manual toggle
- [ ] Implement a cart with `localStorage` persistence
- [ ] Animate page sections with the [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [ ] Add a CMS backend (Sanity or Contentful) for real menu management
- [ ] Deploy to GitHub Pages and add a live demo badge
- [ ] Write Playwright end-to-end tests for the booking form flow
- [ ] Add `srcset` / responsive images for art-directed hero photos

---

## License

Distributed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project for personal or commercial purposes with attribution.

---

## Author

**Rami Issa**
Front-End Developer

- GitHub: [@ramiissa303](https://github.com/ramiissa303)
- Email: ramiissa303@gmail.com

---

_Built with care. Crafted like a good espresso — nothing unnecessary, nothing missing._
