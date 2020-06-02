<template>
  <div id="container">
    <div class="personCenter-head">
        <el-tabs class="personTab" v-model="activeCenter" type="border-card" @tab-click="handleClick">
        <el-tab-pane class="PCpage1" label="修改密码" name="PCpage1" style="padding-top: 100px">
          <div class="personProgress">
            <el-steps :active="headstep" align-center>
              <el-step title="1" description="验证身份"></el-step>
              <el-step title="2" description="修改密码"></el-step>
              <el-step title="3" description="完成"></el-step>
            </el-steps>
          </div>
          <el-form class="personCen-form" :model="passwordVerForm" :rules="rulesPass" ref="passwordVerForm"  label-width="120px" v-show="flagP1">
            <el-form-item class="PCpasswordText" label="登录密码:" prop="password">
              <el-input type="password" class="PCpassword" v-model="passwordVerForm.password"></el-input>
            </el-form-item>
            <el-form-item class="PCveriCodeText" label="验证码:" prop="passCode">
              <div>
                <el-input class="PCveriCode"  prefix-icon="el-icon-mobile-phone" maxlength="4" v-model="passwordVerForm.passCode">
                  <div slot="suffix" style="border-left: 1px solid #C0C4CC;padding-left: 5px;color: #F56C6C" @click="createCode">{{code}}</div>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button @click="updatePswByPsw('passwordVerForm')" type="primary">提交</el-button>
            </el-form-item>
          </el-form>
          <!-- 验证身份成功之后设置新密码表单 -->
          <el-form id="newpassForm" class="personCen-form"  :label-position="labelPosition" :model="newPassForm"  :rules="ruleNewPass" ref="newPassForm" label-width="160px" v-show="flagP11">
            <el-form-item class="PCpasswordText" label="设置新密码:" prop="newpassword">
              <el-input type="password" class="PCpassword" v-model="newPassForm.newpassword"></el-input>
            </el-form-item>
            <el-form-item class="PCveriCodeText" label="确认新密码:" prop="newpasswordCheck">
              <el-input type="password" class="PCpassword" v-model="newPassForm.newpasswordCheck"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="perSubmit('newPassForm')" type="primary">提交</el-button>
            </el-form-item>
          </el-form>
          <!-- 设置新密码成功 -->
          <div class="updateSuc" v-show="flagP111">
            <span class="text2" style="text-align: center" >恭喜您，密码修改成功！<br>即将返回登录界面，<router-link to="/Webportal/Login"><span class="textred">或点此重新登录！</span></router-link></span>
          </div>
        </el-tab-pane>
        <el-tab-pane class="PCpage2" label="新增管理员" name="PCpage2" style="padding-top: 100px">
          <el-form class="personCen-form2" :model="formLabelAlign" :rules="rules" ref="formLabelAlign"  label-width="160px">
            <el-form-item class="PCnameText2" label="登录名:" prop="name2">
              <el-input class="PCname2" v-model="formLabelAlign.name2"></el-input>
            </el-form-item>
            <el-form-item class="PCpasswordText2" label="设置密码:" prop="password2">
              <el-input type="password" class="PCpassword2" v-model="formLabelAlign.password2"></el-input>
            </el-form-item>
            <el-form-item class="PCveripasswordText2" label="确认密码:" prop="veripassword2">
              <el-input type="password" class="PCveripassword2" v-model="formLabelAlign.veripassword2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="addAdmin('formLabelAlign')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
 import './../../assets/css/webManager/personCenter.css'
  export default {
  //定义数据
  data () {
    //判断验证身份时验证码是否为空且输入是否正确
    var passCodeVericy= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('！请输入验证码'));
      }
      else if (value !== this.code) {
        callback(new Error('！输入验证码不对'));
      }
      else {
        callback();
      }
    };
    //判断两次输入的密码是否一致
    var newpassword2Vericy= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('！请再次输入密码'));
      }
      else if (value !== this.formLabelAlign.password2) {
        callback(new Error('！输入密码不正确'));
      }
      else {
        callback();
      }
    };
    //判断两次输入的密码是否一致
    var newpasswordVericy= (rule, value, callback) => {
      if (value === '') {
        callback(new Error('！请再次输入密码'));
      }
      else if (value !== this.newPassForm.newpassword) {
        callback(new Error('！输入密码不正确'));
      }
      else {
        callback();
      }
    };
      return {
        token:'',
         code:'',
         flagP1:true,
         flagP11:false,
         flagT1:true,
         flagT2:false,
         flagT3:false,
         flagP111:false,
         labelPosition:'left',
         headstep:1,
         activeCenter: 'PCpage1',
         passwordVerForm:{
          password: '',
          passCode:'',
         },
         newPassForm:{
          newpassword:'',
          newpasswordCheck:'',
         },
         formLabelAlign: {
          password2:'',
          name2:'',
          veripassword2:''
        },
        // 验证身份表单规则
        rulesPass:{
          password: [
        { required: true, message: '！密码不能为空', trigger: 'blur' },
       ],
        passCode:[
        { required: true, validator:passCodeVericy, trigger: 'blur' },
       ],
        },
        //设置新密码表单验证规则
        ruleNewPass:{
          newpassword:[
       { required: true, message: '！密码不能为空', trigger: 'blur' },
       ],
       newpasswordCheck:[
       { required: true, validator:newpasswordVericy, trigger: 'blur' },
       ],
        },
       //设置新管理员变淡验证规则
        rules:{
          name2: [
        { required: true, message: '！用户名不能为空', trigger: 'blur' },
       ],
        password2:[
        { required: true, message: '！密码不能为空', trigger: 'blur' },
       ],
       veripassword2:[
        { required: true, validator:newpassword2Vericy, trigger: 'blur' },
       ],
      }
      }
    },
  //定义初始化函数
  mounted(){
    this.createCode();
     let data111=JSON.parse(localStorage.getItem('Name3'));
      this.$store.commit("updateManageName",data111);
    },
  computed:{
    nickManageName(){
      return this.$store.state.nickManageName;
      }
    },
    //定义方法
  methods:{
    handleClick(tab, event) {
        console.log(tab, event);
      },
    //生成校验码
    createCode(){
      let code="";
      let codeLength = 4;
      let random = new Array(0,1,2,3,4,5,6,7,8,9);
      for(let i = 0;i < codeLength; i ++ ){
        let index = Math.floor(Math.random()*10);
        code += random[index];
      }
      this.code = code;
    },
    //管理员身份认证
    updatePswByPsw(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
      let params={
          "adminName":this.nickManageName,
          "password":this.passwordVerForm.password,
      };
      this.$axios1.post("passwordAuth",params)
        .then((response)=>{
          let res = response.data;
          if(res.code === 200 ){
            this.token = res.data;
            this.$message.success('验证成功！')
            this.headstep=2;
             this.flagT1=false;
             this.flagT2=true;
             this.flagT3=false;
             this.flagP1=false;
             this.flagP11=true;
            }else if(res.code === 40109){
              this.$message.error('密码错误！');
            }else {
            this.$message.error('请求失败！请重试');
            }
        });
        }
      });
    },
    //修改密码
    perSubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
       let params={
          "newPsw":this.newPassForm.newpassword,
          "token":this.token,
      };
      console.log(params);
      this.$axios1.post("updatePsw",params)
        .then((response)=>{
        let res = response.data;
        if(res.code === 200){
          this.$message.success('修改密码成功,即将跳转到登录页面');
          setTimeout(() => {
            this.$router.push({ path: '/WebPortals/Login'})
          },1000)
          this.headstep=3;
             this.flagT1=false;
             this.flagT2=false;
             this.flagT3=true;
             this.flagP1=false;
             this.flagP11=false;
             this.flagP111=true;
          }else {
          this.$message.error('请求失败！请重试');
        }});
    }
  });
      },
      //新增管理员
      addAdmin(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
        let params={
          "adminName":this.formLabelAlign.name2,
          "password":this.formLabelAlign.password2,
          "author":this.nickManageName,
        };
        console.log(params)
        this.$axios1.post("addAdmin",params).then((response)=>{
          console.log(response.data)
        let res = response.data;
        if(res.code === 200){
           this.$message.success('新增管理员成功!');
          }else if(res.code === 40107){
           this.$message.error('该账户已存在');
          }else {
          this.$message.error('请求失败！请重试');
          }
         });
          this.formLabelAlign.name2='';
          this.formLabelAlign.password2='';
          this.formLabelAlign.veripassword2='';
      }
    });
   }
 }
}
</script>
