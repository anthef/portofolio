import 'swiper/css'; // Import styles untuk swiper
import 'swiper/css/navigation'; // Import styles untuk navigasi
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import ikon panah
import { Navigation } from 'swiper/modules'; // Import modul navigasi
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Image dari next/image

const educationHistory = [
  { year: '2023-2026', title: "Bachelor's Degree", institution: 'University Indonesia Fakultas Ilmu Komputer', image: '/educations/kuliah.png' },
  { year: '2020-2023', title: "Highschool Degree", institution: 'SMAN 28 Jakarta', image: '/educations/sma.jpeg' },
  { year: '2017-2020', title: 'MiddleSchool Degree', institution: 'SMPN 41 Jakarta', image: '/educations/smp.jpeg' },
  { year: '2012-2017', title: 'Elementary Degree', institution: 'SDN Pondok Labu 11 Pagi', image: '/educations/sd.png' },
];

const Education = () => {
  const [activeSlide, setActiveSlide] = useState(0); // State untuk slide aktif

  return (
    <div id="education" className="education-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="education-title"
      >
        <h1 className="education-title-text">Education</h1>
      </motion.div>

      <div className="education-slider">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          pagination={{ clickable: true }}
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)} // Update active slide
        >
          {educationHistory.map((education, index) => (
            <SwiperSlide key={index} className={activeSlide === index ? 'active' : ''}>
              <div className="education-slide">
                <div className="column-left"></div>
                <div className="column-center">
                  <div className="content">
                    <Image
                      src={education.image}
                      alt={education.title}
                      className="education-image"
                      width={50} 
                      height={100}
                    />
                    <h3 className="content-title">{education.title}</h3>
                    <p className="content-institution">{education.institution}</p>
                    <span className="content-year">{education.year}</span>
                  </div>
                </div>
                <div className="column-right"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tombol navigasi di luar slider */}
      <div className="swiper-button-prev">
        <FaChevronLeft />
      </div>
      <div className="swiper-button-next">
        <FaChevronRight />
      </div>
    </div>
  );
};

export default Education;
