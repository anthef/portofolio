import { Ahli } from '../Skills'
import { SingularExperienceType } from './interface'

const WorkExperience: SingularExperienceType[] = [
  {
    name: 'Universitas Indonesia Fakultas Ilmu Komputer',
    logo: 'fasilkom.png',
    links: [{ name: 'Website', link: 'https://cs.ui.ac.id/' }], 
    roles: [
      {
      name : 'Teaching Assistant of Data Structure and Algorithm',
      date : 'Jan 2025 - Present',
      description: [
        'Assist students in understanding the material.',
        'Create and grade assignments.',
        'Hold office hours to help students with their questions.',
      ],
    },
    ],
    skills : [Ahli.Python]
  },
  {
    name: 'Universitas Indonesia Prodi Ilmu Komputer',
    logo: 'fasilkom.png',
    links: [{ name: 'Website', link: 'https://cs.ui.ac.id/' }], 
    roles: [
      {
      name : 'Teaching Assistant of Statistics and Probability',
      date : 'Jan 2025 - Present',
      description: [
        'Assist students in understanding the material.',
        'Create and grade assignments.',
        'Hold office hours to help students with their questions.',
      ],
    },
    ],
    skills : [Ahli.Java]
  },
  {
    name: 'PT. Indonesia Satu Tujuh',
    logo: 'satu_tujuh.png',
    links: [{ name: 'Website', link: 'https://www.ina17.com/' }],
    location: 'Jakarta, Indonesia',
    roles: [
      {
        name: 'Mobile Developer Intern',
        date: 'May 2024 - Aug 2024',
        description: [
          'Create a plugin for banners and translator packages for the Ayo Lari app.',
          'Contribute to developing the demo app for MVI Call in Flutter.',
          "Integrate MVI Call into Huawei's AppGallery.",
          'Develop an app to connect the web view of Ular Tenggo',
        ],
      },
    ],
    skills: [Ahli.Flutter, Ahli.Dart, Ahli.Java, Ahli.Firebase, Ahli.Github, Ahli.Figma],  
  },
  {
    name: 'Universitas Indonesia',
    logo: 'fasilkom.png',
    links: [{ name: 'Website', link: 'https://cs.ui.ac.id/' }], 
    roles: [
      {
      name : 'Teaching Assistant of Calculus 1 International Class Odd Term',
      date : ' Aug 2024 - Des 2024',
      description: [
        'Assist students in understanding the material.',
        'Create and grade assignments.',
        'Hold office hours to help students with their questions.',
      ],
    },
    ],
    skills : []
  },
  {
    name: 'Universitas Indonesia Faculty of Computer Science',
    logo: 'fasilkom.png',
    links: [{ name: 'Website', link: 'https://cs.ui.ac.id/' }], 
    roles: [
      {
      name : 'Teaching Assistant of Calculus 1 International Class Even Term',
      date : 'Jan 2024 - Jul 2024',
      description: [
        'Assist students in understanding the material.',
        'Create and grade assignments.',
        'Hold office hours to help students with their questions.',
      ],
    },
    ],
    skills : []
  },
]

export default WorkExperience