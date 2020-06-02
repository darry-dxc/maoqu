<template>
    <div>
      <el-button type="primary" @click="deleteConfirm" :disabled="deleteID.length === 0">删除</el-button>
      <el-dialog title="警告" :visible.sync="dialogFormVisible" width="600px">
        <span>确定要删除海关代码为<div class="red">{{receiveEnterpriseIdList}}</div>的单位信息吗？</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" >取 消</el-button>
          <el-button type="primary" @click="deleteDelivery">确 定</el-button>
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
          receiveEnterpriseIdList:[],
          isDisabled: true,
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
          this.receiveEnterpriseIdList = [];
          for (let i=0;i<this.deleteID.length;i++){
            this.receiveEnterpriseIdList.push(
              this.deleteID[i].receiveenterpriseid
            )
          }
        },
        //商品删除
        deleteDelivery(){
          this.$axios3.post('/delReceiveEnterprise',{
            ownedEnterpriseId:this.nickCompanyId,
            receiveEnterpriseIdList:this.receiveEnterpriseIdList
          }).then((response) => {
            // console.log(response.data);
            this.$emit('query');
            this.$message.success('操作成功!');
          }).catch((error)=> {
            console.log(error);
            this.$message.error(error.data.data.msg);
          });
          this.dialogFormVisible=false;
        }
      }
    }
</script>

<style scoped>

</style>
