import * as path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@components': path.resolve(__dirname, './src/features/ui/components'),
      '@constants': path.resolve(__dirname, './src/features/ui/constants'),
      '@helpers': path.resolve(__dirname, './src/features/ui/helpers'),
      '@data': path.resolve(__dirname, './src/features/ui/data'),
      '@hooks': path.resolve(__dirname, './src/features/ui/hooks'),
    },
  },
})
