import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LeBonView from '../views/LeBonView.vue'
import ContactView from '../views/ContactView.vue'
import PublicationsView from '../views/PublicationsView.vue'
import EventsView from '../views/EventsView.vue'
import TeamView from '../views/about/TeamView.vue'

// Projects (lazy-loaded)
const HelView = () => import('../views/projects/HelView.vue')
const HrjustView = () => import('../views/projects/HrjustView.vue')
const GemView = () => import('../views/projects/GemView.vue')
const CliMCo2View = () => import('../views/projects/CliMCo2View.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/le-bon', name: 'le-bon', component: LeBonView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/publications', name: 'publications', component: PublicationsView },
    { path: '/events', name: 'events', component: EventsView },

    { path: '/projects/hel', name: 'project-hel', component: HelView },
    { path: '/projects/team', name: 'project-team', component: TeamView },

    { path: '/projects/hrjust', name: 'project-hrjust', component: HrjustView },
    { path: '/projects/gem', name: 'project-gem', component: GemView },
    { path: '/projects/cli-m-co2', name: 'project-cli-m-co2', component: CliMCo2View },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
