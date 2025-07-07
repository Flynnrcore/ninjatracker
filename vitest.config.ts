import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setupTests.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
    sequence: {
      concurrent: false,
    },
    coverage: {
      reporter: ['text', 'lcov'],
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
        '**/tests/**',
        '**/vite-env.d.ts'
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
