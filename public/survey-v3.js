const l = (en, ro) => ({ en, ro });
const option = (value, en, ro, extra = {}) => ({ value, label: l(en, ro), ...extra });
const question = (id, section, type, en, ro, options, extra = {}) => ({ id, section, type, label: l(en, ro), required: true, ...(options ? { options } : {}), ...extra });
export const accessTypes = [option('free','Free','Gratuit'),option('paid_personally','Paid personally','Plătit de mine'),option('provided_by_company','Provided by my company','Oferit de compania mea')];
export const survey = {
  version: '2026-09-data-decisions-v3', draft: false,
  sections: [
    { id: 'today', title: l('Your AI today','AI în activitatea ta de azi'), description: l('Tools, access and habits','Instrumente, acces și obiceiuri') },
    { id: 'working', title: l('How you work with AI','Cum lucrezi cu AI'), description: l('Your everyday experience','Experiența ta de zi cu zi') },
    { id: 'company', title: l('AI in your company','AI în compania ta'), description: l('AI adoption in your business','Adoptarea AI în afacerea ta') },
    { id: 'workshop', title: l('Shaping the workshop','Pregătirea workshopului'), description: l('From data to decisions','De la date la decizii') }
  ],
  questions: [
    question('ai_tools','today','multi','Which AI tools do you personally use today?','Ce instrumente AI folosești personal în prezent?',[
      ...['ChatGPT','Claude','Gemini','Microsoft Copilot','Perplexity'].map((name,i)=>option(['chatgpt','claude','gemini','copilot','perplexity'][i],name,name)),
      option('other','Other','Alt instrument'), option('none','None','Niciunul',{exclusive:true})
    ],{structured:true,access:true,other:true,helper:l('Select all that apply, then indicate how you access each tool.','Selectează toate variantele potrivite, apoi precizează cum ai acces la fiecare instrument.')}),
    question('ai_usage_frequency','today','single','How often do you use AI in a typical working week?','Cât de des folosești AI într-o săptămână obișnuită de lucru?',[
      option('none',"I don’t use AI",'Nu folosesc AI'),option('less_than_weekly','Less than once a week','Mai rar de o dată pe săptămână'),option('few_times_weekly','A few times a week','De câteva ori pe săptămână'),option('daily','Every working day','În fiecare zi de lucru'),option('several_times_daily','Several times a day','De mai multe ori pe zi'),option('throughout_day','AI is part of my workflow throughout much of the day','AI face parte din fluxul meu de lucru o mare parte din zi')
    ]),
    question('ai_data_access','today','multi','Does your AI have access to your work files or data?','Instrumentele AI pe care le folosești au acces la fișierele sau datele tale de lucru?',[
      option('manual_chat','No — I mainly use AI through chat and provide information manually','Nu — folosesc AI în principal prin chat și introduc manual informațiile'),
      option('manual_upload','I manually upload files when I need AI to work with them','Încarc manual fișiere când am nevoie ca AI să lucreze cu ele'),
      option('cloud_storage','Yes — AI can access some of my cloud files or storage','Da — AI poate accesa o parte din fișierele sau spațiile mele de stocare în cloud',{description:l('e.g. Google Drive, Dropbox, OneDrive','de exemplu, Google Drive, Dropbox, OneDrive')}),
      option('local_files','Yes — AI can access files or folders on my computer','Da — AI poate accesa fișiere sau foldere de pe computerul meu'),
      option('work_applications','Yes — AI is connected to other work applications or company data','Da — AI este conectat la alte aplicații de lucru sau la datele companiei'),
      option('not_sure',"I'm not sure",'Nu sunt sigur(ă)')
    ],{helper:l('We mean that you have connected or granted AI access to files, folders, cloud storage or other work sources — rather than manually uploading one file at a time. Select all that apply.','Adică ai conectat AI-ul la fișiere, foldere, stocare în cloud sau alte surse de lucru ori i-ai dat acces la ele — nu doar încarci manual câte un fișier. Selectează toate variantele potrivite.')}),
    question('ai_working_mode','working','single','Which statement best describes how you usually work with AI today?','Care afirmație descrie cel mai bine modul în care lucrezi de obicei cu AI?',[
      option('occasional_help','Occasional help','Ajutor ocazional',{description:l('I mainly do the work myself and ask AI questions or use it for specific tasks when needed.','Fac eu cea mai mare parte a muncii și, când am nevoie, îi pun întrebări AI-ului sau îl folosesc pentru sarcini punctuale.')}),
      option('ai_assistant','AI assistant','AI ca asistent',{description:l('I do the work myself, but AI frequently helps me write, search, analyse, summarize or generate ideas.','Fac eu munca, dar AI mă ajută frecvent să scriu, să caut informații, să analizez, să rezum sau să generez idei.')}),
      option('ai_first_some_tasks','AI-first for some tasks','AI-first pentru unele sarcini',{description:l('For some work, I start with AI. I give it the objective and relevant information or files, let it produce the first result, then review and refine it.','Pentru unele sarcini, pornesc de la AI: îi dau obiectivul și informațiile sau fișierele relevante, îl las să producă prima variantă, apoi o verific și o îmbunătățesc.')}),
      option('ai_first_default','AI-first by default','AI-first, de regulă',{description:l('Whenever appropriate, I ask AI to perform the work. My role is increasingly to set the objective, provide context, steer, review and make decisions rather than manually create or edit everything myself.','Ori de câte ori are sens, îi cer AI-ului să facă munca. Rolul meu este tot mai mult să stabilesc obiectivul, să dau context, să ghidez, să verific și să decid, în loc să creez sau să editez totul manual.')}),
      option('multi_step_agentic','Multi-step / agentic work','Lucru în mai mulți pași / cu agenți AI',{description:l('I regularly let AI perform multi-step work across files, tools or processes and produce completed deliverables or execute parts of a workflow.','Las în mod regulat AI-ul să execute sarcini în mai mulți pași, lucrând cu fișiere, instrumente sau procese, pentru a livra rezultate finalizate sau a executa părți dintr-un flux de lucru.')})
    ],{optionalForNonUsers:true}),
    question('ai_tasks_last_3_months','working','multi','What have you personally asked AI to do during the last 3 months?','Ce i-ai cerut tu AI-ului să facă în ultimele 3 luni?',[
      option('questions_search','Ask questions or search for information','Să răspundă la întrebări sau să caute informații'),option('write_rewrite','Write or rewrite text','Să scrie sau să reformuleze texte'),option('translate','Translate content','Să traducă conținut'),option('analyse_documents','Analyse a PDF or document','Să analizeze un PDF sau un document'),option('analyse_data','Analyse a spreadsheet or business data','Să analizeze un spreadsheet sau date de business'),option('presentations','Create a presentation','Să creeze o prezentare'),option('edit_files','Create or modify files directly','Să creeze sau să modifice direct fișiere'),option('email_calendar','Work with my email or calendar','Să lucreze cu emailul sau calendarul meu'),option('multi_step','Execute a multi-step task','Să execute o sarcină în mai mulți pași'),option('recurring_automation','Automate a recurring workflow','Să automatizeze un flux de lucru recurent'),option('build_app_agent','Build an AI application or agent','Să construiască o aplicație sau un agent AI'),option('none','None of these','Niciuna dintre acestea',{exclusive:true})
    ]),
    question('company_ai_adoption','company','single','How is AI currently used in your company?','Cum este folosit AI în prezent în compania ta?',[
      option('not_used','AI is not currently used','AI nu este folosit în prezent'),option('individual_experiments','Individuals experiment with AI independently','Unele persoane experimentează cu AI din proprie inițiativă'),option('regular_employee_use','Several employees regularly use AI tools','Mai mulți angajați folosesc regulat instrumente AI'),option('systematic_teams','AI is systematically used in some teams or business processes','AI este folosit sistematic în anumite echipe sau procese de business'),option('production_workflows','We have AI-powered workflows or automations in production','Avem în producție fluxuri de lucru sau automatizări bazate pe AI'),option('embedded_core','AI is embedded in our products, services or core operations','AI este integrat în produsele, serviciile sau operațiunile noastre de bază')
    ]),
    question('data_to_decisions_interest','workshop','single','How useful would this workshop theme be for you and your company?','Cât de utilă ar fi această temă de workshop pentru tine și compania ta?',[
      option('very_useful','Very useful — I would definitely like to work on this','Foarte utilă — cu siguranță aș vrea să lucrăm pe această temă'),
      option('useful','Useful — this is relevant to my business','Utilă — este relevantă pentru afacerea mea'),
      option('possibly_useful','Possibly useful — depending on the example or data','Posibil utilă — depinde de exemplu sau de date'),
      option('not_relevant','Not particularly relevant to my current priorities','Nu este foarte relevantă pentru prioritățile mele actuale'),
      option('another_topic','I would prefer another AI topic','Aș prefera o altă temă legată de AI')
    ],{theme:true}),
    question('workshop_preferred_topic','workshop','text','What would you prefer to work on?','Pe ce temă ai prefera să lucrăm?',null,{maxLength:3000,condition:{id:'data_to_decisions_interest',values:['another_topic']},number:'7a'}),
    question('workshop_dataset_readiness','workshop','single','Could you bring a real business dataset to use during the workshop?','Ai putea aduce un set de date reale din afacerea ta pentru a-l folosi în workshop?',[
      option('yes','Yes — I already know which dataset I would bring','Da — știu deja ce set de date aș aduce'),
      option('probably','Probably — I need to identify or prepare it','Probabil — trebuie să îl identific sau să îl pregătesc'),
      option('maybe','Maybe — I would need help choosing an appropriate dataset','Poate — aș avea nevoie de ajutor pentru a alege un set de date potrivit'),
      option('cannot_use_company_data','No — I cannot use company data for this exercise','Nu — nu pot folosi datele companiei pentru acest exercițiu'),
      option('no_suitable_dataset','No — I don’t currently have a suitable dataset','Nu — momentan nu am un set de date potrivit')
    ],{helper:l('A simple Excel or CSV file is enough. The dataset does not need to be large or sophisticated.','Un simplu fișier Excel sau CSV este suficient. Setul de date nu trebuie să fie mare sau complex.'),datasetNotice:true}),
    question('workshop_dataset_type','workshop','multi','What kind of data could you bring?','Ce fel de date ai putea aduce?',[
      option('sales','Sales','Vânzări'),option('customers','Customers','Clienți'),option('finance','Finance','Finanțe'),option('marketing','Marketing','Marketing'),option('operations','Operations','Operațiuni'),option('inventory','Inventory','Stocuri'),option('production','Production','Producție'),option('logistics','Logistics','Logistică'),option('hr','HR','Resurse umane'),option('projects_services','Projects & services','Proiecte și servicii'),option('other','Other','Altele')
    ],{condition:{id:'workshop_dataset_readiness',values:['yes','probably','maybe']},number:'8a',required:false,structured:true,other:true,datasetNotice:true}),
    question('business_data_question','workshop','text','If you could ask one important question about your business and have AI analyse your data to help answer it, what would you ask?','Dacă ai putea pune o singură întrebare importantă despre afacerea ta, iar AI ți-ar analiza datele ca să te ajute să găsești răspunsul, ce ai întreba?',null,{maxLength:3000,helper:l('These are only examples — please use a question that matters to your own business.','Acestea sunt doar exemple — alege o întrebare care contează pentru afacerea ta.'),examples:[l('Why did our margin decline?','De ce ne-a scăzut marja?'),l('Which customers are most valuable?','Care sunt clienții noștri cei mai valoroși?'),l('What drives our sales?','Ce factori ne influențează vânzările?'),l('Where are our operational bottlenecks?','Unde apar blocaje în operațiunile noastre?'),l('Which products are underperforming?','Ce produse au rezultate sub așteptări?')]}),
    question('workshop_other_expectation','workshop','text','Is there anything else you would particularly like us to cover during the AI workshop?','Mai este ceva ce ți-ai dori în mod special să abordăm în workshopul de AI?',null,{required:false,maxLength:3000,helper:l('You can mention another AI topic, task, process, business problem or question that you would particularly like us to address.','Poți menționa o altă temă legată de AI, o sarcină, un proces, o problemă de business sau o întrebare pe care ai vrea să o abordăm.')})
  ]
};
export const localized = (value, language='en') => typeof value === 'object' && value !== null ? value[language] || value.en : value;
export function getQuestions(answers={},language='en') { return survey.questions.filter(q=>!q.condition||q.condition.values.includes(answers[q.condition.id])).map(q=>({...q,label:localized(q.label,language),helper:localized(q.helper,language),options:q.options?.map(o=>({...o,label:localized(o.label,language),description:localized(o.description,language)}))})); }
let mainNumber=0;for(const q of survey.questions)if(!q.condition)q.number=++mainNumber;
export const mainQuestionCount=mainNumber;
export function pruneAnswers(answers){const visible=new Set(getQuestions(answers).map(q=>q.id));return Object.fromEntries(Object.entries(answers).filter(([key])=>visible.has(key)));}
export const workshopTheme={title:l('AI for Business: From Data to Decisions','AI pentru business: de la date la decizii'),subtitle:l('Bring your own business data. Use AI to analyse it, understand it and decide what to do next.','Vino cu date din propria afacere. Folosește AI pentru a le analiza, a le înțelege și a decide ce urmează.'),body:l('The practical session would show how AI can help you explore real business data, identify patterns and drivers, create useful analyses and visualisations, and support better business decisions.','Sesiunea practică ar arăta cum te poate ajuta AI să explorezi date reale de business, să identifici tipare și factori determinanți, să creezi analize și vizualizări utile și să iei decizii de business mai bine fundamentate.')};
export function requiredQuestion(q, answers={}) { return q.required && !(q.optionalForNonUsers && (answers.ai_tools?.selected?.includes('none') || answers.ai_usage_frequency==='none')); }
export function selectedValues(q,value) { return q.structured ? value?.selected || [] : Array.isArray(value) ? value : []; }
export function toggleSelection(q,value,selected,checked) {
  const old=selectedValues(q,value);
  const exclusive=q.options.find(o=>o.value===selected)?.exclusive;
  const choices=checked ? exclusive ? [selected] : [...old.filter(v=>!q.options.find(o=>o.value===v)?.exclusive && v!==selected),selected] : old.filter(v=>v!==selected);
  if(!q.structured)return choices;
  return {selected:choices,...(q.access?{access:Object.fromEntries(choices.filter(v=>v!=='none' && value?.access?.[v]).map(v=>[v,value.access[v]]))}:{}),...(choices.includes('other')?{other:value?.other || ''}:{})};
}
const errors={required:l('Please select an answer to continue.','Selectează un răspuns pentru a continua.'),text:l('Please enter a response (up to 3,000 characters).','Scrie un răspuns (maximum 3.000 de caractere).'),selection:l('Select at least one valid option. “None” cannot be combined with other choices.','Selectează cel puțin o variantă validă. Varianta „Niciunul” / „Niciuna dintre acestea” nu poate fi combinată cu alte variante.'),access:l('Choose how you access each selected tool.','Alege cum ai acces la fiecare instrument selectat.'),other:l('Enter the name of the other tool or application (up to 120 characters).','Introdu numele instrumentului sau al aplicației (maximum 120 de caractere).'),invalid:l('Please review this answer.','Verifică acest răspuns.')};
const object=value=>value!==null && typeof value==='object' && !Array.isArray(value);
export function answerError(q,value,answers={},language='en') {
  const error=key=>localized(errors[key],language);
  if(!requiredQuestion(q,answers) && (value===undefined || value===null || value===''))return '';
  if(!q.required && (typeof value==='string'&&!value.trim() || q.structured && object(value) && Array.isArray(value.selected) && !value.selected.length && !value.other && Object.keys(value).every(k=>['selected','other'].includes(k))))return '';
  if(q.type==='text')return typeof value==='string' && value.trim().length>0 && value.length<=q.maxLength ? '' : error('text');
  if(q.type==='single')return q.options.some(o=>o.value===value) ? '' : error('required');
  if(q.structured && (!object(value) || Object.keys(value).some(k=>!['selected',...(q.access?['access']:[]),'other'].includes(k))))return error('invalid');
  const choices=q.structured?value.selected:value;
  if(!Array.isArray(choices)||!choices.length||new Set(choices).size!==choices.length||choices.some(v=>!q.options.some(o=>o.value===v))||choices.length>1&&choices.some(v=>q.options.find(o=>o.value===v)?.exclusive))return error('selection');
  if(q.access){
    const tools=choices.filter(v=>v!=='none');
    if(!object(value.access)||Object.keys(value.access).length!==tools.length||tools.some(v=>!Object.hasOwn(value.access,v)||!accessTypes.some(a=>a.value===value.access[v])))return error('access');
  }
  if(q.other && choices.includes('other') && (typeof value.other!=='string'||!value.other.trim()||value.other.length>120))return q.id==='workshop_dataset_type'?(language==='ro'?'Descrie tipul de date (maximum 120 de caractere).':'Describe the other data type (up to 120 characters).'):error('other');
  if(q.other && !choices.includes('other') && value.other!==undefined && value.other!=='')return error('invalid');
  return '';
}
export function formatAnswer(q,value,language='en') {
  const empty=language==='ro'?'Fără răspuns':'Not answered';
  if(value==null || value==='')return empty;
  if(q.type==='text')return String(value);
  if(q.type==='single')return q.options.find(o=>o.value===value)?.label || String(value);
  return selectedValues(q,value).map(id=>{
    const o=q.options.find(o=>o.value===id);
    const name=id==='other'&&value.other?`${o?.label}: ${value.other}`:o?.label || id;
    const access=q.access&&value.access?.[id];
    return name+(access?` — ${localized(accessTypes.find(a=>a.value===access)?.label,language)||access}`:'');
  }).join('\n') || empty;
}

export const participantFields = [
 {id:'first_name',label:l('First name','Prenume'),autocomplete:'given-name',maxLength:100},
 {id:'family_name',label:l('Family name','Nume de familie'),autocomplete:'family-name',maxLength:100},
 {id:'company_name',label:l('Company name','Denumirea companiei'),autocomplete:'organization',maxLength:200}
];
export function participantError(value,language='en') {
 if(!object(value)||Object.keys(value).some(k=>!participantFields.some(f=>f.id===k))||participantFields.some(f=>typeof value[f.id]!=='string'||!value[f.id].trim()||value[f.id].length>f.maxLength))return language==='ro'?'Completează prenumele, numele de familie (maximum 100 de caractere fiecare) și denumirea companiei (maximum 200 de caractere).':'Enter your first name, family name (up to 100 characters each) and company name (up to 200 characters).';
 return '';
}
