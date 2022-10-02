import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  // shortcuts: [
  //   ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  //   ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  // ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        display: 'PT Sans Caption',
        body: 'Open Sans'
      },
    }),
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary:'#8f7a66',
      secondary:'#bbada0',
      tertiary:'rgba(238, 228, 218, 0.35)',
      background: '#faf8ef',
      typography: {
        dark: '#776e65',
        light: '#f9f6f2',
      },
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ]
})