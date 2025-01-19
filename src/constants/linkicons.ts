// src/constants/linkIcons.ts

import { IconType } from 'react-icons'
import { FaGithub, FaFileAlt } from 'react-icons/fa'
import { FiMonitor } from 'react-icons/fi'

interface LinkIconMapping {
  [key: string]: IconType
}

export const linkIconMapping: LinkIconMapping = {
  GitHub: FaGithub,
  Paper: FaFileAlt,
  'Prototype Release': FiMonitor,
}
