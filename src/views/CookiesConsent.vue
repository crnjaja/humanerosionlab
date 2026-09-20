<template>
  <div class="cookies-page">
    <!-- HERO -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--cookies">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            Privacy
          </div>

          <h1 ref="heroTitleEl" class="hero-title hero-title--words">
            COOKIES <span class="accent">&amp; consent</span>
          </h1>

          <p class="hero-subtitle">
            Manage your privacy preferences and control optional analytics on this website.
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="/privacy-policy"> Privacy Policy </RouterLink>

            <RouterLink class="btn btn--ghost" to="/"> Back to Home </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="content-block full-bleed">
      <div class="container">
        <div class="cookies-content">
          <!-- 01 ESSENTIAL -->
          <article class="cookies-card">
            <header class="cookies-card-head">
              <span class="cookies-card-number">01</span>

              <div class="cookies-card-title">
                <span class="cookies-card-label">Required</span>

                <h2>Essential storage</h2>
              </div>

              <span class="cookies-status">Always active</span>
            </header>

            <div class="cookies-card-body">
              <p>
                Essential browser storage is required to remember your privacy preferences and
                provide functionality necessary for this website.
              </p>

              <p>
                It cannot be disabled because the website needs to remember whether you accepted or
                rejected optional analytics.
              </p>
            </div>
          </article>

          <!-- 02 ANALYTICS -->
          <article class="cookies-card">
            <header class="cookies-card-head">
              <span class="cookies-card-number">02</span>

              <div class="cookies-card-title">
                <span class="cookies-card-label">Optional</span>

                <h2>Google Analytics</h2>
              </div>

              <label class="cookies-switch">
                <input
                  v-model="analyticsEnabled"
                  type="checkbox"
                  aria-label="Allow Google Analytics"
                />

                <span class="cookies-switch__slider" aria-hidden="true"></span>
              </label>
            </header>

            <div class="cookies-card-body">
              <p>
                With your permission, we use Google Analytics to understand how visitors interact
                with this website, including which pages are visited and how users navigate through
                the site.
              </p>

              <p>Google Analytics is only enabled when you choose to allow analytics.</p>
            </div>
          </article>

          <!-- 03 CONTROL -->
          <article class="cookies-card">
            <header class="cookies-card-head">
              <span class="cookies-card-number">03</span>

              <div class="cookies-card-title">
                <span class="cookies-card-label">Your control</span>

                <h2>Change or withdraw your consent</h2>
              </div>
            </header>

            <div class="cookies-card-body">
              <p>
                You can change your analytics preference at any time. Disabling analytics stops this
                website from sending new analytics events through our Google Analytics integration.
              </p>

              <p>
                Changing your preference does not remove information that may already have been
                processed while analytics was previously enabled.
              </p>
            </div>
          </article>

          <!-- ACTIONS -->
          <div class="cookies-actions">
            <button type="button" class="btn btn--primary" @click="savePreferences">
              Save preferences
            </button>
          </div>

          <!-- SAVED -->
          <Transition name="cookies-message">
            <div v-if="saved" class="cookies-saved" role="status">
              <span class="cookies-saved-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>

              <div>
                <strong>Preferences saved</strong>

                <span v-if="formattedUpdatedAt"> Updated {{ formattedUpdatedAt }} </span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { CookieConsentService } from '@/services/CookieConsentService'
import { AnalyticsService } from '@/services/AnalyticsService'
import { useWordReveal } from '@/composables/useWordReveal'

import '@/assets/pages/cookies-consent.css'

const route = useRoute()

/* ---------------------------------
 * WORD REVEAL
 * --------------------------------- */

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/* ---------------------------------
 * COOKIE CONSENT
 * --------------------------------- */

const analyticsEnabled = ref(false)
const saved = ref(false)
const updatedAt = ref(null)

let savedTimeout = null

const formattedUpdatedAt = computed(() => {
  if (!updatedAt.value) {
    return ''
  }

  const date = new Date(updatedAt.value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
})

function loadPreferences() {
  const consent = CookieConsentService.getConsent()

  analyticsEnabled.value = consent.decided === true && consent.analytics === true

  updatedAt.value = consent.updatedAt
}

function showSavedMessage() {
  saved.value = true

  if (savedTimeout !== null) {
    window.clearTimeout(savedTimeout)
  }

  savedTimeout = window.setTimeout(() => {
    saved.value = false
    savedTimeout = null
  }, 3000)
}

async function savePreferences() {
  const consent = CookieConsentService.updatePreferences({
    analytics: analyticsEnabled.value,
  })

  updatedAt.value = consent.updatedAt

  if (analyticsEnabled.value) {
    const enabled = await AnalyticsService.enable()

    if (enabled) {
      AnalyticsService.pageView(route)
    }
  } else {
    AnalyticsService.disable()
  }

  showSavedMessage()
}

function rejectAnalytics() {
  analyticsEnabled.value = false

  const consent = CookieConsentService.rejectOptional()

  updatedAt.value = consent.updatedAt

  AnalyticsService.disable()

  showSavedMessage()
}

function handleConsentChange() {
  loadPreferences()
}

/* ---------------------------------
 * LIFECYCLE
 * --------------------------------- */

onMounted(() => {
  loadPreferences()

  window.addEventListener('cookie-consent-changed', handleConsentChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('cookie-consent-changed', handleConsentChange)

  if (savedTimeout !== null) {
    window.clearTimeout(savedTimeout)
  }
})
</script>
