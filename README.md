# Discovery — Local Workflow Readiness

[Open Discovery](https://sauravnrai.github.io/discovery/) · [App Network](https://sauravnrai.github.io/) · [ASF Studio](https://sauravnrai.github.io/ASF/) · [Analytics](https://sauravnrai.github.io/ASF-analytics/) · [Visualizer](https://sauravnrai.github.io/ASF-visualizer/)

A free, self-contained questionnaire. All scoring, recommendations and report generation happen in the browser. No backend, runtime API, CDN, fonts, analytics, secrets, signup or paid service. All code and styling are bundled in `index.html`; `.nojekyll` supports direct Pages publishing from `main` → `/`.

## Scoring

Five readiness questions use a 0–4 scale. Weights: goal clarity 25, data quality 25, data access 20, ownership 15, pilot capacity 15. Sum `weight × answer / 4`, then round. Below 40: prepare; 40–69: small pilot; 70–100: focused pilot. The selected goal orders the three ASF recommendations. The two lowest readiness answers determine initial next steps. This is a transparent self-assessment, not AI inference or a guarantee.

## Results and optional sharing

Full results appear immediately. Copy full results or download TXT/JSON. Gmail and mail-app links only open prefilled drafts addressed to the requested commercial inbox. **Nothing sends automatically: review the draft and click Send.** Gmail requires an account, and a mail app must be configured. Long draft URLs may be truncated by some clients; copy/download the full report instead. No Gmail credentials or API keys are embedded.

## Privacy

Answers live only in page memory, not localStorage/sessionStorage. No form submissions or network connections are permitted by the page CSP. With JavaScript disabled, the form controls remain disabled. Copy/download persists results only where the visitor chooses. Clicking a draft button shares the report with the chosen mail application/provider; sending is the visitor's explicit action. Do not enter confidential data. Other apps share this Pages origin; this is not a security boundary for sensitive data.

## Tests and content

Run `node tests/discovery.test.cjs` (Node 18+); no packages. The network hub's verification workflow checks actual public URLs, browser interaction, downloads, draft encoding, mobile layout, and shared navigation without sending email. See the app's scoring explanation and the [source-project catalog](https://sauravnrai.github.io/projects.html).
