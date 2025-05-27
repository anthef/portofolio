import { AchievementType } from './interface'
import { Ahli } from '../Skills'

export const ACHIEVEMENTS: AchievementType[] = [
  {
    name: 'Finalis KIHAJAR STEM Jenjang SMA, Pusat Data dan Teknologi Informasi Kementrian Pendidikan dan Kebudayaan',
    issuer:
      'Pusat Data dan Teknologi Informasi Kementrian Pendidikan dan Kebudayaan',
    image: 'kihajar.png',
    date: 'Aug 2020',
    medal: 'unranked',
    description:
      '',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1j1quR9ZXh7H0btCW4QcrlcGoRWJ4fBms/view?usp=sharing'
      }
    ],
    skills : [],
    jenjang : 'highschool'
  },
  {
    name: 'Peringkat 2 Nilai Asesmen Sumatif Sekolah Program MIPA SMAN 28 Jakarta',
    issuer:
      'SMAN 28 Jakarta',
    image: 'asesmen.jpg',
    date: 'Aug 2023',
    medal: 'silver',
    description:
    '',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1sDsk2GixeVIVCsyHEGDzqSirDunFfMbE/view?usp=sharing'
      }
    ],
    skills : [],
    jenjang : 'highschool'
  },
  {
    name: "Juara 2 Try Out SNBT 2023 'Let's Try It Out' detikEdu",
    issuer:
      'detikEdu',
    image: 'detik.jpeg',
    date: 'Mar 2023',
    medal: 'silver',
    description:
    '',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/drive/folders/1abXQ9qB0lMll99C_nd6nascQ_FiO-BYn'
      },
      {
        name: 'News',
        link : 'https://www.detik.com/edu/edutainment/d-6614231/kisah-anthony-juara-2-try-out-snbt-2023-lets-try-it-out-detikedu'
      }
    ],
    skills : [],
    jenjang : 'highschool'
  },
  {
    name: 'Peringkat 2 Nilai Ijazah Program MIPA SMAN 28 Jakarta',
    issuer:
      'SMAN 28 Jakarta',
    image: 'ijazah.jpg',
    date: 'Aug 2023',
    medal: 'silver',
    description:
    '',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1dxVOmadT-Zev99HpTwGgG-PfHfpn97jP/view?usp=sharing'
      }
    ],
    skills : [],
    jenjang : 'highschool'
  },
  {
    name: 'Ranked 24th of Preliminary Round of of Big Data Challenge, Satria Data 2024',
    issuer:
      'Indonesian Ministry of Education, Culture, Research, and Technology',
    image: 'coming_soon.png',
    date: 'Aug 2024',
    medal: 'unranked',
    description:
     'Managed to achieve a top 24 position out of 450+ teams by creating a classification model to predict which category of "IPOLEKSOSBUDHANKAM" a tweet belongs to',
    links: [
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: 'Represented Universitas Indonesia in Data Mining, GEMASTIK 2024',
    issuer:
      'Indonesian Ministry of Education, Culture, Research, and Technology',
    image: 'gemastik.jpg',
    date: 'Aug 2024',
    medal: 'unranked',
    description:
      "Developed a legal document retrieval system to improve access to legal services in Indonesia. The system utilizes a retrieval framework with reranking techniques to enhance the relevance and accuracy of retrieved legal documents, ensuring users can efficiently find critical legal information within Indonesia's vast legal landscape. This project aims to support legal professionals and the general public in navigating and utilizing legal resources effectively.gs to",
    links: [
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '4th Winner of Machine Learning Competition, Data Slayer 2.0',
    issuer:
      'Telkom Institute of Technology Purwokerto',
    image: 'dataslayer_2.png',
    date: 'Jan 2025',
    medal: '4th',
    description:
      'Overcame 220+ teams by developing a human fall detection system utilizing an ensemble approach combining LightGBM and ResNet. This method effectively identified and analyzed fall events with high accuracy, showcasing the power of integrating machine learning and deep learning techniques.',
    links: [
      {
        name: 'Slides',
        link: 'https://drive.google.com/file/d/1Pzd52pk3Qz9qqc-vnCMezU2by559aZ1m/view?usp=sharing',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '4th Winner of Final Round Datathon 2024, RISTEK Datathon 2024',
    issuer:
      'RISTEK Fasilkom UI',
    image: 'datathon_final.JPG',
    date: 'Aug 2024',
    medal: '4th',
    description:
      'Achieved a top 4 position by solving the problem of developing an e-commerce product retrieval system based on product functionality and brand, enhanced with a bundling feature.',
    links: [
      {
        name: 'Slides',
        link: 'https://drive.google.com/file/d/10c57O2EYwQOcAlg_SH7qurNPNAf1G0Fv/view?usp=sharing',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '4th Winner of Preliminary Round Datathon 2024, RISTEK Datathon 2024',
    issuer:
      'RISTEK Fasilkom UI',
    image: 'datathon_pre.png',
    date: 'Aug 2024',
    medal: '4th',
    description:
      'Achieved a top 4 position out of 250+ teams by solving a fraud detection challenge. Fraud detection involves identifying user actions in a scenario as fraudulent or not. In this competition, fraudulent actions were defined as platform users who had borrowed financial products but failed to make payments by the specified deadline. The problem was tackled using Graph Neural Networks (GNN) to develop an effective detection model.',
    links: [
      {
        name: 'Kaggle',
        link: 'https://www.kaggle.com/competitions/ristek-datathon-2024/leaderboard',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '4th Winner of Preliminary Round FIT Competition 2024, FIT Competition 2024',
    issuer:
      'Faculty of Information Technology, Satya Wacana Christian University',
    image: 'fit.png',
    date: 'Jul 2024',
    medal: '4th',
    description:
      'Achieved a top 4 position out of 70+ teams with proposed multi-layered stacking machine learning models',
    links: [
      {
        name: 'Kaggle',
        link: 'https://www.kaggle.com/competitions/preliminary-round-fit-competition-2024/leaderboard',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '4th Winner and Best Presentation of Dataquest 3.0, Airnology 3.0',
    issuer:
      'Universitas Airlangga',
    image: 'airnology.png',
    date: 'Sep 2024',
    medal: '4th',
    description:
      'Overcame 80+ teams by developing a predictive model using a CPU-based CatBoost framework. I was tasked with building and refining a model to classify network traffic types. The model was designed to handle large and diverse traffic datasets, identify suspicious patterns, and accurately predict traffic categories.',
    links: [
      {
        name: 'Slides',
        link: 'https://drive.google.com/file/d/1wF9IxZWWOFaHjoISwHu6iXoVJhB3Mk_G/view?usp=sharing',
      },
      {
        name: 'Paper',
        link: 'https://drive.google.com/file/d/1rEYEp9DYx_MLGBY8GeF6xmYZTCYpgJOG/view?usp=sharing',
      },
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1yBULWtM15wEa0HKOvVyF4aNRhdU_kXzY/view?usp=sharing',
      },
      {
        name: 'Awarding Announcement',
        link: 'https://www.youtube.com/watch?v=gTZv-v9YjbI',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '10th Winner of Preliminary Round Sebelas Maret Statistics Data Science 2024, Sebelas Maret Statistics Fair',
    issuer:
      'Universitas Sebelas Maret',
    image: 'ssds.png',
    date: 'Sep 2024',
    medal: 'top-10',
    description:
      'Overcame 40+ teams and achieved a top 10 position by utilizing two models for two distinct tasks. The first model focused on weather indicator forecasting, identifying and analyzing key factors such as wind speed, atmospheric pressure, humidity, and rainfall patterns to predict the likelihood and location of extreme weather events like storms and heavy rainfall. The second model analyzed the impact of extreme weather on power grid stability, modeling the relationship between weather intensity and power outages to develop an early warning system for grid operators to take preventive measures.',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1xWpxVa1yp1dZ3AWzOI4nG5tEOwBo8eOD/view?usp=sharing'
      }
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '3rd Winner of Machine Learning Competition, Data Slayer 1.0',
    issuer:
      'Telkom Institute of Technology Purwokerto',
    image: 'dataslayer.jpg',
    date: 'Jan 2024',
    medal: 'bronze',
    description:
      'Overcome other 120+ teams with proposed multi-layered stacking machine learning models to estimate the CO2 vehicle emissions in Indonesia.',
    links: [
      {
        name: 'Slides',
        link: 'https://docs.google.com/presentation/d/12hRNVSqkMcUyWd_pGxGm7P-_eLocYjVbS8aDyY9LcMY/edit?usp=sharing',
      },
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1J4QnXNDN0bwzZe5758NsBC6wWnOXppHu/view?usp=sharing',
      },
      {
        name: 'Awarding Announcement',
        link: 'https://www.youtube.com/watch?v=lhh2fzNPjAQ',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: '3rd Winner of RISTEK Data Competition 2023, Pekan RISTEK',
    issuer:
      'RISTEK Fasilkom UI',
    image: 'pekris.jpeg',
    date: 'Nov 2023',
    medal: 'bronze',
    description:
      'Overcome other 30+ teams with CatBoost models for predicting car prices in Indonesia.',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1VtW_ZQf6gUp6LC8sIetH_9Y88tXhCjiy/view?usp=sharing',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
  {
    name: 'Top 10 Team of Data Science Academy COMPFEST 15',
    issuer:
      'COMPFEST 15',
    image: 'dsa_comp.jpg',
    date: 'Aug 2023',
    medal: 'top-10',
    description:
      'Chosen as one of the top 10 teams out of 250+ participants by conducting research on the effectiveness of flood management across two different periods.',
    links: [
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/1bdwcbxpQBn2cG31iMpt3Le0q6ZGQxOa9/view?usp=sharing',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
]