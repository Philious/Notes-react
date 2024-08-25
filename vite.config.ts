import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import terser from '@rollup/plugin-terser';

export default defineConfig((config) => {
  console.log(config.mode);
  return {
    base: config.mode === 'development' ? './' : '/notes',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
    assetsInclude: ['**/*.jp2'],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '@/assets/styles/_scss_variables' as *;
          @use '@/assets/styles/_mixins.scss' as *;
        `
        }
      }
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        plugins: [terser({
          format: {
            comments: false,
          },

          mangle: {
            keep_classnames: false,
            reserved: [],
          },

        })],
      },
    }
  }
})
