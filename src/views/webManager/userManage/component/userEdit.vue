<template>
    <div>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible"
        width="550px"
      >
        <el-form :model="userform" :rules="userRules" ref="userform" style="padding-right: 30px">
          <el-form-item label="姓名:" prop="userName" :label-width="userformLabelwidth" >
            <el-input v-model="userform.userName" clearable/>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone" :label-width="userformLabelwidth" >
            <el-input v-model="userform.phone" clearable/>
          </el-form-item>
          <el-form-item label="身份证号:" prop="IDnumber" :label-width="userformLabelwidth" >
            <el-input v-model="userform.IDnumber" clearable/>
          </el-form-item>
          <el-form-item label="邮箱:" prop="mailbox" :label-width="userformLabelwidth" >
            <el-input v-model="userform.mailbox" clearable/>
          </el-form-item>
          <el-form-item label="业务范围:" prop="userRolecheckList" :label-width="userformLabelwidth" >
            <el-checkbox-group v-model="userform.userRolecheckList" disabled>
              <el-checkbox label="订舱" />
              <el-checkbox label="拖车" />
              <el-checkbox label="熏蒸" />
              <el-checkbox label="报关" />
            </el-checkbox-group>
            <span style="font-size: 10px;color: #c0c0c0">(暂未开放业务范围修改!)</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo('userform')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        userId:'',
        dialogVisible:false,
        userform:{

        },
        userformLabelwidth:'120px',
        userRules:{
          userName:[
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ],
          phone:[
            { required: true, message: '请输入用户手机号码', trigger: 'blur'}
          ],
          IDnumber:[
            {required: true, message: '请输入用户身份证号码', trigger: 'blur'}
          ],
          mailbox:[
            {required: true, message: '请输入用户邮箱', trigger: 'blur'}
          ],
          userRolecheckList: [
            {required:false}
          ]
        },
      }
    },
    mounted() {

    },
    methods: {
      //修改个人用户所有信息
      updateUserInfo(userForm){
        this.$refs[userForm].validate((valid)=>{
          if(valid){
            let param = {
              type:'个人',
              userId:this.userform.userId,
              userName:this.userform.userName,
              phone:this.userform.phone,
              IDnumber:this.userform.IDnumber,
              mailbox:this.userform.mailbox,
            };
            console.log(param)
            this.$axios1.post('updateInfoForManage',param)
              .then((res) =>{
                console.log(res.data)
                if(res.data.code === 200){
                  this.$message.success('修改成功!');
                }else if(res.data.code === 40107){
                  this.$message.error('手机号码已存在!');
                }else {
                  this.$message.error('修改失败!请重试');
                }
                this.$emit('query')
                this.dialogVisible = false;
              }).catch((e)=> {
              console.log(e);
            });
          }else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
