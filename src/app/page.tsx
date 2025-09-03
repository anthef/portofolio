import { LandingModule } from "@modules"
import '../app/globals.css';

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
      }} /><main className="bg-gradient-to-b from-primary to-secondary/10 bg-primary z-10">
        <div className="w-full h-full bg-blur-bg bg-cover bg-top bg-no-repeat">
          <div className="text-white w-[80%] mx-auto">
            <LandingModule />
          </div>
        </div>
      </main></>
  )
}