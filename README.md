# Personal Website — Static Portfolio

Static personal portfolio site showcasing projects, experience, education, and contact. Deployed to GitHub Pages with automatic CI/CD. Vanilla HTML, CSS, and JavaScript — no framework.

---

## Project Overview

The site presents:
- **Featured Projects** — cards linking to project detail pages (GymWhisper, TelusGuardAI, etc.)
- **Narrative Timeline** — horizontal marquee of career path (Gallery → SFU → Synkron → Projects → Next)
- **Skills & Tech Stack** — languages, ML/data tools, web tools
- **Experience, Education, Volunteering** — entries with logos and metadata
- **Posts** — cards linking to LinkedIn write-ups
- **Contact** — form (Formspree) plus email, LinkedIn, GitHub links

---

## Repository Structure

```
personal-website/
│
├── src/
│   ├── assets/           # images, icons, resume PDF
│   ├── pages/            # HTML pages (index, projects, project detail, narrative)
│   ├── scripts/          # timeline marquee, type-on-scroll, scroll arrow, form
│   └── styles/           # main.css
│
├── .github/workflows/    # deploy.yml (GitHub Actions)
├── scripts/              # deploy-prepare.sh
└── README.md
```

---

## Live Site

**https://florykhan.github.io/personal-website/**

---

## Local Development

1. Clone the repo
2. Open `src/pages/index.html` in a browser, or serve the `src/` directory locally
3. Paths assume pages are under `src/pages/`

```bash
# Example: serve with Python
cd src && python -m http.server 8000
```

---

## Deployment

- **Automatic**: Push to `main` — GitHub Actions builds and deploys to Pages
- **Setup**: Ensure *Settings → Pages → Source* is set to **GitHub Actions**
- The `deploy-prepare` script outputs to `dist/`, which is uploaded and deployed

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla, no framework)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Form:** Formspree (contact form email delivery)
- **Version Control:** Git + GitHub

---

## License

MIT License — feel free to use and modify with attribution.

---

## Author

**Ilian Khankhalaev**  
_CS Student, Simon Fraser University_  
📍 Vancouver, BC  |  [florykhan@gmail.com](mailto:florykhan@gmail.com)  |  [GitHub](https://github.com/florykhan)  |  [LinkedIn](https://www.linkedin.com/in/ilian-khankhalaev/)
