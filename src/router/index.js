import VueRouter from 'vue-router'
import Login from '../Pages/Login'
import Admin from '../Pages/Admin'
import { getUser_l, getUser_s } from "../utils/localStorage"


const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Admin,
        },
        {
            path: '/login',
            component: Login,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const user_l = getUser_l()
    const user_s = getUser_s()
    user_l || user_s?(
        to.path === '/login' ? next('/home') : next()
    ):(
        to.path === '/login' ? next() : next('/login')
    )
})

export default router