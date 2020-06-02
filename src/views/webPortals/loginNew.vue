<template>
    <div id="login-container">
      <vue-particles
        color="#f8c367"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#f8c367"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      <div style="position: absolute; top:0;width:100%;margin: 0 auto">
        <el-row style="height: 61px;background-color: #fff">
          <el-col :span="12">
            <div @click="$router.push({ path: '/WebPortals/Homepage'})" style="float: left;">
              <img id="logo" src="./../../assets/images/portalsIcon/logo.png" class="bk-home"/>
            </div>
            <div style="font-size: 20px">
              <span>登录</span>
              <i class="el-icon-arrow-right" style="margin-top: 20px"></i>
            </div>
          </el-col>
          <el-col :span="4" :offset="8" style="font-size: 25px;margin-top: 13px;text-align: center">
            <el-button type="warning" icon="el-icon-arrow-left" @click="$router.push({ path: '/WebPortals/Homepage'})">返回首页</el-button>
          </el-col>
        </el-row>
        <el-row style="text-align: center;margin-top: 100px">
          <img src="./../../assets/images/personImg/u384.png" class="login-logo"/>
          <span class="login-title">MoreTrade</span>
        </el-row>
        <el-row style="text-align: center;font-size: 14px;color: #DCDFE6">
          <span>深圳市贸趣网络科技股份有限公司</span>
        </el-row>
        <el-row style="text-align: center;margin-top: 30px;">
          <el-tabs v-model="activeName" style="width: 278px;margin: 0 auto">
            <el-tab-pane label="个人用户" name="user" @tab-click="refreshCode">
              <el-form :model="userForm" :rules="userRules" ref="userForm">
                <el-form-item prop="account">
                  <el-input v-model.trim="userForm.account" placeholder="手机号码" prefix-icon="el-icon-mobile-phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="userForm.password"
                    placeholder="登录密码"
                    :type="!userPasswordView?'password':''"
                    prefix-icon="el-icon-ump-quanxianguanli"
                    >
                    <i
                      class="el-icon-view"
                      slot="suffix"
                      @click="userHandleIconClick">
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="identify">
                  <el-col :span="12">
                    <el-input v-model="userForm.identify" placeholder="验证码" @keyup.enter.native="login"/>
                  </el-col>
                  <el-col :span="12">
                    <div @click="refreshCode">
                      <identify v-if="activeName === 'user'" :identifyCode="identifyCode" style="height: 41px;margin-top: 2px;width: 100%"/>
                    </div>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="企业用户" name="enterprise">
              <el-form :model="enterpriseForm" :rules="enterpriseRules" ref="enterpriseForm">
                <el-form-item prop="account">
                  <el-input v-model.trim="enterpriseForm.account" placeholder="企业名称" prefix-icon="el-icon-ump-qiyezhongxin"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="enterpriseForm.password"
                    placeholder="登录密码"
                    :type="!enterprisePasswordView?'password':''"
                    prefix-icon="el-icon-ump-quanxianguanli"
                    >
                    <i
                      class="el-icon-view"
                      slot="suffix"
                      @click="enterpriseHandleIconClick">
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="identify">
                  <el-col :span="12">
                    <el-input v-model="enterpriseForm.identify" placeholder="验证码" @keyup.enter.native="login"/>
                  </el-col>
                  <el-col :span="12">
                    <div @click="refreshCode">
                      <identify v-if="activeName === 'enterprise'" :identifyCode="identifyCode" style="height: 41px;margin-top: 2px;width: 100%"/>
                    </div>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="管理员" name="admin">
              <el-form :model="adminForm" :rules="adminRules" ref="adminForm">
                <el-form-item prop="account">
                  <el-input v-model.trim="adminForm.account" placeholder="管理员" prefix-icon="el-icon-ump-gerenzhongxin"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model.trim="adminForm.password"
                    placeholder="登录密码"
                    :type="!adminPasswordView?'password':''"
                    prefix-icon="el-icon-ump-quanxianguanli"
                    >
                    <i
                      class="el-icon-view"
                      slot="suffix"
                      @click="adminHandleIconClick">
                    </i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="identify">
                  <el-col :span="12">
                    <el-input v-model="adminForm.identify" placeholder="验证码" @keyup.enter.native="login"/>
                  </el-col>
                  <el-col :span="12">
                    <div @click="refreshCode">
                      <identify v-if="activeName === 'admin'" :identifyCode="identifyCode" style="height: 41px;margin-top: 2px;width: 100%"/>
                    </div>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row style="width: 278px;margin: 0 auto">
          <el-col :span="12" style="height: 40px;line-height: 40px">
            <el-checkbox v-model="checked">自动登录</el-checkbox>
          </el-col>
          <el-col :span="12">
            <el-button v-show="activeName !== 'admin'" type="text" style="float: right" @click="forgetPassword">忘记密码</el-button>
          </el-col>
        </el-row>
        <el-row style="width: 278px;margin: 10px auto">
          <el-button type="warning" style="width: 100%;" @click="login">登录</el-button>
        </el-row>
        <el-row style="width: 278px;margin: 10px auto">
          <el-button type="text" style="float: right" @click="registerAccount">注册账户</el-button>
        </el-row>
        <div style="width:100%;position: fixed;bottom: 15px;text-align: center;color: #EBEEF5">
          Copyright©2016 moretrade.com.cn
          <br />粤ICP备12058193号
        </div>
      </div>
    </div>
</template>

<script>
  import identify from './../../components/identify'
    export default {
        data() {
          let phoneCheck = (rule, value, callback) => {
            let reg= 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (value === '') {
              callback(new Error('请输入手机号码!'));
            } else if (!reg.test(this.userForm.account)) {
              callback(new Error('手机格式不正确!'));
            } else {
              callback();
            }
          };
          let identifyCheck= (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入验证码!'));
            } else if (value !== this.identifyCode) {
              this.identifyCode = "";
              this.makeCode(this.identifyCodes, 4);
              callback(new Error('验证码不正确!'));
            } else {
              callback();
            }
          };
          return {
            identifyCodes: "1234567890",
            identifyCode: '',//验证码
            userPasswordView:false,
            enterprisePasswordView:false,
            adminPasswordView:false,
            activeName: 'user',
            input:'',
            userForm:{
              account:'',
              password:'',
              identify:''
            },
            enterpriseForm:{
              account:'',
              password:'',
              identify:''
            },
            adminForm:{
              account:'',
              password:'',
              identify:''
            },
            checked:'',
            userRules:{
              account:[{
                validator: phoneCheck, trigger: 'blur'
              }],
              password:[{
                required:true,message:'请输入登陆密码!',trigger:'blur'
              }],
              identify:[{
                validator: identifyCheck, trigger: 'blur'
              }]
            },
            enterpriseRules:{
              account:[{
                required:true,message:'请输入企业名称!',trigger:'blur'
              }],
              password:[{
                required:true,message:'请输入登陆密码!',trigger:'blur'
              }],
              identify:[{
                validator: identifyCheck, trigger: 'blur'
              }]
            },
            adminRules:{
              account:[{
                required:true,message:'请输入管理员账号!',trigger:'blur'
              }],
              password:[{
                required:true,message:'请输入登陆密码!',trigger:'blur'
              }],
              identify:[{
                validator: identifyCheck, trigger: 'blur'
              }]
            }
          }
        },
        components:{
          identify
        },
        mounted() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        methods: {
          login(){
            switch(this.activeName){
              case 'user':
                this.$refs['userForm'].validate((valid) => {
                  if (valid) {
                    let params1 = {
                      "type":'个人',
                      "account":this.userForm.account,
                      "password":this.userForm.password
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
                    })
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
                break;
              case 'enterprise':
                this.$refs['enterpriseForm'].validate((valid) => {
                  if (valid) {
                    let params2 = {
                      "type":'企业',
                      "account":this.enterpriseForm.account,
                      "password":this.enterpriseForm.password
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
                    });
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
                break;
              case 'admin':
                this.$refs['adminForm'].validate((valid) => {
                  if (valid) {
                    let params3 = {
                      "type":'管理员',
                      "account":this.adminForm.account,
                      "password":this.adminForm.password
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
                          this.$router.push({path:'/WebManage/UserManage'});
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
                    });
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
                break;
            }
          },
          forgetPassword(){
            this.$router.push({path:'/WebPortals/PassWordBack?usertype='+this.activeName});
          },
          registerAccount(){
            this.$router.push({path:'/WebPortals/RegisterClause'});
          },
          userHandleIconClick(){
            this.userPasswordView = !this.userPasswordView;
          },
          enterpriseHandleIconClick(){
            this.enterprisePasswordView = !this.enterprisePasswordView;
          },
          adminHandleIconClick(){
            this.adminPasswordView = !this.adminPasswordView;
          },
          //更新验证码
          refreshCode() {
            console.log('refresh')
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
          },
          randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
          },
          //生成验证码
          makeCode(o, l) {
            for (let i = 0; i < l; i++) {
              this.identifyCode += this.identifyCodes[
                this.randomNum(0, this.identifyCodes.length)
                ];
            }
          },
        }
    }
</script>

<style>
   #login-container {
     overflow: hidden;
     height: 100vh;
     margin: 0;
     background-image: url("./../../assets/images/portalsImg/loginnew.jpg");
  }
   #logo {
     width: 230px !important;
     height: 34px !important;
     margin: 13px 20px 0 13px;
   }
  .login-title {
    font-size: 40px;
    font-weight: 600;
    line-height: 80px;
    color: #f39800;
  }
  .login-logo {
    height: 80px;
    width: 80px;
    vertical-align: top;
    margin-right: 16px;
  }
   #login-container .el-tabs__item {
     font-size: 18px;
     font-weight: 600;
     color: #fff !important;
   }
   #login-container .el-tabs__item:hover{
     color: #c0c4cc !important;
   }
   #login-container .el-tabs__item.is-active{
     color: #f39800 !important;
   }
   #login-container .el-form-item__error{
     color:#f39800 !important;
   }
   #login-container .el-tabs__active-bar{
     background-color: #f39800 !important;
   }
   #login-container .el-button--text{
     color: #EBEEF5 !important;
   }
   #login-container .el-button:hover{
     opacity:0.6 !important;
   }
   #login-container .el-checkbox{
     color: #EBEEF5 !important;
   }
   #login-container .el-checkbox__input.is-checked+.el-checkbox__label{
     color: #EBEEF5 !important;
   }
   #login-container .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
     background-color: #f39800 !important;
     border-color: #f39800 !important;
   }
   #login-container .el-checkbox__inner:hover{
     border-color: #f39800 !important;
   }
   #login-container .el-checkbox__input.is-checked+.el-checkbox__label{
     color: #f39800 !important;
   }
   #login-container .el-button--warning{
     background-color: #f39800 !important;
     border-color: #f39800 !important;
   }
   .bk-home:hover{
     cursor: pointer;
   }
</style>
