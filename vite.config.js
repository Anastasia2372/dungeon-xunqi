import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/dungeon-xunqi/' : '/',
  plugins: [vue(), viteSingleFile()],
  build: {
    target: 'es2019',
    cssMinify: true,
    minify: true
  }
}))
