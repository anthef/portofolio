// // components/ResponsiveLayout.tsx
// 'use client';

// import React from 'react';
// import { Navbar, Footer } from '@elements';
// import { useWindowSize } from '@hooks';
// import { Inter, Poppins, Manrope, Sora } from "next/font/google";

// type ResponsiveLayoutProps = {
//   children: React.ReactNode;
//   manrope: any;
//   inter: any;
//   poppins: any;
//   sora: any;
// };

// const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, manrope, inter, poppins, sora }) => {
//   const { width } = useWindowSize();

//   if (width === undefined) {
//     // Optional: Handle the case where width is not yet defined (e.g., during server-side rendering)
//     return null;
//   }

//   return width > 768 ? (
//     <div className={` ${manrope.variable} ${inter.variable} ${sora.variable} ${poppins.variable} bg-[#000F2B] items-center flex flex-col min-h-screen relative`}>
//       <Navbar />
//       <div className="blurry-gradient" style={{ top: '40%', left: '30%' }}></div>
//       <div className="blurry-gradient-2" style={{ bottom: '20%', right: '15%' }}></div>
//       <main>
//         {children}
//       </main>
//       <Footer />
//     </div>
//   ) : (
//     <div className={` ${manrope.variable} ${inter.variable} ${sora.variable} ${poppins.variable} bg-[#000F2B] items-center min-w-screen flex flex-col min-h-screen relative`}>
//       <Navbar />
//       <main>
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ResponsiveLayout;
