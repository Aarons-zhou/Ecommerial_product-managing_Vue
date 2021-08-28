<template>
  <div class="admin-wrapper">
    <el-col :span="3" class="left-wrapper">
      <div class="header">
        <img :src="logo" alt="logo" />
        <h1>薯条后台</h1>
      </div>
      <div class="main">
        <Menu />
      </div>
    </el-col>
    <el-col :span="21" class="right-wrapper">
      <div class="header"></div>
      <div class="main">
        <div class="test">
          123
          <router-view/>
        </div>
      </div>
      <div class="footer">使用Chrome浏览器获得更佳体验效果</div>
    </el-col>
  </div>
</template>

<script>
import Menu from '../Components/Menu'
import logo from "../Images/logo.png";
export default {
  data() {
    return {
      logo,
    };
  },
  components: {
    Menu
  },
};
</script>

<style lang='less' scoped>
.admin-wrapper {
  display: flex;
  height: 100%;
  min-height: 100%;
  .left-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100%;
    height: 100%;
    min-width: 200px;
    max-width: 200px;
    background-color: rgb(255, 160, 176);
    .header {
      min-height: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        margin-left: 15px;
      }
      h1 {
        font-size: 20px;
        margin-left: 15px;
        margin-top: 10px;
        letter-spacing: 3px;
      }
    }
    .main {
      position: relative;
      flex: 1;
      min-height: 670px;
    }
  }
  .right-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100%;
    height: 100%;
    .header {
      min-height: 80px;
      height: 80px;
      padding: 10px;
      background-color: rgb(255, 193, 204);
      user-select: none;
    }
    .main {
      flex: 1;
      min-height: 600px;
      padding: 30px;
      background-color: rgb(255, 226, 231);
      overflow: auto;
    }
    .footer {
      min-height: 70px;
      height: 70px;
      padding: 24px 50px;
      background-color: rgb(255, 193, 204);
      text-align: center;
    }
  }
}
.test {
  height: 1800px;
  background-color: green;
}
</style>