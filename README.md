# Social Inno · Raiffeisen survey

Romanian SME AI-adoption survey, adapted from the Agentic SDLC survey. The original frontend is preserved locally in `template-reference/` with its embedded runtime credential removed; this archive is excluded from Git and deployments. Original Git metadata, Azure settings, deployment workflows and generated dependencies were not copied. The source project remains unchanged.

Repository: https://github.com/nboitout/Social_Inno_Questionnaire (default branch: `main`).

## Current status

- Working responsive survey and protected `/admin` dashboard.
- **Preview only**: provisional questions; no responses or visits are sent while `survey.draft` is true.
- 17 questions per respondent: 6 common questions → 6 questions in one of three AI-adoption branches → 5 strategy/closing questions (last is optional).
- Your Google Sheet has `Responses` and `Visits` tabs with matching headers. Existing `Sheet1` remains unchanged.
- Vercel configuration is included; this project has not been deployed.
- Server-side Google service-account credentials are still required. The Codex Google connection does not become a credential for the deployed website.

## Run locally

Node.js 24; no runtime dependencies.

```powershell
Copy-Item .env.example .env.local
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin. Set `ADMIN_PASSWORD` (at least 24 characters) and `SESSION_SECRET` (at least 32 characters) in `.env.local` to use the admin dashboard. Generate two independent values with `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.

`DATA_MODE=demo` is optional for local development: data is in memory, initially empty and lost on restart. It is prohibited on Vercel/production. Preview mode still blocks collection.

```powershell
npm test
npm run build
```

## Questions and branching

Edit `public/survey-config.js`: `core`, `branches`, and `closing`. Draft branch keys are `using`, `exploring`, `not_yet`, selected by `ai_adoption`. Questions support single choice, multiple choice, and optional text. Options have stable language-independent IDs.

When providing final content, specify common questions, branching rule, branch-specific questions, and final shared questions. Keep every route within 20 questions, including optional ones. These are working examples, not an approved research instrument. Company size and location are currently descriptive, not screening exclusions.

Keep existing question IDs stable where their meaning remains unchanged. Bump `survey.version` when wording or response choices change. For changed IDs/schema, migrate headers with care or use a fresh response tab; the backend refuses mismatched headers. Archive historical question configurations before launch so old results can be interpreted. The initial admin UI uses the current configuration to label answers; raw original answers and version are also retained in Sheets/CSV.

## Google Sheets integration

Destination: https://docs.google.com/spreadsheets/d/1TIoviEAiScYKCHEU5OBkuNFiinIg5sFvztJ2Yd-5FDw/edit

1. In your Google Cloud project, enable the Google Sheets API and create a service account.
2. Share the destination spreadsheet with that service account email as **Editor**.
3. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID` in local/Vercel server environment variables. Use the PEM private key with newlines or literal `\n`; never add it to `public/` or Git.
4. Set the two admin secrets. `/admin` displays an explicit setup message if storage is not configured.

The browser posts to `/api/submit`; the server validates every answer and appends values with `valueInputOption=RAW`, so user text cannot become a Sheets formula. Only a successful Google response produces a success screen. Failed requests retain the browser draft. Every response has its own column plus an `answers_json` snapshot.

## Vercel

Import this directory as a separate Vercel project (framework **Other**, Node 24). Build command `npm run build`; output `dist`. Root `api/*.js` files are Node functions. `/admin` rewrites to the admin page. No credentials or template archives are copied into `dist`.

Configure the environment variables from `.env.example`, then deploy a preview. Before real collection: finalize the questionnaire and privacy text (organizer, contact, retention period); set `survey.draft=false`; set `SURVEY_LIVE=true`; deploy again. Both switches and configured storage are required. This prevents draft answers from entering the study.

Use Vercel Firewall rate limits for `/api/login`, `/api/visit`, and `/api/submit` before promoting a public campaign. The initial app uses long admin passwords, signed HttpOnly SameSite cookies, server-side validation, origin checks and body limits; it does not implement distributed anti-bot protection.

## Analytics definitions and limitations

- Visits = successful page-view event writes, excluding admin and preview mode.
- Sessions = random per-tab/browser-session IDs, **not unique people**. No IP, email, name or URL query parameters are stored by this application. Hosting infrastructure may keep its own logs.
- Started = distinct sessions with a start event.
- Completion = sessions with a response and start event / sessions with a start event. It is not a per-person conversion metric.
- Dashboard lists responses, branch distribution, latest 100 events (top 5 displayed), filtering, individual answers and CSV export.
- Analytics failures do not stop the survey. Blocked or failed analytics can undercount traffic.
- Submission IDs make normal retries idempotent on a best-effort basis. Google Sheets does not provide atomic uniqueness, so simultaneous duplicate requests can produce duplicate raw rows. The dashboard deduplicates by submission ID. Use a transactional store/queue if strict exactly-once writes or high-volume collection becomes necessary.
- The backend reads used Sheets rows for analytics and deduplication. This is intended for a small survey, not high-volume web analytics; Google API quotas apply.

## Source references

- Vercel Node functions: https://vercel.com/docs/functions/runtimes/node-js
- Sheets cell values and append: https://developers.google.com/workspace/sheets/api/guides/values

## Languages and branding

The respondent experience defaults to English. The EN/RO switch translates the landing page, every question and answer choice, validation, privacy copy, review and completion screens. A remembered explicit Romanian selection takes precedence on later visits. Switching languages preserves question position, answers and free-text comments.

Romanian questionnaire content remains in `public/survey-config.js`; English question/option labels are in `public/survey-en.js`; interface translations are in `public/i18n.js`. Only authored template text is translated. Stored answer IDs and the Google Sheets schema remain identical in both languages. The admin interface is English-only, including login, errors, dashboard, response details and English question/option labels. Respondent comments and raw exported data retain their original content.

The official white Social Innovation Solutions logo is served locally from `public/assets/sis-logo-white.png`, with its original proportions and a dark backdrop on both survey and admin pages. Asset provenance is recorded beside it.
