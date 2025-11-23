export const technologies = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Vue.js",
  "Angular",
  "Nuxt.js",
  "Next.js",
  "Redux.js",
  "Vuex",
  "Mobx.js",
  "Webpack",
  "Node.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Git",
  "Jest",
  "GraphQL",
  "Vitest",
  "Cypress",
  "Docker",

];

export const bioDescription = `AI-focused Frontend Engineer with 6+ years of experience building scalable, high-performance web applications using {technologies}. Specialized in integrating AI features (OpenAI, Groq API, ChatGPT) into modern UIs with React and Vue. Skilled in performance optimization, responsive design, and creating intelligent user experiences. Passionate about building products that work smarter through automation and AI-driven interaction.`;

export const companies = [
  {
    label: "PriceHubble",
    link: "https://pricehubble.com",
    location: "Remote",
    position: "Frontend Engineer",
    startDate: "Oct 2021",
    endDate: "Feb 2025",
    responsibilities: [
      "Led frontend performance improvements: implemented lazy loading, reducing render time from 1–2 minutes to under 5 seconds.",
      "Built and maintained React/TypeScript components with Redux and Context API for scalability.",
      "Developed unit and integration tests (Jest, Vitest) to ensure UI stability.",
      "Delivered 40+ new product features and improved customer experience.",
      "Collaborated with backend teams to integrate REST and SOAP APIs, reducing error rates by 30%.",
      "Enhanced CI/CD pipelines (Jenkins, GitHub Actions) to optimize builds and deployments.",
      "Led frontend architecture discussions and mentored 20+ engineers.",
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
    responsibilities: [
      "Created and optimized 10+ responsive landing pages.",
      "Improved IE11 performance and overall browser compatibility.",
      "Reduced page weight by 45% through media and script optimization."
    ]
  }
];

// constants/cv.js
export const sections = [
  { label: "Home", componentName: "Bio", link: "bio", showLink: false },
  { label: "About me", componentName: "About", link: "about", showLink: true },
  { label: "Experience", componentName: "Experience", link: "experience", showLink: true },
  { label: "Skills", componentName: "Skills", link: "skills", showLink: true },
  { label: "Projects", componentName: "Projects", link: "projects", showLink: true },
  { label: "Contact", componentName: "Contact", link: "contact", showLink: true },
];

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
  occupation: "Frontend & AI Integration Engineer",
  photo: "/media/photo.webp",
  technologies,
  description: bioDescription,
  socials,
  contacts,
  location: "Budva, Montenegro"
};


export const skills = [
  "6+ years of experience in frontend development",
  "Expert in React.js, TypeScript, and modern state management (Redux, MobX, Context API)",
  "Proficient in Vue.js and Angular frameworks",
  "Automated testing with Jest, Vitest, and Cypress",
  "Experience integrating REST and SOAP APIs",
  "Performance optimization – lazy loading, code splitting, rendering efficiency",
  "Skilled with Node.js, GraphQL, Webpack, Git, and Docker",
  "CI/CD experience with Jenkins and GitHub Actions",
  "Responsive design and cross-browser compatibility",
  "Team leadership, documentation, and mentoring experience",
  "Languages: English (Fluent), Russian (Native), Serbian-Croatian (Intermediate)"
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
    title: "🌐 NeuroOrb — Interactive 3D Visualization",
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
    link: "https://simverselabs.com/",
    results: [
      "Generated 5 custom captions in under 10 seconds per upload",
      "Improved engagement through platform-optimized, brand-consistent captions",
      "Reduced content creation time by 80–90%",
    ],
  },
  {
    title: "📄 ResumeQuick AI",
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
    // link: "https://resumequick.pro/",
    results: [
      "Creates basic formatted resume in just one click",
      "Zero learning curve - simple text to PDF conversion",
      "Provides editable preview for quick adjustments",
    ],
  },
  {
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
  {
    title: "☕️ 'Coffee To Go' Telegram Order Bot",
    problemStatement:
      "Coffee shops lose 15-20% of morning rush customers due to long wait times and chaotic order management. Walk-in customers hate waiting in line just to place an order.",
    keyFeatures: [
      "Pre-order before arrival (5/15/30 min options)",
      "Custom menu with a different drinks (latte, cappuccino, americano, etc)",
      "Instant Telegram group notifications for baristas",
      "One-tap 'I've arrived' confirmation",
    ],
    technologies: ["Telegram Bot API", "ManyChat (flow automation)"],
    screenshots: [
      "./projects/bot/bot1.png",
      "./projects/bot/bot2.png",
      "./projects/bot/bot3.png",
      "./projects/bot/bot4.png",
      "./projects/bot/bot5.png",
    ],
    date: "2025",
    link: "https://t.me/CaffePromenadaBot",
    results: [
      "Reduced average wait time from 8 mins → 1.5 mins",
      "Increased morning rush capacity",
    ],
  },
];
