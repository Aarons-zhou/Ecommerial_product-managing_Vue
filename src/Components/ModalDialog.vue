<template>
  <el-dialog
    title="提示"
    :visible.sync="showModal"
    width="30%"
    :show-close="false"
  >
    <span>{{ context }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="callback(false)">取 消</el-button>
      <el-button type="primary" @click="callback(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  // computed:{
  //   callback(value){
  //     if(this.type==='logout') {
  //       console.log(this.type);
  //       return this.isLogout(value)
  //     }
  //     return () => {}
  //   }
  // },
  watch:{
    type(){
      console.log('changed');
      if(this.type==='logout') this.callback = this.isLogout
    }
  },
  props: ["showModal", "isLogout", "context", "type"],
};
</script>

<style>
</style>