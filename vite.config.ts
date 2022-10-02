import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Unocss from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      include: [/\.vue$/],
      reactivityTransform: true,
      template: {
        transformAssetUrls: {
          tags: {
            source: ['src', 'srcset'],
            img: ['src', 'srcset'],
          }
        }
      }
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/views',
      extensions: ['vue'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'src/locales/**')],
    }),

    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader({ defaultImport: 'component' }),
  ],

  optimizeDeps: { exclude: ['prettier'] },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/mixins/index.scss";',
        charset: false,
      },
    },
  },

  server: {
    hmr: {
      overlay: false
    }
  },
})
