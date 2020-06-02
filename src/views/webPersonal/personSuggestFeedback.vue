<template>
  <div>
    <div class="formf">
      <div class="feedback-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px">
          <el-form-item label="意见标题" prop="suggestTitle" class="feedback-input">
            <el-input v-model="ruleForm.ideaTitle"  placeholder="请输入标题...（字数：20字以内）"></el-input>
          </el-form-item>
          <el-form-item label="意见内容" prop="suggestContent" class="feedback-input">
            <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="ruleForm.submitText"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phoneNumber" class="feedback-input">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button id="feedbackbutton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
          ideaTitle: [
            { required: true, message: '请输入意见标题', trigger: 'blur' },
          ],
          submitText: [
            { required: true, message: '意见内容不能为空', trigger: 'blur' },
          ],
          phone: [
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
    //定义组件
    components:{

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
            //这里就是符合规则，然后去调对应的接口
            let params={
              ideaTitle:this.ruleForm.ideaTitle,
              phone:this.ruleForm.phone,
              submitText:this.ruleForm.submitText,
            };
            this.$axios1.post("/addFeedbackIdea",params)
              .then((response)=>{
              let res = response.data;
              if(res.code == 200){
                this.$message.success('提交成功');
                this.ruleForm.ideaTitle='';
                this.ruleForm.phone='';
                this.ruleForm.submitText='';
                //请求成功
              }else{
                //请求失败
                this.$message.error('提交失败');
              }
            });
          } else {
            this.$message.error('错误的提交');
            return false;
          }
        });
      }
    }
  }
</script>
