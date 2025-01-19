/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
    onClick?: (e:any) => void; 
    enabled?: boolean;
    className?: string;
    leftIcon?: string; 
    rightIcon?: string;
    text: string;
    color?: string;
  }
  