'use client';

import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// @ts-ignore - prism-react-renderer types
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from '../utils';

const COLOR_THEMES = {
  monokai: themes.vsDark,
  dracula: themes.dracula,
  github: themes.github,
  nightOwl: themes.nightOwl,
  oceanicNext: themes.oceanicNext,
} as const;

interface CodeViewerProps {
  code: string;
  language?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  theme?: keyof typeof COLOR_THEMES;
  noPadding?: boolean;
  className?: string;
}

export function CodeViewer({ 
  code, 
  language = 'tsx', 
  fileName, 
  showLineNumbers = true,
  theme = 'monokai',
  noPadding = false,
  className
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedTheme = COLOR_THEMES[theme];

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ backgroundColor: selectedTheme.plain.backgroundColor }}>
      {fileName && (
        <div 
          className="flex items-center justify-between px-6 py-3 border-b"
          style={{ 
            backgroundColor: theme === 'monokai' ? '#1e1e1e' : selectedTheme.plain.backgroundColor,
            borderColor: theme === 'monokai' ? '#2d2d2d' : 'rgba(255,255,255,0.1)'
          }}
        >
          <span className="text-sm font-mono tracking-wide" style={{ color: selectedTheme.plain.color }}>
            {fileName}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 hover:bg-white/10"
            style={{ color: selectedTheme.plain.color }}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      )}
      
      <div className="relative">
        {!fileName && (
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="absolute top-3 right-3 z-10 h-8 bg-black/30 hover:bg-black/50"
            style={{ color: selectedTheme.plain.color }}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        )}
        
        <Highlight theme={selectedTheme} code={code.trim()} language={language as any}>
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={cn("overflow-x-auto text-sm leading-[1.7]", !noPadding && "p-6", highlightClassName)} 
              style={style}
            >
              <code className="font-mono text-[13px]">
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="table-row">
                    {showLineNumbers && (
                      <span 
                        className="table-cell pr-6 text-right select-none w-[1%] opacity-40"
                        style={{ 
                          color: selectedTheme.plain.color,
                          minWidth: '3rem'
                        }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span className="table-cell">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

interface CodeTabsProps {
  examples: Array<{
    title: string;
    code: string;
    fileName?: string;
  }>;
  theme?: keyof typeof COLOR_THEMES;
}

export function CodeTabs({ examples, theme = 'monokai' }: CodeTabsProps) {
  return (
    <Tabs defaultValue={examples[0]?.title || 'example'} className="w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        {examples.map((example, index) => (
          <TabsTrigger
            key={index}
            value={example.title}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            {example.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((example, index) => (
        <TabsContent key={index} value={example.title} className="mt-4">
          <CodeViewer code={example.code} fileName={example.fileName} theme={theme} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
