# Website text — review and editing master

Updated: 24 September 2026 · Base website source commit: `74c40d0`; updated with participant identification · Questionnaire: `2026-09-data-decisions-v3`.

Edit the wording directly under **EN** and **RO**, then ask Codex to apply this file to the website. Keep the headings/IDs so each edit can be mapped back to its source. You can edit just one language and add a note asking for the other to be translated. Add editorial notes as `REVIEW NOTE: ...`.

This is a review document, not a live configuration file: edits here do not change the website automatically. No passwords, credentials or participant responses are included. Braces such as `{time}` identify dynamic values, not literal copy. Arrows/icons are added by the interface.

Scope: current homepage, ten main questions, respondent interface, privacy, validation, confirmation, English administration and technical messages. Old questionnaire versions used only for historical records are excluded; they should retain their original wording. Unused translation entries are separated at the end.

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

Răspunsurile tale ne vor ajuta să adaptăm workshopul de AI și sesiunile de mentorat la experiența, provocările de business și așteptările tale.

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
PASUL TĂU URMĂTOR.

### ui.artNote

**EN**

A WORKSHOP SHAPED AROUND YOU

**RO**

UN WORKSHOP ADAPTAT NEVOILOR TALE

The CTA appends → and opens the participant identification form before the ten main questions. “Continue” appears when there is saved progress. The three cards reuse the section text in section 3.

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

Sari la conținut

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

We collect your first name, family name and company name to identify you as a program participant and connect your responses to you and your business. These details and your answers are stored together in Google Sheets and accessed through the protected admin area to prepare your workshop and mentoring sessions. A random browser session ID helps count visits and completions; the survey does not store your IP address. Your details and progress are saved in this browser. This saved draft expires after 7 days and is cleared from this browser when you next open the survey or submit. Please do not include other personal or confidential business information in your free-text answers.

**RO**

Colectăm prenumele, numele de familie și denumirea companiei pentru a te identifica drept participant la program și a asocia răspunsurile cu tine și cu afacerea ta. Aceste date și răspunsurile tale sunt păstrate împreună în Google Sheets și consultate în zona de administrare protejată pentru pregătirea workshopului și a sesiunilor de mentorat. Un ID de sesiune generat aleatoriu în browser ne ajută să numărăm vizitele și completările; chestionarul nu stochează adresa ta IP. Datele și progresul tău sunt salvate în acest browser. Această ciornă expiră după 7 zile: este ștearsă la prima deschidere a chestionarului după expirare sau imediat după trimiterea răspunsurilor. Nu include alte date personale sau informații confidențiale despre companie în câmpurile de text liber.

### ui.clear

**EN**

Clear saved details and progress

**RO**

Șterge datele și progresul salvate

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

Social Innovation Solutions · Înapoi la pagina de start

## Participant identification — before Q1

Required first name, family name and company name. These are participant metadata, separate from the ten main survey questions. Details are included in review, stored with the response and displayed in the English admin dashboard.

### ui.participantTitle

**EN**

Tell us who you are

**RO**

Spune-ne cine ești

### ui.participantIntro

**EN**

Please enter your details so we can connect your answers to you and your company and prepare your workshop and mentoring sessions.

**RO**

Completează-ți datele ca să putem asocia răspunsurile cu tine și cu compania ta și să pregătim workshopul și sesiunile de mentorat.

### ui.participantHeading

**EN**

PARTICIPANT DETAILS

**RO**

DATELE PARTICIPANTULUI

### ui.participantContinue

**EN**

Continue to the questionnaire

**RO**

Continuă la chestionar

### ui.participantReview

**EN**

Participant details

**RO**

Datele participantului

### ui.participantSave

**EN**

Back to review

**RO**

Înapoi la verificare

### participant.first_name

**EN**

First name

**RO**

Prenume

### participant.family_name

**EN**

Family name

**RO**

Nume de familie

### participant.company_name

**EN**

Company name

**RO**

Denumirea companiei

### participant.validation

**EN**

Enter your first name, family name (up to 100 characters each) and company name (up to 200 characters).

**RO**

Completează prenumele, numele de familie (maximum 100 de caractere fiecare) și denumirea companiei (maximum 200 de caractere).

### Admin identity labels (English only)

- First name
- Family name
- Company name
- Participant / company
- Not provided
- Search names, companies, tools or workshop needs…

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

## 4. Questionnaire — Data to Decisions revision

Ten main questions and two conditional follow-ups. Q7a requires an alternative topic when selected; Q8a dataset type is optional. Q10 is optional.

### workshopTheme.title

**EN**

AI for Business: From Data to Decisions

**RO**

AI pentru afaceri: de la date la decizii

### workshopTheme.subtitle

**EN**

Bring your own business data. Use AI to analyse it, understand it and decide what to do next.

**RO**

Vino cu date din propria afacere. Folosește AI pentru a le analiza, a le înțelege și a decide ce urmează.

### workshopTheme.body

**EN**

The practical session would show how AI can help you explore real business data, identify patterns and drivers, create useful analyses and visualisations, and support better business decisions.

**RO**

Sesiunea practică ar arăta cum te poate ajuta AI să explorezi date reale de business, să identifici tipare și factori determinanți, să creezi analize și vizualizări utile și să iei decizii de business mai bine fundamentate.

### Q1 — ai_tools

**EN**

Which AI tools do you personally use today?

**RO**

Ce instrumente AI folosești personal în prezent?

### ai_tools.helper

**EN**

Select all that apply, then indicate how you access each tool.

**RO**

Selectează toate variantele potrivite, apoi precizează cum ai acces la fiecare instrument.

### ai_tools.chatgpt

**EN**

ChatGPT

**RO**

ChatGPT

### ai_tools.claude

**EN**

Claude

**RO**

Claude

### ai_tools.gemini

**EN**

Gemini

**RO**

Gemini

### ai_tools.copilot

**EN**

Microsoft Copilot

**RO**

Microsoft Copilot

### ai_tools.perplexity

**EN**

Perplexity

**RO**

Perplexity

### ai_tools.other

**EN**

Other

**RO**

Alt instrument

### ai_tools.none

**EN**

None

**RO**

Niciunul

### Q2 — ai_usage_frequency

**EN**

How often do you use AI in a typical working week?

**RO**

Cât de des folosești AI într-o săptămână obișnuită de lucru?

### ai_usage_frequency.none

**EN**

I don’t use AI

**RO**

Nu folosesc AI

### ai_usage_frequency.less_than_weekly

**EN**

Less than once a week

**RO**

Mai rar de o dată pe săptămână

### ai_usage_frequency.few_times_weekly

**EN**

A few times a week

**RO**

De câteva ori pe săptămână

### ai_usage_frequency.daily

**EN**

Every working day

**RO**

În fiecare zi de lucru

### ai_usage_frequency.several_times_daily

**EN**

Several times a day

**RO**

De mai multe ori pe zi

### ai_usage_frequency.throughout_day

**EN**

AI is part of my workflow throughout much of the day

**RO**

AI face parte din fluxul meu de lucru o mare parte din zi

### Q3 — ai_data_access

**EN**

Does your AI have access to your work files or data?

**RO**

Instrumentele AI pe care le folosești au acces la fișierele sau datele tale de lucru?

### Q3 helper

**EN**

We mean that you have connected or granted AI access to files, folders, cloud storage or other work sources — rather than manually uploading one file at a time. Select all that apply.

**RO**

Adică ai conectat AI-ul la fișiere, foldere, stocare în cloud sau alte surse de lucru ori i-ai dat acces la ele — nu doar încarci manual câte un fișier. Selectează toate variantele potrivite.

### ai_data_access.manual_chat

**EN**

No — I mainly use AI through chat and provide information manually

**RO**

Nu — folosesc AI în principal prin chat și introduc manual informațiile

### ai_data_access.manual_upload

**EN**

I manually upload files when I need AI to work with them

**RO**

Încarc manual fișiere când am nevoie ca AI să lucreze cu ele

### ai_data_access.cloud_storage

**EN**

Yes — AI can access some of my cloud files or storage

**RO**

Da — AI poate accesa o parte din fișierele sau spațiile mele de stocare în cloud

### Description

**EN**

e.g. Google Drive, Dropbox, OneDrive

**RO**

de exemplu, Google Drive, Dropbox, OneDrive

### ai_data_access.local_files

**EN**

Yes — AI can access files or folders on my computer

**RO**

Da — AI poate accesa fișiere sau foldere de pe computerul meu

### ai_data_access.work_applications

**EN**

Yes — AI is connected to other work applications or company data

**RO**

Da — AI este conectat la alte aplicații de lucru sau la datele companiei

### ai_data_access.not_sure

**EN**

I'm not sure

**RO**

Nu sunt sigur(ă)

### Q4 — ai_working_mode

**EN**

Which statement best describes how you usually work with AI today?

**RO**

Care afirmație descrie cel mai bine modul în care lucrezi de obicei cu AI?

### ai_working_mode.occasional_help

**EN**

Occasional help

**RO**

Ajutor ocazional

### ai_working_mode.occasional_help.description

**EN**

I mainly do the work myself and ask AI questions or use it for specific tasks when needed.

**RO**

Fac eu cea mai mare parte a muncii și, când am nevoie, îi pun întrebări AI-ului sau îl folosesc pentru sarcini punctuale.

### ai_working_mode.ai_assistant

**EN**

AI assistant

**RO**

AI ca asistent

### ai_working_mode.ai_assistant.description

**EN**

I do the work myself, but AI frequently helps me write, search, analyse, summarize or generate ideas.

**RO**

Fac eu munca, dar AI mă ajută frecvent să scriu, să caut informații, să analizez, să rezum sau să generez idei.

### ai_working_mode.ai_first_some_tasks

**EN**

AI-first for some tasks

**RO**

AI-first pentru unele sarcini

### ai_working_mode.ai_first_some_tasks.description

**EN**

For some work, I start with AI. I give it the objective and relevant information or files, let it produce the first result, then review and refine it.

**RO**

Pentru unele sarcini, pornesc de la AI: îi dau obiectivul și informațiile sau fișierele relevante, îl las să producă prima variantă, apoi o verific și o îmbunătățesc.

### ai_working_mode.ai_first_default

**EN**

AI-first by default

**RO**

AI-first, de regulă

### ai_working_mode.ai_first_default.description

**EN**

Whenever appropriate, I ask AI to perform the work. My role is increasingly to set the objective, provide context, steer, review and make decisions rather than manually create or edit everything myself.

**RO**

Ori de câte ori are sens, îi cer AI-ului să facă munca. Rolul meu este tot mai mult să stabilesc obiectivul, să dau context, să ghidez, să verific și să decid, în loc să creez sau să editez totul manual.

### ai_working_mode.multi_step_agentic

**EN**

Multi-step / agentic work

**RO**

Lucru în mai mulți pași / cu agenți AI

### ai_working_mode.multi_step_agentic.description

**EN**

I regularly let AI perform multi-step work across files, tools or processes and produce completed deliverables or execute parts of a workflow.

**RO**

Las în mod regulat AI-ul să execute sarcini în mai mulți pași, lucrând cu fișiere, instrumente sau procese, pentru a livra rezultate finalizate sau a executa părți dintr-un flux de lucru.

### Q5 — ai_tasks_last_3_months

**EN**

What have you personally asked AI to do during the last 3 months?

**RO**

Ce i-ai cerut tu AI-ului să facă în ultimele 3 luni?

### ai_tasks_last_3_months.questions_search

**EN**

Ask questions or search for information

**RO**

Să răspundă la întrebări sau să caute informații

### ai_tasks_last_3_months.write_rewrite

**EN**

Write or rewrite text

**RO**

Să scrie sau să reformuleze texte

### ai_tasks_last_3_months.translate

**EN**

Translate content

**RO**

Să traducă conținut

### ai_tasks_last_3_months.analyse_documents

**EN**

Analyse a PDF or document

**RO**

Să analizeze un PDF sau un document

### ai_tasks_last_3_months.analyse_data

**EN**

Analyse a spreadsheet or business data

**RO**

Să analizeze un spreadsheet sau date de business

### ai_tasks_last_3_months.presentations

**EN**

Create a presentation

**RO**

Să creeze o prezentare

### ai_tasks_last_3_months.edit_files

**EN**

Create or modify files directly

**RO**

Să creeze sau să modifice direct fișiere

### ai_tasks_last_3_months.email_calendar

**EN**

Work with my email or calendar

**RO**

Să lucreze cu emailul sau calendarul meu

### ai_tasks_last_3_months.multi_step

**EN**

Execute a multi-step task

**RO**

Să execute o sarcină în mai mulți pași

### ai_tasks_last_3_months.recurring_automation

**EN**

Automate a recurring workflow

**RO**

Să automatizeze un flux de lucru recurent

### ai_tasks_last_3_months.build_app_agent

**EN**

Build an AI application or agent

**RO**

Să construiască o aplicație sau un agent AI

### ai_tasks_last_3_months.none

**EN**

None of these

**RO**

Niciuna dintre acestea

### Q6 — company_ai_adoption

**EN**

How is AI currently used in your company?

**RO**

Cum este folosit AI în prezent în compania ta?

### company_ai_adoption.not_used

**EN**

AI is not currently used

**RO**

AI nu este folosit în prezent

### company_ai_adoption.individual_experiments

**EN**

Individuals experiment with AI independently

**RO**

Unele persoane experimentează cu AI din proprie inițiativă

### company_ai_adoption.regular_employee_use

**EN**

Several employees regularly use AI tools

**RO**

Mai mulți angajați folosesc regulat instrumente AI

### company_ai_adoption.systematic_teams

**EN**

AI is systematically used in some teams or business processes

**RO**

AI este folosit sistematic în anumite echipe sau procese de business

### company_ai_adoption.production_workflows

**EN**

We have AI-powered workflows or automations in production

**RO**

Avem în producție fluxuri de lucru sau automatizări bazate pe AI

### company_ai_adoption.embedded_core

**EN**

AI is embedded in our products, services or core operations

**RO**

AI este integrat în produsele, serviciile sau operațiunile noastre de bază

### Q7 — data_to_decisions_interest

**EN**

How useful would this workshop theme be for you and your company?

**RO**

Cât de utilă ar fi această temă de workshop pentru tine și compania ta?

### data_to_decisions_interest.very_useful

**EN**

Very useful — I would definitely like to work on this

**RO**

Foarte utilă — cu siguranță aș vrea să lucrăm pe această temă

### data_to_decisions_interest.useful

**EN**

Useful — this is relevant to my business

**RO**

Utilă — este relevantă pentru afacerea mea

### data_to_decisions_interest.possibly_useful

**EN**

Possibly useful — depending on the example or data

**RO**

Posibil utilă — depinde de exemplu sau de date

### data_to_decisions_interest.not_relevant

**EN**

Not particularly relevant to my current priorities

**RO**

Nu este foarte relevantă pentru prioritățile mele actuale

### data_to_decisions_interest.another_topic

**EN**

I would prefer another AI topic

**RO**

Aș prefera o altă temă legată de AI

### Q7a — workshop_preferred_topic

**EN**

What would you prefer to work on?

**RO**

Pe ce temă ai prefera să lucrăm?

Shown when data_to_decisions_interest is another_topic.

### Q8 — workshop_dataset_readiness

**EN**

Could you bring a real business dataset to use during the workshop?

**RO**

Ai putea aduce un set de date reale din afacerea ta pentru a-l folosi în workshop?

### workshop_dataset_readiness.helper

**EN**

A simple Excel or CSV file is enough. The dataset does not need to be large or sophisticated.

**RO**

Un simplu fișier Excel sau CSV este suficient. Setul de date nu trebuie să fie mare sau complex.

### workshop_dataset_readiness.yes

**EN**

Yes — I already know which dataset I would bring

**RO**

Da — știu deja ce set de date aș aduce

### workshop_dataset_readiness.probably

**EN**

Probably — I need to identify or prepare it

**RO**

Probabil — trebuie să îl identific sau să îl pregătesc

### workshop_dataset_readiness.maybe

**EN**

Maybe — I would need help choosing an appropriate dataset

**RO**

Poate — aș avea nevoie de ajutor pentru a alege un set de date potrivit

### workshop_dataset_readiness.cannot_use_company_data

**EN**

No — I cannot use company data for this exercise

**RO**

Nu — nu pot folosi datele companiei pentru acest exercițiu

### workshop_dataset_readiness.no_suitable_dataset

**EN**

No — I don’t currently have a suitable dataset

**RO**

Nu — momentan nu am un set de date potrivit

### Q8a — workshop_dataset_type

**EN**

What kind of data could you bring?

**RO**

Ce fel de date ai putea aduce?

Shown when workshop_dataset_readiness is yes / probably / maybe.

### workshop_dataset_type.sales

**EN**

Sales

**RO**

Vânzări

### workshop_dataset_type.customers

**EN**

Customers

**RO**

Clienți

### workshop_dataset_type.finance

**EN**

Finance

**RO**

Finanțe

### workshop_dataset_type.marketing

**EN**

Marketing

**RO**

Marketing

### workshop_dataset_type.operations

**EN**

Operations

**RO**

Operațiuni

### workshop_dataset_type.inventory

**EN**

Inventory

**RO**

Stocuri

### workshop_dataset_type.production

**EN**

Production

**RO**

Producție

### workshop_dataset_type.logistics

**EN**

Logistics

**RO**

Logistică

### workshop_dataset_type.hr

**EN**

HR

**RO**

Resurse umane

### workshop_dataset_type.projects_services

**EN**

Projects & services

**RO**

Proiecte și servicii

### workshop_dataset_type.other

**EN**

Other

**RO**

Altele

### Q9 — business_data_question

**EN**

If you could ask one important question about your business and have AI analyse your data to help answer it, what would you ask?

**RO**

Dacă ai putea pune o singură întrebare importantă despre afacerea ta, iar AI ți-ar analiza datele ca să te ajute să găsești răspunsul, ce ai întreba?

### business_data_question.helper

**EN**

These are only examples — please use a question that matters to your own business.

**RO**

Acestea sunt doar exemple — alege o întrebare care contează pentru afacerea ta.

### business_data_question.example.1

**EN**

Why did our margin decline?

**RO**

De ce ne-a scăzut marja?

### business_data_question.example.2

**EN**

Which customers are most valuable?

**RO**

Care sunt clienții noștri cei mai valoroși?

### business_data_question.example.3

**EN**

What drives our sales?

**RO**

Ce factori ne influențează vânzările?

### business_data_question.example.4

**EN**

Where are our operational bottlenecks?

**RO**

Unde apar blocaje în operațiunile noastre?

### business_data_question.example.5

**EN**

Which products are underperforming?

**RO**

Ce produse au rezultate sub așteptări?

### Q10 — workshop_other_expectation

**EN**

Is there anything else you would particularly like us to cover during the AI workshop?

**RO**

Mai este ceva ce ți-ai dori în mod special să abordăm în workshopul de AI?

### workshop_other_expectation.helper

**EN**

You can mention another AI topic, task, process, business problem or question that you would particularly like us to address.

**RO**

Poți menționa o altă temă legată de AI, o sarcină, un proces, o problemă de business sau o întrebare pe care ai vrea să o abordăm.

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

Progresul se salvează în acest browser. Poți reveni la întrebările anterioare fără să pierzi răspunsurile.

### ui.home

**EN**

Back to the introduction

**RO**

Înapoi la pagina de start

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

Selectează toate variantele potrivite.

### ui.other

**EN**

Other tool or application name

**RO**

Numele instrumentului sau al aplicației

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

Maximum 3.000 de caractere. Evită informațiile personale sau confidențiale.

### ui.placeholder

**EN**

Your answer…

**RO**

Răspunsul tău…

### ui.nonuser

**EN**

If you do not use AI yet, you can leave this question unanswered and continue.

**RO**

Dacă nu folosești încă AI, poți sări peste această întrebare.

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

Sari peste această întrebare

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

Totul este corect?

### ui.reviewIntro

**EN**

Select Edit to view or change a full answer before finishing.

**RO**

Apasă „Modifică” pentru a vedea integral sau a schimba un răspuns înainte de trimitere.

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

Îți mulțumim că ți-ai împărtășit perspectiva.

### ui.savedBody

**EN**

Your responses have been saved. They will help us prepare a workshop grounded in your real experience and business needs.

**RO**

Răspunsurile tale au fost salvate. Ne vor ajuta să pregătim un workshop construit pe experiența ta reală și pe nevoile afacerii tale.

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

You have explored all ten main questions. Your test responses have not been submitted.

**RO**

Ai parcurs toate cele opt întrebări. Răspunsurile de test nu au fost trimise.

### ui.again

**EN**

Back to the introduction

**RO**

Înapoi la pagina de start

## 8. Validation and recoverable errors

### ui.unavailable

**EN**

We could not save your response. Your answers are still saved in this browser. Please try again.

**RO**

Nu am putut salva răspunsurile. Ele sunt păstrate în continuare în acest browser. Încearcă din nou.

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

Scrie un răspuns (maximum 3.000 de caractere).

### validation.selection

**EN**

Select at least one valid option. “None” cannot be combined with other choices.

**RO**

Selectează cel puțin o variantă validă. Varianta „Niciunul” / „Niciuna dintre acestea” nu poate fi combinată cu alte variante.

### validation.access

**EN**

Choose how you access each selected tool.

**RO**

Alege cum ai acces la fiecare instrument selectat.

### validation.other

**EN**

Enter the name of the other tool or application (up to 120 characters).

**RO**

Introdu numele instrumentului sau al aplicației (maximum 120 de caractere).

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

- **metrics-and-recent-activity.6**: {currentResponses} current · {legacyResponses} legacy

- **metrics-and-recent-activity.7**: Completion rate

- **metrics-and-recent-activity.8**: Completed sessions / started sessions

- **metrics-and-recent-activity.9**: Personal AI usage frequency

- **metrics-and-recent-activity.10**: Current questionnaire responses only · frequency is shown separately from working style.

- **metrics-and-recent-activity.11**: Recent activity

- **metrics-and-recent-activity.12**: Visit

- **metrics-and-recent-activity.13**: Questionnaire started

- **metrics-and-recent-activity.14**: Visits will appear here once collection begins.

- **metrics-and-recent-activity.15**: No IP addresses are stored in these records.

### Response list, filters and export

- **response-list-filters-and-export.1**: Questionnaire responses

- **response-list-filters-and-export.2**: Download CSV ↓

- **response-list-filters-and-export.3**: Search responses

- **response-list-filters-and-export.4**: Search names, companies, tools or workshop needs…

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

For program participants

**RO**

Pentru participanții la program

### unused.ui.why

**EN**

BEFORE WE MEET

**RO**

ÎNAINTE SĂ NE ÎNTÂLNIM

### unused.ui.whyTitle

**EN**

Your experience shapes the workshop.

**RO**

Experiența ta dă direcția workshopului.

### unused.ui.whyBody

**EN**

Your answers will help the Lead AI Expert prepare the mentoring programme and our 3-hour AI workshop around real business needs.

**RO**

Răspunsurile tale îl vor ajuta pe Lead AI Expert să pregătească programul de mentorat și workshopul de AI de 3 ore pornind de la nevoi reale de business.

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

### ui.proposedTheme

**EN**

Proposed workshop theme

**RO**

Tema propusă pentru workshop


### ui.examples

**EN**

For example:

**RO**

De exemplu:


### ui.dataOther

**EN**

Other data type

**RO**

Alt tip de date


### ui.datasetNotice

**EN**

For the workshop, participants should use an appropriately sanitized or anonymized dataset. Do not include passwords, credentials, unnecessary personal data, or confidential information that should not be shared with the AI environment used during the session.

**RO**

Pentru workshop, participanții ar trebui să folosească un set de date curățat de informații sensibile sau anonimizat corespunzător. Nu include parole, credențiale, date personale inutile sau informații confidențiale care nu ar trebui partajate cu platforma AI folosită în sesiune.
