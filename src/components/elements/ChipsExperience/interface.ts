/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
    onClick?: (e:any) => void; 
    enabled?: boolean;
    className?: string;
    leftIcon?: React.ReactNode; 
    rightIcon?: React.ReactNode;
    text: string;
    color: string;
  }
  