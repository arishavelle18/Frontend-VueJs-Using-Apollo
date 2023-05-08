import { createRouter,createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            name:"home",
            component:HomeView,
            meta: { requiresAuth: true }
        },
        {
            path:'/login',
            name:"login",
            component:LoginView
        },
        {
            path:'/register',
            name:"register",
            component: RegisterView
        },
        {
            path:'/logout',
            name:"logout",  
            component: LogoutView,
            meta: { requiresAuth: true }
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: NotFoundView
        }
    ]
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') // check if user is authenticated
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) { // check if route requires authentication and user is not authenticated
      next('/login') // redirect to login page
    }else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) { // check if user is already authenticated and trying to access login or register page
        next('/') // redirect to dashboard
    }
    else {
      next() // proceed to next route
    }
  })

export default router;