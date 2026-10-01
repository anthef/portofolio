import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistPixelLine } from "geist/font/pixel";
import "./globals.css";
import { Navbar, Footer } from '@elements'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Runs before paint so a stored theme choice is applied without a flash.
// Light is the default; dark only applies when the visitor picked it.
const themeScript = `(function(){try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f5f1",
};

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
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${GeistMono.variable} ${GeistPixelLine.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/profile/icon.png" />
        <link rel="canonical" href="https://anthony-portofolio.vercel.app" />
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
      <body className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">
          {children}
          <Analytics/>
          <SpeedInsights/>
        </main>
        <Footer />
      </body>
    </html>
  );
}



