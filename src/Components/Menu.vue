<template>
  <el-col>
    <el-menu
      v-for="item in menuConfig"
      :key="item.key"
      :index="item.key"
      :router="true"
      :default-active="activeKey"
      background-color="#ffe2e7"
      text-color="#684b50"
      active-text-color="#ff9bc3"
    >
      <template v-if="item.children">
        <el-submenu
          v-if="
            !!item.children.filter((cItem) => menus.indexOf(cItem.key) !== -1)
              .length
          "
          :index="item.key"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="cItem in item.children">
            <el-menu-item
              v-if="menus.indexOf(cItem.key) !== -1"
              :index="cItem.key"
              :key="cItem.key"
              @click="itemClick(cItem.key)"
            >
              <i :class="cItem.icon"></i>
              <span slot="title">{{ cItem.title }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-if="!item.children">
        <el-menu-item
          v-if="menus.indexOf(item.key) !== -1"
          :index="item.key"
          :key="item.key"
          @click="itemClick(item.key)"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-col>
</template>

<script>
import { mapState } from "vuex";
import menuConfig from "../utils/menuConfig";
export default {
  data() {
    return {
      menuConfig,
      activeKey: this.$route.path,
    };
  },
  computed: {
    menus(){
      return this.$store.state.userInfo.user.menus
    }
  },
  methods: {
    itemClick(key) {
      this.activeKey = key;
    },
  },
};
</script>

<style>
</style>