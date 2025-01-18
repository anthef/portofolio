import React from 'react';
import Image from 'next/image';
import { AchievementType } from 'src/constants/achievements/interface';
import { Chips } from 'src/components/elements/Chips';

const AchievementCard = ({
  name,
  issuer,
  date,
  image,
  medal,
  description,
  skills,
  links,
}: AchievementType) => {
  return (
    <div className="relative bg-[#0B3866]/25 p-[30px] rounded-[30px] flex flex-col gap-3 md:gap-[15px] backdrop-blur-md shadow-xl w-full max-w-[500px]">
      {image && (
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4/5 h-50 md:w-4/5 md:h-60 z-10">
          <div className="relative w-full h-full">
            <Image
              src={`/achievements/${image}`}
              alt={name}
              fill
              priority
              className="rounded-[15px] object-cover shadow-lg"
            />
          </div>
        </div>
      )}
      <div className="mt-24 md:mt-32 flex flex-col gap-3 md:gap-[15px] z-0">
        <div className="flex gap-1 overflow-x-auto py-2">
          {skills.map((skill) => (
            <Chips
              key={skill.name}
              text={skill.name}
              color={skill.color}
              className="text-sm"
              onClick={() => window.open(skill.link, '_blank')}
            />
          ))}
        </div>
        <h2>
          {medal === 'gold' && <span>🥇 </span>}
          {medal === 'silver' && <span>🥈 </span>}
          {medal === 'bronze' && <span>🥉 </span>}
          {name}
        </h2>
        <p className="text-sm md:text-lg">
          {issuer}, {date}
        </p>
        <p className="text-sm md:text-lg">{description}</p>
        {links && (
          <div className="flex flex-wrap gap-2 font-bold text-sm md:text-lg">
            Links:{' '}
            {links.map((link, idx) => (
              <span className="text-secondary underline" key={idx}>
                <a
                  href={link.link}
                  className="font-r-flex font-normal"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.name}
                </a>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
