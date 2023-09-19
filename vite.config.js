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
      "@axios": path.resolve(__dirname, 'axios.js'),
			"@api": path.resolve(__dirname, 'src/api'),
    },  
  },
  define: {
    'process': process
  }
});
