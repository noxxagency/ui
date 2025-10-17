import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Shield, Cookie } from "@phosphor-icons/react";

export interface PrivacyModalProps {
    onAcceptAll?: () => void;
    onAcceptEssential?: () => void;
    storageKey?: string;
    analyticsKey?: string;
    autoShow?: boolean;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    'data-testid'?: string;
    // Text customization props
    title?: string;
    description?: string;
    essentialLabel?: string;
    analyticsLabel?: string;
    acceptAllText?: string;
    acceptEssentialText?: string;
    privacyPolicyText?: string;
    cookiePolicyText?: string;
    privacyPolicyLink?: string;
    cookiePolicyLink?: string;
}

export function PrivacyModal({
    onAcceptAll,
    onAcceptEssential,
    storageKey = 'privacy-accepted',
    analyticsKey = 'analytics-enabled',
    autoShow = true,
    className = "",
    style,
    id,
    'data-testid': dataTestId,
    title = "Privacy & Cookies",
    description = "We use cookies and similar technologies to provide the best experience and analyze usage. All data is encrypted with SHA256 and GDPR compliant.",
    essentialLabel = "Essential: Always enabled",
    analyticsLabel = "Analytics: Help us improve",
    acceptAllText = "Accept All",
    acceptEssentialText = "Essential Only",
    privacyPolicyText = "Privacy Policy",
    cookiePolicyText = "Cookie Policy",
    privacyPolicyLink = "/privacy",
    cookiePolicyLink = "/cookies",
}: PrivacyModalProps = {}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (autoShow) {
            const hasAccepted = localStorage.getItem(storageKey);
            if (!hasAccepted) {
                setIsOpen(true);
            }
        }
    }, [autoShow, storageKey]);

    const acceptAll = () => {
        localStorage.setItem(storageKey, 'true');
        localStorage.setItem(analyticsKey, 'true');
        setIsOpen(false);
        onAcceptAll?.();
    };

    const acceptEssential = () => {
        localStorage.setItem(storageKey, 'true');
        localStorage.setItem(analyticsKey, 'false');
        setIsOpen(false);
        onAcceptEssential?.();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center p-4"
                >
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`w-full max-w-md ${className}`}
                        style={style}
                        id={id}
                        data-testid={dataTestId}
                    >
                        <Card className="border-2 border-primary/20 shadow-2xl">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Cookie className="h-8 w-8 text-white" />
                                </div>
                                <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    {title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    {description}
                                </p>
                                
                                <div className="space-y-2">
                                    <Badge variant="outline" className="w-full justify-start">
                                        <Shield className="h-3 w-3 mr-2" />
                                        {essentialLabel}
                                    </Badge>
                                    <Badge variant="secondary" className="w-full justify-start">
                                        <Cookie className="h-3 w-3 mr-2" />
                                        {analyticsLabel}
                                    </Badge>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                                    <Button 
                                        onClick={acceptAll}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                                    >
                                        {acceptAllText}
                                    </Button>
                                    <Button 
                                        onClick={acceptEssential}
                                        variant="outline"
                                        className="flex-1 border-border hover:border-primary"
                                    >
                                        {acceptEssentialText}
                                    </Button>
                                </div>

                                <div className="flex justify-center space-x-4 pt-2">
                                    <a href={privacyPolicyLink} className="text-xs text-muted-foreground hover:text-foreground underline">
                                        {privacyPolicyText}
                                    </a>
                                    <a href={cookiePolicyLink} className="text-xs text-muted-foreground hover:text-foreground underline">
                                        {cookiePolicyText}
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
