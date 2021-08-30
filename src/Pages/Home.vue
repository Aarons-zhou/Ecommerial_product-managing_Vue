<template>
  <div class="home">
    <img :src="logo" alt="logo" />
    <h1>欢迎来到薯条商品管理后台</h1>
    <h2>
      在这里，您可以亲身体验当一名店主（或者是苦逼的电商运营），进行品类/商品的添加、删除及上下架，
    </h2>
    <h2>
      员工账号的添加删除，权限的设置等操作，还可查看小店的收入，以制定最适合您的商业策略。
    </h2>
    <h6>ps:打开控制台（F12）接收彩蛋哦~</h6>
  </div>
</template>

<script>
import logo from "../Images/logo.png";
export default {
  data(){
    return {
      logo,
    }
  }
};
</script>

<style lang='less' scoped>
.home {
  position: relative;
  top: 50%;
  transform: translateY(-200px);
  h1,
  h2,
  h6 {
    text-align: center;
  }
  h1 {
    font-size: 45px;
    font-weight: bold;
    margin-bottom: 50px;
  }
  h2 {
    font-size: 25px;
    &:last-of-type {
      margin-bottom: 50px;
    }
  }
  img {
    left: 50%;
    transform: translateX(-350px) rotate(-50deg);
    top: -55px;
    position: absolute;
    width: 90px;
    height: 90px;
  }
}
</style>