<template>
  <div class="project-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            PREVIOUS PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            GEM <span class="accent">Gender Equality in the Mirror</span>
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
        <div class="hero-offset">
          <section class="feature-section">
            <h2 class="section-heading">Overview</h2>

            <div class="project-layout">
              <article class="project-copy">
                <p>Présentation GEM…</p>
                <p>Ajoute: objectifs, livrables, calendrier, partenaires.</p>
              </article>

              <aside class="project-facts">
                <div class="pill">Project Facts</div>
                <ul class="facts-list">
                  <li><strong>Focus:</strong> …</li>
                  <li><strong>Status:</strong> …</li>
                  <li><strong>Lead:</strong> …</li>
                  <li><strong>Links:</strong> …</li>
                </ul>
              </aside>
            </div>

            <h2 class="section-heading" style="margin-top: 26px">Highlights</h2>

            <div class="projects-grid">
              <article class="project-row">
                <figure class="project-media">
                  <img src="/images/rose.png" alt="GEM highlight" loading="lazy" />
                </figure>
                <div class="project-card">
                  <div>
                    <h3 class="project-title">Key output #1</h3>
                    <p class="project-text">Description courte, style homepage.</p>
                  </div>
                  <p class="project-actions actions-right">
                    <a class="feature-link" href="#">Read more →</a>
                  </p>
                </div>
              </article>

              <article class="project-row">
                <figure class="project-media">
                  <img src="/images/background4.jpg" alt="GEM highlight 2" loading="lazy" />
                </figure>
                <div class="project-card">
                  <div>
                    <h3 class="project-title">Key output #2</h3>
                    <p class="project-text">Publication / event / brief…</p>
                  </div>
                  <p class="project-actions actions-right">
                    <a class="feature-link" href="#">Read more →</a>
                  </p>
                </div>
              </article>
            </div>
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
