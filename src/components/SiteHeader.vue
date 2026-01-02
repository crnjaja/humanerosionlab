<template>
  <header class="site-header" :class="{ 'site-header--solid': isSolid }">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">
        <img class="brand-logo" src="/files/logo.png" alt="Logo" />
        <span class="brand-text">
          <span class="brand-name">Le P’tit Dodu</span>
          <span class="brand-tag">Site personnel</span>
        </span>
      </RouterLink>

      <nav class="top-nav" aria-label="Navigation principale">
        <RouterLink class="top-nav-link" to="/">Home</RouterLink>

        <!-- ABOUT DROPDOWN -->
        <div
          ref="aboutEl"
          class="nav-dropdown"
          :class="{ 'nav-dropdown--open': aboutOpen }"
          @mouseenter="onAboutEnter"
          @mouseleave="onAboutLeave"
        >
          <button
            type="button"
            class="top-nav-link top-nav-link--dropdown"
            :class="{ 'is-active': isAboutActive }"
            aria-haspopup="menu"
            :aria-expanded="aboutOpen ? 'true' : 'false'"
            @click="toggleAbout"
            @keydown.enter.prevent="toggleAbout"
            @keydown.space.prevent="toggleAbout"
            @keydown.escape.prevent="closeAbout"
            @keydown.down.prevent="focusFirstItem('about')"
          >
            About
            <span class="dropdown-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </span>
          </button>

          <div class="nav-dropdown-panel" role="menu" aria-label="About submenu" @click.stop>
            <RouterLink
              class="nav-dropdown-item"
              to="/projects/hel"
              role="menuitem"
              tabindex="-1"
              @click="closeAbout"
            >
              The Lab
              <span class="nav-dropdown-hint">Human Erosion Lab</span>
            </RouterLink>

            <RouterLink
              class="nav-dropdown-item"
              to="/projects/team"
              role="menuitem"
              tabindex="-1"
              @click="closeAbout"
            >
              The Team
              <span class="nav-dropdown-hint">Human Erosion Lab Team</span>
            </RouterLink>
          </div>
        </div>

        <!-- PROJECTS DROPDOWN -->
        <div
          ref="projectsEl"
          class="nav-dropdown"
          :class="{ 'nav-dropdown--open': projectsOpen }"
          @mouseenter="onProjectsEnter"
          @mouseleave="onProjectsLeave"
        >
          <button
            type="button"
            class="top-nav-link top-nav-link--dropdown"
            :class="{ 'is-active': isProjectsActive }"
            aria-haspopup="menu"
            :aria-expanded="projectsOpen ? 'true' : 'false'"
            @click="toggleProjects"
            @keydown.enter.prevent="toggleProjects"
            @keydown.space.prevent="toggleProjects"
            @keydown.escape.prevent="closeProjects"
            @keydown.down.prevent="focusFirstItem('projects')"
          >
            Projects
            <span class="dropdown-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" />
              </svg>
            </span>
          </button>

          <div class="nav-dropdown-panel" role="menu" aria-label="Projects submenu" @click.stop>
            <RouterLink
              class="nav-dropdown-item"
              to="/projects/hrjust"
              role="menuitem"
              tabindex="-1"
              @click="closeProjects"
            >
              HRJust
              <span class="nav-dropdown-hint">Human Rights Justification</span>
            </RouterLink>

            <RouterLink
              class="nav-dropdown-item"
              to="/projects/gem"
              role="menuitem"
              tabindex="-1"
              @click="closeProjects"
            >
              GEM
              <span class="nav-dropdown-hint">Gender Equality in the Mirror</span>
            </RouterLink>

            <RouterLink
              class="nav-dropdown-item"
              to="/projects/cli-m-co2"
              role="menuitem"
              tabindex="-1"
              @click="closeProjects"
            >
              CLI-M-CO2
              <span class="nav-dropdown-hint">Climate… (à préciser)</span>
            </RouterLink>
          </div>
        </div>

        <RouterLink class="top-nav-link" to="/publications">Publications</RouterLink>
        <RouterLink class="top-nav-link" to="/events">Events</RouterLink>
        <RouterLink class="top-nav-link" to="/contact">Contact</RouterLink>

        <a class="social-pill" href="#" aria-label="Twitter" @click.prevent>✕</a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isSolid = ref(false)
const route = useRoute()

const onScroll = () => {
  isSolid.value = window.scrollY > 16
}

/** Dropdown refs (for outside click + focus) */
const aboutEl = ref<HTMLElement | null>(null)
const projectsEl = ref<HTMLElement | null>(null)

/** Dropdown state (SEPARATE) */
const aboutOpen = ref(false)
const projectsOpen = ref(false)

/**
 * Pages that should highlight "About" even if they live under /projects/...
 * (because your About dropdown links go to these routes)
 */
const ABOUT_ALIASES = new Set(['/le-bon', '/projects/hel', '/projects/team'])

/** Active states (SEPARATE + fixed) */
const isAboutActive = computed(() => ABOUT_ALIASES.has(route.path))
const isProjectsActive = computed(() => {
  return route.path.startsWith('/projects/') && !ABOUT_ALIASES.has(route.path)
})

/** Desktop hover only */
const canHover = () => globalThis.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches

function closeAll() {
  aboutOpen.value = false
  projectsOpen.value = false
}

/** About controls */
function openAbout() {
  projectsOpen.value = false
  aboutOpen.value = true
}
function closeAbout() {
  aboutOpen.value = false
}
function toggleAbout() {
  projectsOpen.value = false
  aboutOpen.value = !aboutOpen.value
}

/** Projects controls */
function openProjects() {
  aboutOpen.value = false
  projectsOpen.value = true
}
function closeProjects() {
  projectsOpen.value = false
}
function toggleProjects() {
  aboutOpen.value = false
  projectsOpen.value = !projectsOpen.value
}

/** Hover handlers */
function onAboutEnter() {
  if (canHover()) openAbout()
}
function onAboutLeave() {
  if (canHover()) closeAbout()
}
function onProjectsEnter() {
  if (canHover()) openProjects()
}
function onProjectsLeave() {
  if (canHover()) closeProjects()
}

/** Focus management */
function focusFirstItem(which: 'about' | 'projects') {
  requestAnimationFrame(() => {
    const root = which === 'about' ? aboutEl.value : projectsEl.value
    const first = root?.querySelector(
      '.nav-dropdown-panel .nav-dropdown-item',
    ) as HTMLElement | null
    first?.focus()
  })
}

/** Close on outside click / escape */
function onDocClick(e: MouseEvent) {
  const t = e.target as Node

  if (aboutOpen.value && aboutEl.value && !aboutEl.value.contains(t)) closeAbout()
  if (projectsOpen.value && projectsEl.value && !projectsEl.value.contains(t)) closeProjects()
}

function onDocKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeAll()
}

/** Close on route change */
watch(
  () => route.fullPath,
  () => closeAll(),
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKeydown)
})
</script>
