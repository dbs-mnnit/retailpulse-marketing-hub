import React from 'react';
import logo from '@/assets/logo.svg';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 group px-2 py-1 transition-all duration-500 hover:scale-[1.02] ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img 
          src={logo} 
          alt="PoleStar Logo" 
          className="relative z-10 h-full w-auto object-contain transition-transform duration-500 group-hover:rotate-[12deg]" 
        />
      </div>
      {showText && (
        <span className="font-display font-black text-2xl tracking-tighter flex items-center">
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-primary bg-[length:200%_auto] animate-pulse bg-clip-text text-transparent">Pole</span>
          <span className="text-foreground transition-colors">star</span>
        </span>
      )}
    </div>
  );
};
