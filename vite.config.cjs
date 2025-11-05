const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  plugins: [
    react(),
  ],
  ssr: {
    noExternal: ['react-icons'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})