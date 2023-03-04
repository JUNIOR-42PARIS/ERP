import { createRouter, createWebHistory } from 'vue-router';
import AccueilView from '../views/AccueilView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: AccueilView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/missions',
      name: 'missions',
      component: () => import('../views/MissionView.vue'),
    },
    {
      path: '/missions/:id',
      name: 'missions-view',
      component: () => import('../views/Mission/IndexMissionView.vue'),
    }
  ]
});

export default router;
