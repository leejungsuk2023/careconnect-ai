import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled = false,
  href,
  external = false,
  className,
  ...props
}) => {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:ring-offset-2 focus:ring-offset-background-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth && 'w-full'
  );

  const variants = {
    primary: cn(
      'bg-gradient-to-r from-accent-primary to-accent-secondary text-white',
      'hover:from-accent-secondary hover:to-accent-primary',
      'active:scale-[0.98]',
      'shadow-lg shadow-accent-primary/25',
      'hover:shadow-xl hover:shadow-accent-primary/30',
      'before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
      'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300'
    ),
    secondary: cn(
      'bg-background-secondary/80 text-text-primary',
      'border border-border-primary',
      'hover:bg-background-tertiary hover:border-border-hover',
      'active:scale-[0.98]',
      'backdrop-blur-sm'
    ),
    tertiary: cn(
      'bg-transparent text-text-primary',
      'border border-border-primary',
      'hover:bg-background-secondary/50 hover:border-border-hover',
      'active:scale-[0.98]'
    ),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
    md: 'px-4 py-2 text-base rounded-lg gap-2',
    lg: 'px-6 py-3 text-lg rounded-xl gap-2.5',
  };

  const isDisabled = disabled || loading;

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const buttonContent = (
    <>
      {loading ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </>
  );

  const commonProps = {
    className: cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    ),
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={!isDisabled ? "hover" : undefined}
          whileTap={!isDisabled ? "tap" : undefined}
          variants={buttonVariants}
          {...commonProps}
        >
          {buttonContent}
        </motion.a>
      );
    } else {
      return (
        <Link href={href} passHref legacyBehavior>
          <motion.a
            whileHover={!isDisabled ? "hover" : undefined}
            whileTap={!isDisabled ? "tap" : undefined}
            variants={buttonVariants}
            {...commonProps}
          >
            {buttonContent}
          </motion.a>
        </Link>
      );
    }
  }

  return (
    <motion.button
      disabled={isDisabled}
      whileHover={!isDisabled ? "hover" : undefined}
      whileTap={!isDisabled ? "tap" : undefined}
      variants={buttonVariants}
      {...commonProps}
      {...(props as any)}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;