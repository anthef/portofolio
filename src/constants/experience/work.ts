import { Ahli } from '../Skills'
import { SingularExperienceType } from './interface'

const WorkExperience: SingularExperienceType[] = [
  {
    name: 'Media Kernels Indonesia',
    logo: 'images/companies/mki.png',
    links: [{ name: 'Website', link: 'https://www.traveloka.com/' }],
    location: 'Jakarta, Indonesia',
    roles: [
      {
        name: 'AI Engineer Intern',
        date: 'Sep 2024 - Present',
        description: [
          'Developing an AI chatbot using retrieval augmented generation (RAG) architecture.',
        ],
      },
    ],
    skills: [],
  },
  {
    name: 'Traveloka',
    logo: 'images/companies/traveloka.png',
    links: [{ name: 'Website', link: 'https://www.traveloka.com/' }],
    location: 'Tangerang, Indonesia',
    roles: [
      {
        name: 'Backend Engineer Intern',
        date: 'Feb 2024 - Jun 2024',
        description: [
          'Part of a core team within the company, the Flight Supply team, which is responsible for managing the technology related to airline inventory.',
          'Successfully improved booking health by ~4%, seat selection availability of the top 3 airline providers by ~10%, and our Memcache effectiveness and hit rate by ~15%',
          'Chosen as an intern out of 8700 applicants.',
        ],
      },
    ],
    skills: [Ahli.Java, Ahli.SpringBoot, Ahli.AWS],
  },
  {
    name: 'Transjakarta (Project Based)',
    logo: 'images/companies/transjakarta.png',
    links: [{ name: 'Website', link: 'https://transjakarta.co.id/' }],
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'Machine Learning Engineer',
        date: 'Oct 2023 - Present',
        description: [
          'Developed a backend system for an app that is integrated with an AI model.',
          'The app features include live bus location, estimated time of arrival (ETA), the ability to search for the nearest bus stops, and many more.',
        ],
      },
    ],
    skills: [
      Ahli.ML,
      Ahli.Python,
      Ahli.FastAPI,
      Ahli.GoogleAPI,
      Ahli.Redis,
      Ahli.AWS,
    ],
  },
  {
    name: 'Faculty of Computer Science, Universitas Indonesia',
    headlineRole: 'Teaching Assistant',
    logo: 'images/companies/fasilkom.jpeg',
    date: 'Aug 2022 - Jan 2024',
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'Teaching Assistant for Data Structure and Algorithms',
        date: 'Aug 2023 - Jan 2024',
        description: [
          'Responsible for aiding professors and providing support to students in comprehending course materials.',
          "Created lab exercises and programming tasks to enhance the students' learning experience.",
        ],
      },
      {
        name: 'Teaching Assistant for Programming Foundations 2',
        date: 'Jan 2023 - Jun 2023',
        description: [
          'Responsible for helping professors and assisting students in helping them better understand the Java materials taught in the Programming Foundations 2 course.',
        ],
      },
      {
        name: 'Teaching Assistant for Programming Foundations 1',
        date: 'Jan 2023 - Jun 2023',
        description: [
          'Responsible for helping professors and assisting students in helping them better understand the Python materials taught in Programming Foundations 1 course.',
        ],
      },
    ],
    skills: [Ahli.Python, Ahli.Java],
  },
  {
    name: 'SabilaMall',
    logo: 'images/companies/sabilamall.png',
    links: [{ name: 'Website', link: 'https://www.sabilamall.co.id/' }],
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'Software Engineer Intern',
        date: 'Jun 2023 - Sep 2023',
        description: [
          'Revamped the backend of www.sabilamall.co.id using Express with TypeScript.',
          'This revamp resulted in an impressive average improvement of 50% in response time.',
          'Additionally, we managed and redesigned the MySQL database and successfully migrated it to AWS RDS.',
        ],
      },
    ],
    skills: [
      Ahli.TypeScript,
      Ahli.ExpressJS,
      Ahli.Prisma,
      Ahli.MySQL,
      Ahli.Redis,
      Ahli.AWS,
    ],
  },
  {
    name: 'Xeratic',
    logo: 'images/companies/xeratic.jpeg',
    location: 'Tangerang, Indonesia',
    roles: [
      {
        name: 'Data Ops Engineer Intern',
        date: 'Sep 2022 - Nov 2022',
        description: [
          'Contributed to the Great Giant Foods (GGF) project by utilizing Pentaho for ETL processes and Tableau to create informative dashboards.',
        ],
      },
    ],
    skills: [Ahli.Pentaho, Ahli.Tableau, Ahli.MySQL],
  },
]

export default WorkExperience