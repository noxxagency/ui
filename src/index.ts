// UI Components - Atomic design elements
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog';
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
export { AspectRatio } from './components/ui/aspect-ratio';
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
export { Badge, badgeVariants } from './components/ui/badge';
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb';
export { Button, buttonVariants } from './components/ui/button';
export { Calendar } from './components/ui/calendar';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './components/ui/carousel';
export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent } from './components/ui/chart';
export { Checkbox } from './components/ui/checkbox';
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './components/ui/command';
export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from './components/ui/context-menu';
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from './components/ui/drawer';
export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './components/ui/dropdown-menu';
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from './components/ui/form';
export { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card';
export { Input } from './components/ui/input';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './components/ui/input-otp';
export { Label } from './components/ui/label';
export { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from './components/ui/menubar';
export { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from './components/ui/navigation-menu';
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './components/ui/pagination';
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './components/ui/popover';
export { Progress } from './components/ui/progress';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from './components/ui/select';
export { Separator } from './components/ui/separator';
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
export { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarInput, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar } from './components/ui/sidebar';
export { Skeleton } from './components/ui/skeleton';
export { Slider } from './components/ui/slider';
export { Toaster } from './components/ui/sonner';
export { Switch } from './components/ui/switch';
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './components/ui/table';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
export { Textarea } from './components/ui/textarea';
export { Toggle, toggleVariants } from './components/ui/toggle';
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

// Feature Components - Pre-built sections (Note: Some may require additional props for i18n)
export { BenefitsSection } from './components/BenefitsSection';
export { CodeViewer, CodeTabs } from './components/CodeViewer';
export { ContactSection } from './components/ContactSection';
export { DemoSection } from './components/DemoSection';
export { EnterpriseSolutionsSection } from './components/EnterpriseSolutionsSection';
export { FeaturesSection } from './components/FeaturesSection';
export { Footer } from './components/Footer';
export type { FooterProps, FooterNavItem, FooterAction } from './components/Footer';
export { Header } from './components/Header';
export type { HeaderProps, HeaderNavItem, HeaderAction } from './components/Header';
export { HeroSection } from './components/HeroSection';
export { LanguageSwitcher } from './components/LanguageSwitcher';
export { Logo } from './components/Logo';
export { Navigation } from './components/Navigation';
export { NavigationSidebar } from './components/NavigationSidebar';
export type { NavigationItem, NavigationCategory, NavigationSidebarProps } from './components/NavigationSidebar';
export { ParticleBackground, HeroParticleBackground, FountainParticleBackground } from './components/ParticleBackground';
export { PricingSection } from './components/PricingSection';
export { PrivacyModal } from './components/PrivacyModal';
export { PropsTable } from './components/PropsTable';
export type { PropItem } from './components/PropsTable';
export { ThemeSwitcher } from './components/ThemeSwitcher';
export { Typography } from './components/Typography';
export type { TypographyProps } from './components/Typography';

// Utility functions
export { cn } from './utils';

// TypeScript Types
export * from './types';
