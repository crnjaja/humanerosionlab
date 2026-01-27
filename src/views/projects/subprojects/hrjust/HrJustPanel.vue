<template>
  <div class="hrjust-panel">
    <!-- LEFT NAV (pinned inside the panel) -->
    <aside class="hrjust-panel__menu" aria-label="Project navigation">
      <div class="hrjust-navhead">
        <div class="hrjust-navhead__kicker">Project</div>
        <div class="hrjust-navhead__title">HRJust</div>
        <div class="hrjust-navhead__rule" aria-hidden="true"></div>
      </div>

      <nav class="hrjust-nav">
        <section class="hrjust-nav__section">
          <div class="hrjust-nav__title">Details</div>

          <ul class="hrjust-nav__list">
            <!-- ✅ NEW: Overview (Tile launcher) -->
            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'overview' }"
                @click="setActive('overview')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'overview'">Overview</strong>
                    <span v-else>Overview</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Quick access to key sections</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'description' }"
                @click="setActive('description')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'description'">Description</strong>
                    <span v-else>Description</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Scope, method, outputs</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'glance' }"
                @click="setActive('glance')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <!-- ✅ RENAMED: Work Package 6 -> WP6 Snapshot -->
                    <strong v-if="active === 'glance'">Work Package 6</strong>
                    <span v-else>Work Package 6</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Quick snapshot + key facts</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'team' }"
                @click="setActive('team')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'team'">Team</strong>
                    <span v-else>Team</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">People, roles, partners</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

                        <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'events' }"
                @click="setActive('events')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'events'">Events</strong>
                    <span v-else>Events</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Organized, active participation</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

                        <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'publications' }"
                @click="setActive('publications')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'publications'">Publications</strong>
                    <span v-else>Publications</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Add subtitle</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>
          </ul>
        </section>

        <section class="hrjust-nav__section">
          <div class="hrjust-nav__title">Tools</div>

          <ul class="hrjust-nav__list">
            <li>
              <button
                type="button"
                class="hrjust-nav-tile hrjust-nav-tile--sub"
                :class="{ 'is-active': active === 'db' }"
                @click="setActive('db')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'db'">Case Law Database</strong>
                    <span v-else>Case Law Database</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Browse and query the dataset</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile hrjust-nav-tile--sub"
                :class="{ 'is-active': active === 'map' }"
                @click="setActive('map')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'map'">Interactive Map</strong>
                    <span v-else>Interactive Map</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Explore cases by country</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile hrjust-nav-tile--sub"
                :class="{ 'is-active': active === 'info' }"
                @click="setActive('info')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'info'">Infographics</strong>
                    <span v-else>Infographics</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Charts and key insights</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </aside>

    <!-- RIGHT CONTENT (scrolls inside the panel only) -->
    <section class="hrjust-panel__content" aria-live="polite">
      <!-- ✅ Overview is now the tile launcher and is selected by default -->
      <div v-if="active === 'overview'" class="hrjust-launch" aria-label="Quick access tiles">
        <template v-for="tile in launchTiles" :key="tile.id">
          <!-- ✅ External link tile (opens new tab) -->
          <a
            v-if="tile.isExternal"
            class="hrjust-launch-tile"
            :style="tile.bgStyle"
            :href="tile.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${tile.title} (opens in new tab)`"
          >
            <span class="hrjust-launch-tile__overlay" aria-hidden="true"></span>

            <span class="hrjust-launch-tile__ribbon">
              <span class="hrjust-launch-tile__title">
                {{ tile.title }}
                <span class="hrjust-launch-tile__ext" aria-hidden="true">
                  <!-- external link icon -->
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                    <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </span>
              </span>
            </span>
          </a>

          <!-- ✅ Internal tile (switches component) -->
          <button
            v-else
            type="button"
            class="hrjust-launch-tile"
            :style="tile.bgStyle"
            @click="setActive(tile.target)"
          >
            <span class="hrjust-launch-tile__overlay" aria-hidden="true"></span>

            <span class="hrjust-launch-tile__ribbon">
              <span class="hrjust-launch-tile__title">{{ tile.title }}</span>
            </span>
          </button>
        </template>
      </div>

      <KeepAlive v-else>
        <component :is="activeComponent" />
      </KeepAlive>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import HrJustAtGlance from './HrJustAtGlance.vue'
import HrJustDescription from './HrJustDescription.vue'
import HrJustTeam from './HrJustTeam.vue'
import HrJustToolDatabase from './HrJustToolDatabase.vue'
import HrJustToolMap from './HrJustToolMap.vue'
import HrJustToolInfographics from './HrJustToolInfographics.vue'
import HrJustPublications from './HrJustPublications.vue'

/**
 * Active tab key (controls right content + left nav highlight)
 * ✅ Default is "overview" so the tile launcher is shown on page load
 */
const active = ref('overview')

const componentMap = {
  glance: HrJustAtGlance,
  description: HrJustDescription,
  team: HrJustTeam,
  db: HrJustToolDatabase,
  map: HrJustToolMap,
  info: HrJustToolInfographics,
  publications: HrJustPublications,
}

/**
 * ✅ Overview is not a component; it renders the tile launcher.
 */
const activeComponent = computed(() => {
  if (!active.value || active.value === 'overview') return null
  return componentMap[active.value] ?? null
})

function setActive(key) {
  active.value = key
}

const tileImages = {
  wp6: '/images/tiles/wp6.jpg',
  description: '/images/tiles/description.jpg',
  team: '/images/tiles/team.jpg',
  events: '/images/tiles/events.png',
  database: '/images/tiles/db.jpg',
  map: '/images/tiles/map.jpg',
  infographics: '/images/tiles/infographics.jpg',
  observatory: '/images/tiles/observatory.jpg',
  publications: '/images/tiles/publications.jpg',
}

const launchTiles = computed(() => {
  const tiles = [
    { id: 't1', title: 'Description', target: 'description', img: tileImages.description },
    { id: 't2', title: 'Work Package 6', target: 'glance', img: tileImages.wp6 },

    // ✅ Observatory opens in new tab
    {
      id: 't3',
      title: 'Observatory',
      isExternal: true,
      href: 'https://hrjust-intersect-observatory.eu/',
      img: tileImages.observatory,
    },

    { id: 't4', title: 'Team', target: 'team', img: tileImages.team },
    { id: 't5', title: 'Publications', target: 'publications', img: tileImages.publications },
    { id: 't6', title: 'Events', target: 'events', img: tileImages.events },
    { id: 't7', title: 'Case Law Database', target: 'db', img: tileImages.database },
    { id: 't8', title: 'Interactive Map', target: 'map', img: tileImages.map },
    { id: 't9', title: 'Infographics', target: 'info', img: tileImages.infographics },
  ]

  return tiles.map((t) => ({
    ...t,
    bgStyle: t.img
      ? { backgroundImage: `url("${t.img}")` }
      : { backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,.35), rgba(0,0,0,.05))' },
  }))
})
</script>

<style scoped>
/* ===========================
   QUICK ACCESS TILE GRID
   (square corners, modern)
   =========================== */
.hrjust-launch {
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

/* Responsive: 2 columns on medium, 1 on small */
@media (max-width: 1100px) {
  .hrjust-launch {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 680px) {
  .hrjust-launch {
    grid-template-columns: 1fr;
  }
}

.hrjust-launch-tile {
  display: block;
  position: relative;
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  min-height: 170px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0; /* ✅ no rounded corners */
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}

.hrjust-launch-tile:hover {
  transform: translateY(-1px);
  border-color: rgba(0, 0, 0, 0.16);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

.hrjust-launch-tile:active {
  transform: translateY(0);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Darken slightly for readability */
.hrjust-launch-tile__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12));
}

/* Bottom ribbon like your screenshot (blue bar) */
.hrjust-launch-tile__ribbon {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 14px;
  background: color-mix(in srgb, var(--accentbis) 78%, transparent);
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  gap: 10px;
}

.hrjust-launch-tile__title {
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.2px;
  font-size: 16px;
  line-height: 1.15;
}

/* Keyboard focus */
.hrjust-launch-tile:focus-visible {
  outline: 3px solid rgba(0, 156, 210, 0.55);
  outline-offset: 2px;
}

/* Optional: keep launcher aligned nicely in your content panel */
.hrjust-panel__content {
  overflow: auto;
}

/* Make <a> tiles look exactly like buttons */
a.hrjust-launch-tile {
  text-decoration: none;
  color: inherit;
}

/* External link icon next to title */
.hrjust-launch-tile__ext {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: px;
  transform: translateY(1px);
  opacity: 0.95;
}

.hrjust-launch-tile__ext svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
