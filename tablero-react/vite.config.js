import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  css: { preprocessorOptions: { scss: { loadPaths: [fileURLToPath(new URL('./node_modules', import.meta.url))], silenceDeprecations: ['import', 'global-builtin', 'color-functions'] } } },
});
