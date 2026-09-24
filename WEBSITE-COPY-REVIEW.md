# Website text — review and editing master

Snapshot: 24 September 2026 · Website source commit: `74c40d0` · Questionnaire: `2026-09-v1`.

Edit the wording directly under **EN** and **RO**, then ask Codex to apply this file to the website. Keep the headings/IDs so each edit can be mapped back to its source. You can edit just one language and add a note asking for the other to be translated. Add editorial notes as `REVIEW NOTE: ...`.

This is a review document, not a live configuration file: edits here do not change the website automatically. No passwords, credentials or participant responses are included. Braces such as `{time}` identify dynamic values, not literal copy. Arrows/icons are added by the interface.

Scope: current homepage, eight questions, respondent interface, privacy, validation, confirmation, English administration and technical messages. Old questionnaire versions used only for historical records are excluded; they should retain their original wording. Unused translation entries are separated at the end.

## 1. Homepage

### ui.eyebrow

**EN**

PERSPECTIVES FROM ROMANIA

**RO**

PERSPECTIVE DIN ROMÂNIA

### ui.topic

**EN**

Social Innovation Solutions / AI & SMEs

**RO**

Social Innovation Solutions / AI & IMM-uri

### homepage.headline

_The two source parts appear on separate lines; the second is highlighted. Source keys: hero heroAccent._

**EN**

How do you work with AI today?

**RO**

Cum lucrezi astăzi cu AI?

### ui.intro

**EN**

Tell us how you currently use AI — in your own work and across your company.

**RO**

Spune-ne cum folosești AI în prezent — în activitatea ta și în compania ta.

### homepage.purpose

_The workshop-and-mentoring phrase is bold. Source keys: purposeBefore purposeFocus purposeAfter._

**EN**

Your answers will help us adapt the upcoming AI workshop and mentoring sessions to your experience, business challenges and expectations.

**RO**

Răspunsurile tale ne vor ajuta să adaptăm workshopul AI și sesiunile de mentorat la experiența, provocările de business și așteptările tale.

### homepage.practical-information

_Source keys: time noTechnical._

**EN**

5–7 minutes · No technical knowledge required

**RO**

5–7 minute · Nu sunt necesare cunoștințe tehnice

### ui.start

**EN**

Start questionnaire

**RO**

Începe chestionarul

### ui.resume

**EN**

Continue the questionnaire

**RO**

Continuă chestionarul

### ui.noRight

**EN**

There are no right or wrong answers. We're interested in how you actually work today.

**RO**

Nu există răspunsuri corecte sau greșite. Ne interesează cum lucrezi în realitate astăzi.

### ui.artTitle

**EN**

YOUR EXPERIENCE.
YOUR NEXT STEP.

**RO**

EXPERIENȚA TA.
URMĂTORUL PAS.

### ui.artNote

**EN**

A WORKSHOP SHAPED AROUND YOU

**RO**

UN ATELIER ADAPTAT NEVOILOR TALE

The CTA appends → and opens the existing questionnaire directly. “Continue” appears when there is saved progress. The three cards reuse the section text in section 3.

## 2. Branding, shared navigation and privacy

### ui.caption

**EN**

RAIFFEISEN · AI WORKSHOP

**RO**

RAIFFEISEN · ATELIER AI

### ui.perspectives

**EN**

PERSPECTIVES FROM ROMANIA

**RO**

PERSPECTIVE DIN ROMÂNIA

### ui.skipContent

**EN**

Skip to content

**RO**

Mergi la conținut

### ui.admin

**EN**

Administration

**RO**

Administrare

### ui.tagline

**EN**

A clearer perspective. A step forward.

**RO**

O perspectivă mai clară. Un pas înainte.

### ui.preview

**EN**

PREVIEW

**RO**

PREVIZUALIZARE

### ui.previewNote

**EN**

Responses are not being collected yet

**RO**

Răspunsurile nu sunt colectate încă

### ui.privacy

**EN**

About your responses and privacy

**RO**

Despre răspunsuri și confidențialitate

### ui.privacyBody

**EN**

We do not ask for your name, email or company name. Responses are stored in Google Sheets and accessed through the protected admin area to prepare the workshop. A random browser session ID helps count visits and completions; the survey does not store your IP address. Saved progress expires after 7 days and is cleared from this browser when you next open the survey or submit. Avoid including personal or confidential business information.

**RO**

Nu cerem numele, emailul sau denumirea companiei. Răspunsurile sunt păstrate în Google Sheets și consultate în zona de administrare protejată, pentru pregătirea atelierului. Un identificator aleatoriu de sesiune ajută la numărarea vizitelor și completărilor; chestionarul nu stochează adresa IP. Progresul salvat expiră după 7 zile și este șters din browser la următoarea deschidere sau la trimitere. Evită informațiile personale sau confidențiale despre companie.

### ui.clear

**EN**

Clear saved progress

**RO**

Șterge progresul salvat

The tagline is hidden on the homepage but remains on the questionnaire screens. SIS logo text/alt text: **Social Innovation Solutions**. Footer topic: **AI & SMEs** / **AI & IMM-uri**.

### document.title

**EN**

AI & SMEs · Social Innovation Solutions

**RO**

AI & IMM-uri · Social Innovation Solutions

### language-switch.labels

_Visible abbreviation and accessible button name. Shared switch accessible label: Language / Limbă._

**EN**

EN · English

**RO**

RO · Română

### brand.accessible-link

_Uses ui.home._

**EN**

Social Innovation Solutions · Back to the introduction

**RO**

Social Innovation Solutions · Înapoi la prezentare

## 3. Section names and descriptions

### section.today.title

**EN**

Your AI today

**RO**

AI în activitatea ta de azi

### section.today.description

**EN**

Tools, access and habits

**RO**

Instrumente, acces și obiceiuri

### section.working.title

**EN**

How you work with AI

**RO**

Cum lucrezi cu AI

### section.working.description

**EN**

Your everyday experience

**RO**

Experiența ta de zi cu zi

### section.company.title

**EN**

AI in your company

**RO**

AI în compania ta

### section.company.description

**EN**

Business needs and the workshop

**RO**

Nevoi concrete și așteptări de la atelier

## 4. The eight questionnaire questions

Keep option IDs intact when editing wording. Changes in meaning, added/removed options or altered validation rules should be called out in a review note so existing records remain interpretable.

## Q1 — `ai_tools`

Type: multi. Required.

### ai_tools.question

**EN**

Which AI tools do you personally use today?

**RO**

Ce instrumente AI folosești personal în prezent?

### ai_tools.helper

**EN**

Select all that apply, then indicate how you access each tool.

**RO**

Selectează toate variantele care se aplică, apoi precizează cum ai acces la fiecare instrument.

### ai_tools.option.chatgpt

**EN**

ChatGPT

**RO**

ChatGPT

### ai_tools.option.claude

**EN**

Claude

**RO**

Claude

### ai_tools.option.gemini

**EN**

Gemini

**RO**

Gemini

### ai_tools.option.copilot

**EN**

Microsoft Copilot

**RO**

Microsoft Copilot

### ai_tools.option.perplexity

**EN**

Perplexity

**RO**

Perplexity

### ai_tools.option.other

**EN**

Other

**RO**

Alt instrument

### ai_tools.option.none

_Exclusive choice: clears the other selections._

**EN**

None

**RO**

Niciunul

Selecting Other reveals **ui.other**; name limit: 120 characters.

Each selected tool also has an access selector.

### tool-access.free

**EN**

Free

**RO**

Gratuit

### tool-access.paid_personally

**EN**

Paid personally

**RO**

Plătit personal

### tool-access.provided_by_company

**EN**

Provided by my company

**RO**

Oferit de companie

## Q2 — `ai_usage_frequency`

Type: single. Required.

### ai_usage_frequency.question

**EN**

How often do you use AI in a typical working week?

**RO**

Cât de des folosești AI într-o săptămână obișnuită de lucru?

Helper uses **ui.one** below.

### ai_usage_frequency.option.none

**EN**

I don’t use AI

**RO**

Nu folosesc AI

### ai_usage_frequency.option.less_than_weekly

**EN**

Less than once a week

**RO**

Mai rar de o dată pe săptămână

### ai_usage_frequency.option.few_times_weekly

**EN**

A few times a week

**RO**

De câteva ori pe săptămână

### ai_usage_frequency.option.daily

**EN**

Every working day

**RO**

În fiecare zi de lucru

### ai_usage_frequency.option.several_times_daily

**EN**

Several times a day

**RO**

De mai multe ori pe zi

### ai_usage_frequency.option.throughout_day

**EN**

AI is part of my workflow throughout much of the day

**RO**

AI face parte din modul meu de lucru în mare parte din zi

## Q3 — `desktop_ai_apps`

Type: multi. Required.

### desktop_ai_apps.question

**EN**

Which dedicated AI applications have you installed on your computer?

**RO**

Ce aplicații AI dedicate ai instalat pe computer?

Helper uses **ui.many** below.

### desktop_ai_apps.option.chatgpt_desktop

**EN**

ChatGPT desktop app

**RO**

Aplicația ChatGPT pentru desktop

### desktop_ai_apps.option.claude_desktop

**EN**

Claude desktop app

**RO**

Aplicația Claude pentru desktop

### desktop_ai_apps.option.copilot

**EN**

Microsoft Copilot

**RO**

Microsoft Copilot

### desktop_ai_apps.option.antigravity

**EN**

Google Antigravity

**RO**

Google Antigravity

### desktop_ai_apps.option.other

**EN**

Other AI application

**RO**

Altă aplicație AI

### desktop_ai_apps.option.browser_only

_Exclusive choice: clears the other selections._

**EN**

None — I access AI only through a web browser

**RO**

Niciuna — accesez AI doar din browser

### desktop_ai_apps.option.no_computer_ai

_Exclusive choice: clears the other selections._

**EN**

None — I don’t use AI on my computer

**RO**

Niciuna — nu folosesc AI pe computer

Selecting Other reveals **ui.other**; name limit: 120 characters.

## Q4 — `ai_working_mode`

Type: single. Optional if Q1 or Q2 says the participant does not use AI.

### ai_working_mode.question

**EN**

Which statement best describes how you usually work with AI today?

**RO**

Care afirmație descrie cel mai bine modul în care lucrezi de obicei cu AI?

Helper uses **ui.one** below.

### ai_working_mode.option.occasional_help

**EN**

Occasional help

**RO**

Ajutor ocazional

### ai_working_mode.option.occasional_help.description

**EN**

I mainly do the work myself and ask AI questions or use it for specific tasks when needed.

**RO**

În general, lucrez singur și pun întrebări AI sau îl folosesc pentru anumite sarcini, când am nevoie.

### ai_working_mode.option.ai_assistant

**EN**

AI assistant

**RO**

AI ca asistent

### ai_working_mode.option.ai_assistant.description

**EN**

I do the work myself, but AI frequently helps me write, search, analyse, summarize or generate ideas.

**RO**

Lucrez singur, dar AI mă ajută frecvent să scriu, să caut informații, să analizez, să rezum sau să generez idei.

### ai_working_mode.option.ai_first_some_tasks

**EN**

AI-first for some tasks

**RO**

Încep cu AI pentru unele sarcini

### ai_working_mode.option.ai_first_some_tasks.description

**EN**

For some work, I start with AI. I give it the objective and relevant information or files, let it produce the first result, then review and refine it.

**RO**

Pentru unele sarcini, încep cu AI. Îi dau obiectivul și informațiile sau fișierele relevante, îl las să producă un prim rezultat, apoi îl verific și îl îmbunătățesc.

### ai_working_mode.option.ai_first_default

**EN**

AI-first by default

**RO**

De regulă, încep cu AI

### ai_working_mode.option.ai_first_default.description

**EN**

Whenever appropriate, I ask AI to perform the work. My role is increasingly to set the objective, provide context, steer, review and make decisions rather than manually create or edit everything myself.

**RO**

Când este potrivit, îi cer AI să facă munca. Rolul meu este tot mai mult să stabilesc obiectivul, să ofer context, să ghidez, să verific și să iau decizii, în loc să creez sau să editez totul manual.

### ai_working_mode.option.multi_step_agentic

**EN**

Multi-step / agentic work

**RO**

Lucru în mai mulți pași / cu agenți AI

### ai_working_mode.option.multi_step_agentic.description

**EN**

I regularly let AI perform multi-step work across files, tools or processes and produce completed deliverables or execute parts of a workflow.

**RO**

Las în mod regulat AI să lucreze în mai mulți pași, folosind fișiere, instrumente sau procese, pentru a produce rezultate finale sau a executa părți dintr-un flux de lucru.

## Q5 — `ai_tasks_last_3_months`

Type: multi. Required.

### ai_tasks_last_3_months.question

**EN**

What have you personally asked AI to do during the last 3 months?

**RO**

Ce i-ai cerut personal AI să facă în ultimele 3 luni?

Helper uses **ui.many** below.

### ai_tasks_last_3_months.option.questions_search

**EN**

Ask questions or search for information

**RO**

Să răspundă la întrebări sau să caute informații

### ai_tasks_last_3_months.option.write_rewrite

**EN**

Write or rewrite text

**RO**

Să scrie sau să reformuleze texte

### ai_tasks_last_3_months.option.translate

**EN**

Translate content

**RO**

Să traducă materiale

### ai_tasks_last_3_months.option.analyse_documents

**EN**

Analyse a PDF or document

**RO**

Să analizeze un PDF sau un document

### ai_tasks_last_3_months.option.analyse_data

**EN**

Analyse a spreadsheet or business data

**RO**

Să analizeze un tabel sau date de afaceri

### ai_tasks_last_3_months.option.presentations

**EN**

Create a presentation

**RO**

Să creeze o prezentare

### ai_tasks_last_3_months.option.edit_files

**EN**

Create or modify files directly

**RO**

Să creeze sau să modifice direct fișiere

### ai_tasks_last_3_months.option.email_calendar

**EN**

Work with my email or calendar

**RO**

Să lucreze cu emailul sau calendarul meu

### ai_tasks_last_3_months.option.multi_step

**EN**

Execute a multi-step task

**RO**

Să execute o sarcină în mai mulți pași

### ai_tasks_last_3_months.option.recurring_automation

**EN**

Automate a recurring workflow

**RO**

Să automatizeze un proces recurent

### ai_tasks_last_3_months.option.build_app_agent

**EN**

Build an AI application or agent

**RO**

Să construiască o aplicație sau un agent AI

### ai_tasks_last_3_months.option.none

_Exclusive choice: clears the other selections._

**EN**

None of these

**RO**

Niciuna dintre acestea

## Q6 — `company_ai_adoption`

Type: single. Required.

### company_ai_adoption.question

**EN**

How is AI currently used in your company?

**RO**

Cum este folosit AI în prezent în compania ta?

Helper uses **ui.one** below.

### company_ai_adoption.option.not_used

**EN**

AI is not currently used

**RO**

AI nu este folosit în prezent

### company_ai_adoption.option.individual_experiments

**EN**

Individuals experiment with AI independently

**RO**

Unele persoane experimentează cu AI din proprie inițiativă

### company_ai_adoption.option.regular_employee_use

**EN**

Several employees regularly use AI tools

**RO**

Mai mulți angajați folosesc regulat instrumente AI

### company_ai_adoption.option.systematic_teams

**EN**

AI is systematically used in some teams or business processes

**RO**

AI este folosit sistematic în anumite echipe sau procese

### company_ai_adoption.option.production_workflows

**EN**

We have AI-powered workflows or automations in production

**RO**

Avem fluxuri de lucru sau automatizări cu AI folosite efectiv în activitate

### company_ai_adoption.option.embedded_core

**EN**

AI is embedded in our products, services or core operations

**RO**

AI este integrat în produsele, serviciile sau operațiunile noastre de bază

## Q7 — `tedious_task`

Type: text. Required. Current maximum: 3000 characters.

### tedious_task.question

**EN**

If AI could take one tedious or time-consuming task off your desk tomorrow, what would you choose?

**RO**

Dacă AI ar putea prelua mâine o sarcină plictisitoare sau care îți consumă mult timp, ce ai alege?

### tedious_task.helper

**EN**

Think about something repetitive, frustrating or time-consuming that you or your team currently do manually.

**RO**

Gândește-te la ceva repetitiv, frustrant sau care consumă mult timp și pe care tu sau echipa îl faceți acum manual.

## Q8 — `workshop_expectation`

Type: text. Required. Current maximum: 3000 characters.

### workshop_expectation.question

**EN**

What would you most like to learn or achieve during the AI workshop?

**RO**

Ce ți-ai dori cel mai mult să înveți sau să obții în cadrul atelierului de AI?

### workshop_expectation.helper

**EN**

You can mention a question, task, process or business problem you would particularly like us to address.

**RO**

Poți menționa o întrebare, o sarcină, un proces sau o problemă de afaceri pe care ai vrea să o abordăm.

## 5. Question controls, prompts and accessibility

### ui.journey

**EN**

YOUR QUESTIONNAIRE

**RO**

CHESTIONARUL TĂU

### ui.sidebarTitle

**EN**

A clearer picture
of your AI today.

**RO**

O imagine mai clară
despre AI în activitatea ta.

### ui.saved

**EN**

Your progress is saved in this browser. You can go back without losing your answers.

**RO**

Progresul se salvează în acest browser. Poți reveni fără să pierzi răspunsurile.

### ui.home

**EN**

Back to the introduction

**RO**

Înapoi la prezentare

### ui.question

**EN**

QUESTION

**RO**

ÎNTREBAREA

### ui.progress

**EN**

Progress

**RO**

Progres

### ui.one

**EN**

Select one option.

**RO**

Selectează o singură variantă.

### ui.many

**EN**

Select all that apply.

**RO**

Selectează toate variantele care se aplică.

### ui.other

**EN**

Other tool or application name

**RO**

Numele celuilalt instrument sau al aplicației

### ui.access

**EN**

How do you access

**RO**

Cum ai acces la

### ui.choose

**EN**

Choose access type

**RO**

Alege tipul de acces

### ui.textHint

**EN**

Up to 3,000 characters. Please avoid personal or confidential information.

**RO**

Cel mult 3.000 de caractere. Evită informațiile personale sau confidențiale.

### ui.placeholder

**EN**

Your answer…

**RO**

Răspunsul tău…

### ui.nonuser

**EN**

If you do not use AI yet, you can leave this question unanswered and continue.

**RO**

Dacă nu folosești încă AI, poți lăsa această întrebare fără răspuns și poți continua.

### ui.back

**EN**

Back

**RO**

Înapoi

### ui.next

**EN**

Next

**RO**

Continuă

### ui.review

**EN**

Review your answers

**RO**

Verifică răspunsurile

### ui.required

**EN**

Required

**RO**

Obligatoriu

### ui.optional

**EN**

Optional

**RO**

Opțional

### ui.skip

**EN**

Skip this question

**RO**

Lasă fără răspuns

### tool-access.composed-label

_Combines ui.access, selected option label and a question mark._

**EN**

How do you access {tool}?

**RO**

Cum ai acces la {tool}?

### progress.composed-label

_Percentage and section numbers are calculated, not editorial wording._

**EN**

QUESTION {number} / 8

**RO**

ÎNTREBAREA {number} / 8

## 6. Review, consent and submission

### ui.finalStep

**EN**

THE FINAL STEP

**RO**

ULTIMUL PAS

### ui.reviewTitle

**EN**

Does everything look right?

**RO**

Totul arată bine?

### ui.reviewIntro

**EN**

You can edit any answer before finishing.

**RO**

Poți modifica orice răspuns înainte de a încheia.

### ui.edit

**EN**

Edit

**RO**

Modifică

### ui.consent

**EN**

I have read the information about responses and privacy and agree to participate.

**RO**

Am citit informațiile despre răspunsuri și confidențialitate și sunt de acord să particip.

### ui.consentError

**EN**

Please confirm your agreement to participate.

**RO**

Confirmă acordul de participare.

### ui.previewReview

**EN**

This is a preview. No responses will be saved to Google Sheets.

**RO**

Aceasta este o previzualizare. Răspunsurile nu vor fi salvate în Google Sheets.

### ui.submit

**EN**

Submit answers

**RO**

Trimite răspunsurile

### ui.finishPreview

**EN**

Finish preview

**RO**

Încheie previzualizarea

### ui.saving

**EN**

Saving…

**RO**

Se salvează…

### ui.retry

**EN**

Try again

**RO**

Încearcă din nou

### review.empty-answer

**EN**

Not answered

**RO**

Fără răspuns

### review.edit-accessible-label

**EN**

Edit {number}

**RO**

Modifică {number}

## 7. Completion screens

### ui.received

**EN**

RESPONSE RECORDED

**RO**

RĂSPUNS ÎNREGISTRAT

### ui.savedTitle

**EN**

Thank you for your perspective.

**RO**

Îți mulțumim pentru perspectiva ta.

### ui.savedBody

**EN**

Your responses have been saved. They will help us prepare a workshop grounded in your real experience and business needs.

**RO**

Răspunsurile tale au fost salvate. Ne vor ajuta să pregătim un atelier bazat pe experiența ta reală și pe nevoile afacerii tale.

### ui.previewComplete

**EN**

PREVIEW COMPLETE

**RO**

PREVIZUALIZARE ÎNCHEIATĂ

### ui.previewTitle

**EN**

You have completed the preview.

**RO**

Ai încheiat previzualizarea.

### ui.previewBody

**EN**

You have explored all eight questions. Your test responses have not been submitted.

**RO**

Ai parcurs toate cele opt întrebări. Răspunsurile de test nu au fost trimise.

### ui.again

**EN**

Back to the introduction

**RO**

Înapoi la prezentare

## 8. Validation and recoverable errors

### ui.unavailable

**EN**

We could not save your response. Your answers are still saved in this browser. Please try again.

**RO**

Nu am putut salva răspunsul. Răspunsurile sunt păstrate în acest browser. Încearcă din nou.

### ui.versionError

**EN**

This questionnaire has changed. Please reload the page and review your answers.

**RO**

Chestionarul a fost actualizat. Reîncarcă pagina și verifică răspunsurile.

### ui.closed

**EN**

Collection is not currently open. Your answers remain saved in this browser.

**RO**

Colectarea răspunsurilor nu este deschisă momentan. Răspunsurile rămân salvate în acest browser.

### ui.invalid

**EN**

Please review your answers before submitting.

**RO**

Verifică răspunsurile înainte de trimitere.

### validation.required

**EN**

Please select an answer to continue.

**RO**

Selectează un răspuns pentru a continua.

### validation.text

**EN**

Please enter a response (up to 3,000 characters).

**RO**

Completează un răspuns de cel mult 3.000 de caractere.

### validation.selection

**EN**

Select at least one valid option. “None” cannot be combined with other choices.

**RO**

Selectează cel puțin o variantă validă. Opțiunile „Niciunul/Niciuna” nu pot fi combinate cu alte variante.

### validation.access

**EN**

Choose how you access each selected tool.

**RO**

Alege cum ai acces la fiecare instrument selectat.

### validation.other

**EN**

Enter the name of the other tool or application (up to 120 characters).

**RO**

Introdu numele celuilalt instrument sau al aplicației (cel mult 120 de caractere).

### validation.invalid

**EN**

Please review this answer.

**RO**

Verifică acest răspuns.

## 9. Administration — English only

Question/option labels reuse the English wording in sections 3–4. Respondent free text retains its original language. Numbers, timestamps, IDs and versions come from stored data.

### Page shell and login

- **page-shell-and-login.1**: Administration · Social Inno

- **page-shell-and-login.2**: RAIFFEISEN · AI WORKSHOP

- **page-shell-and-login.3**: ADMINISTRATION

- **page-shell-and-login.4**: Checking access…

- **page-shell-and-login.5**: Social Inno / Administration

- **page-shell-and-login.6**: Back to the survey ↗

- **page-shell-and-login.7**: RESTRICTED ACCESS

- **page-shell-and-login.8**: Welcome back.

- **page-shell-and-login.9**: Visits and responses to the Social Inno questionnaire.

- **page-shell-and-login.10**: Admin password

- **page-shell-and-login.11**: Sign in →

### Dashboard and storage status

- **dashboard-and-storage-status.1**: SOCIAL INNO · WORKSHOP PREPARATION

- **dashboard-and-storage-status.2**: From responses to insights.

- **dashboard-and-storage-status.3**: Updated at {time} · All collected data

- **dashboard-and-storage-status.4**: ↻ Refresh

- **dashboard-and-storage-status.5**: Sign out

- **dashboard-and-storage-status.6**: Google Sheets is not connected. Configure the service-account email and private key in Vercel to collect responses.

- **dashboard-and-storage-status.7**: Local demo mode · temporary data.

- **dashboard-and-storage-status.8**: Preview mode · visits and responses are not being collected.

### Metrics and recent activity

- **metrics-and-recent-activity.1**: Recorded visits

- **metrics-and-recent-activity.2**: Survey page views

- **metrics-and-recent-activity.3**: Browser sessions

- **metrics-and-recent-activity.4**: Distinct session IDs, not people

- **metrics-and-recent-activity.5**: Completed responses

- **metrics-and-recent-activity.6**: {currentResponses} v1 · {legacyResponses} legacy

- **metrics-and-recent-activity.7**: Completion rate

- **metrics-and-recent-activity.8**: Completed sessions / started sessions

- **metrics-and-recent-activity.9**: Personal AI usage frequency

- **metrics-and-recent-activity.10**: v1 responses only · frequency is shown separately from working style.

- **metrics-and-recent-activity.11**: Recent activity

- **metrics-and-recent-activity.12**: Visit

- **metrics-and-recent-activity.13**: Questionnaire started

- **metrics-and-recent-activity.14**: Visits will appear here once collection begins.

- **metrics-and-recent-activity.15**: No IP addresses are stored in these records.

### Response list, filters and export

- **response-list-filters-and-export.1**: Questionnaire responses

- **response-list-filters-and-export.2**: Download CSV ↓

- **response-list-filters-and-export.3**: Search responses

- **response-list-filters-and-export.4**: Search tools, working styles, workshop needs or response IDs…

- **response-list-filters-and-export.5**: Filter by company adoption

- **response-list-filters-and-export.6**: All responses

- **response-list-filters-and-export.7**: Legacy questionnaire

- **response-list-filters-and-export.8**: Received at

- **response-list-filters-and-export.9**: Usage

- **response-list-filters-and-export.10**: Tools / access

- **response-list-filters-and-export.11**: Working mode

- **response-list-filters-and-export.12**: Workshop opportunity

- **response-list-filters-and-export.13**: View response →

- **response-list-filters-and-export.14**: No responses to display. Responses appear after a confirmed submission.

- **response-list-filters-and-export.15**: Legacy

### Individual response

- **individual-response.1**: Individual response

- **individual-response.2**: Close

- **individual-response.3**: Response ID

- **individual-response.4**: Questionnaire version / language

- **individual-response.5**: Received at

- **individual-response.6**: Duration (including pauses)

- **individual-response.7**: {duration_seconds} seconds

- **individual-response.8**: Workshop preparation

- **individual-response.9**: Usage: {usage}

- **individual-response.10**: Working mode: {workingMode}

- **individual-response.11**: Company adoption: {companyAdoption}

- **individual-response.12**: Historical response · displayed using its original questionnaire version.

### Errors

- **errors.1**: Request failed. Please try again.

- **errors.2**: Incorrect password.

- **errors.3**: The admin service is temporarily unavailable. Please try again.

- **errors.4**: Administration is not configured.

- **errors.5**: Sign-in required.

## 10. Admin setup messages — English only

### admin.configuration.1

**EN**

ADMIN_PASSWORD is missing in this deployment. Set it in Vercel for this environment, then redeploy.

### admin.configuration.2

**EN**

ADMIN_PASSWORD must contain at least 12 characters. Update it in Vercel, then redeploy.

### admin.configuration.3

**EN**

SESSION_SECRET is missing in this deployment. Set a separate random secret of at least 32 characters in Vercel, then redeploy.

### admin.configuration.4

**EN**

SESSION_SECRET must contain at least 32 characters. It is separate from your admin password. Update it in Vercel, then redeploy.

These are configuration messages only. They contain variable names and length requirements, never the actual secret values.

## 11. Static metadata, loading fallbacks and technical API responses

### static.browser-title

_Initial HTML title; replaced by document.title after the application loads._

**EN**

Social Innovation Solutions · AI in Romanian SMEs

### static.meta-description

_Initial HTML. After loading, description combines ui.intro and homepage.purpose in the selected language._

**EN**

Tell us how you currently use AI so we can adapt the upcoming AI workshop and mentoring sessions to you and your business.

### static.loading

_Initial HTML fallback, before locale initialization._

**EN**

Loading the survey…

### static.brand-link

_Initial accessible link name before localization._

**EN**

Social Innovation Solutions, home

The respondent interface generally replaces these API-level messages with the bilingual messages in section 8; analytics failures are silent.

### api.message.1

**EN**

Method not allowed

### api.message.2

**EN**

Origin required

### api.message.3

**EN**

Origin not allowed

### api.message.4

**EN**

JSON required

### api.message.5

**EN**

Request too large

### api.message.6

**EN**

Invalid JSON

### api.message.7

**EN**

Invalid request

### api.message.8

**EN**

Response collection is not currently open.

### api.message.9

**EN**

Invalid event

### api.message.10

**EN**

The response could not be saved. Please try again.

### api.default-unavailable

_Default server fallback; not normally displayed verbatim in respondent UI._

**RO**

Serviciul nu este disponibil momentan. Răspunsurile tale sunt păstrate în acest browser. Încearcă din nou.

## 12. Unused translation entries — reference only

These remain in the source dictionary but are not currently displayed. Editing them will not make a new element appear; request a placement change explicitly if desired.

### unused.ui.questions

**EN**

questions

**RO**

întrebări

### unused.ui.sections

**EN**

short sections

**RO**

secțiuni scurte

### unused.ui.noName

**EN**

No name or email needed

**RO**

Fără nume sau email

### unused.ui.why

**EN**

BEFORE WE MEET

**RO**

ÎNAINTE SĂ NE ÎNTÂLNIM

### unused.ui.whyTitle

**EN**

Your experience shapes the workshop.

**RO**

Experiența ta dă direcția atelierului.

### unused.ui.whyBody

**EN**

Your answers will help the Lead AI Expert prepare the mentoring programme and our 3-hour AI workshop around real business needs.

**RO**

Răspunsurile tale îl ajută pe expertul AI coordonator să pregătească programul de mentorat și atelierul de AI de 3 ore pornind de la nevoi reale de afaceri.

### unused.ui.simple

**EN**

No technical knowledge is needed. Simply describe your current situation.

**RO**

Nu ai nevoie de cunoștințe tehnice. Descrie pur și simplu situația ta actuală.

### unused.ui.loading

**EN**

Loading the questionnaire…

**RO**

Se încarcă chestionarul…

## Editorial notes

Add any instructions about emphasis, layout, deleting elements or translating one language here.

REVIEW NOTE:
