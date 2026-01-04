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
          <div class="hrjust-nav__title">Sections</div>

          <ul class="hrjust-nav__list">
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
                    <strong v-if="active === 'glance'">At a glance</strong>
                    <span v-else>At a glance</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Quick snapshot + key facts</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
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
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
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
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
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
                    <strong v-if="active === 'db'">Database</strong>
                    <span v-else>Database</span>
                  </span>
                  <span class="hrjust-nav-tile__desc">Browse and query the dataset</span>
                </span>
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
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
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
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
                <span class="hrjust-nav-tile__chev" aria-hidden="true">→</span>
              </button>
            </li>
          </ul>
        </section>
      </nav>
    </aside>

    <!-- RIGHT CONTENT (scrolls inside the panel only) -->
    <section class="hrjust-panel__content" aria-live="polite">
      <div v-if="!active" class="hrjust-empty">
        <div class="hrjust-empty__title">Choose a section</div>
        <p class="hrjust-empty__text">Select an item on the left to display its content.</p>
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

const active = ref(null)

const componentMap = {
  glance: HrJustAtGlance,
  description: HrJustDescription,
  team: HrJustTeam,
  db: HrJustToolDatabase,
  map: HrJustToolMap,
  info: HrJustToolInfographics,
}

const activeComponent = computed(() => (active.value ? componentMap[active.value] : null))

function setActive(key) {
  active.value = key
}
</script>
