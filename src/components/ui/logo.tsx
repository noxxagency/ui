import { cn } from "../../utils"

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

export function Logo({ className = "", size = "md", variant = "full" }: LogoProps) {
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  if (variant === "icon") {
    return (
      <svg
        className={cn(sizes[size], className)}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="url(#gradient)" />
        <path
          d="M12 14L20 24L28 14"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 24L20 14L28 24"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className={sizes[size]}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="url(#gradient)" />
        <path
          d="M12 14L20 24L28 14"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 24L20 14L28 24"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <span 
        className={cn(
          "font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
          size === "sm" && "text-base",
          size === "md" && "text-xl",
          size === "lg" && "text-2xl"
        )}
      >
        noxx ui
      </span>
    </div>
  );
}
