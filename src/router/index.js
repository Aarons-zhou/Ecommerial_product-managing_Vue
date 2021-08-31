import VueRouter from 'vue-router'
import store from '../store'
import Login from '../Pages/Login'
import Admin from '../Pages/Admin'
import Home from '../Pages/Home'
import Category from '../Pages/Category'
import Product from '../Pages/Product'
import ProductCreate from '../Pages/Product/ProductCreate'
import ProductRetrieve from '../Pages/Product/ProductRetrieve'
import Role from '../Pages/Role'
import User from '../Pages/User'
import ChartBar from '../Pages/ChartBar'
import ChartLine from '../Pages/ChartLine'
import ChartPie from '../Pages/ChartPie'
import { getUser_l, getUser_s } from "../utils/localStorage"

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            component: Admin,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    component: Home,
                },
                {
                    path: 'category',
                    component: Category,
                },
                {
                    path: 'product',
                    component: Product,
                },
                {
                    name:'productCreate',
                    path:'product/create',
                    component:ProductCreate
                },
                {
                    name:'productRetrieve',
                    path:'product/retrieve',
                    component:ProductRetrieve
                },
                {
                    path: 'role',
                    component: Role,
                },
                {
                    path: 'user',
                    component: User,
                },
                {
                    path: 'chart/bar',
                    component: ChartBar,
                },
                {
                    path: 'chart/line',
                    component: ChartLine,
                },
                {
                    path: 'chart/pie',
                    component: ChartPie,
                }
            ]
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