import Image from 'next/image';
import React from 'react';
import { skillsList } from './skillsList';

interface SkillSliderProps {
  direction?: 'left' | 'right';
  speed?: number; 
}

const SkillSlider: React.FC<SkillSliderProps> = ({ direction = 'left', speed = 20 }) => { 
  const duplicatedSkills = [...skillsList];
  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';

  return (
    <div className="slider-container overflow-hidden w-full">
      <div 
        className="slider-track flex items-center" 
        style={{ animation: `${animationName} ${speed}s linear infinite` }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="slider-item p-4">
            <a href={skill.link} target="_blank" rel="noreferrer" aria-label={skill.alt}>
              <div className="bubble bg-[#24475B] rounded-lg shadow-[#51C8D9] shadow-md w-20 h-20 flex items-center justify-center">
                <Image
                  src={`/skills/${skill.image}`}
                  alt={skill.alt}
                  width={60}
                  height={60}
                  className="max-w-full max-h-full object-contain duration-300 ease-in-out hover:scale-110 hover:rotate-12"
                />
              </div>
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .slider-track {
          display: flex;
          width: calc(100%); 
        }

        /* Tambahan untuk shadow putih */
        .shadow-white {
          box-shadow: 0 4px 6px rgba(255, 255, 255, 255);
        }

        /* Optional: Membuat slider responsif */
        @media (max-width: 768px) {
          .bubble {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillSlider;