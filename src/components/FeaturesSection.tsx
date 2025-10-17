import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
    Database,
    FileAudio,
    Calendar,
    Robot,
    Globe,
    Palette,
    Download,
    Shield,
    Lightning,
    Speedometer,
} from "@phosphor-icons/react";

import { FeatureParticleBackground } from "./ParticleBackground";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../utils";

type SectionProps = JSX.IntrinsicElements["section"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];

type TextOverrides = Record<string, ReactNodeLike>;

interface FeatureItem {
    icon: ComponentType<{ className?: string }>;
    title: ReactNodeLike;
    description: ReactNodeLike;
    points: ReactNodeLike[];
    color: string;
}

interface IntegrationItem {
    name: ReactNodeLike;
    icon: ReactRenderable;
    color: string;
}

interface TechnicalHighlight {
    title: ReactNodeLike;
    metric: ReactNodeLike;
    description: ReactNodeLike;
    bullets: ReactNodeLike[];
    icon: ComponentType<{ className?: string }>;
    gradient: string;
    metricClassName?: string;
}

export interface FeaturesSectionProps extends Omit<SectionProps, "children"> {
    text?: TextOverrides;
    features?: FeatureItem[];
    integrations?: IntegrationItem[];
    highlights?: TechnicalHighlight[];
    particleBackground?: ReactRenderable | false;
    backgroundDecorations?: ReactRenderable | false;
}

const defaultFeatures: FeatureItem[] = [
    {
        icon: Database,
        title: "Direct Database Integration",
        description:
            "Connect directly to SQL and NoSQL databases for real-time data queries and updates.",
        points: [
            "MySQL, PostgreSQL, MongoDB",
            "Real-time data sync",
            "Secure query execution",
            "Custom data transformations",
        ],
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: FileAudio,
        title: "File & Audio Recognition",
        description:
            "Process documents, images, and audio files with advanced AI recognition capabilities.",
        points: [
            "PDF, Word, Excel parsing",
            "Image text extraction",
            "Audio transcription",
            "Multi-language support",
        ],
        color: "from-green-500 to-green-600",
    },
    {
        icon: Globe,
        title: "Multiple Language Support",
        description:
            "Communicate with users in their preferred language with real-time translation capabilities.",
        points: [
            "50+ supported languages",
            "Real-time translation",
            "Localized responses",
            "Cultural context awareness",
        ],
        color: "from-indigo-500 to-indigo-600",
    },
    {
        icon: Palette,
        title: "Online Configurator",
        description:
            "Complete customization control - change every color, text, and behavior to match your brand.",
        points: [
            "Real-time visual editor",
            "Custom color schemes",
            "Brand font integration",
            "Live preview updates",
        ],
        color: "from-rose-500 to-rose-600",
    },
    {
        icon: Download,
        title: "1-Click Installation",
        description: "Deploy your chatbot instantly with our streamlined installation process.",
        points: [
            "Single script integration",
            "No coding required",
            "Instant activation",
            "Guided setup wizard",
        ],
        color: "from-emerald-500 to-emerald-600",
    },
    {
        icon: Shield,
        title: "SHA256 Security",
        description:
            "Military-grade encryption protects all communications between chatbot and backend.",
        points: [
            "SHA256 encryption",
            "End-to-end security",
            "GDPR compliant",
            "Zero data leaks",
        ],
        color: "from-red-500 to-red-600",
    },
    {
        icon: Lightning,
        title: "Ultra-Fast Performance",
        description:
            "Lightweight chatbot under 200KB that doesn't affect your website's loading speed or SEO.",
        points: [
            "< 200KB file size",
            "Non-blocking load",
            "Zero page speed impact",
            "99.9% uptime",
        ],
        color: "from-amber-500 to-amber-600",
    },
    {
        icon: Calendar,
        title: "Smart Booking System",
        description:
            "Automated scheduling with calendar integration and intelligent conflict resolution.",
        points: [
            "Google Calendar sync",
            "Automatic scheduling",
            "Timezone handling",
            "Booking confirmations",
        ],
        color: "from-purple-500 to-purple-600",
    },
    {
        icon: Robot,
        title: "n8n Workflow Automation",
        description:
            "Create custom automation workflows that trigger based on chat interactions.",
        points: [
            "Visual workflow builder",
            "API integrations",
            "Conditional logic",
            "Real-time triggers",
        ],
        color: "from-orange-500 to-orange-600",
    },
];

const defaultIntegrations: IntegrationItem[] = [
    {
        name: "MySQL",
        icon: "🐬",
        color:
            "bg-blue-500 text-white border border-blue-600 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700",
    },
    {
        name: "PostgreSQL",
        icon: "🐘",
        color:
            "bg-indigo-500 text-white border border-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700",
    },
    {
        name: "MongoDB",
        icon: "🍃",
        color:
            "bg-green-500 text-white border border-green-600 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
    },
    {
        name: "Google Calendar",
        icon: "📅",
        color:
            "bg-orange-500 text-white border border-orange-600 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700",
    },
    {
        name: "Stripe",
        icon: "💳",
        color:
            "bg-purple-500 text-white border border-purple-600 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700",
    },
    {
        name: "Salesforce",
        icon: "☁️",
        color:
            "bg-cyan-500 text-white border border-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-300 dark:border-cyan-700",
    },
    {
        name: "Slack",
        icon: "💬",
        color:
            "bg-pink-500 text-white border border-pink-600 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700",
    },
    {
        name: "Zapier",
        icon: "⚡",
        color:
            "bg-yellow-500 text-white border border-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700",
    },
];

const defaultHighlights: TechnicalHighlight[] = [
    {
        title: "Lightning Fast",
        metric: "< 200KB",
        description: "Ultra-lightweight chatbot that loads instantly without blocking your page",
        bullets: [
            "Non-blocking async loading",
            "CDN-optimized delivery",
            "Zero impact on page speed",
            "Mobile-optimized",
        ],
        icon: Speedometer,
        gradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
        metricClassName: "text-green-600 dark:text-green-400",
    },
    {
        title: "Military-Grade Security",
        metric: "SHA256",
        description:
            "Every communication encrypted with industry-leading security standards",
        bullets: [
            "End-to-end encryption",
            "GDPR & SOC 2 compliant",
            "Zero data logging",
            "Secure API endpoints",
        ],
        icon: Shield,
        gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
        metricClassName: "text-blue-600 dark:text-blue-400",
    },
    {
        title: "1-Click Deployment",
        metric: "30 sec",
        description:
            "From signup to live chatbot in under 30 seconds with zero coding",
        bullets: [
            "Copy-paste integration",
            "Auto-configuration",
            "Live preview mode",
            "Instant activation",
        ],
        icon: Download,
        gradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
        metricClassName: "text-purple-600 dark:text-purple-400",
    },
];

const defaultBackgroundDecorations = (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl" />
    </div>
);

const translateValue = (value: ReactNodeLike, overrides?: TextOverrides): ReactNodeLike => {
    if (typeof value === "string") {
        return overrides?.[value] ?? value;
    }
    return value;
};

export function FeaturesSection({
    text,
    features = defaultFeatures,
    integrations = defaultIntegrations,
    highlights = defaultHighlights,
    particleBackground = <FeatureParticleBackground />,
    backgroundDecorations = defaultBackgroundDecorations,
    className,
    ...sectionProps
}: FeaturesSectionProps) {
    const sectionClassName = cn(
        "py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden",
        className
    );

    return (
        <section id="features" className={sectionClassName} {...sectionProps}>
            {particleBackground && particleBackground}
            {backgroundDecorations && backgroundDecorations}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        🔥 {translateValue("Powerful Features", text)}
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {translateValue("Beyond Basic", text)}{" "}
                        <span className="gradient-text">{translateValue("Chatbots", text)}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {translateValue(
                            "Our AI chatbots don't just answer questions - they integrate with your entire",
                            text
                        )}{" "}
                        {translateValue(
                            "tech stack to provide intelligent, actionable solutions.",
                            text
                        )}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={`feature-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card backdrop-blur-sm">
                                    <CardHeader className="space-y-4">
                                        <div
                                            className={cn(
                                                "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                                                feature.color
                                            )}
                                        >
                                            <Icon className="h-6 w-6 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl mb-2">
                                                {translateValue(feature.title, text)}
                                            </CardTitle>
                                            <CardDescription className="text-base">
                                                {translateValue(feature.description, text)}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {feature.points.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                                                    {translateValue(item, text)}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-0">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                {translateValue("Seamless Integration with Your Existing Stack", text)}
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                {translateValue(
                                    "Our chatbots work with your current tools and databases,",
                                    text
                                )}{" "}
                                {translateValue(
                                    "requiring minimal setup while providing maximum functionality.",
                                    text
                                )}
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                                {integrations.map((integration, index) => (
                                                    <Badge
                                                        key={`integration-${index}`}
                                                        className={cn(
                                                            "px-4 py-2 font-medium border-0 flex items-center gap-2",
                                                            integration.color
                                                        )}
                                                    >
                                        <span className="text-sm">{integration.icon}</span>
                                        {translateValue(integration.name, text)}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4">
                            ⚡ {translateValue("Technical Excellence", text)}
                        </Badge>
                        <h3 className="text-3xl font-bold mb-6">
                            {translateValue("Built for", text)}{" "}
                            <span className="gradient-text">{translateValue("Performance & Security", text)}</span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {highlights.map((highlight, index) => {
                            const Icon = highlight.icon;
                            return (
                                <Card
                                    key={`highlight-${index}`}
                                    className={cn("border-0 shadow-lg bg-gradient-to-br", highlight.gradient)}
                                >
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-3">
                                            {translateValue(highlight.title, text)}
                                        </h4>
                                        <div className={cn("text-3xl font-bold mb-2", highlight.metricClassName)}>
                                            {translateValue(highlight.metric, text)}
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-4">
                                            {translateValue(highlight.description, text)}
                                        </p>
                                        <ul className="text-xs text-muted-foreground space-y-1 text-left md:text-center">
                                            {highlight.bullets.map((bullet, bulletIndex) => (
                                                <li key={bulletIndex}>• {translateValue(bullet, text)}</li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}