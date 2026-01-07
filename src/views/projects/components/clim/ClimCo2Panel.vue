<template>
  <div class="hrjust-panel">
    <!-- LEFT NAV (pinned inside the panel) -->
    <aside class="hrjust-panel__menu" aria-label="Project navigation">
      <div class="hrjust-navhead">
        <div class="hrjust-navhead__kicker">Project</div>
        <div class="hrjust-navhead__title">CLI-M-CO2</div>
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
                :class="{ 'is-active': active === 'publications' }"
                @click="setActive('publications')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'publications'">Publications</strong>
                    <span v-else>Publications</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Outputs, briefs, papers</span>
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
                  <span class="hrjust-nav-tile__desc">Workshops, talks, sessions</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true"></span>
              </button>
            </li>

            <li>
              <button
                type="button"
                class="hrjust-nav-tile"
                :class="{ 'is-active': active === 'academic' }"
                @click="setActive('academic')"
              >
                <span class="hrjust-nav-tile__mark" aria-hidden="true"></span>
                <span class="hrjust-nav-tile__text">
                  <span class="hrjust-nav-tile__label">
                    <strong v-if="active === 'academic'">Academic Participation</strong>
                    <span v-else>Academic Participation</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Conferences, teaching, networks</span>
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
      <!-- Overview tile launcher -->
      <div v-if="active === 'overview'" class="hrjust-launch" aria-label="Quick access tiles">
        <template v-for="tile in launchTiles" :key="tile.id">
          <!-- External link tile -->
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

          <!-- Internal tile -->
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

import ClimCo2Description from './ClimCo2Description.vue'
import ClimCo2Team from './ClimCo2Team.vue'
import ClimCo2Publications from './ClimCo2Publications.vue'
import ClimCo2Events from './ClimCo2Events.vue'
import ClimCo2AcademicParticipation from './ClimCo2AcademicParticipation.vue'

/**
 * ✅ Default is "overview" so the tile launcher is shown on page load
 */
const active = ref('overview')

const componentMap = {
  description: ClimCo2Description,
  team: ClimCo2Team,
  publications: ClimCo2Publications,
  events: ClimCo2Events,
  academic: ClimCo2AcademicParticipation,
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

/**
 * ✅ Tile images (replace with CLI-M-CO2 assets)
 */
const tileImages = {
  description: '/images/tiles/ClimDescription.png',
  team: '/images/tiles/ClimTeam.png',
  publications: '/images/tiles/ClimPublications.png',
  events: '/images/tiles/ClimEvents.png',
  academic: '/images/tiles/ClimAcademic.png',

  // optional external link tile
  website: '/images/tiles/ClimWebsite.png',
}

const launchTiles = computed(() => {
  const tiles = [
    { id: 'c1', title: 'Description', target: 'description', img: tileImages.description },
    { id: 'c2', title: 'Team', target: 'team', img: tileImages.team },

    { id: 'c3', title: 'Publications', target: 'publications', img: tileImages.publications },
    { id: 'c4', title: 'Events', target: 'events', img: tileImages.events },
    { id: 'c5', title: 'Academic Participation', target: 'academic', img: tileImages.academic },

    // Optional external link
    {
      id: 'c6',
      title: 'Project Website',
      isExternal: true,
      href: '#',
      img: tileImages.website,
    },
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
/* ✅ Same launcher styling as GEM/HRJust */
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
}

.hrjust-launch-tile:focus-visible {
  outline: 3px solid rgba(0, 156, 210, 0.55);
  outline-offset: 2px;
}

.hrjust-panel__content {
  overflow: auto;
}

a.hrjust-launch-tile {
  text-decoration: none;
  color: inherit;
}

.hrjust-launch-tile__ext {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  transform: translateY(1px);
  opacity: 0.95;
}

.hrjust-launch-tile__ext svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
