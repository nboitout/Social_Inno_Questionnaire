// Provisional questions. Stable IDs are stored in Sheets; bump version after content changes.
const single = (id, label, options) => ({ id, label, type: 'single', required: true, options: options.map(([value, label]) => ({ value, label })) });
const multi = (id, label, options) => ({ ...single(id, label, options), type: 'multi' });
const text = (id, label) => ({ id, label, type: 'text', required: false, maxLength: 1500 });
const barriers = [['skills','Lipsa competențelor'],['cost','Costuri și buget'],['data','Date și confidențialitate'],['time','Lipsa timpului'],['value','Beneficii neclare'],['integration','Integrarea cu sistemele existente'],['other','Altele']];
const areas = [['marketing','Marketing și vânzări'],['operations','Operațiuni și procese'],['service','Relații cu clienții'],['finance','Financiar și contabilitate'],['hr','Resurse umane'],['product','Produse și servicii'],['it','IT și analiză de date'],['other','Altele']];
export const survey = {
  version: '2026-09-draft-1',
  draft: true,
  branchQuestionId: 'ai_adoption',
  core: [
    single('role','Care este rolul tău în companie?', [['owner','Antreprenor / fondator'],['management','Director / manager'],['specialist','Specialist / membru al echipei'],['other','Alt rol']]),
    single('size','Câte persoane lucrează în companie?', [['1_9','1–9 persoane'],['10_49','10–49 persoane'],['50_249','50–249 persoane'],['250_plus','250+ persoane']]),
    single('sector','În ce domeniu activează compania?', [['services','Servicii profesionale'],['retail','Comerț'],['manufacturing','Producție'],['technology','IT și tehnologie'],['construction','Construcții și imobiliare'],['tourism','Turism și ospitalitate'],['agriculture','Agricultură'],['other','Alt domeniu']]),
    single('region','Unde se desfășoară în principal activitatea?', [['bucharest','București–Ilfov'],['center','Centru'],['north_east','Nord-Est'],['north_west','Nord-Vest'],['south','Sud-Muntenia'],['south_east','Sud-Est'],['south_west','Sud-Vest Oltenia'],['west','Vest'],['outside','În afara României']]),
    single('digital','Cum ai descrie nivelul de digitalizare al companiei?', [['basic','De bază · email, documente și foi de calcul'],['connected','Intermediar · aplicații pentru procesele principale'],['integrated','Avansat · sisteme integrate și automatizări']]),
    single('ai_adoption','În ce etapă se află compania în utilizarea AI?', [['using','Folosim AI în activitatea curentă'],['exploring','Testăm sau experimentăm cu AI'],['not_yet','Nu folosim încă AI']])
  ],
  branches: {
    using: { title: 'AI în activitatea curentă', description: 'Să înțelegem unde aduce AI valoare și ce ar ajuta compania să progreseze.', questions: [
      multi('use_areas','În ce activități folosiți AI?', areas),
      single('frequency','Cât de des este folosit AI în companie?', [['daily','Zilnic'],['weekly','Săptămânal'],['monthly','Lunar sau mai rar']]),
      multi('tools','Ce tipuri de soluții AI folosiți?', [['assistants','Asistenți generativi (ex. ChatGPT, Copilot)'],['embedded','AI inclus în aplicațiile existente'],['automation','Automatizări cu AI'],['custom','Soluții dezvoltate pentru companie'],['other','Altele']]),
      single('impact','Ce impact ați observat până acum?', [['significant','Beneficii semnificative'],['some','Unele beneficii'],['none','Nu am observat beneficii'],['not_measured','Nu am evaluat încă impactul']]),
      multi('using_barriers','Ce vă limitează extinderea utilizării AI?', barriers),
      single('governance','Aveți reguli interne pentru utilizarea AI?', [['formal','Da, reguli documentate'],['informal','Avem îndrumări informale'],['planned','Sunt în pregătire'],['none','Nu avem încă']])
    ]},
    exploring: { title: 'De la experimente la valoare', description: 'Ne interesează ce testați și de ce aveți nevoie pentru următorul pas.', questions: [
      multi('pilot_areas','În ce activități testați sau doriți să testați AI?', areas),
      single('pilot_owner','Cine coordonează experimentele cu AI?', [['leadership','Conducerea companiei'],['team','O echipă internă'],['individuals','Colegi, din inițiativă proprie'],['partner','Un partener extern']]),
      single('pilot_stage','În ce stadiu sunt experimentele?', [['ideas','Explorăm idei'],['testing','Testăm instrumente'],['pilot','Avem un proiect pilot'],['evaluation','Evaluăm rezultatele unui pilot']]),
      multi('pilot_barriers','Ce vă împiedică să treceți la utilizarea curentă?', barriers),
      single('pilot_measure','Cum evaluați succesul unui experiment?', [['metrics','Avem indicatori clari'],['feedback','Prin feedbackul echipei'],['informal','Evaluăm informal'],['none','Nu am stabilit încă']]),
      single('pilot_timing','Când estimați că veți folosi AI în activitatea curentă?', [['3months','În următoarele 3 luni'],['year','În 3–12 luni'],['later','Peste un an'],['unknown','Nu știm încă']])
    ]},
    not_yet: { title: 'Primii pași spre AI', description: 'Vrem să înțelegem perspectiva voastră, inclusiv motivele pentru care AI nu este încă o prioritate.', questions: [
      single('awareness','Cât de familiară este echipa cu posibilitățile AI?', [['high','Foarte familiară'],['some','Oarecum familiară'],['little','Puțin familiară'],['none','Deloc familiară']]),
      multi('nonuse_barriers','Care sunt motivele pentru care nu folosiți AI?', barriers),
      multi('potential_areas','Unde vedeți un posibil rol pentru AI?', [...areas,['unknown','Nu știm încă']]),
      single('interest','Cât de interesată este compania să exploreze AI?', [['high','Foarte interesată'],['some','Oarecum interesată'],['low','Puțin interesată'],['none','Nu este interesată în prezent']]),
      single('first_step','Ce v-ar ajuta cel mai mult să faceți primul pas?', [['examples','Exemple din companii similare'],['training','O sesiune practică de formare'],['expert','Discuția cu un expert'],['pilot','Un proiect pilot ghidat'],['none','Nu este o prioritate']]),
      single('nonuse_timing','Când ați lua în calcul un prim experiment?', [['3months','În următoarele 3 luni'],['year','În 3–12 luni'],['later','Peste un an'],['unknown','Nu avem un orizont de timp']])
    ]}
  },
  closing: [
    single('strategy','Ce loc ocupă AI în strategia companiei?', [['defined','Este inclus în strategia noastră'],['discussed','Este în discuție'],['not_priority','Nu este o prioritate acum'],['unknown','Nu știu']]),
    single('budget','Există un buget pentru inițiative AI în următoarele 12 luni?', [['allocated','Da, un buget dedicat'],['possible','Poate fi alocat pentru un caz concret'],['none','Nu'],['unknown','Nu știu']]),
    multi('support','Ce sprijin ar fi util companiei?', [['training','Formare practică'],['assessment','Evaluarea oportunităților'],['implementation','Sprijin pentru implementare'],['funding','Acces la finanțare'],['network','Schimb de experiență cu alte IMM-uri'],['other','Alt tip de sprijin']]),
    single('priority','Care ar fi principalul rezultat dorit de la AI?', [['time','Economie de timp'],['cost','Reducerea costurilor'],['growth','Creșterea vânzărilor'],['quality','Calitate mai bună'],['innovation','Produse sau servicii noi'],['unknown','Nu este stabilit']]),
    text('comment','Ce altceva ai dori să ne spui despre AI în compania ta?')
  ]
};
export function getQuestions(answers = {}) {
  const branch = survey.branches[answers[survey.branchQuestionId]];
  return [...survey.core, ...(branch?.questions || []), ...survey.closing];
}
export function answerError(question, value) {
  if (question.type === 'text') return typeof value === 'string' && value.length <= question.maxLength || value == null ? '' : 'Textul este prea lung.';
  const allowed = question.options.map(o => o.value);
  if (question.type === 'single') return allowed.includes(value) ? '' : 'Selectează un răspuns pentru a continua.';
  return Array.isArray(value) && value.length > 0 && new Set(value).size === value.length && value.every(v => allowed.includes(v)) ? '' : 'Selectează cel puțin un răspuns valid.';
}
