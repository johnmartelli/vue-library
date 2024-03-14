import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: 'src/main.js', // Entry file for your library
      name: 'MyLibrary', // The global variable to expose
      fileName: (format) => `my-library.${format}.js`
    },
    /*rollupOptions: {
      output: {
        // For JS files
        entryFileNames: `assets/vue.js`,
        // For CSS files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return `assets/vue.css`;
          }
          // Fallback for other assets like images
          return `assets/[name].[ext]`;
        }
      }
    }*/
    rollupOptions: {
      // Ensure CSS is bundled into the library
      output: {
        assetFileNames: `my-library.[ext]`
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), // Example for NODE_ENV
    // Define additional environment variables if needed
  }
}
)
