import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Load app-level env vars to node-level env vars.
  
  // You don't need to use `module.exports` in Vite with ES module syntax.
  return {
  
    build: {
      outDir: 'build', // Output directory for the build
      sourcemap: true,  // Enable sourcemaps for production builds
    },
  };
});