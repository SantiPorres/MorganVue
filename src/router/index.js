import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import middlewarePipeline from '@/middlewares/middlewarePipeline'
import authenticated from '@/middlewares/authentication'
import notAuthenticated from '@/middlewares/notAuthentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
        name: 'login',
        meta: {
          middleware: [
            notAuthenticated
          ]
        },
        component: LoginView
    },
    {
      path: '/register',
        name: 'register',
        meta: {
          middleware: [
            notAuthenticated
          ]
        },
        component: RegisterView
    },
    {
      path: '/',
        name: 'dashboard',
        meta: {
          middleware: [
            authenticated
          ]
        },
        component: DashBoardView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  }
  return middleware[0]({
    ...context,
    next:middlewarePipeline(context, middleware, 1)
  })
})

export default router