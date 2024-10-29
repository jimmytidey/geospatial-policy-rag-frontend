import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load app-level env vars to node-level env vars.
  const env = loadEnv(mode, process.cwd());

  // You don't need to use `module.exports` in Vite with ES module syntax.
  return {
    plugins: [react()],
    build: {
      outDir: 'build', // Output directory for the build
      sourcemap: true,  // Enable sourcemaps for production builds
    },
  };
});