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
    const user_l = getUser_l();
    const user_s = getUser_s();
    this.user = user_l || user_s;
    this.$store.dispatch("userInfo/send", this.user);
  },
  mounted() {
    //彩蛋
    const hiddenContext = `
        恭喜你，发现了本网站的管理员账号信息。
    账号：shutiao
    密码：shutiao
        
        请尽情体(rou)验(lin)本网站吧~
        `;
    console.log(hiddenContext);
    console.log(
      "%c\n       ",
      "font-size:240px;background:url('http://tiebapic.baidu.com/forum/w%3D580/sign=ff625e75d4cec3fd8b3ea77de689d4b6/d94dd7550923dd54103e04d1c609b3de9d82489d.jpg') no-repeat 0 -10px"
    );
  },
};
</script>

<style>
</style>
