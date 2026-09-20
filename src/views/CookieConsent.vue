<template>
  <Teleport to="body">
    <Transition name="cookie-consent">
      <section
        v-if="visible"
        class="cookie-consent"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div class="cookie-consent__accent" aria-hidden="true"></div>

        <div class="cookie-consent__content">
          <div class="cookie-consent__icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="9" cy="9" r="1" />
              <circle cx="15" cy="8" r="1" />
              <circle cx="15" cy="14" r="1" />
              <circle cx="9" cy="15" r="1" />
            </svg>
          </div>

          <div class="cookie-consent__text">
            <span class="cookie-consent__eyebrow"> Your privacy </span>

            <h2 id="cookie-consent-title">Cookies &amp; Analytics</h2>

            <p id="cookie-consent-description">
              We use essential storage to remember your privacy preferences. With your permission,
              we also use Google Analytics to understand how visitors use the website and to help us
              improve it.
            </p>
          </div>
        </div>

        <div class="cookie-consent__actions">
          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--secondary"
            @click="rejectOptional"
          >
            Reject optional
          </button>

          <RouterLink
            class="cookie-consent__button cookie-consent__button--secondary"
            to="/cookies-consent"
          >
            Manage
          </RouterLink>

          <button
            type="button"
            class="cookie-consent__button cookie-consent__button--primary"
            @click="acceptAnalytics"
          >
            Accept analytics
          </button>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

import { CookieConsentService } from '@/services/CookieConsentService'
import { AnalyticsService } from '@/services/AnalyticsService'

import '@/assets/components/cookie-consent.css'

const route = useRoute()

const visible = ref(false)

function refreshVisibility(): void {
  visible.value = !CookieConsentService.hasDecision()
}

async function acceptAnalytics(): Promise<void> {
  CookieConsentService.acceptAll()

  const enabled = await AnalyticsService.enable()

  if (enabled) {
    AnalyticsService.pageView(route)
  }

  visible.value = false
}

function rejectOptional(): void {
  CookieConsentService.rejectOptional()

  AnalyticsService.disable()

  visible.value = false
}

function handleConsentChange(): void {
  refreshVisibility()
}

onMounted(() => {
  refreshVisibility()

  window.addEventListener('cookie-consent-changed', handleConsentChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('cookie-consent-changed', handleConsentChange)
})
</script>
