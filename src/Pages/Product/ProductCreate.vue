<template>
  <el-card class="pageProduct">
    <div slot="header" class="clearfix">
      <template>
        <i class="el-icon-back back-icon" @click="backToPrimary" />
        {{ productInfo.name ? "修改商品信息" : "添加商品信息" }}
      </template>
    </div>
    <el-form :model="productInfo" :rules="rules">
      <el-form-item label="商品名称:" prop="name">
        <el-input v-model="productInfo.name" class="input" clearable />
      </el-form-item>
      <el-form-item label="商品描述:" prop="desc">
        <el-input
          v-model="productInfo.desc"
          type="textarea"
          class="input input-area"
          clearable
        />
      </el-form-item>
      <el-form-item label="商品价格:" prop="price">
        <el-input v-model="productInfo.price" type="number" class="input" />
      </el-form-item>
      <el-form-item label="商品分类:" prop='category'>
        <el-cascader
          :value="productInfo.categoryIds"
          v-model="productInfo.categoryIds"
          :options="primaryCategory"
          :props="props"
          @change="handleChange"
          class="input"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品图片:">
        <span class="item-info">暂不支持设置商品图片</span>
      </el-form-item>
      <el-form-item label="商品详情:">
        <span class="item-info">
          暂不支持设置商品详情，前往
          <a href="http://182.61.132.190/#/product/create">react版本</a>
          体验富文本编辑器
        </span>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitProduct">提交</el-button>
  </el-card>
</template>

<script>
import {
  reqRetrieveCategory,
  reqProductUpdate,
  reqProductCreate,
} from "../../api";
export default {
  data() {
    return {
      productInfo: {
        categoryIds: [0],
      },
      props: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          if (!node.data) return;
          const { label, value } = node.data;
          //获取二级列表
          let options = await this.getCategory(value);
          if (!options) {
            options = [
              {
                label,
                value,
                leaf: true,
              },
            ];
          }
          resolve(options);
        },
      },
      primaryCategory: [],
      secondaryCategory: [],
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入商品描述", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        category: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
      },
    };
  },
  methods: {
    //更改了cascader
    handleChange(Ids) {
      this.productInfo.categoryIds = Ids;
    },

    //返回一级目录
    backToPrimary() {
      this.$router.back();
    },

    //获取一级/二级菜单信息
    async getCategory(parentId) {
      let options = [];
      const result = await reqRetrieveCategory(parentId);
      if (result.status === 0) {
        options = result.data.map((item) => ({
          value: item.id,
          label: item.name,
          leaf: !!parentId, //是否叶子（无分支）
        }));
      }
      // if (!parentId) {
      //   //筛选添加children
      //   const { pcategoryId, categoryId } = this.productInfo;
      //   const secondaryCategory = this.getCategory(categoryId * 1);
      //   const composeCategory = pcategoryId * 1 ? pcategoryId : categoryId;
      //   options.forEach((item) => {
      //     if (item.value === composeCategory * 1) item.children = secondaryCategory;
      //   });
      // }
      return options;
    },

    //提交
    async submitProduct() {
      //表单提交成功的回调
      let {
        name,
        desc,
        price,
        categoryIds,
        id,
        idStr,
        status,
        detail,
      } = this.productInfo;
      //处理pcategoryId及categoryId
      let pcategoryId, categoryId;
      if (categoryIds.length === 1 || categoryIds[0] === categoryIds[1]) {
        pcategoryId = "0";
        categoryId = categoryIds[0] + "";
      } else {
        pcategoryId = categoryIds[0] + "";
        categoryId = categoryIds[1] + "";
      }
      //处理富文本
      detail = detail || "";
      //发送请求
      let result;
      if (id) {
        //发送修改商品的请求
        result = await reqProductUpdate(id, {
          idStr,
          name,
          status,
          desc,
          price,
          pcategoryId,
          categoryId,
          detail,
        });
      } else {
        //发送添加商品的请求
        result = await reqProductCreate({
          name,
          desc,
          price,
          pcategoryId,
          categoryId,
          detail,
          status: 0,
        });
      }
      //处理响应
      if (result.status === 0) {
        this.$message.success("信息提交成功");
        this.$router.back();
      } else {
        this.$message.error("上传失败，请稍后重试");
      }
    },
  },
  async beforeMount() {
    //获取商品信息
    if (this.$route.params.id) {
      this.productInfo = this.$route.params;
      const { pcategoryId, categoryId } = this.productInfo;
      this.productInfo.categoryIds =
        pcategoryId * 1
          ? [pcategoryId * 1, categoryId * 1]
          : [categoryId * 1, categoryId * 1];
    }
    //获取一级商品列表信息
    this.primaryCategory = await this.getCategory(0);
  },
};
</script>

<style lang='less'>
.pageProduct {
  .input {
    width: 500px !important;
    margin-left: 20px;
  }
}
</style>