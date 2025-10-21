"use client";

import { useEffect, useState } from 'react';
import ParticlesBg from 'particles-bg';

export interface ParticleBackgroundProps {
  type?: 'color' | 'ball' | 'lines' | 'thick' | 'circle' | 'cobweb' | 'polygon' | 'square' | 'tadpole' | 'fountain' | 'random' | 'custom';
  num?: number;
  color?: string;
  bg?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  'data-testid'?: string;
}

export function ParticleBackground({ 
  type = 'circle', 
  num = 8, 
  color,
  bg = true,
  className = '',
  style,
  id,
  'data-testid': dataTestId,
}: ParticleBackgroundProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Get theme-appropriate color
  const getParticleColor = () => {
    if (color) return color;
    
    // Use contrasting colors for visibility
    if (isDark) {
      return '#e2e8f0'; // Light gray for dark mode
    } else {
      return '#475569'; // Dark gray for light mode
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`} 
      style={{ zIndex: 1, ...style }}
      id={id}
      data-testid={dataTestId}
    >
      <ParticlesBg
        type={type}
        num={num}
        color={getParticleColor()}
        bg={false}
      />
    </div>
  );
}

// Pre-configured particle background variations for different sections
export function HeroParticleBackground() {
  return (
    <ParticleBackground
      type="circle"
      num={4}
      className="opacity-15"
      bg={false}
    />
  );
}

export function SectionParticleBackground() {
  return (
    <ParticleBackground
      type="cobweb"
      num={30}
      className="opacity-31"
      bg={true}
    />
  );
}

export function FeatureParticleBackground() {
  return (
    <ParticleBackground
      type="cobweb"
      num={3}
      className="opacity-10"
      bg={false}
    />
  );
}

export function SubtleParticleBackground() {
  return (
    <ParticleBackground
      type="thick"
      num={2}
      className="opacity-5"
      bg={false}
    />
  );
}

export function FountainParticleBackground() {
  return (
    <ParticleBackground
      type="fountain"
      num={2}
      className="opacity-2"
      bg={false}
    />
  );
}

export function PolygonParticleBackground() {
  return (
    <ParticleBackground
      type="polygon"
      num={3}
      className="opacity-10"
      bg={false}
    />
  );
}
