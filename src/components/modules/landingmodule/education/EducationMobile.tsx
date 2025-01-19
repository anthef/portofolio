// Import necessary modules and styles
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';

const educationHistory = [
  {
    year: '2023-2026',
    title: "Bachelor's Degree",
    institution: 'Universitas Indonesia Fakultas Ilmu Komputer',
    image: '/educations/kuliah.png',
  },
  {
    year: '2020-2023',
    title: "Highschool Degree",
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
];

const EducationMobile = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
  }, []);

  return (
    <div
      id="education"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        position: 'relative', 
        minHeight: '100vh', 
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        style={{
          backgroundImage: 'linear-gradient(to right, #348B96, #2A717A, #24475B, #24475B)',
          boxShadow: `
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 10px 15px rgba(0, 0, 0, 0.2),
            0 20px 25px rgba(0, 0, 0, 0.15),
            0 30px 35px rgba(0, 0, 0, 0.1)
          `,
          border: '2px solid #24475B',
          borderRadius: '9999px',
          outline: '3px solid rgba(36, 71, 91, 0.5)',
        }}
        className="
          px-6 py-3 
          backdrop-blur-lg 
          relative
        "
      >
        <h1 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-white">
          Education
        </h1>
      </motion.div>

      <div
        style={{
          width: '100%',
          maxWidth: '400px', 
          marginTop: '40px',
          marginBottom: '30px',
        }}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{ clickable: true }}
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)} // Update active slide
          // Disable auto height to maintain consistent slide height
          autoHeight={false}
          // Ensure the Swiper container has a fixed height
          style={{ height: '350px' }} // Adjust height as needed
        >
          {educationHistory.map((education, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // Ensure each slide takes full height of Swiper
                height: '100%',
                padding: '20px', // Tambahkan padding untuk ruang shadow
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  backgroundColor: '#123655', // Optional: background for content
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 206, 255, 1), 0 0 30px rgba(0, 206, 255, 0.8)',
                  width: '100%',
                  maxWidth: '300px', // Ensure consistency across slides
                  height: '100%', // Fill the slide height
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                }}
              >
                <Image
                  src={education.image}
                  alt={education.title}
                  style={{
                    borderRadius: '50%',
                    marginBottom: '15px',
                  }}
                  width={80}
                  height={80}
                />
                <h3
                  style={{
                    fontSize: '1rem',
                    marginBottom: '10px',
                    color: '#fff',
                    fontFamily: 'Poppins',
                  }}
                >
                  {education.title}
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '5px',
                    color: '#fff',
                    fontFamily: 'Poppins',
                  }}
                >
                  {education.institution}
                </p>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#bbb',
                    fontFamily: 'Poppins',  
                  }}
                >
                  {education.year}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Buttons */}
      <div
        className="swiper-button-prev"
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')
        }
      >
        <FaChevronLeft />
      </div>
      <div
        className="swiper-button-next"
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)')
        }
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default EducationMobile;
