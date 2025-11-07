// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-persist/es/integration/react'], // ✅ Prebundle persist ESM version
  },
  build: {
    rollupOptions: {
      external: [], // ✅ Avoid Rollup externalization errors
    },
  },
})

