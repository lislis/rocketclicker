import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { storeToRefs } from 'pinia'
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
      path: '/level', redirect: '/level/1'
    },
    {
      path: '/game/:level',
      name: 'game',
      component: () => import('@/views/GameView.vue')
    },
    {
      path: '/game', redirect: '/game/1'
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


// router.beforeEach((to, from, next) => {
//   const store = useClickStore();
//   const { getGame } = storeToRefs(store)
//   console.log(typeof getGame.value == 'object')

//   if (to.name === 'game' || to.name === 'level') {
//     if (getGame.value === undefined 
//       || getGame.value === null 
//       || !Object.keys(getGame.value).includes('level')) {
//       console.log('redirect')
//       next({ name: 'waiting' })
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })


export default router
