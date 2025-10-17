'use client';

import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { cn } from '../utils';

type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];

export interface HeaderNavItem {
  label: ReactNodeLike;
  href?: string;
  sectionId?: string;
  onClick?: () => void;
}

export interface HeaderAction {
  label: ReactNodeLike;
  href?: string;
  sectionId?: string;
  onClick?: () => void;
  variant?: React.ComponentProps<typeof Button>['variant'];
  size?: React.ComponentProps<typeof Button>['size'];
  leadingIcon?: ReactRenderable;
  trailingIcon?: ReactRenderable;
  className?: string;
}

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  logoHref?: string;
  logoClassName?: string;
  renderLogo?: ReactRenderable;
  navItems?: HeaderNavItem[];
  primaryAction?: HeaderAction;
  mobileMenuTrigger?: ReactRenderable;
  renderThemeSwitcher?: ReactRenderable;
  renderLanguageSwitcher?: ReactRenderable;
  additionalActions?: ReactRenderable;
  scrollThreshold?: number;
  enableScrollEffect?: boolean;
  enableDarkSectionDetection?: boolean;
  darkSectionId?: string;
  containerClassName?: string;
  useContainer?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'none';
  navClassName?: string;
  mobileNavClassName?: string;
  showMobileMenu?: boolean;
  onMobileMenuChange?: (isOpen: boolean) => void;
}

const safeScrollTo = (targetId?: string) => {
  if (!targetId || typeof document === 'undefined') {
    return;
  }
  const element = document.getElementById(targetId);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const handleNavigation = (item: HeaderNavItem, onComplete?: () => void) => {
  if (item.onClick) {
    item.onClick();
    onComplete?.();
    return;
  }
  if (item.sectionId) {
    safeScrollTo(item.sectionId);
    onComplete?.();
    return;
  }
  if (item.href && typeof window !== 'undefined') {
    window.location.href = item.href;
    onComplete?.();
  }
};

const handleAction = (action?: HeaderAction, onComplete?: () => void) => {
  if (!action) {
    return;
  }
  if (action.onClick) {
    action.onClick();
    onComplete?.();
    return;
  }
  if (action.sectionId) {
    safeScrollTo(action.sectionId);
    onComplete?.();
    return;
  }
  if (action.href && typeof window !== 'undefined') {
    window.location.href = action.href;
    onComplete?.();
  }
};

export function Header({
  logoHref = '/',
  logoClassName = 'h-auto w-24 md:min-w-32 md:w-auto',
  renderLogo,
  navItems = [],
  primaryAction,
  mobileMenuTrigger,
  renderThemeSwitcher,
  renderLanguageSwitcher,
  additionalActions,
  scrollThreshold = 20,
  enableScrollEffect = true,
  enableDarkSectionDetection = false,
  darkSectionId,
  containerClassName,
  useContainer = true,
  maxWidth = '7xl',
  navClassName,
  mobileNavClassName,
  showMobileMenu,
  onMobileMenuChange,
  className,
  ...props
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(showMobileMenu ?? false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  // Sync controlled state
  useEffect(() => {
    if (showMobileMenu !== undefined) {
      setIsMenuOpen(showMobileMenu);
    }
  }, [showMobileMenu]);

  useEffect(() => {
    if (!enableScrollEffect && !enableDarkSectionDetection) {
      return;
    }

    const handleScroll = () => {
      if (enableScrollEffect) {
        setIsScrolled(window.scrollY > scrollThreshold);
      }

      if (enableDarkSectionDetection && darkSectionId) {
        const section = document.getElementById(darkSectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const navHeight = 64; // Header height
          const isOver = rect.top <= navHeight && rect.bottom >= navHeight;
          setIsOverDarkSection(isOver);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollEffect, enableDarkSectionDetection, darkSectionId, scrollThreshold]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMobileMenuChange?.(newState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    onMobileMenuChange?.(false);
  };

  const navButtonClass = isOverDarkSection
    ? 'text-white/90 hover:text-white'
    : 'text-foreground/80 hover:text-foreground';

  // Build container class based on configuration
  const getContainerClass = () => {
    if (containerClassName) {
      return containerClassName;
    }
    
    if (!useContainer) {
      return 'px-4 sm:px-6 lg:px-8';
    }
    
    const maxWidthClass = maxWidth === 'none' ? '' : maxWidth === 'full' ? 'max-w-full' : `max-w-${maxWidth}`;
    return cn(maxWidthClass, 'mx-auto px-4 sm:px-6 lg:px-8');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/98 backdrop-blur-xl border-b border-border shadow-xl'
          : isOverDarkSection
          ? 'bg-black/20 backdrop-blur-lg shadow-md border-b border-white/10'
          : 'bg-background/90 backdrop-blur-lg shadow-md border-b border-border/20',
        className
      )}
      {...props}
    >
      <div className={getContainerClass()}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {renderLogo ?? (
              <a href={logoHref} className="hover:opacity-80 transition-opacity">
                <Logo className={logoClassName} />
              </a>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className={cn('hidden md:flex items-center space-x-8', navClassName)}>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item)}
                className={cn(
                  'transition-colors font-medium text-base relative group',
                  navButtonClass
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            {renderLanguageSwitcher}
            {renderThemeSwitcher}
            {additionalActions}
            {primaryAction && (
              <Button
                variant={primaryAction.variant ?? 'default'}
                size={primaryAction.size ?? 'default'}
                className={cn(
                  'font-medium transition-all duration-200',
                  primaryAction.className
                )}
                onClick={() => handleAction(primaryAction)}
              >
                <span className="flex items-center gap-2">
                  {primaryAction.leadingIcon}
                  {primaryAction.label}
                  {primaryAction.trailingIcon}
                </span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {renderLanguageSwitcher}
            {renderThemeSwitcher}
            {additionalActions}
            {mobileMenuTrigger ?? (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className={cn('transition-colors', navButtonClass)}
              >
                {isMenuOpen ? <X size={24} /> : <List size={24} />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={cn(
            'md:hidden bg-background/95 backdrop-blur-md border-b border-border',
            mobileNavClassName
          )}
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item, closeMenu)}
                className="block w-full text-left text-foreground hover:text-accent transition-colors font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            {primaryAction && (
              <Button
                variant={primaryAction.variant ?? 'default'}
                size={primaryAction.size ?? 'default'}
                className={cn(
                  'w-full',
                  primaryAction.className
                )}
                onClick={() => handleAction(primaryAction, closeMenu)}
              >
                <span className="flex items-center justify-center gap-2">
                  {primaryAction.leadingIcon}
                  {primaryAction.label}
                  {primaryAction.trailingIcon}
                </span>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
