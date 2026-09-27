export const profile = {
  name: "Yukari Tenshi Nemoto",
  initials: "YN",
  handle: "@yukarinemoto",
  age: 20,
  role: "4th year BSIT · Data Business & Analytics",
  headline: ["Photos, edits, and sites", "that feel finished."],
  subhead:
    "I build school and student systems, and I freelance in photography and editing.",
  email: "yukarinepomuceno@gmail.com",
};

export const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1JNUJGp3En/",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nmiumii",
    icon: "instagram" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yukari-nemoto-15978a256",
    icon: "linkedin" as const,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@nmiumii",
    icon: "tiktok" as const,
  },
];

export const bottomLinks = [
  {
    label: "Email",
    href: "mailto:yukarinepomuceno@gmail.com",
    icon: "mail" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yukari-nemoto-15978a256",
    icon: "linkedin" as const,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "github" as const,
  },
];

export interface EducationItem {
  school: string;
  campus?: string;
  years: string;
  level: string;
  degree?: string;
  major?: string;
  standing?: string;
  statusBadge?: string;
  location?: string;
  summary: string;
  coreTracks?: {
    title: string;
    description: string;
    topics: string[];
    skills: string[];
  }[];
  highlights?: string[];
  appliedProjects?: {
    name: string;
    role: string;
    context: string;
  }[];
}

export const education: EducationItem[] = [
  {
    school: "Bulacan State University",
    campus: "Bustos Campus",
    years: "2023 — Present",
    level: "Undergraduate Degree",
    degree: "Bachelor of Science in Information Technology",
    major: "Major in Business & Data Analytics",
    standing: "4th Year · Senior Standing (Graduating 2026)",
    statusBadge: "Senior Standing",
    location: "Bustos, Bulacan, Philippines",
    summary:
      "Rigorous technical and analytical degree integrating enterprise database management, business intelligence workflows, statistical modeling, and modern web application development.",
    coreTracks: [
      {
        title: "Business Intelligence & Analytics",
        description:
          "Transforming multi-source transactional data into executive dashboards, DAX calculations, and predictive KPI models.",
        topics: [
          "Power BI & DAX Modeling",
          "Data Warehousing & ETL",
          "Quantitative Decision Methods",
          "Predictive & Trend Analysis",
        ],
        skills: ["Power BI", "DAX", "Data Modeling", "ETL Pipelines"],
      },
      {
        title: "Database Architectures & Modeling",
        description:
          "Structuring relational database engines with high integrity, normalized schemas, and query optimization.",
        topics: [
          "Relational Database Systems (RDBMS)",
          "Entity-Relationship Diagrams (ERD)",
          "Complex SQL & Stored Procedures",
          "Schema Normalization & Indexing",
        ],
        skills: ["PostgreSQL", "MySQL", "ERD Architecture", "Query Tuning"],
      },
      {
        title: "Systems Analysis & Software Dev",
        description:
          "Engineering full-stack web platforms, modern UI/UX design systems, and secure data handling architectures.",
        topics: [
          "Systems Analysis & Design (SAD)",
          "Full-Stack Web (React & Next.js)",
          "Information Assurance & Security",
          "Human-Centered UI/UX Engineering",
        ],
        skills: ["TypeScript", "Next.js", "UI/UX Design", "System Security"],
      },
    ],
    appliedProjects: [
      {
        name: "Ayumi Rich Merch Platform",
        role: "Lead Systems Architect & UI Designer",
        context: "E-commerce & inventory catalog system with real-time state management",
      },
      {
        name: "Gray Cafe Web System",
        role: "Full-Stack Web Developer",
        context: "Dynamic coffee shop catalog and ordering system (IT211 - Web Systems & Tech)",
      },
      {
        name: "CNHS LEARN",
        role: "Database Modeler & Frontend Developer",
        context: "Comprehensive academic learning management & grading system",
      },
      {
        name: "Teacher Anne Playschool Portal",
        role: "Full-Stack Web Developer",
        context: "Digital student enrollment and parent-teacher communication portal",
      },
    ],
    highlights: [
      "Lead Capstone Systems Designer & Full-Stack Modeler",
      "Active Member of BulSU IT Society & Academic Analytics Circle",
      "Consistent Academic Standing across Advanced Computing & Analytics Subjects",
    ],
  },
  {
    school: "Colegio de Sta. Monica de Angat",
    campus: "Angat Campus",
    years: "2017 — 2022",
    level: "Junior & Senior High School",
    degree: "Secondary Education · TVL / Academic Foundation",
    standing: "Completed with Academic Honors",
    statusBadge: "Graduated with Honors",
    location: "Angat, Bulacan, Philippines",
    summary:
      "Formative academic training in computer fundamentals, logical reasoning, mathematics, and multimedia production that fostered a strong technical discipline.",
    highlights: [
      "Graduated with Academic Honors Distinction",
      "Led digital media production and publication layout workflows",
      "Solidified foundations in algorithms, hardware architectures, and creative design",
    ],
  },
];

export type ToolItem = {
  id: string;
  name: string;
  group: "Creative & Multimedia Production" | "Systems & Web Development";
  category: string;
  filterCategories?: string[];
  desc: string;
  brandColor?: string;
  brandGlow?: string;
  logo:
    | "figma"
    | "photoshop"
    | "lightroom"
    | "canva"
    | "capcut"
    | "vscode"
    | "nextjs"
    | "react"
    | "typescript"
    | "tailwind"
    | "mysql"
    | "vercel"
    | "supabase"
    | "xampp"
    | "powerbi";
  usedFor?: string[];
  relatedProjects?: {
    title: string;
    slug?: string;
    role?: string;
  }[];
};

export const tools: ToolItem[] = [
  // Creative & Multimedia Production
  {
    id: "figma",
    name: "Figma",
    group: "Creative & Multimedia Production",
    category: "UI/UX & Prototyping",
    filterCategories: ["All", "Creative & Design"],
    brandColor: "#F24E1E",
    brandGlow: "rgba(242, 78, 30, 0.18)",
    desc: "Industry-standard interface design, design systems, interactive prototypes, and wireframes.",
    logo: "figma",
    usedFor: [
      "Design Systems & Component Libraries",
      "Interactive Hi-Fi Prototypes",
      "User Flows & Wireframes",
      "Developer Handoff Specs",
    ],
    relatedProjects: [
      {
        title: "Ayumi Rich",
        slug: "ayumirich",
        role: "Merchandise System Prototype",
      },
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Playschool Website Layouts",
      },
    ],
  },
  {
    id: "photoshop",
    name: "Photoshop",
    group: "Creative & Multimedia Production",
    category: "Digital Imaging & Graphics",
    filterCategories: ["All", "Creative & Design"],
    brandColor: "#31A8FF",
    brandGlow: "rgba(49, 168, 255, 0.18)",
    desc: "Raster image compositing, visual asset manipulation, and promotional graphic texturing.",
    logo: "photoshop",
    usedFor: [
      "Visual Compositing & Mockups",
      "Editorial Asset Finishing",
      "Poster & Banner Design",
      "Texture & Tone Mapping",
    ],
    relatedProjects: [
      {
        title: "Ayumi Rich",
        slug: "ayumirich",
        role: "Visual Branding Assets",
      },
    ],
  },
  {
    id: "lightroom",
    name: "Lightroom",
    group: "Creative & Multimedia Production",
    category: "Photography & Color Grading",
    filterCategories: ["All", "Creative & Design"],
    brandColor: "#31A8FF",
    brandGlow: "rgba(49, 168, 255, 0.18)",
    desc: "RAW editorial photo processing, precision tone curves, and high-fidelity color grading.",
    logo: "lightroom",
    usedFor: [
      "RAW Photo Processing",
      "Editorial Color Grading",
      "Tone Curve Balancing",
      "Batch High-Res Export",
    ],
    relatedProjects: [
      {
        title: "Ayumi Rich",
        slug: "ayumirich",
        role: "Merchandise Lookbook Color Grading",
      },
    ],
  },
  {
    id: "canva",
    name: "Canva",
    group: "Creative & Multimedia Production",
    category: "Marketing Visuals & Collaterals",
    filterCategories: ["All", "Creative & Design"],
    brandColor: "#00C4CC",
    brandGlow: "rgba(0, 196, 204, 0.18)",
    desc: "Rapid presentation pitch decks, social visual assets, and marketing layouts.",
    logo: "canva",
    usedFor: [
      "Client Pitch Decks",
      "Social Visual Collaterals",
      "Rapid Layout Mockups",
      "Print Collateral Staging",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Parent Inquiry Decks",
      },
      {
        title: "Ayumi Rich",
        slug: "ayumirich",
        role: "Marketing Materials",
      },
    ],
  },
  {
    id: "capcut",
    name: "CapCut",
    group: "Creative & Multimedia Production",
    category: "Motion & Short-Form Video",
    filterCategories: ["All", "Creative & Design"],
    brandColor: "#00E5FF",
    brandGlow: "rgba(0, 229, 255, 0.18)",
    desc: "Short-form video editing, beat-synchronized cuts, and typography overlays.",
    logo: "capcut",
    usedFor: [
      "Short-Form Video Production",
      "Audio Timeline Synchronization",
      "Motion & Kinetic Typography",
      "Product Teasers & Reels",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Program Video Clips",
      },
    ],
  },

  // Systems & Web Development
  {
    id: "powerbi",
    name: "Power BI",
    group: "Systems & Web Development",
    category: "Business Intelligence & Analytics",
    filterCategories: ["All", "Data & Analytics", "Dev Tools"],
    brandColor: "#F2C811",
    brandGlow: "rgba(242, 200, 17, 0.22)",
    desc: "Interactive business intelligence dashboards, star-schema relational data modeling, and custom DAX variance measures.",
    logo: "powerbi",
    usedFor: [
      "DAX Measures & KPI Models",
      "Star-Schema Data Modeling",
      "Executive Dashboard Visuals",
      "Data Transformation & ETL",
    ],
    relatedProjects: [
      {
        title: "Power BI Data Analytics",
        slug: "power-bi-data-analytics",
        role: "Data Analyst & Dashboard Designer",
      },
      {
        title: "Power BI Dashboard",
        slug: "power-bi-dashboard",
        role: "Executive Performance Scorecard",
      },
    ],
  },
  {
    id: "vscode",
    name: "VS Code",
    group: "Systems & Web Development",
    category: "IDE & Code Workspace",
    filterCategories: ["All", "Dev Tools"],
    brandColor: "#007ACC",
    brandGlow: "rgba(0, 122, 204, 0.18)",
    desc: "Primary development workspace, extension ecosystem, and integrated Git source control.",
    logo: "vscode",
    usedFor: [
      "Full-Stack TypeScript Engineering",
      "ESLint & Prettier Tooling",
      "Git Source Control & Branching",
      "Next.js & React Debugging",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Frontend Implementation",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Component Architecture",
      },
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    group: "Systems & Web Development",
    category: "Full-Stack Web Framework",
    filterCategories: ["All", "Frontend"],
    brandColor: "#ffffff",
    brandGlow: "rgba(255, 255, 255, 0.15)",
    desc: "Production React framework with App Router, SSR, Server Components, and Edge routing.",
    logo: "nextjs",
    usedFor: [
      "App Router Architecture",
      "Server & Client Components",
      "SEO Metadata Optimization",
      "Edge Production Builds",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Full-Stack App Architecture",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Portal & Page Layouts",
      },
    ],
  },
  {
    id: "react",
    name: "React",
    group: "Systems & Web Development",
    category: "Frontend UI Library",
    filterCategories: ["All", "Frontend"],
    brandColor: "#61DAFB",
    brandGlow: "rgba(97, 218, 251, 0.18)",
    desc: "Declarative UI engineering, custom hook state architecture, and dynamic interfaces.",
    logo: "react",
    usedFor: [
      "Declarative Component Systems",
      "Custom Hooks & State Machines",
      "Dynamic Responsive Views",
      "Interactive Micro-Interactions",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Dynamic UI Elements",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Student Performance Views",
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    group: "Systems & Web Development",
    category: "Type-Safe Language",
    filterCategories: ["All", "Frontend"],
    brandColor: "#3178C6",
    brandGlow: "rgba(49, 120, 198, 0.18)",
    desc: "Static type analysis, strict contract schemas, and enterprise application reliability.",
    logo: "typescript",
    usedFor: [
      "Strict Data Contract Schemas",
      "Component Props Type Safety",
      "API Payload Validation",
      "Compile-Time Error Prevention",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Type-Safe Components",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Data Types & Models",
      },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    group: "Systems & Web Development",
    category: "Design Tokens & Styling",
    filterCategories: ["All", "Frontend"],
    brandColor: "#38BDF8",
    brandGlow: "rgba(56, 189, 248, 0.18)",
    desc: "Modern CSS design tokens, utility layouts, fluid typography, and dark mode systems.",
    logo: "tailwind",
    usedFor: [
      "Design Token Consistency",
      "Fluid Responsive Grids",
      "Dark & Light Mode Theming",
      "Micro-Transitions & Glassmorphism",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Design System Implementation",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Clean Dashboard Layouts",
      },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    group: "Systems & Web Development",
    category: "Relational Database",
    filterCategories: ["All", "Data & Analytics", "Backend & Cloud"],
    brandColor: "#00758F",
    brandGlow: "rgba(0, 117, 143, 0.18)",
    desc: "Relational schema engineering, structured SQL queries, indexes, and normalized tables.",
    logo: "mysql",
    usedFor: [
      "Relational Database Schemas",
      "Complex SQL Queries & Joins",
      "Data Normalization & Integrity",
      "Index Performance Tuning",
    ],
    relatedProjects: [
      {
        title: "Gray Cafe",
        slug: "gray-cafe",
        role: "Relational Menu & Order Database",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Academic Data Schemas",
      },
      {
        title: "Ayumi Rich",
        slug: "ayumirich",
        role: "Order Flow Database Modeling",
      },
    ],
  },
  {
    id: "vercel",
    name: "Vercel",
    group: "Systems & Web Development",
    category: "Cloud & Edge Platform",
    filterCategories: ["All", "Backend & Cloud", "Dev Tools"],
    brandColor: "#ffffff",
    brandGlow: "rgba(255, 255, 255, 0.15)",
    desc: "Zero-config deployment, Edge Network CDN, and production serverless hosting for modern web apps.",
    logo: "vercel",
    usedFor: [
      "Git-Triggered CI/CD Automation",
      "Global Edge CDN Delivery",
      "Production Serverless Hosting",
      "Custom Domain & DNS Routing",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Vercel Production Hosting",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Edge Web Deployment",
      },
    ],
  },
  {
    id: "supabase",
    name: "Supabase",
    group: "Systems & Web Development",
    category: "Backend & Cloud Database",
    filterCategories: ["All", "Backend & Cloud"],
    brandColor: "#3ECF8E",
    brandGlow: "rgba(62, 207, 142, 0.2)",
    desc: "Open source Firebase alternative: managed PostgreSQL, authentication, storage, and RLS policies.",
    logo: "supabase",
    usedFor: [
      "Managed PostgreSQL Schemas",
      "Row-Level Security (RLS) Policies",
      "Secure Storage Buckets & Media",
      "JWT Auth & Session Guards",
    ],
    relatedProjects: [
      {
        title: "Teacher Anne",
        slug: "teacher-anne",
        role: "Backend, Auth & Document Storage",
      },
    ],
  },
  {
    id: "xampp",
    name: "XAMPP",
    group: "Systems & Web Development",
    category: "Local Dev Server",
    filterCategories: ["All", "Backend & Cloud", "Dev Tools"],
    brandColor: "#FB7A24",
    brandGlow: "rgba(251, 122, 36, 0.2)",
    desc: "Local development server stack integrating Apache, MySQL, PHP, and phpMyAdmin for offline database staging.",
    logo: "xampp",
    usedFor: [
      "Local Apache & MySQL Server",
      "phpMyAdmin Database Administration",
      "Offline System Prototyping",
      "Local API & Script Staging",
    ],
    relatedProjects: [
      {
        title: "Gray Cafe",
        slug: "gray-cafe",
        role: "Apache / PHP / phpMyAdmin Stack",
      },
      {
        title: "CNHS LEARN",
        slug: "cnhs-learn",
        role: "Local Database Staging",
      },
    ],
  },
];

export const capabilities = [
  {
    title: "DESIGN",
    desc: "Plan interfaces and user flows.",
    icon: "layout" as const,
  },
  {
    title: "BUILD",
    desc: "Develop websites and digital systems.",
    icon: "code" as const,
  },
  {
    title: "ANALYZE",
    desc: "Organize and interpret data.",
    icon: "chart" as const,
  },
  {
    title: "CREATE",
    desc: "Produce visual and multimedia content.",
    icon: "sparkles" as const,
  },
];

export const services = [
  {
    title: "Photography",
    blurb: "Portraits, events, and brand photos that already look like they belong together.",
  },
  {
    title: "Editing",
    blurb: "Color, retouch, and cuts for posts or a handover pack the next person can use.",
  },
  {
    title: "Websites",
    blurb: "Small sites for real shops and schools — clean, clear, and yours to keep.",
  },
];

export type ProjectItem = {
  slug: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  meta: string;
  year: string;
  category: string;
  filterCategories: string[];
  description: string;
  oneLiner: string;
  did: string;
  role: string;
  projectType: string;
  team?: string;
  client?: string;
  subject?: string;
  focus?: string[];
  tags: string[];
  toolsList?: string[];
  videoUrl?: string;
  images?: string[];
  prototypeUrl?: string;
  context: string;
  process: string;
  features: string[];
  result: string;
  visual: "school" | "desk" | "merch";
  demoUrl: string;
  pbixUrl?: string;
  pbixFileName?: string;
};

export const projects: ProjectItem[] = [
  {
    slug: "teacher-anne",
    title: "Teacher Anne",
    fullTitle: "Teacher Anne — School Management System & Centralized Enrollment",
    subtitle: "School Administration, QR Attendance, GCash Verification & Student Records",
    meta: "2025–2026 · SCHOOL MANAGEMENT SYSTEM · FULL-STACK WEB",
    year: "2026",
    category: "School Management System",
    filterCategories: ["All", "Web", "Systems", "Client"],
    description:
      "Teacher Anne is a school management system designed to streamline enrollment and centralize student records, attendance, payments, teacher management, announcements, and reporting in one platform for efficient school administration.",
    oneLiner:
      "School management system designed to streamline enrollment, student records, QR attendance, and GCash payments.",
    did: "Architected full-stack portal with Next.js & Supabase, integrated QR code attendance scanning, automated GCash payment proof verification with Supabase Storage, and configured Brevo transactional emails.",
    role: "Full-Stack Developer & UI/UX Designer",
    projectType: "Full-Stack Web Application · Client Platform",
    client: "Teacher Anne Playschool and Tutorial Center",
    team: "Lead Developer & UI/UX Designer",
    tags: [
      "School Management",
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "QR Attendance",
      "GCash Verification",
      "Brevo Email",
    ],
    toolsList: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Brevo",
      "Figma",
      "Lucide React",
    ],
    videoUrl: "/projects/teacher-anne.mp4",
    context:
      "Teacher Anne Playschool and Tutorial Center faced operational bottlenecks from manual paper-based enrollment, decentralized student records, physical tuition receipts, and cumbersome daily attendance logging. School staff spent excessive hours tracking attendance and manually verifying payment slips, while parents lacked real-time visibility into enrollment confirmations and school announcements.",
    process:
      "Conducted administrative workflow analysis and created comprehensive UI/UX wireframes in Figma before implementing the frontend with Next.js, React, TypeScript, Tailwind CSS, and Lucide React. Engineered a robust backend on Supabase and PostgreSQL, implementing Supabase Authentication for role-based administrative access and Supabase Storage for student documents and payment slips. Added dynamic QR code generation and camera-based scanning for instantaneous daily attendance tracking, integrated GCash payment proof verification pipelines, configured Brevo for automated transactional emails, and deployed the production app on Vercel.",
    features: [
      "Streamlined Online Enrollment: Paperless admission portal allowing parents to register students and securely upload prerequisite documents via Supabase Storage.",
      "GCash Payment Proof Verification: Secure receipt and proof of payment upload system enabling instant financial verification, payment status updates, and audit trails.",
      "QR Code Attendance System: Contactless student attendance logging with dynamic QR code generation and camera scanning for real-time daily tracking.",
      "Centralized Records & Teacher Management: Unified database managing student profiles, emergency contacts, academic evaluations, and teacher scheduling in one central hub.",
      "Brevo Transactional Emails: Automated email notifications for enrollment status confirmations, payment receipts, tuition reminders, and school announcements.",
      "Role-Based Security & Permissions: Strict Supabase Authentication protecting sensitive student records across admin, teacher, and parent views.",
    ],
    result:
      "Successfully deployed on Vercel, delivering an all-in-one administrative hub that streamlined enrollment processing, eliminated paper bottlenecks, and provided reliable QR attendance and GCash tuition tracking for school staff and parents.",
    visual: "school" as const,
    demoUrl: "",
  },
  {
    slug: "power-bi-data-analytics",
    title: "Power BI Data Analytics",
    fullTitle: "Power BI Business Intelligence & Data Analytics",
    subtitle: "Interactive Data Visualizations & Analytics Models",
    meta: "2026 · DATA VISUALIZATION · POWER BI",
    year: "2026",
    category: "Data Visualization",
    filterCategories: ["All", "Systems", "Academic", "Client"],
    description:
      "An interactive Power BI analytics suite engineered to uncover operational patterns, performance metrics, and data-driven insights through structured dashboards.",
    oneLiner:
      "Interactive Power BI analytics suite engineered to uncover operational patterns and metrics.",
    did: "Engineered comprehensive data models, DAX measures, and interactive reporting dashboards for business metrics.",
    role: "Data Analyst & Dashboard Designer",
    projectType: "Academic & Analytics Project",
    tags: ["Power BI", "Data Analytics", "Dashboard"],
    toolsList: ["Power BI", "DAX", "Data Modeling", "Business Analytics", "SQL"],
    videoUrl: "/projects/Project%201.mp4",
    context:
      "Business and educational operations produce massive volumes of fragmented transactional data. Without a consolidated intelligence layer, stakeholders struggle to detect trends, track KPIs, and identify operational bottlenecks.",
    process:
      "Cleaned and normalized raw transactional datasets, constructed a star-schema relational model, authored complex DAX calculations for period-over-period variance, and designed an editorial, high-contrast visual dashboard.",
    features: [
      "Dynamic KPI Cards: Real-time visual tracking of key revenue, volume, and conversion indicators.",
      "Interactive Multi-Filter Slicers: Filter data seamlessly across temporal periods, product tiers, and regional cohorts.",
      "Trend & Variance Modeling: Custom DAX calculations highlighting positive/negative variance against targets.",
      "Automated Reporting Structure: Pre-configured views formatted for high-level management reviews.",
    ],
    result:
      "Delivered a responsive, high-fidelity analytical reporting dashboard that reduces reporting preparation time and empowers stakeholders with clear, data-backed insights.",
    visual: "desk" as const,
    demoUrl: "",
    pbixUrl: "/projects/powerbi/FinaleRex.pbix",
    pbixFileName: "FinaleRex.pbix",
  },
  {
    slug: "power-bi-dashboard",
    title: "Power BI Dashboard",
    fullTitle: "Executive Performance & KPI Reporting Dashboard",
    subtitle: "Data Analytics & Strategic Reporting System",
    meta: "2026 · DATA ANALYTICS · POWER BI",
    year: "2026",
    category: "Data Analytics",
    filterCategories: ["All", "Systems", "Academic"],
    description:
      "High-density executive Power BI reporting system focused on performance visibility, KPI benchmarking, and interactive multi-dimensional data exploration.",
    oneLiner:
      "High-density executive Power BI reporting system focused on performance visibility and KPI tracking.",
    did: "Designed dimensional data architectures and clean visual reporting dashboards for key performance tracking.",
    role: "Data Analyst & UI Designer",
    projectType: "Academic & Systems Project",
    tags: ["Power BI", "Reporting", "Data Visualization"],
    toolsList: ["Power BI", "KPI Metrics", "Data Analytics", "Reporting", "Excel"],
    videoUrl: "/projects/Project%202.mp4",
    context:
      "Strategic decision-making requires rapid access to holistic performance indices. Disjointed spreadsheets and legacy tables hinder comparative benchmarking and delay critical business responses.",
    process:
      "Engineered an automated data transformation pipeline, defined standard metrics dictionaries, and applied modern UI design principles to present dense analytics in an intuitive, glanceable format.",
    features: [
      "Executive Summary Overview: At-a-glance scorecard summarizing core business drivers and targets.",
      "Comparative Benchmarking: Visual comparison charts analyzing current performance against previous quarters.",
      "Drill-Through Hierarchies: Deep dive capabilities from top-level figures into granular transaction details.",
      "Accessible Dark UI Theme: High-contrast data visualization palette optimized for long analysis sessions.",
    ],
    result:
      "Completed a robust, interactive dashboard architecture that unifies distributed metrics into a coherent executive reporting tool.",
    visual: "merch" as const,
    demoUrl: "",
    pbixUrl: "/projects/powerbi/FinalProjectJBM_4.pbix",
    pbixFileName: "FinalProjectJBM_4.pbix",
  },
  {
    slug: "cnhs-learn",
    title: "CNHS LEARN",
    fullTitle: "CNHS LEARN — School Data System & Academic Portal",
    subtitle: "Web Application & School Data System",
    meta: "2026 · WEB APPLICATION · MACHINE LEARNING",
    year: "2026",
    category: "Web Application",
    filterCategories: ["All", "Web", "Systems", "Academic"],
    description:
      "Comprehensive school management and learning system integrating student performance analytics, grade tracking, and predictive academic intelligence.",
    oneLiner:
      "Comprehensive school management and learning system integrating student performance analytics.",
    did: "Architected full-stack web application features, database schemas, and data analytics pipelines for school administration.",
    role: "Full-Stack Developer & Analyst",
    projectType: "School System & Web Application",
    tags: ["School Data System", "Data Analytics", "Machine Learning"],
    toolsList: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL", "Machine Learning"],
    videoUrl: "/projects/Project%203%20CNHS.mp4",
    context:
      "Educational institutions frequently face operational hurdles with fragmented student records, manual grade consolidation, and lack of early-warning indicators for students needing academic support.",
    process:
      "Researched school administrative workflows, developed relational database schemas in MySQL, built modular front-end interfaces with Next.js, and incorporated data analytics pipelines to track student progress over time.",
    features: [
      "Centralized Student Records: Secure information repository for student profiles, enrollment, and attendance.",
      "Academic Performance Analytics: Visual grade curves and comparative assessment dashboards.",
      "Predictive Learning Alerts: Machine learning and statistical flags alerting teachers to students requiring interventions.",
      "Responsive Portal UI: Intuitive interface built for administrators, teachers, and students on desktop and mobile.",
    ],
    result:
      "Successfully created an end-to-end academic portal and student intelligence system that streamlines school operations and enhances student evaluation.",
    visual: "school" as const,
    demoUrl: "https://cnhs-centralized-school-data-system.vercel.app/",
  },
  {
    slug: "ayumirich",
    title: "Ayumi Rich Merchandise",
    fullTitle: "Ayumi Rich Merchandise Ordering & Payment Management System",
    subtitle: "Interactive Figma Prototype & Systems Analysis Project",
    meta: "2024 · FIGMA PROTOTYPE · SYSTEM ANALYSIS & DESIGN",
    year: "2024",
    category: "System Analysis & UI/UX",
    filterCategories: ["All", "Systems", "UI/UX", "Client", "Academic"],
    description:
      "A client-centered ordering, inventory tracking, and payment management system prototype engineered for beverage distribution and wholesale fulfillment.",
    oneLiner:
      "Client-centered beverage ordering and payment management system prototype for wholesale operations.",
    did: "Conducted client stakeholder interviews, mapped data flows and relational ERDs, and designed a high-fidelity interactive Figma prototype.",
    role: "UI/UX Designer & System Analyst",
    projectType: "Client Prototype · System Analysis & Design",
    client: "Ayumi Rich Merchandise",
    subject: "System Analysis and Design (SAD)",
    tags: [
      "Figma Prototype",
      "System Analysis & Design",
      "Ordering & Payment",
      "UI/UX Design",
      "Beverage Wholesale",
    ],
    toolsList: [
      "Figma",
      "Process Flow Modeling",
      "UI/UX Design",
      "Requirements Engineering",
      "MySQL Modeling",
      "Client Interviews",
    ],
    images: [
      "/projects/ayumirich/01-hero-landing.png",
      "/projects/ayumirich/02-shop-catalog.png",
      "/projects/ayumirich/03-product-grid.png",
      "/projects/ayumirich/04-product-modal.png",
      "/projects/ayumirich/05-marketing-showcase.png",
    ],
    videoUrl: "",
    prototypeUrl: "https://www.figma.com",
    context:
      "Ayumi Rich Merchandise, a beverage wholesale business operating since 2010, faced workflow bottlenecks from manual order logging, paper receipts, and stock count discrepancies between cases and individual units. To establish structured retail operations, they commissioned a comprehensive System Analysis and Design capstone project to model an automated ordering, inventory tracking, and payment reconciliation pipeline.",
    process:
      "Conducted client stakeholder interviews to map operational constraints, formulated Entity Relationship Diagrams (ERD) and Data Flow Diagrams (DFD) for wholesale stock movement, and translated functional requirements into a high-fidelity interactive Figma prototype. Emphasized clean visual hierarchy, instant category filtering (Beer, Liquor, Soft Drinks), stock status badges, and an intuitive product modal with transparent pricing.",
    features: [
      "Hero Landing & Brand Story: High-impact branded entrance highlighting trusted beverage delivery with fast access to the product catalog.",
      "Categorized Drink Catalog: Streamlined filtering across Beer, Liquor, and Soft Drinks with intuitive search and filter drawers.",
      "Real-Time Stock & Case Pricing: Clear visibility into stock availability (e.g., '50+ in stock') and case-level pricing ($5.00/case) to prevent ordering errors.",
      "Interactive Product Modal: Granular item review modal with SKU tracking, bottle descriptions, out-of-stock guardrails, and favorite toggles.",
      "Promotional Staging: Staged product visual compositions for promotional campaigns and seasonal drink bundles.",
    ],
    result:
      "Delivered a validated, client-approved system prototype and architectural specification for the System Analysis and Design final project, demonstrating how thoughtful user experience and data structure solve real wholesale retail challenges.",
    visual: "merch" as const,
    demoUrl: "",
  },
  {
    slug: "gray-cafe",
    title: "Gray Cafe",
    fullTitle: "Gray Cafe — Interactive Coffee Shop & Ordering Web System",
    subtitle: "Web Systems & Technologies (IT211) Final Academic Project",
    meta: "2024 · WEB SYSTEMS & TECHNOLOGIES · HTML / CSS / JS / PHP / MYSQL",
    year: "2024",
    category: "Full-Stack Web System",
    filterCategories: ["All", "Web", "Systems", "Academic"],
    description:
      "A dynamic, full-stack coffee shop ordering and menu management web application engineered as the final project for Web Systems and Technologies (IT211). Features interactive beverage catalogs, cart handling, and backend database administration using PHP, MySQL (phpMyAdmin), and XAMPP.",
    oneLiner:
      "Dynamic coffee shop web application with interactive menus, order handling, and MySQL database management.",
    did: "Engineered the full frontend interface using semantic HTML, custom CSS, and JavaScript, paired with a PHP backend and relational MySQL database managed via phpMyAdmin on XAMPP.",
    role: "Full-Stack Web Developer & UI Designer",
    projectType: "Academic Final Project · Web Systems & Technologies (IT211)",
    subject: "Web Systems and Technologies (IT211)",
    tags: [
      "Gray Cafe",
      "Web Systems & Tech",
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "phpMyAdmin",
      "XAMPP",
      "Full-Stack",
    ],
    toolsList: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "phpMyAdmin",
      "XAMPP",
      "Apache",
    ],
    videoUrl: "/projects/Web1%20Project.mp4",
    context:
      "As the final capstone requirement for Web Systems and Technologies (IT211), the objective was to engineer an end-to-end commercial web solution from scratch—demonstrating core web standards, DOM scripting, dynamic server-side processing, and relational database management without external frameworks.",
    process:
      "Structured the café's digital identity with responsive semantic HTML5 and custom modular CSS layouts. Implemented client-side interactivity and menu filtering with vanilla JavaScript, authored PHP backend scripts to handle customer orders and catalog inquiries, and designed normalized MySQL database tables managed through phpMyAdmin on a local XAMPP Apache development server.",
    features: [
      "Dynamic Product & Beverage Catalog: Categorized coffee, espresso, cold brews, and pastry items with real-time pricing and visual presentation.",
      "Interactive Cart & Order Flow: Client-side order formulation with instant price calculations, item customization, and order submission.",
      "PHP Backend Data Processing: Server-side validation, form processing, and database transaction handling.",
      "phpMyAdmin & MySQL Integration: Relational database storing customer orders, menu records, item availability, and transaction histories.",
      "XAMPP Local Server Architecture: Configured local Apache server and MySQL service environment for rapid development, testing, and demonstration.",
    ],
    result:
      "Successfully designed, built, and presented an end-to-end full-stack web application for the IT211 final requirement, achieving high academic marks and demonstrating proficiency in foundational web architectures.",
    visual: "merch" as const,
    demoUrl: "",
  },
];

export type ProjectColorTheme = {
  id: string;
  name: string;
  primary: string;
  secondary?: string;
  accent?: string;
  gradientClass: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
  glowColor: string;
  hoverBorder: string;
  activeBorder: string;
  accentText: string;
};

export const defaultProjectTheme: ProjectColorTheme = {
  id: "default",
  name: "Classic Blue",
  primary: "#2563eb",
  secondary: "#93c5fd",
  accent: "#1d4ed8",
  gradientClass: "from-blue-600 to-sky-400",
  badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
  badgeBorder: "border-blue-400/30 dark:border-blue-400/20",
  badgeText: "text-blue-600 dark:text-blue-300",
  dotColor: "bg-blue-500",
  glowColor: "rgba(37, 99, 235, 0.22)",
  hoverBorder: "hover:border-blue-500/60 dark:hover:border-blue-400/50",
  activeBorder: "border-blue-500/60 dark:border-blue-400/50",
  accentText: "text-blue-600 dark:text-blue-400",
};

export const projectThemes: Record<string, ProjectColorTheme> = {
  "teacher-anne": {
    id: "teacher-anne",
    name: "Yellow, Violet, Pink",
    primary: "#8b5cf6", // Violet
    secondary: "#eab308", // Yellow
    accent: "#ec4899", // Pink
    gradientClass: "from-amber-400 via-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeBorder: "border-purple-400/30 dark:border-purple-400/20",
    badgeText: "text-purple-600 dark:text-purple-300",
    dotColor: "bg-amber-400",
    glowColor: "rgba(139, 92, 246, 0.25)",
    hoverBorder: "hover:border-purple-500/60 dark:hover:border-purple-400/50",
    activeBorder: "border-purple-500/60 dark:border-purple-400/50",
    accentText: "text-purple-600 dark:text-purple-400",
  },
  "power-bi-data-analytics": {
    id: "power-bi-data-analytics",
    name: "Blue",
    primary: "#2563eb",
    secondary: "#38bdf8",
    accent: "#1d4ed8",
    gradientClass: "from-blue-600 to-sky-400",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeBorder: "border-blue-400/30 dark:border-blue-400/20",
    badgeText: "text-blue-600 dark:text-blue-300",
    dotColor: "bg-blue-500",
    glowColor: "rgba(37, 99, 235, 0.22)",
    hoverBorder: "hover:border-blue-500/60 dark:hover:border-blue-400/50",
    activeBorder: "border-blue-500/60 dark:border-blue-400/50",
    accentText: "text-blue-600 dark:text-blue-400",
  },
  "power-bi-dashboard": {
    id: "power-bi-dashboard",
    name: "Yellow",
    primary: "#eab308",
    secondary: "#f59e0b",
    accent: "#fbbf24",
    gradientClass: "from-amber-500 to-yellow-400",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeBorder: "border-amber-400/30 dark:border-amber-400/20",
    badgeText: "text-amber-600 dark:text-amber-400",
    dotColor: "bg-amber-400",
    glowColor: "rgba(234, 179, 8, 0.25)",
    hoverBorder: "hover:border-amber-500/60 dark:hover:border-amber-400/50",
    activeBorder: "border-amber-500/60 dark:border-amber-400/50",
    accentText: "text-amber-600 dark:text-amber-400",
  },
  "cnhs-learn": {
    id: "cnhs-learn",
    name: "Green, Yellow",
    primary: "#10b981",
    secondary: "#eab308",
    accent: "#059669",
    gradientClass: "from-emerald-500 to-yellow-400",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeBorder: "border-emerald-400/30 dark:border-emerald-400/20",
    badgeText: "text-emerald-600 dark:text-emerald-300",
    dotColor: "bg-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
    hoverBorder: "hover:border-emerald-500/60 dark:hover:border-emerald-400/50",
    activeBorder: "border-emerald-500/60 dark:border-emerald-400/50",
    accentText: "text-emerald-600 dark:text-emerald-400",
  },
  "ayumirich": {
    id: "ayumirich",
    name: "Red, White, Black",
    primary: "#dc2626", // Crimson Red matching logo
    secondary: "#ffffff", // Pure White
    accent: "#0a0a0a", // Deep Black
    gradientClass: "from-red-600 via-neutral-900 to-black",
    badgeBg: "bg-red-500/10 dark:bg-red-500/20",
    badgeBorder: "border-red-400/30 dark:border-red-500/20",
    badgeText: "text-red-600 dark:text-red-400",
    dotColor: "bg-red-600",
    glowColor: "rgba(220, 38, 38, 0.28)",
    hoverBorder: "hover:border-red-500/60 dark:hover:border-red-400/50",
    activeBorder: "border-red-500/60 dark:border-red-400/50",
    accentText: "text-red-600 dark:text-red-400",
  },
  "gray-cafe": {
    id: "gray-cafe",
    name: "Warm Mocha & Amber",
    primary: "#d97706", // Amber / Coffee Gold
    secondary: "#f59e0b",
    accent: "#92400e", // Deep Mocha
    gradientClass: "from-amber-600 via-yellow-600 to-stone-800",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeBorder: "border-amber-400/30 dark:border-amber-400/20",
    badgeText: "text-amber-700 dark:text-amber-300",
    dotColor: "bg-amber-500",
    glowColor: "rgba(217, 119, 6, 0.25)",
    hoverBorder: "hover:border-amber-500/60 dark:hover:border-amber-400/50",
    activeBorder: "border-amber-500/60 dark:border-amber-400/50",
    accentText: "text-amber-600 dark:text-amber-400",
  },
};

export const handover = [
  "Edited files and originals",
  "Written notes for the next person",
  "You keep the accounts",
  "Walkthrough of the finished work",
];

export const steps = [
  {
    title: "Brief",
    body: "I go through what you have now — photos, a page, a shop — and write down what is running, what is broken, and what should stay.",
    icon: "search" as const,
  },
  {
    title: "Make",
    body: "I shoot, edit, or build in a draft first. Nothing goes live until you have seen it end to end.",
    icon: "wand" as const,
  },
  {
    title: "Handover",
    body: "You get the files, the notes, and a working account. No dependency on me to change a single line.",
    icon: "key" as const,
  },
];
