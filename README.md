# LokVaani — Hackathon Website

LokVaani is a static front-end prototype for the problem statement:
"Build a scalable and user-friendly platform that acts as a bridge between knowledge holders (elders) and knowledge seekers (youth) to preserve and digitize India's endangered oral heritage and folk knowledge."

## Included
- Responsive landing page
- Explore/search/filter content
- Voices of Elders section
- Browser pronunciation demo using Speech Synthesis
- Learning cards + quiz system
- XP/progress tracking with localStorage
- Community contribution form with demo review workflow
- Impact dashboard
- GitHub Pages deployment workflow
- No backend and no paid services required for the prototype

## Important
The cultural records in `app.js` are intentionally labeled as demo/prototype records. For a real deployment, replace them with consented, documented, community-sourced material and an expert validation workflow.

## Run locally
Just open `index.html` in a modern browser.

## Free deployment: GitHub Pages
1. Create a public GitHub repository, for example `lokvaani-hackathon`.
2. Upload all files/folders from this project.
3. Go to Settings → Pages.
4. Under Build and deployment, choose GitHub Actions if using `.github/workflows/deploy.yml`.
5. Push to `main`. GitHub will deploy the static site.

For a simple static site, you can also use the branch publishing option and select `main` + `/ (root)`.

## Next hackathon upgrades
- Add a real backend/database (Supabase/Firebase) for contributions.
- Add authentication for youth, elders, moderators and experts.
- Store consented audio recordings.
- Add moderation and expert verification.
- Add a real map of contributions.
- Add a retrieval-based AI assistant over verified records.
- Add multilingual UI and translations.
