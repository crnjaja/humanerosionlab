<template>
  <div class="hrjust-panel" :class="{ 'is-collapsed': isMenuCollapsed }">
    <!-- LEFT NAV -->
    <aside class="hrjust-panel__menu" aria-label="Project navigation">
      <div class="hrjust-navhead">
        <div class="hrjust-navhead__top">
          <div class="hrjust-navhead__meta">
            <div class="hrjust-navhead__kicker">Project</div>
            <div class="hrjust-navhead__title">HRJust</div>
          </div>

          <!-- Toggle -->
          <button
            type="button"
            class="hrjust-menu-toggle"
            :aria-expanded="String(!isMenuCollapsed)"
            :aria-label="isMenuCollapsed ? 'Expand navigation' : 'Collapse navigation'"
            title="Toggle menu"
            @click="toggleMenu"
          >
            <span class="hrjust-menu-toggle__icon" aria-hidden="true"></span>
          </button>
        </div>

        <div class="hrjust-navhead__rule" aria-hidden="true"></div>
      </div>

      <nav class="hrjust-nav">
        <section class="hrjust-nav__section">
          <div class="hrjust-nav__title">Details</div>

          <ul class="hrjust-nav__list">
            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'overview' }"
                :title="isMenuCollapsed ? 'Overview' : null"
                @click="setActive('overview')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l9 8h-3v10h-5v-6H11v6H6V11H3l9-8z" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Description' : null"
                @click="setActive('description')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 2h8l4 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 12h8M8 16h8M8 8h4" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Work Package 6' : null"
                @click="setActive('glance')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                  </svg>
                </span>

                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
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
                :title="isMenuCollapsed ? 'Team' : null"
                @click="setActive('team')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
                    <path d="M4 20a6 6 0 0 1 16 0" />
                    <path d="M17 14a3 3 0 0 1 3 3" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Events' : null"
                @click="setActive('events')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm14 8H3V8h18v2z"
                    />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Publications' : null"
                @click="setActive('publications')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h12a2 2 0 0 1 2 2v10" />
                    <path d="M4 6v12a2 2 0 0 0 2 2h12" />
                    <path d="M8 10h8M8 14h8" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Case Law Database' : null"
                @click="setActive('db')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2c5 0 9 1.8 9 4s-4 4-9 4-9-1.8-9-4 4-4 9-4z" />
                    <path d="M3 6v6c0 2.2 4 4 9 4s9-1.8 9-4V6" />
                    <path d="M3 12v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Interactive Map' : null"
                @click="setActive('map')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s6-5.33 6-10a6 6 0 1 0-12 0c0 4.67 6 10 6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                </span>

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
                :title="isMenuCollapsed ? 'Infographics' : null"
                @click="setActive('info')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>

                <span class="hrjust-nav-tile__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 19V5" />
                    <path d="M4 19h16" />
                    <path d="M7 14l3-3 4 4 5-6" />
                    <circle cx="7" cy="14" r="1" />
                    <circle cx="10" cy="11" r="1" />
                    <circle cx="14" cy="15" r="1" />
                    <circle cx="19" cy="9" r="1" />
                  </svg>
                </span>

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

    <!-- RIGHT CONTENT -->
    <section class="hrjust-panel__content" aria-live="polite">
      <!-- ✅ Overview cards with images (original) -->
      <div v-if="active === 'overview'" class="hrjust-launch" aria-label="Quick access tiles">
        <template v-for="tile in launchTiles" :key="tile.id">
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
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                    <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
                  </svg>
                </span>
              </span>
            </span>
          </a>

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
import { computed, ref, watch, onMounted } from 'vue'

import HrJustAtGlance from './HrJustAtGlance.vue'
import HrJustDescription from './HrJustDescription.vue'
import HrJustTeam from './HrJustTeam.vue'
import HrJustToolDatabase from './HrJustToolDatabase.vue'
import HrJustToolMap from './HrJustToolMap.vue'
import HrJustToolInfographics from './HrJustToolInfographics.vue'
import HrJustPublications from './HrJustPublications.vue'

const active = ref('overview')

// ✅ default: landing on overview => collapsed
const isMenuCollapsed = ref(true)

function toggleMenu() {
  isMenuCollapsed.value = !isMenuCollapsed.value
}

// ✅ central rule: overview => collapsed, anything else => expanded
function syncMenuWithActiveTab() {
  isMenuCollapsed.value = active.value === 'overview'
}

onMounted(() => {
  syncMenuWithActiveTab()
})

// ✅ whenever tab changes, enforce the rule
watch(active, () => {
  syncMenuWithActiveTab()
})

const componentMap = {
  glance: HrJustAtGlance,
  description: HrJustDescription,
  team: HrJustTeam,
  db: HrJustToolDatabase,
  map: HrJustToolMap,
  info: HrJustToolInfographics,
  publications: HrJustPublications,
}

const activeComponent = computed(() => {
  if (!active.value || active.value === 'overview') return null
  return componentMap[active.value] ?? null
})

function setActive(key) {
  active.value = key
  // watcher handles collapse/expand
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
/* =========================================================
   COLLAPSIBLE LAYOUT + ICON RAIL
   (does NOT break your existing hrjust.css theme)
   ========================================================= */

.hrjust-panel {
  display: grid;
  grid-template-columns: var(--hrjust-nav-w, 300px) minmax(0, 1fr);
  gap: 0;
}
.hrjust-panel.is-collapsed {
  grid-template-columns: 86px minmax(0, 1fr);
}

/* header row */
.hrjust-navhead__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

/* toggle button */
.hrjust-menu-toggle {
  width: 40px;
  height: 40px;
  border-radius: 0;
  border: 1px solid var(--hrjust-border, rgba(10, 34, 59, 0.12));
  background: #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.hrjust-menu-toggle__icon {
  width: 18px;
  height: 12px;
  position: relative;
  display: inline-block;
}
.hrjust-menu-toggle__icon::before,
.hrjust-menu-toggle__icon::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(0, 0, 0, 0.72);
}
.hrjust-menu-toggle__icon::before {
  top: 0;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.72);
}
.hrjust-menu-toggle__icon::after {
  bottom: 0;
}

:deep(.hrjust-nav-tile) {
  display: grid; /* keep safe */
}

.hrjust-nav-tile__icon {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(10, 34, 59, 0.1);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* ✅ 1) Par défaut: outline (pas de remplissage) */
.hrjust-nav-tile__icon svg {
  width: 18px;
  height: 18px;
  display: block;
  fill: none !important;
  stroke: rgba(11, 31, 51, 0.72);
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ✅ 2) Actif (collapsed ou non): change le stroke, pas le fill */
.hrjust-nav-tile.is-active .hrjust-nav-tile__icon svg {
  fill: none !important;
  stroke: rgba(174, 12, 54, 0.85);
}

/* collapsed mode hides text + chevron, centers icon perfectly */
.hrjust-panel.is-collapsed :deep(.hrjust-navhead__meta),
.hrjust-panel.is-collapsed :deep(.hrjust-nav__title),
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile__text),
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile__chev) {
  display: none;
}

.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile) {
  gap: 0;
  height: 56px;
  padding: 0;
  grid-template-columns: 1fr;
}
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile__mark) {
  justify-self: center;
  align-self: center;
  height: 36px;
  display: none;
}
.hrjust-panel.is-collapsed .hrjust-nav-tile__icon {
  justify-self: center;
  align-self: center;
}

/* collapsed: only icon gets active color */
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) {
  background: transparent !important;
  border-color: transparent !important;
}
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) .hrjust-nav-tile__icon {
  border-color: rgba(174, 12, 54, 0.28);
  background: var(--hrjust-active, rgba(174, 12, 54, 0.08));
}
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) .hrjust-nav-tile__icon svg {
  fill: none !important;
  stroke: rgba(174, 12, 54, 0.85);
}

/* =========================================================
   OVERVIEW CARDS — EXACTLY AS BEFORE + FIX GIANT SVG BUG
   ========================================================= */

.hrjust-launch {
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

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
  border-radius: 0;
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

.hrjust-launch-tile__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12));
}

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
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* ✅ fix: prevent global svg rules from blowing this up */
.hrjust-launch-tile__ext {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(1px);
  opacity: 0.95;
}
.hrjust-launch-tile__ext svg {
  width: 16px !important;
  height: 16px !important;
  min-width: 16px !important;
  min-height: 16px !important;
  display: block !important;
  fill: currentColor !important;
}

.hrjust-launch-tile:focus-visible {
  outline: 3px solid rgba(0, 156, 210, 0.55);
  outline-offset: 2px;
}

a.hrjust-launch-tile {
  text-decoration: none;
  color: inherit;
}

.hrjust-nav-tile.is-active svg {
  stroke: rgba(174, 12, 54, 0.9);
}
</style>
