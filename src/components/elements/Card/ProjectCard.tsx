"use client";

import React from "react";
import { Chips } from "@elements";
import Image from "next/image";
import { ProjectType } from "src/constants/projects/interface";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { linkIconMapping } from "src/constants/linkicons";

const ProjectCard = ({
  name,
  date,
  image,
  description,
  skills = [],
  links,
}: ProjectType) => {
  return (
    <motion.div
      whileHover={{
        boxShadow: "0 0 15px 3px rgba(155, 246, 255, 0.6)",
      }}
      transition={{ duration: 0.3 }}
      className="relative bg-[#0B3866]/25 p-6 md:p-8 rounded-3xl flex flex-col gap-3 md:gap-4 backdrop-blur-md shadow-xl transition-shadow duration-300 w-full max-w-lg cursor-pointer"
    >
      {image && (
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-4/5 h-50 md:w-4/5 md:h-60">
          <div className="relative w-full h-full">
            <Image
              src={`/projects/${image}`}
              alt={name}
              fill
              priority
              className="rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      )}
      <div className="mt-24 md:mt-32 flex flex-col gap-3 md:gap-4">
        {/* Skills Container with Horizontal Scroll if more than 2 */}
        <div
          className={`flex gap-1 md:gap-2 ${
            skills.length > 2
              ? "flex-nowrap overflow-x-auto pr-2 scrollbar scrollbar-custom" // Added 'scrollbar-custom'
              : "flex-wrap overflow-hidden"
          }`}
        >
          {skills.length > 0 ? (
            skills.map((skill, idx) => {
              if (!skill || !skill.name) {
                console.warn(`Skill at index ${idx} is invalid:`, skill);
                return null;
              }
              return (
                <Chips
                  key={skill.logo}
                  text={skill.name}
                  color={skill.color}
                  leftIcon={skill.logo}
                  className="text-xs md:text-sm flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(skill.link, "_blank");
                  }}
                />
              );
            })
          ) : (
            <p className="text-xs md:text-sm text-gray-500">No skills listed.</p>
          )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-center">{name}</h2>
        <p className="text-xs md:text-sm text-gray-200 text-center">{date}</p>
        
        {/* Updated Description Styling */}
        <p className="text-sm md:text-base text-gray-300 text-left leading-relaxed max-w-full md:max-w-[90%] mx-auto">
          {description}
        </p>

        {links && links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 font-bold text-xs md:text-base">
            {links.map((link, idx) => {
              const IconComponent =
                linkIconMapping[link.name] || FaExternalLinkAlt;
              return (
                <span className="text-secondary" key={idx}>
                  <a
                    href={link.link}
                    className="flex items-center gap-1 font-r-flex font-normal underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconComponent className="inline" />
                    {link.name}
                  </a>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
