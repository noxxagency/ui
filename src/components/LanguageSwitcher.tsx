import {
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type ReactNode,
} from "react";

import { Check, Globe, MagnifyingGlass } from "@phosphor-icons/react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "../utils";

// Comprehensive list of ALL languages with emoji flags v2
const ALL_LANGUAGES = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
    { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴" },
    { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
    { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
    { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
    { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
    { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭" },
    { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "fa", name: "Persian", nativeName: "فارسی", flag: "🇮🇷" },
    { code: "he", name: "Hebrew", nativeName: "עברית", flag: "🇮🇱" },
    { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷" },
    { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
    { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
    { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺" },
    { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮" },
    { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴" },
    { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰" },
    { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰" },
    { code: "bg", name: "Bulgarian", nativeName: "Български", flag: "🇧🇬" },
    { code: "hr", name: "Croatian", nativeName: "Hrvatski", flag: "🇭🇷" },
    { code: "sr", name: "Serbian", nativeName: "Српски", flag: "🇷🇸" },
    { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
    { code: "lt", name: "Lithuanian", nativeName: "Lietuvių", flag: "🇱🇹" },
    { code: "lv", name: "Latvian", nativeName: "Latviešu", flag: "🇱🇻" },
    { code: "et", name: "Estonian", nativeName: "Eesti", flag: "🇪🇪" },
    { code: "sl", name: "Slovenian", nativeName: "Slovenščina", flag: "🇸🇮" },
    { code: "is", name: "Icelandic", nativeName: "Íslenska", flag: "🇮🇸" },
    { code: "ga", name: "Irish", nativeName: "Gaeilge", flag: "🇮🇪" },
    { code: "sq", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱" },
    { code: "mk", name: "Macedonian", nativeName: "Македонски", flag: "🇲🇰" },
    { code: "bs", name: "Bosnian", nativeName: "Bosanski", flag: "🇧🇦" },
    { code: "ca", name: "Catalan", nativeName: "Català", flag: "🇪🇸" },
    { code: "eu", name: "Basque", nativeName: "Euskara", flag: "🇪🇸" },
    { code: "gl", name: "Galician", nativeName: "Galego", flag: "🇪🇸" },
    { code: "cy", name: "Welsh", nativeName: "Cymraeg", flag: "🏴󐁧󐁢󐁷󐁬󐁳󐁿" },
    { code: "af", name: "Afrikaans", nativeName: "Afrikaans", flag: "🇿🇦" },
    { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪" },
    { code: "am", name: "Amharic", nativeName: "አማርኛ", flag: "🇪🇹" },
    { code: "zu", name: "Zulu", nativeName: "isiZulu", flag: "🇿🇦" },
    { code: "xh", name: "Xhosa", nativeName: "isiXhosa", flag: "🇿🇦" },
    { code: "my", name: "Burmese", nativeName: "မြန်မာ", flag: "🇲🇲" },
    { code: "km", name: "Khmer", nativeName: "ភាសាខ្មែរ", flag: "🇰🇭" },
    { code: "lo", name: "Lao", nativeName: "ລາວ", flag: "🇱🇦" },
    { code: "ka", name: "Georgian", nativeName: "ქართული", flag: "🇬🇪" },
    { code: "hy", name: "Armenian", nativeName: "Հայերեն", flag: "🇦🇲" },
    { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan", flag: "🇦🇿" },
    { code: "kk", name: "Kazakh", nativeName: "Қазақ", flag: "🇰🇿" },
    { code: "uz", name: "Uzbek", nativeName: "Oʻzbek", flag: "🇺🇿" },
    { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳" },
    { code: "ne", name: "Nepali", nativeName: "नेपाली", flag: "🇳🇵" },
    { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
    { code: "tl", name: "Filipino", nativeName: "Filipino", flag: "🇵🇭" },
    { code: "ceb", name: "Cebuano", nativeName: "Cebuano", flag: "🇵🇭" },
    { code: "jv", name: "Javanese", nativeName: "Basa Jawa", flag: "🇮🇩" },
    { code: "su", name: "Sundanese", nativeName: "Basa Sunda", flag: "🇮🇩" },
    { code: "mg", name: "Malagasy", nativeName: "Malagasy", flag: "🇲🇬" },
    { code: "mt", name: "Maltese", nativeName: "Malti", flag: "🇲🇹" },
    { code: "lb", name: "Luxembourgish", nativeName: "Lëtzebuergesch", flag: "🇱🇺" },
    { code: "fy", name: "Frisian", nativeName: "Frysk", flag: "🇳🇱" },
    { code: "yi", name: "Yiddish", nativeName: "ייִדיש", flag: "🇮🇱" },
    { code: "la", name: "Latin", nativeName: "Latina", flag: "🏛️" },
    { code: "eo", name: "Esperanto", nativeName: "Esperanto", flag: "🌍" },
];

type TranslateFn = (value: string) => ReactNode;

export interface LanguageOption {
    code: string;
    name: string;
    nativeName: string;
    flag?: ReactNode;
}

export interface LanguageSwitcherProps extends Omit<JSX.IntrinsicElements["div"], "onChange"> {
    languages?: LanguageOption[];
    currentLanguage?: string;
    defaultLanguage?: string;
    onLanguageChange?: (code: string, option: LanguageOption) => void;
    translator?: TranslateFn;
    searchPlaceholder?: ReactNode;
    noResultsLabel?: ReactNode;
    triggerVariant?: React.ComponentProps<typeof Button>["variant"];
    triggerSize?: React.ComponentProps<typeof Button>["size"];
    renderTriggerLabel?: (option: LanguageOption | undefined) => ReactNode;
    renderMobileLabel?: (option: LanguageOption | undefined) => ReactNode;
    modal?: boolean;
    enableMountGuard?: boolean;
    disableScrollLockFix?: boolean;
    dropdownClassName?: string;
    dropdownAlign?: "start" | "center" | "end";
    searchInputProps?: Partial<React.ComponentProps<typeof Input>>;
    initialSearchTerm?: string;
    onSearchChange?: (term: string) => void;
    filterFunction?: (option: LanguageOption, searchTerm: string) => boolean;
    buttonClassName?: string;
}

const defaultTranslator: TranslateFn = (value) => value;

const translateValue = (value: ReactNode, translator: TranslateFn): ReactNode => {
    if (typeof value === "string") {
        return translator(value);
    }
    return value;
};

const translateToString = (value: ReactNode, translator: TranslateFn): string => {
    const translated = translateValue(value, translator);
    if (typeof translated === "string") {
        return translated;
    }
    if (translated === null || translated === undefined) {
        return "";
    }
    return String(translated);
};

const defaultTriggerLabel = (option?: LanguageOption): ReactNode => {
    if (!option) {
        return "English";
    }
    return (
        <span className="hidden sm:inline">
            {option.flag} {option.nativeName}
        </span>
    );
};

const defaultMobileLabel = (option?: LanguageOption): ReactNode => {
    if (!option) {
        return "EN";
    }
    return <span className="sm:hidden">{option.flag ?? option.code.toUpperCase()}</span>;
};

const defaultFilter = (option: LanguageOption, searchTerm: string) => {
    if (!searchTerm) {
        return true;
    }
    const normalized = searchTerm.toLowerCase();
    return (
        option.name.toLowerCase().includes(normalized) ||
        option.nativeName.toLowerCase().includes(normalized) ||
        option.code.toLowerCase().includes(normalized)
    );
};

export function LanguageSwitcher({
    languages,
    currentLanguage,
    defaultLanguage,
    onLanguageChange,
    translator = defaultTranslator,
    searchPlaceholder = "Search languages...",
    noResultsLabel = "No languages found",
    triggerVariant = "outline",
    triggerSize = "sm",
    renderTriggerLabel = defaultTriggerLabel,
    renderMobileLabel = defaultMobileLabel,
    modal = false,
    enableMountGuard = true,
    disableScrollLockFix = false,
    dropdownClassName,
    dropdownAlign = "end",
    searchInputProps,
    initialSearchTerm = "",
    onSearchChange,
    filterFunction = defaultFilter,
    buttonClassName,
    ...divProps
}: LanguageSwitcherProps) {
    const languageList = useMemo(() => languages ?? ALL_LANGUAGES, [languages]);
    const [mounted, setMounted] = useState(!enableMountGuard);
    const [isOpen, setIsOpen] = useState(false);
    const [internalLanguage, setInternalLanguage] = useState(() => {
        if (currentLanguage) {
            return currentLanguage;
        }
        if (defaultLanguage) {
            return defaultLanguage;
        }
        return languageList[0]?.code ?? "en";
    });
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    const activeLanguageCode = currentLanguage ?? internalLanguage;
    const activeLanguage = languageList.find(
        (language) => language.code === activeLanguageCode
    );

    useEffect(() => {
        if (enableMountGuard) {
            setMounted(true);
        }
    }, [enableMountGuard]);

    useEffect(() => {
        if (currentLanguage) {
            setInternalLanguage(currentLanguage);
        }
    }, [currentLanguage]);

    useEffect(() => {
        if (!disableScrollLockFix && isOpen && typeof document !== "undefined") {
            const originalOverflow = document.body.style.overflow;
            const originalPaddingRight = document.body.style.paddingRight;
            const scrollbarWidth =
                typeof window !== "undefined"
                    ? window.innerWidth - document.documentElement.clientWidth
                    : 0;
            document.body.style.overflow = "auto";
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = "0px";
            }

            return () => {
                document.body.style.overflow = originalOverflow;
                document.body.style.paddingRight = originalPaddingRight;
            };
        }
        return undefined;
    }, [disableScrollLockFix, isOpen]);

    useEffect(() => {
        onSearchChange?.(searchTerm);
    }, [onSearchChange, searchTerm]);

        useEffect(() => {
            if (
                !currentLanguage &&
                !languageList.some((lang) => lang.code === activeLanguageCode)
            ) {
                const fallback = languageList[0]?.code ?? "en";
                setInternalLanguage(fallback);
            }
        }, [activeLanguageCode, currentLanguage, languageList]);

    if (!mounted) {
        return null;
    }

    const filteredLanguages = languageList.filter((language) =>
        filterFunction(language, searchTerm)
    );

        const {
            className: searchInputClassName,
            type: searchInputType,
            ...restSearchInputProps
        } = searchInputProps ?? {};

    const handleLanguageSelect = (language: LanguageOption) => {
        if (!currentLanguage) {
            setInternalLanguage(language.code);
        }
        onLanguageChange?.(language.code, language);
        setIsOpen(false);
        setSearchTerm("");
    };

    return (
        <div {...divProps}>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={modal}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={triggerVariant}
                        size={triggerSize}
                        className={cn("gap-2", buttonClassName)}
                    >
                        <Globe size={16} weight="duotone" />
                        {renderTriggerLabel(activeLanguage) ?? (
                            <span className="hidden sm:inline">
                                {translateValue("English", translator)}
                            </span>
                        )}
                        {renderMobileLabel(activeLanguage)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align={dropdownAlign}
                    className={cn("w-64 p-0", dropdownClassName)}
                >
                    <div className="p-2 border-b sticky top-0 bg-background z-10">
                        <div className="relative">
                            <MagnifyingGlass
                                className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={16}
                            />
                            <Input
                                key={activeLanguageCode}
                                            type={searchInputType ?? "text"}
                                value={searchTerm}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                                setSearchTerm(event.target.value)
                                            }
                                            placeholder={translateToString(
                                                searchPlaceholder,
                                                translator
                                            )}
                                            className={cn("pl-8 h-8", searchInputClassName)}
                                autoComplete="off"
                                            {...restSearchInputProps}
                            />
                        </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                        {filteredLanguages.length > 0 ? (
                            filteredLanguages.map((language) => (
                                <DropdownMenuItem
                                    key={language.code}
                                    onClick={() => handleLanguageSelect(language)}
                                                className="flex items-center justify-between cursor-pointer px-3 py-2"
                                                inset={false}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl min-w-[32px]">{language.flag}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">
                                                {language.nativeName}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {language.name}
                                            </span>
                                        </div>
                                    </div>
                                    {activeLanguageCode === language.code && (
                                        <Check size={16} weight="bold" className="text-primary" />
                                    )}
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                {translateValue(noResultsLabel, translator)}
                            </div>
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
