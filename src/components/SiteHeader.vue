<template>
  <header class="site-header" :class="{ 'site-header--solid': isSolid || mobileMenuOpen }">
    <div class="container header-inner">
      <!-- LOGO -->
      <RouterLink to="/" class="brand brand--logo-only" @click="closeMobileMenu">
        <img
          class="brand-logo"
          :class="{ 'brand-logo--top': !isSolid && !mobileMenuOpen }"
          src="/files/HEL.png"
          alt="Logo"
        />
      </RouterLink>

      <!-- MOBILE MENU BUTTON -->
      <button
        type="button"
        class="mobile-menu-toggle"
        :class="{ 'mobile-menu-toggle--open': mobileMenuOpen }"
        aria-label="Toggle navigation"
        :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
        aria-controls="main-navigation"
        @click.stop="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- NAVIGATION -->
      <nav
        id="main-navigation"
        class="top-nav"
        :class="{ 'top-nav--mobile-open': mobileMenuOpen }"
        aria-label="Navigation principale"
      >
        <!-- HOME -->
        <RouterLink class="top-nav-link" to="/" @click="closeMobileMenu"> Home </RouterLink>

        <!-- ABOUT -->
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
            @click.stop="toggleAbout"
            @keydown.enter.prevent="toggleAbout"
            @keydown.space.prevent="toggleAbout"
            @keydown.escape.prevent="closeAbout"
            @keydown.down.prevent="focusFirstItem('about')"
          >
            <span>About</span>

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
              @click="closeMobileMenu"
            >
              Resisting Human Erosion
              <span class="nav-dropdown-hint"> Learn about the project </span>
            </RouterLink>

            <RouterLink
              class="nav-dropdown-item"
              to="/projects/network"
              role="menuitem"
              tabindex="-1"
              @click="closeMobileMenu"
            >
              Our Network
              <span class="nav-dropdown-hint"> Explore our network members </span>
            </RouterLink>

            <RouterLink
              class="nav-dropdown-item"
              to="/projects/team"
              role="menuitem"
              tabindex="-1"
              @click="closeMobileMenu"
            >
              Our Team
              <span class="nav-dropdown-hint"> Meet our team members </span>
            </RouterLink>

            <!-- TOOLS : TEMPORARILY DISABLED -->
            <div
              ref="toolsSubEl"
              class="nav-subdropdown"
              :class="{ 'nav-subdropdown--open': toolsSubOpen }"
              @mouseenter="onToolsSubEnter"
              @mouseleave="onToolsSubLeave"
            >
              <button
                type="button"
                class="nav-dropdown-item nav-dropdown-item--submenu is-disabled"
                role="menuitem"
                tabindex="-1"
                aria-disabled="true"
                disabled
              >
                Tools

                <span class="nav-dropdown-hint"> Infographics, database &amp; map </span>

                <span class="dropdown-icon dropdown-icon--right" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" />
                  </svg>
                </span>
              </button>

              <!--
                Tools submenu kept in place so it can
                easily be re-enabled later.
              -->
              <div class="nav-subdropdown-panel" role="menu" aria-label="Tools submenu" @click.stop>
                <RouterLink
                  class="nav-dropdown-item"
                  to="/tools/infographics"
                  role="menuitem"
                  tabindex="-1"
                  @click="closeMobileMenu"
                >
                  Infographics
                  <span class="nav-dropdown-hint"> Visual summaries </span>
                </RouterLink>

                <RouterLink
                  class="nav-dropdown-item"
                  to="/tools/database"
                  role="menuitem"
                  tabindex="-1"
                  @click="closeMobileMenu"
                >
                  Database
                  <span class="nav-dropdown-hint"> Browse &amp; search data </span>
                </RouterLink>

                <RouterLink
                  class="nav-dropdown-item"
                  to="/tools/map"
                  role="menuitem"
                  tabindex="-1"
                  @click="closeMobileMenu"
                >
                  Interactive Map
                  <span class="nav-dropdown-hint"> Explore cases geographically </span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- PUBLICATIONS -->
        <RouterLink class="top-nav-link" to="/publications" @click="closeMobileMenu">
          Publications
        </RouterLink>

        <!-- EVENTS -->
        <RouterLink class="top-nav-link" to="/events" @click="closeMobileMenu"> Events </RouterLink>

        <!-- ARCHIVED PROJECTS -->
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
            @click.stop="toggleProjects"
            @keydown.enter.prevent="toggleProjects"
            @keydown.space.prevent="toggleProjects"
            @keydown.escape.prevent="closeProjects"
            @keydown.down.prevent="focusFirstItem('projects')"
          >
            <span>Archived Projects</span>

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
              @click="closeMobileMenu"
            >
              HRJust
              <span class="nav-dropdown-hint"> Human Rights Justification </span>
            </RouterLink>

            <!-- DISABLED -->
            <RouterLink
              class="nav-dropdown-item is-disabled"
              to="/projects/gem"
              role="menuitem"
              tabindex="-1"
              aria-disabled="true"
              @click.prevent
            >
              GEM
              <span class="nav-dropdown-hint"> Data to be imported </span>
            </RouterLink>

            <!-- DISABLED -->
            <RouterLink
              class="nav-dropdown-item is-disabled"
              to="/projects/cli-m-co2"
              role="menuitem"
              tabindex="-1"
              aria-disabled="true"
              @click.prevent
            >
              CLI-M-CO2
              <span class="nav-dropdown-hint"> Data to be imported </span>
            </RouterLink>

            <!-- DISABLED -->
            <RouterLink
              class="nav-dropdown-item is-disabled"
              to="/projects/clisel"
              role="menuitem"
              tabindex="-1"
              aria-disabled="true"
              @click.prevent
            >
              CLISEL
              <span class="nav-dropdown-hint"> Data to be imported </span>
            </RouterLink>
          </div>
        </div>

        <!-- CONTACT -->
        <RouterLink class="top-nav-link" to="/contact" @click="closeMobileMenu">
          Contact
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

/* =========================================================
   HEADER STATE
   ========================================================= */

const isSolid = ref(false)
const mobileMenuOpen = ref(false)

const onScroll = () => {
  isSolid.value = window.scrollY > 16
}

/* =========================================================
   ELEMENT REFS
   ========================================================= */

const aboutEl = ref<HTMLElement | null>(null)
const toolsSubEl = ref<HTMLElement | null>(null)
const projectsEl = ref<HTMLElement | null>(null)

/* =========================================================
   MENU STATE
   ========================================================= */

const aboutOpen = ref(false)
const toolsSubOpen = ref(false)
const projectsOpen = ref(false)

/* =========================================================
   ACTIVE ROUTES
   ========================================================= */

const ABOUT_ALIASES = new Set(['/projects/network', '/projects/hel', '/projects/team'])

const TOOLS_ALIASES = new Set([
  '/tools/infographics',
  '/tools/database',
  '/tools/interactive-map',
  '/tools/map',
])

const isAboutActive = computed(() => ABOUT_ALIASES.has(route.path) || TOOLS_ALIASES.has(route.path))

const isProjectsActive = computed(
  () => route.path.startsWith('/projects/') && !ABOUT_ALIASES.has(route.path),
)

/* =========================================================
   DEVICE HELPERS
   ========================================================= */

const canHover = () => globalThis.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches

/* =========================================================
   CLOSE EVERYTHING
   ========================================================= */

function closeAll() {
  aboutOpen.value = false
  toolsSubOpen.value = false
  projectsOpen.value = false
}

/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value

  if (!mobileMenuOpen.value) {
    closeAll()
  }
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  closeAll()
}

/* =========================================================
   ABOUT
   ========================================================= */

function openAbout() {
  projectsOpen.value = false
  aboutOpen.value = true
}

function closeAbout() {
  aboutOpen.value = false
  toolsSubOpen.value = false
}

function toggleAbout() {
  projectsOpen.value = false
  aboutOpen.value = !aboutOpen.value

  if (!aboutOpen.value) {
    toolsSubOpen.value = false
  }
}

/* =========================================================
   ARCHIVED PROJECTS
   ========================================================= */

function openProjects() {
  closeAbout()
  projectsOpen.value = true
}

function closeProjects() {
  projectsOpen.value = false
}

function toggleProjects() {
  closeAbout()
  projectsOpen.value = !projectsOpen.value
}

/* =========================================================
   TOOLS
   ========================================================= */

function openToolsSub() {
  toolsSubOpen.value = true
}

function closeToolsSub() {
  toolsSubOpen.value = false
}

function toggleToolsSub() {
  toolsSubOpen.value = !toolsSubOpen.value
}

function onToolsSubEnter() {
  /*
   * Tools is temporarily disabled.
   *
   * Re-enable with:
   *
   * if (canHover()) openToolsSub()
   */
}

function onToolsSubLeave() {
  /*
   * Tools is temporarily disabled.
   *
   * Re-enable with:
   *
   * if (canHover()) closeToolsSub()
   */
}

/* =========================================================
   DESKTOP HOVER
   ========================================================= */

function onAboutEnter() {
  if (canHover()) {
    openAbout()
  }
}

function onAboutLeave() {
  if (canHover()) {
    closeAbout()
  }
}

function onProjectsEnter() {
  if (canHover()) {
    openProjects()
  }
}

function onProjectsLeave() {
  if (canHover()) {
    closeProjects()
  }
}

/* =========================================================
   KEYBOARD FOCUS
   ========================================================= */

function focusFirstItem(which: 'about' | 'toolsSub' | 'projects') {
  requestAnimationFrame(() => {
    const root =
      which === 'about' ? aboutEl.value : which === 'toolsSub' ? toolsSubEl.value : projectsEl.value

    const first = root?.querySelector(
      '.nav-dropdown-panel .nav-dropdown-item, .nav-subdropdown-panel .nav-dropdown-item',
    ) as HTMLElement | null

    first?.focus()
  })
}

function openToolsSubAndFocusFirst() {
  openToolsSub()

  requestAnimationFrame(() => {
    const first = toolsSubEl.value?.querySelector(
      '.nav-subdropdown-panel .nav-dropdown-item',
    ) as HTMLElement | null

    first?.focus()
  })
}

/* =========================================================
   OUTSIDE CLICK
   ========================================================= */

function onDocClick(e: MouseEvent) {
  const target = e.target as Node

  /*
   * Desktop dropdown closing.
   */

  if (aboutOpen.value && aboutEl.value && !aboutEl.value.contains(target)) {
    closeAbout()
  }

  if (toolsSubOpen.value && toolsSubEl.value && !toolsSubEl.value.contains(target)) {
    closeToolsSub()
  }

  if (projectsOpen.value && projectsEl.value && !projectsEl.value.contains(target)) {
    closeProjects()
  }
}

/* =========================================================
   ESCAPE KEY
   ========================================================= */

function onDocKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') {
    return
  }

  if (mobileMenuOpen.value) {
    closeMobileMenu()
    return
  }

  closeAll()
}

/* =========================================================
   ROUTE CHANGE
   ========================================================= */

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
  },
)

/* =========================================================
   LIFECYCLE
   ========================================================= */

onMounted(() => {
  onScroll()

  window.addEventListener('scroll', onScroll, {
    passive: true,
  })

  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)

  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKeydown)
})
</script>

<style scoped>
/* =========================================================
   TEMPORARILY DISABLED LINKS / BUTTONS
   ========================================================= */

.is-disabled {
  opacity: 0.4;
  cursor: not-allowed !important;
  pointer-events: none;
}
</style>
