import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@env': path.resolve(__dirname, 'src/config'),
      '@axios': path.resolve(__dirname, 'axios.js'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@shared': path.resolve(__dirname, 'src/components/shared'),
      '@assets': path.resolve(__dirname, 'src/assets'),

      // ** add more alias here along with in jsconfig.json file
    },
  },
  define: {
    process: process,
  },
});
