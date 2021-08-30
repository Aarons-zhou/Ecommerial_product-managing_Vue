<template>
  <div>
    <div class="admin-header-wrapper">
      <div class="admin-header-upper-layer">
        <span class="admin-header-upper-layer-wrapper">
          <span>Hello, {{ username }}</span>
          <LinkButton @click.native="confirmlogout" children="退出登录" />
        </span>
      </div>
      <div class="admin-header-lower-layer">
        <span class="admin-header-lower-layer-left">{{ title }}</span>
        <span class="admin-header-lower-layer-right">
          <span class="time">{{ time }}</span>
          <span class="time">{{ city }}</span>
          <span class="weather">{{ weather }} {{ temperature }}</span>
        </span>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="showModal"
      width="30%"
      :show-close="false"
    >
      <span>确定退出登录吗？</span>
      <span slot="footer">
        <el-button @click="isLogout(false)">取 消</el-button>
        <el-button type="primary" @click="isLogout(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LinkButton from "./RenderLinkButton";
import menuConfig from "../utils/menuConfig";
import { formatTime } from "../utils/formatTime";
import { reqIP, reqWeather } from "../api";
export default {
  data() {
    return {
      username: this.$store.state.userInfo.user.name,
      time: formatTime(new Date()),
      IP_weather: {},
      city: "",
      weather: "",
      temperature: "",
      showModal: false,
      logout: false,
    };
  },
  computed: {
    filtedPath() {
      const arr = this.$route.path.split("/");
      return arr[1] === "chart" ? `/${arr[1]}/${arr[2]}` : `/${arr[1]}`;
    },
    title() {
      let title = "首页";
      const findTitle = (arr) => {
        arr.forEach((item) => {
          if (item.children) findTitle(item.children);
          if (item.key === this.filtedPath) title = item.title;
        });
        return title;
      };
      return findTitle(menuConfig);
    },
  },
  methods: {
    //退出登录的模态框
    confirmlogout() {
      this.showModal = true;
    },
    //退出登录
    isLogout(value) {
      this.logout = value;
      this.showModal = false;
    },
    //获取并更新时间
    getTime() {
      const dateInstance = new Date();
      const time = formatTime(dateInstance);
      this.time = time;
    },
    //获取IP和天气
    async getWeather() {
      const key = "5f582d5aba14bbfabb74ef67b6e2fb04";
      //获取IP
      const resultIp = await reqIP({ key });
      const { status, adcode, infocode } = resultIp;
      if (status === "1" && infocode === "10000") {
        //根据IP获取地区及天气信息
        const resultWeather = await reqWeather({
          key,
          city: adcode,
          extensions: "base",
        });
        const { status, infocode, lives } = resultWeather;
        if (status === "1" && infocode === "10000") {
          const { province, city, temperature, weather } = lives[0];
          this.city = `${province}-${city}`;
          this.temperature = `${temperature}℃`;
          this.weather = weather;
        }
      }
    },
  },
  watch: {
    logout(value) {
      this.showModal = false;
      if (value) {
        this.$store.dispatch("userInfo/logout");
        this.$router.push("/login");
      }
      // console.log("logout", value);
    },
  },
  components: {
    LinkButton,
  },
  beforeMount() {
    //开启定时器，更新时间
    this.timer = setInterval(() => {
      this.getTime();
    }, 1000);
    //获取地区及天气信息
    this.getWeather();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang='less' scoped>
.admin-header-wrapper {
  height: 80px;

  //头部的上层
  .admin-header-upper-layer {
    position: relative;
    height: 40px;
    line-height: 40px;
    &::after {
      position: absolute;
      bottom: 0;
      content: "";
      width: 100%;
      height: 1px;
      background-color: rgb(236, 78, 104);
      display: block;
    }
    .admin-header-upper-layer-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-right: 22px;
      span {
        margin-right: 30px;
      }
    }
  }

  //头部的下层
  .admin-header-lower-layer {
    height: 40px;
    display: flex;
    justify-content: space-between;
    .admin-header-lower-layer-left {
      width: 100px;
      box-sizing: content-box;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      padding-left: 150px;
      letter-spacing: 5px;
      position: relative;
      &::after {
        content: "";
        border: 20px solid transparent;
        border-top: 20px solid rgb(255, 193, 204);
        position: absolute;
        top: 40px;
        right: 40px;
      }
    }
    .admin-header-lower-layer-right {
      line-height: 40px;
      span {
        margin-right: 20px;
        &:last-of-type {
          margin-right: 30px;
        }
      }
    }
  }
}
</style>