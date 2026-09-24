const l = (en, ro) => ({ en, ro });
const option = (value, en, ro, extra = {}) => ({ value, label: l(en, ro), ...extra });
const question = (id, section, type, en, ro, options, extra = {}) => ({ id, section, type, label: l(en, ro), required: true, ...(options ? { options } : {}), ...extra });
export const accessTypes = [option('free','Free','Gratuit'),option('paid_personally','Paid personally','Plătit personal'),option('provided_by_company','Provided by my company','Oferit de companie')];
export const survey = {
  version: '2026-09-v1', draft: false,
  sections: [
    { id: 'today', title: l('Your AI today','AI în activitatea ta de azi'), description: l('Tools, access and habits','Instrumente, acces și obiceiuri') },
    { id: 'working', title: l('How you work with AI','Cum lucrezi cu AI'), description: l('Your everyday experience','Experiența ta de zi cu zi') },
    { id: 'company', title: l('AI in your company','AI în compania ta'), description: l('Business needs and the workshop','Nevoi concrete și așteptări de la atelier') }
  ],
  questions: [
    question('ai_tools','today','multi','Which AI tools do you personally use today?','Ce instrumente AI folosești personal în prezent?',[
      ...['ChatGPT','Claude','Gemini','Microsoft Copilot','Perplexity'].map((name,i)=>option(['chatgpt','claude','gemini','copilot','perplexity'][i],name,name)),
      option('other','Other','Alt instrument'), option('none','None','Niciunul',{exclusive:true})
    ],{structured:true,access:true,other:true,helper:l('Select all that apply, then indicate how you access each tool.','Selectează toate variantele care se aplică, apoi precizează cum ai acces la fiecare instrument.')}),
    question('ai_usage_frequency','today','single','How often do you use AI in a typical working week?','Cât de des folosești AI într-o săptămână obișnuită de lucru?',[
      option('none',"I don’t use AI",'Nu folosesc AI'),option('less_than_weekly','Less than once a week','Mai rar de o dată pe săptămână'),option('few_times_weekly','A few times a week','De câteva ori pe săptămână'),option('daily','Every working day','În fiecare zi de lucru'),option('several_times_daily','Several times a day','De mai multe ori pe zi'),option('throughout_day','AI is part of my workflow throughout much of the day','AI face parte din modul meu de lucru în mare parte din zi')
    ]),
    question('desktop_ai_apps','today','multi','Which dedicated AI applications have you installed on your computer?','Ce aplicații AI dedicate ai instalat pe computer?',[
      option('chatgpt_desktop','ChatGPT desktop app','Aplicația ChatGPT pentru desktop'),option('claude_desktop','Claude desktop app','Aplicația Claude pentru desktop'),option('copilot','Microsoft Copilot','Microsoft Copilot'),option('antigravity','Google Antigravity','Google Antigravity'),option('other','Other AI application','Altă aplicație AI'),option('browser_only','None — I access AI only through a web browser','Niciuna — accesez AI doar din browser',{exclusive:true}),option('no_computer_ai',"None — I don’t use AI on my computer",'Niciuna — nu folosesc AI pe computer',{exclusive:true})
    ],{structured:true,other:true}),
    question('ai_working_mode','working','single','Which statement best describes how you usually work with AI today?','Care afirmație descrie cel mai bine modul în care lucrezi de obicei cu AI?',[
      option('occasional_help','Occasional help','Ajutor ocazional',{description:l('I mainly do the work myself and ask AI questions or use it for specific tasks when needed.','În general, lucrez singur și pun întrebări AI sau îl folosesc pentru anumite sarcini, când am nevoie.')}),
      option('ai_assistant','AI assistant','AI ca asistent',{description:l('I do the work myself, but AI frequently helps me write, search, analyse, summarize or generate ideas.','Lucrez singur, dar AI mă ajută frecvent să scriu, să caut informații, să analizez, să rezum sau să generez idei.')}),
      option('ai_first_some_tasks','AI-first for some tasks','Încep cu AI pentru unele sarcini',{description:l('For some work, I start with AI. I give it the objective and relevant information or files, let it produce the first result, then review and refine it.','Pentru unele sarcini, încep cu AI. Îi dau obiectivul și informațiile sau fișierele relevante, îl las să producă un prim rezultat, apoi îl verific și îl îmbunătățesc.')}),
      option('ai_first_default','AI-first by default','De regulă, încep cu AI',{description:l('Whenever appropriate, I ask AI to perform the work. My role is increasingly to set the objective, provide context, steer, review and make decisions rather than manually create or edit everything myself.','Când este potrivit, îi cer AI să facă munca. Rolul meu este tot mai mult să stabilesc obiectivul, să ofer context, să ghidez, să verific și să iau decizii, în loc să creez sau să editez totul manual.')}),
      option('multi_step_agentic','Multi-step / agentic work','Lucru în mai mulți pași / cu agenți AI',{description:l('I regularly let AI perform multi-step work across files, tools or processes and produce completed deliverables or execute parts of a workflow.','Las în mod regulat AI să lucreze în mai mulți pași, folosind fișiere, instrumente sau procese, pentru a produce rezultate finale sau a executa părți dintr-un flux de lucru.')})
    ],{optionalForNonUsers:true}),
    question('ai_tasks_last_3_months','working','multi','What have you personally asked AI to do during the last 3 months?','Ce i-ai cerut personal AI să facă în ultimele 3 luni?',[
      option('questions_search','Ask questions or search for information','Să răspundă la întrebări sau să caute informații'),option('write_rewrite','Write or rewrite text','Să scrie sau să reformuleze texte'),option('translate','Translate content','Să traducă materiale'),option('analyse_documents','Analyse a PDF or document','Să analizeze un PDF sau un document'),option('analyse_data','Analyse a spreadsheet or business data','Să analizeze un tabel sau date de afaceri'),option('presentations','Create a presentation','Să creeze o prezentare'),option('edit_files','Create or modify files directly','Să creeze sau să modifice direct fișiere'),option('email_calendar','Work with my email or calendar','Să lucreze cu emailul sau calendarul meu'),option('multi_step','Execute a multi-step task','Să execute o sarcină în mai mulți pași'),option('recurring_automation','Automate a recurring workflow','Să automatizeze un proces recurent'),option('build_app_agent','Build an AI application or agent','Să construiască o aplicație sau un agent AI'),option('none','None of these','Niciuna dintre acestea',{exclusive:true})
    ]),
    question('company_ai_adoption','company','single','How is AI currently used in your company?','Cum este folosit AI în prezent în compania ta?',[
      option('not_used','AI is not currently used','AI nu este folosit în prezent'),option('individual_experiments','Individuals experiment with AI independently','Unele persoane experimentează cu AI din proprie inițiativă'),option('regular_employee_use','Several employees regularly use AI tools','Mai mulți angajați folosesc regulat instrumente AI'),option('systematic_teams','AI is systematically used in some teams or business processes','AI este folosit sistematic în anumite echipe sau procese'),option('production_workflows','We have AI-powered workflows or automations in production','Avem fluxuri de lucru sau automatizări cu AI folosite efectiv în activitate'),option('embedded_core','AI is embedded in our products, services or core operations','AI este integrat în produsele, serviciile sau operațiunile noastre de bază')
    ]),
    question('tedious_task','company','text','If AI could take one tedious or time-consuming task off your desk tomorrow, what would you choose?','Dacă AI ar putea prelua mâine o sarcină plictisitoare sau care îți consumă mult timp, ce ai alege?',null,{maxLength:3000,helper:l('Think about something repetitive, frustrating or time-consuming that you or your team currently do manually.','Gândește-te la ceva repetitiv, frustrant sau care consumă mult timp și pe care tu sau echipa îl faceți acum manual.')}),
    question('workshop_expectation','company','text','What would you most like to learn or achieve during the AI workshop?','Ce ți-ai dori cel mai mult să înveți sau să obții în cadrul atelierului de AI?',null,{maxLength:3000,helper:l('You can mention a question, task, process or business problem you would particularly like us to address.','Poți menționa o întrebare, o sarcină, un proces sau o problemă de afaceri pe care ai vrea să o abordăm.')})
  ]
};
export const localized = (value, language='en') => typeof value === 'object' && value !== null ? value[language] || value.en : value;
export function getQuestions(_answers={},language='en') { return survey.questions.map(q=>({...q,label:localized(q.label,language),helper:localized(q.helper,language),options:q.options?.map(o=>({...o,label:localized(o.label,language),description:localized(o.description,language)}))})); }
export function requiredQuestion(q, answers={}) { return q.required && !(q.optionalForNonUsers && (answers.ai_tools?.selected?.includes('none') || answers.ai_usage_frequency==='none')); }
export function selectedValues(q,value) { return q.structured ? value?.selected || [] : Array.isArray(value) ? value : []; }
export function toggleSelection(q,value,selected,checked) {
  const old=selectedValues(q,value);
  const exclusive=q.options.find(o=>o.value===selected)?.exclusive;
  const choices=checked ? exclusive ? [selected] : [...old.filter(v=>!q.options.find(o=>o.value===v)?.exclusive && v!==selected),selected] : old.filter(v=>v!==selected);
  if(!q.structured)return choices;
  return {selected:choices,...(q.access?{access:Object.fromEntries(choices.filter(v=>v!=='none' && value?.access?.[v]).map(v=>[v,value.access[v]]))}:{}),...(choices.includes('other')?{other:value?.other || ''}:{})};
}
const errors={required:l('Please select an answer to continue.','Selectează un răspuns pentru a continua.'),text:l('Please enter a response (up to 3,000 characters).','Completează un răspuns de cel mult 3.000 de caractere.'),selection:l('Select at least one valid option. “None” cannot be combined with other choices.','Selectează cel puțin o variantă validă. Opțiunile „Niciunul/Niciuna” nu pot fi combinate cu alte variante.'),access:l('Choose how you access each selected tool.','Alege cum ai acces la fiecare instrument selectat.'),other:l('Enter the name of the other tool or application (up to 120 characters).','Introdu numele celuilalt instrument sau al aplicației (cel mult 120 de caractere).'),invalid:l('Please review this answer.','Verifică acest răspuns.')};
const object=value=>value!==null && typeof value==='object' && !Array.isArray(value);
export function answerError(q,value,answers={},language='en') {
  const error=key=>localized(errors[key],language);
  if(!requiredQuestion(q,answers) && (value===undefined || value===null || value===''))return '';
  if(q.type==='text')return typeof value==='string' && value.trim().length>0 && value.length<=q.maxLength ? '' : error('text');
  if(q.type==='single')return q.options.some(o=>o.value===value) ? '' : error('required');
  if(q.structured && (!object(value) || Object.keys(value).some(k=>!['selected',...(q.access?['access']:[]),'other'].includes(k))))return error('invalid');
  const choices=q.structured?value.selected:value;
  if(!Array.isArray(choices)||!choices.length||new Set(choices).size!==choices.length||choices.some(v=>!q.options.some(o=>o.value===v))||choices.length>1&&choices.some(v=>q.options.find(o=>o.value===v)?.exclusive))return error('selection');
  if(q.access){
    const tools=choices.filter(v=>v!=='none');
    if(!object(value.access)||Object.keys(value.access).length!==tools.length||tools.some(v=>!Object.hasOwn(value.access,v)||!accessTypes.some(a=>a.value===value.access[v])))return error('access');
  }
  if(q.other && choices.includes('other') && (typeof value.other!=='string'||!value.other.trim()||value.other.length>120))return error('other');
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
  }).join('\n');
}
