<template>
  <div>
		<section class="data_section" ref="data_section">
          <div class="row_left row_base">
            <search-item @customScan="showScanTaskDialog()" @autoScan="autoScan()" @cancel="cancel()" @freshen="freshen()" :flag="flag"></search-item>
          </div>
        <el-row :gutter="10" class="row_list">
            <el-col :span="8">
              <div class="row_left row_base">
                <el-col :span="12">
                  <div class="pay taxBgcolor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">扫描开始时间</p>
                      <p class="number">{{cartPart.start_time}}<span class="perTitle"></span></p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-shijian" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="pay taxBgcolor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">扫描结束时间</p>
                      <p class="number">{{cartPart.end_time}}<span class="perTitle"></span></p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-shijian" />
                    </div>
                  </div>
                </el-col>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="row_right row_base">
                <el-col :span="6">
                  <div class="saleBgcolor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">扫描机器总量</p>
                      <p class="number">{{cartPart.host_total}}<span class="perTitle">(IP)</span></p>
                      <p class="perTitle">本次扫描IP总数</p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-suoyou" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="linkBgColor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">在线机器总量</p>
                      <p class="number">{{cartPart.host_up}}<span class="perTitle">(IP)</span></p>
                      <p class="cardText">本次扫描在线的IP</p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-zx" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="keleBgColor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">离线机器总量</p>
                      <p class="number">{{cartPart.host_down}}<span class="perTitle">(IP)</span></p>
                      <p class="cardText">本次扫描离线的IP</p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-jiechuduanwang" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="likeBgcolor data_list rflex">
                    <div class="leftItem cflex wflex">
                      <p class="investor">开放服务总数</p>
                      <p class="number">{{cartPart.service}}<span class="perTitle">(服务)</span></p>
                      <p class="cardText">本次扫描到的服务</p>
                    </div>
                    <div class="rightItem">
                      <icon-svg icon-class="icon-wangluofuwu" />
                    </div>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-row>
        <el-row :gutter="10" class="row_list order_list">
          <el-col :span="7">
            <log-list :summaryPart="summaryPart"></log-list>
          </el-col>
          <el-col :span="17">
            <word-cloud-chart :wordCloudPart="wordCloudPart"></word-cloud-chart>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="row_list order_list">
          <el-col :span="12">
              <pie-chart type="porttype" id="port"  v-if="!flag" :openPortPart="openPortPart"></pie-chart>
          </el-col>
          <el-col :span="12">
              <pie-chart id="server"  v-if="!flag" :openServicePart="openServicePart"></pie-chart>
          </el-col>

        </el-row>
        <addPayloadDialog  v-if="scanTaskDialog.show" @customScan="customScan()" :isShow="scanTaskDialog.show" :dialogRow="scanTaskDialog.dialogRow" @closeDialog="hideScanTaskDialog"></addPayloadDialog>

    </section>
  </div>
</template>

<script>
	import echarts from 'echarts'
	import salesTable from "./components/salesTable";  // 销售数据表格
	// import commentList from "./components/commentList";  // 用户评论列表
	import cardList from "./components/cardList";  // card列表
	import logList from "./components/logList";  // 日志列表
  import searchItem from "@/page/index/components/searchItem";
	import barChart from 'cps/echarts/barChart' // 用户投资类型 柱状图
	import pieChart from 'cps/echarts/pieChart' // 用户投资类型 饼状图
	import radarChart from 'cps/echarts/radarChart' // 用户投资类型 雷达图
	import lineChart from 'cps/echarts/lineChart' // 用户投资类型 折线图
  import wordCloudChart from "cps/echarts/wordCloudChart";
  import orderSource from "cps/echarts/orderSource";
  import addPayloadDialog from "@/page/index/components/addPayloadDialog";
	import { github } from "@/utils/env";
  import {dashboardGet, autoScanGet} from "@/api/dashboard";
  export default {
    	data(){
    		return {
			    github:github,
          scanTaskDialog:{
            show:false,
            dialogRow:{}
          },
          cartPart:{},
          summaryPart:[],
          wordCloudPart:[],
          openPortPart:false,
          openServicePart:false,
          flag:false,
          notifyInstance:null
    		}
    	},
    	components: {
		   salesTable,
		   // commentList,
		   cardList,
		   logList,
		   barChart,
		   pieChart,
		   radarChart,
		   lineChart,
        searchItem,
        orderSource,
        wordCloudChart,
        addPayloadDialog
		},	
		created(){
		},
    destroyed() {
      this.closeTaskingMessage()
    },
    mounted(){
      this.getDashboard()
		},
    	methods: {
        taskingMessage() {
          this.notifyInstance = this.$notify({
            title: '正在扫描',
            message: '扫描任务正在执行，稍后刷新页面查看结果',
            duration: 0,
            showClose: false
          })
        },
        closeTaskingMessage() {
          this.notifyInstance.close()
        },
        showScanTaskDialog(){
          this.scanTaskDialog.show = true;
        },
        hideScanTaskDialog(){
          this.scanTaskDialog.show = false;
        },
        getDashboard(){
          // NProgress.start()
          dashboardGet().then(res => {
            console.log(res);
            this.cartPart = res.cart_part
            this.summaryPart = res.summary_part
            this.wordCloudPart = res.word_cloud_part
            this.openPortPart = res.open_port_part
            this.openServicePart = res.open_service_part
            this.flag = res.flag
            if (this.flag){
              this.taskingMessage()
            }
          })
        },
        autoScan(){
          this.getDashboard()
        },
        customScan(){
          this.getDashboard()
        },
        cancel(){
          this.closeTaskingMessage()
          this.getDashboard()
        },
        freshen(){
          this.closeTaskingMessage()
          this.getDashboard()
        }
    	}
    }
</script>

<style lang="less" scoped>

	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
      .cloudArea{
        width: 100%;
        height: 370px;
        background: #fff !important;
        border-radius: 6px;
        box-sizing: border-box;
        overflow: hidden;
      }
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 50px;
				}
			}
		    .number{
				font-size: 18px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
     
	}
  
</style>
