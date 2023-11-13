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
      '@components': path.resolve(__dirname, './src/features/common/components'),
      '@constants': path.resolve(__dirname, './src/features/common/constants'),
      '@helpers': path.resolve(__dirname, './src/features/common/helpers'),
      '@data': path.resolve(__dirname, './src/features/common/data'),
      '@hooks': path.resolve(__dirname, './src/features/common/hooks'),
    },
  },
})
