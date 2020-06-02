<template>
	<div class="containi">
		<bread>个人</bread>
		<div class="formi">
			<div class="con-head">注册申请（个人）</div>
			<div class="indiv-container">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px">
					<el-form-item label="姓名" prop="name" class="login-input">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="idnumber" class="login-input">
						<el-input v-model="ruleForm.idnumber"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email" class="login-input">
						<el-input v-model="ruleForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phonenumber" class="login-input" >
						<el-input v-model="ruleForm.phonenumber"></el-input>
					</el-form-item>
					<el-form-item label="手机验证码" prop="securitycode" class="login-input">
		            <el-input id="securityinput" v-model="ruleForm.securitycode">
		              <template slot="append">
		                <el-button id="securitybutton" type="button" v-if="show" @click="sendIdentifyCode" :disabled="flag">获取验证码</el-button>
		                <el-button id="timer" type="button" v-if="!show" :disabled="flag1">{{count}} s</el-button>
		              </template>
		            </el-input>
		          </el-form-item>

					<el-form-item label="密码" prop="pass" class="login-input">
						<el-input type="password" v-model="ruleForm.pass" auto-complete="on"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass" class="login-input">
						<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
					</el-form-item>

					<el-form-item label="业务范围" prop="type">
						<el-checkbox class="login-checkbox" v-model="ruleForm.checkAll" label="全选" @change="handleCheckAllChange"></el-checkbox>
						<el-checkbox-group class="login-checkbox" v-model="ruleForm.type" @change="handleCheckedtypeChange" disabled>
							<el-checkbox class="costums" label="报关" name="type"></el-checkbox>
							<el-checkbox label="拖车" name="type" disabled></el-checkbox>
							<el-checkbox label="熏蒸" name="type" disabled></el-checkbox>
							<el-checkbox label="海运" name="type" disabled></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button id="loginbutton" type="primary" @click="submitForm('ruleForm')">注册</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<portalsFooter></portalsFooter>
	</div>
</template>

<script>
	import './../../assets/css/webPortals/loginIndividual.css'
	import portalsFooter from './../../components/portalsFooter.vue'
    import mainService from './../../components/mainService.vue'
    import bread from './../../components/bread.vue'
    import axios from 'axios'
	const typeOptions = ['报关', '拖车', '熏蒸', '海运'];
export default {
	//定义数据
  data () {
  	//密码不能为空
  	var validatePass = (rule, value, callback) => {
  		if (value === '') {
  			callback(new Error('！请输入密码'));
  		}
  		else {
  			if (this.ruleForm.checkPass !== '') {
  				this.$refs.ruleForm.validateField('checkPass');
  			}
  			callback();
  		}
  	};
  	//判断再次输入密码是否一致
  	var validatePass2 = (rule, value, callback) => {
  		if (value === '') {
  			callback(new Error('！请再次输入密码'));
  		}
  		else if (value !== this.ruleForm.pass) {
  			callback(new Error('！两次输入密码不一致!'));
  		}
  		else {
  			callback();
  		}
  	};
    return {
    	userId:'',//个人id
       show:true,
       count:'',
       time:null,
       flag:false,
       flag1:false,
       ruleForm: {
       	name:'',
       	idnumber:'',
       	email:'',
       	phonenumber:'',
       	securitycode:'',
       	pass:'',
       	checkPass:'',
       	checkAll: false,
       	type: ['报关'],
        roleList:[]
       },
      rules:{
        name: [
       { required: true, message: '！姓名不能为空', trigger: 'blur' },
       ],
        idnumber: [
        {required: true,message: '请输入身份证ID',trigger: 'blur'},
        //身份证校验规则
        {pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '你的身份证格式不正确' }
        ],
        email: [
       { required: true, message: '！邮箱不能为空', trigger: 'blur' },
       { type:"email", message: '！请输入有效的邮箱地址', trigger: 'blur' }
       ],
        phonenumber: [
        {required: true,message: '请输入手机号码',trigger: 'blur' },
        //手机校验
        {validator:function(rule,value,callback){
            if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
            }else{

                callback();}}, trigger: 'blur'}
        ],
        securitycode: [
       { required: true, message: '！手机验证码不能为空', trigger: 'blur' }
       ],
        pass: [
       { required: true, validator: validatePass, trigger: 'blur' }
       ],
        checkPass: [
       { required: true, validator: validatePass2, trigger: 'blur' }
       ],
        type: [
       { required: true, message: '！请选择一项', trigger: 'blur' },
       ],
       }
    }

  },
  //定义组件
  components:{
    portalsFooter,
    mainService,
    bread,
    },

    //定义初始化函数
  mounted(){
    },
    //定义方法
  methods:{
    //发送手机验证码事件
    sendIdentifyCode(){
          //60秒倒计时
    const TIME_COUNT = 60;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
        this.flag1 = true;
         this.count--;
        } else {
         this.flag1=false;
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
      //获取手机验证码
      this.$axios1.post("/getIdentifyCode",{
        "phone":this.ruleForm.phonenumber
      }).then((response)=>{
        console.log(response.data)
        if(response.data.code === 200){
          this.$message.success('验证码发送成功');
          // this.securitycode = res.identifyCode;
          console.log( this.securitycode);
          //请求成功
        }else{
          this.$message.error('验证码发送失败');
        }
      });
    },
    //注册事件
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
              userName:this.ruleForm.name,
              IDnumber:this.ruleForm.idnumber,
              mailbox:this.ruleForm.email,
              phone:this.ruleForm.phonenumber,
              password:this.ruleForm.pass,
              roleList:["报关"],
              identifyCode:this.ruleForm.securitycode,
            };
            console.log(params);
            this.$axios1.post("/user/register",params).then((response)=>{
              console.log(response.data)
                    let res = response.data;
                    this.userId = res.userId;
                    if(res.code === 200){
                      this.$message.success('注册成功!请重新登录');
	                    this.$store.state.options2 = [];
	                    this.$router.push({path:'/WebPortals/Login'});
                    }else if(res.code === 40107){
                      this.$message.error('手机号码已被注册!')
                    }else if(res.code === 40109){
                      this.$message.error('手机验证码错误!')
                    }else{
                      this.$message.error('请求失败!请重试!')
                    }
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  	//复选框全选功能
  	handleCheckAllChange(val) {
        this.ruleForm.type = val ? typeOptions : [];
        this.isIndeterminate = false;
     },
      handleCheckedtypeChange(value) {
      	let totalLength = typeOptions.length;
        let checkedCount = value.length;
        this.ruleForm.checkAll = checkedCount === totalLength;
      }
}
}
</script>
