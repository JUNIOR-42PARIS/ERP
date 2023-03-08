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
      component: () => import('../views/MissionView.vue')
    },
    {
      path: '/missions/:idMission',
      component: () => import('../views/Mission/MissionLayout.vue'),
      children: [
        {
          path: '',
          name: 'missions-index',
          component: () => import('../views/Mission/MissionResumeView.vue')
        }
      ]
    }
  ]
});

export default router;
