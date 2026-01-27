<template>
  <div class="hrjust-content">
    <!-- Compact blocks (WHAT / WHY / HOW / WHEN + WHO + WPs) -->
    <div class="hrjust-compact">
      <!-- WHAT / WHY / HOW / WHEN (2x2) -->
      <section class="hrjust-wwhw-grid" aria-label="Project overview">
        <article class="hrjust-mini-card">
          <div class="mini-head">
            <div class="mini-icon"><i class="fas fa-scale-balanced"></i></div>
            <h4 class="mini-title">WHAT</h4>
          </div>
          <p class="mini-text">
            HRJust is a Research and Innovation Action (RIA) funded under the
            HORIZON-CL2-2022-DEMOCRACY-01 call - Reshaping Democracies. It aims to address critical
            gaps in human rights regulations and to develop a comprehensive theory of human rights
            justifications.
          </p>
        </article>

        <article class="hrjust-mini-card">
          <div class="mini-head">
            <div class="mini-icon"><i class="fas fa-users-gear"></i></div>
            <h4 class="mini-title">WHY</h4>
          </div>
          <p class="mini-text">
            Human rights regimes generally operate on the presumption that only individual persons
            can possess human rights. Regulatory gaps arise when States use human rights
            justifications for their actions. These gaps are twofold: they concern both the
            regulation of the States’ use of HRJ and the protection of individual human rights
            against such use by the States.
          </p>
        </article>

        <article class="hrjust-mini-card">
          <div class="mini-head">
            <div class="mini-icon"><i class="fas fa-diagram-project"></i></div>
            <h4 class="mini-title">HOW</h4>
          </div>
          <p class="mini-text">
            HRJust aims to develop both a theory of Human Rights Justifications and a process for
            Systematic Ongoing Civil Society Engagement as a tool for a gender and intersectional
            inclusive Civil Society engagement. HRJust also aims to identify gaps in human rights
            regulations and protection.
          </p>
        </article>

        <article class="hrjust-mini-card hrjust-mini-card--when">
          <div class="mini-head">
            <div class="mini-icon"><i class="fas fa-calendar-alt"></i></div>
            <h4 class="mini-title">WHEN</h4>
          </div>

          <div class="mini-when">
            <p class="mini-text mini-text--when">
              The project was launched in <strong>March 2023</strong> and is scheduled to run for a
              duration of <strong>36 months</strong>. Further information is available on the
              <a
                href="https://hrjust.wordpress.com/"
                target="_blank"
                rel="noopener"
                style="color: #8a0a2c; text-decoration: none; font-weight: 500"
                >project website</a
              >
              and the
              <a
                href="https://cordis.europa.eu/project/id/101094346"
                target="_blank"
                rel="noopener"
                style="color: #8a0a2c; text-decoration: none; font-weight: 500"
                >European Commission website</a
              >.
            </p>
          </div>
        </article>
      </section>

      <!-- Work Packages (same logic/hover highlight, compact row) -->
      <section class="hrjust-wps" id="workpackages" aria-label="Work packages">
        <div class="wps-head">
          <div class="wps-icon"><i class="fas fa-layer-group"></i></div>
          <div class="wps-title-wrap">
            <h4 class="wps-title">WORK PACKAGES</h4>
          </div>
        </div>

        <div class="wp-grid wp-grid--compact">
          <div class="wp-item" data-wp="wp1">
            <i class="fas fa-briefcase icon"></i>
            <h3>WP1</h3>
            <h5>Management</h5>
          </div>

          <div class="wp-item" data-wp="wp2">
            <i class="fas fa-bullhorn icon"></i>
            <h3>WP2</h3>
            <h5>Dissemination</h5>
          </div>

          <div class="wp-item" data-wp="wp3">
            <i class="fas fa-gear icon"></i>
            <h3>WP3</h3>
            <h5>Theory</h5>
          </div>

          <div class="wp-item" data-wp="wp4">
            <i class="fas fa-virus-covid icon"></i>
            <h3>WP4</h3>
            <h5>Covid</h5>
          </div>

          <div class="wp-item" data-wp="wp5">
            <i class="fas fa-earth-africa icon"></i>
            <h3>WP5</h3>
            <h5>Migration</h5>
          </div>

          <div class="wp-item wp-highlight" data-wp="wp6">
            <i class="fas fa-leaf icon"></i>
            <h3>WP6</h3>
            <h5>Climate</h5>
          </div>

          <div class="wp-item" data-wp="wp7">
            <i class="fas fa-scissors icon"></i>
            <h3>WP7</h3>
            <h5>Empirical</h5>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * Pure presentational component:
 * - keeps the original hover interactions (WP hover highlight)
 * - adapts layout to a smaller, compact “WWWH” + “WHO” + “WPs” format
 * - removes the animated progress bar in WHEN
 */
import { onMounted } from 'vue'

onMounted(() => {
  // ---- WP hover -> highlight linked text (same behavior) ----
  const wpCards = document.querySelectorAll('.wp-item[data-wp]')

  wpCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const wp = card.getAttribute('data-wp')
      if (!wp) return

      const target = document.getElementById(`target-${wp}`)
      if (!target) return

      document.querySelectorAll('.wp-target').forEach((el) => el.classList.remove('connected'))
      target.classList.add('connected')
    })

    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.wp-target').forEach((el) => el.classList.remove('connected'))
    })
  })
})
</script>

<style scoped>
/* Use the same values as the team cards */
.hrjust-content {
  --accent: var(--hrjust-accent-3, #002d47);
  --accent-top-a: rgba(0, 45, 71, 0.16);
  --accent-top-b: rgba(0, 45, 71, 0.06);

  --card: #ffffff;
  --border-soft: rgba(10, 34, 59, 0.08);
  --border: rgba(10, 34, 59, 0.12);
  --shadow: 0 1px 0 rgba(10, 34, 59, 0.04), 0 10px 22px rgba(10, 34, 59, 0.06);
  --shadow-hover: 0 2px 0 rgba(10, 34, 59, 0.05), 0 16px 34px rgba(10, 34, 59, 0.1);
}

/* -------------------------------------------------------------------------- */
/* Compact adaptation (keeps your existing “modern card” feeling)              */
/* -------------------------------------------------------------------------- */

.hrjust-compact {
  display: grid;
  gap: 22px;
}

/* 2x2 grid for WHAT/WHY/HOW/WHEN */
.hrjust-wwhw-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

/* Mini cards: square corners, same hover lift/shadow behavior */
.hrjust-mini-card {
  background: var(--card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
  padding: 18px;
  text-align: left;
  position: relative;
  min-height: 170px;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

/* remove the old 3px bar */
.hrjust-mini-card::before {
  content: none;
}

/* NEW: top colored block (same style as member cards) */
.hrjust-mini-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(90deg, var(--accent-top-a), var(--accent-top-b));
  border-bottom: 1px solid var(--border-soft);
  pointer-events: none;
}

.hrjust-mini-card:hover {
  transform: translateY(-2px);
  border-color: var(--border);
  box-shadow: var(--shadow-hover);
}

.mini-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid #e6e6e6;
}

.mini-icon i {
  font-size: 18px;
  color: #002d47;
}

.mini-text {
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.55;
  margin-top: 6px;
}

.mini-head {
  display: flex;
  gap: 12px;
  align-items: flex-start; /* key: top aligned like WHO/WPs */
  position: relative;
  z-index: 1;
  margin-top: 2px; /* keep your header offset */
}

/* Remove any centering line-height and align title a touch down */
.mini-title {
  margin: 0;
  line-height: 1.1; /* IMPORTANT: do NOT use 38px */
  padding-top: 4px;
}

/* WHEN card layout */
.hrjust-mini-card--when {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* center the “mini-when” block inside the remaining space */
.hrjust-mini-card--when .mini-when {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 6px;
}

.mini-when {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  align-items: start;
  margin-top: 6px;
}

.mini-text--when {
  margin: 0;
}

/* WHO block (compact header + logos grid) */
.hrjust-who {
  background: #f2f7fa;
  border: 1px solid #ddd;
  padding: 18px;
  position: relative;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;
}

.hrjust-who::before {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #002d47;
  position: absolute;
  top: 0;
  left: 0;
}

.hrjust-who:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.who-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.who-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid #e6e6e6;
}

.who-icon i {
  font-size: 18px;
  color: #002d47;
}

.who-title {
  margin: 0;
  color: #002d47;
}

.who-subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #555;
}

.logos-grid--compact {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 10px 0 0 0;
}

/* Logo tile: slightly taller to host the name comfortably */
.logo-item {
  background: #ffffff;
  border: 1px solid #eee;
  min-height: 106px;
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  padding: 10px 12px 12px 12px;
  gap: 8px;
}

.logo-item img {
  max-width: 100%;
  max-height: 58px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 0;
  display: block;
}

/* Name under each logo (integrated, modern, subtle) */
.logo-name {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  line-height: 1.25;
  color: #002d47;
  font-weight: 600;
  opacity: 0.9;
  padding-top: 6px;
  border-top: 1px solid #f0f0f0;
}

.logos-grid--compact img {
  border-radius: 0;
}

/* WPs (compact) */
.hrjust-wps {
  background: #f2f7fa;
  border: 1px solid #ddd;
  padding: 18px;
  position: relative;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;
}

.hrjust-wps::before {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #002d47;
  position: absolute;
  top: 0;
  left: 0;
}

.hrjust-wps:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.wps-head {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 12px;
}

.wps-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid #e6e6e6;
}

.wps-icon i {
  font-size: 18px;
  color: #002d47;
}

.wps-title {
  margin: 0;
  color: #002d47;
}

.wps-subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #555;
}

.wp-grid--compact {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 12px;
}

.wp-item {
  background-color: #ffffff;
  padding: 12px 10px;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  text-align: center;
  border: 1px solid #eee;
}

.wp-item:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.wp-item .icon {
  font-size: 1.6rem;
  color: #002d47;
  margin-bottom: 6px;
}

.wp-item h3 {
  margin: 0;
  font-size: 14px;
  color: #002d47;
}

.wp-item h5 {
  margin: 2px 0 0 0;
  font-size: 11px;
  font-weight: 600;
  color: #002d47;
}

.wp-highlight {
  animation: bounceScale 1.6s ease-in-out infinite;
}

.wp-highlight .icon,
.wp-highlight h3,
.wp-highlight h5 {
  color: #8a0a2c;
}

.wp-link {
  text-decoration: none;
  position: relative;
  color: inherit;
  display: block;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.wp-link:hover .wp-cta {
  opacity: 1;
  transform: translateY(0);
}

.wp-cta {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #8a0a2c;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.wp-target.connected {
  background-color: #fce8ec;
  color: #8a0a2c;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #8a0a2c;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  padding: 2px 6px;
  border-radius: 0;
  display: inline-block;
  transition: all 0.3s ease;
}

.wp-summary-card--compact {
  margin-top: 14px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: justify;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #eee;
}

.wp-summary-card--compact:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

@keyframes bounceScale {
  0%,
  100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.12);
  }
}

/* shared text alignment */
.mini-text,
.who-subtitle,
.wps-subtitle,
.wp-summary-card--compact p {
  text-align: justify;
}

/* Responsive */
@media (max-width: 1100px) {
  .logos-grid--compact {
    grid-template-columns: repeat(4, 1fr);
  }

  .wp-grid--compact {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .hrjust-wwhw-grid {
    grid-template-columns: 1fr;
  }

  .logos-grid--compact {
    grid-template-columns: repeat(3, 1fr);
  }

  .wp-grid--compact {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mini-when {
    grid-template-columns: 1fr;
  }
}

.hrjust-who,
.hrjust-wps {
  background: var(--card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
  padding: 18px;
  position: relative;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

/* remove the old 3px bar */
.hrjust-who::before,
.hrjust-wps::before {
  content: none;
}

/* NEW: top colored block */
.hrjust-who::after,
.hrjust-wps::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  background: linear-gradient(90deg, var(--accent-top-a), var(--accent-top-b));
  border-bottom: 1px solid var(--border-soft);
  pointer-events: none;
}

.hrjust-who:hover,
.hrjust-wps:hover {
  transform: translateY(-2px);
  border-color: var(--border);
  box-shadow: var(--shadow-hover);
}

/* ensure the header content is above the ::after */
.who-head,
.wps-head {
  position: relative;
  z-index: 1;
  margin-top: 8px;
}
</style>
