import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Moon, Sun, Monitor } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export interface ThemeSwitcherProps {
  isOverDarkSection?: boolean;
  className?: string;
  buttonVariant?: "default" | "ghost" | "outline" | "secondary" | "link" | "destructive";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  style?: React.CSSProperties;
  id?: string;
  'data-testid'?: string;
  theme?: 'light' | 'dark' | 'system';
  onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
  lightLabel?: string;
  darkLabel?: string;
  systemLabel?: string;
  ariaLabel?: string;
}

export function ThemeSwitcher({ 
  isOverDarkSection = false,
  className = "",
  buttonVariant = "ghost",
  buttonSize = "sm",
  style,
  id,
  'data-testid': dataTestId,
  theme: controlledTheme,
  onThemeChange,
  lightLabel = "Light",
  darkLabel = "Dark",
  systemLabel = "System",
  ariaLabel = "Toggle theme",
}: ThemeSwitcherProps) {
  const [internalTheme, setInternalTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const theme = controlledTheme !== undefined ? controlledTheme : internalTheme;

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && controlledTheme === undefined) {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      if (storedTheme) {
        setInternalTheme(storedTheme);
        applyTheme(storedTheme);
      } else {
        // No stored theme, use system preference
        applyTheme('system');
      }
    }
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    if (theme === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', newTheme === 'dark');
      }
    }
  };
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    if (onThemeChange) {
      onThemeChange(newTheme);
    } else {
      setInternalTheme(newTheme);
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      // Apply theme to document
      applyTheme(newTheme);
    }
  };

  // Prevent body scroll lock when dropdown opens (fixes CLS issue)
  useEffect(() => {
    if (isOpen) {
      // Store current body overflow and scrollbar gutter
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Prevent default behavior by Radix UI and maintain scrollbar space
      document.body.style.overflow = 'auto';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = '0px';
      }
      
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button 
        variant={buttonVariant} 
        size={buttonSize} 
        className={`transition-colors ${className}`}
        style={style}
        disabled
      >
        <Monitor size={20} />
        <span className="sr-only">{ariaLabel}</span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={buttonSize} 
          className={`transition-colors ${className}`}
          style={style}
          id={id}
          data-testid={dataTestId}
        >
          {theme === 'light' && <Sun size={20} />}
          {theme === 'dark' && <Moon size={20} />}
          {theme === 'system' && <Monitor size={20} />}
          <span className="sr-only">{ariaLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        <DropdownMenuItem onClick={() => handleThemeChange('light')} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          {lightLabel}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          {darkLabel}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')} className="cursor-pointer">
          <Monitor className="mr-2 h-4 w-4" />
          {systemLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}