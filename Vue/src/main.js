import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'


const store = createStore({
    state() {
        return {
            isLoggedIn: false
        }
    },
    mutations: {
        setLoggedIn(state, value) {
            state.isLoggedIn = value;
        },
    },
    actions: {
        setUserStatus({commit}, value) {
            commit('setLoggedIn', value)
        }
    }
})

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = localStorage.getItem('jwt')
//     if(to.path ==='/' && !isAuthenticated) {
//         return '/login'
//     } else if (to.path === '/login' && isAuthenticated) {
//         return '/'
//     } else {
//         next()
//     }
// })

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

