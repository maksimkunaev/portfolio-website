import path from 'path'
import headerTags from './constants/meta-tags'

export default defineNuxtConfig({
  ssr: false,

  router: {
    base: '/',
    trailingSlash: true
  },

  runtimeConfig: {
    public: {}
  },

  app: {
    head: {
      ...headerTags,
      script: [
        {
          defer: true,
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          'data-cf-beacon': '{"token": "42f5b12408294321acab228aa6dc4b12"}'
        }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          imports: [path.resolve(__dirname, 'assets/css/stylus-variables.styl')]
        }
      }
    }
  },

  css: [
    '@/assets/css/fonts.styl',
    '@/assets/css/reset.css',
    '@/assets/css/main.styl',
    '@/assets/css/css-variables.styl',
    '@/assets/css/ui.css'
  ],

  components: true,
  modules: [],
  extend(config) { }
})
