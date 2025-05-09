import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(), // ✅ FIX: use hash mode
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/intro',
      name: 'IntroPageView',
      component: () => import('../views/IntroPageView.vue'),
    },
  ],
});

export default router;
