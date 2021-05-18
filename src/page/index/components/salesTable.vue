<template>
  <div class="salesTable">
    <el-table
      :data="tableData"
      stripe
      height="300"
      style="width: 100%">
      <el-table-column
        class-name="salesUsername"
        prop="username"
        label="导出者"
        width="150"
      >
        <template slot-scope="scope">
            <img class="userImg" :src="userImg" alt="tuxiang"/>
<!--            {{(scope.row.username).substring(0,12)}}-->
          刘伟达
        </template>
      </el-table-column>
      <el-table-column
        class-name="salesPrice"
        prop="price"
        label="导出载荷名称"
        width="350"
      >
        <template slot-scope="scope">
<!--          <span v-if="scope.row.status === 1" class="saleColor"> {{scope.row.price}}</span>-->
<!--          <span v-if="scope.row.status === 2" class="taxColor"> {{scope.row.price}}</span>-->
<!--          <span v-if="scope.row.status === 3" class="extenedColor"> {{scope.row.price}}</span>-->
<!--          <span v-if="scope.row.status === 4" class="likeColor"> {{scope.row.price}}</span>-->
          <span class="likeColor"> CVE-2015-1641 Office Word拒绝服务漏洞</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="导出时间"
        width="160"
      >
        <template slot-scope="scope">
           <icon-svg icon-class="icontime" />
           {{scope.row.date}}
        </template>
      </el-table-column>
      <el-table-column
        class-name="salesStatus"
        prop="status"
        label="导出状态"
        >
        <template slot-scope="scope">
<!--          <span v-if="scope.row.status === 1" class="saleBgcolor">SALE</span>-->
<!--          <span v-if="scope.row.status === 2" class="taxBgcolor">TAX</span>-->
<!--          <span v-if="scope.row.status === 3" class="extenedBgcolor">EXTENDED</span>-->
<!--          <span v-if="scope.row.status === 4" class="likeBgcolor">LIKE</span>-->
          <span class="likeBgcolor">SUCCESS</span>
        </template>
      </el-table-column>
    
    </el-table>
  </div>
</template>

<script>
  import userImg from "@/assets/img/avatar-3.png";

  export default {
    data() {
      return {
        tableData: [1,2,3,4],
        userImg:userImg
      }
    },
    mounted(){
        // this.getSalesList();
    },
    methods:{
        // 获取列表数据
        // getSalesList(){
        //     getSalesTableList({}).then(res => {
        //         console.log(res);
        //         this.pageTotal = res.data.total
        //         this.tableData = res.data.list
        //     })
        // },
    }
  }
</script>

<style lang="less" scoped>

</style>