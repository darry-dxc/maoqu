<template>
  <div>
    <div style="width:400px;margin:100px auto;height:800px;">
      <h2 style="text-align: center;margin: 20px 0">找回密码</h2>
      <!-- 手机号校验 -->
      <el-form label-width="100px" :model="form" ref="form" :rules="formRules">
        <el-form-item  label="用户名:" v-if="userType !== 'user'" prop="account">
          <el-input v-model="form.account" clearable/>
        </el-form-item>
         <el-form-item  label="手机号码:" prop="phone">
          <el-input v-model="form.phone" clearable/>
        </el-form-item>
        <el-form-item label="手机验证码:" prop="identifyCode">
          <el-col :span="16">
            <el-input v-model="form.identifyCode" clearable/>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" v-show="show" @click="getIdentifyCode" :disabled="flag3" style="width:100%">获取验证码</el-button>
            <el-button type="info" v-show="!show" disabled style="width:100%">{{count}} s</el-button>
          </el-col>
        </el-form-item>
        <el-form-item  label="设置新密码:" prop="password">
          <el-input v-model="form.password" clearable type="password"/>
        </el-form-item>
        <el-form-item  label="确认新密码:" prop="passwordCon">
          <el-input v-model="form.passwordCon" clearable type="password"/>
        </el-form-item>
        <el-form-item  >
          <el-button type="primary" style="width:100%" @click="passwordSubmit('form')">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <portalsFooter />
  </div>
</template>

<script>
  import portalsHeader from './../../components/passwordBackBread'
  import portalsFooter from './../../components/portalsFooter'
  export default {
    //定义数据
    data () {
      let passwordConCheck = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let phoneCheck = (rule, value, callback) => {
        if (/^1[34578]\d{9}$/.test(value) == false) {
          callback(new Error('手机号码格式不正确!'));
        } else {
          callback();
        }
      };
      return {
        count:'',
        flag:true,
        flag2:false,
        flag3:false,
        show:true,
        enteraccount:false,
        personaccount:false,
        token:'',
        userType:'',
        form:{
          account:'',
          phone:'',
          identifyCode:'',
          password:'',
          passwordCon:'',
        },
        formRules:{
          account:[{ required: true, message: '请输入登录名', trigger: 'blur' }],
          phone:[
            { required: true, message: '请输入手机号码!', trigger: 'blur' },
            { validator: phoneCheck, trigger: 'blur' }
          ],
          identifyCode:[{ required: true, message: '请输入6位验证码', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' }],
          passwordCon:[
            { required: true, message: '请再次输入密码!', trigger: 'blur' },
            { validator: passwordConCheck, trigger: 'blur' }
          ]
        }
      }
    },
    //定义组件
    components:{
      portalsHeader, portalsFooter
    },
    //定义初始化函数
    mounted(){
      this.userType = this.$route.query.usertype;
    },
    //定义方法
    methods:{
      //获取手机验证码
      getIdentifyCode(){
        if(this.form.phone === ''){
          this.$message.error('请输入手机号码!')
        }else{
          this.$axios1.post("/getIdentifyCode",{
            "phone":this.form.phone
          }).then((res)=>{
            console.log(res.data)
            if(res.data.code === 200){
              this.$message.success('验证码已发送!')
            }else{
              this.$message.error('验证码发送失败!请重试')
            }
          });
          const TIME_COUNT = 60;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.flag3 = true;
              this.count--;
              } else {
              this.flag3=false;
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              }
            }, 1000)
          }
        }
      },
      //重置密码
      passwordSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
              "identifyCode":this.form.identifyCode,
              "newPsw":this.form.password,
            };
            if(this.userType === 'user'){
              params.type = '个人';
              params.account = this.form.phone;
            } else if(this.userType === 'enterprise'){
              params.type = '企业';
              params.account = this.form.account
            }
            this.$axios1.post("/getBackPsw",params).then((response)=>{
              let res = response.data;
              console.log(res)
              if(res.code=="200"){
                console.log(res);
                this.$message.success('密码重置成功,即将跳转到登录页面');
                setTimeout(() => {
                  this.$router.push({path:'/WebPortals/Login'});
                },2000)
              }else if(res.code=="40109"){
                this.$message.error('绑定手机号错误!');
              }else {
                this.$message.error("请求失败");
              }
            }).catch((error) => {
                console.log(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
     
    }
  }
</script>

