<template>
  <div class="search_container searchArea">
    <el-form
        :inline="true"
        :model='form_data'
        :rules="rules"
        ref="form_data"
        @submit.native.prevent
        class="demo-form-inline search-form">
      <el-form-item>
        <el-input v-model="form_data.ips" style="width: 290px" size="normal" placeholder="扫描IP/IP段"  @keyup.enter.native='onAutoScan()'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary " size ="normal" icon="search" @click='onAutoScan()' :disabled="flag">开始扫描</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="success " size ="normal" icon="search" @click='onCustomScan()' :disabled="flag">自定义扫描</el-button>
      </el-form-item>

      <el-form-item class="btnRight">
        <el-button type="warning"  size ="normal" icon="view" @click='onFreshen()'>点击刷新</el-button>
        <el-button type="danger " v-if="!flag" size ="normal" icon="view" @click='onBatchDelUser()' :disabled="flag"> <a :href=report>列表展示</a></el-button>
        <el-button type="danger " v-if="flag" size ="normal" icon="view" @click='onCancel()'>取消扫描</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {customScanPost, autoScanPost, cancelScanGet} from "@/api/dashboard";
import report from "@/page/index/components/report";

export default {
  name:'searchItem',
  data(){
    return {
      report:report,
      form_data:{
        ips:''
      },
      rules: {
        ips: [
          {required: true, message : 'IP不能为空！',trigger : 'blur'}
        ],
      }
    }
  },
  props: [
    "flag"
  ],
  created(){
  },
  methods:{
    onCustomScan(){
      this.$emit("customScan");
        },
    onAutoScan(){
      let args = {
        "ips": this.form_data.ips
      }
      autoScanPost(args).then(res => {
        if (!res.status) {
          this.$message({
            message: '请输入合法的IP或者IP段',
            type: 'warning'
          });
        } else {
          this.$emit("autoScan");
        }

      })
    },
    onFreshen() {
      this.$emit("freshen");
    },
    onCancel() {
      cancelScanGet().then(res => {
        if (res.status) {
          this.$emit("cancel");
          this.notifyInstance = this.$notify({
            title: '取消成功',
            message: '已Kill后台扫描任务，并清除了临时文件',
          })
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