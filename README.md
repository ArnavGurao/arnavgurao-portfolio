# Arnav Gurao — NFC portfolio

A single-page React portfolio with an original portrait, neo-brutalist styling, animated technology stickers, project illustrations, public GitHub data, resume downloads, and a downloadable contact card. Built with React, TypeScript, Vite, Tailwind CSS 4, Motion, Lucide, and Simple Icons. No backend, account system, or browser secrets.

## Run locally

Use Node.js 22.12+ (Node 24 was used for validation).

```sh
cd arnav-portfolio
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`. In Windows PowerShell, use `npm.cmd` and `npx.cmd` if execution policy blocks `npm.ps1`.

```sh
npm run build      # TypeScript checks and production bundle in dist/
npm run preview    # Serve the production bundle locally
npm run lint       # ESLint, React Hooks and TypeScript rules
npm run format     # Format the source with Prettier
```

All direct dependencies are pinned. `package-lock.json` records the complete dependency tree. Fonts and brand assets are served locally.

## Project structure

```text
arnav-portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons/                  # Local AWS, Java and LinkedIn SVGs
│   ├── images/                 # Original portrait, PDF preview, social image
│   └── resume/                 # Actual supplied resume PDF
├── src/
│   ├── components/             # Header, Hero, About, Skills, Projects,
│   │                           # GitHubDashboard, Resume, Contact, shared UI
│   ├── data/                   # Editable profile, projects and skills
│   ├── hooks/useGitHubProfile.ts
│   ├── lib/vcard.ts
│   ├── styles/globals.css      # Design tokens, layouts and responsive styling
│   ├── App.tsx
│   └── main.tsx
├── tests/                      # Responsive, interaction and accessibility checks
├── scripts/                    # Visual inspection and social image rendering
├── .openai/hosting.json         # Private Sites identity; not needed by Vercel
├── .env.example
├── index.html                  # SEO and social sharing metadata
├── vite.config.ts
├── playwright.config.ts
├── vercel.json
├── package.json
└── package-lock.json
```

## Deploy to Vercel

1. Push this project to a Git repository and import that repository into Vercel. If the repository contains the parent workspace, set **Root Directory** to `arnav-portfolio`.
2. Select the **Vite** framework preset. Build command: `npm run build`. Output directory: `dist`. Install command: `npm ci`. Select Node.js 24 or a compatible supported version.
3. Deploy. `vercel.json` already provides the framework, output directory, immutable hashed-asset caching, and basic response headers.
4. For a custom domain, add `VITE_SITE_URL` with its actual HTTPS origin and redeploy. Otherwise the build uses Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. The fallback origin is the actual registered private Sites origin.
5. Program the NFC card with the final **public production HTTPS URL**, then test the tap on your phones. A private Sites deployment requires owner access and is not the public NFC destination.

No Vercel deployment is performed merely by building this repository. Canonical, Open Graph URL, and absolute social-image URLs are inserted at build time; the source never guesses a public Vercel domain. Social image: `public/images/social-preview.jpg` (1200 × 630).

## Edit content

- `src/data/profile.ts`: contact details, social URLs, education, interests, and milestones.
- `src/data/projects.ts`: descriptions, tags, details, optional repository and live-demo URLs. Buttons only render when a URL is supplied.
- `src/data/skills.ts`: grouped technologies.
- `src/styles/globals.css`: design palette, layout, typography, animations, and breakpoints.

The original files in the parent directory were preserved. The portrait is an unchanged copy of `arnav-potrait.png.jpeg`; only CSS frames/crops it. The PDF is an unchanged copy of `Arnav.Ashish.Gurao Resume.pdf`. Its preview was rendered from the actual first PDF page. No face generation or replacement was used. The social image is an HTML composition using that same photograph.

The supplied resume and build brief are the factual sources. The profile-card reference was available; the additional mobile and editorial references named in the brief were absent. No required personal asset is missing.

## GitHub and repository links

The browser requests GitHub's public `/users/ArnavGurao` and `/users/ArnavGurao/repos` endpoints without authentication. Responses are validated and cached for 15 minutes. Slow, unavailable, malformed, or rate-limited responses show a retryable fallback; an older valid cache is explicitly labeled as a snapshot. Storage failures are nonfatal. No fake metrics or contribution calendar are generated. Contribution history links directly to GitHub.

The DataGuard repository is really spelled **DataGaurd** on GitHub: `https://github.com/ArnavGurao/DataGaurd`. Cardexa uses `https://github.com/ArnavGurao/CARDEXA`. These public URLs were verified during implementation. RoadSOS has no verified repository URL; its source button is intentionally absent. No live deployment URLs were supplied or invented. The three project visuals are labeled conceptual illustrations, not actual screenshots or live dashboards.

## Contact card

The buttons download `Arnav_Gurao_Contact.vcf` as vCard 3.0. It includes the full name, mobile number, email, LinkedIn, Instagram, and GitHub, with CRLF line endings, escaped text, and UTF-8-aware 75-octet line folding. Visitors must confirm contact import. Browser downloads and file contents are tested; actual Android/iOS contact import and physical NFC taps still need device testing.

## Verification

```sh
npx playwright install chromium
npm test
```

An installed Chromium-based browser may be used instead of downloading one. On the Windows machine used for this build:

```powershell
$env:PLAYWRIGHT_BROWSER_PATH='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm.cmd test
```

The suite covers 320, 360, 375, 390, 430, 768, 1024 and 1440px widths; horizontal overflow; loaded assets; browser exceptions; keyboard/mobile navigation; expandable details; resume and vCard downloads; contact links; GitHub success/cache/rate-limit/retry/empty/stale states; and reduced motion. Axe runs WCAG A/AA checks at mobile and desktop widths. Automated checks supplement visual review; they do not establish complete accessibility conformance or replace real-device tests.

The functional test suite uses isolated API fixtures for predictable assertions. Fixture counts never enter application source or the published build. Screenshots in `.artifacts/` are local QA output and are excluded from source synchronization.

## Credits and reference documentation

- Typography: Space Grotesk and DM Sans, self-hosted through Fontsource.
- Icons: Lucide and Simple Icons; AWS, Java and LinkedIn SVGs from [Devicon](https://github.com/devicons/devicon), under its MIT distribution license. Brand marks remain the property of their respective owners.
- Stack configuration follows the official [Vite guide](https://vite.dev/guide/) and [Tailwind Vite installation guide](https://tailwindcss.com/docs/installation/using-vite).
- UI illustrations and decorations are local SVG/CSS, with Motion entrance reveals, reduced-motion support, and a pause control for the marquee.
