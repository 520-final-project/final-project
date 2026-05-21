# 🌊 OceanWise — SDG 12 & 14 Awareness Website

> A final year project dedicated to raising awareness about **SDG 12: Responsible Consumption & Production** and **SDG 14: Life Below Water** through education, interactive gameplay, and quizzes.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Pages Overview](#pages-overview)
- [File Structure](#file-structure)
- [How to Run](#how-to-run)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [SDG Goals](#sdg-goals)
- [Team](#team)

---

## 🌍 About the Project

**OceanWise** is a multi-page awareness website that educates visitors about two of the United Nations' Sustainable Development Goals:

- **SDG 12** — Responsible Consumption & Production
- **SDG 14** — Life Below Water

The site combines real-world facts, animated visuals, an interactive ocean clean-up game, and a 10-question quiz to engage users of all backgrounds and inspire meaningful action.

---

## 📄 Pages Overview

| Page | File | Description |
|---|---|---|
| **Home** | `index.html` | Landing page with wave animation, counters, section preview cards, and awareness messages |
| **About** | `about.html` | In-depth look at ocean problems, clean vs polluted ocean comparison, and solutions |
| **Game** | `game.html` + `game.css` + `game.js` | Interactive ocean clean-up game — click trash, avoid sea creatures |
| **Quiz** | `quiz.html` + `quiz.css` + `quiz.js` | 10-question quiz with instant green/red feedback and a final result screen |
| **About Us** | `aboutus.html` | Team profiles, SDG deep-dive cards, mission statement, and values |

---

## 📁 File Structure

```
project/
│
├── index.html          # Home page
├── about.html          # About / Crisis & Solutions page
├── aboutus.html        # About Us / Team page
│
├── game.html           # Game page (HTML structure)
├── game.css            # Game page styles
├── game.js             # Game page logic
│
├── quiz.html           # Quiz page (HTML structure)
├── quiz.css            # Quiz page styles
└── quiz.js             # Quiz page logic
```

> **Important:** All files must be kept in the **same folder** for the internal links and file references (`href`, `src`) to work correctly.

---

## 🚀 How to Run

This is a plain HTML/CSS/JavaScript project — no installation or build tools required.

1. Download or clone all files into one folder
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
3. Navigate between pages using the top navigation bar

```
Double-click index.html  →  website opens in your browser
```

> **Note:** Some browsers restrict `localStorage` when opening files directly from the filesystem. If the Game's personal best score doesn't save, try running the files through a local server (e.g. VS Code Live Server extension).

---

## ✨ Features

### 🏠 Home Page
- Animated ocean wave background (HTML Canvas)
- Animated counter statistics (11M tonnes of plastic, 700+ species affected, 50% coral reefs threatened)
- Floating icon animations
- Preview cards for each section with **"Learn More"** buttons linking to detail pages
- Awareness message pills

### 🌊 About Page
- 6 problem cards covering plastic pollution, ocean warming, overfishing, overconsumption, chemical pollution, and coral reef collapse
- Side-by-side visual comparison of a healthy vs polluted ocean
- Key statistics row
- 6 animated solution items with practical tips
- Scroll-triggered animations (fade in on enter)

### 🎮 Game Page
- 8×6 interactive ocean grid
- Click **trash items** (🛍️🧴🚬💀) to earn **+10 points**
- Click **sea creatures** (🐠🐡🦈🐙) and lose **-5 points**
- 30-second countdown timer with urgent pulse animation
- New items spawn continuously during gameplay
- Personal best score saved with `localStorage`
- "Did You Know?" fact cards below the game

### 🧠 Quiz Page
- 10 multiple-choice questions about SDG 12 & 14
- Instant feedback on every answer:
  - ✅ Correct answer turns **green**
  - ❌ Wrong answer turns **red**, and the correct answer is highlighted **green**
- Explanatory fact shown after each answer
- Progress bar and live score tracker
- Final result screen:
  - Score **> 5** → *"Good job for protecting the environment!"* 🏆
  - Score **≤ 5** → *"Can make more persistent efforts!"* 🌱
- Accuracy percentage and score breakdown
- Restart button to try again

### 👥 About Us Page
- Team member cards with roles and bios
- SDG 12 and SDG 14 detailed explanation cards with key targets
- Team values section
- Mission statement
- Scroll-triggered animations

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure and content |
| **CSS3** | Styling, animations, responsive layout |
| **JavaScript (Vanilla)** | Game logic, quiz logic, counter animations, scroll observers |
| **HTML Canvas API** | Wave animation on the Home page |
| **CSS Custom Properties** | Consistent colour theming across all pages |
| **Intersection Observer API** | Scroll-triggered fade-in animations |
| **localStorage** | Saving the game's personal best score |
| **Google Fonts** | Syne (headings) and DM Sans (body text) |

---

## 🎯 SDG Goals

### SDG 12 — Responsible Consumption & Production
Ensure sustainable consumption and production patterns. Key targets include halving per-capita global food waste, achieving sustainable management of natural resources, and substantially reducing waste generation through prevention and recycling.

### SDG 14 — Life Below Water
Conserve and sustainably use the oceans, seas, and marine resources. Key targets include preventing and reducing marine pollution, protecting at least 30% of the global ocean by 2030, and ending overfishing and destructive fishing practices.

---

## 👥 Team

| Name | Role |
|---|---|
| Alex Chen | Project Lead & Web Development |
| Maya Lin | Research & Content |
| Sam Park | Design & Animation |
| Zoe Wu | Quiz & Education Design |

---

## 📌 Notes for Developers

- **CSS and JS files are separated** for the Game and Quiz pages following best practice (HTML structure, CSS presentation, JS behaviour kept apart)
- **JS files are always linked at the bottom of `<body>`** — never in `<head>` without `defer` — so all HTML elements exist before any script runs
- **CSS files are always linked inside `<head>`** so styles apply before the page renders
- The `<link>` tag uses `rel="stylesheet" href="filename.css"` and the `<script>` tag uses `src="filename.js"` (not `scr`)

---

*Made with 💙 for the planet — OceanWise Final Project 2025*
