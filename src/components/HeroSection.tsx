import React from 'react';
import { cn } from '../utils/cn';
import Button from './Button';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: React.ReactNode;
  };
  badge?: string;
  backgroundGradient?: boolean;
  centered?: boolean;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  badge,
  backgroundGradient = true,
  centered = true,
  className,
}) => {
  const containerStyles = cn(
    'relative w-full overflow-hidden',
    'px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20',
    className
  );

  const contentStyles = cn(
    'relative z-10 mx-auto max-w-7xl',
    centered && 'text-center'
  );

  const titleStyles = cn(
    'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight',
    'text-transparent bg-clip-text',
    'bg-gradient-to-b from-text-primary to-text-secondary',
    'animate-fade-in leading-tight'
  );

  const subtitleStyles = cn(
    'mt-4 text-base sm:text-lg md:text-xl lg:text-2xl',
    'text-text-secondary',
    'max-w-2xl lg:max-w-3xl',
    centered && 'mx-auto',
    'animate-slide-up px-4 sm:px-0'
  );

  const descriptionStyles = cn(
    'mt-3 text-sm sm:text-base lg:text-lg',
    'text-text-muted',
    'max-w-xl lg:max-w-2xl',
    centered && 'mx-auto',
    'animate-slide-up px-4 sm:px-0'
  );

  const actionsStyles = cn(
    'mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4',
    centered && 'justify-center',
    'animate-slide-up px-4 sm:px-0'
  );

  return (
    <section className={containerStyles}>
      {/* Background Gradient Effects */}
      {backgroundGradient && (
        <>
          {/* Main gradient orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-accent-primary/20 via-accent-secondary/10 to-transparent blur-3xl animate-pulse-glow" />
          
          {/* Additional gradient effects */}
          <div className="absolute top-20 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gradient-aurora-1 to-transparent blur-3xl opacity-30 animate-aurora" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-gradient-aurora-2 to-transparent blur-3xl opacity-30 animate-aurora" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </>
      )}

      <div className={contentStyles}>
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium rounded-full bg-accent-primary/10 text-accent-primary border border-accent-primary/20 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
            </span>
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 
          className={titleStyles}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Subtitle */}
        {subtitle && (
          <p 
            className={subtitleStyles}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        {/* Description */}
        {description && (
          <p 
            className={descriptionStyles}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className={actionsStyles}>
            {primaryAction && (
              <Button
                variant="primary"
                size="lg"
                icon={primaryAction.icon}
                onClick={primaryAction.onClick}
                className="w-full sm:w-auto min-w-[160px] text-sm sm:text-base"
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="secondary"
                size="lg"
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
                className="w-full sm:w-auto min-w-[160px] text-sm sm:text-base"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}

        {/* Bottom gradient line */}
        <div className="mt-20 mx-auto max-w-2xl h-px bg-gradient-to-r from-transparent via-border-hover to-transparent opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;