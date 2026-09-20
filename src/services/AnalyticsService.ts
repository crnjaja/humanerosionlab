import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { CookieConsentService } from './CookieConsentService'

type DataLayerItem = IArguments | Record<string, unknown>

declare global {
  interface Window {
    dataLayer: DataLayerItem[]
    gtag: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean
  }
}

export class AnalyticsService {
  static measurementId = 'G-3WCHDTS91N'

  static initialized = false

  static scriptLoading: Promise<void> | null = null

  /**
   * Initialise dataLayer et gtag en suivant le fonctionnement
   * du snippet officiel Google.
   */
  static initializeDataLayer(): void {
    window.dataLayer = window.dataLayer || []

    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        window.dataLayer.push(arguments)
      }
    }
  }

  /**
   * Consentement par défaut.
   *
   * À appeler le plus tôt possible au démarrage de l'application,
   * avant l'initialisation de Google Analytics.
   */
  static setDefaultConsent(): void {
    this.initializeDataLayer()

    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }

  /**
   * Met à jour le Consent Mode Google.
   */
  static updateConsent(granted: boolean): void {
    this.initializeDataLayer()

    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }

  /**
   * Charge gtag.js une seule fois.
   */
  static loadScript(): Promise<void> {
    if (this.scriptLoading) {
      return this.scriptLoading
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-ga-measurement-id="${this.measurementId}"]`,
    )

    if (existingScript) {
      return Promise.resolve()
    }

    this.scriptLoading = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')

      script.async = true

      script.src =
        'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(this.measurementId)

      script.dataset.gaMeasurementId = this.measurementId

      script.onload = () => {
        resolve()
      }

      script.onerror = () => {
        this.scriptLoading = null

        reject(new Error('Unable to load Google Analytics.'))
      }

      document.head.appendChild(script)
    })

    return this.scriptLoading
  }

  /**
   * Active Google Analytics lorsque le consentement Analytics
   * a été donné.
   */
  static async enable(): Promise<boolean> {
    if (!CookieConsentService.hasAnalyticsConsent()) {
      return false
    }

    this.initializeDataLayer()

    // S'assurer que GA n'est pas désactivé.
    window[`ga-disable-${this.measurementId}`] = false

    // Informer Google que le consentement Analytics est accordé.
    this.updateConsent(true)

    try {
      if (!this.initialized) {
        /*
         * Important :
         * on place la commande "js" dans dataLayer AVANT
         * le chargement de gtag.js.
         */
        window.gtag('js', new Date())

        await this.loadScript()

        /*
         * On désactive le page_view automatique car Vue Router
         * enverra les page_view manuellement.
         */
        window.gtag('config', this.measurementId, {
          send_page_view: false,
        })

        this.initialized = true
      } else {
        await this.loadScript()
      }

      return true
    } catch (error) {
      console.error('Google Analytics initialization failed:', error)

      return false
    }
  }

  /**
   * Désactive Google Analytics.
   */
  static disable(): void {
    this.initializeDataLayer()

    this.updateConsent(false)

    window[`ga-disable-${this.measurementId}`] = true

    this.removeGoogleAnalyticsCookies()
  }

  /**
   * Applique le choix actuellement enregistré.
   */
  static async applyConsent(): Promise<boolean> {
    if (CookieConsentService.hasAnalyticsConsent()) {
      return this.enable()
    }

    this.disable()

    return false
  }

  /**
   * Envoie manuellement une vue de page.
   *
   * À utiliser avec Vue Router.
   */
  static pageView(route?: RouteLocationNormalizedLoaded): void {
    if (!this.initialized) {
      return
    }

    if (!CookieConsentService.hasAnalyticsConsent()) {
      return
    }

    const path =
      route?.fullPath || window.location.pathname + window.location.search + window.location.hash

    const pageLocation = new URL(path, window.location.origin).href

    window.gtag('event', 'page_view', {
      send_to: this.measurementId,
      page_title: document.title,
      page_location: pageLocation,
      page_path: path,
    })
  }

  /**
   * Envoie un événement GA4 personnalisé.
   */
  static event(eventName: string, parameters: Record<string, unknown> = {}): void {
    if (!this.initialized) {
      return
    }

    if (!CookieConsentService.hasAnalyticsConsent()) {
      return
    }

    window.gtag('event', eventName, {
      ...parameters,
      send_to: this.measurementId,
    })
  }

  /**
   * Supprime les cookies Google Analytics accessibles
   * depuis le domaine courant.
   */
  static removeGoogleAnalyticsCookies(): void {
    const cookieNames = document.cookie
      .split(';')
      .map((cookie) => cookie.trim().split('=')[0] ?? '')
      .filter(
        (name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat',
      )

    const hostname = window.location.hostname

    const domains = new Set<string>(['', hostname, `.${hostname}`])

    if (hostname.startsWith('www.')) {
      const rootDomain = hostname.substring(4)

      domains.add(rootDomain)
      domains.add(`.${rootDomain}`)
    }

    cookieNames.forEach((name) => {
      domains.forEach((domain) => {
        const domainPart = domain ? `; domain=${domain}` : ''

        document.cookie =
          `${name}=; ` +
          `expires=Thu, 01 Jan 1970 00:00:00 GMT; ` +
          `path=/${domainPart}; ` +
          `SameSite=Lax`
      })
    })
  }
}
