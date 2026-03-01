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
        <!-- ================== OBJECTIVES ONLY ================== -->
        <section class="project-section" aria-label="Objectives">
          <!-- Events / Publications style header -->
          <div class="section-head">
            <h2 class="section-heading">Overview</h2>
          </div>

          <div class="objectives-grid">
            <article class="feature-row revealed" aria-label="Objective 1">
              <div class="media-frame">
                <figure class="feature-media">
                  <img src="/images/backgrounds/rose.png" alt="Objective cover" loading="lazy" />
                </figure>
                <div class="feature-card">
                  <div>
                    <div class="pill">Objective</div>
                    <h3 class="feature-title">Evidence</h3>
                    <p class="feature-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua et dolore magna aliqua et dolore
                      magna aliqua et dolore magna aliqua.
                    </p>
                  </div>
                  <p class="feature-actions actions-right">
                    <a class="feature-link" href="#">Details →</a>
                  </p>
                </div>
              </div>
            </article>

            <article class="feature-row revealed" aria-label="Objective 2">
              <div class="media-frame">
                <figure class="feature-media">
                  <img
                    src="/images/backgrounds/bordeaux.png"
                    alt="Objective cover"
                    loading="lazy"
                  />
                </figure>
                <div class="feature-card">
                  <div>
                    <div class="pill">Objective</div>
                    <h3 class="feature-title">Accountability</h3>
                    <p class="feature-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua et dolore magna aliqua et dolore
                      magna aliqua et dolore magna aliqua.
                    </p>
                  </div>
                  <p class="feature-actions actions-right">
                    <a class="feature-link" href="#">Details →</a>
                  </p>
                </div>
              </div>
            </article>

            <article class="feature-row revealed" aria-label="Objective 3">
              <div class="media-frame">
                <figure class="feature-media">
                  <img src="/images/backgrounds/vert.png" alt="Objective cover" loading="lazy" />
                </figure>
                <div class="feature-card">
                  <div>
                    <div class="pill">Objective</div>
                    <h3 class="feature-title">Tools</h3>
                    <p class="feature-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua et dolore magna aliqua et dolore
                      magna aliqua et dolore magna aliqua.
                    </p>
                  </div>
                  <p class="feature-actions actions-right">
                    <a class="feature-link" href="#">Details →</a>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useWordReveal } from '@/composables/useWordReveal'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})
</script>

<style scoped>
/* Objectives section wrapper (matches Events / Publications) */
.project-section {
  padding: 0;
}

/* Objectives grid */
.objectives-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 980px) {
  .objectives-grid {
    grid-template-columns: 1fr;
  }
}

/* Banner tune */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}

:deep(.stage--top--flat::after) {
  content: none !important;
}
</style>
