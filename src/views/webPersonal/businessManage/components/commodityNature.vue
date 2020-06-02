<template>
  <el-dialog title="货物属性" :visible.sync="dialogUserVisible" width="50%" ><div>
    <el-checkbox-group class="login-checkbox" v-model="selection">
      <el-checkbox class="checkboxFirst" label="11-3C目录内" value="11" />
      <el-checkbox class="checkboxNext" label="12-3C目录外" value="12"/>
      <el-checkbox class="checkboxNext" label="13-无需办理3C认证" value="13"/>
      <el-checkbox class="checkboxNext" label="14-预包装" value="14"/>
      <el-checkbox class="checkboxNext" label="15-非预包装" value="15"/>
      <el-checkbox class="checkboxNext" label="16-转基因产品" value="16"/>
      <el-checkbox class="checkboxNext" label="17-非转基因产品" value="17"/>
      <el-checkbox class="checkboxNext" label="18-首次进出口" value="18"/>
      <el-checkbox class="checkboxNext" label="19-正常" value="19"/>
      <el-checkbox class="checkboxNext" label="20-废品" value="20"/>
      <el-checkbox class="checkboxNext" label="21-旧品" value="21"/>
      <el-checkbox class="checkboxNext" label="22-成套设备" value="22"/>
      <el-checkbox class="checkboxNext" label="23-带皮木材/板材" value="23"/>
      <el-checkbox class="checkboxNext" label="24-不带皮木材/板材" value="24"/>
      <el-checkbox class="checkboxNext" label="25-A级特殊物品" value="25"/>
      <el-checkbox class="checkboxNext" label="26-B级特殊物品" value="26"/>
      <el-checkbox class="checkboxNext" label="27-C级特殊物品" value="27"/>
      <el-checkbox class="checkboxNext" label="28-D级特殊物品" value="28"/>
      <el-checkbox class="checkboxNext" label="29-V/W非特殊物品" value="29"/>
      <el-checkbox class="checkboxNext" label="30-市场采购" value="30"/>
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
        dialogUserVisible:false,
        selection:[],
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
      //显示对话框
      showNatureSelectionDialog(val){
        console.log('kk',val)
        this.selection = val;
        this.dialogUserVisible = true;
      },
      //确定按钮
      saveSelectionInfo(){
        this.dialogUserVisible = false;
        console.log('xuan',this.selection)
        this.$emit("listenComNature",this.selection);
      },
    }
  }
</script>

<style scoped>
  .checkboxFirst{
    padding-left: 30px;
    padding-bottom: 20px;
    width: 130px;
  }
  .checkboxNext{
    padding-bottom: 20px;
    width: 130px;
  }
</style>
