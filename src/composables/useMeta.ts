import { useHead } from "@vueuse/head"

export const useMeta = (params: {
  author?: string,
  title?: string,
  description?: string,
  keywords?: string[],
  image?: string,
  type?: string,
}) => {
  const author = params.author || 'Hextar'
  const title = params.title === '2048'
    ? params.title
    : `${params.title} - 2048`
  const description = params.description || 'gioca a 2048'
  const type = params.type || 'website'
  const keywords = [
    ...(params.keywords || []),
    ...[
      'game',
      '2048',
      'vuejs',
      'vue3',
      'vite',
      'frontend'
    ]
  ]
  const url = process.env.NODE_ENV === 'production' ? 'https://www.2048.com' : 'localhost:3000'
  const image = params.image || `${url}/images/social.jpg`

  useHead({
    title,
    base: { href: '/' },
    htmlAttrs: { lang: 'it' },
    meta: [
      // Description
      { name: 'description', content: 'Scopri i prossimi eventi LARP italiani' },

      // Keywords
      { property: 'keywords', content: keywords.join(' ')},

      // Locale alternative
      { property: 'og:locale:alternate', content: 'en', key: 'en' },

      // Author and copyright
      { name: 'author', content: author },
      { name: 'copyright', content: author },

      // OpenGraph data (Most widely used)
      { property: 'og:title', content: title },
      { property: 'og:site_name', content: title },
      // The list of types is available here: http://ogp.me/#types
      { property: 'og:type', content: type },
      // Should the the same as your canonical link, see below.
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      // Often the same as your meta description, but not always.
      { property: 'og:description', content: description },

      // Twitter card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: url },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      // {name: 'twitter:creator', content: '@alligatorio'},
      { name: 'twitter:image:src', content: image },

      // Google / Schema.org markup:
      { itemprop: 'name', content: title },
      { itemprop: 'description', content: description },
      { itemprop: 'image', content: image },
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'icon', type: 'ico', href: computed(() => '/favicon.ico') },
    ],
  })
}