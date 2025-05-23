import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        menu: './menu.html',
        reserve: './reserve.html', 
        about: './about.html' 
      }
    }
  }
});