import { ProjectType } from './interface'
import { Ahli } from '../Skills'

export const PROJECTS: ProjectType[] = [
  {
    name: 'Automatic Assignment of Community Reports on the CRM Platform Using Early Fusion Multimodal Transformer',
    image: 'jaket_web.png',
    date: 'May 2024-Jun 2024',
    description:
      'Conducted an experiment that leveraged Transformer-based models such as DINOv2 and E5 to automatically assign community reports in Jakarta to the respective agencies, aiming to enhance the efficiency of the reporting process.',
    links: [
      {
        name: 'Paper',
        link: 'https://drive.google.com/file/d/1f3iNid15NXVFoLfYQfgfGdZvATOsu5IU/view?usp=drive_link',
      },
    ],
    type: 'AI',
    skills : [Ahli.Phyton],
  },
  {
    name: 'PilgrimPal - Umroh AI App',
    image: 'images/projects/pilgrimpal/image1.jpeg',
    date: 'Jan 2024-Feb 2024',
    description:
      'PilgrimPal is an AI-based mobile application that aims to help pilgrims with their activities related to Umrah. This app contributes to helping pilgrims communicate, informing them of crowdedness in an area, and identifying their future needs. Our two main features are live CCTV crowd detection and AI chatbot assistant.',
    links: [
      {
        name: 'Pitch Deck',
        link: 'https://www.canva.com/design/DAF7nQXyLso/oGE0B96UUZniNcxempFxJQ/view?',
      },
      {
        name: 'Prototype Release',
        link: 'https://github.com/PilgrimPal/pilgrimpal-app/releases/tag/0.1.0%2B2',
      },
    ],
    type: 'All',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Transjakarta App',
    image: 'images/projects/tj app/image1.png',
    date: 'Oct 2023-Present',
    description:
      'Developing an app for PT Transjakarta that leverages an AI model and live GPS to provide live bus location, ETA, and nearby bus stops.',
    
    type: 'SE',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Duren Search Engine',
    image: 'images/projects/duren/image1.png',
    date: 'Dec 2023',
    description:
      'Developed a search engine website that utilizes a Learning to Rank technique. The technique is trained and indexed using the WikiCLIR dataset.',
    links: [
      {
        name: 'Website',
        link: 'https://duren.edutjie.net/',
      },
      {
        name: 'Source Code (Backend)',
        link: 'https://github.com/edutjie/duren-search-engine-be',
      },
    ],
    type: 'All',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Image-based Drugs Search Engine using OCR and Levenshtein Algorithm',
    image: 'images/projects/drug ocr/image1.png',
    date: 'Oct 2023',
    description:
      'Developed an OCR-based drug brand detector for the Kasir Pintar® company during the Airnology 2.0 Data Competition.',
    links: [
      {
        name: 'Slides',
        link: 'https://docs.google.com/presentation/d/1BlHTQLov80DPzyMtRfwblcDp1_Zq5TSP1d2mNSw9es0/edit?usp=drive_link',
      },
      {
        name: 'Source Code',
        link: 'https://github.com/edutjie/drug-ocr',
      },
    ],
    type: 'AI',
    skills : [Ahli.Phyton]
  },
  {
    name: 'High-Accuracy, Low-Cost Model for Indonesian Logistics Sentiment Analysis',
    image: 'images/projects/cb sentiment analysis/image1.png',
    date: 'Oct 2023',
    description:
      'Conducted an experimentona "High-Accuracy, Low-Cost" model for sentiment analysis using self-acquired and pseudo-labeled data obtained through web scraping. The focus of the analysis was on the Indonesian logistics industry.',
    links: [
      {
        name: 'Slides',
        link: 'https://docs.google.com/presentation/d/1Lpaqc8JIjlVnWu0VdvE3ww51-joKPPa554qvu7F40Dk/edit?usp=sharing',
      },
      {
        name: 'Proposal',
        link: 'https://docs.google.com/document/d/1b2yb6K0zvnY7AKaKJ1S5jNREaXFXh69Dmo1Q34D6eEE/edit?usp=sharing',
      },
    ],
    type: 'AI',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Helm Detection on Motorcycle Drivers in Indonesia using Deformable DETR',
    image: 'images/projects/helm detection/image1.png',
    date: 'Jul 2023',
    description:
      'Conducted research for the purpose of GEMASTIK XVI selection. Utilized CCTVs from Bali Tower to create our own dataset.',
    links: [
      {
        name: 'Paper',
        link: 'https://drive.google.com/file/d/1G57th3X3WgnTZwvZypZZSqBeoVZY_eaH/view?usp=drive_link',
      },
    ],
    type: 'AI',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Data Analytics Dashboard Competition Grader Website, COMPFEST 15',
    image: 'images/projects/dad/image1.png',
    date: 'Jun 2023',
    description:
      "This website serves as the platform for the COMPFEST 15 Data Analytics Dash Competition. It is designed to evaluate participants' queries, provide information about the competition, and offer details about the questions. Developed the website using Next.js 13, Fiber, and raw query builder PGX.",
    links: [
      {
        name: 'Website',
        link: 'https://dad.compfest.id/',
      },
    ],
    type: 'SE',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Pesta Rakyat 2022 & 2023 Website, PERAK 2023',
    image: 'images/projects/perak/image1.png',
    date: 'May 2022, Jun 2023',
    description:
      'Developed the 2022 website and led the team to make the 2023 website to accommodate the Pesta Rakyat Komputer event. It had features like mini e-commerce, a leaderboard, built-in games, a Scan Me game, and many more. Developed the website using T3stack (Next.js + tRPC +Prisma) and utilized NextAuth.js for authentication.',
    links: [
      {
        name: 'Website',
        link: 'https://perak.cs.ui.ac.id/',
      },
    ],
    type: 'SE',
    skills : [Ahli.Phyton]
  },
  {
    name: 'Segmentation Self-Driving Car',
    image: 'images/projects/segmentation car/image1.png',
    date: 'Aug 2022',
    description:
      'This project involved training a semantic segmentation model using an image dataset from Cityscapes. Three experiments were conducted using three di erent models namely U-Net, FCN8s, and U-Net x Mobile-Net V2.',
    links: [
      {
        name: 'Source code',
        link: 'https://github.com/edutjie/Computer-Vision-Indonesia.AI/blob/main/8.%20Final%20Project/segmentation_self_driving_car.ipynb',
      },
      {
        name: 'LinkedIn Post',
        link: 'https://www.linkedin.com/posts/edutjie_final-project-segmentation-self-driving-activity-6971711279463903232-E7xZ?utm_source=share&utm_medium=member_desktop',
      },
    ],
    type: 'AI',
    skills : [Ahli.Phyton]
  },
]