import Vue from 'vue'
import { reqLogin, reqRoleList } from '../api'
import { setUser_l, setUser_s } from '../utils/localStorage'

export default {
    namespaced: true,
    actions: {
        async login(context, value) {
            const { username: name, password } = value
            const loginResult = await reqLogin({ name, password })
            const RoleListResult = await reqRoleList()
            const { data } = loginResult
            if (loginResult.status === 0 && RoleListResult.status === 0) {
                const roleList = RoleListResult.data
                const { roleId } = data
                const role = roleList.filter(item => item.id === roleId * 1)
                const menus = role[0].menus.split(',')
                //向localStorage保存用户信息
                setUser_l({
                    ...data,
                    menus
                })
                //发向下个action
                context.dispatch('send', {
                    ...data,
                    menus
                })
            } else {
                Vue.prototype.$message.error('账号或密码输入不正确')
            }
        },
        loginTemp(context) {
            const time = Date.now()
            const user = {
                name: '游客' + time,
                menus: ['/home', '/products', '/category', '/product', '/role', '/user', '/chart/bar', '/chart/line', '/chart/pie']
            }
            //向sessionStorage保存用户信息
            setUser_s(user)
            //发向下个action
            context.dispatch('send', user)
        },
        send(context, value) {
            context.commit('LOGIN', value)
        }
    },

    mutations: {
        LOGIN(state, value) {
            state.user = value
        }
    },
    state: {
        user: {}
    },
    getters: {}
}