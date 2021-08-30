<template>
  <div ref="pageRole">
    <el-card>
      <div slot="header" class="clearfix">
        <el-button type="primary" class="create-button" @click="showModal(1)">
          创建角色
        </el-button>
      </div>
      <div>
        <el-table
          :data="roleList"
          style="width: 100%"
          row-class-name="table-row"
        >
          <el-table-column prop="name" label="角色名称" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column prop="authTime" label="授权时间" />
          <el-table-column prop="authName" label="授权人" />
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <LinkButton
                children="设置权限"
                @click.native="showModal(2, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog
      title="添加角色"
      :visible.sync="isCreateVisible"
      width="30%"
      :show-close="false"
    >
      <el-input
        v-model="currentRole.name"
        placeholder="请输入角色名称"
      ></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设置权限"
      :visible.sync="isAuthVisible"
      width="30%"
      :show-close="false"
    >
      <el-input v-model="currentRole.name" disabled />
      <el-tree
        ref="treeNode"
        :data="menuConfig"
        node-key="key"
        show-checkbox
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="currentRole.menusArr"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import LinkButton from "../Components/RenderLinkButton";
import { reqRoleList, reqCreateRole, reqUpdateRole } from "../api";
import { putServerTime, formatTime } from "../utils/formatTime";
import menuConfig from "../utils/menuConfig.js";
export default {
  data() {
    return {
      roleList: [],
      isCreateVisible: false,
      isAuthVisible: false,
      currentRole: {
        name: "",
      },
      menuConfig,
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapState("userInfo", ["user"]),
  },
  methods: {
    //发送请求获取角色列表
    async getRoleList() {
      const result = await reqRoleList();
      const { status, data } = result;
      if (status === 0) this.roleList = data;
      else Vue.prototype.$message.error("获取角色列表失败，请稍后重试");
    },

    //设置权限的初始值
    getDefaultInfo(chosenRole) {
      const { id, name, menus, createTime } = this.roleList.find(
        (item) => item.id === chosenRole.id
      );
      const menusArr = menus.split(",");
      if (!menusArr[menusArr.length - 1]) menusArr.pop();
      if (menusArr.indexOf("/home") === -1) menusArr.unshift("/home");
      this.currentRole = {
        id,
        name,
        menusArr,
        createTime,
      };
      if (this.$refs.treeNode) {
        this.$refs.treeNode.setCheckedKeys(menusArr);
      }
    },

    //展示模态对话框
    showModal(value, roleItem) {
      if (value === 1) {
        this.isCreateVisible = true;
      } else {
        this.isAuthVisible = true;
        this.getDefaultInfo(roleItem);
      }
    },

    //取消模态对话框
    handleCancel() {
      this.isCreateVisible = false;
      this.isAuthVisible = false;
      this.currentRole = {
        name: "",
      };
    },

    //确认模态对话框
    async handleSubmit() {
      if (this.isCreateVisible) {
        //创建角色的回调
        const roleName = this.currentRole.name;
        const result = await reqCreateRole(roleName);
        if (result === "success") {
          Vue.prototype.$message.success("添加角色成功");
          this.handleCancel();
          this.getRoleList();
        } else {
          Vue.prototype.$message.error("添加角色失败，请稍后再试");
        }
      } else {
        //设置权限的回调
        const authName = this.user.name;
        const { id, name, createTime } = this.currentRole;
        const menus = this.$refs.treeNode.getCheckedKeys().join(",");
        const result = await reqUpdateRole(id, {
          name,
          authName,
          authTime: putServerTime(formatTime(Date.now()),13),
          createTime: putServerTime(createTime,13),             //修正服务器时间
          menus,
          v: 0,
        });
        if (result === "success") {
          //判断设置的是否为自我权限
          if (id === this.user.roleId * 1) {
            Vue.prototype.$message.error("权限更新成功，请重新登陆");
            this.$store.dispatch("userInfo/logout");
            this.$router.push("/login");
          } else {
            Vue.prototype.$message.success("权限设置成功");
            this.handleCancel();
            this.getRoleList();
          }
        } else Vue.prototype.$message.error("权限设置失败，请稍后重试");
      }
    },
  },
  components: {
    LinkButton,
  },
  beforeMount() {
    //初次加载获取列表数据
    this.getRoleList();
  },
  mounted() {
    // console.log(this.roleList);
  },
};
</script>

<style>
.create-button {
  margin-right: 15px;
}
</style>