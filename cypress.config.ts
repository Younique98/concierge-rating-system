import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('before:run', () => {
        console.log('Starting Next.js server...');
      });
    },
  },
});
