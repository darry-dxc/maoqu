<template>
    <div>
      <el-button type="info" @click="deleteConfirm" :disabled="deleteID.length === 0" >删除</el-button>
      <el-dialog title="提示" :visible.sync="dialogFormVisible" width="600px">
        <span>确定要删除外商速记代码为<div class="red">{{customerIdList}}</div>的公司信息吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOverseasCustomer" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webCompany/commodityEdit/commodityAdd.css';
    export default {
        data() {
            return {
              dialogFormVisible: false,
              customerId:'',
							isDisabled:true,
							customerIdList:[]
            }
        },
				props:['deleteID'],
				computed:{
					nickCompanyId() {
						return this.$store.state.nickCompanyId;
					}
				},
        methods:{
	    		//删除信息弹出框
	        deleteConfirm(){
						this.dialogFormVisible = true;
						this.customerIdList = [];
	          for (let i=0;i<this.deleteID.length;i++){
	            this.customerIdList.push(
	              this.deleteID[i].customerId
	            )
						}
	        },
	        //删除客户信息
	        deleteOverseasCustomer() {
	        	this.$axios3.post('/deletedExOverseasCustomer', {
							ownedEnterpriseId:this.nickCompanyId,
							customerIdList:this.customerIdList
						}).then((res) => {
							if(res.data.code === 200){
								this.$message.success('境外客户信息删除成功');
								 this.$emit('query');
			        }else{
              	this.$message.error(res.data.msg);
							}
							
	        	}).catch((e) => {
	        			console.log(e);
						});
						this.dialogFormVisible=false;
	        }
	      },
			}
</script>

<style scoped>

</style>
