import React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  dot?: boolean;
  outlined?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  outlined = false,
  icon,
  iconPosition = 'left',
  pulse = false,
  className,
  ...props
}) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium',
    'rounded-full transition-all duration-200',
    'whitespace-nowrap'
  );

  const variants = {
    default: outlined
      ? 'bg-transparent border border-border-primary text-text-secondary hover:bg-background-secondary'
      : 'bg-background-tertiary text-text-secondary hover:bg-background-elevated',
    
    primary: outlined
      ? 'bg-transparent border border-accent-primary/30 text-accent-primary hover:bg-accent-primary/10'
      : 'bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20',
    
    secondary: outlined
      ? 'bg-transparent border border-accent-secondary/30 text-accent-secondary hover:bg-accent-secondary/10'
      : 'bg-accent-secondary/10 text-accent-secondary hover:bg-accent-secondary/20',
    
    success: outlined
      ? 'bg-transparent border border-accent-green/30 text-accent-green hover:bg-accent-green/10'
      : 'bg-accent-green/10 text-accent-green hover:bg-accent-green/20',
    
    warning: outlined
      ? 'bg-transparent border border-accent-yellow/30 text-accent-yellow hover:bg-accent-yellow/10'
      : 'bg-accent-yellow/10 text-accent-yellow hover:bg-accent-yellow/20',
    
    error: outlined
      ? 'bg-transparent border border-accent-red/30 text-accent-red hover:bg-accent-red/10'
      : 'bg-accent-red/10 text-accent-red hover:bg-accent-red/20',
    
    info: outlined
      ? 'bg-transparent border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10'
      : 'bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20',
    
    purple: outlined
      ? 'bg-transparent border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10'
      : 'bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs gap-1',
    sm: 'px-2.5 py-1 text-sm gap-1.5',
    md: 'px-3 py-1.5 text-base gap-2',
    lg: 'px-4 py-2 text-lg gap-2.5',
  };

  const dotSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const getDotColor = () => {
    switch (variant) {
      case 'primary': return 'bg-accent-primary';
      case 'secondary': return 'bg-accent-secondary';
      case 'success': return 'bg-accent-green';
      case 'warning': return 'bg-accent-yellow';
      case 'error': return 'bg-accent-red';
      case 'info': return 'bg-accent-blue';
      case 'purple': return 'bg-accent-purple';
      default: return 'bg-text-secondary';
    }
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex items-center justify-center">
          {pulse && (
            <span className={cn(
              'absolute inline-flex rounded-full opacity-75 animate-ping',
              dotSizes[size],
              getDotColor()
            )} />
          )}
          <span className={cn(
            'relative inline-flex rounded-full',
            dotSizes[size],
            getDotColor()
          )} />
        </span>
      )}
      
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </span>
  );
};

export default Badge;