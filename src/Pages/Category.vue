<template>
  <div ref="pageCategory">
    <el-card>
      <div slot="header" class="clearfix">
        <template v-if="currentCategory.parentId === 0">
          <span>一级分类菜单</span>
        </template>
        <template v-if="currentCategory.parentId !== 0">
          <LinkButton
            @click.native="backToPrimaryCategory"
            children="一级分类菜单"
          />
          <i class="el-icon-arrow-right" />
          <span>{{ currentCategory.parentName }}</span>
        </template>
        <el-button
          style="float: right; padding: 5px 10px"
          type="primary"
          @click="showCreateModal"
        >
          <i class="el-icon-plus" /> 添加
        </el-button>
      </div>
      <div>
        <el-table
          :data="
            currentCategory.parentId === 0 ? primaryCategory : secondaryCategory
          "
          border
          style="width: 100%"
          row-class-name="table-row"
        >
          <el-table-column prop="name" label="菜单名"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <LinkButton
                children="修改菜单名"
                @click.native="showUpdateModal(scope.row)"
              />
              <LinkButton
                v-if="currentCategory.parentId === 0"
                children="查看菜单"
                @click.native="getSecondaryCategory(scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog
      :title="visible === 1 ? '添加菜单项' : '修改项'"
      :visible.sync="isModalShow"
      width="30%"
      :show-close="false"
    >
      <el-form label-width="80px" size="mini">
        <el-form-item v-if="visible === 1" label="所属分类">
          <el-select
            v-model="currentCategory.createParentId"
            placeholder="请选择"
            class="select"
          >
            <el-option :key="0" label="一级分类" :value="0" />
            <el-option
              v-for="item in primaryCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="currentCategory.name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Loading } from "element-ui";
import LinkButton from "../Components/RenderLinkButton";
import {
  reqRetrieveCategory,
  reqUpdateCategory,
  reqCreateCategory,
} from "../api";
export default {
  data() {
    return {
      primaryCategory: [],
      secondaryCategory: [],
      currentCategory: {
        id: "", //当前操作的菜单项id，只有修改时有值
        name: "", //当前操作的菜单项名字
        parentId: 0,
        parentName: "一级分类",
        createParentId: 0,
        createParentName: "一级分类",
      },
      visible: 0, //0代表不显示模态对话框，1代表显示添加，2代表显示修改
    };
  },
  computed: {
    isModalShow() {
      return !!this.visible;
    },
  },
  methods: {
    //在一级列表中，根据id寻找name
    getNameById(parentId) {
      const list = this.primaryCategory;
      if (!parentId) return "一级分类";
      const { name } = list.find((item) => item.id === parentId);
      return name;
    },

    //获取一级/二级菜单信息
    async getCategory() {
      let loadingInstance = Loading.service({
        target: this.$refs.pageCategory,
      });
      const { parentId } = this.currentCategory;
      const result = await reqRetrieveCategory(parentId);
      loadingInstance.close();
      if (result.status === 0) {
        parentId === 0
          ? (this.primaryCategory = result.data)
          : (this.secondaryCategory = result.data);
      }
    },

    //返回一级菜单的回调
    backToPrimaryCategory() {
      let loadingInstance = Loading.service({
        target: this.$refs.pageCategory,
      });
      setTimeout(() => {
        this.ssecondaryCategory = [];
        this.currentCategory = {
          id: "", //当前操作的菜单项id，只有修改时有值
          name: "", //当前操作的菜单项名字
          parentId: 0,
          parentName: "一级分类",
          createParentId: 0,
          createParentName: "一级分类",
        };
        loadingInstance.close();
      }, 80);
    },

    //添加的回调
    showCreateModal() {
      this.visible = 1;
    },

    //修改菜单项的回调
    showUpdateModal(category) {
      const { id, name } = category;
      this.visible = 2;
      this.currentCategory = {
        ...this.currentCategory,
        id,
        name,
      };
    },

    //查看菜单的回调
    getSecondaryCategory(category) {
      const { id: parentId, name: parentName } = category;
      this.currentCategory = {
        id: "",
        name: "",
        parentId,
        parentName,
        createParentId: parentId,
        createParentName: parentName,
      };
      this.getCategory();
    },

    //关闭模态对话框并清除数据的回调
    handleCancel() {
      this.visible = 0;
      this.currentCategory = {
        ...this.currentCategory,
        id: "",
        name: "",
        createParentId: this.currentCategory.parentId,
        createParentName: this.currentCategory.parentName,
      };
    },

    //模态对话框的提交回调
    async handleSubmit() {
      //获取数据
      let {
        visible,
        currentCategory: { id, name, parentId, createParentId },
      } = this;
      const createParentName = this.getNameById(createParentId);
      let result = {};

      //手动验证数据
      if (name.trim() === "") {
        Vue.prototype.$message.error("请检查内容");
        return;
      }

      //提交数据
      if (visible === 1) {
        result = await reqCreateCategory({
          parentId: createParentId,
          name,
          parentName: createParentName,
          categoryName: createParentId === 0 ? "一级分类" : "二级分类",
        });
      } else if (visible === 2) {
        result = await reqUpdateCategory({
          id,
          name,
          parentId: createParentId,
          parentName: createParentName,
          categoryName: createParentId === 0 ? "一级分类" : "二级分类",
        });
      }

      //处理响应
      if (result.status !== 0) {
        message.error("服务器开小差啦，请稍后再试~");
      } else {
        Vue.prototype.$message.success("提交成功");
        this.handleCancel();
        //按需刷新
        if (createParentId === parentId || createParentId === 0)
          this.getCategory();
      }
    },
  },
  components: {
    LinkButton,
  },
  beforeMount() {
    //初次获取一级菜单
    this.getCategory();
  },
};
</script>

<style lang='less'>
.table-row {
  height: 60px;
}
.select {
  width: 100%;
}
</style>