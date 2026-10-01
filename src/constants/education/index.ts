export interface EducationType {
  year: string
  title: string
  institution: string
  image: string
}

export const EDUCATION: EducationType[] = [
  {
    year: '2023-2026',
    title: "Bachelor's Degree",
    institution: 'Universitas Indonesia Fakultas Ilmu Komputer',
    image: '/educations/kuliah1.png',
  },
  {
    year: '2020-2023',
    title: 'Highschool Degree',
    institution: 'SMAN 28 Jakarta',
    image: '/educations/sma.jpeg',
  },
  {
    year: '2017-2020',
    title: 'Middle School Degree',
    institution: 'SMPN 41 Jakarta',
    image: '/educations/smp.jpeg',
  },
  {
    year: '2012-2017',
    title: 'Elementary Degree',
    institution: 'SDN Pondok Labu 11 Pagi',
    image: '/educations/sd.png',
  },
]
