import { LandingModule } from "@modules"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-primary to-secondary/10 bg-primary z-10">
      <div className="w-full h-full bg-blur-bg bg-cover bg-top bg-no-repeat">
        <div className="text-white w-[80%] mx-auto">
          <LandingModule/>
        </div>
      </div>
    </main>
  )
}