import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { CookieConsentService } from './services/CookieConsentService.ts'
import { AnalyticsService } from './services/AnalyticsService.ts'

import './assets/main.css'

/**
 * Par défaut, Analytics est refusé.
 *
 * Cela initialise seulement notre dataLayer local.
 * Le script Google Analytics n'est PAS chargé ici.
 */
AnalyticsService.setDefaultConsent()

const app = createApp(App)

app.use(router)

app.mount('#app')

/**
 * Attend que Vue Router ait terminé la navigation initiale.
 *
 * Si l'utilisateur avait accepté Analytics lors d'une
 * précédente visite, on peut alors réactiver Analytics.
 */
router.isReady().then(async () => {
  if (CookieConsentService.hasAnalyticsConsent()) {
    const enabled = await AnalyticsService.enable()

    if (enabled) {
      AnalyticsService.pageView(router.currentRoute.value)
    }
  } else {
    AnalyticsService.disable()
  }
})
