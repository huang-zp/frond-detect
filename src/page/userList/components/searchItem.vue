<template>
  <div class="search_container searchArea">
    <el-form
        :inline="true"
        :model='command'
        :rules="rules"
        ref="search_data"
        @submit.native.prevent
        class="demo-form-inline search-form">
        <el-form-item>
          <el-input v-model="command.command" style="width: 380px" size="medium" placeholder="命令"  @keyup.enter.native='onScreeoutUser("search_data")'></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" size ="medium" icon="search" @click='onScreeoutUser("search_data")'>命令下发</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'searchItem',
  data(){
    return {
      command:{
        command:null
      },
      rules: {
        command: [
          { required: true, message: '请输入合法Linux命令', trigger: 'blur' },
        ]
      }
    }
  },
  computed:{
    ...mapGetters(['searchUserBtnDisabled']),
  },
  created(){
  },
  methods:{
    onScreeoutUser(searchForm){
      this.$refs[searchForm].validate((valid) => {
        if (valid) {
          this.$emit("searchList");
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search_container{
  margin-bottom: 20px;
}
.btnRight{
  float: right;
  margin-right: 0px !important;
}
.searchArea{
  background:rgba(255,255,255,1);
  border-radius:2px;
  padding: 18px 18px 0;
}
.el-button { a, a:hover, a:focus, a:focus-within, a:active, a:visited { color: inherit; } }
</style>