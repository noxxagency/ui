'use client';

import { cn } from "../utils";
import { useEffect, useRef, useState } from "react";

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'p' 
  | 'span' 
  | 'strong' 
  | 'em' 
  | 'small' 
  | 'blockquote' 
  | 'code'
  | 'lead'
  | 'large'
  | 'muted';

type AnimationType = 
  | 'none'
  | 'typewriter'
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'flip'
  | 'rotate'
  | 'scale-in';

export interface TypographyProps {
  /** The HTML element to render as */
  as?: TypographyVariant;
  /** Visual variant (can differ from the HTML element) */
  variant?: TypographyVariant;
  /** Content to render */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation type */
  animation?: AnimationType;
  /** Loop animation infinitely */
  loop?: boolean;
  /** Animation speed in milliseconds (for typewriter) or seconds (for CSS animations) */
  animationSpeed?: number;
  /** Delay before animation starts (in milliseconds) */
  animationDelay?: number;
  /** Start animation only when in view */
  animateOnView?: boolean;
  /** Other HTML attributes */
  [key: string]: any;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'scroll-m-20 font-extrabold tracking-tight leading-[1.1]',
  h2: 'scroll-m-20 font-semibold tracking-tight first:mt-0 leading-[1.2]',
  h3: 'scroll-m-20 font-semibold tracking-tight leading-[1.3]',
  h4: 'scroll-m-20 font-semibold tracking-tight leading-[1.4]',
  h5: 'scroll-m-20 font-semibold tracking-tight leading-[1.5]',
  h6: 'scroll-m-20 font-semibold tracking-tight leading-[1.5]',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  span: 'leading-normal',
  strong: 'font-semibold',
  em: 'italic',
  small: 'text-sm font-medium leading-normal',
  blockquote: 'mt-6 border-l-2 pl-6 italic leading-relaxed',
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  lead: 'text-xl text-muted-foreground leading-relaxed',
  large: 'text-lg font-semibold leading-normal',
  muted: 'text-sm text-muted-foreground leading-normal',
};

const defaultElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  strong: 'strong',
  em: 'em',
  small: 'small',
  blockquote: 'blockquote',
  code: 'code',
  lead: 'p',
  large: 'div',
  muted: 'p',
};

const animationStyles: Record<AnimationType, string> = {
  'none': '',
  'typewriter': '',
  'fade-in': 'animate-in fade-in duration-500',
  'slide-up': 'animate-in slide-in-from-bottom-4 duration-500',
  'slide-down': 'animate-in slide-in-from-top-4 duration-500',
  'flip': '[animation:flip_1s_ease-in-out]',
  'rotate': '[animation:rotate_2s_ease-in-out]',
  'scale-in': 'animate-in zoom-in duration-500',
};

// Add keyframes as a style tag
if (typeof document !== 'undefined' && !document.getElementById('typography-animations')) {
  const style = document.createElement('style');
  style.id = 'typography-animations';
  style.textContent = `
    @keyframes flip {
      0%, 100% { transform: rotateX(0deg); }
      50% { transform: rotateX(180deg); }
    }
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-infinite {
      animation-iteration-count: infinite;
    }
  `;
  document.head.appendChild(style);
}

export function Typography({
  as,
  variant,
  children,
  className,
  animation = 'none',
  loop = false,
  animationSpeed = 50,
  animationDelay = 0,
  animateOnView = true,
  ...props
}: TypographyProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(!animateOnView);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  // If no variant is specified, use 'as' as the variant
  // If no 'as' is specified, use 'p' as default
  const effectiveVariant = variant || as || 'p';
  
  // Determine the actual HTML element to render
  // If 'as' is provided and is a standard HTML element (not a variant), use it
  // Otherwise, use defaultElements mapping for the variant
  const isStandardElement = as && !defaultElements[as as TypographyVariant];
  const effectiveElement = isStandardElement 
    ? as 
    : (defaultElements[effectiveVariant as TypographyVariant] || 'p');
  
  const Component = effectiveElement as any;
  
  // Intersection Observer for animateOnView
  useEffect(() => {
    if (!animateOnView || !elementRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          if (!loop) {
            setHasAnimated(true);
          }
        } else if (loop && !entry.isIntersecting) {
          setIsVisible(false);
          if (animation === 'typewriter') {
            setDisplayedText('');
          }
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(elementRef.current);
    
    return () => observer.disconnect();
  }, [animateOnView, hasAnimated, loop, animation]);
  
  // Typewriter effect
  useEffect(() => {
    if (animation !== 'typewriter' || !children || typeof children !== 'string') return;
    if (!isVisible && animateOnView) return;
    
    let timeout: NodeJS.Timeout;
    const text = children as string;
    
    const animateText = () => {
      let currentIndex = 0;
      
      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(typeNextChar, animationSpeed);
        } else if (loop) {
          // Reset and restart
          setTimeout(() => {
            setDisplayedText('');
            currentIndex = 0;
            timeout = setTimeout(typeNextChar, animationSpeed);
          }, 1000);
        }
      };
      
      timeout = setTimeout(typeNextChar, animationDelay);
    };
    
    animateText();
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [animation, children, isVisible, loop, animationSpeed, animationDelay, animateOnView]);
  
  // Build animation classes
  const getAnimationClasses = () => {
    if (animation === 'none' || (animateOnView && !isVisible)) return '';
    if (animation === 'typewriter') return '';
    
    let classes = animationStyles[animation] || '';
    
    // Add loop class for CSS animations
    if (loop && ['flip', 'rotate'].includes(animation)) {
      classes += ' animate-infinite';
    }
    
    // Add duration for CSS animations (not typewriter)
    if (!['typewriter', 'none'].includes(animation) && animationSpeed !== 50) {
      classes += ` duration-${Math.min(Math.round(animationSpeed / 100) * 100, 1000)}`;
    }
    
    // Add delay
    if (animationDelay > 0 && isVisible) {
      const delayClass = Math.min(Math.round(animationDelay / 100) * 100, 1000);
      classes += ` delay-${delayClass}`;
    }
    
    return classes;
  };
  
  const content = animation === 'typewriter' && isVisible ? displayedText : children;
  
  return (
    <Component
      ref={elementRef}
      className={cn(
        variantStyles[effectiveVariant],
        getAnimationClasses(),
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
}
