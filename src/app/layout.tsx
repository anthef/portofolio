import type { Metadata } from "next";
import { Inter, Poppins, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from '@elements'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"


const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const inter = Inter({ 
  subsets: ["latin"] , 
  variable:'--font-inter',
  weight: ['100','200','300','400','500','600','700','800']
});
const poppins = Poppins({
  subsets:["latin"], 
  variable:'--font-poppins', 
  weight:['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
const sora = Sora({
  subsets:['latin'], 
  variable:'--font-sora',
  weight:['100', '200', '300', '400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: "Anthony Edbert Feriyanto | Full Stack Developer & Data Scientist",
  description: "Anthony Edbert Feriyanto - Passionate Full Stack Developer and Data Scientist from University of Indonesia. Specializing in AI, Machine Learning, Web Development with React, Next.js, Python, and Modern Technologies.",
  keywords: "Anthony Edbert Feriyanto, Full Stack Developer, Data Scientist, AI Developer, Machine Learning, React, Next.js, Python, University of Indonesia, Portfolio, Software Engineer",
  authors: [{ name: "Anthony Edbert Feriyanto" }],
  creator: "Anthony Edbert Feriyanto",
  publisher: "Anthony Edbert Feriyanto",
  openGraph: {
    title: "Anthony Edbert Feriyanto | Full Stack Developer & Data Scientist",
    description: "Passionate Full Stack Developer and Data Scientist specializing in AI, Machine Learning, and Modern Web Technologies",
    url: "https://anthony-portofolio.vercel.app",
    siteName: "Anthony's Portfolio",
    images: [
      {
        url: "/profile/personal_photo2.png",
        width: 1200,
        height: 630,
        alt: "Anthony Edbert Feriyanto - Full Stack Developer & Data Scientist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Edbert Feriyanto | Full Stack Developer & Data Scientist",
    description: "Passionate Full Stack Developer and Data Scientist specializing in AI, Machine Learning, and Modern Web Technologies",
    images: ["/profile/personal_photo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: '/profile/icon.png',  
    apple: '/profile/icon.png',
  },
  metadataBase: new URL('https://anthony-portofolio.vercel.app'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <head>
        <link rel="icon" href="/profile/icon.png" />
        <link rel="canonical" href="https://anthony-portofolio.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000F2B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Anthony Edbert Feriyanto",
              "jobTitle": "Full Stack Developer & Data Scientist",
              "url": "https://anthony-portofolio.vercel.app",
              "image": "https://anthony-portofolio.vercel.app/profile/personal_photo2.png",
              "description": "Passionate Full Stack Developer and Data Scientist specializing in AI, Machine Learning, and Modern Web Technologies",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "University of Indonesia"
              },
              "knowsAbout": [
                "Full Stack Development",
                "Data Science",
                "Artificial Intelligence",
                "Machine Learning",
                "React",
                "Next.js",
                "Python",
                "JavaScript",
                "TypeScript"
              ]
            })
          }}
        />
      </head>
      <body className={` ${manrope.variable} ${inter.variable} ${sora.variable} ${poppins.variable} bg-[#000F2B] items-center min-w-screen flex flex-col min-h-screen relative`}>
        {/* <div className="blurry-gradient" style={{ top: '20%', left: '10%' }}></div>
        <div className="blurry-gradient-2" style={{ bottom: '10%', right: '15%' }}></div> */}
        <Navbar />
        {/* <div className="blurry-gradient" style={{ top: '40%', left: '30%' }}></div>
        <div className="blurry-gradient-2" style={{ bottom: '20%', right: '15%' }}></div> */}
        <main>
          {children}
          <Analytics/>
          <SpeedInsights/>
        </main>
        {/* <div className="blurry-gradient" style={{ top: '20%', left: '10%' }}></div>
        <div className="blurry-gradient-2" style={{ bottom: '10%', right: '15%' }}></div> */}
        <Footer />
      </body>
    </html>
  );
}



