import Vue from 'vue'
import VueRouter from 'vue-router'
import { Form, FormItem, Button, Input, Checkbox, Message, Row, Col } from 'element-ui';
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  mounted() {
    Vue.prototype.$message = Message
    // console.log("main-mounted", this);
  },
  updated() {
    // console.log("main-updated", this);

  }
}).$mount('#app')
