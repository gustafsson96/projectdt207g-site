import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        add: './menu.html',
        about: './about.html' 
      }
    }
  }
});