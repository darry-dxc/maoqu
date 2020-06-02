<template>
  <div>
    <div :style="'height:'+height+'px'" style="min-width: 1200px;background-color: #FFB5B5;">
      <el-row>
        <el-col :span="14">
          <img src="./../../assets/images/portalsImg/login.png" width="100%" style="margin-top: 60px"/>
        </el-col>
        <el-col :span="6" style="background-color: white;margin-top:200px;padding: 40px 40px">
          <h2 class="loginTitle font-size-28">登录</h2>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <el-form-item >
              <el-select v-model="role"  placeholder="请选择登录角色" style="width: 100%" clearable>
                <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="loginName" >
              <el-input v-model="loginForm.loginName" :placeholder="role ==='user'?'请输入手机号':'请输入用户名称'"  prefix-icon="el-icon-edit" />
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input v-model="loginForm.loginPassword" type="password" placeholder="请输入登录密码"   @keyup.enter.native="login('loginForm')"  prefix-icon="el-icon-setting" c/>
            </el-form-item>
            <el-form-item >
              <el-col :span="18">
                <router-link :to=path><el-button type="primary" @click="login('loginForm')" style="width: 100%">登录</el-button></router-link>
              </el-col>
              <el-col :span="6">
                <el-button type="text" @click="forgetPassword" style="width: 100%">忘记密码?</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <portalsFooter />
  </div>
</template>

<script>
  import './../../assets/css/webPortals/login.css'
  import portalsFooter from './../../components/portalsFooter'
  import portalsHeader from './../../components/loginBread'
  import { mapState } from 'vuex'
export default {
	//定义数据
  data () {
    return {
      loginForm:{
        loginName:'',
        loginPassword:'',
      },
      loginRules:{
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur'}
        ],
        loginPassword: [
          { required: true, message: '请输入登录密码', trigger: 'blur'}
        ]
      },
      path:'',
      roleOptions: [{
        value: 'user',
        label: '个人用户'
      }, {
        value: 'enterprise',
        label: '企业用户'
      }, {
        value: 'manager',
        label: '管理员'
      }],
      role: 'user',
      height:''
    }
  },
  //定义组件
  components:{
    portalsFooter,portalsHeader
  },
    //定义初始化函数
  mounted(){
      // console.log(this.nickCompanyId);
      this.height = screen.height - 280;
  },
    computed:{
       ...mapState(['nickCompanyMan','nickCompanyName','nickCompanyId'])
    },
    //定义方法
  methods:{
      login(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
           switch(this.role){
             case 'user':
             let params1 = {
               "type":'个人',
               "account":this.loginForm.loginName,
               "password":this.loginForm.loginPassword
             };
             this.$axios0.post('logdemo/login',params1)
               .then((response) =>{
                 if(response.data.code === 40103){
                   this.$message.error('密码验证失败');
                 }else if(response.data.code === 200){
                   this.$store.state.options2 = [];
                   let info = response.data.data.info;
                   let token = response.data.data.token;
                   //将登录信息存到localStorage
                   localStorage.setItem('Name1',JSON.stringify(info.userName));
                   localStorage.setItem('Phone1',JSON.stringify(info.phone));
                   localStorage.setItem('Id1',JSON.stringify(info.userId));
                   localStorage.setItem('Email1',JSON.stringify(info.mailbox));
                   sessionStorage.setItem('token',token);
                   this.$store.commit("updateToken",token);
                   this.$router.push({path:'/PersonMainCon'});
                   this.$message.success('登录成功');
                   //将登录信息取出存到vuex中
                   this.$store.commit("updateName",info.userName);
                   this.$store.commit("updatePhone",info.phone);
                   this.$store.commit("updateId",info.userId);
                   this.$store.commit("updateEmail",info.mailbox);
                 }else if(response.data.code === 40105) {
                   this.$message.error('账号不存在');
                 }else {
                   this.$message.error('账户被禁用');
                 }
               }).catch((error)=>{
                 console.log(error);
             });break;
             case 'enterprise':
               let params2 = {
                 "type":'企业',
                 "account":this.loginForm.loginName,
                 "password":this.loginForm.loginPassword
               };
               this.$axios0.post('logdemo/login',params2)
                 .then((response) =>{
                   if(response.data.code === 40103){
                     this.$message.error('密码验证失败');
                   }else if(response.data.code === 200){
                     //清空tab页的导航栏
                     this.$store.state.options1 = [];
                     let info = response.data.data.info;
                     let token = response.data.data.token;
                     //将登录信息存到localStorage
                     localStorage.setItem('Name2',JSON.stringify(info.enterpriseName));
                     localStorage.setItem('Name22',JSON.stringify(info.contact));
                     localStorage.setItem('Phone2',JSON.stringify(info.phone));
                     localStorage.setItem('Id2',JSON.stringify(info.enterpriseId));
                     localStorage.setItem('Email2',JSON.stringify(info.mailbox));
                     sessionStorage.setItem('token',token);
                     this.$store.commit("updateToken",token);
                     this.$router.push({path:'/WebCompany/CompanyMainCon'});
                     this.$message.success('登录成功');
                     //将登录信息取出存到vuex中
                     this.$store.commit("updateCompanyName",info.enterpriseName );
                     this.$store.commit("updateCompanyMan",info.contact);
                     this.$store.commit("updateCompanyId",info.enterpriseId);
                     this.$store.commit("updateCompanyEmail",info.mailbox);
                     this.$store.commit("updateCompanyPhone",info.phone);
                   }else if(response.data.code === 40105) {
                     this.$message.error('账号不存在');
                   }else {
                     this.$message.error('账户被禁用');
                   }
                 }).catch((error)=>{
                 console.log(error);
               });break;
             case 'manager':
               let params3 = {
                 "type":'管理员',
                 "account":this.loginForm.loginName,
                 "password":this.loginForm.loginPassword
               };
               this.$axios0.post('logdemo/login',params3)
                 .then((response) =>{
                   if(response.data.code=== 40103){
                     this.$message.error('密码验证失败');
                   }else if(response.data.code === 200){
                     this.$store.state.options = [];
                     let info = response.data.data.info;
                     let token = response.data.data.token;
                     sessionStorage.setItem('token',token);
                     this.$store.commit("updateToken",token);
                     this.$router.push({path:'/ManageMain'});
                     this.$message.success('登录成功');
                     localStorage.setItem('Name3',JSON.stringify(info.adminName));
                     this.$store.commit("updateManageName",info.adminName);
                   }else if(response.data.code === 40105) {
                     this.$message.error('账号不存在');
                   }else {
                     this.$message.error('账户被禁用');
                   }
                 }).catch((error)=>{
                 console.log(error);
               });break;
           }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      forgetPassword(){
        this.$router.push({path:'/WebPortals/PassWordBack?usertype='+this.role});
      }

    }
}
</script>
