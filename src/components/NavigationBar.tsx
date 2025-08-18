import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../utils/cn';
import Button from './Button';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationBarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  actions?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  logo,
  links = [],
  actions,
  sticky = true,
  transparent = true,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform scroll position to background opacity
  const backgroundOpacity = useTransform(
    scrollY,
    [0, 100],
    [transparent ? 0 : 0.8, 0.95]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    [0, 16]
  );

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  // Add/remove body class for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const baseStyles = cn(
    'w-full min-w-full max-w-full z-50 transition-all duration-300',
    sticky && 'fixed-nav-safe'
  );

  return (
    <motion.nav className={baseStyles} style={{ zIndex: 99999, transform: mobileMenuOpen ? 'none' : undefined }}>
      <motion.div 
        className="px-4 sm:px-6 lg:px-8 transition-all duration-300 border-b border-border-primary"
        style={{
          backgroundColor: `rgba(13, 14, 20, ${backgroundOpacity.get()})`,
          backdropFilter: `blur(${backdropBlur.get()}px)`,
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logo || (
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary" />
                  <span className="text-lg sm:text-xl font-semibold text-text-primary">
                    CareConnect AI
                  </span>
                </Link>
              )}
            </div>

            {/* Navigation Links - Hidden on Mobile */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                    'hover:text-text-primary',
                    link.active ? [
                      'text-text-primary',
                      'after:absolute after:bottom-0 after:left-4 after:right-4',
                      'after:h-[2px] after:bg-gradient-to-r after:from-accent-primary after:to-accent-secondary',
                      'after:rounded-full',
                    ] : 'text-text-secondary'
                  )}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-accent-primary to-accent-secondary" />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                {actions || (
                  <>
                    <Button variant="tertiary" size="sm">
                      Sign In
                    </Button>
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </>
                )}
              </div>
              
              {/* Mobile Actions - Always Visible */}
              <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
                <Button variant="tertiary" size="sm" className="text-xs px-2 py-1.5 sm:px-3">
                  로그인
                </Button>
                <Button variant="primary" size="sm" className="text-xs px-2 py-1.5 sm:px-3">
                  시작하기
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-background-secondary transition-colors flex-shrink-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="w-5 h-5 text-text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden mobile-menu-backdrop"
              style={{ zIndex: 99998 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu */}
            <motion.div 
              className="lg:hidden border-t border-border-primary bg-background-primary/98 backdrop-blur-xl shadow-lg fixed top-0 left-0 right-0 bottom-0 w-screen h-screen"
              style={{ zIndex: 99999 }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-48 space-y-2 h-full overflow-y-auto">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                      'hover:bg-background-secondary hover:text-text-primary',
                      link.active ? [
                        'text-text-primary bg-background-secondary',
                        'border-l-2 border-accent-primary',
                      ] : 'text-text-secondary'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Navigation Only - Actions are in header */}
                <div className="pt-4 border-t border-border-primary">
                  <p className="text-xs text-text-muted text-center">
                    메뉴를 선택하세요
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Glow effect when scrolled */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"
        style={{ zIndex: 99997 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.nav>
  );
};

export default NavigationBar;