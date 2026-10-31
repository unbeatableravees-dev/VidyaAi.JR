import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react') || id.includes('canvas-confetti')) {
              return 'vendor-ui';
            }
            return 'vendor-libs';
          }
          if (id.includes('src/data/islamicTeachingsData') || id.includes('src/data/islamicExamQuestions')) {
            return 'data-islamic';
          }
          if (id.includes('src/data/hindiData')) {
            return 'data-hindi';
          }
          if (id.includes('src/data/punjabiData')) {
            return 'data-punjabi';
          }
          if (id.includes('src/data/humanBodyData')) {
            return 'data-body';
          }
        },
      },
    },
  },
});
