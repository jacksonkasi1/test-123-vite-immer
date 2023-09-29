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
      '@env': path.resolve(__dirname, 'src/configs'),
      '@axios': path.resolve(__dirname, 'axios.js'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@shared': path.resolve(__dirname, 'src/components/shared'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@icons': path.resolve(__dirname, 'src/assets/Icons'),
      '@slice': path.resolve(__dirname, 'src/store/slice'),
      '@utils': path.resolve(__dirname, 'src/utils'),

      // ** add more alias here along with in jsconfig.json file
    },
  },
  define: {
    process: process,
  },
});
