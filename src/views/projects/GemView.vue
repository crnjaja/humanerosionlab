<template>
  <div class="project-page gem-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            PREVIOUS PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            <span class="accent">Gender Equality</span> in the Mirror
          </h1>

          <p class="hero-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="/contact">Any Questions?</RouterLink>
            <RouterLink class="btn btn--ghost" to="/">Back to Home</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset gem-hero-offset">
          <section class="feature-section">
            <h2 class="section-heading">Explore</h2>

            <!-- ✅ Single block menu + content (like HRJust) -->
            <GemPanel />
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useWordReveal } from '@/composables/useWordReveal'
import GemPanel from './components/gem/GemPanel.vue'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})
</script>

<style scoped>
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}

:deep(.stage--top--flat::after) {
  content: none !important;
}

:deep(.project-page .hero-offset) {
  margin-top: 0;
}
</style>
