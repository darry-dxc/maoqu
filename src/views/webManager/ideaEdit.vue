<template>
  <div>
  	<el-dialog title="反馈意见" :visible.sync="dialogIdeaEditVisible" width="620px">
  			<el-form :model="form"  label-width="120px" style="padding-right: 40px  ">
  					<el-form-item label="用户姓名:" >
              <el-input v-model="form.submitUserName" readonly></el-input>
            </el-form-item>
					<el-form-item label="联系电话:" >
						<el-input v-model="form.phone" readonly></el-input>
					</el-form-item>
  				<el-form-item label="提交时间:" >
            <el-input v-model="form.submitTime" readonly></el-input>
          </el-form-item>
          <el-form-item label="提交内容:" >
            <el-input type="textarea" :rows="10" v-model="form.submitText" readonly/>
          </el-form-item>
  			</el-form>
  	</el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import './../../../src/assets/css/base.css';
  import  './../../assets/css/webManager/limitEdit/limitAdd.css';
  export default {
    data() {
      return {
      	dialogIdeaEditVisible: false,
        ideatextarea:'',
        form:{
        	submitUserName:'',
        	phone:'',
        	submitTime:'',
          submitText:''
        },
      }
    },
    methods:{
    	showIdea(val){
        this.dialogIdeaEditVisible=true;
        this.form = val;
      }

     }
  }
</script>

<style scoped>
	.edit-middle{
		height: 80px;
		padding-left: 10px;
		border-bottom: 1px solid #CCC;
	}
	.edit-bottom{
		height: 350px;
	}
	#idea-con{
		margin: 10px;
	}
	.form-item-lable1{
		height: 30px;
		width: 280px;
		float: left;
		margin-bottom: 5px !important;
	}
	/*设置输入框无边*/
	.form-inputNoboder{
		border: 0;
		width: 150px;
	}
	.idea-bottom-text{
		height: 30px;
		width: 100%;
		text-align: left;
	}
</style>
