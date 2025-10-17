import React, { useState } from 'react';
// Import UI components directly from source
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../src/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '../src/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../src/components/ui/avatar';
import { Badge } from '../src/components/ui/badge';
import { Button } from '../src/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../src/components/ui/card';
import { Checkbox } from '../src/components/ui/checkbox';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../src/components/ui/select';
import { Switch } from '../src/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs';
import { Textarea } from '../src/components/ui/textarea';
import { Slider } from '../src/components/ui/slider';
import { Progress } from '../src/components/ui/progress';
import { Separator } from '../src/components/ui/separator';
import { Skeleton } from '../src/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../src/components/ui/table';
// Application components
import { ThemeSwitcher } from '../src/components/ThemeSwitcher';
import { PrivacyModal } from '../src/components/PrivacyModal';

function App() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Switcher */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">@noxxagency/ui</h1>
            <Badge variant="secondary">v1.0.0</Badge>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-4">
              <a href="#components" className="text-sm font-medium hover:underline">Components</a>
              <a href="#forms" className="text-sm font-medium hover:underline">Forms</a>
              <a href="#application" className="text-sm font-medium hover:underline">Application</a>
            </nav>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="relative z-10 text-center px-4">
          <Badge className="mb-4">Component Library</Badge>
          <h1 className="text-5xl font-bold mb-4">@noxxagency/ui</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Universal Reusable Component Library
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive collection of 50+ React components built with TypeScript, 
            Radix UI, and Tailwind CSS. Fully customizable and ready for Next.js applications.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl">50+</CardTitle>
              <CardDescription>UI Components</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl">100%</CardTitle>
              <CardDescription>TypeScript</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl">0</CardTitle>
              <CardDescription>Build Errors</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl">∞</CardTitle>
              <CardDescription>Customizable</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Button Components */}
        <section id="components" className="demo-section">
          <h2 className="demo-title">Button Variants</h2>
          <p className="demo-description">
            Customizable button component with multiple variants and sizes.
          </p>
          <div className="demo-content">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="default">Default Size</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔥</Button>
            </div>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Button } from '@noxxagency/ui';

<Button variant="default">Default</Button>
<Button variant="outline" size="lg">Large Outline</Button>
<Button variant="destructive">Delete</Button>`}</code></pre>
          </div>
        </section>

        {/* Card Components */}
        <section className="demo-section">
          <h2 className="demo-title">Cards</h2>
          <p className="demo-description">
            Versatile card component for containing content with header, footer, and multiple sections.
          </p>
          <div className="demo-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>Basic card with header</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content area where you can place any content.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>With Footer</CardTitle>
                  <CardDescription>Card with actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here with a footer below.</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Style</CardTitle>
                  <CardDescription>Fully customizable</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge>New</Badge>
                  <p className="mt-2">Add your own className, style, or any HTML attributes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Card, CardHeader, CardTitle, CardContent } from '@noxxagency/ui';

<Card className="max-w-md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description here</CardDescription>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>`}</code></pre>
          </div>
        </section>

        {/* Alert Components */}
        <section className="demo-section">
          <h2 className="demo-title">Alerts</h2>
          <p className="demo-description">
            Display important messages with different variants.
          </p>
          <div className="demo-content space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert message for general information.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Alert, AlertTitle, AlertDescription } from '@noxxagency/ui';

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>An error occurred</AlertDescription>
</Alert>`}</code></pre>
          </div>
        </section>

        {/* Badge Components */}
        <section className="demo-section">
          <h2 className="demo-title">Badges</h2>
          <p className="demo-description">
            Small labels for status, categories, or counts.
          </p>
          <div className="demo-content">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-green-500">Custom</Badge>
            </div>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Badge } from '@noxxagency/ui';

<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Error</Badge>`}</code></pre>
          </div>
        </section>

        {/* Avatar Components */}
        <section className="demo-section">
          <h2 className="demo-title">Avatars</h2>
          <p className="demo-description">
            User profile images with fallback support.
          </p>
          <div className="demo-content">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Avatar, AvatarImage, AvatarFallback } from '@noxxagency/ui';

<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`}</code></pre>
          </div>
        </section>

        {/* Accordion Components */}
        <section className="demo-section">
          <h2 className="demo-title">Accordion</h2>
          <p className="demo-description">
            Collapsible content sections for organizing information.
          </p>
          <div className="demo-content">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is @noxxagency/ui?</AccordionTrigger>
                <AccordionContent>
                  A universal, reusable React component library built with TypeScript, 
                  Radix UI primitives, and Tailwind CSS. Perfect for Next.js applications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it fully customizable?</AccordionTrigger>
                <AccordionContent>
                  Yes! Every component accepts className, style, id, and all standard 
                  HTML attributes. You can customize appearance, behavior, and text.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Does it require translations?</AccordionTrigger>
                <AccordionContent>
                  No. All components receive pre-translated text as props, so you can 
                  use any i18n library you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@noxxagency/ui';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer here</AccordionContent>
  </AccordionItem>
</Accordion>`}</code></pre>
          </div>
        </section>

        {/* Tabs Components */}
        <section className="demo-section">
          <h2 className="demo-title">Tabs</h2>
          <p className="demo-description">
            Organize content into switchable views.
          </p>
          <div className="demo-content">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="space-y-4">
                <h3 className="text-lg font-semibold">Preview Content</h3>
                <p>This is the preview tab showing a live component demonstration.</p>
              </TabsContent>
              <TabsContent value="code">
                <pre className="bg-muted p-4 rounded"><code>{`<Component prop="value" />`}</code></pre>
              </TabsContent>
              <TabsContent value="settings">
                <p>Settings and configuration options would go here.</p>
              </TabsContent>
            </Tabs>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@noxxagency/ui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`}</code></pre>
          </div>
        </section>

        {/* Form Components */}
        <section id="forms" className="demo-section">
          <h2 className="demo-title">Form Components</h2>
          <p className="demo-description">
            Input fields, selects, checkboxes, switches, and more for building forms.
          </p>
          <div className="demo-content">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Sample Form</CardTitle>
                <CardDescription>Demonstrating various form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message..." rows={4} />
                </div>

                {/* Select */}
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={checkboxChecked}
                    onCheckedChange={(checked: boolean) => setCheckboxChecked(checked)}
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the terms and conditions
                  </Label>
                </div>

                {/* Switch */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable notifications</Label>
                  <Switch 
                    id="notifications"
                    checked={switchChecked}
                    onCheckedChange={setSwitchChecked}
                  />
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <Label>Volume: {sliderValue[0]}%</Label>
                  <Slider 
                    value={sliderValue} 
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <Label>Upload Progress</Label>
                  <Progress value={sliderValue[0]} />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Input, Label, Select, Checkbox, Switch, Slider } from '@noxxagency/ui';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="your@email.com" />
</div>

<div className="flex items-center space-x-2">
  <Checkbox id="agree" />
  <Label htmlFor="agree">I agree</Label>
</div>

<Switch checked={enabled} onCheckedChange={setEnabled} />`}</code></pre>
          </div>
        </section>

        {/* Table Component */}
        <section className="demo-section">
          <h2 className="demo-title">Table</h2>
          <p className="demo-description">
            Display tabular data with customizable styling.
          </p>
          <div className="demo-content">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Props</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Button</TableCell>
                  <TableCell>Interactive</TableCell>
                  <TableCell><Badge>Ready</Badge></TableCell>
                  <TableCell className="text-right">10+</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Card</TableCell>
                  <TableCell>Container</TableCell>
                  <TableCell><Badge>Ready</Badge></TableCell>
                  <TableCell className="text-right">8+</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Input</TableCell>
                  <TableCell>Form</TableCell>
                  <TableCell><Badge>Ready</Badge></TableCell>
                  <TableCell className="text-right">15+</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@noxxagency/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`}</code></pre>
          </div>
        </section>

        {/* Skeleton Loading */}
        <section className="demo-section">
          <h2 className="demo-title">Skeleton</h2>
          <p className="demo-description">
            Loading placeholders for content that's being fetched.
          </p>
          <div className="demo-content">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
          </div>
          <div className="demo-code">
            <pre><code>{`import { Skeleton } from '@noxxagency/ui';

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <Skeleton className="h-4 w-[250px]" />
</div>`}</code></pre>
          </div>
        </section>

        {/* Application Components */}
        <section id="application" className="demo-section">
          <h2 className="demo-title">Application Components</h2>
          <p className="demo-description">
            Pre-built components for common application patterns.
          </p>

          <div className="space-y-8">
            {/* Theme Switcher */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Switcher</CardTitle>
                <CardDescription>
                  Standalone theme toggle with light, dark, and system modes.
                  No external dependencies required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <ThemeSwitcher
                    lightLabel="Light Mode"
                    darkLabel="Dark Mode"
                    systemLabel="System"
                  />
                  <p className="text-sm text-muted-foreground">
                    Try switching themes! Works with controlled or uncontrolled state.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <pre className="text-xs w-full overflow-x-auto"><code>{`<ThemeSwitcher
  theme={currentTheme}
  onThemeChange={setTheme}
  lightLabel="Light"
  darkLabel="Dark"
/>`}</code></pre>
              </CardFooter>
            </Card>

            {/* Privacy Modal */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Modal</CardTitle>
                <CardDescription>
                  GDPR/cookie consent modal with full customization.
                  All text labels can be customized.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrivacyModal
                  title="Privacy & Cookies Demo"
                  description="This is a demo of the privacy modal component."
                  acceptAllText="Accept All Cookies"
                  acceptEssentialText="Essential Only"
                  onAcceptAll={() => console.log('Accepted all')}
                  onAcceptEssential={() => console.log('Essential only')}
                  autoShow={false}
                />
              </CardContent>
              <CardFooter>
                <pre className="text-xs w-full overflow-x-auto"><code>{`<PrivacyModal
  title="Privacy & Cookies"
  description="Custom message here"
  onAcceptAll={() => analytics.enable()}
  onAcceptEssential={() => analytics.disable()}
/>`}</code></pre>
              </CardFooter>
            </Card>

            {/* Note about other components */}
            <Card>
              <CardHeader>
                <CardTitle>More Components Available</CardTitle>
                <CardDescription>
                  Additional application components in the full package.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Navigation</strong> - Responsive navigation with mobile menu support</p>
                  <p><strong>ParticleBackground</strong> - Animated particle effects for backgrounds</p>
                  <p><strong>PricingSection</strong> - Complete pricing tables with features</p>
                  <p><strong>HeroSection</strong> - Pre-built hero sections</p>
                  <p><strong>And many more...</strong></p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  These components require additional dependencies that are included in the full package.
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Installation */}
        <section className="demo-section">
          <h2 className="demo-title">Installation</h2>
          <p className="demo-description">
            Get started with @noxxagency/ui in your Next.js project.
          </p>
          <div className="demo-content space-y-4">
            <div>
              <h3 className="font-semibold mb-2">From GitHub</h3>
              <pre><code>npm install git+https://github.com/artickc/ai-chatbot-agency-we.git#main:noxx-ui</code></pre>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Import Components</h3>
              <pre><code>{`import { Button, Card, Input } from '@noxxagency/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}`}</code></pre>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="demo-section">
          <h2 className="demo-title">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>✅ Universal & Reusable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Works in any React/Next.js app. No hardcoded text or translations.
                  All content is customizable via props.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>🎯 Fully Typed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete TypeScript support with exported type definitions.
                  Get IntelliSense in your IDE.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>🎨 Highly Customizable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every component accepts className, style, id, and all HTML attributes.
                  Fully compatible with Tailwind CSS.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>🚀 Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Zero TypeScript errors. Optimized builds (CJS + ESM).
                  Tree-shakeable modules with source maps.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">
            Built with ❤️ by NOXX Agency
          </p>
          <p className="text-sm">
            50+ Components · 100+ TypeScript Interfaces · Zero Build Errors
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
