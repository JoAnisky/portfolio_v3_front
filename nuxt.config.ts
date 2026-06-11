// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Outfit: [400, 600, 700],
      'DM Sans': [400, 500],
      'Cascadia Code': {
        ital: [400],
        wght: [400, 600],
      },
    },
    display: 'swap',
    download: true,
    inject: true,
    preload: true,
    subsets: ['latin'],
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: 'Jonathan Loré — Développeur web Fullstack freelance',
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
      },
    ],
  },

  sitemap: {
    sources: ['/api/sitemap-urls'],
  },

  runtimeConfig: {
    apiBaseUrl: '', // sera peuplé par NUXT_API_BASE_URL
    public: {
      apiBaseUrl: '',        // NUXT_PUBLIC_API_BASE_URL
      siteUrl: '',           // NUXT_PUBLIC_SITE_URL
      matomoUrl: '',         // NUXT_PUBLIC_MATOMO_URL
      matomoSiteId: '',      // NUXT_PUBLIC_MATOMO_SITE_ID
    },
  },

  vite: {
    server: {
      allowedHosts: [
        ...(process.env.NUXT_PUBLIC_SITE_URL
                ? [new URL(process.env.NUXT_PUBLIC_SITE_URL).hostname]
                : []
        ),
        process.env.DOMAIN || 'localhost',
        'localhost',
        '.local',
      ],
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'zod',
      ],
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Jonathan Loré',
      htmlAttrs: { lang: 'fr' },
      meta: [
        { name: 'description', content: 'Développeur web Fullstack freelance - Vue/Nuxt, Symfony, Laravel, DevOps.' },
        { name: 'theme-color', content: '#0a0e1a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  css: ['~/assets/scss/main.scss'],

  typescript: {
    strict: true,
  },
})