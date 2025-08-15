import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

// Skip to content link for keyboard navigation
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
        'bg-accent-primary text-white px-4 py-2 rounded-lg z-50',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50'
      )}
    >
      콘텐츠로 건너뛰기
    </a>
  );
};

// Accessible button with proper focus management
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = '로딩 중...',
  disabled,
  children,
  className,
  onClick,
  type = 'button',
  ...restProps
}) => {
  const isDisabled = disabled || loading;
  
  return (
    <button
      type={type}
      className={cn(
        'relative inline-flex items-center justify-center font-medium',
        'transition-all duration-200 rounded-lg',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:scale-105 active:scale-95',
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Style variants
        variant === 'primary' && 'bg-accent-primary text-white focus:ring-accent-primary',
        variant === 'secondary' && 'bg-background-secondary text-text-primary border border-border-primary focus:ring-accent-primary',
        variant === 'tertiary' && 'text-accent-primary hover:bg-accent-primary/5 focus:ring-accent-primary',
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={loading ? loadingText : undefined}
      aria-disabled={isDisabled}
      {...restProps}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
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
      )}
      <span className={loading ? 'sr-only' : undefined}>
        {children}
      </span>
      {loading && <span aria-live="polite">{loadingText}</span>}
    </button>
  );
};

// Accessible form input with proper labeling
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const AccessibleInput: React.FC<AccessibleInputProps> = ({
  label,
  error,
  helperText,
  required = false,
  id,
  className,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  
  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-text-secondary mb-2"
      >
        {label}
        {required && (
          <span className="text-accent-red ml-1" aria-label="필수 입력">
            *
          </span>
        )}
      </label>
      
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 bg-background-secondary border rounded-lg',
          'text-text-primary placeholder:text-text-muted',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary',
          error
            ? 'border-accent-red focus:border-accent-red focus:ring-accent-red'
            : 'border-border-primary focus:border-accent-primary focus:ring-accent-primary',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          errorId && errorId,
          helperId && helperId
        ).trim() || undefined}
        required={required}
        {...props}
      />
      
      {helperText && (
        <p
          id={helperId}
          className="mt-1 text-sm text-text-muted"
          role="note"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-accent-red"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};

// Accessible modal with focus trap
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        
        // Restore focus
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative bg-background-secondary rounded-xl p-6 max-w-md w-full mx-4',
          'focus:outline-none',
          className
        )}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-bold text-text-primary">
            {title}
          </h2>
          
          <button
            onClick={onClose}
            className={cn(
              'p-1 text-text-muted hover:text-text-primary',
              'rounded focus:outline-none focus:ring-2 focus:ring-accent-primary',
              'transition-colors duration-200'
            )}
            aria-label="모달 닫기"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

// Screen reader only text
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
};

// Live region for dynamic content announcements
interface LiveRegionProps {
  children: React.ReactNode;
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  atomic = false
}) => {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic}
      className="sr-only"
    >
      {children}
    </div>
  );
};