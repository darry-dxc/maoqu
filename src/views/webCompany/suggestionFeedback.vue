<template>
	<div style="margin-top: 40px">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px">
          <el-form-item label="意见标题" prop="ideaTitle" class="feedback-input">
            <el-input v-model="ruleForm.ideaTitle"  placeholder="请输入标题..."></el-input>
          </el-form-item>
          <el-form-item label="意见内容" prop="submitText" class="feedback-input">
            <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="ruleForm.submitText"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone" class="feedback-input">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button id="feedbackbutton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</div>
</template>
<script>
	import './../../assets/css/webCompany/suggestionFeedback.css'
	export default {
	//定义数据
  data () {
    return {
    	ruleForm: {
       	suggestTitle:'',
       	textarea:'',
       	phoneNumber:'',
       },
       rules:{
	       suggestTitle: [
	       { required: true, message: '请输入意见标题', trigger: 'blur' },
	       ],
         suggestContent: [
	       { required: true, message: '意见内容不能为空', trigger: 'blur' },
	       ],
	       	phoneNumber: [
	       {required: true,message: '请输入手机号码',trigger: 'blur' },
            //手机校验
           {validator:function(rule,value,callback){
            if(/^1[34578]\d{9}$/.test(value) == false){
                callback(new Error("请输入正确的手机号"));
            }else{

                callback();}}, trigger: 'blur'}
        ],
       }

    }
  },
    //定义初始化函数
  mounted(){

    },
    //定义方法
  methods:{
  	//提交反馈意见
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios1.post("addFeedbackIdea",{
            ideaTitle:this.ruleForm.ideaTitle,
            phone:this.ruleForm.phone,
            submitText:this.ruleForm.submitText,
          }).then((res)=>{
            console.log(res.data);
            if(res.data.code === 200){
              this.$message.success('反馈成功!');
              for(let i in this.ruleForm){
                this.ruleForm[i] = '';
              }
            }else {
              this.$message.error('反馈失败,请重试!')
            }
          });
        }else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
