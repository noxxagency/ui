import { useState, type ComponentType, type CSSProperties } from "react";
import { motion } from "framer-motion";
import {
    TrendUp,
    Users,
    Clock,
    Shield,
    ArrowRight,
    Palette,
    Globe,
    Lightning,
    Gear,
} from "@phosphor-icons/react";

import { SubtleParticleBackground } from "./ParticleBackground";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { cn } from "../utils";

type SectionProps = JSX.IntrinsicElements["section"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];
type TranslateFn = (value: string) => ReactNodeLike;

export interface BenefitItem {
    icon: ComponentType<{ className?: string }>;
    title: ReactNodeLike;
    description: ReactNodeLike;
    metric: ReactNodeLike;
    details: ReactNodeLike[];
}

export interface UseCaseItem {
    industry: ReactNodeLike;
    title: ReactNodeLike;
    description: ReactNodeLike;
    results: ReactNodeLike[];
    emoji?: ReactRenderable;
}

export interface BenefitsSectionProps
    extends Omit<SectionProps, "children" | "translate"> {
    translator?: TranslateFn;
    badgeContent?: ReactNodeLike;
    headingLines?: ReactNodeLike[];
    subHeading?: ReactNodeLike;
    benefits?: BenefitItem[];
    useCases?: UseCaseItem[];
    initialUseCase?: number;
    ctaLabel?: ReactNodeLike;
    onCtaClick?: () => void;
    particleBackground?: ReactRenderable | false;
    backgroundDecorations?: ReactRenderable | false;
    containerStyle?: CSSProperties;
        useCaseHeading?: ReactNodeLike;
        useCaseHighlight?: ReactNodeLike;
        useCaseResultsLabel?: ReactNodeLike;
}

const defaultTranslator: TranslateFn = (value) => value;

const defaultBenefitItems: BenefitItem[] = [
    {
        icon: TrendUp,
        title: "Increase Conversions by 40%",
        description:
            "Intelligent chatbots guide visitors through your funnel with personalized recommendations.",
        metric: "40% increase",
        details: [
            "Smart product recommendations",
            "Abandoned cart recovery",
            "Lead qualification automation",
            "Real-time sales assistance",
        ],
    },
    {
        icon: Globe,
        title: "50+ Languages Supported",
        description:
            "Communicate with customers worldwide in their native language with real-time translation.",
        metric: "50+ languages",
        details: [
            "Real-time translation",
            "Cultural context awareness",
            "Localized responses",
            "Global customer reach",
        ],
    },
    {
        icon: Palette,
        title: "Complete Customization",
        description:
            "Change every color, text, and behavior with our visual configurator - no coding needed.",
        metric: "100% customizable",
        details: [
            "Visual color picker",
            "Real-time preview",
            "Brand font integration",
            "Custom messaging",
        ],
    },
    {
        icon: Lightning,
        title: "Ultra-Fast Performance",
        description:
            "Under 200KB size with zero impact on your website's loading speed or SEO ranking.",
        metric: "< 200KB",
        details: [
            "Non-blocking load",
            "CDN optimized",
            "99.9% uptime",
            "Mobile optimized",
        ],
    },
    {
        icon: Users,
        title: "24/7 Customer Support",
        description: "Provide instant, accurate responses to customer queries around the clock.",
        metric: "24/7 availability",
        details: [
            "Instant response times",
            "Multilingual support",
            "Escalation to human agents",
            "Consistent service quality",
        ],
    },
    {
        icon: Clock,
        title: "Save 60% on Support Costs",
        description: "Automate routine inquiries and free up your team for complex tasks.",
        metric: "60% cost reduction",
        details: [
            "Automated FAQ responses",
            "Reduced agent workload",
            "Faster issue resolution",
            "Scalable support operations",
        ],
    },
    {
        icon: Shield,
        title: "SHA256 Security",
        description:
            "Military-grade encryption protects all data with enterprise compliance standards.",
        metric: "SHA256 encrypted",
        details: [
            "End-to-end encryption",
            "GDPR compliance",
            "Zero data logging",
            "SOC 2 certified",
        ],
    },
    {
        icon: Gear,
        title: "n8n Workflow Integration",
        description: "Custom automation workflows that connect your chatbot to any service or API.",
        metric: "Unlimited workflows",
        details: [
            "Google Calendar booking",
            "Content generation",
            "Database integration",
            "Custom API connections",
        ],
    },
];

const defaultUseCases: UseCaseItem[] = [
    {
        industry: "E-commerce",
        title: "Smart Shopping Assistant",
        description:
            "Help customers find products, process orders, and handle returns automatically.",
        results: [
            "35% increase in sales",
            "50% reduction in cart abandonment",
            "90% customer satisfaction",
        ],
        emoji: "🛒",
    },
    {
        industry: "Healthcare",
        title: "Patient Support System",
        description:
            "Schedule appointments, provide medical information, and manage patient queries.",
        results: [
            "60% reduction in call volume",
            "95% appointment accuracy",
            "24/7 patient support",
        ],
        emoji: "🏥",
    },
    {
        industry: "Finance",
        title: "Banking Assistant",
        description: "Handle account inquiries, process transactions, and provide financial advice.",
        results: [
            "70% automation rate",
            "40% faster response times",
            "99.9% security compliance",
        ],
        emoji: "🏦",
    },
    {
        industry: "Real Estate",
        title: "Property Advisor",
        description: "Qualify leads, schedule viewings, and provide property information instantly.",
        results: [
            "50% more qualified leads",
            "80% faster response times",
            "30% increase in viewings",
        ],
        emoji: "🏠",
    },
    {
        industry: "Personal Automation",
        title: "n8n Digital Assistant",
        description:
            "Video generation, digital twins, deepfake services, and OpenCV4 integration for automation.",
        results: [
            "100% custom workflows",
            "AI-powered automation",
            "Advanced computer vision",
        ],
        emoji: "🤖",
    },
];

const defaultBackgroundDecorations = (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-2xl" />
    </div>
);

const translateValue = (
    value: ReactNodeLike,
    translate: TranslateFn
): ReactNodeLike => {
    if (typeof value === "string") {
        return translate(value);
    }
    return value;
};

const safeScrollTo = (targetId: string) => {
    if (typeof document === "undefined") {
        return;
    }
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

export function BenefitsSection({
    translator = defaultTranslator,
    badgeContent = "📈 Proven Results",
    headingLines = ["Why Businesses Choose NOXX AI", "Enterprise Solutions Available"],
    subHeading = "Our AI chatbots deliver measurable results that transform your business operations and customer experience.",
    benefits = defaultBenefitItems,
    useCases = defaultUseCases,
    initialUseCase = 0,
    ctaLabel = "Client Area",
    onCtaClick,
    particleBackground = <SubtleParticleBackground />,
    backgroundDecorations = defaultBackgroundDecorations,
    className,
    containerStyle,
        useCaseHeading = "Industry",
        useCaseHighlight = "Success Stories",
        useCaseResultsLabel = "Key Results:",
    ...sectionProps
}: BenefitsSectionProps) {
    const [selectedUseCase, setSelectedUseCase] = useState(
        Math.max(0, Math.min(initialUseCase, useCases.length - 1))
    );

    const handleCta = () => {
        if (onCtaClick) {
            onCtaClick();
            return;
        }
        safeScrollTo("demo");
    };

    const sectionClassName = cn(
        "py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden",
        className
    );

    const primaryHeading = headingLines[0];
    const secondaryHeading = headingLines[1];

    return (
        <section
            id="benefits"
            className={sectionClassName}
            style={containerStyle}
            {...sectionProps}
        >
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
                        {translateValue(badgeContent, translator)}
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 flex flex-col items-center gap-4">
                        {primaryHeading && (
                            <div className="flex items-center gap-3">
                                <span>{translateValue(primaryHeading, translator)}</span>
                            </div>
                        )}
                        {secondaryHeading && (
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🏢</span>
                                                <span className="gradient-text">
                                                    {translateValue(secondaryHeading, translator)}
                                </span>
                            </div>
                        )}
                    </h2>
                    {subHeading && (
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                              {translateValue(subHeading, translator)}
                        </p>
                    )}
                </motion.div>

                <div className="overflow-x-auto md:overflow-visible mb-20">
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4 md:pb-0">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={`benefit-${index}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    className="min-w-[280px] md:min-w-0 flex-shrink-0"
                                >
                                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="h-8 w-8 text-primary-foreground" />
                                            </div>
                                            <div className="text-2xl font-bold text-accent mb-2">
                                                {translateValue(benefit.metric, translator)}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-3">
                                                {translateValue(benefit.title, translator)}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                {translateValue(benefit.description, translator)}
                                            </p>
                                            <ul className="text-xs text-muted-foreground space-y-1">
                                                {benefit.details.map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="flex items-center">
                                                        <div className="w-1 h-1 bg-accent rounded-full mr-2" />
                                                        {translateValue(detail, translator)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {useCases.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h3 className="text-3xl font-bold text-center mb-12">
                                        {translateValue(useCaseHeading, translator)} {" "}
                                        <span className="gradient-text">
                                            {translateValue(useCaseHighlight, translator)}
                                        </span>
                        </h3>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-4">
                                {useCases.map((useCase, index) => (
                                    <motion.div
                                        key={`usecase-${index}`}
                                        whileHover={{ scale: 1.02 }}
                                        className={cn(
                                            "p-6 rounded-xl cursor-pointer transition-all duration-300",
                                            selectedUseCase === index
                                                ? "bg-accent text-accent-foreground shadow-lg"
                                                : "bg-secondary hover:bg-secondary/80"
                                        )}
                                        onClick={() => setSelectedUseCase(index)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-3xl">{useCase.emoji ?? ""}</div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-lg">
                                                      {translateValue(useCase.industry, translator)}
                                                </h4>
                                                <p className="text-sm opacity-80">
                                                      {translateValue(useCase.title, translator)}
                                                </p>
                                            </div>
                                            <ArrowRight
                                                className={cn(
                                                    "h-5 w-5 transition-transform",
                                                    selectedUseCase === index ? "rotate-90" : undefined
                                                )}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                key={selectedUseCase}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border-0 shadow-2xl">
                                    <CardContent className="p-8">
                                        <div className="text-4xl mb-4">
                                            {useCases[selectedUseCase]?.emoji ?? ""}
                                        </div>
                                        <h4 className="text-2xl font-bold mb-4">
                                              {translateValue(useCases[selectedUseCase]?.title, translator)}
                                        </h4>
                                        <p className="text-muted-foreground mb-6">
                                                                    {translateValue(
                                                                        useCases[selectedUseCase]?.description,
                                                                        translator
                                                                    )}
                                        </p>
                                        <div className="space-y-3">
                                            <h5 className="font-semibold">
                                                                        {translateValue(useCaseResultsLabel, translator)}
                                            </h5>
                                            {useCases[selectedUseCase]?.results?.map((result, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3" />
                                                    <span className="text-sm">
                                                        {translateValue(result, translator)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                                            onClick={handleCta}
                                        >
                                              {translateValue(ctaLabel, translator)}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}