<template>
  <el-form :model="ruleForm" :rules="rules" label-width="50px" class="form">
    <el-form-item label="账户" prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="on" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" />
    </el-form-item>

    <span>
      <el-checkbox v-model="checked">记住账号</el-checkbox>
    </span>

    <el-form-item class="login-button">
      <el-button type="primary" @click="handleLogin(ruleForm)">登录</el-button>
      <LinkButton @click.native="handleLoginTemp" children="游客访问" />
    </el-form-item>
  </el-form>
</template>

<script>
import LinkButton from "./RenderLinkButton";
import { mapActions } from "vuex";
export default {
  name: "LoginConfirm",
  data() {
    return {
      checked: false,
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入账户密码", trigger: "blur" },
        ],
      },
    };
  },
  computed:{
    
  },
  methods: {
    ...mapActions("userInfo", {
      handleLogin: "login",
      handleLoginTemp: "loginTemp",
    }),
  },
  components: {
    LinkButton,
  },
};
</script>

<style lang="less" >
.form {
  width: 84%;
  margin: 0 auto;
  input {
    height: 35px;
    padding-left: 10px;
  }
  .login-button {
    margin-top: 20px;
    & > div {
      margin: 0 !important;
      & > button {
        margin-right: 20px;
      }
    }
  }
}
</style>