<template>
  <el-card class="pageProduct" ref="pageProduct">
    <div slot="header" class="clearfix">
      <template>
        <el-select v-model="optionValue" class="select">
          <el-option label="按名称搜索" value="productName" />
          <el-option label="按描述搜索" value="productDesc" />
        </el-select>
        <el-input v-model="inputValue" placeholder="关键字" class="input" />
        <el-button
          type="primary"
          @click="
            pageNum = 1;
            getProductLists('search');
          "
          >搜索</el-button
        >
      </template>

      <el-button class="add" type="primary" @click="showSecondPage('create')">
        <i class="el-icon-plus" /> 添加商品
      </el-button>
    </div>
    <div>
      <el-table
        :data="productList"
        border
        style="width: 100%"
        row-class-name="table-row"
        stripe
      >
        <el-table-column prop="name" label="商品名称" width="264" />
        <el-table-column prop="desc" label="商品描述" min-width="548" />
        <el-table-column
          prop="price"
          label="价格"
          width="240"
          :formatter="(_, __, price) => `￥${price}`"
        />
        <el-table-column label="状态" width="240">
          <template slot-scope="scopeStatus">
            <el-button
              size="small"
              plain
              style="padding: 10px 10px; margin-right: 15px"
              @click="productStatusChange(scopeStatus.row)"
            >
              {{ scopeStatus.row.status ? "下架" : "上架" }}
            </el-button>
            <span>{{ scopeStatus.row.status ? "在售" : "已下架" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <LinkButton
              children="修改商品信息"
              @click.native="showSecondPage('create', scope.row)"
            />
            <LinkButton
              children="查看详情"
              @click.native="showSecondPage('retrieve', scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="Math.ceil(total / pageSize) * 10"
        :current-page='pageNum'
        @current-change="pageChange"
        class="pagination"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { Loading } from "element-ui";
import {
  reqProductList,
  reqProductSearchByDesc,
  reqProductSearchByName,
  reqProductStatusUpdate,
} from "../../api";
import LinkButton from "../../Components/RenderLinkButton";
import { PAGE_SIZE } from "../../constances";

export default {
  data() {
    return {
      optionValue: "productName",
      inputValue: "",
      productList: [],
      pageNum: 1,
      total: 0,
      pageSize: PAGE_SIZE,
    };
  },
  methods: {
    //获取全部或搜索的商品分页列表
    async getProductLists(type = "all") {
      let result;
      const pageSize = PAGE_SIZE;
      //获取列表/根据名字/描述搜索
      if (!this.inputValue.trim()) {
        result = await reqProductList({
          pageNum: this.pageNum,
          pageSize,
        });
      } else {
        this.optionValue === "productDesc"
          ? (result = await reqProductSearchByDesc([
              this.inputValue,
              this.pageNum,
              pageSize,
            ]))
          : (result = await reqProductSearchByName({
              name: this.inputValue,
              pageSize,
              pageNum: this.pageNum,
            }));
      }
      const { list, total } = result;
      if (result && list) {
        this.productList = list;
        this.total = total;
      } else this.$message.error("获取商品列表信息失败，请稍后重试~");
    },

    //分页器改变的回调
    pageChange(pageNum) {
      this.pageNum = pageNum;
      this.getProductLists();
    },

    //跳转二级页面
    showSecondPage(type, data) {
      if (type === "retrieve") {
        this.$router.push({ name: "productRetrieve", params: data });
      } else {
        this.$router.push({ name: "productCreate", params: data || {} });
      }
    },

    //商品上架下架的回调
    async productStatusChange(product) {
      let { id, status } = product;
      status = status ? 0 : 1;
      const result = await reqProductStatusUpdate(id, { status });
      console.log(this);
      if (result !== 1) this.$message.error("对商品操作失败，请稍后重试~");
      else this.getProductLists();
    },
  },
  components: {
    LinkButton,
  },
  beforeMount() {
    //初次加载获取列表数据
    this.getProductLists();
  },
};
</script>

<style lang='less'>
.pageProduct {
  .select {
    width: 200px !important;
    margin-right: 15px;
  }
  .input {
    width: 200px !important;
    margin-right: 15px;
  }
  .add {
    float: right;
  }
  .table-row {
    height: 64px;
  }
  .pagination {
    float: right;
    margin: 17px 0;
  }
}
</style>