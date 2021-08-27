<template>
  <div class="admin-wrapper">
    <el-col :span="4" class="left-wrapper">
      <div></div>
    </el-col>
    <el-col :span="20" class="right-wrapper">
      <div class="header"></div>
      <div class="main"></div>
      <div class="footer">使用Chrome浏览器获得更佳体验效果</div>
    </el-col>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.admin-wrapper {
  height: 100%;
  min-height: 100%;
  .left-wrapper {
    position: relative;
    min-height: 100%;
    background-color: rgb(255, 160, 176);
  }
  .right-wrapper {
    min-height: 100%;
    height: 100%;
    .header {
      height: 8.7%;
      padding: 0;
      background-color: rgb(255, 193, 204);
      user-select: none;
    }
    .main {
      height: 83.7%;
      padding: 30px;
      background-color: rgb(255, 226, 231);
    }
    .footer {
      height: 7.6%;
      padding-top: 15px;
      background-color: rgb(255, 193, 204);
      text-align: center;
    }
  }
}
</style>