<template>
    <div>
      <el-dialog 
        title="检验检疫编码列表" 
        :visible.sync="dialogFormVisible" 
        width="800px" 
        append-to-body
      >
        <el-table
          :data="ciqData"
          highlight-current-row
          style="width: 100%"
          height="400px"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="inspectAndQuarantineName" label="名称" />
          <el-table-column prop="inspectAndQuarantineType" label="类型" />
          <el-table-column prop="ciqNo" label="HS代码"/>
          <el-table-column prop="hsName" label="HS名称" />
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="creatName">确 定</el-button>
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
              customsCode: [],
              ciqData:[],
              choosedInspectAndQuarantine:{}
            }
        },
      methods:{
        handleCurrentChange(val){
          this.choosedInspectAndQuarantine = val;
        },
        creatName(){
          this.dialogFormVisible = false;
          this.$emit('chooseInspectAndQuarantine',this.choosedInspectAndQuarantine)
        }
      }
    }
</script>

<style scoped>

</style>
