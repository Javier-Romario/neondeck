import { defineConfig } from 'vite';
import path from 'node:path';

const root = process.cwd();

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.join(root, 'components'),
      '@common': path.join(root, 'common'),
      '@root': root,
    },
  },
});
