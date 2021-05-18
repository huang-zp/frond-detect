<template>
    <div class="fillcontain">
      <div class=".row_base">
        <search-item @searchList="taskCommandPost" ref="command"></search-item>          <div class="table_container">
      </div>
      <div class="logContainer">

        <el-row :gutter="12">
          <el-col v-for="result in results" :span="8" class="el-col-card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-button v-if="result.status" type="success" icon="el-icon-check" circle></el-button>
                <el-button v-else type="danger" icon="el-icon-close" circle></el-button>
                <el-tooltip placement="bottom" effect="light">
                  <div slot="content" v-html="result.result">  </div>
                  <el-button type="info round" style="float: right;">查看输出</el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <span><b>{{result.command}}</b></span>
              </div>
            </el-card>

          </el-col>

        </el-row>
      </div>
        </div>
    </div>
</template>

<script>
    import searchItem from "@/page/userList/components/searchItem";
    import { mapGetters } from "vuex";
    import {commandPost} from "@/api/dashboard";

    export default {
      components: {
        searchItem
      },
        data(){
            return {
                loading:true,
            }
        },
        created(){
        },
        computed:{
          ...mapGetters(['results'])
        },
        mounted(){
        },
        methods: {
          taskCommandPost() {
            if (this.$refs['command'].command.command !== null)
            {
              let args = {
                "command": this.$refs['command'].command.command
              }
              commandPost(args).then(res => {
                let result = {
                  "command": res.command,
                  "result": res.result,
                  "status": res.status
                }

                this.$store.commit('SET_RESULTS',result);
              })
            }
          }
        },
    }
</script>

<style lang="less" scoped>

    .logContainer{
      padding: 10px;
      background: #fff;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 6px;
    }
    .text {
      font-size: 18px;
      white-space:nowrap;        //强制换行（中英文有效）
      overflow:hidden;           //隐藏超出的内容
      text-overflow:ellipsis;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    //.box-card {
    //  width:400px;
    //}

    .el-col-card {
      margin-bottom: 18px;
      height: 130px;
    }
</style>



