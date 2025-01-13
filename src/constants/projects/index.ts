import { Ahli } from '../Skills'

export const PROJECTS = [
  {
    name: 'JakEt - Jakarta Gadget Web',
    image: 'jaket_web.png',
    date: 'May 2024-Jun 2024',
    description:
      'JakEt (Jakarta Gadget) is a platform designed to meet the needs of South Jakarta residents for reliable and high-quality gadgets. JakEt helps users find gadgets that suit their budget while providing the best specifications available within their price range. JakEt aims to provide a safer, more convenient digital experience for South Jakarta residents, supporting a modern, tech-driven lifestyle.',
    links: [
      {
        name: 'Website',
        link: 'http://anthony-edbert-jaket.pbp.cs.ui.ac.id',
      },
      {
        name: 'GitHub',
        link : 'https://github.com/JakEt-JakartaGadget/JakEt',
      },
    ],
    type: 'SE',
    skills: [Ahli.Python, Ahli.Django], 
  },
  {
    name: 'JakEt - Jakarta Gadget Mobile',
    image: 'jaket_mobile.png',
    date: 'Jan 2024-Feb 2024',
    description:
      'I have developed a mobile version of the JakEt platform, seamlessly integrated with all Android devices by leveraging web-based APIs for smooth functionality and data synchronization. This ensures a cohesive and efficient user experience across platforms.',
    links: [
      {
        name: 'App Release',
        link: 'https://install.appcenter.ms/users/anthonyef09/apps/jaket/distribution_groups/public/releases/7',
      },
      {
        name: 'GitHub',
        link : 'https://github.com/JakEt-JakartaGadget/JakEt-mobile',
      },
      {
        name: 'Promotional Video',
        link : 'https://youtu.be/9mZ9oaxMIR4?si=rf8mx_rD9T8p800U',
      }
    ],
    type: 'SE',
    skills: [Ahli.Python, Ahli.Django, Ahli.Flutter, Ahli.Dart],
  },
  {
    name: 'Ayo Lari',
    image: 'ayo_lari.jpeg',
    date: 'Oct 2023-Present',
    description:
      'This project focuses on designing and implementing plugins for the AyoLari app within the MyTelkomsel ecosystem, aimed at reducing local storage usage while maintaining a seamless user experience. By leveraging advanced technologies such as data compression, cloud integration, and dynamic content delivery, the plugins will enable the app to function efficiently even on devices with limited storage capacity.',
    type: 'SE',
    links: [
      {
        name: 'App Release',
        link : 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm&hl=id'
      }
    ],
    skills: [Ahli.Flutter, Ahli.Dart, Ahli.Firebase], 
  },
]
