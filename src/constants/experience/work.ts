import { Ahli } from '../Skills'
import { SingularExperienceType } from './interface'

const WorkExperience: SingularExperienceType[] = [
  {
    name: 'Latent Space (Halo AI)',
    location: 'On-site',
    roles: [
      {
        name: 'Software Engineer (AI / LLM Engineer)',
        date: 'Apr 2026 - Present',
        description: [
          'Engineered a multi-tenant slotted-column EAV ontology engine (PostgreSQL append-only value log with per-record JSONB snapshots, mirrored to ClickHouse via CDC) allowing any tenant to model arbitrary entities and fields with zero per-tenant DDL; extended the formula kernel with date arithmetic, built an ordered rollup-recompute runner, and added slot-level indexes for hot filter fields.',
          'Built and hardened a multi-provider LLM agent runtime (Anthropic API, OpenAI Responses, and self-hosted open-weight models) serving WhatsApp, Instagram, and marketplace channels; diagnosed a tool name colliding with a reserved provider built-in that silently disabled two failover legs, stopped cross-provider tool-call handle leakage, and made model failover attributable in telemetry.',
          'Led a multi-modal vehicle appraisal system for a lender across 5 vehicle classes, combining damage perception priced against an anchored OEM price book, engine-sound fault classification, and VIN, licence plate, and registration document OCR; designed the anti-hallucination layer that blocked reasoned-not-seen damage and caught a licence plate scored at 0.95 confidence from frames the model was never sent.',
          'Reduced inference cost by migrating brand-monitoring, CRM classification, and vision workloads onto a self-hosted GPU fleet (Qwen, pinned with no commercial fallback), replacing a per-item paid scraping vendor with a self-hosted browser fleet, and applying model tiering with nano-tier models for deterministic extraction and frontier models only for reasoning.',
          'Defined the platform-wide model-visible tool contract and built MCP tool servers exposing monitoring, engagement, commerce, and HR capabilities to agents, with fail-closed caller resolution and granular tool-group entitlement so an agent only sees the actions its tenant is entitled to call.',
        ],
      },
    ],
    skills: [Ahli.Python, Ahli.TypeScript, Ahli.PostgreSQL, Ahli.ClickHouse, Ahli.GCP, Ahli.Terraform, Ahli.MCP],
  },
  {
    name: 'PT. Gojek Tokopedia (GoTo)',
    location: 'Remote',
    roles: [
      {
        name: 'Data Scientist (Internship)',
        date: 'Mar 2026 - Present',
        description: [
          'Developed and evaluated a driver assistant AI system, ensuring model compliance with operational rules and ethical principles, including identifying potential policy violations and biases in model outputs.',
          'Built an OCR-based post-processing pipeline for PDF document extraction, experimenting with image preprocessing strategies to improve text quality on high-complexity and low-resource language corpora (including Batak script).',
          'Performed error analysis on internal embedding models powering Karto (maps) and Mart, examining retrieval and matching failures to identify systematic weakness patterns and inform model iteration.',
          'Applied AI governance practices by managing and analyzing unstructured data, supporting debugging efforts, and improving system reliability for production-grade AI pipelines.',
        ],
      },
    ],
    skills: [Ahli.Python],
  },
  {
    name: 'GDP Labs',
    location: 'Remote',
    roles: [
      {
        name: 'AI Engineer (Internship)',
        date: 'Oct 2025 - Present',
        description: [
          'Developed and integrated an LLM evaluation system, including a Composite Experiment Tracker combining Langfuse for detailed logging and Google Sheets for performance aggregation, enabling structured monitoring and analysis of model outputs.',
          'Led benchmark migration and standardization by adopting SDK-based evaluation frameworks, eliminating redundant custom pipelines and improving system maintainability, consistency, and scalability.',
          'Optimized evaluation pipelines through code refactoring, benchmark compatibility analysis, unit testing, and adaptive evaluator improvements to enhance reliability and observability in AI model development.',
        ],
      },
    ],
    skills: [Ahli.Python, Ahli.Langfuse],
  },
  {
    name: 'PT Fungsitama Cipta Teknologi',
    logo: 'pt_fungsitama_cipta_teknologi_logo.jpeg',
    links: [{ name: 'Website', link: 'https://fungsitama.com/' }],
    location: 'Remote',
    roles: [
      {
        name: 'Full Stack Developer (Internship)',
        date: 'Jun 2025 - Oct 2025',
        description: [
          'To accelerate the development process and maintain a clean, scalable architecture, we use a fullstack boilerplate that integrates Next.js (for the frontend and server-side rendering) with Node.js (as the backend API layer). This boilerplate provides a solid foundation for building modular ERP (Enterprise Resource Planning) systems.',
        ],
      },
    ],
    skills: [Ahli.NextJS, Ahli.NodeJS, Ahli.TypeScript],
  },
  {
    name: 'University of Indonesia',
    logo: 'fasilkom.png',
    links: [{ name: 'Website', link: 'https://cs.ui.ac.id/' }],
    location: 'South Jakarta, Indonesia',
    headlineRole: 'Teaching Assistant',
    roles: [
      {
        name: 'Teaching Assistant of Data Structure & Algorithm, Statistic & Probability, Calculus 1, Database, Data Science & AI',
        date: 'Jan 2024 - Present',
        description: [
          'Designed programming assignments as a problem setter covering key topics such as data structures, dynamic programming, trees, linked lists, and hashing.',
          'Designed and delivered lab sessions on probability theory, covering topics such as Naive Bayes, probability distributions, and expected value.',
          'Guided students in implementing statistical concepts using Python libraries such as NumPy, SciPy, and Matplotlib.',
        ],
      },
    ],
    skills: [Ahli.Python, Ahli.Java, Ahli.SQL],
  },
  {
    name: 'Bukit Vista',
    location: 'Remote',
    roles: [
      {
        name: 'Data Scientist (Internship)',
        date: 'Jan 2025 - Mar 2025',
        description: [
          'Utilized Slack as a primary communication and collaboration tool with cross-functional teams.',
          'Developed a predictive pricing model to optimize property rental rates based on factors such as location, seasonality, and historical booking data.',
          'Conducted data preprocessing, feature engineering, and model evaluation to ensure accurate and robust predictions.',
        ],
      },
    ],
    skills: [Ahli.Python],
  },
  {
    name: 'PT Indonesia Satu Tujuh',
    logo: 'satu_tujuh.png',
    links: [{ name: 'Website', link: 'https://www.ina17.com/' }],
    location: 'South Jakarta, Indonesia',
    roles: [
      {
        name: 'Mobile Developer (Internship)',
        date: 'Jun 2023 - Aug 2023',
        description: [
          'Developed a responsive web application using Flutter, applying the BLoC (Business Logic Component) pattern to effectively separate presentation and business logic, ensuring maintainability and scalability.',
          'Collaborated with team members to implement agile methodologies, enhancing project delivery timelines and team productivity.',
          'Developed mini apps and demo applications for features such as MVI call integration and conducted testing and contributed to the development of the “Ayo Lari” fitness application.',
          'Built a mobile application that connected to a web-based game platform called Judgeme, enabling seamless user interaction across platforms.',
        ],
      },
    ],
    skills: [Ahli.Flutter, Ahli.Dart, Ahli.Java, Ahli.Firebase, Ahli.Figma],
  },
]

export default WorkExperience
