import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
        name: 'login',
        component: LoginView
    },
    {
      path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
      path: '/',
        name: 'dashboard',
        component: DashBoardView
    }
  ]
})

export default router
