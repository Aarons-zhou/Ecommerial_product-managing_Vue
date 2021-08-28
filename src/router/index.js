import VueRouter from 'vue-router'
import store from '../store'
import Login from '../Pages/Login'
import Admin from '../Pages/Admin'
import Home from '../Pages/Home'
import { getUser_l, getUser_s } from "../utils/localStorage"

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Admin,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    component: Home,
                }
            ]
        },
        {
            path: '/login',
            component: Login,
        }
    ]
})

router.beforeEach((to, from, next) => {
    let user = from.path === '/' ? getUser_l() || getUser_s() : store.state.userInfo.user
    user = user || {}
    user.name ?
        (
            to.path === '/login' ? next('/home') : next()
        ) : (
            to.path === '/login' ? next() : next('/login')
        )
})

export default router