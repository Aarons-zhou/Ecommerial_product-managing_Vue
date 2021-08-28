<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getUser_l, getUser_s } from "./utils/localStorage";
export default {
  name: "App",
  data() {
    return {
      user: {},
    };
  },
  
  created() {
    //从本地读数据到vuex状态中
    const user_l = getUser_l()
    const user_s = getUser_s()
    this.user = user_l || user_s
    this.$store.dispatch('userInfo/send',this.user)
  },
};
</script>

<style>
</style>
