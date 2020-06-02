<template>
    <div>
      <el-button type="primary" class="btn" @click="deleteConfirm" :disabled="isDisabled === true" size="small">删除</el-button>
      <el-dialog title="提示" :visible.sync="dialogFormVisible" width="600px">
        <span>确定要删除外商速记代码为<div class="red">{{customerId}}</div>的公司信息吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="deleteOverseasCustomer" class="sure">确 定</el-button>
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
            }
        },
        props:['deleteID'],
        methods:{
	        //判断删除按钮是否可用
	        deleteDisable(){
	          this.isDisabled = false;
	        },
	        deleteNotDisable(){
	          this.isDisabled = true;
	        },
	    //删除信息弹出框
	        deleteConfirm(){
	          this.dialogFormVisible = true;
	          let customerIdArr = [];
	          for (let i=0;i<this.deleteID.length;i++){
	            customerIdArr.push(
	              this.deleteID[i].shorthandNo
	            )
	          }
	          this.customerId = customerIdArr;
	        },
	        //删除客户信息
	        deleteOverseasCustomer() {
	        	let deleteIdArr = [];
	        	for(let i = 0; i < this.deleteID.length; i++) {
	        		deleteIdArr.push(
	        			this.deleteID[i].customerId
	        		);
	        	}
	        	let param = {
	        		'deleteId': deleteIdArr,
	        	};
	        	this.$axios3.post('overseasCustomerInfo/deletedOverseasCustomerInfoById', param)
					.then((response) => {
						if(response.data.state === 1){
			        	this.$parent.queryOverseasCustomer();
			        	this.$message.success('境外客户信息删除成功');
			        }
			        else{
              			this.$message.error('境外客户信息删除失败');
			        	this.dialogVisible = true;
			        }
	        		})
	        		.catch(function(error) {
	        			console.log(error);
	        		});
	        	this.dialogFormVisible = false;
	        }
	        },

	        }</script>

<style scoped>

</style>
