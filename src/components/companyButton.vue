<template>
  <div>
        <button class="companyBtn" @click="dialogVisible = true">删除</button>
        <el-dialog class="Title" title="警告" :visible.sync="dialogVisible" width="30%" >
            <span class="Msg">确定要删除(海关)商品编码为10001的申报商品吗？</span>
            <span slot="footer" class="dialog-footer">
            <el-button class="cancleButton" @click="dialogVisible = false">取 消</el-button>
            <el-button class="ensureButton" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
</div>
</template>


<style>

.companyBtn{
  background-color: #4C9BD9;
  border-radius:5px;
  width: 100px;
  height: 35px;
  font-size: 20px;
  color: #fff;
  text-align: center;
}

.el-dialog__header {
  background-color: #F2F2F2;
  font-family: FontAwesome;  
}

.el-dialog__title {
  font-size: 20px;
  color:#666;
  font-weight:400;
}


.el-dialog{
  border-radius:3px;
  box-shadow: 1px 3px 5px 3px #333;
}

.el-dialog__body { 
  color: #666;
  font-size: 18px;
}

.el-button{
  width: 80px;
  height: 35px;
  border-radius: 3px;
  font-family: FontAwesome;
  font-size: 18px;
  text-align: center;
}


</style>

<script type="text/javascript">
export default {
    data() {
      return {
        dialogVisible: false
      };
    },
  };
</script>