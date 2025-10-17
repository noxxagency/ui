# ThemeSwitcher Component - localStorage Integration

## Overview

The `ThemeSwitcher` component now includes automatic theme persistence using `localStorage`. This ensures user theme preferences are remembered across sessions and page reloads.

## Features

- 💾 **Persistent Storage**: Theme choice saved to localStorage
- 🎨 **System Default**: Falls back to system color scheme if no preference set
- 🔄 **Real-time Sync**: Listens to system theme changes when "System" is selected
- 🚫 **Hydration Safe**: Prevents hydration mismatches with mounted state
- ⚡ **Zero Configuration**: Works out of the box

## How It Works

### 1. Initial Load
When the component mounts:
1. Checks `localStorage` for saved theme preference
2. If found, applies that theme
3. If not found, uses system preference (light/dark based on `prefers-color-scheme`)

### 2. Theme Selection
When user selects a theme:
1. Updates the visual theme immediately
2. Saves selection to `localStorage` as `'theme'`
3. Applies appropriate class to `<html>` element

### 3. System Theme Mode
When "System" is selected:
1. Saves `'system'` to localStorage
2. Detects current system preference
3. Listens for system theme changes via `matchMedia`
4. Auto-updates theme when system preference changes

## localStorage Key

The component uses the following localStorage key:
- **Key**: `'theme'`
- **Values**: `'light'` | `'dark'` | `'system'`

## Code Example

### Basic Usage
```tsx
import { ThemeSwitcher } from '@noxxagency/ui';

export default function App() {
  return (
    <Header
      renderThemeSwitcher={
        <ThemeSwitcher 
          buttonVariant="ghost" 
          buttonSize="sm" 
        />
      }
    />
  );
}
```

### Controlled Mode (Custom Storage)
If you want to handle storage yourself:

```tsx
'use client';

import { ThemeSwitcher } from '@noxxagency/ui';
import { useState, useEffect } from 'react';

export default function CustomThemeApp() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  // Load from custom storage
  useEffect(() => {
    const saved = myCustomStorage.get('user-theme');
    if (saved) setTheme(saved);
  }, []);

  // Save to custom storage
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    myCustomStorage.set('user-theme', newTheme);
    
    // Apply theme manually
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <ThemeSwitcher 
      theme={theme}
      onThemeChange={handleThemeChange}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark' \| 'system'` | - | Controlled theme value |
| `onThemeChange` | `(theme) => void` | - | Callback when theme changes |
| `buttonVariant` | `ButtonVariant` | `'ghost'` | Button styling variant |
| `buttonSize` | `ButtonSize` | `'sm'` | Button size |
| `lightLabel` | `string` | `'Light'` | Label for light mode |
| `darkLabel` | `string` | `'Dark'` | Label for dark mode |
| `systemLabel` | `string` | `'System'` | Label for system mode |
| `ariaLabel` | `string` | `'Toggle theme'` | Accessibility label |
| `className` | `string` | `''` | Additional CSS classes |
| `isOverDarkSection` | `boolean` | `false` | Adjust colors for dark backgrounds |

## Implementation Details

### Hydration Safety
The component prevents hydration mismatches by:
1. Using a `mounted` state that only updates on client
2. Rendering a disabled placeholder button during SSR
3. Only showing the actual theme once mounted

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  // Initialize theme from localStorage
}, []);

if (!mounted) {
  return <Button disabled>...</Button>;
}
```

### System Theme Detection
```tsx
useEffect(() => {
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
}, [theme]);
```

### Theme Application
```tsx
const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  }
};
```

## Migration from Old Version

If you were using the old ThemeSwitcher without localStorage:

### Before
```tsx
<ThemeSwitcher /> // Lost theme on page reload
```

### After
```tsx
<ThemeSwitcher /> // Automatically persists theme! 🎉
```

No changes needed - it just works!

## Behavior Matrix

| User Action | localStorage | Document Class | Behavior |
|-------------|-------------|----------------|----------|
| First visit | Empty | System default | Uses system preference |
| Select Light | `'light'` | Remove `'dark'` | Light theme |
| Select Dark | `'dark'` | Add `'dark'` | Dark theme |
| Select System | `'system'` | Dynamic | Follows system preference |
| Page reload | Previous choice | Restored | Theme persists |
| System changes (System mode) | `'system'` | Auto-updates | Follows new system preference |

## Browser Support

Works in all modern browsers with:
- `localStorage` API
- `window.matchMedia`
- `MutationObserver` (for ParticleBackground theme sync)

Gracefully degrades in older browsers:
- Falls back to session-only theme
- Still allows manual theme switching

## Accessibility

- **Keyboard Navigation**: Full keyboard support via dropdown
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **High Contrast**: Works with system high contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion`

## Common Issues

### Theme flashes on page load
**Solution**: Add this to your root layout:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const applied = theme === 'system' ? systemTheme : theme;
                if (applied === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Theme not syncing across tabs
This is by design - each tab maintains its own state. If you need cross-tab sync, implement a `storage` event listener:

```tsx
useEffect(() => {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'theme' && e.newValue) {
      setTheme(e.newValue as any);
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, []);
```

### TypeScript errors
Ensure you have the latest type definitions:

```tsx
theme?: 'light' | 'dark' | 'system';
onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
```

## Testing

```tsx
describe('ThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeSwitcher />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('saves theme to localStorage on change', () => {
    const { getByText } = render(<ThemeSwitcher />);
    fireEvent.click(getByText('Dark'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('uses system preference when not set', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    render(<ThemeSwitcher />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

## Related Documentation

- [Header Component](./HEADER_USAGE.md)
- [ParticleBackground Component](./PARTICLE_BACKGROUND_USAGE.md)
- [Dark Mode Guide](./DARK_MODE.md)
