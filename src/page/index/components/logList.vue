
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <icon-svg icon-class="icon-zongti" />
        <span> 总体信息</span>
      </div>
      <div class="logArea el-scrollbar">
            <div class="item" v-for="host in summaryPart" :key="host.IP">
              <p class="timeArea">
                <span class="title">HOST：</span>
                <span class="title" style=""><b>{{host.IP}}</b></span>
                <span>&emsp;&emsp;</span>
              </p>
              <p class="timeArea">

                <span class="title">MAC ：</span>
                <span class="title type">{{host.MAC}}</span>
                <span>&emsp;&emsp;</span>
                <span class="title">OPEN PORTS：</span>
                <span class="title type">{{host.Services}}</span>
              </p>
<!--              <p class="timeArea">-->
<!--                <span class="title">载荷描述：</span>-->
<!--                <span class="title">{{item.desc}}</span>-->
<!--              </p>-->
<!--              <div class="logContent">-->
<!--                  <p class="title">更新内容：</p>-->
<!--                  <ul class="logUl">-->
<!--                    <li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li>-->
<!--                </ul>-->
<!--              </div>-->
          </div>
      </div>
   
  </el-card>
  </div>
</template>

<script>
  // import logsData from "@/assets/datas/logs.json";
  import { github } from "@/utils/env";
  export default {
    name:'logList',
    data() {
      return {
        logsData:[],
        github:github,
        newPayloads:[1,2,3,4,5]
      };
    },
    props: {
      summaryPart:Array
    }
  }
</script>

<style lang="less" scoped>
.logContainer{
    padding: 10px;
    background: #fff;
    box-sizing: border-box;
    height:370px;
    max-height: 370px;
    overflow: hidden;
    border-radius: 6px;
    .logArea{
       overflow: auto;
       height: 100%;
    }
    .item{
       .title{
         font-size: 12px;
       }
       .time{
         color:#87DE75;
       }
       .author{
         color: #84d9d2;
       }
      .type{
        color: #4ca4bd;
      }
        .logContent{
          .logUl{
            padding-left: 30px;
            li{
              font-size: 12px;
              list-style: disc;
              line-height: 20px;
            }
          }
      }
    }
}
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

