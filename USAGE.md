# NOXX UI - Usage Guide

## Table of Contents
1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [UI Components](#ui-components)
4. [Feature Components](#feature-components)
5. [Next.js Integration](#nextjs-integration)
6. [TypeScript Support](#typescript-support)
7. [Styling & Customization](#styling--customization)

## Installation

```bash
npm install github:artickc/noxx-ui
# or
yarn add github:artickc/noxx-ui
```

## Basic Setup

### Required Dependencies

Make sure your project has these peer dependencies:
- React 18+ or React 19+
- Tailwind CSS 3+

### Tailwind Configuration

Add the NOXX UI source path to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add this line:
    './node_modules/@noxxagency/ui/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      // Your theme extensions
    },
  },
  plugins: [],
}
```

### CSS Variables

Add these CSS variables to your global CSS file for theming:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
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
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## UI Components

### Buttons

```jsx
import { Button } from '@noxxagency/ui';

function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  );
}
```

### Cards

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@noxxagency/ui';

function Example() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any elements you need.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### Forms

```jsx
import { Input, Label, Button } from '@noxxagency/ui';

function Example() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Dialogs

```jsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@noxxagency/ui';

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description.
          </DialogDescription>
        </DialogHeader>
        <p>Dialog content goes here.</p>
      </DialogContent>
    </Dialog>
  );
}
```

## Feature Components

Feature components are pre-built sections that may require additional props for customization, especially for internationalization.

### Using Feature Components WITHOUT i18n

If you don't need translations, the components will use default English text:

```jsx
import { HeroSection, FeaturesSection, PricingSection } from '@noxxagency/ui';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </>
  );
}
```

### Using Feature Components WITH i18n

The feature components use a translation hook internally. To make them work with your i18n system:

**Option 1: Pass Translation Props (Recommended)**

Create wrapper components that pass translated strings:

```jsx
import { HeroSection } from '@noxxagency/ui';
import { useTranslation } from 'next-i18next';

export function MyHeroSection() {
  const { t } = useTranslation();
  
  // Note: You'll need to modify the component to accept these props
  // or create your own version using the UI components
  return (
    <HeroSection 
      badge={t('Next-Generation AI Chatbots')}
      title={t('Transform Your Website')}
      description={t('Build sophisticated chatbots...')}
    />
  );
}
```

**Option 2: Use UI Components Directly**

For maximum flexibility, build your own feature components using the UI primitives:

```jsx
'use client';

import { Button, Card, Badge } from '@noxxagency/ui';
import { useTranslation } from 'your-i18n-library';

export function CustomHero() {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4">
        <Badge variant="secondary">{t('New Feature')}</Badge>
        <h1 className="text-6xl font-bold">{t('Welcome')}</h1>
        <Button onClick={() => console.log('clicked')}>
          {t('Get Started')}
        </Button>
      </div>
    </section>
  );
}
```

## Next.js Integration

### App Router (Next.js 13+)

```jsx
// app/page.tsx
'use client'; // Required for interactive components

import { Button, Card, CardContent } from '@noxxagency/ui';
import { useState } from 'react';

export default function Page() {
  const [count, setCount] = useState(0);
  
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent className="pt-6">
        <p className="text-center mb-4">Count: {count}</p>
        <Button 
          onClick={() => setCount(count + 1)}
          className="w-full"
        >
          Increment
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Pages Router

```jsx
// pages/index.tsx
import { Button, Card, CardContent } from '@noxxagency/ui';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <p className="text-center mb-4">Count: {count}</p>
          <Button 
            onClick={() => setCount(count + 1)}
            className="w-full"
          >
            Increment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Server Components (App Router)

For non-interactive components, you can use them in Server Components:

```jsx
// app/page.tsx (Server Component)
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@noxxagency/ui';

export default function Page() {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <Badge variant="secondary">New</Badge>
        <CardTitle>Server Rendered Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card is rendered on the server.</p>
      </CardContent>
    </Card>
  );
}
```

## TypeScript Support

All components include full TypeScript support with type definitions:

```tsx
import { Button, ButtonProps } from '@noxxagency/ui';
import { ComponentProps } from 'react';

// Using built-in types
const MyButton: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  return <Button variant={variant} size={size} {...props} />;
};

// Extending component props
interface CustomButtonProps extends ButtonProps {
  customProp?: string;
}

export function CustomButton({ customProp, ...props }: CustomButtonProps) {
  return (
    <Button {...props}>
      {props.children} {customProp && `(${customProp})`}
    </Button>
  );
}
```

## Styling & Customization

### Using className

```jsx
<Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8">
  Custom Styled Button
</Button>
```

### Using inline styles

```jsx
<Button style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
  Gradient Button
</Button>
```

### Custom Variants

Create your own variants using the `cn()` utility:

```jsx
import { Button, cn } from '@noxxagency/ui';

function MyButton({ className, ...props }) {
  return (
    <Button 
      className={cn(
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'hover:from-purple-600 hover:to-pink-600',
        'text-white font-semibold',
        className
      )}
      {...props}
    />
  );
}
```

### All Standard HTML Attributes

```jsx
<Button
  id="submit-button"
  data-testid="submit-btn"
  aria-label="Submit the form"
  onClick={handleClick}
  disabled={isLoading}
  type="submit"
  form="my-form"
  name="submitBtn"
  className="custom-class"
  style={{ marginTop: '1rem' }}
>
  Submit
</Button>
```

## Best Practices

1. **Import only what you need** - Tree-shaking will remove unused components
2. **Use className for styling** - Leverages Tailwind's utility classes
3. **Add 'use client' directive** - For components using hooks in Next.js App Router
4. **Extend with custom props** - Components accept all standard HTML attributes
5. **Build custom feature components** - Use UI primitives for maximum flexibility with i18n

## Troubleshooting

### Styles not applying

Make sure:
1. Tailwind CSS is properly configured
2. The NOXX UI path is in your Tailwind content array
3. CSS variables are defined in your global CSS
4. You've imported your global CSS in your root layout/app

### TypeScript errors

Run `npm install @types/react @types/react-dom` to ensure you have React type definitions.

### Build errors

Make sure all peer dependencies are installed:
```bash
npm install react@latest react-dom@latest
```

## Support

For issues or questions, contact the NOXX Agency development team or open an issue in the GitHub repository.
