import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Form, FormItem,
  Button,
  Input,
  Checkbox,
  Message,
  Row, Col,
  Menu, Submenu, MenuItem,
  Dialog,
  Card,
  Table,TableColumn,
  Select,Option,
  Tree,
  Pagination,
  Divider,
  Cascader
} from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Dialog.name, Dialog)
Vue.component(Card.name, Card)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Tree.name, Tree)
Vue.component(Pagination.name, Pagination)
Vue.component(Divider.name, Divider)
Vue.component(Cascader.name, Cascader)

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  mounted() {
    Vue.prototype.$message = Message
  },
}).$mount('#app')
