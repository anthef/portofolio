import { Ahli } from '../Skills'
import { SingularExperienceType } from './interface'

const OrgExperience: SingularExperienceType[] = [
  {
    name: 'RISTEK Fasilkom UI',
    logo: 'images/companies/ristek.png',
    links: [{ name: 'Website', link: 'https://ristek.cs.ui.ac.id/' }],
    date: 'Feb 2023 - Present',
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'Lead of Data Science & Analytics SIG',
        date: 'Feb 2024 - Present',
        description: [
          'Actively participated and contributed to achievement in various data science competitions.',
          'Guided and mentored team members to enhance their proficiency in the data science domain such as NLP, CV, Generative AI, etc.',
        ],
      },
      {
        name: 'Lead of Web Development SIG',
        date: 'Feb 2023 - Jan 2024',
        description: [
          'Awarded as the best lead of web development SIG during the first quarter of RISTEK 2023',
          'Contributed to the Data Science SIG by actively participating in various data science competitions.',
          'Collaborate on both internal and external web development projects while also taking charge of guiding and mentoring team members to enhance their prociency in the web development domain.',
        ],
      },
    ],
    skills: [
      Ahli.ML,
      Ahli.CV,
      Ahli.NLP,
      Ahli.Python,
      Ahli.Tensorflow,
      Ahli.Pytorch,
      Ahli.OpenCV,
      Ahli.HuggingFace,
      Ahli.ReactJS,
      Ahli.NextJS,
      Ahli.Django,
      Ahli.ExpressJS,
      Ahli.PostgreSQL,
    ],
  },
  {
    name: 'COMPFEST',
    logo: 'images/companies/compfest.jpeg',
    links: [
      { name: 'DAD Competition Website', link: 'https://dad.compfest.id/' },
      { name: 'COMPFEST Main Website', link: 'http://compfest.id/' },
    ],
    date: 'Oct 2021 - Aug 2023',
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'Technical Committee of Data Analytics Dashboard Competition',
        date: 'Jan 2023 - Aug 2023',
        description: [
          'Developed a Golang-based grader website for the competition using Fiber, and raw query builder PGX.',
          "The website serves as the platform for the COMPFEST 15 Data Analytics Dash Competition. It is designed to evaluate participants' queries, provide information about the competition, and offer details about the questions.",
        ],
      },
      {
        name: 'PIC of Visual Design',
        date: 'Oct 2021 - Jan 2023',
        description: [
          'Responsible for the visual branding of COMPFEST 14',
          "Responsible for leading the team to make graphical assets and products for COMPFEST 14 that's used in website, social media, etc.",
        ],
      },
    ],
    skills: [
      Ahli.Go,
      Ahli.Fiber,
      Ahli.PGX,
      Ahli.PostgreSQL,
      Ahli.Redis,
      Ahli.GraphicDesign,
    ],
  },
  {
    name: 'Pesta Rakyat Komputer Fasilkom UI',
    logo: 'images/companies/perak.jpeg',
    links: [{ name: 'Website', link: 'https://perak.cs.ui.ac.id/' }],
    date: 'Jan 2022 - Jul 2023',
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'VPIC of Software Engineering',
        date: 'Jan 2023 - Jul 2023',
        description: [
          'Developed perak.cs.ui.ac.id using T3 App framework that contains NextJs, TRPC, and Prisma.',
          'Responsible for leading the team to make this website.',
        ],
      },
      {
        name: 'Staff of Software Engineering',
        date: 'Oct 2021 - Jan 2023',
        description: [
          'Developed perak.cs.ui.ac.id that serves more than 300 users using NextJs, Typescript, TailwindCSS, and Strapi as the content manager.',
          'Responsible for the PERAK Mart and Gacha feature.',
        ],
      },
    ],
    skills: [
      Ahli.TypeScript,
      Ahli.NextJS,
      Ahli.Prisma,
      Ahli.tRPC,
      Ahli.PostgreSQL,
      Ahli.TailwindCSS,
      Ahli.Strapi,
    ],
  },
  {
    name: 'Depok Kita',
    logo: 'images/companies/depkit.png',
    links: [{ name: 'Website', link: 'https://www.depokkita.org/' }],
    date: 'Jan 2022 - Dec 2023',
    location: 'Depok, Indonesia',
    roles: [
      {
        name: 'PIC of Software Engineering',
        date: 'Jan 2023 - Jul 2023',
        description: [
          'Developed a website to support the event using NextJs, Typescript, TailwindCSS, Strapi, and Chakra UI.',
          'Responsible for leading the team consisting of UI/UX Designers and Software Engineers to develop a website.',
        ],
      },
    ],
    skills: [
      Ahli.TypeScript,
      Ahli.NextJS,
      Ahli.Strapi,
      Ahli.TailwindCSS,
      Ahli.ChakraUI,
    ],
  },
  {
    name: 'Garuda Hacks',
    logo: 'images/companies/ghacks.jpeg',
    links: [{ name: 'Website', link: 'https://garudahacks.com/' }],
    date: 'Aug 2021 - Dec 2021',
    location: 'San Francisco, US',
    roles: [
      {
        name: 'Tech and Design Team Member',
        date: 'Jan 2023 - Jul 2023',
        description: [
          'Responsible for developing www.garudahacks.com using HTML, CSS, and JavaScript.',
          'Managed the organization database in Airtable.',
          'Responsible for the visual branding and design for the social media content and UI/UX for the website',
          'Managed the livestream event as the operator.',
        ],
      },
    ],
    skills: [Ahli.GraphicDesign],
  },
]

export default OrgExperience