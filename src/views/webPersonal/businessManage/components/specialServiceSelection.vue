<template>
  <el-dialog title="特殊业务标识" :visible.sync="dialogUserVisible" width="50%" append-to-body>
    <div>
      <el-checkbox-group class="login-checkbox" v-model="selection" :disabled="isDisabled">
        <el-checkbox class="checkboxFirst" label="国际赛事" name="type" />
        <el-checkbox class="checkboxNext" label="特殊进出军工物资" name="type" />
        <el-checkbox class="checkboxNext" label="国际援助物资" name="type" />
        <el-checkbox class="checkboxNext" label="国际会议" name="type" />
        <el-checkbox class="checkboxNext" label="直通放行" name="type"/>
        <el-checkbox class="checkboxNext" label="外交礼遇" name="type"/>
        <el-checkbox class="checkboxNext" label="转关" name="type"/>
      </el-checkbox-group>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="saveSelectionInfo" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        isDisabled:false,
        dialogUserVisible:false,
        selection:[],
        saveSelection:[],
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
      //显示特殊业务标识对话框
      showSelectionInfoDialog(val){
        if(val !== null){
          this.selection = val;
        }
        this.dialogUserVisible = true;
      },
      //确定按钮
      saveSelectionInfo(){
        this.$emit("listenSelectionInfo",this.selection);
        this.dialogUserVisible = false;
      },
    }
  }
</script>

<style scoped>
  .checkboxFirst{
    padding-left: 30px;
    padding-bottom: 20px;
  }
  .checkboxNext{
    padding-bottom: 20px;
  }
</style>
