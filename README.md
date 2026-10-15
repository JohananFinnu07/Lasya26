# Talari Lasya's Half Saree Ceremony: Virtual Invitation

React + Vite + Tailwind CSS + Framer Motion. Dark chocolate and gold, with an ornamental diamond-chain frame.

## Run it in VS Code
```bash
npm install
npm run dev
```
Test on your phone: `npm run dev -- --host`, then open the "Network" address.

## Flow
Landing (gold frame, tap the envelope icon) → Cover (Lasya's photo inside the gold frame) → Blessing → Invitation → Date & time → Countdown + save the date (Google / Apple / Outlook) → Venue → Family → Thank-you page with Share and Copy-link buttons.

## Replace the cover photo
The cover image is `src/assets/cover-lasya.webp` (a transparent cut-out). To change it, save a new
transparent PNG/WebP over that file (same name), or change the import at the top of `src/components/Hero.jsx`.
A tall cut-out with space around it works best; keep it under about 300 KB.

## Other settings
- All English wording, names, venue and the Maps link: `src/data/content.js`.
- Personalised link: add `?to=Name` to the link and the cover shows "Invitation for Name".
- Music (optional): drop an audio file in `src/assets/music/`; the music button then appears (never autoplays).

## Deploy to GitHub Pages
1. Create a repository on GitHub, then in this folder:
   ```bash
   git init
   git add .
   git commit -m "Invitation website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. GitHub: **Settings → Pages → Source: GitHub Actions**. The included workflow publishes on every push to `main`.
   Your link: `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

For a WhatsApp link preview, add a 1200x630 `public/og.jpg` and an `og:image` meta tag in `index.html`.
