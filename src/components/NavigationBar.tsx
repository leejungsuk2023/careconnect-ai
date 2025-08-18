import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../utils/cn';
import Button from './Button';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Portal을 위한 마운트 체크
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  // 모바일 메뉴 컴포넌트
  const MobileMenu = () => {
    if (!mounted || !mobileMenuOpen) return null;

    return createPortal(
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden mobile-menu-backdrop"
          style={{ zIndex: 999998 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Menu Panel */}
        <motion.div 
          className="lg:hidden bg-background-primary/99 backdrop-blur-xl shadow-2xl fixed top-0 left-0 right-0 bottom-0 mobile-menu-panel"
          style={{ zIndex: 999999 }}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col h-full">
            {/* Header - 닫기 버튼만 */}
            <div className="flex items-center justify-end p-6 border-b border-border-primary">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-background-secondary transition-colors"
              >
                <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 px-6 py-8 space-y-3 overflow-y-auto">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={cn(
                    'block px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200',
                    'hover:bg-background-secondary hover:text-text-primary hover:scale-105',
                    link.active ? [
                      'text-text-primary bg-background-secondary',
                      'border-l-4 border-accent-primary shadow-lg',
                    ] : 'text-text-secondary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-border-primary">
              <div className="flex flex-col gap-3">
                <Button variant="tertiary" size="lg" className="w-full">
                  로그인
                </Button>
                <Button variant="primary" size="lg" className="w-full">
                  시작하기
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </>,
      document.body
    );
  };

  return (
    <motion.nav 
      className={baseStyles} 
      style={{ 
        zIndex: mobileMenuOpen ? 99996 : 99999, 
        transform: mobileMenuOpen ? 'none' : undefined,
        opacity: mobileMenuOpen ? 0.3 : 1,
        pointerEvents: mobileMenuOpen ? 'none' : 'auto'
      }}
    >
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
      </motion.div>

      {/* Glow effect when scrolled */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"
        style={{ zIndex: 99997 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Mobile Menu Portal */}
      <MobileMenu />
    </motion.nav>
  );
};

export default NavigationBar;