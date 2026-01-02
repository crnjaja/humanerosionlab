<template>
  <header class="site-header" :class="{ 'site-header--solid': isSolid }">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">
        <img class="brand-logo" src="/files/logo.png" alt="Logo" />
        <span class="brand-text">
          <span class="brand-name">Le P’tit Dodu</span>
          <span class="brand-tag">Site personnel</span>
        </span>
      </RouterLink>

      <nav class="top-nav" aria-label="Navigation principale">
        <RouterLink class="top-nav-link" to="/">About</RouterLink>
        <RouterLink class="top-nav-link" to="/le-bon">Monitor</RouterLink>
        <RouterLink class="top-nav-link" to="/contact">Contact</RouterLink>

        <a class="social-pill" href="#" aria-label="Twitter" @click.prevent>✕</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const isSolid = ref(false)

const onScroll = () => {
  isSolid.value = window.scrollY > 16
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
