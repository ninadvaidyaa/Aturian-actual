/// <reference types="vitest" />
import { checker } from 'vite-plugin-checker';
import  tsconfigPaths  from 'vite-tsconfig-paths';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    })],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'src/setupTests.ts',
      include: ['src/tests/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'istanbul'
      }
    },
})
