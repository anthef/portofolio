import type { Metadata } from "next";
import { Inter, Poppins, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from '@elements'


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
  title: "Anthony Edbert Feriyanto | Personal Website",
  description: "Anthony is currently 18 years old and also He is an Undergraduate Student at the Faculty of Computer Science, University of Indonesia. I am very passionate and interested in Artificial Intelligence and Software Development",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={` ${manrope.variable} ${inter.variable} ${sora.variable} ${poppins.variable} bg-[#1B262C] w-screen flex flex-col items-center`}>
        <Navbar />  
        {children}
      </body>
    </html>
  )
}