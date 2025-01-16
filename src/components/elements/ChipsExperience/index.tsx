import React from 'react'
import { Props } from './interface'

export const ChipsExperience: React.FC<Props> = ({
  className,
  onClick,
  enabled,
  leftIcon,
  rightIcon,
  text,
  color = '#000000',
}) => {

  return (
    <div
      className={`${className} rounded-full font-bold select-none w-fit flex items-center gap-2 py-3 px-5 transition-all ${
        enabled
          ? `shadow-lg shadow-[#9BF6FF]/25`
          : `shadow-none hover:shadow-lg hover:shadow-[#9BF6FF]/10 cursor-pointer`
      }`}
      onClick={onClick}
    >
      {leftIcon && (
        <img
          src={leftIcon}
          alt="left icon"
          className="h-8 w-8 flex-shrink-0 object-center"
        />
      )}
      <span className="flex items-center">{text}</span>
      {rightIcon && (
        <img
          src={rightIcon}
          alt="right icon"
          className="h-8 w-8 flex-shrink-0 object-center"
        />
      )}
    </div>
  )
}
