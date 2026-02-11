<template>
  <div class="hrjust-panel" :class="{ 'is-collapsed': isMenuCollapsed }">
    <!-- LEFT NAV -->
    <aside class="hrjust-panel__menu" aria-label="Project navigation">
      <div class="hrjust-navhead">
        <div class="hrjust-navhead__top">
          <div class="hrjust-navhead__meta">
            <div class="hrjust-navhead__kicker">Project</div>
            <div class="hrjust-navhead__title">GEM</div>
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
            <!-- Overview -->
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

            <!-- Description -->
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
                    <path
                      d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5"
                    />
                    <path d="M7 13h10M7 17h10M7 9h6" />
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

            <!-- At a Glance -->
            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'glance' }"
                :title="isMenuCollapsed ? 'At a Glance' : null"
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
                    <strong v-if="active === 'glance'">At a Glance</strong>
                    <span v-else>At a Glance</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Quick snapshot + key facts</span>
                </span>

                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <!-- Team -->
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
                    <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm-14 11a7 7 0 0 1 20 0H2z" />
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

            <!-- Publications -->
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
                    <path d="M4 3h12a3 3 0 0 1 3 3v15a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V3z" />
                    <path d="M6 5h10M6 8h10M6 11h10" />
                  </svg>
                </span>

                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'publications'">Publications</strong>
                    <span v-else>Publications</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Reports, outputs, articles</span>
                </span>

                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <!-- Events -->
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
                  <span class="hrjust-nav-tile__desc">Activities and participation</span>
                </span>

                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>
          </ul>
        </section>

        <section class="hrjust-nav__section">
          <div class="hrjust-nav__title">Tools</div>

          <ul class="hrjust-nav__list">
            <!-- Map -->
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
                    <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" />
                    <path d="M9 3v15M15 6v15" />
                  </svg>
                </span>

                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'map'">Interactive Map</strong>
                    <span v-else>Interactive Map</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Indicators and metrics</span>
                </span>

                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <!-- Infographics -->
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
                    <path d="M4 19V5h2v14H4zm7 0V9h2v10h-2zm7 0V3h2v16h-2z" />
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

import GemAtGlance from './GemAtGlance.vue'
import GemDescription from './GemDescription.vue'
import GemTeam from './GemTeam.vue'
import GemPublications from './GemPublications.vue'
import GemEvents from './GemEvents.vue'
import GemToolMap from './GemToolMap.vue'
import GemToolInfographics from './GemToolInfographics.vue'

const active = ref('overview')

const isMenuCollapsed = ref(true)

function toggleMenu() {
  isMenuCollapsed.value = !isMenuCollapsed.value
}

function syncMenuWithActiveTab() {
  isMenuCollapsed.value = active.value === 'overview'
}

onMounted(() => {
  syncMenuWithActiveTab()
})

watch(active, () => {
  syncMenuWithActiveTab()
})

const componentMap = {
  glance: GemAtGlance,
  description: GemDescription,
  team: GemTeam,
  publications: GemPublications,
  events: GemEvents,
  map: GemToolMap,
  info: GemToolInfographics,
}

const activeComponent = computed(() => {
  if (!active.value || active.value === 'overview') return null
  return componentMap[active.value] ?? null
})

function setActive(key) {
  active.value = key
}

const tileImages = {
  description: '/images/tiles/GemDescription.png',
  glance: '/images/tiles/xx.jpg',
  team: '/images/tiles/team.jpg',
  publications: '/images/tiles/xx.jpg',
  events: '/images/tiles/GemEvents.jpg',
  map: '/images/tiles/map.jpg',
  infographics: '/images/tiles/infographics.jpg',
  website: '/images/tiles/xx.jpg',
}

const launchTiles = computed(() => {
  const tiles = [
    { id: 'g1', title: 'Description', target: 'description', img: tileImages.description },
    { id: 'g2', title: 'At a Glance', target: 'glance', img: tileImages.glance },
    { id: 'g3', title: 'Project Website', isExternal: true, href: '#', img: tileImages.website },
    { id: 'g4', title: 'Team', target: 'team', img: tileImages.team },
    { id: 'g5', title: 'Publications', target: 'publications', img: tileImages.publications },
    { id: 'g6', title: 'Events', target: 'events', img: tileImages.events },
    { id: 'g7', title: 'Interactive Map', target: 'map', img: tileImages.map },
    { id: 'g8', title: 'Infographics', target: 'info', img: tileImages.infographics },
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
.hrjust-panel {
  display: grid;
  grid-template-columns: var(--hrjust-nav-w, 300px) minmax(0, 1fr);
  gap: 0;
}
.hrjust-panel.is-collapsed {
  grid-template-columns: 86px minmax(0, 1fr);
}

.hrjust-navhead__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

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

:deep(.hrjust-nav-tile.is-active) .hrjust-nav-tile__icon svg {
  fill: none !important;
  stroke: rgba(174, 12, 54, 0.85);
}

.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) .hrjust-nav-tile__icon svg {
  fill: none !important;
  stroke: rgba(174, 12, 54, 0.85);
}

.hrjust-panel.is-collapsed :deep(.hrjust-navhead__meta),
.hrjust-panel.is-collapsed :deep(.hrjust-nav__title),
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile__text),
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile__chev) {
  display: none;
}

.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile) {
  grid-template-columns: 1fr;
  gap: 0;
  height: 56px;
  padding: 0;
}

:deep(.hrjust-nav-tile__mark) {
  display: none;
}

.hrjust-panel.is-collapsed .hrjust-nav-tile__icon {
  justify-self: center;
  align-self: center;
}

.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) {
  background: transparent !important;
  border-color: transparent !important;
}
.hrjust-panel.is-collapsed :deep(.hrjust-nav-tile.is-active) .hrjust-nav-tile__icon {
  border-color: rgba(174, 12, 54, 0.28);
  background: var(--hrjust-active, rgba(174, 12, 54, 0.08));
}

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

.hrjust-panel.is-collapsed .hrjust-launch {
  gap: 30px;
}
</style>
