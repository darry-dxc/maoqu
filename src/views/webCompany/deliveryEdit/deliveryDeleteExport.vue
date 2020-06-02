<template>
    <div>
      <el-button type="info" @click="deleteConfirm" :disabled="deleteID.length === 0">删除</el-button>
      <el-dialog title="警告" :visible.sync="dialogFormVisible" width="600px">
        <div>确定要删除海关代码为<div class="red">{{deliveryIdList}}</div>的单位信息吗？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteDelivery" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          dialogFormVisible: false,
          deliveryIdList:[],
        }
      },
      props:['deleteID'],
      computed:{
        nickCompanyId() {
          return this.$store.state.nickCompanyId;
        }
      },
      methods: {
        //删除按钮提示框弹出
        deleteConfirm(){
          this.dialogFormVisible = true;
          this.deliveryIdList = [];
          for (let i=0;i<this.deleteID.length;i++){
            this.deliveryIdList.push(
              this.deleteID[i].deliveryId
            )
          }
        },
        //境内收发货人删除
        deleteDelivery(){
          this.$axios3.post('/deleteDeliveryEnterprise',{
            ownedEnterpriseId:this.nickCompanyId,
            deliveryIdList:this.deliveryIdList
          }).then((res) => {
            if(res.data.code === 200){
                this.$message.success('境外客户信息删除成功');
                this.$emit('query');
			        }else{
              	this.$message.error(res.data.msg);
			        }
          }).catch((e)=> {
            console.log(e);
          });
          this.dialogFormVisible=false;
        }
      }
    }
</script>

<style scoped>

</style>
