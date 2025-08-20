import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'gradient' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  animateOnHover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  glow = false,
  gradientDirection = 'to-br',
  animateOnHover = true,
  className,
  ...props
}) => {
  const baseStyles = cn(
    'relative rounded-xl transition-all duration-300',
    'border border-border-primary'
  );

  const variants = {
    default: cn(
      'bg-background-secondary',
      hover && 'hover:bg-background-tertiary hover:border-border-hover'
    ),
    elevated: cn(
      'bg-background-tertiary',
      'shadow-lg shadow-black/20',
      hover && 'hover:bg-background-elevated hover:shadow-xl hover:shadow-black/30 hover:border-border-hover'
    ),
    gradient: cn(
      'bg-background-secondary',
      'overflow-hidden',
      'before:absolute before:inset-0 before:opacity-30',
      `before:bg-gradient-${gradientDirection} before:from-gradient-aurora-1 before:via-gradient-aurora-2 before:to-gradient-aurora-3`,
      'before:animate-aurora',
      hover && 'hover:before:opacity-40 hover:border-border-hover'
    ),
    glass: cn(
      'bg-background-secondary/40',
      'backdrop-blur-lg backdrop-saturate-150',
      'border-border-secondary',
      hover && 'hover:bg-background-secondary/60 hover:border-border-hover'
    ),
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
    xl: 'p-9',
  };

  const glowStyles = glow && cn(
    'shadow-glow',
    hover && 'hover:shadow-glow-lg'
  );

  const cardVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        glowStyles,
        className
      )}
      whileHover={animateOnHover && hover ? "hover" : undefined}
      whileTap={animateOnHover ? "tap" : undefined}
      variants={cardVariants}
      {...(props as any)}
    >
      {variant === 'gradient' && (
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-gradient-aurora-1/20 via-gradient-aurora-2/10 to-gradient-aurora-3/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;