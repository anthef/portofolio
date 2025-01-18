import { AchievementType } from './interface'
import { Ahli } from '../Skills'

export const ACHIEVEMENTS: AchievementType[] = [
  {
    name: '1st Winner of Data Mining, GEMASTIK XVII',
    issuer:
      'Indonesian Ministry of Education, Culture, Research, and Technology',
    image: 'coming_soon.png',
    date: 'Sep 2024',
    medal: 'gold',
    description:
      'Achieved the gold medal in a prestigious national competition, outperforming 250+ teams through both our research, titled "Automated Assignment of Community Reports Using Early Fusion Multimodal Transformer," and our best performance in classifying tuition fee categories in the final round by leveraging cost-sensitive learning and a hill climbing ensemble method.',
    links: [
      {
        name: 'Selection Paper',
        link: 'https://drive.google.com/file/d/1c45OuSPu52IWSw-3SGVDhqIoO7YcZMrq/view?usp=drive_link',
      },
      {
        name: 'Final Slides',
        link: 'https://drive.google.com/file/d/1Fdxq0KfULVVEbYctaL3gzTDJuFDdDVc7/view?usp=drive_link',
      },
      {
        name: 'Certificate',
        link: 'https://drive.google.com/file/d/15b42mmzUbx5tTK4GC_v89MtPCUuHynTW/view?usp=drive_link',
      },
      {
        name: 'Awarding Announcement',
        link: 'https://www.youtube.com/watch?v=lhh2fzNPjAQ',
      },
    ],
    skills : [Ahli.Python],
    jenjang : 'university'
  },
]