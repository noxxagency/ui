import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next-themes',
    'react-hook-form',
    'particles-bg',
    'noxx-chatbot',
    'framer-motion',
    '@/hooks/useTheme',
    '@/hooks/useTranslation',
    '@/hooks/use-mobile',
    '@/contexts/I18nContext',
    '../theme.js',
  ],
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
