<template>
  <div class="app-shell">
    <SiteHeader />

    <main class="app-main">
      <RouterView />
    </main>

    <SiteFooter />

    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import CookieConsent from './views/CookieConsent.vue'
</script>
