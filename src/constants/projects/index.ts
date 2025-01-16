import { Ahli } from '../Skills'

export const PROJECTS = [
  {
    name: "Anthony's Portfolio Website",
    image: 'tba.png',
    date: 'Jan 2025 - Present',
    description:
      "This website is a dynamic showcase of my latest experiences, projects, achievements, and educational journey. It's a platform where I share my professional growth, creative work, and personal milestones. Currently, the design is optimized for desktop users, but I am actively working on making it fully responsive to ensure a seamless and visually appealing experience across all devices. Stay tuned for updates, and thank you for visiting!",
    links: [
      {
        name: 'Website',
        link: 'https://install.appcenter.ms/users/anthonyef09/apps/jaket/distribution_groups/public/releases/7',
      },
      {
        name: 'GitHub',
        link : 'https://github.com/anthef/portofolio',
      },
    ],
    type: 'SE',
    skills: [Ahli.Python, Ahli.Django, Ahli.Flutter, Ahli.Dart],
  },
  {
    name: 'JakEt - Jakarta Gadget Mobile',
    image: 'jaket_mobile.png',
    date: 'Oct 2024 - Dec 2024',
    description:
      'I and my C-02 team have developed a mobile version of the JakEt platform, seamlessly integrated with all Android devices by leveraging web-based APIs for smooth functionality and data synchronization. This ensures a cohesive and efficient user experience across platforms.',
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
    name: 'JakEt - Jakarta Gadget Web',
    image: 'jaket_web.png',
    date: 'Aug 2024 - Oct 2024',
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
    name: 'Ayo Lari',
    image: 'ayo_lari.jpeg',
    date: 'May 2024 - Aug 2024',
    description:
      "With PT. INA Satu Tujuh's Team, This project focuses on designing and implementing plugins for the AyoLari app within the MyTelkomsel ecosystem, aimed at reducing local storage usage while maintaining a seamless user experience. By leveraging advanced technologies such as data compression, cloud integration, and dynamic content delivery, the plugins will enable the app to function efficiently even on devices with limited storage capacity.",
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
