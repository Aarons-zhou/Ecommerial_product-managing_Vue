<template>
  <div class="login-wrapper">
    <header>
      <img :src="logo" alt="logo" />
      <span>薯条后台管理系统</span>
    </header>
    <main class="clearfix">
      <div>
        <h1>用户登录</h1>
        <LoginConfirm />
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LoginConfirm from "../Components/LoginConfirm";
import logo from "../Images/logo.png";

export default {
  name: "Login",
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapState('userInfo',['user'])
  },
  watch: {
    user() {
      this.$router.replace("/");
    },
  },
  components: {
    LoginConfirm,
  },
};
</script>

<style lang="less">
.login-wrapper {
  height: 100%;
  header {
    position: absolute;
    height: 80px;
    min-width: 1280px;
    width: 100%;
    background-color: rgb(248, 135, 154);
    opacity: 0.8;
    img {
      width: 40px;
      height: 40px;
      margin: 15px 40px;
      vertical-align: middle;
      border-style: none;
    }
    span {
      line-height: 80px;
      font-size: 20px;
    }
  }
  main {
    width: 100%;
    height: 100%;
    background-image: url(../Images/login-bgc.jpg);
    background-size: cover;
    & > div {
      width: 32%;
      height: 320px;
      margin: 200px auto;
      background-color: #fff;
      opacity: 0.8;
      h1 {
        font-size: 24px;
        text-align: center;
        padding: 20px 0;
        font-weight: 550;
        letter-spacing: 15px;
      }
    }
  }
}

//开启BFC
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
</style>