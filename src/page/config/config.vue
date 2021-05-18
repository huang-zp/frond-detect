<template>
  <div>
    <div class="fillcontain">

      <el-row :gutter="38" class=" order_list">

        <el-col :span="12">
          <div class="logContainer">

            <el-card class="box-card">

              <div slot="header" class="clearfix">

                <icon-svg icon-class="icon-gai" />
                <span> 更改配置</span>

              </div>
              <div class="logArea">
                <el-alert
                    style="margin-bottom: 20px; width: 380px; margin-left: auto; margin-right: auto "
                    title="更改配置前请确保没有正在扫描的任务！ "
                    type="info"
                    center="true"
                    :closable="false"
                >
                </el-alert>
                <el-form
                    ref="hostForm"
                    label-position="right"
                    label-width="80px"
                    :model="hostForm"
                    :rules="rules"
                    style="margin: auto; overflow: auto;height: 100%;width:300px;">

                  <el-form-item label="远程IP" prop="host">
                    <el-input v-model="hostForm.host" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="远程端口" prop="port">
                    <el-input v-model="hostForm.port" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="hostForm.username" size="small"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="hostForm.password" size="small" type="password"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="small" @click="submitForm('hostForm')">更新配置</el-button>
                    <el-button size="small" @click="resetForm('hostForm')">重置</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="logContainer">

            <el-card class="box-card" style="margin: 10px" v-loading="loading">
                          <div slot="header" class="clearfix">
              <el-button v-if="is_conn" type="success" icon="el-icon-check" circle></el-button>
              <el-button v-else type="danger" icon="el-icon-close" circle></el-button>
                <el-button type="primary" size= "small" style="float: right;" @click="getHostPing()">测试连接</el-button>
                          </div>

                            <div style="text-align: center">
                              <br>
                              主机：{{ currentHost }}
                            </div>
                            <el-divider></el-divider>
              <div style="text-align: center">

                端口：{{ currentPort }}
              </div>
              <el-divider></el-divider>
              <div style="text-align: center">

                  用户：{{ currentUser }}
              </div>
              <el-divider></el-divider>
            </el-card>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import {dashboardGet, hostInfoGet, hostPingGet, hostUpdatePost} from "@/api/dashboard";

export default {
  data(){
    return {
      hostForm: {
        host: '',
        port: '',
        username: '',
        password: ''
      },
      loading:false,
      currentHost: '',
      currentPort: '',
      currentUser: '',
      is_conn: true,
      rules: {
        host: [
          { required: true, message: '请输入远程IP', trigger: 'blur' },
        ],
        port: [
          { required: true, message: '请输入远程端口', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    };
  },
  components: {
  },
  created(){
  },
  mounted(){
    this.getHostInfo()
    this.getHostPing()
  },
  methods: {
    submitForm(hostForm) {
      this.$refs[hostForm].validate((valid) => {
        if (valid) {
          hostUpdatePost(this[hostForm]).then(res => {
            if (res.status) {
              this.$refs['hostForm'].resetFields()
              this.$message({
                message: '配置信息修改成功',
                type: 'success'
              })
              this.getHostInfo()
              this.getHostPing()


            } else {
              this.$message({
                message: '请输入合理的IP或者端口',
                type: 'warning'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getHostInfo(){
      hostInfoGet().then(res => {
        this.currentHost = res.host
        this.currentPort = res.port
        this.currentUser = res.user
      })
    },
    getHostPing(){
      this.loading = true
      hostPingGet().then(res => {
        this.is_conn = res.status
      }).catch(res => {
        this.is_conn = false
      }).finally(() => {
        this.loading = false
      })
    },
  }
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
  font-size: 25px;
  white-space:nowrap;        //强制换行（中英文有效）
  overflow:hidden;           //隐藏超出的内容
  text-overflow:ellipsis;
}

.item {
  margin: 0 auto;
  text-align:center;
}


//.box-card {
//  width:400px;
//}

.el-col-card {
  margin-bottom: 18px;
  height: 130px;
}
</style>
