import react from '@vitejs/plugin-react';
// import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // alias: {
    //   '@/app': resolve(__dirname, './src/app'),
    //   '@/lib': resolve(__dirname, './src/lib'),
    //   '@/data': resolve(__dirname, './src/data'),
    //   '@/types': resolve(__dirname, './src/types'),
    // },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: './src/lib/test/vitest.setup.mjs',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
