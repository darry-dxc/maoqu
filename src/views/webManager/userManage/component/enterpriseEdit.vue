<template>
    <div>
      <el-dialog
        title="修改信息"
        :visible.sync="dialogVisible"
        width="800px"
      >
        <el-form :model="form" ref="enterpriseForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户类型:" prop="enterpriseType" :label-width="enterpriseformLabelwidth" >
                <el-select v-model="form.enterpriseType" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in clientOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人名称:" prop="legalPerson" :label-width="enterpriseformLabelwidth" >
                <el-input v-model.number="form.legalPerson"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业名称:" prop="enterpriseName" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.enterpriseName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人:" prop="contact" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.contact"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司电话:" prop="enterprisePhone" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.enterprisePhone"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱:" prop="mailbox" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.mailbox"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="企业地址:" prop="address" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.address"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号:" prop="phone" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.phone"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="海关注册编码:" prop="customsNo" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.customsNo"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人识别号:" prop="taxpayerNo" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.taxpayerNo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="统一信用代码:" prop="creditCode" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.creditCode"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织机构代码:" prop="mailbox" :label-width="enterpriseformLabelwidth" >
                <el-input v-model="form.x" disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="经营范围:" :label-width="enterpriseformLabelwidth"  >
              <el-checkbox-group v-model="form.roleList">
                <el-checkbox label="报关" disabled />
                <el-checkbox label="拖车" disabled />
                <el-checkbox label="熏蒸" disabled />
                <el-checkbox label="海运" disabled />
              </el-checkbox-group>
            </el-form-item>
          </el-row>
          <el-row>
            <!--<el-form-item label="附件:" prop="mailbox" :label-width="enterpriseformLabelwidth" >-->
              <!--<el-input />-->
            <!--</el-form-item>-->
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo('enterpriseForm')">确 定</el-button>
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
        enterpriseformLabelwidth:'120px',
        form:{

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
        clientOptions:[{//客户类型选择
          value:'生产企业',
          label:'生产企业'
        },{
          value:'外贸企业',
          label:'外贸企业'
        },{
          value:'中资',
          label:'中资'
        },{
          value:'外资',
          label:'外资'
        },{
          value:'自贸区企业',
          label:'自贸区企业'
        },{
          value:'其他',
          label:'其他'
        }],
      }
    },
    mounted() {

    },
    methods: {
      //修改个人用户所有信息
      updateUserInfo(userForm){
        this.$refs[userForm].validate((valid)=>{
          if(valid){
            console.log(this.form)
            let param = {
              type:'企业',
              address:this.form.address,
              customsNo:this.form.customsNo,
              enterpriseType:this.form.enterpriseType,
              taxpayerNo:this.form.taxpayerNo,
              enterprisePhone:this.form.enterprisePhone,
              creditCode:this.form.creditCode,
              mailbox:this.form.mailbox,
              phone:this.form.phone,
              contact:this.form.contact,
              legalPerson:this.form.legalPerson,
              enterpriseId:this.form.enterpriseId,
              enterpriseName:this.form.enterpriseName,
            };
            this.$axios1.post('updateInfoForManage',param)
              .then((res) =>{
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
