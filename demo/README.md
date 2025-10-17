# Demo Page for @noxxagency/ui

This directory contains a comprehensive demo page showcasing all components in the library.

## Running the Demo

```bash
# Install dependencies first (if not already installed)
npm install

# Start the dev server
npm run dev
# or
npm run demo
```

This will open the demo page at `http://localhost:3000` with:

- **50+ UI Components** demonstrated with live examples
- **Code snippets** showing how to use each component
- **Interactive examples** where you can interact with components
- **Full documentation** for props and customization
- **Dark mode toggle** to test theme support
- **Responsive design** showing mobile/desktop views

## Building the Demo

To build a static version of the demo:

```bash
npm run build:demo
```

The built demo will be in the `demo-dist` folder.

## Preview Built Demo

```bash
npm run preview:demo
```

## What's Included

### UI Components
- Buttons (all variants and sizes)
- Cards with headers, content, footers
- Alerts (default and destructive)
- Badges (all variants)
- Avatars with fallbacks
- Accordions (collapsible content)
- Tabs (switchable views)
- Tables (data display)
- Skeleton loaders
- And 40+ more components!

### Form Components
- Input fields
- Textareas
- Select dropdowns
- Checkboxes
- Switches
- Sliders
- Progress bars
- Labels

### Application Components
- Navigation (responsive with CTA)
- Theme Switcher (light/dark/system)
- Privacy Modal (GDPR/cookies)
- Particle Background (animated effects)
- Pricing Section (with plans and features)

## Features Demonstrated

✅ **Full Customization** - Every component showing className, style, and prop options
✅ **TypeScript Support** - Type-safe examples with IntelliSense
✅ **Responsive Design** - Mobile and desktop views
✅ **Dark Mode** - Theme switching demonstration
✅ **Accessibility** - ARIA labels and keyboard navigation
✅ **Code Examples** - Copy-paste ready code snippets

## Directory Structure

```
demo/
├── index.html       # HTML entry point
├── main.tsx         # React entry point
├── App.tsx          # Main demo page component
└── styles.css       # Global styles and Tailwind setup
```
