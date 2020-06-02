<template>
    <div>
      <el-dialog 
        title="商品列表" 
        :visible.sync="dialogFormVisible" 
        width="800px" 
        center
        append-to-body
      >
        <el-table
          :data="commodityData"
          ref="commodityTable"
          highlight-current-row
          style="width: 100%"
          height="400px"
          @current-change="handleCurrentChange"
          border
        >
          <el-table-column prop="customsNo" label="商品编码" />
          <el-table-column prop="commodityName" label="商品名称" />
          <el-table-column prop="remark" label="备注"/>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="chooseCommodity">确 定</el-button>
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
              isDisabled: true,
              commodityData:[],
              choosedCommodity:{},
              currentPage:1,
              total:0,
              pageSize:10,
              radio:''
            }
        },
      methods:{
        chooseCommodity(){
          this.dialogFormVisible = false;
          this.$emit('chooseCommodity',this.choosedCommodity)
        },
        handleCurrentChange(val){
          this.choosedCommodity = val
        }
      }
    }
</script>

<style scoped>

</style>
