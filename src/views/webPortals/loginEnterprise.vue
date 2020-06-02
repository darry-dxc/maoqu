<template>
	<div class="containe">
		<bread>企业</bread>
		<div class="forme">
			<div class="con-head">注册申请（企业）</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px">
				<div class="enter-container">
					<el-form-item class="login-input" label="客户类型" prop="clientType">
						<el-select id="login-select" v-model="ruleForm.region">
							<el-option label="生产企业" value="生产企业"></el-option>
							<el-option label="外贸企业" value="外贸企业"></el-option>
							<el-option label="中资" value="中资"></el-option>
							<el-option label="外资" value="外资"></el-option>
							<el-option label="自资区企业" value="自资区企业"></el-option>
							<el-option label="其他" value="其他"></el-option>
						</el-select>
				    </el-form-item>
					<el-form-item label="企业名称" prop="enterName" class="login-input">
						<el-input v-model="ruleForm.enterName"></el-input>
					</el-form-item>
					<el-form-item label="公司电话" prop="enterNumber" class="login-input">
						<el-input v-model="ruleForm.enterNumber"></el-input>
					</el-form-item>
					<el-form-item label="企业地址" prop="enterAddrss" class="login-input">
						<el-input v-model="ruleForm.enterAddrss"></el-input>
					</el-form-item>
					<el-form-item label="海关注册编码" prop="customsRegisCode" class="login-input" >
						<el-input v-model="ruleForm.customsRegisCode"></el-input>
					</el-form-item>
					<el-form-item label="统一信用代码" prop="creditCode" class="login-input">
						<el-input v-model="ruleForm.creditCode"></el-input>
					</el-form-item>
					<el-form-item label="纳税人识别号" prop="taxpayerNumber" class="login-input">
						<el-input v-model="ruleForm.taxpayerNumber"></el-input>
					</el-form-item>

				</div>
				<div class="enter-container">
					<el-form-item label="法人名称" prop="legalpersonName"  class="login-input">
						<el-input v-model="ruleForm.legalpersonName"></el-input>
					</el-form-item>
					<el-form-item label="联系人" prop="linkMan" class="login-input">
						<el-input v-model="ruleForm.linkMan"></el-input>
					</el-form-item>
					<el-form-item label="邮箱" prop="email" class="login-input">
						<el-input v-model="ruleForm.email"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phonenumber" class="login-input">
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
					<el-form-item label="设置密码" prop="pass" class="login-input">
						<el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPass" class="login-input">
						<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="enter-checkebox">
					<el-form-item label="经营范围" prop="type" required>
			            <el-checkbox-group v-model="ruleForm.type">
			              <el-checkbox label="报关" name="type"></el-checkbox>
			              <el-checkbox label="拖车" name="type" disabled></el-checkbox>
			              <el-checkbox label="熏蒸" name="type" disabled></el-checkbox>
			              <el-checkbox label="海运" name="type" disabled></el-checkbox>
			            </el-checkbox-group>
			          </el-form-item>
				</div>
        <!-- 上传附件区域 -->
          <div>
					<el-form-item label="上传附件" id="login-uploadlabel"></el-form-item>
          <el-col :span="4" class="registerCol">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="postURL"
              :accept='acceptType'
              :multiple="false"
              :auto-upload="false"
              :data="postData"
              :limit='1'
              :file-list="fileList"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :on-change="getName1"
              >
             <label class="uploadlable1">营业执照<br></label>
             <el-button size="small" type="primary">点击上传</el-button>
             </el-upload>
        </el-col>

        <el-col :span="5" class="registerCol">
            <el-upload
            class="upload-demo"
            ref="upload2"
            :action="postURL"
            :accept='acceptType'
            :multiple="false"
            :auto-upload="false"
            :data="postData"
            :limit='1'
            :file-list="fileList"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="getName2"
            >
             <label class="uploadlable1">对外贸易经营者备案登记表<br></label>
             <el-button size="small" type="primary">点击上传</el-button>
             </el-upload>
        </el-col>

        <el-col :span="5" class="registerCol">
            <el-upload
            class="upload-demo"
            ref="upload3"
            :action="postURL"
            :accept='acceptType'
            :multiple="false"
            :auto-upload="false"
            :data="postData"
            :limit='1'
            :file-list="fileList"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="getName3"
            >
             <label class="uploadlable1">报关单位注册登记证书<br></label>
             <el-button size="small" type="primary">点击上传</el-button>
             </el-upload>
        </el-col>

        <el-col :span="5" class="registerCol">
            <el-upload
            class="upload-demo"
            ref="upload4"
            :action="postURL"
            :accept='acceptType'
            :multiple="false"
            :auto-upload="false"
            :data="postData"
            :limit='1'
            :file-list="fileList"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="getName4"
            >
             <label class="uploadlable1">其他<br></label>
             <el-button size="small" type="primary">点击上传</el-button>
             </el-upload>
        </el-col>
       </div>
					<div class="buttonok">
            <el-col :span="20">
						<el-button id="loginbutton" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          </el-col>
					</div>

			</el-form>
		</div>
		<portalsFooter></portalsFooter>
	</div>
</template>

<script type="text/ecmascript-6">
  let Base64 = require('js-base64').Base64;
	import './../../assets/css/webPortals/loginEnterprise.css'
	import portalsFooter from './../../components/portalsFooter.vue'
	import mainService from './../../components/mainService.vue'
    import bread from './../../components/bread.vue'
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
  			callback(new Error('！两次密码不一致'));
  		}
  		else {
  			callback();
  		}
  	};
    return {
       show:true,
       count:'',
       time:null,
       flag:false,
       flag1:false,
       enterpriseId:null,
       name1:'',
       name2:'',
       name3:'',
       name4:'',
       postURL:'',//上传服务器的请求地址
       acceptImgType:'.png,.jpg,.jpeg',//上传图片允许的文件类型
       acceptType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
       postData:{},
       fileList:[],//待上传文件列表，element自动生成
       postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
       uploadFilePrams:[],//上传文件回调参数的callbackbody
       postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
      //详见接口文档 回调插入业务附件表数据
    ruleForm: {
       	region:'',
       	enterName:'',
       	enterNumber:'',
       	enterAddrss:'',
       	customsRegisCode:'',
       	creditCode:'',
       	taxpayerNumber:'',
       	legalpersonName:'',
       	linkMan:'',
       	email:'',
       	phonenumber:'',
       	securitycode:'',
       	pass:'',
       	checkPass:'',
        type:['报关']
      },
      imageUrl1:'',
      imageUrl2:'',
      imageUrl3:'',
      imageUrl4:'',
      rules:{
       	region: [
       { required: true, message: '！请选择客户类型', trigger: 'blur' },
       ],
       	enterName: [
       { required: true, message: '！请输入企业名称', trigger: 'blur' },
       ],
       	customsRegisCode: [
       { required: true, message: '！请输入海关注册编码', trigger: 'blur' },
       ],
       	creditCode: [
       { required: true, message: '！请输入统一信用代码', trigger: 'blur' },
       ],
       	legalpersonName: [
       { required: true, message: '！请输入法人名称', trigger: 'blur' },
       ],
       	linkMan: [
       { required: true, message: '！请输入联系人', trigger: 'blur' },
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
       { required: true, message: '！请输入手机验证码', trigger: 'blur' }
       ],
        pass: [
       { required: true, validator: validatePass, trigger: 'blur' }
       ],
        checkPass: [
       { required: true, validator: validatePass2, trigger: 'blur' }
       ],
       upload: [
       { required: true, message: '！请上传附件', trigger: 'blur' },
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
     //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入Vue.nextTick/vm.$nextTick
        this.$nextTick(function () {
          this.getUpload();
       });
    },
    //定义方法
  methods:{
     //发送手机验证码
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
      this.$axios1.post("/getIdentifyCode",{
        "phone":this.ruleForm.phonenumber
      }).then((response)=>{
        let res = response.data;
        if(res.code === 200){
          this.$message.success('验证码发送成功');
        }else{
          this.$message.error('验证码发送失败');
        }
      });
    },
    //注册事件
    submitForm(formName){
      console.log(this.ruleForm.region);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
              enterpriseType:this.ruleForm.region,
              enterpriseName:this.ruleForm.enterName,
              enterprisePhone:this.ruleForm.enterNumber,
              address:this.ruleForm.enterAddrss,
              customsNo:this.ruleForm.customsRegisCode,
              creditCode:this.ruleForm.creditCode,
              taxpayerNo:this.ruleForm.taxpayerNumber,
              legalPerson:this.ruleForm.legalpersonName,
              contact:this.ruleForm.linkMan,
              phone:this.ruleForm.phonenumber,
              mailbox:this.ruleForm.email,
              password:this.ruleForm.pass,
              identifyCode:this.ruleForm.securitycode,
              roleList:["报关"],
              // businessPrefix:'',
            };
            this.$axios1.post("/enterprise/register",params)
              .then((response)=>{
                console.log(response)
                let res = response.data;
                if(res.code === 200){
                  this.$message.success('注册成功');
                  this.upload();
                  this.$store.state.options1 = [];
                  this.$router.push({path:'/WebPortals/Login'});
                }else if(res.code === 40107){
                  this.$message.error('公司名称已被注册')
                }else if(res.code === 40109){
                  this.$message.error('手机验证码错误');
                }else{
                  this.$message.error('请求失败!请重试');
                }
              });
          } else {
            return false;
          }
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning("当前限制只能选择1个文件！第2个文件上传失败！");
      },
      //上传之前获取文件名
      getName1(file){
        this.name1=file.name;
        console.log(this.name1);
      },
      getName2(file){
        this.name2=file.name;
        console.log(this.name2);
      },
      getName3(file){
        this.name3=file.name;
        console.log(this.name3);
      },
      getName4(file){
        this.name4=file.name;
        console.log(this.name4);
      },
     getUpload(){
          this.$axios7.get('file/register/Upload?Bucket=business')
            .then((res) => {
              console.log("获取到上传的签名:");
              console.log(res.data);
              this.postURL = res.data.host;//对应bucket的公网访问地址
              console.log("上传文件的地址:"+this.postURL);
              this.postExpire = res.data.expire;
              this.uploadData=res.data;//将返回的签名等存储起来
              this.postState=1;//标志获取上传文件签名等数据成功
              return 1;
            }).catch((e) => {
              console.log("获取上传文件权限出错：");
              console.log(e);
              this.postState=0;//标志获取上传文件签名等数据失败；
              this.$message({
                showClose:true,
                message:'获取上传文件权限出错，请稍后刷新页面再试！',
                type:'error',
              });
              return 0;
          });
        },
        /*设置上传文件的地址，因用数据绑定方式不生效，因此用函数返回方式*/
        postUrl(){
          return this.postURL;
        },

        /*设置回调时给服务器的参数*/
        setCallbackData(){
          // console.log("enterpriseId:"+this.enterpriseId);
            this.uploadFilePrams.push({
              //回调函数所需参数，包括企业ID和四个附件地址
              "enterpriseId": this.enterpriseId,
              "bsLicense":this.enterpriseId+"/register/"+this.name1,
              "recordForm":this.enterpriseId+"/register/"+this.name2,
              "registrateCertificate":this.enterpriseId+"/register/"+this.name3,
              "otherFile":this.enterpriseId+"/register/"+this.name4,
            });
          this.postCallback={
            "callbackUrl":this.callbackUrl+"/file/callback?Type=3",
            "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
            "callbackBodyType":"application/json",
            "callbackBody":JSON.stringify(this.uploadFilePrams),
          };
          console.log(this.$refs.upload.name);
          console.log("body："+JSON.stringify(this.uploadFilePrams));
          console.log("设置回调参数");
          console.log(JSON.stringify(this.postCallback));
          return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
        },

          /*上传文件函数*/
        upload(){
          /*获取当前时间判断签名是否过期，过期则重新获取，3s缓冲*/
          console.log("enterpriseId:"+this.enterpriseId);
          let now = Date.parse(new Date())/1000;
          console.log(parseInt(this.postExpire));
          console.log(now);
          /*if (this.fileList.length === 0) {
            /!*不需要上传文件，终止函数*!/
            return false;
          }*/
          if (parseInt(this.postExpire) <(now+3) || this.postState !== 1 ){//即将过期或初始化时获取失败
            this.getUpload();
            setTimeout(function () {
              //重新获取上传签名为异步执行，因此等待0.5秒后继续执行配置参数及上传动作
              //正常情况下0.6秒足够。
              // 后期可改成等待异步执行完成之后再执行，使用Promise（之前使用有问题因此暂时放弃）
              this.setUpload();
            }.bind(this),600);
          }else {
            this.setUpload();//不需要重新获取则直接配置参数并上传
          }
        },
        /*上传文件的配置参数及上传动作*/
        setUpload(){
          if (this.postState === 1){//获取密钥成功
            /*上传文件*/
            console.log("即将进入上传文件前操作");
            /*在上传前设置上传参数data，之前在别的函数内上传无法在上传第一个时就上传绑定后的数据*/
            this.postData = {
              'policy':this.uploadData.policy,
              'OSSAccessKeyId':this.uploadData.accessid,
              'success_action_status':'200',
              'x-oss-security-token' : this.uploadData["security-token"],
              'signature': this.uploadData.signature,
              'key':this.enterpriseId+'/register'+'/${filename}',//上传文件的object名称。
            };
            console.log("即将进入设置回调参数");
            let callback = this.setCallbackData();

            this.postData["callback"]=callback;
            console.log("即将上传文件");
            console.log(this.postData);
            console.log("上传文件的地址:"+this.postURL);

            this.$nextTick(function(){
                this.$refs.upload.submit();
                this.$refs.upload2.submit();
                this.$refs.upload3.submit();
                this.$refs.upload4.submit();
            })

            // this.$nextTick(()=>{//防止第一次请求带不上表单其他参数
            //   console.log("上传文件的地址:"+this.postURL);
            //   this.$refs.upload.submit();
            //   // this.$refs.upload2.submit();
            //   // this.$refs.upload3.submit();
            //   // this.$refs.upload4.submit();
            // });
          } else{//获取密钥失败
            this.$message({
              showClose:true,
              message:'注册表单信息上传成功，文件上传失败！',
              type:'error',
            });
          }
        },
        /*文件上传成功时钩子绑定的方法*/
        fileUploadSuccess(response,file,fileList){
          console.log("上传文件成功");
          console.log(response);
        },
        /*文件上传失败时钩子绑定的方法*/
        fileUploadError(response,file,fileList){
          console.log("上传文件不成功");
          console.log(response);
        },
},


}
</script>
