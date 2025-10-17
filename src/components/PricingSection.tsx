import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Check, Sparkle, ArrowRight, Plus, CaretLeft, CaretRight, ChatCircle } from "@phosphor-icons/react";
import useEmblaCarousel from 'embla-carousel-react';
import { SectionParticleBackground } from "./ParticleBackground";

export interface PricingPlan {
    name: string;
    basePrice: number;
    description: string;
    color: string;
    features: string[];
}

export interface PricingFeature {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    included: boolean;
}

export interface PricingSectionProps {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    'data-testid'?: string;
    plans?: PricingPlan[];
    features?: PricingFeature[];
    defaultPlanIndex?: number;
    showTokenSlider?: boolean;
    showParticles?: boolean;
    sectionTitle?: string;
    sectionSubtitle?: string;
    sectionBadge?: string;
    currencySymbol?: string;
    currencyPosition?: 'before' | 'after';
    onPlanSelect?: (planIndex: number) => void;
    onFeatureToggle?: (featureId: string) => void;
    onPurchase?: (plan: PricingPlan, features: string[], totalPrice: number) => void;
    onContactSales?: () => void;
}

const defaultplans: PricingPlan[] = [
    {
        name: "Free",
        basePrice: 0,
        description: "Perfect for testing and small websites",
        color: "from-gray-500 to-gray-600",
        features: [
            "5 messages per user",
            "No new chat sessions",
            "300 character limit for instructions",
            "Basic chatbot interface",
            "1-click installation",
            "SHA256 security",
            "< 200KB size"
        ]
    },
    {
        name: "Starter",
        basePrice: 29,
        description: "Perfect for small websites and basic chatbot functionality",
        color: "from-blue-500 to-blue-600",
        features: [
            "5,000 tokens/month",
            "Basic chatbot interface",
            "1-click installation",
            "SHA256 security",
            "< 200KB size",
            "Email support",
            "Website integration"
        ]
    },
    {
        name: "Professional",
        basePrice: 99,
        description: "Advanced features for growing businesses",
        color: "from-purple-500 to-purple-600",
        features: [
            "25,000 tokens/month",
            "Online configurator",
            "Multi-language support",
            "Database integration",
            "File upload support",
            "Audio recognition",
            "Priority support"
        ]
    },
    {
        name: "Enterprise",
        basePrice: 1000,
        description: "Full-featured solution for large organizations",
        color: "from-orange-500 to-orange-600",
        features: [
            "Unlimited tokens",
            "Custom n8n workflows",
            "SQL/NoSQL integration",
            "Advanced analytics",
            "24/7 phone support",
            "Custom integrations",
            "White-label solution"
        ]
    }
];

const additionalFeatures = [
    {
        id: "multiLanguage",
        name: "Multiple Language Support",
        description: "50+ languages with real-time translation capabilities",
        basePrice: 20,
        included: false
    },
    {
        id: "configurator",
        name: "Online Visual Configurator",
        description: "Change colors, texts, and behaviors with live preview",
        basePrice: 15,
        included: false
    },
    {
        id: "dragResize",
        name: "Draggable & Resizable Interface",
        description: "Allow users to customize chatbot position and size",
        basePrice: 15,
        included: false
    },
    {
        id: "audioFile",
        name: "Audio & File Support",
        description: "Voice messages and file upload capabilities (includes token usage for processing)",
        basePrice: 25,
        included: false
    },
    {
        id: "extendedTokens",
        name: "Extended Token Limits",
        description: "Higher token limits per chat session for longer conversations",
        basePrice: 10,
        included: false
    },
    {
        id: "booking",
        name: "Advanced Booking System",
        description: "Calendar integration with automated scheduling via n8n",
        basePrice: 35,
        included: false
    },
    {
        id: "n8nWorkflows",
        name: "Custom n8n Workflows",
        description: "Automated workflows for personal and business use",
        basePrice: 50,
        included: false
    },
    {
        id: "sqlIntegration",
        name: "SQL/NoSQL Database Integration",
        description: "Direct database queries and updates (Enterprise feature)",
        basePrice: 40,
        included: false
    }
];

const defaultAdditionalFeatures: PricingFeature[] = additionalFeatures;

export function PricingSection({
    className = "",
    style,
    id = "pricing",
    'data-testid': dataTestId,
    plans = defaultplans,
    features = defaultAdditionalFeatures,
    defaultPlanIndex = 1,
    showTokenSlider = true,
    showParticles = true,
    sectionTitle = "Build Your Perfect Solution",
    sectionSubtitle = "Start with a base plan and customize with the features you need. No hidden fees, no surprises.",
    sectionBadge = "💰 Transparent Pricing",
    currencySymbol = "$",
    currencyPosition = 'before',
    onPlanSelect,
    onFeatureToggle,
    onPurchase,
    onContactSales,
}: PricingSectionProps = {}) {
    const [selectedPlan, setSelectedPlan] = useState(defaultPlanIndex);
    const [tokenLimit, setTokenLimit] = useState([25000]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(plans[defaultPlanIndex]?.basePrice || 29);
    
    // Carousel setup
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 1
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [slideWidth, setSlideWidth] = useState(320);
    const viewportRef = useRef<HTMLDivElement | null>(null); // for measuring available width

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    // Dynamically calculate slide width so only whole cards are visible (no cropping)
    useEffect(() => {
        const MIN_CARD_WIDTH = 280; // desired minimum
        const GAP = 16; // gap-4
        const SIDE_SAFE = 8; // leave space so selected ring isn't clipped

        const el = viewportRef.current;
        if (!el) return;

        const calc = () => {
            const width = el.getBoundingClientRect().width;
            if (!width) return;
            let perView = Math.floor((width + GAP) / (MIN_CARD_WIDTH + GAP));
            if (perView < 1) perView = 1;
            // subtract SIDE_SAFE so ring/shadow has breathing room
            let computed = Math.floor((width - GAP * (perView - 1) - SIDE_SAFE) / perView);
            if (computed < 200) computed = 200; // hard floor
            setSlideWidth(computed);
        };

        calc();
        const ro = new ResizeObserver(calc);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Reinitialize Embla whenever slideWidth changes so snapping updates
    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
            onSelect();
        }
    }, [slideWidth, emblaApi, onSelect]);

    useEffect(() => {
        const basePlanPrice = plans[selectedPlan]?.basePrice || 0;
        const featuresPrice = selectedFeatures.reduce((total, featureId) => {
            const feature = features.find(f => f.id === featureId);
            return total + (feature?.basePrice || 0);
        }, 0);
        
        const tokenMultiplier = tokenLimit[0] > 25000 ? Math.ceil(tokenLimit[0] / 25000) : 1;
        const adjustedPrice = selectedPlan === 3 ? basePlanPrice : basePlanPrice * tokenMultiplier;
        
        setTotalPrice(adjustedPrice + featuresPrice);
    }, [selectedPlan, tokenLimit, selectedFeatures, plans, features]);

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures(prev => 
            prev.includes(featureId) 
                ? prev.filter(id => id !== featureId)
                : [...prev, featureId]
        );
        onFeatureToggle?.(featureId);
    };

    const handlePlanSelect = (index: number) => {
        setSelectedPlan(index);
        onPlanSelect?.(index);
    };

    const handlePurchase = () => {
        const plan = plans[selectedPlan];
        if (plan && onPurchase) {
            onPurchase(plan, selectedFeatures, totalPrice);
        }
    };

    const formatPrice = (price: number) => {
        return currencyPosition === 'before' ? `${currencySymbol}${price}` : `${price}${currencySymbol}`;
    };

    return (
        // Use visible overflow so slider cards (with ring/shadow) aren't clipped by the section container
        <section 
            id={id} 
            className={`py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative [overflow:visible] ${className}`}
            style={style}
            data-testid={dataTestId}
        >
            {/* Animated Particle Background */}
            {showParticles && <SectionParticleBackground />}
            
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-52 h-52 bg-gradient-to-r from-accent/12 to-primary/12 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gradient-to-r from-primary/12 to-accent/12 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="secondary" className="mb-4">
                        {sectionBadge}
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        {sectionTitle}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {sectionSubtitle}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Plan Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Choose Your Base Plan</h3>
                            
                            {/* Carousel Container */}
                            {/* Carousel wrapper: removed negative margins that caused horizontal clipping inside the section */}
                            <div className="relative px-0">
                                {/* Navigation Buttons */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={scrollPrev}
                                            disabled={!canScrollPrev}
                                            className="h-8 w-8 p-0"
                                        >
                                            <CaretLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={scrollNext}
                                            disabled={!canScrollNext}
                                            className="h-8 w-8 p-0"
                                        >
                                            <CaretRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Embla Carousel */}
                                <div className="overflow-hidden" ref={(el) => { viewportRef.current = el; emblaRef(el); }}>
                                    {/* Track has side padding so outer card rings/shadows aren't clipped */}
                                    <div className="flex gap-4 py-1 px-2">
                                        {plans.map((plan: PricingPlan, index: number) => (
                                            <div
                                                key={plan.name}
                                                className="flex-[0_0_auto]"
                                                style={{ width: `${slideWidth}px` }}
                                            >
                                                <div className="p-[4px] h-full">{/* padding wrapper prevents ring from being cut */}
                                                <motion.div
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 h-full ${
                                                        selectedPlan === index
                                                            ? 'ring-2 ring-accent shadow-xl bg-accent/5'
                                                            : 'bg-background hover:shadow-lg'
                                                    }`}
                                                    onClick={() => handlePlanSelect(index)}
                                                >
                                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}>
                                                        <Sparkle className="h-6 w-6 text-primary-foreground" />
                                                    </div>
                                                    <h4 className="font-bold text-lg mb-2">{plan.name}</h4>
                                                    <p className="text-2xl font-bold text-accent mb-2">
                                                        {plan.name === "Enterprise" ? (
                                                            <>
                                                                Starting from ${plan.basePrice}
                                                                <span className="text-sm text-muted-foreground">per month</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                ${plan.basePrice}
                                                                <span className="text-sm text-muted-foreground">per month</span>
                                                            </>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                                                    <ul className="space-y-1 mb-4">
                                                        {plan.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                                                            <li key={featureIndex} className="flex items-center text-xs">
                                                                <Check className="h-3 w-3 text-green-500 mr-2" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {plan.name === "Enterprise" && (
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="w-full mt-2 border-accent text-accent hover:bg-accent hover:text-primary-foreground"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const element = document.getElementById('demo');
                                                                if (element) {
                                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                                }
                                                            }}
                                                        >
                                                            <ChatCircle className="h-4 w-4 mr-2" />
                                                            Let's talk
                                                        </Button>
                                                    )}
                                                </motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Token Limit Slider */}
                        {selectedPlan > 0 && selectedPlan < 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Monthly Token Limit</CardTitle>
                                        <CardDescription>
                                            Adjust based on your expected usage (approx. 750 words = 1000 tokens)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Slider
                                                value={tokenLimit}
                                                onValueChange={setTokenLimit}
                                                max={100000}
                                                min={5000}
                                                step={5000}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>5,000 tokens</span>
                                                <span className="font-semibold text-accent">
                                                    {tokenLimit[0].toLocaleString()} tokens
                                                </span>
                                                <span>100,000+ tokens</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}

                        {/* Additional Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6">Add Premium Features</h3>
                            <div className="space-y-4">
                                {features.map((feature: PricingFeature) => (
                                    <Card 
                                        key={feature.id}
                                        className={`transition-all duration-300 ${
                                            selectedFeatures.includes(feature.id)
                                                ? 'ring-2 ring-accent bg-accent/5'
                                                : 'hover:shadow-md'
                                        }`}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg mb-1">{feature.name}</h4>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {feature.description}
                                                    </p>
                                                    <Badge variant="outline">
                                                        +${feature.basePrice} per month
                                                    </Badge>
                                                </div>
                                                <Switch
                                                    checked={selectedFeatures.includes(feature.id)}
                                                    onCheckedChange={() => toggleFeature(feature.id)}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Price Summary */}
                    <Card className="border-2 border-accent/20 shadow-2xl bg-card/95 backdrop-blur-sm lg:sticky lg:top-20 lg:self-start">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">Your Custom Plan</CardTitle>
                            <CardDescription>
                                Tailored to your specific needs
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                        {/* Plan Summary */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{plans[selectedPlan].name} Plan</span>
                                <span className="font-semibold">${plans[selectedPlan].basePrice}</span>
                            </div>
                            
                            {selectedPlan > 0 && selectedPlan < 3 && tokenLimit[0] > 25000 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span>Extra tokens</span>
                                    <span>+${(Math.ceil(tokenLimit[0] / 25000) - 1) * plans[selectedPlan].basePrice}</span>
                                </div>
                            )}

                            {selectedFeatures.map((featureId: string) => {
                                const feature = features.find(f => f.id === featureId);
                                return feature ? (
                                    <div key={featureId} className="flex justify-between items-center text-sm">
                                        <span>{feature.name}</span>
                                        <span>+{formatPrice(feature.basePrice)}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Total</span>
                                <span className="text-accent">${totalPrice} per month</span>
                            </div>
                        </div>

                        <Button 
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group" 
                            size="lg"
                            onClick={handlePurchase}
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button 
                            variant="outline" 
                            className="w-full border-border hover:border-primary" 
                            size="lg"
                            onClick={onContactSales}
                        >
                            Contact Sales
                        </Button>

                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">
                                14-day free trial • No credit card required
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        </section>
    );
}
