<template>
	<div id="docucon" style="background: white">
		<div class="documentcon">
			<div class="document-header">
				<i slot="prefix" id="documenticon"style="font-size: 24px" class="el-icon-document"></i>
				<p class="headtext"><strong>个人基本信息</strong></p>
			</div>
			<div class="document-text">
				<el-form label-width="100px" :model="ruleForm" ref="ruleForm" >
						<el-form-item label="姓名:" prop="personName" class="form-item-lable" required>
							<label class="person-lable">{{ruleForm.personName}}</label>
						</el-form-item>
						<el-form-item label="身份证号:" prop="personId" class="form-item-lable" required>
							<label class="person-lable">{{ruleForm.personId}}</label>
						</el-form-item>
						<el-form-item label="邮箱:" prop="email" class="form-item-lable" required>
							<label class="person-lable">{{ruleForm.email}}</label>
						</el-form-item>
						<el-form-item label="手机号" prop="phonenumber" id="form-item-lable-edit" required>
							<el-col :span="7">
								<label class="person-lable">{{ruleForm.phonenumber}}</label>
							</el-col>
							<el-col :span="8">
								<label class="docu-setlable">注：修改手机和邮箱请至</label>
							</el-col>
							<el-col :span="5">
								<router-link to="/AccountSafe1"><el-button type="text" >账户安全</el-button></router-link>
							</el-col>
						</el-form-item>
						<el-form-item label="业务范围" prop="type" required>
							<el-checkbox-group v-model="ruleForm.type" >
								<el-checkbox label="定舱" name="type" disabled></el-checkbox>
								<el-checkbox label="拖车" name="type" disabled></el-checkbox>
								<el-checkbox label="报检" name="type" disabled></el-checkbox>
								<el-checkbox label="熏蒸" name="type" disabled></el-checkbox>
								<el-checkbox label="报关" name="type" disabled></el-checkbox>
								<el-checkbox label="海运" name="type" disabled></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
		        </el-form>
			</div>
		</div>
	</div>

</template>
<script>
	import './../../assets/css/webCompany/enterDocumentManage.css';
	 import qs from 'qs';
	export default {
	//定义数据
	  data () {
	    return {
	    	ruleForm: {
       	        personName:'',
	    		personId:'',
	    		email:'',
	    		phonenumber:'',
	    		type:["报关"],
               },
	    }
	  },
	  //定义组件
	  components:{

			},
	    //定义初始化函数
	  mounted(){
	  	let data2=JSON.parse(localStorage.getItem('Phone1'));
        this.$store.commit("updatePhone",data2);
	  	this.getInfoForUpdate();
	    },
    activated() {
      this.getInfoForUpdate();
    },
	  computed:{
	    nickPhone(){
          return this.$store.state.nickPhone;
        }
     },
	    //定义方法
	  methods:{
	  	//个人中心 资料管理获得个人用户基本数据
	 getInfoForUpdate() {
      let params = {
      	"phone":this.nickPhone,
      };
      console.log(this.nickPhone);
      this.$axios1.post("getInfoForUpdate",params).then(response => {
        let res = response.data;
        console.log(res);
        if (res.code == 200) {
          this.ruleForm.personName = res.data.userName;
          this.ruleForm.personId = res.data.IDnumber;
          this.ruleForm.email = res.data.mailbox;
          this.ruleForm.phonenumber = res.data.phone;
          this.ruleForm.type = ["报关"];
        } else {
          console.log("请求失败");
          this.$message.error('请求失败');
        }
      });
    },

	  	handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	    handlePreview(file) {
	      	console.log(file);
	      }
	    }

}
</script>
