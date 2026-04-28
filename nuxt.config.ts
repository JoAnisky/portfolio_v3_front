// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],

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
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=DM+Sans:wght@400;500&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
  },
})
