import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ComponentType,
} from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle,
    Clock,
    Users,
    Star,
    Sparkle,
} from "@phosphor-icons/react";

import { FountainParticleBackground } from "./ParticleBackground";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { cn } from "../utils";

type SectionProps = JSX.IntrinsicElements["section"];
type ReactRenderable = JSX.Element | string | number | boolean | null | undefined;
type ReactNodeLike = ReactRenderable | ReactRenderable[];
type TranslateFn = (value: string) => ReactNodeLike;

export interface DemoFormData {
    name: string;
    email: string;
    company: string;
    useCase: string;
    message: string;
    teamSize: string;
}

export interface DemoBenefitItem {
    icon: ComponentType<{ className?: string }>;
    title: ReactNodeLike;
    description: ReactNodeLike;
}

export interface SelectOption {
    value: string;
    label: ReactNodeLike;
}

export interface DemoSectionProps
    extends Omit<SectionProps, "children" | "translate" | "onSubmit"> {
    translator?: TranslateFn;
    badgeContent?: ReactNodeLike;
    headingPrefix?: ReactNodeLike;
    headingHighlight?: ReactNodeLike;
    description?: ReactNodeLike;
    formTitle?: ReactNodeLike;
    formDescription?: ReactNodeLike;
    confirmationTitle?: ReactNodeLike;
    confirmationDescription?: ReactNodeLike;
    confirmationBadge?: ReactNodeLike;
    primaryButtonLabel?: ReactNodeLike;
    secondaryButtonLabel?: ReactNodeLike;
        benefitsHeading?: ReactNodeLike;
    teamSizeLabel?: ReactNodeLike;
    teamSizePlaceholder?: ReactNodeLike;
    useCaseLabel?: ReactNodeLike;
    useCasePlaceholder?: ReactNodeLike;
    messageLabel?: ReactNodeLike;
    messagePlaceholder?: ReactNodeLike;
    nameLabel?: ReactNodeLike;
    namePlaceholder?: ReactNodeLike;
    emailLabel?: ReactNodeLike;
    emailPlaceholder?: ReactNodeLike;
    companyLabel?: ReactNodeLike;
    companyPlaceholder?: ReactNodeLike;
    footerNote?: ReactNodeLike;
        useCaseOptions?: SelectOption[];
        teamSizeOptions?: SelectOption[];
    benefitItems?: DemoBenefitItem[];
    initialFormState?: DemoFormData;
        onFormSubmit?: (data: DemoFormData, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
    autoResetDelay?: number;
    resetOnSubmit?: boolean;
    clientAreaHref?: string;
    clientAreaTarget?: string;
    onClientAreaClick?: () => void;
    particleBackground?: ReactRenderable | false;
    className?: string;
}

const defaultTranslator: TranslateFn = (value) => value;

const defaultFormState: DemoFormData = {
    name: "",
    email: "",
    company: "",
    useCase: "",
    message: "",
    teamSize: "",
};

const defaultUseCaseOptions: SelectOption[] = [
    { value: "ecommerce", label: "E-commerce Customer Support" },
    { value: "lead-generation", label: "Lead Generation & Qualification" },
    { value: "appointments", label: "Appointment Booking & Scheduling" },
    { value: "database-integration", label: "Database Integration & Queries" },
    { value: "file-processing", label: "File & Document Processing" },
    { value: "workflow-automation", label: "Workflow Automation (n8n)" },
    { value: "internal-support", label: "Internal Employee Support" },
    { value: "enterprise", label: "Custom Enterprise Solution" },
    { value: "other", label: "Other" },
];

const defaultTeamSizes: SelectOption[] = [
    { value: "solo", label: "Just me (1)" },
    { value: "small", label: "Small team (2-10)" },
    { value: "medium", label: "Medium team (11-50)" },
    { value: "large", label: "Large team (51-200)" },
    { value: "enterprise", label: "Enterprise (200+)" },
];

const defaultBenefits: DemoBenefitItem[] = [
    {
        icon: Clock,
        title: "30-Minute Demo",
        description: "Personalized walkthrough of features relevant to your use case",
    },
    {
        icon: Users,
        title: "Expert Consultation",
        description: "Direct access to our AI specialists and technical team",
    },
    {
        icon: Star,
        title: "Custom Roadmap",
        description: "Get a tailored implementation plan for your business",
    },
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

const translateToString = (
    value: ReactNodeLike,
    translator: TranslateFn
): string => {
    const translated = translateValue(value, translator);
    if (typeof translated === "string") {
        return translated;
    }
    if (translated === null || translated === undefined) {
        return "";
    }
    return String(translated);
};

const openInNewTab = (href?: string, target?: string) => {
    if (!href) {
        return;
    }
    if (typeof window !== "undefined") {
        window.open(href, target ?? "_blank");
    }
};

type FormFieldKey = keyof DemoFormData;

export function DemoSection({
    translator = defaultTranslator,
    badgeContent = "🚀 Get a Custom Demo",
    headingPrefix = "See NOXX AI in",
    headingHighlight = "Action",
    description = "Book a personalized demo and discover how our AI chatbots can transform your business operations and customer experience.",
    formTitle = "Get Your Custom Demo",
    formDescription =
        "Tell us about your needs and we'll show you exactly how NOXX AI can help your business",
    confirmationTitle = "Demo Request Received! 🎉",
    confirmationDescription =
        "Thank you for your interest in NOXX AI. Our team will review your requirements and contact you within 24 hours to schedule your demo.",
    confirmationBadge = "✓ We'll be in touch soon!",
    primaryButtonLabel = "Book My Custom Demo",
    secondaryButtonLabel = "Client Area",
        benefitsHeading = "What to Expect",
    teamSizeLabel = "Team Size",
    teamSizePlaceholder = "Select team size",
    useCaseLabel = "Primary Use Case *",
    useCasePlaceholder = "What do you want to use NOXX AI for?",
    messageLabel = "Tell us about your project",
    messagePlaceholder =
        "Describe your current challenges, goals, and what you'd like to see in the demo...",
    nameLabel = "Full Name *",
    namePlaceholder = "Your full name",
    emailLabel = "Business Email *",
    emailPlaceholder = "your.email@company.com",
    companyLabel = "Company Name *",
    companyPlaceholder = "Your company name",
    footerNote = "🚀 We'll contact you within 24 hours to schedule your personalized demo",
    useCaseOptions = defaultUseCaseOptions,
    teamSizeOptions = defaultTeamSizes,
    benefitItems = defaultBenefits,
    initialFormState = defaultFormState,
        onFormSubmit,
    autoResetDelay = 3000,
    resetOnSubmit = true,
    clientAreaHref = "https://chatbot.noxx.agency",
    clientAreaTarget = "_blank",
    onClientAreaClick,
    particleBackground = <FountainParticleBackground />,
    className,
    ...sectionProps
}: DemoSectionProps) {
    const [formData, setFormData] = useState<DemoFormData>({
        ...defaultFormState,
        ...initialFormState,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
        };
    }, []);

    const handleChange = (field: FormFieldKey, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

        const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            if (onFormSubmit) {
                await onFormSubmit(formData, event);
        }
        setIsSubmitted(true);
            if (!resetOnSubmit) {
            return;
        }
            if (resetTimeoutRef.current) {
                clearTimeout(resetTimeoutRef.current);
            }
                resetTimeoutRef.current = setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ ...defaultFormState, ...initialFormState });
                    resetTimeoutRef.current = null;
                }, autoResetDelay);
    };

    const handleClientAreaClick = () => {
        onClientAreaClick?.();
        if (!clientAreaHref) {
            return;
        }
        openInNewTab(clientAreaHref, clientAreaTarget);
    };

    return (
        <section
            id="demo"
            className={cn(
                "py-20 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden",
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
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        {translateValue(badgeContent, translator)}
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {translateValue(headingPrefix, translator)} {" "}
                        <span className="gradient-text">
                            {translateValue(headingHighlight, translator)}
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {translateValue(description, translator)}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-0 shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center">
                                    <Sparkle className="h-6 w-6 text-primary mr-2" />
                                    {translateValue(formTitle, translator)}
                                </CardTitle>
                                <CardDescription>
                                    {translateValue(formDescription, translator)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                                        <Label htmlFor="name" className="block">
                                                    {translateValue(nameLabel, translator)}
                                                </Label>
                                                <Input
                                                    id="name"
                                                                            type="text"
                                                    value={formData.name}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                        handleChange("name", event.target.value)
                                                    }
                                                                                placeholder={translateToString(
                                                                                    namePlaceholder,
                                                                                    translator
                                                                                )}
                                                    required
                                                    className="border-border focus:border-primary"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                                        <Label htmlFor="email" className="block">
                                                    {translateValue(emailLabel, translator)}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                        handleChange("email", event.target.value)
                                                    }
                                                                                placeholder={translateToString(
                                                                                    emailPlaceholder,
                                                                                    translator
                                                                                )}
                                                    required
                                                    className="border-border focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="company" className="block">
                                                    {translateValue(companyLabel, translator)}
                                                </Label>
                                                <Input
                                                    id="company"
                                                                            type="text"
                                                    value={formData.company}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                        handleChange("company", event.target.value)
                                                    }
                                                                                placeholder={translateToString(
                                                                                    companyPlaceholder,
                                                                                    translator
                                                                                )}
                                                    required
                                                    className="border-border focus:border-primary"
                                                />
                                            </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="teamSize" className="block">
                                                    {translateValue(teamSizeLabel, translator)}
                                                </Label>
                                                <Select
                                                    value={formData.teamSize}
                                                                            onValueChange={(value: string) =>
                                                                                handleChange("teamSize", value)
                                                                            }
                                                >
                                                    <SelectTrigger className="border-border focus:border-primary">
                                                                                    <SelectValue
                                                                                        placeholder={translateToString(
                                                                                            teamSizePlaceholder,
                                                                                            translator
                                                                                        )}
                                                                                    />
                                                    </SelectTrigger>
                                                                                <SelectContent className="">
                                                                                    {teamSizeOptions.map((option, index) => (
                                                                                        <SelectItem
                                                                                            key={`teamSize-${index}`}
                                                                                            value={option.value}
                                                                                            className=""
                                                                                        >
                                                                                            {translateValue(option.label, translator)}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                                                    <Label htmlFor="useCase" className="block">
                                                {translateValue(useCaseLabel, translator)}
                                            </Label>
                                            <Select
                                                value={formData.useCase}
                                                                        onValueChange={(value: string) =>
                                                                            handleChange("useCase", value)
                                                                        }
                                            >
                                                <SelectTrigger className="border-border focus:border-primary">
                                                                            <SelectValue
                                                                                placeholder={translateToString(
                                                                                    useCasePlaceholder,
                                                                                    translator
                                                                                )}
                                                                            />
                                                </SelectTrigger>
                                                                        <SelectContent className="">
                                                                            {useCaseOptions.map((option, index) => (
                                                                                <SelectItem
                                                                                    key={`useCase-${index}`}
                                                                                    value={option.value}
                                                                                    className=""
                                                                                >
                                                                                    {translateValue(option.label, translator)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                                                <div className="space-y-2">
                                                                    <Label htmlFor="message" className="block">
                                                {translateValue(messageLabel, translator)}
                                            </Label>
                                            <Textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                                    handleChange("message", event.target.value)
                                                }
                                                                        placeholder={translateToString(
                                                                            messagePlaceholder,
                                                                            translator
                                                                        )}
                                                rows={4}
                                                className="border-border focus:border-primary"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <Button
                                                type="submit"
                                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group shadow-lg hover:shadow-xl transition-all duration-200"
                                                size="lg"
                                            >
                                                {translateValue(primaryButtonLabel, translator)}
                                                <Calendar className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                                size="lg"
                                                onClick={handleClientAreaClick}
                                            >
                                                {translateValue(secondaryButtonLabel, translator)}
                                                <Sparkle className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>

                                        <p className="text-xs text-muted-foreground text-center">
                                            {translateValue(footerNote, translator)}
                                        </p>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold mb-2">
                                            {translateValue(confirmationTitle, translator)}
                                        </h3>
                                        <p className="text-muted-foreground mb-4">
                                            {translateValue(confirmationDescription, translator)}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        >
                                            {translateValue(confirmationBadge, translator)}
                                        </Badge>
                                    </motion.div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">
                                            {translateValue(benefitsHeading, translator)}
                            </h3>
                            {benefitItems.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        key={`benefit-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                                                                                    <Icon className="h-6 w-6 text-primary-foreground" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-lg mb-2">
                                                            {translateValue(benefit.title, translator)}
                                                        </h4>
                                                        <p className="text-muted-foreground">
                                                            {translateValue(benefit.description, translator)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}