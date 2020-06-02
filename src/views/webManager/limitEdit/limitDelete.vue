<template>
    <div>
      <el-button type="primary" @click="deleteConfirm" class="addBtn" :disabled="isDisabled === true">删除</el-button>
      <el-dialog title="警告" :visible.sync="dialogFormVisible" width="600px">
        <span>确定要删除<span class="red" v-for="item in limitCode">{{item}}  </span>吗?</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
          <el-button type="primary" @click="deleteLimit" class="sure" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webManager/limitEdit/limitAdd.css';
    export default {
        data() {
            return {
              dialogFormVisible: false,
              isDisabled: true,
              limitCode: [],
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
          let limitCodeArr = [];
          for (let i=0;i<this.deleteID.length;i++){
            limitCodeArr.push(
              this.deleteID[i].roleName
            )
          }
          this.limitCode = limitCodeArr;
        },
        //权限删除
        deleteLimit(){
          let deleteIdArr = [];
          for (let i=0;i<this.deleteID.length;i++){
            deleteIdArr.push(this.deleteID[i].roleName);
          }
          //console.log(this.deleteIdArr);
          let params = {
            'type':2,
            'roleNameList':deleteIdArr,
          };
          console.log(params);
          this.$axios1.post('basicService/admin/audRole',params).then(function (response){
            let res = response.data;
            console.log(res);
            if(res.state=="1"){
            this.$parent.findAllRoles();
            this.$message.success('删除成功');
          }else{
          console.log("请求失败");
          }
         });
           this.dialogFormVisible=false;
        },
      }
    }
</script>
