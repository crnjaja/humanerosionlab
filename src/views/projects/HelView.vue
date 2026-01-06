<template>
  <div class="project-page">
    <!-- TOP HERO (COMPACT) -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <!-- SAME WORD ANIMATION AS HOMEPAGE -->
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            <span class="accent">Human Erosion</span> Lab
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

    <!-- CONTENT -->
    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset">
          <section class="feature-section" aria-label="HEL content">
            <h2 class="section-heading">Overview</h2>
            <p style="color: rgba(255, 255, 255, 0.86); line-height: 1.8">
              Contenu simple, cohérent avec la homepage.
            </p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useWordReveal } from '@/composables/useWordReveal'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})
</script>

<style scoped>
.project-layout {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr;
  gap: 16px;
  align-items: start;
}

.project-copy {
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
}

.project-facts {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  padding: 14px;
}

.facts-list {
  list-style: none;
  padding: 10px 0 0;
  margin: 0;
  display: grid;
  gap: 8px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
}

@media (max-width: 920px) {
  .project-layout {
    grid-template-columns: 1fr;
  }
}
/* PROJECT PAGE: flat/square banner (no V shape) + smaller height */
:deep(.stage--top--flat) {
  /* smaller hero */
  min-height: clamp(320px, 46vh, 520px);

  /* remove the “V space” padding at the bottom */
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px; /* was calc(64px + var(--v-h)) on homepage */
}

/* remove the V shape entirely */
:deep(.stage--top--flat::after) {
  content: none !important; /* easiest way to kill the pseudo element */
}

/* the homepage uses negative margin to tuck content into the V;
   on a flat banner it usually looks wrong, so reset it */
:deep(.project-page .hero-offset) {
  margin-top: 0;
}
</style>
