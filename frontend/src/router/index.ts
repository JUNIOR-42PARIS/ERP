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
        },
        {
          path: 'phases',
          name: 'missions-phases',
          component: () => import('../views/Mission/MissionResumeView.vue')
        },
        {
          path: 'documents',
          name: 'missions-documents',
          component: () => import('../views/Mission/MissionResumeView.vue')
        },
        {
          path: 'membres',
          name: 'missions-membres',
          component: () => import('../views/Mission/MissionResumeView.vue')
        },
        {
          path: 'calendrier',
          name: 'missions-calendrier',
          component: () => import('../views/Mission/MissionResumeView.vue')
        }
      ]
    },
    {
      path: '/ressources-humaines',
      name: 'ressources-humaines',
      component: () => import('../views/RessourceHumaineView.vue')
    }
  ]
});

export default router;
