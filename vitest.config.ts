import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@components': r('./components'),
      '@common': r('./common'),
      '@root': r('./'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    // styles.cell === 'cell' in tests
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
