import * as React from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  title?: string;
  description?: string;
  src?: string;
  customSvg?: React.ReactNode;
  customComponent?: React.ReactNode;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export function Logo({ 
  className = "", 
  title = "NOXX Agency Logo",
  description = "Animated NOXX Agency logotype",
  src,
  customSvg,
  customComponent,
  alt = "Logo",
  width,
  height,
  ...props 
}: LogoProps) {
  // If custom component provided, render it
  if (customComponent) {
    return <>{customComponent}</>;
  }

  // If custom SVG provided, render it
  if (customSvg) {
    return <>{customSvg}</>;
  }

  // If image source provided, render img tag
  if (src) {
    return (
      <img 
        src={src} 
        alt={alt}
        width={width || 128}
        height={height || 72}
        className={className}
        {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  }

  // Default NOXX logo
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 72" width={width || "128"} height={height || "72"} role="img" aria-labelledby="title desc" className={className} {...props}>
      <title id="title">{title}</title>
      <desc id="desc">{description}</desc>

      <defs>
        <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#0D6EFD" stopOpacity="1" />
          <stop offset="50%" stopColor="#0D6EFD" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0D6EFD" stopOpacity="1" />
          <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="3s" repeatCount="indefinite" />
        </linearGradient>
      </defs>

      <g transform="translate(4,4)">
        <text x="0" y="44"
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontSize="44"
              fontWeight="700"
              fill="url(#lightGradient)"
              letterSpacing="2.5px">
          NOXX
        </text>

        <text x="135" y="56"
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontSize="12"
              fontWeight="400"
              fill="#666666"
              letterSpacing="3px"
              textAnchor="end">
          AGENCY
        </text>
      </g>
    </svg>

  );
}