import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ButtonHTMLAttributes,
    type ChangeEvent,
    type ComponentType,
    type FormEvent,
} from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    CheckCircle,
    EnvelopeSimple,
    MapPin,
    Phone,
} from "@phosphor-icons/react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
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

export interface ContactFormData {
    name: string;
    email: string;
    company: string;
    useCase: string;
    message: string;
}

export interface ContactInfoItem {
    icon: ComponentType<{ className?: string }>;
    title: ReactNodeLike;
    value: ReactNodeLike;
    description?: ReactNodeLike;
    href?: string;
}

export interface ContactUseCaseOption {
    value: string;
    label: ReactNodeLike;
}

export interface ContactStatItem {
    value: ReactNodeLike;
    label: ReactNodeLike;
}

export interface ContactSectionProps
    extends Omit<SectionProps, "children" | "translate"> {
    translator?: TranslateFn;
    badgeContent?: ReactNodeLike;
    headingLine?: ReactNodeLike;
    headingHighlight?: ReactNodeLike;
    description?: ReactNodeLike;
    contactInfo?: ContactInfoItem[];
    stats?: ContactStatItem[];
    useCases?: ContactUseCaseOption[];
    initialFormData?: Partial<ContactFormData>;
    onFormSubmit?: (data: ContactFormData) => Promise<void> | void;
    scheduleButtonIcon?: ReactRenderable;
    scheduleButtonLabel?: ReactNodeLike;
    scheduleButtonProps?: Partial<React.ComponentProps<typeof Button>>;
    scheduleHelperText?: ReactNodeLike;
    resetAfterSubmitMs?: number;
    successBadge?: ReactRenderable;
    successTitle?: ReactNodeLike;
    successDescription?: ReactNodeLike;
    formCardTitle?: ReactNodeLike;
    formCardDescription?: ReactNodeLike;
    nameLabel?: ReactNodeLike;
    emailLabel?: ReactNodeLike;
    companyLabel?: ReactNodeLike;
    useCaseLabel?: ReactNodeLike;
    messageLabel?: ReactNodeLike;
    namePlaceholder?: ReactNodeLike;
    emailPlaceholder?: ReactNodeLike;
    companyPlaceholder?: ReactNodeLike;
    useCasePlaceholder?: ReactNodeLike;
    messagePlaceholder?: ReactNodeLike;
    messageRows?: number;
    statsCardTitle?: ReactNodeLike;
    ctaTitle?: ReactNodeLike;
    ctaDescription?: ReactNodeLike;
    ctaButtonLabel?: ReactNodeLike;
    ctaButtonIcon?: ReactRenderable;
    ctaButtonProps?: Partial<React.ComponentProps<typeof Button>>;
    onCtaClick?: () => void;
    particleBackground?: ReactRenderable | false;
    backgroundDecorations?: ReactRenderable | false;
    containerClassName?: string;
}

const defaultTranslator: TranslateFn = (value) => value;

const defaultFormState: ContactFormData = {
    name: "",
    email: "",
    company: "",
    useCase: "",
    message: "",
};

const defaultContactInfo: ContactInfoItem[] = [
    {
        icon: EnvelopeSimple,
        title: "Email Us",
        value: "hello@noxx.agency",
        description: "Get in touch for any questions",
        href: "mailto:hello@noxx.agency",
    },
    {
        icon: Phone,
        title: "Call Us",
        value: "+1 (555) 123-4567",
        description: "Mon-Fri 9am-6pm EST",
        href: "tel:+15551234567",
    },
    {
        icon: MapPin,
        title: "Visit Us",
        value: "San Francisco, CA",
        description: "Schedule an in-person meeting",
    },
];

const defaultUseCases: ContactUseCaseOption[] = [
    { value: "ecommerce", label: "E-commerce Support" },
    { value: "customer-service", label: "Customer Service" },
    { value: "lead-generation", label: "Lead Generation" },
    { value: "appointment-booking", label: "Appointment Booking" },
    { value: "internal-support", label: "Internal Support" },
    { value: "custom-integration", label: "Custom Integration" },
    { value: "other", label: "Other" },
];

const defaultStats: ContactStatItem[] = [
    { value: "24h", label: "Response Time" },
    { value: "99.9%", label: "Uptime" },
    { value: "500+", label: "Happy Clients" },
    { value: "14 days", label: "Free Trial" },
];

const defaultBackgroundDecorations = (
    <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-gradient-to-r from-accent/12 to-primary/12 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gradient-to-r from-primary/12 to-accent/12 rounded-full blur-2xl" />
    </div>
);

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

const safeScrollTo = (targetId: string) => {
    if (typeof document === "undefined") {
        return;
    }
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

export function ContactSection({
    translator = defaultTranslator,
    badgeContent = "🤝 Get Started",
    headingLine = "Ready to Transform Your",
    headingHighlight = "Customer Experience?",
    description = "Let's discuss how NOXX AI can help you build the perfect chatbot solution for your business needs.",
    contactInfo = defaultContactInfo,
    stats = defaultStats,
    useCases = defaultUseCases,
    initialFormData,
    onFormSubmit,
    scheduleButtonIcon = <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />,
    scheduleButtonLabel = "Schedule Demo Call",
    scheduleButtonProps,
    scheduleHelperText = "We'll get back to you within 24 hours to schedule your personalized demo",
    resetAfterSubmitMs = 3000,
    successBadge = <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />,
    successTitle = "Thank You!",
    successDescription = "We've received your message and will be in touch within 24 hours to schedule your demo.",
    formCardTitle = "Get a Custom Demo",
    formCardDescription = "Tell us about your needs and we'll show you how NOXX AI can help",
    nameLabel = "Full Name *",
    emailLabel = "Email Address *",
    companyLabel = "Company Name",
    useCaseLabel = "Primary Use Case",
    messageLabel = "Tell us about your project",
    namePlaceholder = "Your full name",
    emailPlaceholder = "your.email@company.com",
    companyPlaceholder = "Your company name",
    useCasePlaceholder = "Select your main use case",
    messagePlaceholder = "Describe your current challenges and what you're looking to achieve...",
    messageRows = 4,
    statsCardTitle = "Why Choose NOXX AI?",
    ctaTitle = "Start Building Your AI Assistant Today",
    ctaDescription = "Join hundreds of businesses already using NOXX AI to transform their customer experience.",
    ctaButtonLabel = "Start Free Trial",
    ctaButtonIcon = <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />,
    ctaButtonProps,
    onCtaClick,
    particleBackground = false,
    backgroundDecorations = defaultBackgroundDecorations,
    containerClassName,
    className,
    id,
    ...sectionProps
}: ContactSectionProps) {
    const mergedInitialState = useMemo(
        () => ({ ...defaultFormState, ...initialFormData }),
        [initialFormData]
    );
    const [formData, setFormData] = useState<ContactFormData>(mergedInitialState);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setFormData(mergedInitialState);
    }, [mergedInitialState]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleChange = (
        field: keyof ContactFormData,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData(mergedInitialState);
        setIsSubmitted(false);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await Promise.resolve(onFormSubmit?.(formData));
            setIsSubmitted(true);
            if (resetAfterSubmitMs > 0) {
                timeoutRef.current = setTimeout(() => {
                    resetForm();
                }, resetAfterSubmitMs);
            }
        } catch (error) {
            console.error("ContactSection submit failed", error);
        }
    };

    const handleCtaClick = () => {
        if (onCtaClick) {
            onCtaClick();
            return;
        }
        safeScrollTo("pricing");
    };

    const {
        className: scheduleButtonClassName,
        onClick: scheduleButtonOnClick,
        type: scheduleButtonType,
        ...restScheduleButtonProps
    } = scheduleButtonProps ?? {};

    const {
        className: ctaButtonClassName,
        onClick: ctaButtonOnClick,
        type: ctaButtonType,
        ...restCtaButtonProps
    } = ctaButtonProps ?? {};

    const resolvedScheduleButtonType: ButtonHTMLAttributes<HTMLButtonElement>["type"] =
        (scheduleButtonType as ButtonHTMLAttributes<HTMLButtonElement>["type"]) ?? "submit";
    const resolvedCtaButtonType: ButtonHTMLAttributes<HTMLButtonElement>["type"] =
        (ctaButtonType as ButtonHTMLAttributes<HTMLButtonElement>["type"]) ?? "button";

    return (
        <section
            id={id ?? "contact"}
            className={cn("py-20 bg-background", containerClassName, className)}
            {...sectionProps}
        >
            {particleBackground}
            {backgroundDecorations}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {badgeContent && (
                        <Badge variant="secondary" className="mb-4">
                            {translateValue(badgeContent, translator)}
                        </Badge>
                    )}
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {translateValue(headingLine, translator)}{" "}
                        <span className="gradient-text">
                            {translateValue(headingHighlight, translator)}
                        </span>
                    </h2>
                    {description && (
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            {translateValue(description, translator)}
                        </p>
                    )}
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
                                <CardTitle className="text-2xl">
                                    {translateValue(formCardTitle, translator)}
                                </CardTitle>
                                {formCardDescription && (
                                    <CardDescription>
                                        {translateValue(formCardDescription, translator)}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className={undefined} htmlFor="contact-name">
                                                    {translateValue(nameLabel, translator)}
                                                </Label>
                                                <Input
                                                    id="contact-name"
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
                                                    className={undefined}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className={undefined} htmlFor="contact-email">
                                                    {translateValue(emailLabel, translator)}
                                                </Label>
                                                <Input
                                                    id="contact-email"
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
                                                    className={undefined}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className={undefined} htmlFor="contact-company">
                                                {translateValue(companyLabel, translator)}
                                            </Label>
                                            <Input
                                                id="contact-company"
                                                type="text"
                                                value={formData.company}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                    handleChange("company", event.target.value)
                                                }
                                                placeholder={translateToString(
                                                    companyPlaceholder,
                                                    translator
                                                )}
                                                className={undefined}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className={undefined} htmlFor="contact-usecase">
                                                {translateValue(useCaseLabel, translator)}
                                            </Label>
                                            <Select
                                                value={formData.useCase}
                                                onValueChange={(value: string) =>
                                                    handleChange("useCase", value)
                                                }
                                            >
                                                <SelectTrigger className="h-10">
                                                    <SelectValue
                                                        placeholder={translateToString(
                                                            useCasePlaceholder,
                                                            translator
                                                        )}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-60 overflow-y-auto">
                                                    {useCases.map((useCase) => (
                                                        <SelectItem
                                                            key={useCase.value}
                                                            value={useCase.value}
                                                            className="cursor-pointer"
                                                        >
                                                            {translateValue(useCase.label, translator)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className={undefined} htmlFor="contact-message">
                                                {translateValue(messageLabel, translator)}
                                            </Label>
                                            <Textarea
                                                id="contact-message"
                                                value={formData.message}
                                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                                    handleChange("message", event.target.value)
                                                }
                                                placeholder={translateToString(
                                                    messagePlaceholder,
                                                    translator
                                                )}
                                                rows={messageRows}
                                                className={undefined}
                                            />
                                        </div>

                                        <Button
                                            type={resolvedScheduleButtonType}
                                            className={cn(
                                                "w-full bg-accent text-accent-foreground transition-colors group",
                                                "hover:bg-accent/90",
                                                scheduleButtonClassName
                                            )}
                                            size="lg"
                                            onClick={(event) => {
                                                scheduleButtonOnClick?.(event);
                                            }}
                                            {...restScheduleButtonProps}
                                        >
                                            {translateValue(scheduleButtonLabel, translator)}
                                            {scheduleButtonIcon}
                                        </Button>

                                        {scheduleHelperText && (
                                            <p className="text-xs text-muted-foreground text-center">
                                                {translateValue(scheduleHelperText, translator)}
                                            </p>
                                        )}
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        {successBadge}
                                        <h3 className="text-xl font-bold mb-2">
                                            {translateValue(successTitle, translator)}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {translateValue(successDescription, translator)}
                                        </p>
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
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                const translatedTitle = translateValue(info.title, translator);
                                const translatedValue = translateValue(info.value, translator);
                                const translatedDescription = translateValue(
                                    info.description ?? null,
                                    translator
                                );

                                return (
                                    <motion.div
                                        key={`${info.href ?? info.value ?? index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                                            <CardContent className="p-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
                                                        <Icon className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-lg">
                                                            {translatedTitle}
                                                        </h4>
                                                        <p className="text-accent font-medium">
                                                            {info.href ? (
                                                                <a href={info.href}>{translatedValue}</a>
                                                            ) : (
                                                                translatedValue
                                                            )}
                                                        </p>
                                                        {translatedDescription && (
                                                            <p className="text-sm text-muted-foreground">
                                                                {translatedDescription}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-0">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold mb-4">
                                    {translateValue(statsCardTitle, translator)}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat, index) => (
                                        <div key={`stat-${index}`} className="text-center">
                                            <div className="text-2xl font-bold text-accent">
                                                {translateValue(stat.value, translator)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {translateValue(stat.label, translator)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary to-accent text-white">
                            <CardContent className="p-8 text-center space-y-6">
                                <h3 className="text-xl font-bold">
                                    {translateValue(ctaTitle, translator)}
                                </h3>
                                {ctaDescription && (
                                    <p className="opacity-90">
                                        {translateValue(ctaDescription, translator)}
                                    </p>
                                )}
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className={cn(
                                        "bg-background text-primary transition-colors",
                                        "hover:bg-background/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90",
                                        ctaButtonClassName
                                    )}
                                    type={resolvedCtaButtonType}
                                    onClick={(event) => {
                                        ctaButtonOnClick?.(event);
                                        if (!ctaButtonOnClick) {
                                            handleCtaClick();
                                        }
                                    }}
                                    {...restCtaButtonProps}
                                >
                                    <span className="group inline-flex items-center justify-center">
                                        {translateValue(ctaButtonLabel, translator)}
                                        {ctaButtonIcon}
                                    </span>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}