import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

export interface NavigationProps {
    className?: string;
    logoClassName?: string;
    navItems?: Array<{ label: string; id: string; href?: string }>;
    showLanguageSwitcher?: boolean;
    showThemeSwitcher?: boolean;
    ctaText?: string;
    ctaAction?: () => void;
    ctaSectionId?: string;
    darkSectionId?: string;
    onMenuToggle?: (isOpen: boolean) => void;
    style?: React.CSSProperties;
    id?: string;
    'data-testid'?: string;
}

export function Navigation({
    className = "",
    logoClassName = "h-auto w-24 md:min-w-32 md:w-auto",
    navItems,
    showLanguageSwitcher = true,
    showThemeSwitcher = true,
    ctaText,
    ctaAction,
    ctaSectionId = "demo",
    darkSectionId = "enterprise",
    onMenuToggle,
    style,
    id,
    'data-testid': dataTestId,
}: NavigationProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOverDarkSection, setIsOverDarkSection] = useState(false);

    // Default nav items if not provided
    const defaultNavItems = [
        { label: "Features", id: "features" },
        { label: "Benefits", id: "benefits" },
        { label: "Pricing", id: "pricing" }
    ];
    const menuItems = navItems || defaultNavItems;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 20);
            
            // Check if we're over the dark section
            const darkSection = document.querySelector(`#${darkSectionId}`);
            if (darkSection) {
                const rect = darkSection.getBoundingClientRect();
                const navHeight = 64; // Navigation height
                const isOverDark = rect.top <= navHeight && rect.bottom >= navHeight;
                setIsOverDarkSection(isOverDark);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, [darkSectionId]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        const newMenuState = false;
        setIsMenuOpen(newMenuState);
        onMenuToggle?.(newMenuState);
    };

    const handleMenuToggle = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        onMenuToggle?.(newState);
    };

    const handleCtaClick = () => {
        if (ctaAction) {
            ctaAction();
        } else {
            scrollToSection(ctaSectionId);
        }
    };

    return (
        <nav 
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-background/98 backdrop-blur-xl border-b border-border shadow-xl' 
                    : isOverDarkSection 
                        ? 'bg-black/20 backdrop-blur-lg shadow-md border-b border-white/10'
                        : 'bg-background/90 backdrop-blur-lg shadow-md border-b border-border/20'
            } ${className}`}
            style={style}
            id={id}
            data-testid={dataTestId}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <a href="https://noxx.agency" target="_blank" rel="noopener noreferrer">
                            <Logo className={logoClassName} />
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item, index) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`transition-colors font-medium text-sm relative group ${
                                    isOverDarkSection 
                                        ? 'text-white/90 hover:text-white' 
                                        : 'text-foreground/80 hover:text-foreground'
                                }`}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </motion.button>
                        ))}
                        {showLanguageSwitcher && <LanguageSwitcher />}
                        {showThemeSwitcher && <ThemeSwitcher isOverDarkSection={isOverDarkSection} />}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button 
                                onClick={handleCtaClick}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {ctaText || "Client Area"}
                            </Button>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        {showLanguageSwitcher && <LanguageSwitcher />}
                        {showThemeSwitcher && <ThemeSwitcher isOverDarkSection={isOverDarkSection} />}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMenuToggle}
                            className={`transition-colors ${
                                isOverDarkSection 
                                    ? 'text-white/90 hover:text-white' 
                                    : 'text-foreground hover:text-accent'
                            }`}
                        >
                            {isMenuOpen ? <X size={24} /> : <List size={24} />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="block w-full text-left text-foreground hover:text-accent transition-colors font-medium py-2"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <Button 
                                onClick={handleCtaClick}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                {ctaText || "Client Area"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}