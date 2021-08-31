<template>
  <el-card class="pageProduct">
    <div slot="header" class="clearfix">
      <template>
        <i class="el-icon-back back-icon" @click="backToPrimary" /> 商品详情
      </template>
    </div>
    <div>
      <div>
        <span>商品名称:</span>
        <span class="item-info">{{ productInfo.name }}</span>
      </div>
      <el-divider class="divider" />
      <div>
        <span>商品状态:</span>
        <span class="item-info"
          >{{ productInfo.status ? "在售" : "已下架" }}
        </span>
      </div>
      <el-divider class="divider" />
      <div>
        <span>商品价格:</span>
        <span class="item-info">￥{{ productInfo.price }}</span>
      </div>
      <el-divider class="divider" />
      <div>
        <span>商品图片:</span>
        <span class="item-info">暂无</span>
      </div>
      <el-divider class="divider" />
      <div>
        <span>商品详情:</span>
        <span
          class="item-info"
          :dangerouslySetInnerHTML="{ __html: productInfo[detail] }"
        ></span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      productInfo: {},
    };
  },
  methods: {
    backToPrimary() {
      this.$router.back();
    },
  },
  beforeMount() {
    this.productInfo = this.$route.params;
  },
};
</script>

<style lang='less'>
.pageProduct {
  .back-icon {
    margin: 0 15px;
    cursor: pointer;
  }
  .divider {
    opacity: 0.5;
  }
  .item-info {
    margin-left: 20px !important;
  }
}
</style>