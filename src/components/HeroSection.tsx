import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "@phosphor-icons/react";

import { HeroParticleBackground } from "./ParticleBackground";
import { Badge } from "./ui/badge";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "../utils";

type SectionProps = JSX.IntrinsicElements["section"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];

export interface HeroStat {
    label: ReactNodeLike;
    icon?: ReactRenderable;
    dotClassName?: string;
}

export interface HeroSectionAction {
    label: ReactNodeLike;
    icon?: ReactRenderable;
    iconPosition?: "left" | "right";
    href?: string;
    target?: string;
    rel?: string;
    buttonProps?: ButtonProps;
}

export interface HeroSectionProps extends Omit<SectionProps, "children"> {
    badge?: ReactNodeLike;
    heading?: ReactNodeLike;
    highlight?: ReactNodeLike;
    description?: ReactNodeLike;
    stats?: HeroStat[];
    primaryAction?: HeroSectionAction | null;
    secondaryAction?: HeroSectionAction | null;
    demoContent?: ReactNodeLike;
    particleBackground?: ReactRenderable | false;
    backgroundDecorations?: ReactRenderable | false;
    containerStyle?: CSSProperties;
}

const scrollToId = (id: string) => {
    if (typeof document === "undefined") {
        return;
    }
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

const defaultStats: HeroStat[] = [
    {
        label: "50+ Languages",
        dotClassName: "bg-green-500 dark:bg-green-400",
    },
    {
        label: "<200KB Size",
        dotClassName: "bg-blue-500 dark:bg-blue-400",
    },
    {
        label: "SHA256 Secure",
        dotClassName: "bg-purple-500 dark:bg-purple-400",
    },
    {
        label: "1-Click Install",
        dotClassName: "bg-orange-500 dark:bg-orange-400",
    },
];

const defaultBackgroundDecorations = (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
    </div>
);

const defaultDemoContent = (
    <div
        id="chatDemo"
        className="w-full max-w-[500px] h-[520px] rounded-[28px] shadow-2xl backdrop-blur-xl bg-background/40 border border-border/60 ring-1 ring-black/5 dark:ring-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4"
    />
);

const createDefaultPrimaryAction = (): HeroSectionAction => ({
    label: "Client Area",
    icon: <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />,
    iconPosition: "right",
    buttonProps: {
        size: "lg",
        className:
            "bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg hover:shadow-xl transition-all duration-200",
        onClick: () => scrollToId("demo"),
    },
});

const createDefaultSecondaryAction = (): HeroSectionAction => ({
    label: "Try Live Demo",
    icon: <Play className="mr-2 h-4 w-4" />,
    iconPosition: "left",
    href: "https://chatbot.noxx.agency",
    target: "_blank",
    rel: "noreferrer",
    buttonProps: {
        size: "lg",
        variant: "outline",
        className: "group border-border hover:border-primary transition-all duration-200",
    },
});

export function HeroSection({
    badge = "🚀 Next-Generation AI Chatbots",
    heading = "Transform Your Website with",
    highlight = "NOXX LLM",
    description =
        "Build sophisticated chatbots with 50+ language support, complete visual customization, database integration, file & audio recognition, and secure 1-click installation. Ultra-fast (<200KB) with SHA256 encryption.",
    stats = defaultStats,
    primaryAction,
    secondaryAction,
    demoContent = defaultDemoContent,
    particleBackground = <HeroParticleBackground />,
    backgroundDecorations = defaultBackgroundDecorations,
    containerStyle,
    className,
    ...sectionProps
}: HeroSectionProps) {
    const resolvedPrimaryAction =
        primaryAction === undefined ? createDefaultPrimaryAction() : primaryAction;
    const resolvedSecondaryAction =
        secondaryAction === undefined ? createDefaultSecondaryAction() : secondaryAction;

    const sectionClassName = cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background",
        className
    );

    const renderAction = (action: HeroSectionAction | null | undefined) => {
        if (!action) {
            return null;
        }

            const {
                label,
                icon,
                iconPosition = "right",
                href,
                target,
                rel,
                buttonProps,
            } = action;

            const mergedButtonProps: ButtonProps = {
                size: "lg",
                ...(buttonProps ?? {}),
            };

        const content = (
            <>
                {iconPosition === "left" && icon}
                <span>{label}</span>
                {iconPosition !== "left" && icon}
            </>
        );

        if (href) {
            return (
                <Button {...mergedButtonProps} asChild>
                    <a href={href} target={target} rel={rel} className="inline-flex items-center">
                        {content}
                    </a>
                </Button>
            );
        }

        return <Button {...mergedButtonProps}>{content}</Button>;
    };

    return (
        <section {...sectionProps} className={sectionClassName} style={containerStyle}>
            {particleBackground && particleBackground}
            {backgroundDecorations && backgroundDecorations}

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Badge variant="secondary" className="mb-4">
                                {badge}
                            </Badge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl font-bold leading-tight"
                        >
                              {heading}{" "}
                            {highlight && <span className="gradient-text">{highlight}</span>}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-muted-foreground leading-relaxed"
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            {renderAction(resolvedPrimaryAction)}
                            {renderAction(resolvedSecondaryAction)}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground"
                        >
                                            {stats.map((stat, index) => (
                                                <div key={index} className="flex items-center">
                                                    {stat.icon ? (
                                                        <span className="mr-2 flex items-center text-base">{stat.icon}</span>
                                                    ) : (
                                                        <span
                                                            className={cn(
                                                                "w-2 h-2 rounded-full mr-2",
                                                                stat.dotClassName ?? "bg-accent"
                                                            )}
                                                        />
                                                    )}
                                                    {stat.label}
                                                </div>
                                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        {demoContent}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}