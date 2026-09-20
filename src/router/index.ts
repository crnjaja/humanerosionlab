import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import EventsView from '../views/EventsView.vue'

import TeamView from '../views/about/TeamView.vue'
import NetworkView from '../views/about/NetworkView.vue'

import PrivacyPolicyView from '../views/PrivacyPolicy.vue'

import { AnalyticsService } from '../services/AnalyticsService.ts'

// Projects (lazy-loaded)
const HrjustView = () => import('../views/projects/HrjustView.vue')
const GemView = () => import('../views/projects/GemView.vue')
const CliMCo2View = () => import('../views/projects/CliMCo2View.vue')
const CliselView = () => import('../views/projects/CliselView.vue')
const HelView = () => import('../views/projects/HelView.vue')

// Tools (lazy-loaded)
const InfographicsView = () => import('../views/tools/InfographicsView.vue')
const MapView = () => import('../views/tools/MapView.vue')
const DatabaseView = () => import('../views/tools/DatabaseView.vue')

// Privacy / Cookies
const CookiesConsentView = () => import('../views/CookiesConsent.vue')

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Human Erosion Lab',
      },
    },

    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact',
      },
    },

    {
      path: '/publications',
      name: 'publications',
      component: PublicationsView,
      meta: {
        title: 'Publications',
      },
    },

    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: {
        title: 'Events',
      },
    },

    // Privacy
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Privacy Policy',
      },
    },

    {
      path: '/cookies-consent',
      name: 'cookies-consent',
      component: CookiesConsentView,
      meta: {
        title: 'Cookies & Consent',
      },
    },

    // About / Projects
    {
      path: '/projects/hel',
      name: 'project-hel',
      component: HelView,
      meta: {
        title: 'Human Erosion Lab',
      },
    },

    {
      path: '/projects/team',
      name: 'project-team',
      component: TeamView,
      meta: {
        title: 'Team',
      },
    },

    {
      path: '/projects/network',
      name: 'project-network',
      component: NetworkView,
      meta: {
        title: 'Network',
      },
    },

    {
      path: '/projects/hrjust',
      name: 'project-hrjust',
      component: HrjustView,
      meta: {
        title: 'HRJust',
      },
    },

    {
      path: '/projects/gem',
      name: 'project-gem',
      component: GemView,
      meta: {
        title: 'GEM',
      },
    },

    {
      path: '/projects/cli-m-co2',
      name: 'project-cli-m-co2',
      component: CliMCo2View,
      meta: {
        title: 'Cli-M-Co2',
      },
    },

    {
      path: '/projects/clisel',
      name: 'project-clisel',
      component: CliselView,
      meta: {
        title: 'CLISEL',
      },
    },

    // Tools
    {
      path: '/tools/infographics',
      name: 'tools-infographics',
      component: InfographicsView,
      meta: {
        title: 'Infographics',
      },
    },

    {
      path: '/tools/map',
      name: 'tools-map',
      component: MapView,
      meta: {
        title: 'Map',
      },
    },

    {
      path: '/tools/database',
      name: 'tools-database',
      component: DatabaseView,
      meta: {
        title: 'Database',
      },
    },
  ],

  scrollBehavior() {
    return { top: 0 }
  },
})

/**
 * Change le <title> de la page avant chaque navigation.
 */
router.beforeEach((to) => {
  const siteName = 'Human Erosion Lab'

  if (to.meta.title && to.meta.title !== siteName) {
    document.title = `${String(to.meta.title)} | ${siteName}`
  } else {
    document.title = siteName
  }
})

/**
 * Envoie les changements de page à Google Analytics.
 *
 * AnalyticsService.pageView() ne fait rien si :
 * - Analytics n'est pas initialisé
 * - l'utilisateur n'a pas donné son consentement
 */
router.afterEach((to) => {
  AnalyticsService.pageView(to)
})

export default router
