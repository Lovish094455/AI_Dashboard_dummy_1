import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  gradient?: boolean;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  gradient = false,
  hover = true 
}) => {
  return (
    <div 
      className={`
        glass-card
        rounded-2xl 
        transition-all 
        duration-300 
        ${hover ? 'hover:scale-[1.02] hover:shadow-2xl' : ''} 
        ${gradient ? 'glass-ultra' : 'apple-glass'}
        p-6
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold theme-text-primary mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="theme-text-secondary text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;