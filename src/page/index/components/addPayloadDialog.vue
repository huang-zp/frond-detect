<template>
<!--    isVisible也会触发@close-->
    <el-dialog
        :visible.sync="isVisible"
        title="自定义扫描任务"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">

            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">


              <el-form-item label="扫描主机:" prop="hosts">
                <el-input type="textarea" v-model="form.hosts" placeholder="扫描IP/IP段，多个IP请用分号隔开"></el-input>
              </el-form-item>
                <el-form-item label="扫描端口:" prop="ports">
                    <el-input type="textarea" v-model="form.ports" placeholder="扫描端口，多个端口请用分号隔开"></el-input>
                </el-form-item>
              <el-form-item label="扫描前探活:">
                  <el-radio v-model="form.alive" label='0' border size="medium">禁用</el-radio>
                  <el-radio v-model="form.alive" label='1' border size="medium">启用</el-radio>
              </el-form-item>
              <el-form-item label="使用诱骗信息:">
                  <el-radio v-model="form.info" label='0' border size="medium">禁用</el-radio>
                  <el-radio v-model="form.info" label='1' border size="medium">启用</el-radio>
              </el-form-item>
              <el-form-item label="扫描IP随机化:">
                  <el-radio v-model="form.random" label='0' border size="medium">禁用</el-radio>
                  <el-radio v-model="form.random" label='1' border size="medium">启用</el-radio>
              </el-form-item>
                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
  import {customScanPost} from "@/api/dashboard";

  export default {
      name:'addPayloadDialogs',
     components: {
     },
      data(){
          return {
            areaData:[],
            showPayloadTip: "",
            showManualTip: "",
            showInstructionsTip: "",

            isVisible: this.isShow,
            form:{
                hosts:'',
                ports: '',
                alive:'0',
                info:'0',
                random:'0'
            },
            form_rules: {
                hosts: [
                    {required: true, message : '主机不能为空！',trigger : 'blur'}
                ],
                ports: [
                  {required: true, message : '端口不能为空！',trigger : 'blur'}
                ]
            },
            //详情弹框信息
            dialog: {
                width:'400px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
      },
      created(){
      },
      mounted(){
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })
      },
      methods:{
          closeDialog(){
            this.$emit('closeDialog');
          },
          //表单提交
          onSubmit(form){
            this.$refs[form].validate((valid) => {
                if (valid) {//表单数据验证完成之i后，提交数据;
                    customScanPost(this[form]).then(res => {
                      if (res.status) {
                        this.$refs['form'].resetFields()
                        this.isVisible = false
                        this.$emit('customScan');
                      } else {
                        this.$message({
                          message: '请输入合理的IP或者端口',
                          type: 'warning'
                        })
                      }
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
</style>
