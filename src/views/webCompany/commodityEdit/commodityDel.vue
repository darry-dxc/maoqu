<template>
    <div>
      <el-button type="info" @click="deleteConfirm" :disabled="deleteID.length === 0" >删除</el-button>
      <el-dialog title="提示" :visible.sync="dialogFormVisible" width="600px">
        <span>确定要删除商品ID为<div class="red">{{commodityList}}</div>的商品数据吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteCommodity" size="small">确 定</el-button>
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
							commodityList:[]
            }
        },
				props:['deleteID'],
				computed:{
					nickCompanyMan() {
						return this.$store.state.nickCompanyMan;
					}
				},
        methods:{
	    		//删除信息弹出框
	        deleteConfirm(){
						this.dialogFormVisible = true;
						this.commodityList = [];
	          for (let i=0;i<this.deleteID.length;i++){
	            this.commodityList.push(
	              this.deleteID[i].commodityId
	            )
						}
	        },
	        //删除客户信息
	        deleteCommodity() {
	        	this.$axios3.post('/export/logicalDeleteCommodity', {
							editor:this.nickCompanyMan,
							commodityIdList:this.commodityList
						}).then((res) => {
							if(res.data.state === true){
								this.$message.success('商品删除成功');
								 this.$emit('query');
			        }else{
              	this.$message.error(res.data.data);
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
