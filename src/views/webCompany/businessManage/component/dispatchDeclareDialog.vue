<template>
    <div>
      <el-dialog
        title="向指定业务员派单"
        :visible.sync="sendDeclare"
        width="600px"
        @close="dispatch = false"
      >
        <el-form :model="postForm" :rules="postRules" ref="postForm" >
          <el-form-item prop="userName">
            <el-select v-model="postForm.userName" @change=getReceiverName filterable clearable placeholder="请选择报关员" style="width: 50%">
              <el-option
                v-for="item in receivers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-row style="margin-top: 40px">
            <el-col :span="6" style="line-height: 40px">
              指定接单时限:
            </el-col>
            <el-col :span="5">
              <el-form-item prop="limitDay" >
                <el-input-number v-model.number="postForm.limitDay" controls-position="right" size="small" style="width: 80%"></el-input-number>
                <span style="line-height: 40px;font-size: 18px">天</span>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item prop="limitHour">
                <el-input-number v-model.number="postForm.limitHour" controls-position="right" size="small" style="width: 80%"></el-input-number>
                <span style="line-height: 40px;font-size: 18px">时</span>
              </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-form-item prop="limitMinute">
                <el-input-number v-model.number="postForm.limitMinute" controls-position="right" size="small" style="width: 80%"></el-input-number>
                <span style="line-height: 40px;font-size: 18px">分</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sendDeclare = false">取 消</el-button>
          <el-button type="primary" @click="postDeclaration('postForm')" :loading="loading">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              sendDeclare:false,
              loading:false,
              isExOrIm:false,
              imDeclareServiceId:'',
              exDeclareServiceId:'',
              enterpriseId:'',
              enterpriseName:'',
              receiverName:'',
              postForm:{
                userName:'',
                limitDay:0,
                limitHour:0,
                limitMinute:10
              },
              receivers:[],
              postRules:{
                userName:[{ required: true, message: '请选择派单员',trigger: 'change'}],
                limitDay:[
                  { required: true, message: '请输入天数', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitHour:[
                  { required: true, message: '请输入小时', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitMinute:[
                  { required: true, message: '请输入分钟', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
              },
            }
        },
        mounted() {
          this.queryAllUserName()
        },
        methods: {
          //向指定业务员派单
          postDeclaration(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.postForm.limitDay !== 0 || this.postForm.limitHour !== 0 || this.postForm.limitMinute >= 10) {
                  this.loading = true;
                  if(this.isExOrIm === true){
                    this.$axios4.post('/dispatchOrCancelExportDeclare',{
                    enterpriseName:this.enterpriseName,
                    exDeclareServiceId:this.exDeclareServiceId,
                    receiverId:this.postForm.userName,
                    receiverName:this.receiverName,
                    day:this.postForm.limitDay,
                    hour:this.postForm.limitHour,
                    minute:this.postForm.limitMinute,
                    }).then((res) => {
                      this.loading = false;
                        console.log(res.data)
                        if(res.data.state === 1){
                          this.$message.success('派单成功!');
                          this.postForm.userName = '';
                          this.postForm.limitDay = 0;
                          this.postForm.limitHour = 0;
                          this.postForm.limitMinute = 10;
                        }else {
                          this.$message.error('派单失败!');
                        }
                        this.sendDeclare = false;
                        this.$emit('dispatchSuccess');
                      }).catch((e) => {
                        this.$message.error('请求失败!请重试');
                        this.loading = false;
                        console.log(e);
                    })
                  }else{
                      this.$axios9.post('/cancelOrDispatchDeclare',{
                      enterpriseId:this.enterpriseId,
                      imDeclareServiceId:this.imDeclareServiceId,
                      receiverId:this.postForm.userName,
                      day:this.postForm.limitDay,
                      hour:this.postForm.limitHour,
                      minute:this.postForm.limitMinute,
                      }).then((res) => {
                        console.log(res.data)
                        this.loading = false;
                        if(res.data.code === 200){
                          this.$message.success('派单成功!');
                          this.postForm.userName = '';
                          this.postForm.limitDay = 0;
                          this.postForm.limitHour = 0;
                          this.postForm.limitMinute = 10;
                        }else {
                          this.$message.error(res.data.msg);
                        }
                        this.sendDeclare = false;
                        this.$emit('dispatchSuccess');
                      }).catch((e) => {
                        this.$message.error('请求失败!请重试');
                        this.loading = false;
                        console.log(e);
                    })
                  }
                }else {
                  this.$message.error('最小接单时限为10分钟!');
                  return false;
                }
              }else {
                return false;
              }
            })
          },
          //获取所有报关员
          queryAllUserName(){
            this.receivers = [];
            this.$axios4.post('/getAllDeclareUserInfo')
              .then((res) => {
                for(let i = 0;i<res.data.length;i++){
                  this.receivers.push({
                    value:res.data[i].userId,
                    label:res.data[i].userName
                  })
                }
              }).catch((e) => {
              console.log(e);
            })
          },
        getReceiverName(value){
          let userName = this.receivers.find((item) =>{
            return item.value === value
          })
          if(userName !== null)
            this.receiverName = userName.label;
        }
    }
  }
</script>

<style scoped>

</style>
