import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

function stripModuleType() {
  return {
    name: 'strip-module-type',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/<script\s+type="module"([^>]*)>/g, '<script$1>')
          .replace(/<script([^>]*)\stype="module"/g, '<script$1')
          .replace(/<script([^>]*)\scrossorigin([^>]*)>/g, '<script$1$2>')
      }
    }
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/dungeon-xunqi/' : '/',
  plugins: [
    vue(),
    viteSingleFile({
      removeViteModuleLoader: true,
      useRecommendedBuildConfig: true
    }),
    stripModuleType()
  ],
  build: {
    target: 'es2019',
    cssMinify: true,
    minify: true,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true
      }
    }
  }
}))
