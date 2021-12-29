import * as React from 'react';

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = 'bg-white' }: ICardProps) {
  return (
    <div className={`${className} px-6 py-4 rounded-md`}>
      {children}
    </div>
  )
}

export {Card};
