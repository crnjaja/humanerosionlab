import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: 'Accueil' },
    },
    {
      path: '/le-bon',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      meta: { title: 'Le Bon' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue'),
      meta: { title: 'Contact' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: { title: '404' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const base = 'Le Dodu'
  document.title = typeof to.meta.title === 'string' ? `${base} - ${to.meta.title}` : base
})

export default router
