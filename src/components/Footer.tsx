import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react";

import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "../utils";

type FooterElement = JSX.IntrinsicElements["footer"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];
type TranslateFn = (value: string) => ReactNodeLike;

export interface FooterNavItem {
    label: ReactNodeLike;
    href?: string;
    sectionId?: string;
    onClick?: () => void;
}

export interface FooterAction {
    label: ReactNodeLike;
    href?: string;
    sectionId?: string;
    onClick?: () => void;
    variant?: React.ComponentProps<typeof Button>["variant"];
    size?: React.ComponentProps<typeof Button>["size"];
    leadingIcon?: ReactRenderable;
    trailingIcon?: ReactRenderable;
    className?: string;
}

export interface FooterProps extends Omit<FooterElement, "children"> {
    translator?: TranslateFn;
    logoHref?: string;
    renderLogo?: ReactRenderable;
    contactEmail?: string;
    contactEmailHref?: string;
    contactLabel?: ReactNodeLike;
    navItems?: FooterNavItem[];
    legalItems?: FooterNavItem[];
    primaryAction?: FooterAction;
    secondaryAction?: FooterAction;
    tagline?: ReactNodeLike;
    copyrightText?: ReactNodeLike;
    containerClassName?: string;
    actionsClassName?: string;
    navClassName?: string;
    legalClassName?: string;
    particleSlot?: ReactRenderable;
}

const defaultTranslator: TranslateFn = (value) => value;

const translateValue = (
    value: ReactNodeLike,
    translator: TranslateFn
): ReactNodeLike => {
    if (typeof value === "string") {
        return translator(value);
    }
    return value;
};

const safeScrollTo = (targetId?: string) => {
    if (!targetId || typeof document === "undefined") {
        return;
    }
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
};

const handleAction = (action?: FooterAction) => {
    if (!action) {
        return;
    }
    if (action.onClick) {
        action.onClick();
        return;
    }
    if (action.sectionId) {
        safeScrollTo(action.sectionId);
        return;
    }
    if (action.href && typeof window !== "undefined") {
        window.location.href = action.href;
    }
};

export function Footer({
    translator = defaultTranslator,
    logoHref = "https://noxx.agency",
    renderLogo,
    contactEmail = "contact@noxx.agency",
    contactEmailHref,
    contactLabel = "Intelligent AI chatbots for modern businesses",
    navItems,
    legalItems,
    primaryAction,
    secondaryAction,
    tagline,
    copyrightText,
    containerClassName,
    actionsClassName,
    navClassName,
    legalClassName,
    particleSlot,
    className,
    ...footerProps
}: FooterProps) {
    const resolvedNavItems = navItems ?? [
        { label: "Features", sectionId: "features" },
        { label: "Pricing", sectionId: "pricing" },
        { label: "Contact", sectionId: "demo" },
    ];

    const resolvedLegalItems = legalItems ?? [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
    ];

    const resolvedPrimaryAction = useMemo<FooterAction>(
        () =>
            primaryAction ?? {
                label: "Get Started",
                sectionId: "demo",
                variant: "default",
                size: "sm",
                className: "bg-primary hover:bg-primary/90 text-primary-foreground",
            },
        [primaryAction]
    );

    const resolvedSecondaryAction = useMemo<FooterAction>(
        () =>
            secondaryAction ?? {
                    label: "",
                onClick: () => {
                    if (typeof window !== "undefined") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                },
                variant: "outline",
                size: "sm",
                className: "border-border hover:border-primary group",
                    leadingIcon: (
                        <ArrowUp className="h-3 w-3 group-hover:-translate-y-1 transition-transform" />
                    ),
            },
        [secondaryAction]
    );

    const resolvedTagline = tagline ?? contactLabel;
    const resolvedCopyright =
        copyrightText ??
        `© ${new Date().getFullYear()} NOXX Agency. ${translateValue(
            "All rights reserved.",
            translator
        )}`;

    const renderNavItem = (item: FooterNavItem, index: number) => {
        const { label, href, sectionId, onClick } = item;
        const normalizedLabel = translateValue(label, translator);

        if (href) {
            return (
                <a
                    key={`footer-nav-${index}`}
                    href={href}
                    onClick={onClick}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    {normalizedLabel}
                </a>
            );
        }

        return (
            <button
                key={`footer-nav-${index}`}
                onClick={() => {
                    if (onClick) {
                        onClick();
                        return;
                    }
                    safeScrollTo(sectionId);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                type="button"
            >
                {normalizedLabel}
            </button>
        );
    };

    const renderLegalItem = (item: FooterNavItem, index: number) => {
        const { label, href = "#", onClick } = item;
        return (
            <a
                key={`footer-legal-${index}`}
                href={href}
                onClick={onClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                {translateValue(label, translator)}
            </a>
        );
    };

        const renderButton = (action: FooterAction) => {
            const translatedLabel = translateValue(action.label, translator);
            return (
                <Button
                    onClick={() => handleAction(action)}
                    variant={action.variant ?? "default"}
                    size={action.size ?? "sm"}
                    className={cn(action.className)}
                >
                    <span className="flex items-center gap-2">
                        {action.leadingIcon}
                        {translatedLabel}
                        {action.trailingIcon}
                    </span>
                </Button>
            );
        };

    return (
        <footer
            className={cn("bg-secondary/30 border-t border-border", className)}
            {...footerProps}
        >
            {particleSlot}
            <div
                className={cn(
                    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                    containerClassName
                )}
            >
                <motion.div
                    className="flex flex-col lg:flex-row items-center justify-between gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            {renderLogo ?? (
                                <a href={logoHref} target="_blank" rel="noopener noreferrer">
                                    <Logo className="h-8 w-auto" />
                                </a>
                            )}
                        </motion.div>

                        <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
                            <p className="text-sm text-muted-foreground">
                                {translateValue(resolvedTagline, translator)}
                            </p>
                            {contactEmail && (
                                <a
                                    href={contactEmailHref ?? `mailto:${contactEmail}`}
                                    className="text-sm text-primary hover:text-primary/80 underline"
                                >
                                    {contactEmail}
                                </a>
                            )}
                        </div>
                    </div>

                    <div
                        className={cn(
                            "flex flex-wrap items-center justify-center lg:justify-end gap-4",
                            navClassName
                        )}
                    >
                        {resolvedNavItems.map(renderNavItem)}
                        {resolvedLegalItems.map(renderLegalItem)}
                    </div>

                    <div className={cn("flex items-center gap-3", actionsClassName)}>
                                    {renderButton(resolvedPrimaryAction)}
                                    {renderButton(resolvedSecondaryAction)}
                    </div>
                </motion.div>

                <motion.div
                    className={cn("mt-6 pt-4 border-t border-border text-center", legalClassName)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs text-muted-foreground">
                        {translateValue(copyrightText ?? resolvedCopyright, translator)}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
