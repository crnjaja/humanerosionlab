<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-left">
        <div class="footer-brand">Website in development...</div>

        <div class="footer-muted">...some functionalities may be missing!</div>
      </div>

      <nav class="footer-nav" aria-label="Liens">
        <!-- DÉSACTIVÉ -->
        <RouterLink
          class="footer-link is-disabled"
          to="/imprint"
          aria-disabled="true"
          tabindex="-1"
          @click.prevent
        >
          Terms of Use
        </RouterLink>

        <!-- ACTIF -->
        <RouterLink class="footer-link" to="/privacy-policy"> Privacy Policy </RouterLink>

        <!-- DÉSACTIVÉ -->
        <RouterLink class="footer-link" to="/cookies-consent"> Cookies &amp; Consent </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
/*
 * LIENS TEMPORAIREMENT DÉSACTIVÉS
 *
 * Pour les réactiver :
 * retire "is-disabled",
 * "aria-disabled",
 * "tabindex"
 * et "@click.prevent".
 */
.is-disabled {
  opacity: 0.4;
  cursor: not-allowed !important;
  pointer-events: none;
}
</style>
