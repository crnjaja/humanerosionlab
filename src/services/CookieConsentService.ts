export interface CookieConsent {
  version: number
  necessary: true
  analytics: boolean
  decided: boolean
  updatedAt: string | null
}

interface CookiePreferences {
  analytics: boolean
}

const STORAGE_KEY = 'hel_cookie_consent'
const CONSENT_VERSION = 1

const DEFAULT_CONSENT: CookieConsent = {
  version: CONSENT_VERSION,
  necessary: true,
  analytics: false,
  decided: false,
  updatedAt: null,
}

export class CookieConsentService {
  static getConsent(): CookieConsent {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        return { ...DEFAULT_CONSENT }
      }

      const parsed = JSON.parse(raw) as Partial<CookieConsent>

      if (parsed.version !== CONSENT_VERSION) {
        return { ...DEFAULT_CONSENT }
      }

      return {
        ...DEFAULT_CONSENT,
        ...parsed,
        version: CONSENT_VERSION,
        necessary: true,
      }
    } catch (error) {
      console.warn('Unable to read cookie consent:', error)

      return { ...DEFAULT_CONSENT }
    }
  }

  static saveConsent(preferences: CookiePreferences): CookieConsent {
    const consent: CookieConsent = {
      version: CONSENT_VERSION,
      necessary: true,
      analytics: Boolean(preferences.analytics),
      decided: true,
      updatedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    } catch (error) {
      console.warn('Unable to save cookie consent:', error)
    }

    window.dispatchEvent(
      new CustomEvent<CookieConsent>('cookie-consent-changed', {
        detail: consent,
      }),
    )

    return consent
  }

  static acceptAll(): CookieConsent {
    return this.saveConsent({
      analytics: true,
    })
  }

  static rejectOptional(): CookieConsent {
    return this.saveConsent({
      analytics: false,
    })
  }

  static updatePreferences(preferences: CookiePreferences): CookieConsent {
    return this.saveConsent(preferences)
  }

  static hasDecision(): boolean {
    return this.getConsent().decided === true
  }

  static hasAnalyticsConsent(): boolean {
    const consent = this.getConsent()

    return consent.decided === true && consent.analytics === true
  }

  static resetConsent(): CookieConsent {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Unable to reset cookie consent:', error)
    }

    const consent: CookieConsent = {
      ...DEFAULT_CONSENT,
    }

    window.dispatchEvent(
      new CustomEvent<CookieConsent>('cookie-consent-changed', {
        detail: consent,
      }),
    )

    return consent
  }
}
