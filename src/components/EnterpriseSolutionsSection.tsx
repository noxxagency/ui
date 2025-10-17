import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react";

import { PolygonParticleBackground } from "./ParticleBackground";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { cn } from "../utils";

type SectionProps = JSX.IntrinsicElements["section"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];
type TranslateFn = (value: string) => ReactNodeLike;

export interface EnterpriseFeature {
    icon: ReactNodeLike;
    title: ReactNodeLike;
    description: ReactNodeLike;
    highlights: ReactNodeLike[];
}

export interface EnterpriseSolutionsSectionProps
    extends Omit<SectionProps, "children" | "translate"> {
    translator?: TranslateFn;
    heading?: ReactNodeLike;
    headingIcon?: ReactNodeLike;
    subtitle?: ReactNodeLike;
    description?: ReactNodeLike;
    features?: EnterpriseFeature[];
    featureChips?: ReactNodeLike[];
    footerCallout?: ReactNodeLike;
    particleBackground?: ReactRenderable | false;
    cardOverlay?: ReactRenderable | false;
    className?: string;
}

const defaultTranslator: TranslateFn = (value) => value;

const defaultFeatures: EnterpriseFeature[] = [
    {
        icon: "🗄️",
        title: "Database Integration",
        description: "SQL, NoSQL, MongoDB, PostgreSQL, MySQL connections",
        highlights: ["Real-time queries", "Secure connections", "Custom schemas"],
    },
    {
        icon: "⚙️",
        title: "Custom Workflows",
        description: "n8n automation, API integrations, complex business logic",
        highlights: ["Multi-step flows", "Conditional logic", "Error handling"],
    },
    {
        icon: "🏷️",
        title: "White-label Solutions",
        description: "Fully branded chatbots with your company identity",
        highlights: ["Custom branding", "Domain mapping", "Brand guidelines"],
    },
    {
        icon: "🔐",
        title: "Enterprise Security",
        description: "SSO, SAML, Active Directory, advanced permissions",
        highlights: ["Role-based access", "Audit trails", "Compliance ready"],
    },
];

const defaultChips: ReactNodeLike[] = [
    "Multi-tenant Architecture",
    "99.99% SLA",
    "24/7 Support",
    "Custom Analytics",
    "API Documentation",
    "Professional Services",
];

const translateValue = (
    value: ReactNodeLike,
    translator: TranslateFn
): ReactNodeLike => {
    if (typeof value === "string") {
        return translator(value);
    }
    return value;
};

export function EnterpriseSolutionsSection({
    translator = defaultTranslator,
    heading = "Enterprise Solutions Available",
    headingIcon = "🏢",
    subtitle = "Powerful, scalable solutions designed for enterprise needs.",
    description =
        "From custom integrations to white-label deployments - we build everything to match your exact requirements.",
    features = defaultFeatures,
    featureChips = defaultChips,
    footerCallout = "Ready to scale? Let's discuss your enterprise requirements.",
    particleBackground = <PolygonParticleBackground />,
    cardOverlay = (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent transform -skew-y-12 animate-pulse" />
    ),
    className,
    ...sectionProps
}: EnterpriseSolutionsSectionProps) {
    const translatedFeatures = useMemo(
        () =>
            features.map((feature) => ({
                ...feature,
                icon: feature.icon,
                title: translateValue(feature.title, translator),
                description: translateValue(feature.description, translator),
                highlights: feature.highlights.map((item) =>
                    translateValue(item, translator)
                ),
            })),
        [features, translator]
    );

    return (
        <section
            id="enterprise"
            className={cn(
                "py-20 bg-gradient-to-br from-accent/5 via-primary/5 to-accent/5 relative overflow-hidden",
                className
            )}
            {...sectionProps}
        >
            {particleBackground && particleBackground}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-accent via-primary to-accent text-primary-foreground overflow-hidden relative">
                        {cardOverlay}
                        <CardContent className="p-12 relative z-10">
                            <motion.div
                                className="text-center mb-12"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center">
                                    {headingIcon && (
                                        <span className="text-4xl md:text-5xl mr-4">
                                            {translateValue(headingIcon, translator)}
                                        </span>
                                    )}
                                    {translateValue(heading, translator)}
                                </h2>
                                <p className="mb-0 opacity-90 text-xl leading-relaxed max-w-4xl mx-auto">
                                    {translateValue(subtitle, translator)} {" "}
                                    {translateValue(description, translator)}
                                </p>
                            </motion.div>

                            <motion.div
                                className="grid md:grid-cols-2 gap-8 mb-12"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {translatedFeatures.map((solution, index) => (
                                    <motion.div
                                        key={`solution-${index}`}
                                        className="bg-foreground/10 backdrop-blur-sm rounded-xl p-8 hover:bg-foreground/15 transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                    >
                                        <div className="flex items-start space-x-6">
                                            <span className="text-4xl">{solution.icon}</span>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-xl mb-3">{solution.title}</h4>
                                                <p className="text-primary-foreground/80 mb-4 text-base">
                                                    {solution.description}
                                                </p>
                                                <div className="space-y-2">
                                                    {solution.highlights.map((feature, featureIndex) => (
                                                        <motion.div
                                                            key={`feature-${index}-${featureIndex}`}
                                                            className="flex items-center text-sm text-primary-foreground/70"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            whileInView={{ opacity: 1, x: 0 }}
                                                            transition={{
                                                                duration: 0.3,
                                                                delay: 0.7 + index * 0.1 + featureIndex * 0.05,
                                                            }}
                                                            viewport={{ once: true }}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-3 text-green-300 flex-shrink-0" />
                                                            {feature}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex flex-wrap justify-center gap-4 mb-8">
                                    {featureChips.map((feature, index) => (
                                        <motion.div
                                            key={`chip-${index}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="bg-foreground/20 text-primary-foreground border-foreground/30 hover:bg-foreground/30 transition-colors duration-200 text-sm px-4 py-2"
                                            >
                                                {translateValue(feature, translator)}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.p
                                    className="text-primary-foreground/90 font-medium text-lg"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    viewport={{ once: true }}
                                >
                                    💼 {translateValue(footerCallout, translator)}
                                </motion.p>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}