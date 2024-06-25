import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useClickStore } from '@/stores/click'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: () => import('@/views/WaitingView.vue')
    },
    {
      path: '/level/:level',
      name: 'level',
      component: () => import('@/views/LevelView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    },
    {
      path: '/end',
      name: 'video',
      component: () => import('@/views/VideoView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const store = useClickStore();
  if (to.name === 'game' || to.name === 'level') {
    if (store.getGame === undefined || store.getGame === null) {
      console.log('redirect')
      next({ name: 'waiting' })
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router
