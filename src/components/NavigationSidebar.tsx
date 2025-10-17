'use client';

import { useState } from 'react';
import { CaretRight } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { ScrollArea } from './ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '../utils';

export interface NavigationItem {
  title: string;
  href: string;
  icon?: ReactNode;
  items?: NavigationItem[];
}

export interface NavigationCategory {
  title: string;
  icon?: ReactNode;
  items: NavigationItem[];
}

export interface NavigationSidebarProps {
  /** Main navigation sections (e.g., Getting Started, Components) */
  navigation: NavigationItem[];
  
  /** Optional categorized items (shown when matching route) */
  categories?: NavigationCategory[];
  
  /** Route prefix to show categories (e.g., '/components') */
  categoryRoutePrefix?: string;
  
  /** Current active path */
  pathname: string;
  
  /** Custom link component (default: 'a') */
  linkComponent?: React.ComponentType<{ href: string; className?: string; children: ReactNode }>;
  
  /** Width of the sidebar */
  width?: string;
  
  /** Top offset for sticky positioning */
  topOffset?: string;
  
  /** Additional className for the aside element */
  className?: string;
  
  /** Show/hide on mobile (default: hidden) */
  showOnMobile?: boolean;
}

interface CategorySectionProps {
  category: NavigationCategory;
  pathname: string;
  linkComponent: React.ComponentType<{ href: string; className?: string; children: ReactNode }>;
}

function CategorySection({ category, pathname, linkComponent: Link }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  const hasActiveItem = category.items.some(item => pathname === item.href);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full group hover:text-primary transition-colors">
        <div className="flex items-center gap-2">
          {category.icon && <span className="text-muted-foreground group-hover:text-primary">{category.icon}</span>}
          <span className={cn(
            'text-xs font-semibold uppercase tracking-wider',
            hasActiveItem ? 'text-primary' : 'text-muted-foreground'
          )}>
            {category.title}
          </span>
        </div>
        <CaretRight className={cn(
          'h-3 w-3 transition-transform text-muted-foreground group-hover:text-primary',
          isOpen && 'rotate-90'
        )} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 space-y-1">
        {category.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-all',
              pathname === item.href
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            {item.icon && <span className="text-current opacity-70">{item.icon}</span>}
            {item.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

const DefaultLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export function NavigationSidebar({
  navigation,
  categories,
  categoryRoutePrefix,
  pathname,
  linkComponent: Link = DefaultLink,
  width = 'w-[260px]',
  topOffset = 'top-16',
  className,
  showOnMobile = false,
}: NavigationSidebarProps) {
  const showCategories = categoryRoutePrefix && categories && pathname.startsWith(categoryRoutePrefix);

  return (
    <aside 
      className={cn(
        'flex-col border-r bg-muted/5 sticky self-start',
        width,
        topOffset,
        showOnMobile ? 'flex' : 'hidden md:flex',
        className
      )}
    >
      <ScrollArea className={`h-[calc(100vh-${topOffset === 'top-16' ? '4rem' : '0px'})]`}>
        <div className="px-4 py-6">
          <nav className="space-y-6 pb-8">
            {/* Main Navigation */}
            {navigation.map((section) => (
              <div key={section.href} className="space-y-3">
                <Link
                  href={section.href}
                  className={cn(
                    'flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary',
                    pathname === section.href
                      ? 'text-primary'
                      : 'text-foreground/80'
                  )}
                >
                  {section.icon && <span className="text-current">{section.icon}</span>}
                  {section.title}
                </Link>
                {section.items && (
                  <ul className="space-y-1 border-l-2 border-border pl-3">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-2 text-sm py-1.5 px-2 rounded-md transition-all',
                            pathname === item.href
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          {item.icon && <span className="text-current opacity-70">{item.icon}</span>}
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Categories - Only show when matching route */}
            {showCategories && (
              <div className="space-y-4 pt-2">
                {categories.map((category) => (
                  <CategorySection 
                    key={category.title} 
                    category={category} 
                    pathname={pathname}
                    linkComponent={Link}
                  />
                ))}
              </div>
            )}
          </nav>
        </div>
      </ScrollArea>
    </aside>
  );
}
