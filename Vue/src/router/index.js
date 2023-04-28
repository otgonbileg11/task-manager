import { createRouter,createWebHistory } from "vue-router";
import LoginPage from '../views/LoginPage.vue'
import TaskManager from '../views/TaskManager.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: TaskManager,
        beforeEnter: (to, from, next) => {
            const isAuthenticated = !!localStorage.getItem('jwt')
            if (!isAuthenticated) { 
                next({
                    name: 'login'
                })
            } else {
                next()
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router