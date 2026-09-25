# Social Inno · Raiffeisen AI & SMEs questionnaire

Participant identification form followed by a ten-question workshop preparation survey for Romanian SME founders and managers. English is the default; all respondent copy is also available in Romanian. The English-only `/admin` dashboard shows visits, responses, individual answers and CSV export. No maturity score is calculated or displayed.

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

## Questionnaire v4 — Data to Decisions

Version `2026-09-data-decisions-v4` has four sections, ten main questions and up to two conditional follow-ups:

1. Your AI today: tools/access, personal usage frequency, file/data access.
2. How you work with AI: working mode and activities during the last three months.
3. AI in your company: company adoption.
4. Shaping the workshop: theme usefulness, dataset readiness/type, a business-data question and other expectations.

`public/survey-config.js` defines stable option IDs, bilingual question copy, validation, exclusive selections and answer formatting. `public/i18n.js` contains interface copy. `public/app.js` uses shared rendering for single choice, multiple choice, conditional details and text fields. The existing logo, typography, colours and layout are preserved.

Requiredness: Q1–Q9 are required except Q4 when Q1 or Q2 indicates no AI use. Q10 and the dataset-type follow-up are optional. Those participants see Q4 with an explicit skip option; skipped working mode is stored as null, without forcing a misleading answer or adding an extra main question. Q7a and Q9 accept 1–3,000 characters; Q10 is optional (up to 3,000). Dataset type is an optional follow-up to Yes/Probably/Maybe, with an Other name required when selected; Other names accept up to 120. Every selected Q1 tool, including Other, requires an access type. No cross-question consistency judgments are shown. The advertised 5–7 minutes is a target to validate with real participants, not a measured completion benchmark.

Back/Next and language switching preserve answers. Participant details are included in review and can be edited before submission. Versioned browser drafts include identity details, expire after seven days and are removed after confirmed live submission. Authored text is translated; participant free text is never translated. Review and consent precede a live submission; a failed request retains the draft and offers retry.

## Structured data and compatibility

Each response has its own named columns:

- `first_name`, `family_name`, `company_name`: required participant identity, stored separately from question answers (100, 100 and 200 characters maximum).

- `ai_tools`: JSON object with `selected` tool IDs, `access` keyed by tool ID, and optional `others` entries, each with a tool name and its own access type. Includes internal chatbots. Access values are `free`, `paid_personally`, or `provided_by_company`.
- `ai_usage_frequency`, `ai_working_mode`: stable single-choice IDs.
- `company_ai_adoption`: JSON array of selected adoption IDs; `not_used` is exclusive.
- `ai_data_access`: JSON array of selected file/data access IDs. Multiple sources can be selected. The historical `desktop_ai_apps` field remains available for older responses.
- `ai_tasks_last_3_months`: JSON array of selected IDs.
- `data_to_decisions_interest`, `workshop_dataset_readiness`: stable single-choice IDs.
- `workshop_preferred_topic`, `business_data_question`, `workshop_other_expectation`: original free text.
- `workshop_dataset_type`: structured selected IDs and optional Other name. Hidden follow-ups are removed when their parent answer changes.
- `tedious_task`, `workshop_expectation`: preserved historical columns, no longer asked.
- `response_language`: `en` or `ro`.

Metadata includes submission/session IDs, received time, questionnaire version and duration. Consent is validated before any response is accepted. `answers_json` is an additional structured snapshot; it does not replace the separate answer columns. Frequency, working mode and company adoption remain separate dimensions.

`lib/store.js` maps writes against the actual header row. Current writes require current columns, while older response sheets remain readable and extra future columns are tolerated. The existing 36 columns were preserved and the nine new columns appended at `Responses!AK:AS`. The participant identity columns were subsequently appended at `Responses!AT:AV`. Six v2 columns were added at `Responses!AW:BB`. The v3 file/data access answer is appended at `Responses!BC` (`ai_data_access`); v2 is archived in `public/survey-v2.js` for historical admin display. No participant rows were changed. Visits retain their existing schema.

`public/survey-v3.js` archives the previous Q1, Q4 and single-choice Q6 for historical records. Existing Sheets columns are reused with versioned answer shapes.

`public/survey-v1.js` archives the eight-question version. `public/survey-legacy.js` and `public/survey-legacy-en.js` archive the previous questionnaire for historical admin labels. Unknown versions fall back to original IDs/values. When making a later version, preserve the old configuration, keep unchanged IDs stable, append needed columns, and increment `survey.version`. Do not reinterpret old records under new questions.

## Google Sheets configuration

Destination: https://docs.google.com/spreadsheets/d/1TIoviEAiScYKCHEU5OBkuNFiinIg5sFvztJ2Yd-5FDw/edit

The destination has `Responses` (A:BC) and `Visits` (A:E) tabs with the headers required by v4. Production is connected through the `questionnaire-writer` service account in the `social-inno-survey` Google Cloud project, shared on the sheet as Editor; its key lives only in Vercel. A connected personal Google account does not provide runtime credentials to the website.

1. Enable the Google Sheets API in your Google Cloud project and create a service account.
2. Share the destination sheet with that service account as Editor.
3. Add `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` and `GOOGLE_SHEET_ID` to the Vercel Production environment. The private key accepts PEM newlines or literal `\n` separators. Keep all credentials server-side.
4. Confirm organizer/contact/retention privacy wording for the actual program, then set `SURVEY_LIVE=true` and redeploy. Version v4 already sets `survey.draft=false`.

Both the live switch and configured storage are required. Missing credentials keep production in preview mode. The protected admin dashboard reports storage and collection status.

Troubleshooting: if the admin dashboard shows "The admin service is temporarily unavailable" after a correct password, or respondents see "We could not save your response", the Google call failed. Find the `API failure:` line in the Vercel project logs. `Google authentication failed` or a PEM/decoder error means a malformed `GOOGLE_PRIVATE_KEY` (commonly pasted with surrounding quotes) or a wrong service-account email. A Sheets `403` means the Sheets API is disabled in the service account's project or the sheet is not shared with it. A `404` means a wrong `GOOGLE_SHEET_ID`. Redeploy after changing any variable.

`api/submit.js` validates version, all visible answers, access details and consent on the server. Google writes use RAW values so participant text cannot execute as a spreadsheet formula. The success screen follows acknowledgement of persistence, and ordinary retries reuse the submission ID.

## Administration and limitations

`api/admin.js` reports visits, sessions, starts, completions and responses without a recorded start (for example, begun before collection opened), and returns the Google Sheets failure category to signed-in admins. `public/admin.js` summarises every current question in survey order (Q1–Q10 with follow-ups 7a and 8a), grouped by the four questionnaire sections, with each card showing its question number and full English wording and options in questionnaire order: tools with access type and named Other tools, frequency, file/data access, working mode including non-user skips, tasks, company adoption, theme usefulness, preferred topics, dataset readiness and data types, and lists of business questions and other expectations with participant and company. Multi-select shares are per respondent. The response table supports search across all answers and filters by company adoption, theme usefulness, dataset readiness, frequency, language or earlier versions. CSV export has one labelled English column per current question plus `answers_json` for the complete original record. Original Romanian comments remain Romanian inside the English interface. CSV cells are protected against formula injection.

Session IDs are random per-browser-tab identifiers, not unique-person counts. Names and company names identify program participants and are stored with responses. Emails, IP addresses and URL query strings are not recorded by the application; hosting infrastructure may have its own logs. Visits count successful page-view writes. Completion is completed started sessions divided by started sessions; failed or blocked analytics can undercount activity.

Sheets does not provide atomic uniqueness: simultaneous duplicate submissions may create duplicate raw rows even though ordinary retries are deduplicated and the dashboard deduplicates IDs. This architecture reads used rows for analytics and is intended for a small workshop survey. Larger campaigns would benefit from a transactional datastore and distributed rate limiting.

## Validation

Automated tests cover bilingual structure, all question types, non-user skipping, exclusivity, invalid payloads, version checks, structured persistence, retry deduplication, closed collection, origin checks, storage failures, Google API header mapping, legacy/future schema compatibility, analytics and admin authentication.

Browser checks cover English and Romanian completion against an isolated demo store, mobile layouts, saved drafts after reload, language switching, Back/Next, consent, offline failure/retry and inspecting the resulting structured responses in the English admin interface. The actual Google Sheet headers were read back after migration. Production collection was verified end to end on 2026-09-25: a live v4 submission was written to `Responses` and displayed in the admin dashboard.

Recommended next iteration: pilot with 3–5 SME managers to measure completion time and clarify any ambiguous choices, then use workshop-task responses to select practical exercises.

## Deployment and branding

Vercel framework: Other; Node 24; build `npm run build`; output `dist`. Root `api/*.js` files are server functions. `/admin` rewrites to the admin page. Only `public/` is copied into deployment assets. `.env.local`, generated output and the local `template-reference/` archive are excluded from Git.

The official Social Innovation Solutions logo is served from `public/assets/sis-logo-white.png`, preserving its proportions on a dark backdrop. Its source is documented beside the asset.
