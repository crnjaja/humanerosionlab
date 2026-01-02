<template>
  <div class="app-shell">
    <SiteHeader />

    <main class="app-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-left">
          <div class="footer-brand">Le P’tit Dodu</div>
          <div class="footer-muted">© {{ new Date().getFullYear() }} — Tous droits réservés</div>
        </div>

        <nav class="footer-nav" aria-label="Liens">
          <a class="footer-link" href="#" @click.prevent>Imprint</a>
          <a class="footer-link" href="#" @click.prevent>Privacy Policy</a>
          <a class="footer-link" href="#" @click.prevent>Cookies & Consent</a>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>
