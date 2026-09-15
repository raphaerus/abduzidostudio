import React from 'react';
import logoImg from '../assets/logo.png';

interface LogoProps {
  variant?: 'header' | 'footer' | 'standalone';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animate?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  size = 'md',
  showText = true,
  className = '',
  animate = true,
}) => {
  const isFooter = variant === 'footer';

  // Strict sizing matching exact existing layout bounds
  const imgSize = isFooter ? 'w-8 h-8' : size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Logo container maintaining original dimensions */}
      <div className={`relative flex items-center justify-center shrink-0 ${imgSize}`}>
        {/* Subtle glow aura */}
        <div
          className={`absolute inset-0 rounded-full blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            isFooter
              ? 'bg-brand-turquoise/30'
              : 'bg-brand-blue/30'
          }`}
        />

        {/* Astronaut Logo */}
        <img
          src={logoImg}
          alt="Abduzido Studio Logo"
          width="40"
          height="40"
          className={`w-full h-full object-contain relative z-10 transition-transform duration-300 ${
            animate ? 'group-hover:scale-110' : ''
          }`}
        />
      </div>

      {/* Text Branding */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-bold tracking-wider transition-colors duration-300 ${
              isFooter ? 'text-white text-base' : 'text-brand-text-dark text-[17px]'
            }`}
          >
            ABDUZIDO
          </span>
          <span
            className={`text-[10px] font-medium tracking-[0.25em] uppercase -mt-1 ${
              isFooter ? 'text-brand-turquoise' : 'text-brand-blue'
            }`}
          >
            Studio
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
