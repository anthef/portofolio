import { IconType } from 'react-icons'
import { FaGithub, FaInstagram, FaKaggle, FaLinkedinIn, FaSpotify } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

export interface ContactType {
    name: string
    url: string
    handle: string
    icon: IconType
}

export const CONTACTS: ContactType[] = [
    {
        name: 'Email',
        url: 'mailto:anthonyef09@gmail.com',
        handle: 'anthonyef09@gmail.com',
        icon: FiMail,
    },
    {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/anthony-edbert-feriyanto',
        handle: 'anthony-edbert-feriyanto',
        icon: FaLinkedinIn,
    },
    {
        name: 'Github',
        url: 'https://github.com/anthef',
        handle: 'anthef',
        icon: FaGithub,
    },
    {
        name: 'Kaggle',
        url : 'https://www.kaggle.com/anthonyferiyanto',
        handle: 'anthonyferiyanto',
        icon: FaKaggle,
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/anth.ef/',
        handle: 'anth.ef',
        icon: FaInstagram,
    },
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/user/jqltb3qtm6d1j70w2rszaoj9r?si=5e3120eb3c1844e6',
        handle: 'spotify',
        icon: FaSpotify,
    },
];

export const CV_URL = '/documents/CV - Anthony Edbert Feriyanto.pdf'
