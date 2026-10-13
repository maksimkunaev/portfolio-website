// ─────────────────────────────────────────────────────────────────────────────
// SOURCE OF TRUTH
//
// This file is the single source for the website, the LinkedIn profile and the
// resume PDF. Nothing gets written into those by hand — it gets written here
// first, then copied out. If the three ever disagree, this file wins.
//
// Copy-out targets:
//   headline / linkedin  -> LinkedIn headline + About
//   bio.description      -> site About, resume Summary
//   companies[0..1]      -> LinkedIn Experience, resume Experience
//   research             -> site Research section, LinkedIn Projects entry
// ─────────────────────────────────────────────────────────────────────────────

// Ordered by what should be found first in a search, not by how much it is used.
export const technologies = [
  "LLM Integration",
  "RAG",
  "OpenAI API",
  "LLM fine-tuning",
  "Whisper",
  "TypeScript",
  "React.js",
  "Vue.js",
  "Python",
  "Node.js",
  "Next.js",
  "Nuxt.js",
  "FastAPI",
  "Flask",
  "PostgreSQL",
  "Angular",
  "Redux.js",
  "GraphQL",
  "Jest",
  "Vitest",
  "Cypress",
  "Docker",
  "Git",
];

// One idea, stated once: what I build, how I build it, and the playground where
// the method gets tested. This is the lens for everything below.
//
// "Components with contracts", not "classifiers": a step can be a classifier,
// a generator, a validator or an extractor. What makes the pipeline debuggable
// is that every step declares what it takes and returns — so any one of them
// can be swapped between code and a model without touching the rest.
export const bioDescription = `Full-stack engineer. Six years of frontend, and since 2025 full stack with AI: agents with tool calling, retrieval, voice, image and video generation — built for clients and running in production.

Now: one long-term contract — a product built from scratch (React, Python, deployment), from idea to generated images and video.

How I work: I decide the architecture, split the flow into steps with explicit contracts, and put a model only where it beats code. Every step is evaluated on its own, so a wrong output points at the step that produced it.

Side research: Aion, a reasoning engine where the world is code and the code judges the model. I'm building it to find out where an agent's rules can come from. Live demo on my site.`;

// The site shows this short version: two lines and a row of tags. The long
// bioDescription above is for the resume summary, where there are no tags.
export const bioIntro = `Full-stack engineer building AI products end-to-end. Six years of frontend, then in 2025 I moved fully into full stack with AI integrations — freelance contracts, and a long-term client for whom I build a full product from scratch.`;

export const shipped = [
  "LLM tool calling",
  "Chat assistants from scratch",
  "RAG retrieval",
  "Agent memory",
  "Whisper · ElevenLabs",
  "Local fine-tuning (Qwen)",
  "Image & video generation",
  "Vibe-coded apps → production",
];

// One-liner for meta tags and link previews, where the full About is too long.
export const shortDescription = `Full-stack engineer building AI products end-to-end — LLM tools, RAG, voice, image and video generation in React, TypeScript and Python.`;

// One-page PDF (/cv). r/EngineeringResumes rules: summary of two lines or
// none, 3–5 bullets per role, short old roles dropped. `resumeKeep` on a
// company lists the bullet indexes the PDF prints; `resume: false` hides the
// role from the PDF. The site always shows everything.
export const resumeSummary = `Full-stack engineer: six years of frontend, since 2025 full stack with AI — agents with tool calling, retrieval, voice, image and video generation, built for clients and running in production. I split every flow into steps with explicit contracts and put a model only where it beats code, so a wrong output points at the step that produced it.`;

// LinkedIn is a funnel; the site is the depth. The headline uses the words the
// market puts in job titles: in 98 postings (Jul–Oct 2026) "fullstack" appeared
// 24 times, "frontend" 22, "product engineer" once. AI goes after the title,
// the way postings write it. "Frontend" stays in skills and in the older
// positions, so frontend searches still match.
export const linkedin = {
  headline:
    "Senior Full-Stack Engineer · AI agents and generation pipelines in production | TypeScript · React · Python",
  about: `Full-stack engineer. Six years of frontend, and since 2025 full stack with AI: agents with tool calling, retrieval, voice, image and video generation — built for clients and running in production.

Now: one long-term contract — a product built from scratch (React, Python, deployment), from idea to generated images and video.

How I work: I decide the architecture, split the flow into steps with explicit contracts, and put a model only where it beats code. Every step is evaluated on its own, so a wrong output points at the step that produced it.

Side research: Aion, a reasoning engine where the world is code and the code judges the model. I'm building it to find out where an agent's rules can come from. Live demo on my site.

Madrid · open to full-stack and AI engineering roles, remote or on-site.`,
};

export const companies = [
  // 2025+ work carries no client names (M, 2026-10-02): one Freelance entry,
  // the long-term contract as its first block. No score-card lines, no hours,
  // no link to the freelance profile, and the page never says "NDA".
  {
    label: "Freelance",
    link: "",
    location: "Remote",
    position: "Full-Stack & AI Engineer",
    startDate: "Feb 2025",
    endDate: "Present",
    resumeKeep: [0, 1, 3, 4, 5],
    summary:
      "Independent contracts since 2025: one long-term product build, several shorter AI projects.",
    responsibilities: [
      "Long-term client (Sep 2025 – present): full web app from scratch — React, Python, nginx deploy — with AI image and video generation inside; e-commerce and social platform integrations.",
      "AI chat assistant from scratch: intent → parameters → API actions (React, Node.js, OpenAI function calling).",
      "AI trading bot answering from live data via tool calling.",
      "RAG document Q&A: frontend and retrieval layer, agent memory.",
      "Vibe-coded Chrome extension taken to production: failure cases fixed, capture flow rebuilt as a reliable event stream.",
      "Whisper, ElevenLabs and image generation in client apps; local models fine-tuned and served (Qwen, Ollama, llama.cpp).",
      "React Native client for a model-scored submission app; a short 2D teacher-assistant build.",
      "Tech stack: TypeScript, React, Node.js, Python (FastAPI, Flask), PostgreSQL, OpenAI and Claude APIs, vector search, Whisper, ElevenLabs, nginx, Docker.",
    ],
  },
  {
    label: "PriceHubble",
    link: "https://pricehubble.com",
    location: "Remote",
    position: "Frontend Engineer",
    startDate: "Oct 2021",
    endDate: "Feb 2025",
    resumeKeep: [0, 3, 4, 7],
    summary: "Frontend performance, 40+ product features, architecture, internal seminars.",
    responsibilities: [
      "Led frontend performance improvements: implemented lazy loading, reducing render time from 1–2 minutes to under 5 seconds.",
      "Built and maintained React/TypeScript components with Redux and Context API for scalability.",
      "Developed unit and integration tests (Jest, Vitest) to ensure UI stability.",
      "Delivered 40+ new product features and improved customer experience.",
      "Collaborated with backend teams to integrate REST and SOAP APIs, reducing error rates by 30%.",
      "Enhanced CI/CD pipelines (GitHub Actions) to optimize builds and deployments.",
      "Ran internal seminars on frontend architecture and performance for 20+ engineers; prepared a project handover for the client team — mapped the system end to end and presented it.",
      "Authored 15-page technical documentation, reducing onboarding time by 40%."
    ]
  },
  {
    label: "Realtify / Westarp",
    link: "https://realtify.cz",
    location: "Remote",
    position: "Frontend Developer",
    startDate: "Nov 2019",
    endDate: "Oct 2021",
    resumeKeep: [0, 2],
    summary: "Led the frontend of a real-estate product in Vue.js: 20+ pages, dashboards, data visualization.",
    responsibilities: [
      "Directed frontend architecture using Vue.js and Vuex; built 20+ responsive UI pages.",
      "Developed custom quiz forms and interactive UI elements to improve engagement.",
      "Engineered real estate dashboard with animated data visualization layers.",
      "Optimized application performance and responsiveness across devices."
    ]
  },
  {
    label: "ServiceWhale",
    link: "",
    location: "Remote",
    position: "Frontend Developer",
    startDate: "Aug 2019",
    endDate: "Oct 2019",
    resume: false,
    summary: "Shared UI component libraries and cross-browser documentation.",
    responsibilities: [
      "Developed reusable UI component libraries shared across multiple projects.",
      "Created cross-browser UI documentation, reducing duplicate code by 40%.",
      "Implemented automated tests to ensure consistent browser support."
    ]
  },
  {
    label: "LATOKEN",
    link: "https://latoken.com",
    location: "Moscow",
    position: "React Developer",
    startDate: "Sep 2018",
    endDate: "Aug 2019",
    resumeKeep: [0, 1],
    summary: "React dashboards and order forms for a crypto exchange; 50+ features.",
    responsibilities: [
      "Built scalable React.js dashboards and order forms, improving load time 2–3×.",
      "Delivered 50+ new features using Redux-based state management.",
      "Introduced Cypress end-to-end tests to improve release reliability."
    ]
  },
  {
    label: "Teledirekt",
    link: "https://teledirekt.com",
    location: "Moscow",
    position: "Landing Page Developer",
    startDate: "Jun 2018",
    endDate: "Sep 2018",
    resume: false,
    summary: "Responsive landing pages and performance optimization.",
    responsibilities: [
      "Created and optimized 10+ responsive landing pages.",
      "Improved IE11 performance and overall browser compatibility.",
      "Reduced page weight by 45% through media and script optimization."
    ]
  }
];

// constants/cv.js
// `heading` is the title printed above the section; Home and About have none.
export const sections = [
  { label: "Home", componentName: "Bio", link: "bio", showLink: false },
  { label: "About", componentName: "About", link: "about", showLink: true },
  { label: "Work", heading: "Recent work", componentName: "ClientWork", link: "work", showLink: true },
  { label: "Experience", heading: "Experience", componentName: "Experience", link: "experience", showLink: true },
  { label: "Research", heading: "Research", componentName: "Research", link: "research", showLink: true },
  { label: "Writing", heading: "Writing", componentName: "Writing", link: "writing", showLink: true },
  { label: "Projects", heading: "Projects", componentName: "Projects", link: "projects", showLink: true },
  { label: "Skills", heading: "Skills", componentName: "Skills", link: "skills", showLink: true },
  { label: "Contact", heading: "Contact", componentName: "Contact", link: "contact", showLink: true },
];

// Client work, anonymous by class of system. No client names, no client UI:
// each card shows a title and one short headline — a statement or a question.
// What the system is and what I built open on click. `diagram` picks the
// drawing in WorkVisual.vue; `visual` is its text description.
export const clientWork = {
  items: [
    {
      title: "AI image & video generation",
      headline: "From an idea to finished images and video.",
      diagram: "video",
      visual: "An AI agent producing an image and a video frame",
      period: "Sep 2025 — present · long-term client",
      what: "A product that turns an idea into finished images and video.",
      built: "Image and video generation assembled into one product, with the web app around it built from scratch: frontend, backend, deployment.",
      stack: ["Python", "React", "Image & video generation models", "nginx"],
    },
    {
      title: "AI chat assistant with tool calling",
      headline: "A chat that acts, not just answers.",
      diagram: "tools",
      visual: "An AI agent reaching for its tools",
      period: "2025",
      what: "A chat that turns a user request into real actions in the product.",
      built: "Written from scratch: classify the intent, resolve the parameters, dispatch a list of API actions. Each step has its own contract, so a wrong answer points at the step that broke.",
      stack: ["React", "Node.js", "OpenAI function calling"],
    },
    {
      title: "RAG document Q&A",
      headline: "Answers grounded in your own documents.",
      diagram: "rag",
      visual: "A chat window fed by the highlighted documents",
      period: "2025",
      what: "Ask questions over a document base and get answers grounded in the sources.",
      built: "The chat frontend and the retrieval layer on vector embeddings.",
      stack: ["React", "Embeddings", "Vector search"],
    },
    {
      title: "Vibe-coded Chrome extension → production",
      headline: "Took a demo-grade extension and made it hold up in real use.",
      diagram: "extension",
      visual: "Code going to production, and staying stable there",
      period: "2025",
      what: "An AI-generated extension for recording web interactions that worked in the demo and failed in real use.",
      built: "Found the failure cases, fixed them, and restructured the capture flow into a reliable event stream.",
      stack: ["Chrome Extension API", "JavaScript"],
    },
    {
      title: "AI trading assistant",
      headline: "Answers from live data, not guesses.",
      diagram: "trading",
      visual: "An AI agent studying a trend chart",
      period: "2025",
      what: "A chat bot that answers trading questions using live tools instead of guessing.",
      built: "The bot and its tool layer.",
      stack: ["LLM tool calling", "Chat bot"],
    },
    {
      title: "Mobile app with model-scored submissions",
      headline: "Submit artwork, get a model's verdict.",
      diagram: "mobile",
      visual: "An artwork going in, a classification coming out",
      period: "2025",
      what: "Users submit artwork, a model evaluates it.",
      built: "The React Native client, from idea to a working app.",
      stack: ["React Native", "AI evaluation"],
    },
  ],
  quotes: [
    "Very responsible, great to work with, awesome work quality!",
  ],
};

// Working title and outline only — the article is not written yet.
export const writing = {
  diagram: "rule",
  visual: "One rule: a state goes in, a changed state comes out",
  status: "In progress",
  title: "Rules are a world model you can read",
  lede: "Everyone talks about world models. A rule — if this state, then that state — is the smallest piece of one, and the only piece you can open and check. The hard part is not using rules. It is where they come from.",
  outline: [
    "What a rule is: a slice of the world you can read, run and falsify.",
    "Why a graph state plus rules is enough for an agent to reason: the output of one rule becomes the precondition of another.",
    "Six ways I tried to learn rules — a language model, how-to text, simulators, stories, handwritten, a 3D world — and what killed each one.",
    "What survived: generate candidates cheaply, accept them only by execution.",
    "Why this matters outside my playground: an agent you can trust is one whose answer comes with a trace.",
  ],
};

// Deliberately not shaped like a project card. Products get problem/features/
// impact; research gets question/approach/what worked/what I rejected. The
// rejected list is the part that makes the rest believable — it's also the
// part no other portfolio has.
export const research = {
  title: "Aion — Symbolic Reasoning Playground",
  // A recorded run of the real planner, replayed in the browser without a
  // server. Rebuilt with `python demo/build.py` in the hostel experiment.
  demo: "/demos/hostel/index.html",
  demoCaption: "A recorded run of the real planner. Pick a goal: the text is parsed into facts, the planner chains rules from five modules, and the world executes every step.",
  period: "2024 — present",
  question:
    "Can you tell the difference between an answer that is consistent and an answer that is true? A language model can't check its own output from the inside — so what does the checking?",
  approach: [
    "The world is executable code: state + action → state. It runs the consequences and acts as the judge, so nothing is taken on the model's word.",
    "The language model handles one step only: named-entity recognition and parsing, text into a graph. Everything after that is deterministic code.",
    "Rules are split into worlds — farming, physics, movement, economy — and any of them can be composed together. The vocabulary is what's shared between worlds, not the rules.",
    "Rules are explicit and readable, bound by roles rather than names, so they carry over between scenes.",
    "The answer is always a trace, never a verdict — you can see which step produced what.",
  ],
  worked: [
    "A working engine with two flows: HOW (forward planner) and WHY (backward abduction over observed facts).",
    "A closed loop from text to rules to execution: mine rules from prose, generate a knowledge bundle, run it against scenarios.",
    "One invariant worth the two years: execution proves a rule is consistent, but never that it is true. A coherent invention passes every check.",
  ],
  // One rejection, not three. The other two turned out to be open options rather
  // than dead ends — a list padded with things I hadn't actually rejected would
  // make the one real rejection worth less.
  rejected: [
    "The language model as the world model itself. Asking it for spatial coordinates directly: loss dropped from 0.78 to 0.13, but 'A above B' came out right 6 times in 10 — it learned where objects usually sit, not what space is. Coordinates were only the clearest case; a model that predicts text has no state to be consistent with.",
  ],
  // Each experiment ends in a verdict. The numbers are from the experiment
  // notes — re-check against the notes before changing any of them.
  experiments: [
    {
      name: "The language model as the world model",
      headline: "Lower loss, still wrong: 'A above B' right 6 times in 10.",
      did: "Asked the model for spatial coordinates directly.",
      result: "Loss fell from 0.78 to 0.13, but 'A above B' came out right 6 times in 10.",
      verdict: "Rejected",
    },
    {
      name: "Mining rules from how-to text",
      headline: "23% accuracy. You can't learn above your teacher.",
      did: "3,873 how-to articles turned into before/after transitions, then a neural state model trained on them.",
      result: "23% strict accuracy on the test set. You can't learn above your teacher.",
      verdict: "Killed",
    },
    {
      name: "Learning rules from a simulator",
      headline: "From 0 of 10 to 10 of 10 by adding one symbol.",
      did: "Observed a physics environment, extracted rules statistically, planned with them.",
      result: "0 of 10 goals with one observation language, 10 of 10 after adding a single stateful symbol. The language decides which laws can exist.",
      verdict: "Kept the lesson",
    },
    {
      name: "The model writes rules from stories — and grades them",
      headline: "Self-graded 24 of 28. Executed: 1 of 28.",
      did: "Two model passes mined rules from prose; the same model reported the score.",
      result: "Self-reported 24 of 28. Executed in the engine: 1 of 28. With an outside validator: 24 of 24.",
      verdict: "Kept the lesson",
    },
    {
      name: "Writing the rules by hand",
      headline: "Nothing fails, so nothing gets explained.",
      did: "Wrote rules for a domain I know well.",
      result: "Mush. Nothing ever fails, so nothing forces you to name the mechanism.",
      verdict: "Rejected",
    },
    {
      name: "Candidates judged by execution, in a 3D world",
      headline: "4 of 7 rules accepted. All 3 bad ones rejected.",
      did: "A model proposes candidate rules; a planner and the world's own step function accept or reject them. A 3D view draws the frames.",
      result: "4 of 7 accepted; all 3 deliberately bad rules rejected.",
      verdict: "Current",
    },
  ],
  open:
    "Where do rules come from at scale? Still open — and open for the whole field, not just for me. Simulators and existing world models are a live source, and so is letting the model propose a rule when the planner gets stuck — inefficient, but not ruled out. This is a playground, not a world model: it doesn't scale, and that is exactly what keeps every step visible.",
  link: "https://github.com/maksimkunaev/aion_documentation",
};

// Open items — kept here so they stay visible instead of living in a chat log.
//
// 1. Aion has no public artifact yet. Two years is a claim until someone can
//    look at something: the post comes first, then a runnable demo or a
//    readable repo. Until then `research.link` points at a bare profile, which
//    is the weakest part of this file.
// 2. Two resumes disagree — one says Frontend, one says Full Stack. This file
//    resolves it as frontend-first with real backend and AI depth, because that
//    is what the work actually shows. Both PDFs get rebuilt from here.
// 3. Ask two Upwork clients for LinkedIn recommendations. It moves the proof
//    out of a closed platform, and nothing else costs so little.

export const socials = [
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/maksim-k-1a9451163/",
  },
  {
    label: "Github",
    link: "https://github.com/maksimkunaev",
  },
  // {
  //   label: "Portfolio",
  //   link: "https://maksimkunaev.github.io/cv-landing/",
  // }
];

export const contacts = [
  { label: "termuovex@gmail.com", link: "mailto:termuovex@gmail.com" },
];

export const bio = {
  name: "Maksim Kunaev",
  occupation: "Senior Full-Stack Engineer · AI agents and generation pipelines in production",
  photo: "/media/photo.webp",
  technologies,
  description: bioDescription,
  intro: bioIntro,
  shipped,
  socials,
  contacts,
  // Keep this identical on LinkedIn and the resume — a location that disagrees
  // across profiles reads as an unmaintained profile.
  location: "Madrid, Spain",
  openTo: "Open to full-stack and AI engineering roles — remote, or on-site in Spain.",
};


// AI/LLM first: it is the differentiator and the thing recruiters filter on.
// Frontend depth follows, because that is what the roles are actually titled.
export const skills = [
  "LLM product engineering: RAG systems, multi-step AI pipelines, function calling, OpenAI/Groq APIs",
  "Beyond the API: local model deployment (Ollama, llama.cpp), fine-tuning (Qwen, PyTorch), speech-to-text (Whisper)",
  "Designing AI flows as components with explicit contracts, so each step can be verified or swapped between code and model",
  "6+ years of frontend development",
  "Expert in React.js, TypeScript, and modern state management (Redux, MobX, Context API)",
  "Proficient in Vue.js, Nuxt.js, Next.js and Angular",
  "Backend: Node.js, Express, Python (Flask, FastAPI), REST, WebSockets",
  "Databases and auth: PostgreSQL, MongoDB, Supabase, JWT/OAuth",
  "Automated testing with Jest, Vitest, and Cypress",
  "Performance optimization – lazy loading, code splitting, rendering efficiency",
  "CI/CD with GitHub Actions; Docker, nginx, VPS deployment, GraphQL",
  "Team leadership, documentation, and mentoring experience",
  "Languages: English (Fluent), Russian (Native), Spanish (Basic), Serbian-Croatian (Intermediate)"
];


// The site shows skills as short tags in groups; the sentences above are for
// the resume.
export const skillGroups = [
  { label: "AI", items: ["LLM tool calling", "RAG", "Multi-step pipelines", "OpenAI / Groq APIs", "Local models (Ollama, llama.cpp)", "Fine-tuning (Qwen, PyTorch)", "Whisper"] },
  { label: "Frontend", items: ["React", "TypeScript", "Vue", "Next.js", "Nuxt", "Angular", "Redux / MobX"] },
  { label: "Backend", items: ["Python (Flask, FastAPI)", "Node.js", "PostgreSQL", "MongoDB", "REST", "WebSockets"] },
  { label: "Delivery", items: ["Docker", "nginx", "GitHub Actions", "Jest / Vitest / Cypress"] },
  { label: "Languages", items: ["English (fluent)", "Russian (native)", "Spanish (basic)", "Serbian-Croatian (intermediate)"] },
];

export const education = [
  {
    institution: "Novosibirsk State Technical University",
    degree: "Electronics and Microelectronics (Incomplete Higher Education)",
    startDate: "2010",
    endDate: "2014"
  }
];





export const projects = [
  {
    title: "🎬 ClipSpark — AI Viral Clip Generator",
    headline: "Raw footage in, a postable clip out.",
    problemStatement:
      "Cutting a postable clip out of raw footage takes editing time, every time.",
    keyFeatures: [
      "Transcription and scene split, an LLM picks the hook, render with captions",
    ],
    technologies: [
      "React (frontend)",
      "Python / Flask (backend)",
      "Groq Whisper (transcription)",
      "OpenAI (scene curation)",
      "ffmpeg / libass (render + captions)",
    ],
    screenshots: [
      "projects/clipspark/app-main.png",
      "projects/clipspark/caption-results.png",
    ],
    date: "2026",
    link: "https://ai-content-editor.nthlabs.org",
    results: [
      "Full pipeline (upload → analyze → render → download) live in production",
      "Raw footage to a ready-to-post clip in seconds, no manual editing",
    ],
  },
  {
    title: "🌐 NeuroOrb — Interactive 3D Visualization",
    headline: "What does an AI look like while it thinks?",
    problemStatement:
      "AI interfaces lack engaging visual feedback during processing states. Users need dynamic animations that communicate AI activity in an intuitive, visually appealing way.",
    keyFeatures: [
      "Real-time 3D particle network with 100+ nodes",
      "Three state modes: idle, thinking, error",
      "Programmable animation sequences (color, rotation, squish, pulse)",
      "Optimized rendering with sub-16ms frame times",
      "Responsive design adapting to container size",
    ],
    technologies: [
      "Vue.js 3 (Composition API)",
      "Canvas 2D API (optimized projection)",
      "Custom physics engine (rotation, pulse, squish)",
      "Reactive state management",
    ],
    screenshots: [
      "projects/neuroorb/orb1.png", // cyan idle state
      "projects/neuroorb/orb2.png", // purple thinking
      "projects/neuroorb/orb3.png", // error view
    ],
    date: "2025",
    link: "/projects/neuro-orb", // Add demo link if deployed
    results: [
      "Smooth 60fps animation with 350+ connections",
      "Customizable sequences for talk/interaction states",
      "Foundation for AI chat visual feedback system",
    ],
  },
  {
    hidden: true,
    title: "🪄 SimverseLabs — AI Caption Generator",
    problemStatement:
      "Content creators and businesses struggle to come up with engaging, platform-specific captions that match their brand voice and tone. Writing captions manually for every post wastes valuable time and limits consistency across platforms.",
    keyFeatures: [
      "AI-powered caption generation for Instagram, LinkedIn, Twitter, TikTok, and Facebook",
      "Smart image analysis to understand mood and context",
      "Customizable style, tone, and length preferences",
      "Instant results with five platform-optimized captions per image",
      "One-click copy for easy posting",
    ],
    technologies: [
      "Vue.js (frontend)",
      "Groq AI / OpenAI API (LLM processing)",
      "Node.js (backend)",
      "Cloud-based image handling",
    ],
    screenshots: [
      "projects/caption_generator/captions1.png",
      "projects/caption_generator/captions2.png",
      "projects/caption_generator/captions3.png",
    ],
    date: "2025",
    results: [
      "Generated 5 custom captions in under 10 seconds per upload",
      "Improved engagement through platform-optimized, brand-consistent captions",
      "Reduced content creation time by 80–90%",
    ],
  },
  {
    title: "📄 ResumeQuick AI",
    headline: "Plain text in, a formatted resume out.",
    problemStatement:
      "Job seekers need a simple way to quickly convert plain text information into a formatted resume without complicated tools.",
    keyFeatures: [
      "One-click resume generation from plain text input",
      "AI transforms plain text into professional resume",
      "Direct editing in preview before downloading",
      "Simple PDF download functionality",
      "No account creation or login required",
    ],
    technologies: [
      "Groq AI for basic text processing",
      "Vue.js (frontend)",
      "Client-side PDF generation",
    ],
    screenshots: [
      "projects/resumequick/resumequick_3.png",
      "projects/resumequick/resumequick_2.png",
      "projects/resumequick/resumequick_4.png",
    ],
    date: "2025",
    link: "https://github.com/maksimkunaev/resumequick.pro",
    results: [
      "Creates basic formatted resume in just one click",
      "Zero learning curve - simple text to PDF conversion",
      "Provides editable preview for quick adjustments",
    ],
  },
  {
    hidden: true,
    title: "🔍 CV Autofill Chrome Extension",
    problemStatement:
      "Job seekers waste hours manually filling identical information across different job application forms.",
    keyFeatures: [
      "One-click form filling (Ctrl+L shortcut)",
      "AI-powered field matching (Groq API)",
      "Automatic checkbox selection",
    ],
    technologies: [
      "Vue.js (frontend)",
      "Chrome Extension API",
      "Python Flask (backend)",
      "Groq AI API (LLM processing)",
    ],
    screenshots: [
      "./projects/cv_autofill/cv0.png",
      "./projects/cv_autofill/cv4.png",
      "./projects/cv_autofill/cv3.png",
    ],
    date: "2025",
    link: "",
    results: [
      "Reduces application time from 10-15 mins to ~30 seconds",
      "Handles 90%+ of common form fields automatically",
      "Supports many major job platforms",
    ],
  },
];
