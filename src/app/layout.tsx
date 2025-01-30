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
  title: "Anthony's Portfolio",
  description: "Anthony is currently 18 years old and also He is an Undergraduate Student at the Faculty of Computer Science, University of Indonesia. I am very passionate and interested in Artificial Intelligence and Software Development",
  icons: {
    icon: '/profile/icon.png',  
  }
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



