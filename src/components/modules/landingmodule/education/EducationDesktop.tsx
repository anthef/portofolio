import 'swiper/css'; 
import 'swiper/css/navigation';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; 
import { motion } from 'framer-motion';
import Image from 'next/image';

const educationHistory = [
  { year: '2023-2026', title: "Bachelor's Degree", institution: 'Universitas Indonesia Fakultas Ilmu Komputer', image: '/educations/kuliah1.png' },
  { year: '2020-2023', title: "Highschool Degree", institution: 'SMAN 28 Jakarta', image: '/educations/sma.jpeg' },
  { year: '2017-2020', title: 'Middle School Degree', institution: 'SMPN 41 Jakarta', image: '/educations/smp.jpeg' },
  { year: '2012-2017', title: 'Elementary Degree', institution: 'SDN Pondok Labu 11 Pagi', image: '/educations/sd.png' },
];

const EducationDesktop = () => {
  const [activeSlide, setActiveSlide] = useState(0); 

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
          modules={[Navigation]}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)} 
        >
          {educationHistory.map((education, index) => (
            <SwiperSlide key={index} className={activeSlide === index ? 'active' : ''}>
              <div className="education-slide">
                <div className="column-left">
                <h3 className="content-title">{education.title}</h3>
                </div>
                <div className="column-center">
                  <div className="content">
                    <Image
                      src={education.image}
                      alt={education.title}
                      className="education-image"
                      width={50} 
                      height={100}
                    />
                    <p className="content-institution">{education.institution}</p>
                  </div>
                </div>
                <div className="column-right">
                <span className="content-year">{education.year}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="custom-pagination">
        {educationHistory.map((_, index) => (
          <span
            key={index}
            className={`dot ${activeSlide === index ? 'active' : ''}`}
          ></span>
        ))}
      </div>

      <style jsx>{`
        .custom-pagination {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .dot {
          height: 9px;
          width: 9px;
          margin: 0 5px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          transition: background-color 0.3s;
          cursor: pointer;
        }
        .dot.active {
          background-color: #717171;
        }
      `}</style>
    </div>
  );
};

export default EducationDesktop;
