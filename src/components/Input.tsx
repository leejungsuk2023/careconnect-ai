import React, { forwardRef } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'filled' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  variant = 'default',
  inputSize = 'md',
  className,
  disabled,
  ...props
}, ref) => {
  const baseStyles = cn(
    'w-full bg-transparent text-text-primary placeholder:text-text-muted',
    'transition-all duration-200',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  );

  const containerVariants = {
    default: cn(
      'bg-background-secondary border border-border-primary rounded-lg',
      'hover:border-border-hover',
      'focus-within:border-accent-primary focus-within:ring-2 focus-within:ring-accent-primary/20',
      'focus-within:shadow-[0_0_0_1px_rgba(94,106,210,0.1)]',
      error && 'border-accent-red focus-within:border-accent-red focus-within:ring-accent-red/20'
    ),
    filled: cn(
      'bg-background-tertiary border border-transparent rounded-lg',
      'hover:bg-background-elevated',
      'focus-within:bg-background-secondary focus-within:border-accent-primary',
      'focus-within:ring-2 focus-within:ring-accent-primary/20',
      error && 'border-accent-red focus-within:border-accent-red focus-within:ring-accent-red/20'
    ),
    ghost: cn(
      'bg-transparent border-b border-border-primary rounded-none',
      'hover:border-border-hover',
      'focus-within:border-accent-primary',
      'focus-within:shadow-[0_1px_0_0_rgba(94,106,210,1)]',
      error && 'border-accent-red focus-within:border-accent-red focus-within:shadow-[0_1px_0_0_rgba(239,68,68,1)]'
    ),
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      
      <div className={cn(
        'relative flex items-center',
        containerVariants[variant],
        variant !== 'ghost' && sizes[inputSize],
        'group'
      )}>
        {icon && iconPosition === 'left' && (
          <span className={cn(
            'flex-shrink-0 text-text-muted group-focus-within:text-accent-primary transition-colors',
            iconSizes[inputSize],
            variant === 'ghost' ? 'mr-2' : 'mr-3'
          )}>
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          className={cn(
            baseStyles,
            variant === 'ghost' && sizes[inputSize],
            className
          )}
          disabled={disabled}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className={cn(
            'flex-shrink-0 text-text-muted group-focus-within:text-accent-primary transition-colors',
            iconSizes[inputSize],
            variant === 'ghost' ? 'ml-2' : 'ml-3'
          )}>
            {icon}
          </span>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={cn(
          'mt-2 text-sm',
          error ? 'text-accent-red' : 'text-text-muted'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;