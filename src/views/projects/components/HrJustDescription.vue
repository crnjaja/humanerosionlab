<template>
  <div class="hrjust-content">
    <header class="hrjust-content__head">
      <div class="hrjust-content__kicker">Scope</div>
      <h3 class="hrjust-content__title">Description</h3>
    </header>

    <p class="hrjust-paragraph">
      Lorem ipsum… replace with your real description (goals, methodology, outputs).
    </p>

    <div class="hrjust-grid">
      <article class="project-row">
        <figure class="project-media">
          <img src="/images/bordeaux.png" alt="HRJust highlight" loading="lazy" />
        </figure>

        <!-- Use static version inside panel -->
        <div class="project-card hrjust-card--static">
          <div>
            <h3 class="project-title">Key output #1</h3>
            <p class="project-text">Description courte dans le style homepage.</p>
          </div>
          <p class="project-actions actions-right">
            <a class="feature-link" href="#">Read more →</a>
          </p>
        </div>
      </article>

      <article class="project-row">
        <figure class="project-media">
          <img src="/images/background4.jpg" alt="HRJust highlight 2" loading="lazy" />
        </figure>

        <div class="project-card hrjust-card--static">
          <div>
            <h3 class="project-title">Key output #2</h3>
            <p class="project-text">Event, publication, dataset, brief…</p>
          </div>
          <p class="project-actions actions-right">
            <a class="feature-link" href="#">Read more →</a>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
/* Pure presentational component */
</script>
