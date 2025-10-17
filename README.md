# @noxxagency/ui

A comprehensive React component library for NOXX Agency projects, fully compatible with Next.js and built on top of Radix UI primitives.

🌐 **Website**: [ui.noxx.agency](https://ui.noxx.agency)  
📧 **Contact**: [contact@noxx.agency](mailto:contact@noxx.agency)  
📦 **NPM**: [@noxxagency/ui](https://www.npmjs.com/package/@noxxagency/ui)  
🔗 **GitHub**: [noxxagency/ui](https://github.com/noxxagency/ui)

## Installation

```bash
npm install @noxxagency/ui
# or
yarn add @noxxagency/ui
# or
pnpm add @noxxagency/ui
```

## Features

- 🎨 **45+ Pre-built Components** - Complete UI toolkit ready to use
- ⚡ **Next.js Compatible** - Works seamlessly with Next.js 13+ and App Router
- 🎯 **Fully Customizable** - Accept custom className, style, id, and all standard HTML attributes
- 🔧 **Radix UI Powered** - Built on accessible, unstyled primitives
- 🎭 **Framer Motion** - Smooth animations out of the box
- 📦 **Tree-shakeable** - Import only what you need
- 💪 **TypeScript Ready** - Full type definitions included
- 🎨 **Tailwind CSS** - Utility-first styling (bring your own config)

## Prerequisites

Your project should have:
- React 18+ or React 19+
- Tailwind CSS configured
- (Optional) Framer Motion for animated components

## Quick Start

```jsx
import { Button, Card, Badge } from '@noxxagency/ui';

function App() {
  return (
    <Card className="p-6">
      <Badge variant="secondary">New</Badge>
      <h2 className="text-2xl font-bold">Hello NOXX UI</h2>
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

## Component Categories

### UI Components
Atomic, reusable components that form the foundation:
- `Button` - Multiple variants (default, destructive, outline, secondary, ghost, link)
- `Input` - Text inputs with validation states
- `Card` - Container with header, content, footer sections
- `Badge` - Labels and tags
- `Dialog` - Modal dialogs
- `Select` - Dropdown selects
- `Checkbox`, `Switch`, `RadioGroup` - Form controls
- And 35+ more components...

### Feature Components
Pre-built sections ready to use:
- `HeroSection` - Landing page hero with animations
- `FeaturesSection` - Feature showcase grid
- `PricingSection` - Pricing tables
- `ContactSection` - Contact forms
- `Footer` - Site footer with links
- And more...

## Usage with Next.js

### App Router (Next.js 13+)

```jsx
'use client'; // For components using hooks or interactivity

import { Button, Card } from '@noxxagency/ui';

export default function Page() {
  return (
    <Card className="max-w-md mx-auto">
      <Button>Next.js App Router</Button>
    </Card>
  );
}
```

### Pages Router

```jsx
import { Button, Card } from '@noxxagency/ui';

export default function Page() {
  return (
    <Card className="max-w-md mx-auto">
      <Button>Next.js Pages Router</Button>
    </Card>
  );
}
```

## Customization

All components accept standard HTML attributes and can be fully customized:

```jsx
<Button 
  className="bg-blue-500 hover:bg-blue-600" 
  id="my-button"
  data-testid="submit-btn"
  aria-label="Submit form"
  onClick={handleClick}
>
  Custom Button
</Button>
```

## Component Props

Every component supports:
- `className` - Merge with default styles using our `cn()` utility
- `style` - Inline styles
- `id` - Element ID
- `data-*` - Data attributes
- `aria-*` - ARIA attributes
- Component-specific props (variant, size, etc.)
- All standard HTML element props

## Styling

Components use Tailwind CSS and can be customized through:
1. **className prop** - Add or override classes
2. **CSS variables** - Define theme colors
3. **Tailwind config** - Extend with your design system

Example CSS variables for theming:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ...and more */
}
```

## Available Components

### UI Components (45+)
accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner (toast), switch, table, tabs, textarea, toggle, toggle-group, tooltip

### Feature Components
- BenefitsSection
- ChatbotProvider
- ContactSection
- DemoSection
- EnterpriseSolutionsSection
- FeaturesSection
- Footer
- HeroSection
- LanguageSwitcher
- Logo
- Navigation
- ParticleBackground
- PricingSection
- PrivacyModal
- ThemeSwitcher

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## License

MIT © NOXX Agency

## Support

For issues, feature requests, or questions, please contact the NOXX Agency development team.
