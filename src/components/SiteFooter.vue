<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-left">
        <div class="footer-brand">Website in development</div>
        <div class="footer-muted">Some functionalities may be missing</div>
      </div>

      <nav class="footer-nav" aria-label="Liens">
        <!-- If you have routes, prefer RouterLink -->
        <RouterLink class="footer-link" to="/imprint">Terms of Use</RouterLink>
        <RouterLink class="footer-link" to="/privacy-policy">Privacy Policy</RouterLink>
        <RouterLink class="footer-link" to="/cookies-consent">Cookies &amp; Consent</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>
