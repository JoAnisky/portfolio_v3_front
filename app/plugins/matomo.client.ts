// @ts-expect-error - vue-matomo ships no type declarations
import VueMatomo from 'vue-matomo'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()

  if (!config.public.matomoUrl || !config.public.matomoSiteId) {
    return
  }

  nuxtApp.vueApp.use(VueMatomo, {
    host: config.public.matomoUrl,
    siteId: Number(config.public.matomoSiteId),
    router,

    // Conforme à la politique de confidentialité : pas de cookie de tracking,
    // suivi exempté de consentement selon les recommandations de la CNIL
    disableCookies: true,
    requireConsent: false,

    enableLinkTracking: true,
    trackInitialView: true,
  })
})
