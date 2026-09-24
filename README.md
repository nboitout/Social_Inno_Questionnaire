# Social Inno · Raiffeisen AI & SMEs questionnaire

Eight-question workshop preparation survey for Romanian SME founders and managers. English is the default; all respondent copy is also available in Romanian. The English-only `/admin` dashboard shows visits, responses, individual answers and CSV export. No maturity score is calculated or displayed.

Production: https://social-inno-questionnaire.vercel.app/
Repository: https://github.com/nboitout/Social_Inno_Questionnaire (`main`; Vercel deploys pushes automatically).

## Run and verify

Node.js 24; no runtime dependencies. Copy `.env.example` to `.env.local` only if you do not already have local configuration, then run:

```powershell
npm run dev
npm test
npm run build
```

Open http://localhost:3000 or http://localhost:3000/admin. `ADMIN_PASSWORD` accepts 12 or more characters; the independent `SESSION_SECRET` needs at least 32. Never commit either value. Admin configuration errors identify the setting that needs attention without revealing its value.

For isolated local submission testing, set `DATA_MODE=demo` and `SURVEY_LIVE=true` in the process environment. Demo records are in memory and disappear when the server stops. Demo mode is prohibited on Vercel/production. With `SURVEY_LIVE=false`, respondents can preview the complete flow but no visits or answers are recorded.

## Questionnaire v1

Version `2026-09-v1` has three sections and exactly eight questions:

1. Your AI today: tools/access, personal usage frequency, installed applications.
2. How you work with AI: working mode and activities during the last three months.
3. AI in your company: company adoption, a tedious task, workshop expectations.

`public/survey-config.js` defines stable option IDs, bilingual question copy, validation, exclusive selections and answer formatting. `public/i18n.js` contains interface copy. `public/app.js` uses shared rendering for single choice, multiple choice, conditional details and text fields. The existing logo, typography, colours and layout are preserved.

Assumptions: all questions are required except Q4 when Q1 or Q2 indicates no AI use. Those participants see Q4 with an explicit skip option; skipped working mode is stored as null, without forcing a misleading answer or adding a ninth question. Q7 and Q8 accept 1–3,000 characters; Other names accept up to 120. Every selected Q1 tool, including Other, requires an access type. No cross-question consistency judgments are shown. The advertised 5–7 minutes is a target to validate with real participants, not a measured completion benchmark.

Back/Next and language switching preserve answers. Versioned browser drafts expire after seven days and are removed after confirmed live submission. Authored text is translated; participant free text is never translated. Review and consent precede a live submission; a failed request retains the draft and offers retry.

## Structured data and compatibility

Each response has its own named columns:

- `ai_tools`: JSON object with `selected` tool IDs, `access` keyed by tool ID, and optional `other` name. Access values are `free`, `paid_personally`, or `provided_by_company`.
- `ai_usage_frequency`, `ai_working_mode`, `company_ai_adoption`: stable single-choice IDs.
- `desktop_ai_apps`: JSON object with `selected` IDs and optional `other` name.
- `ai_tasks_last_3_months`: JSON array of selected IDs.
- `tedious_task`, `workshop_expectation`: original free text.
- `response_language`: `en` or `ro`.

Metadata includes submission/session IDs, received time, questionnaire version and duration. Consent is validated before any response is accepted. `answers_json` is an additional structured snapshot; it does not replace the separate answer columns. Frequency, working mode and company adoption remain separate dimensions.

`lib/store.js` maps writes against the actual header row. Current writes require current columns, while older response sheets remain readable and extra future columns are tolerated. The existing 36 columns were preserved and the nine new columns appended at `Responses!AK:AS`. No participant rows were changed. Visits retain their existing schema.

`public/survey-legacy.js` and `public/survey-legacy-en.js` archive the previous questionnaire for historical admin labels. Unknown versions fall back to original IDs/values. When making a later version, preserve the old configuration, keep unchanged IDs stable, append needed columns, and increment `survey.version`. Do not reinterpret old records under new questions.

## Google Sheets configuration

Destination: https://docs.google.com/spreadsheets/d/1TIoviEAiScYKCHEU5OBkuNFiinIg5sFvztJ2Yd-5FDw/edit

The destination has `Responses` and `Visits` tabs with the v1 headers. Production collection still requires Google service-account credentials; a connected Codex Google account does not provide runtime credentials to the website.

1. Enable the Google Sheets API in your Google Cloud project and create a service account.
2. Share the destination sheet with that service account as Editor.
3. Add `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` and `GOOGLE_SHEET_ID` to the Vercel Production environment. The private key accepts PEM newlines or literal `\n` separators. Keep all credentials server-side.
4. Confirm organizer/contact/retention privacy wording for the actual program, then set `SURVEY_LIVE=true` and redeploy. Version v1 already sets `survey.draft=false`.

Both the live switch and configured storage are required. Missing credentials keep production in preview mode. The protected admin dashboard reports storage and collection status.

`api/submit.js` validates version, all eight answers, access details and consent on the server. Google writes use RAW values so participant text cannot execute as a spreadsheet formula. The success screen follows acknowledgement of persistence, and ordinary retries reuse the submission ID.

## Administration and limitations

`api/admin.js` reports visits, sessions, completions and personal AI frequency. `public/admin.js` displays tools/access, working mode, company adoption and all answers, with search, company-adoption filtering, legacy records and CSV export. Original Romanian comments remain Romanian inside the English interface. CSV cells are protected against formula injection.

Sessions are anonymous per-browser-tab IDs, not people. No names, emails, IP addresses or URL query strings are recorded by the application; hosting infrastructure may have its own logs. Visits count successful page-view writes. Completion is completed started sessions divided by started sessions; failed or blocked analytics can undercount activity.

Sheets does not provide atomic uniqueness: simultaneous duplicate submissions may create duplicate raw rows even though ordinary retries are deduplicated and the dashboard deduplicates IDs. This architecture reads used rows for analytics and is intended for a small workshop survey. Larger campaigns would benefit from a transactional datastore and distributed rate limiting.

## Validation

Automated tests cover bilingual structure, all question types, non-user skipping, exclusivity, invalid payloads, version checks, structured persistence, retry deduplication, closed collection, origin checks, storage failures, Google API header mapping, legacy/future schema compatibility, analytics and admin authentication.

Browser checks cover English and Romanian completion against an isolated demo store, mobile layouts, saved drafts after reload, language switching, Back/Next, consent, offline failure/retry and inspecting the resulting structured responses in the English admin interface. The actual Google Sheet headers were read back after migration. Production collection must be tested once runtime credentials are installed, before inviting participants.

Recommended next iteration: pilot with 3–5 SME managers to measure completion time and clarify any ambiguous choices, then use workshop-task responses to select practical exercises.

## Deployment and branding

Vercel framework: Other; Node 24; build `npm run build`; output `dist`. Root `api/*.js` files are server functions. `/admin` rewrites to the admin page. Only `public/` is copied into deployment assets. `.env.local`, generated output and the local `template-reference/` archive are excluded from Git.

The official Social Innovation Solutions logo is served from `public/assets/sis-logo-white.png`, preserving its proportions on a dark backdrop. Its source is documented beside the asset.
