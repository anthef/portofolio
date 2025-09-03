import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = "Anthony Edbert Feriyanto | Full Stack Developer & Data Scientist",
  description = "Passionate Full Stack Developer and Data Scientist specializing in AI, Machine Learning, and Modern Web Technologies",
  keywords = "Anthony Edbert Feriyanto, Full Stack Developer, Data Scientist, AI Developer, Machine Learning, React, Next.js, Python, University of Indonesia, Portfolio",
  image = "/profile/personal_photo2.png",
  url = "https://anthony-portofolio.vercel.app",
  type = "website"
}) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Anthony Edbert Feriyanto" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#000F2B" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Anthony's Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@anthony_feriyanto" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#000F2B" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/profile/icon.png" />
      <link rel="apple-touch-icon" href="/profile/icon.png" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Anthony Edbert Feriyanto",
            "jobTitle": "Full Stack Developer & Data Scientist",
            "description": description,
            "url": url,
            "image": image,
            "sameAs": [
              "https://linkedin.com/in/anthony-feriyanto",
              "https://github.com/anthef",
              "https://instagram.com/anthony.feriyanto"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "University of Indonesia",
              "url": "https://ui.ac.id"
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
              "TypeScript",
              "Node.js"
            ],
            "worksFor": {
              "@type": "EducationalOrganization",
              "name": "University of Indonesia"
            }
          })
        }}
      />
    </Head>
  );
};

export default SEO;
