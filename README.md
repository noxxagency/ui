# @noxxagency/ui

A comprehensive React component library for NOXX Agency projects, fully compatible with Next.js and built on top of Radix UI primitives.

🌐 **Website**: [ui.noxx.agency](https://ui.noxx.agency)  
📧 **Contact**: [contact@noxx.agency](mailto:contact@noxx.agency)  
📦 **NPM**: [@noxxagency/ui](https://www.npmjs.com/package/@noxxagency/ui)  
🔗 **GitHub**: [noxxagency/ui](https://github.com/noxxagency/ui)

---

## 📦 Installation

```bash
npm install @noxxagency/ui
# or
yarn add @noxxagency/ui
# or
pnpm add @noxxagency/ui
```

## ✨ Features

- 🎨 **60+ Pre-built Components** - Complete UI toolkit ready to use
- ⚡ **Next.js 13+ Compatible** - Works seamlessly with App Router
- 🎯 **Fully Customizable** - Accept custom className, style, and all HTML attributes
- 🔧 **Radix UI Powered** - Built on accessible, unstyled primitives
- 🎭 **Animations Built-in** - Typography with 8 animation types
- 📦 **Tree-shakeable** - Import only what you need
- 💪 **TypeScript** - Full type definitions included
- 🎨 **Tailwind CSS** - Utility-first styling

## 🚀 Quick Start

```jsx
import { Button, Card, Badge, Typography } from '@noxxagency/ui';

export default function App() {
  return (
    <Card className="p-6 max-w-md">
      <Badge variant="secondary">New</Badge>
      <Typography as="h2" className="text-2xl font-bold mt-2">
        Hello @noxxagency/ui
      </Typography>
      <Typography as="p" className="mt-4 text-muted-foreground">
        A comprehensive component library for modern React applications.
      </Typography>
      <Button className="mt-6" onClick={() => alert('Clicked!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

---

## 📚 Component Documentation

### Table of Contents
- [@noxxagency/ui](#noxxagencyui)
  - [📦 Installation](#-installation)
  - [✨ Features](#-features)
  - [🚀 Quick Start](#-quick-start)
  - [📚 Component Documentation](#-component-documentation)
    - [Table of Contents](#table-of-contents)
  - [UI Components](#ui-components)
    - [Button](#button)
    - [Typography](#typography)
    - [Card](#card)
    - [Badge](#badge)
    - [Input](#input)
    - [Dialog](#dialog)
    - [Select](#select)
    - [Form Components](#form-components)
      - [Checkbox](#checkbox)
      - [Switch](#switch)
      - [Radio Group](#radio-group)
      - [Textarea](#textarea)
    - [Navigation Components](#navigation-components)
      - [Tabs](#tabs)
      - [Breadcrumb](#breadcrumb)
    - [Data Display](#data-display)
      - [Table](#table)
      - [Avatar](#avatar)
      - [Skeleton](#skeleton)
    - [Feedback](#feedback)
      - [Alert](#alert)
      - [Toast (Sonner)](#toast-sonner)
      - [Progress](#progress)
    - [Overlay](#overlay)
      - [Tooltip](#tooltip)
      - [Popover](#popover)
      - [Sheet (Slide-over)](#sheet-slide-over)
  - [Feature Components](#feature-components)
    - [Header Component](#header-component)
    - [Footer Component](#footer-component)
    - [Hero Section](#hero-section)
    - [Features Section](#features-section)
    - [Pricing Section](#pricing-section)
  - [🎨 Theming](#-theming)
    - [CSS Variables](#css-variables)
    - [Theme Switcher](#theme-switcher)
  - [🔧 Utility Functions](#-utility-functions)
    - [cn() - Class Name Merger](#cn---class-name-merger)
  - [📱 Responsive Design](#-responsive-design)
  - [♿ Accessibility](#-accessibility)
  - [🚦 TypeScript Support](#-typescript-support)
  - [🔄 Migration from Shadcn/UI](#-migration-from-shadcnui)
  - [📦 Bundle Size](#-bundle-size)
  - [🛠️ Development](#️-development)
  - [📄 License](#-license)
  - [🤝 Support](#-support)

---

## UI Components

### Button

Versatile button component with multiple variants and sizes.

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes**: `default`, `sm`, `lg`, `icon`

```jsx
import { Button } from '@noxxagency/ui';

// Basic usage
<Button>Click me</Button>

// With variant
<Button variant="outline">Outline Button</Button>
<Button variant="destructive">Delete</Button>

// With size
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icon
import { ArrowRight } from '@phosphor-icons/react';
<Button>
  Continue
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>

// Custom styling
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Gradient Button
</Button>
```

**Props**:
- `variant?`: Button style variant
- `size?`: Button size
- `asChild?`: Render as child component (useful for links)
- `className?`: Additional CSS classes
- All standard button HTML attributes

---

### Typography

Universal text rendering component with 17 variants and 8 animation types.

**Variants**: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `p`, `span`, `strong`, `em`, `small`, `blockquote`, `code`, `lead`, `large`, `muted`  
**Animations**: `typewriter`, `fade-in`, `slide-up`, `slide-down`, `flip`, `rotate`, `scale-in`, `none`

```jsx
import { Typography } from '@noxxagency/ui';

// Headings
<Typography as="h1">Main Heading</Typography>
<Typography as="h2">Subheading</Typography>

// Paragraph variants
<Typography as="p">Regular paragraph text</Typography>
<Typography as="lead">Larger lead paragraph</Typography>
<Typography as="muted">Muted secondary text</Typography>

// Custom sizes (variants don't include text-size classes)
<Typography as="h1" className="text-7xl">
  Giant Heading
</Typography>

// Animations
<Typography 
  as="h1" 
  animation="typewriter"
  animationSpeed={50}
>
  Typewriter Effect
</Typography>

<Typography 
  as="p" 
  animation="fade-in"
  animateOnView={true}
  animationDelay={300}
>
  Fades in when scrolled into view
</Typography>

// Looping animations
<Typography 
  as="span" 
  animation="rotate"
  loop={true}
>
  Rotating Text
</Typography>

// Gradient text
<Typography 
  as="h1" 
  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
>
  Gradient Heading
</Typography>
```

**Props**:
- `as?`: HTML element to render (h1-h6, p, span, etc.)
- `variant?`: Style variant (overrides semantic styling of `as`)
- `animation?`: Animation type
- `animationSpeed?`: Animation speed in ms (default: 50)
- `animationDelay?`: Delay before animation starts (default: 0)
- `animateOnView?`: Trigger animation when scrolled into view (default: true)
- `loop?`: Loop animation infinitely (default: false)
- `className?`: Additional CSS classes
- `children`: Content to render

---

### Card

Container component with header, content, and footer sections.

```jsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@noxxagency/ui';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content of the card</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card with custom styling
<Card className="border-2 border-primary">
  <CardHeader className="bg-primary/10">
    <CardTitle>Featured Card</CardTitle>
  </CardHeader>
  <CardContent className="pt-6">
    <p>This card stands out</p>
  </CardContent>
</Card>

// Interactive card
<Card className="hover:shadow-lg transition-shadow cursor-pointer">
  <CardContent className="p-6">
    <h3 className="font-bold">Clickable Card</h3>
  </CardContent>
</Card>
```

---

### Badge

Small labels for status, categories, or counts.

**Variants**: `default`, `secondary`, `destructive`, `outline`

```jsx
import { Badge } from '@noxxagency/ui';

// Variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// Custom colors
<Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
<Badge className="bg-yellow-500 text-black">Warning</Badge>

// With icons
<Badge>
  <Star className="w-3 h-3 mr-1" />
  Featured
</Badge>

// Counts
<Badge variant="secondary">{unreadCount}</Badge>
```

---

### Input

Text input fields with validation states.

```jsx
import { Input, Label } from '@noxxagency/ui';

// Basic input
<Input type="text" placeholder="Enter your name" />

// With label
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>

// Disabled
<Input disabled placeholder="Disabled input" />

// With error state (using custom class)
<Input 
  className="border-destructive focus-visible:ring-destructive" 
  placeholder="Invalid input"
/>

// Password input
<Input type="password" placeholder="Enter password" />

// With icon (wrap in relative container)
<div className="relative">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search..." />
</div>
```

**Props**:
- `type?`: Input type (text, email, password, etc.)
- `placeholder?`: Placeholder text
- `disabled?`: Disabled state
- `className?`: Additional CSS classes
- All standard input HTML attributes

---

### Dialog

Modal dialogs for important information or actions.

```jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@noxxagency/ui';

// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Controlled dialog
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
    <DialogFooter>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Select

Dropdown selection component.

```jsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@noxxagency/ui';

// Basic select
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>

// With groups
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="potato">Potato</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>

// Controlled select
const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Form Components

#### Checkbox

```jsx
import { Checkbox, Label } from '@noxxagency/ui';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

#### Switch

```jsx
import { Switch, Label } from '@noxxagency/ui';

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

// Controlled
const [enabled, setEnabled] = useState(false);
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

#### Radio Group

```jsx
import { RadioGroup, RadioGroupItem, Label } from '@noxxagency/ui';

<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>
```

#### Textarea

```jsx
import { Textarea, Label } from '@noxxagency/ui';

<div>
  <Label htmlFor="message">Message</Label>
  <Textarea 
    id="message" 
    placeholder="Type your message here" 
    rows={4}
  />
</div>
```

---

### Navigation Components

#### Tabs

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@noxxagency/ui';

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content</p>
  </TabsContent>
</Tabs>
```

#### Breadcrumb

```jsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@noxxagency/ui';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Button</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

### Data Display

#### Table

```jsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@noxxagency/ui';

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Avatar

```jsx
import { Avatar, AvatarFallback, AvatarImage } from '@noxxagency/ui';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

#### Skeleton

```jsx
import { Skeleton } from '@noxxagency/ui';

<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

---

### Feedback

#### Alert

```jsx
import { Alert, AlertDescription, AlertTitle } from '@noxxagency/ui';

<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

// Destructive variant
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

#### Toast (Sonner)

```jsx
import { Toaster } from '@noxxagency/ui';
import { toast } from 'sonner';

// Add to your layout
<Toaster />

// Use in components
<Button onClick={() => toast("Event has been created")}>
  Show Toast
</Button>

// With description
toast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
})

// Different types
toast.success("Success!")
toast.error("Error!")
toast.warning("Warning!")
toast.info("Info!")
```

#### Progress

```jsx
import { Progress } from '@noxxagency/ui';

<Progress value={33} className="w-[60%]" />
```

---

### Overlay

#### Tooltip

```jsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@noxxagency/ui';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### Popover

```jsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@noxxagency/ui';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium">Dimensions</h4>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

#### Sheet (Slide-over)

```jsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@noxxagency/ui';

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you sure absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

---

## Feature Components

### Header Component

Pre-built header with logo, navigation, and actions.

```jsx
import { Header } from '@noxxagency/ui';

<Header
  logoHref="/"
  navItems={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ]}
  primaryAction={{
    label: "Get Started",
    href: "/signup",
    variant: "default"
  }}
  secondaryAction={{
    label: "Login",
    href: "/login",
    variant: "ghost"
  }}
/>

// With custom logo
<Header
  renderLogo={() => <YourCustomLogo />}
  navItems={navItems}
/>
```

**Props**:
- `logoHref?`: Logo link URL (default: "/")
- `renderLogo?`: Custom logo render function
- `navItems?`: Array of navigation items
- `primaryAction?`: Primary CTA button
- `secondaryAction?`: Secondary CTA button
- `className?`: Additional CSS classes

---

### Footer Component

Pre-built footer with links, social icons, and newsletter.

```jsx
import { Footer } from '@noxxagency/ui';

<Footer
  contactEmail="contact@noxx.agency"
  contactLabel="Build intelligent solutions"
  navItems={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ]}
  legalItems={[
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ]}
  copyrightText="© 2025 NOXX Agency. All rights reserved."
/>

// With custom logo
<Footer
  renderLogo={() => <YourLogo />}
  contactEmail="hello@example.com"
/>
```

**Props**:
- `logoHref?`: Logo link URL
- `renderLogo?`: Custom logo render function
- `contactEmail?`: Contact email (default: "contact@noxx.agency")
- `contactLabel?`: Tagline/description
- `navItems?`: Main navigation links
- `legalItems?`: Legal/footer links
- `copyrightText?`: Copyright text
- `tagline?`: Footer tagline

---

### Hero Section

Landing page hero with gradient background and animations.

```jsx
import { HeroSection } from '@noxxagency/ui';

<HeroSection
  badge="New Feature"
  title="Build Amazing Products"
  subtitle="The ultimate component library for modern web applications"
  primaryAction={{
    label: "Get Started",
    href: "/signup"
  }}
  secondaryAction={{
    label: "View Demo",
    href: "/demo"
  }}
/>
```

---

### Features Section

Grid showcase for features with icons.

```jsx
import { FeaturesSection } from '@noxxagency/ui';

<FeaturesSection
  title="Features"
  subtitle="Everything you need"
  features={[
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Performance",
      description: "Lightning-fast load times"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure",
      description: "Enterprise-grade security"
    },
  ]}
/>
```

---

### Pricing Section

Pricing table with tiers and features.

```jsx
import { PricingSection } from '@noxxagency/ui';

<PricingSection
  title="Pricing"
  subtitle="Choose your plan"
  plans={[
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      features: [
        "10 Projects",
        "Basic Support",
        "1GB Storage"
      ],
      cta: { label: "Start Free Trial", href: "/signup" }
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      featured: true,
      features: [
        "Unlimited Projects",
        "Priority Support",
        "100GB Storage",
        "Advanced Analytics"
      ],
      cta: { label: "Get Started", href: "/signup" }
    },
  ]}
/>
```

---

## 🎨 Theming

### CSS Variables

Customize the design system using CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ...other dark mode colors */
}
```

### Theme Switcher

```jsx
import { ThemeSwitcher } from '@noxxagency/ui';

// Add to your layout
<ThemeSwitcher />
```

---

## 🔧 Utility Functions

### cn() - Class Name Merger

Merge Tailwind classes efficiently:

```jsx
import { cn } from '@noxxagency/ui';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  "override-class"
)}>
  Content
</div>
```

---

## 📱 Responsive Design

All components are mobile-first and responsive:

```jsx
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent>Responsive card</CardContent>
</Card>

<Typography 
  as="h1" 
  className="text-4xl md:text-5xl lg:text-6xl"
>
  Responsive Heading
</Typography>
```

---

## ♿ Accessibility

All components follow WAI-ARIA guidelines:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Semantic HTML

```jsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

<Input 
  id="email" 
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

---

## 🚦 TypeScript Support

Full TypeScript support with exported types:

```tsx
import { 
  Button, 
  ButtonProps,
  Typography,
  TypographyProps 
} from '@noxxagency/ui';

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 🔄 Migration from Shadcn/UI

This library is compatible with shadcn/ui. Most components have the same API:

```jsx
// shadcn/ui
import { Button } from "@/components/ui/button"

// @noxxagency/ui  
import { Button } from "@noxxagency/ui"
```

---

## 📦 Bundle Size

Components are tree-shakeable. Import only what you need:

```jsx
// ✅ Good - Only imports Button
import { Button } from '@noxxagency/ui';

// ❌ Avoid - Imports everything
import * as UI from '@noxxagency/ui';
```

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build library
npm run build

# Build in watch mode
npm run dev
```

---

## 📄 License

MIT © NOXX Agency

---

## 🤝 Support

- 📧 Email: [contact@noxx.agency](mailto:contact@noxx.agency)
- 🌐 Website: [ui.noxx.agency](https://ui.noxx.agency)
- 📦 NPM: [@noxxagency/ui](https://www.npmjs.com/package/@noxxagency/ui)
- 🔗 GitHub: [noxxagency/ui](https://github.com/noxxagency/ui)

---

Made with ❤️ by NOXX Agency

For issues, feature requests, or questions, please contact the NOXX Agency development team.
