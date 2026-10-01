import { LandingModule } from "@modules"

export default function Home() {
  return (
    <><script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Portfolio",
          "name": "Anthony Edbert Feriyanto Portfolio",
          "description": "Full Stack Developer and Data Scientist portfolio showcasing projects, skills, and experience",
          "url": "https://anthony-portofolio.vercel.app",
          "author": {
            "@type": "Person",
            "name": "Anthony Edbert Feriyanto",
            "jobTitle": "Full Stack Developer & Data Scientist",
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "University of Indonesia"
            }
          }
        })
      }} /><LandingModule /></>
  )
}