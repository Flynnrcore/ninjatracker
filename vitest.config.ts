import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      exclude: [
        '**/index.ts',
        '**/eslint.config.js',
        '**/vite.config.ts',
        '**/vitest.config.ts',
        '**/NinjaTracker/dist/assets/',
        '**/dist/assets/',
        '**/main.tsx',
        '**/App.tsx',
        '**/.github/**',
        '**/coverage/**',
        '**/.vercel/**',
        '**/vercel/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
