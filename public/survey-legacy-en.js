// English labels only. IDs, options and routing remain shared with the Romanian source.
export const englishQuestions = {
  role: ['What is your role in the company?', ['Entrepreneur / founder','Director / manager','Specialist / team member','Other role']],
  size: ['How many people work at your company?', ['1–9 people','10–49 people','50–249 people','250+ people']],
  sector: ['Which sector does your company operate in?', ['Professional services','Retail and trade','Manufacturing','IT and technology','Construction and real estate','Tourism and hospitality','Agriculture','Other sector']],
  region: ['Where does your company mainly operate?', ['Bucharest–Ilfov','Centre','North-East','North-West','South-Muntenia','South-East','South-West Oltenia','West','Outside Romania']],
  digital: ['How would you describe your company’s level of digitalisation?', ['Basic · email, documents and spreadsheets','Intermediate · applications for core processes','Advanced · integrated systems and automation']],
  ai_adoption: ['What stage is your company at in using AI?', ['We use AI in our day-to-day work','We are testing or experimenting with AI','We do not use AI yet']],
  use_areas: ['In which activities do you use AI?', ['Marketing and sales','Operations and processes','Customer service','Finance and accounting','Human resources','Products and services','IT and data analysis','Other areas']],
  frequency: ['How often is AI used in your company?', ['Daily','Weekly','Monthly or less often']],
  tools: ['What types of AI solutions do you use?', ['Generative AI assistants (e.g. ChatGPT, Copilot)','AI built into existing applications','AI-powered automation','Solutions developed specifically for our company','Other solutions']],
  impact: ['What impact have you seen so far?', ['Significant benefits','Some benefits','We have not seen any benefits','We have not assessed the impact yet']],
  using_barriers: ['What limits your ability to expand AI use?', ['Lack of skills','Costs and budget','Data and privacy concerns','Lack of time','Unclear benefits','Integration with existing systems','Other barriers']],
  governance: ['Do you have internal guidelines for using AI?', ['Yes, documented guidelines','We have informal guidance','Guidelines are being developed','We do not have any yet']],
  pilot_areas: ['In which activities are you testing AI, or would you like to test it?', ['Marketing and sales','Operations and processes','Customer service','Finance and accounting','Human resources','Products and services','IT and data analysis','Other areas']],
  pilot_owner: ['Who leads your AI experiments?', ['Company leadership','An internal team','Individual colleagues taking the initiative','An external partner']],
  pilot_stage: ['What stage are your experiments at?', ['Exploring ideas','Testing tools','Running a pilot project','Evaluating the results of a pilot']],
  pilot_barriers: ['What prevents you from moving to everyday use?', ['Lack of skills','Costs and budget','Data and privacy concerns','Lack of time','Unclear benefits','Integration with existing systems','Other barriers']],
  pilot_measure: ['How do you assess whether an experiment is successful?', ['We have clear metrics','Through team feedback','We assess it informally','We have not decided yet']],
  pilot_timing: ['When do you expect to use AI in your day-to-day work?', ['Within the next 3 months','In 3–12 months','In more than a year','We do not know yet']],
  awareness: ['How familiar is your team with the possibilities of AI?', ['Very familiar','Somewhat familiar','Not very familiar','Not at all familiar']],
  nonuse_barriers: ['Why are you not using AI?', ['Lack of skills','Costs and budget','Data and privacy concerns','Lack of time','Unclear benefits','Integration with existing systems','Other reasons']],
  potential_areas: ['Where do you see a potential role for AI?', ['Marketing and sales','Operations and processes','Customer service','Finance and accounting','Human resources','Products and services','IT and data analysis','Other areas','We do not know yet']],
  interest: ['How interested is your company in exploring AI?', ['Very interested','Somewhat interested','Not very interested','Not interested at present']],
  first_step: ['What would help you most to take the first step?', ['Examples from similar companies','A practical training session','A conversation with an expert','A guided pilot project','It is not a priority']],
  nonuse_timing: ['When would you consider a first experiment?', ['Within the next 3 months','In 3–12 months','In more than a year','We do not have a timeframe']],
  strategy: ['What role does AI play in your company’s strategy?', ['It is part of our strategy','It is being discussed','It is not a priority right now','I do not know']],
  budget: ['Is there a budget for AI initiatives over the next 12 months?', ['Yes, a dedicated budget','Funding could be allocated for a specific use case','No','I do not know']],
  support: ['What support would be useful to your company?', ['Practical training','Assessment of opportunities','Implementation support','Access to funding','Sharing experiences with other SMEs','Other support']],
  priority: ['What would be the main outcome you would want from AI?', ['Saving time','Reducing costs','Growing sales','Improving quality','New products or services','Not yet decided']],
  comment: ['What else would you like to tell us about AI in your company?']
};
export const englishBranches = {
  using: { title: 'AI in everyday work', description: 'Let’s understand where AI creates value and what would help your company move forward.' },
  exploring: { title: 'From experiments to value', description: 'We would like to understand what you are testing and what you need for the next step.' },
  not_yet: { title: 'First steps towards AI', description: 'We want to understand your perspective, including why AI may not yet be a priority.' }
};
export function translateSurvey(source, language = 'en') {
  if (language === 'ro') return source;
  const translate = q => {
    const entry = englishQuestions[q.id];
    if (!entry || q.options && entry[1]?.length !== q.options.length) throw new Error(`Missing English translation: ${q.id}`);
    return { ...q, label: entry[0], ...(q.options ? { options: q.options.map((o,i) => ({ ...o, label: entry[1][i] })) } : {}) };
  };
  return { ...source, core: source.core.map(translate), branches: Object.fromEntries(Object.entries(source.branches).map(([id,b]) => [id, { ...b, ...englishBranches[id], questions: b.questions.map(translate) }])), closing: source.closing.map(translate) };
}
