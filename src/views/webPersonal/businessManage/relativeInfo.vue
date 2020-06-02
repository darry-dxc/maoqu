<template>
  <div class="export-container">
    <el-form :model="form">
      <el-form-item label="关联报关单：" label-width="120px" class="formItem">
        <el-input size="small" v-model="form.relatedDeclareForm" />
      </el-form-item>
      <el-form-item label="关联备案：" label-width="120px" class="formItem">
        <el-input size="small" v-model="form.relatedRecord"/>
      </el-form-item>
      <el-form-item label="保税/监管场所：" label-width="120px" class="formItem">
        <el-input size="small" v-model="form.taxOrSuperviseSite"/>
      </el-form-item>
      <el-form-item label="场地代码：" label-width="120px" class="formItem">
        <el-input size="small" v-model="form.siteCode"/>
      </el-form-item>
    </el-form>
    <div class="tips">
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="4" :offset="1">Tips:</el-col>
        <el-col :span="4">总价</el-col>
        <el-col :span="4">{{dealTotalPrice}}</el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12" :offset="2">成交数量合计</el-col>
        <el-col :span="4">{{dealQuantity}}</el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12" :offset="2">法定数量合计</el-col>
        <el-col :span="4">{{legalQuantity1}}</el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12" :offset="2">第二数量合计</el-col>
        <el-col :span="4">{{legalQuantity2}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              dealTotalPrice:0,
              dealQuantity:0,
              legalQuantity1:0,
              legalQuantity2:0,
              form:{
                relDeclarationNo:'',
                relRecordNo:'',
                warehouseNo:'',
                yardCode:''
              }
            }
        },
    }
</script>

<style scoped>
  .export-container{
    margin: 2px;
    background-color: white;
    color: #606266;
    border: 1px solid #E4E4E4;
  }
  .formItem{
    margin: 0;
  }
  .tips{
    font-size: 14px;
    border: 1px solid #E4E4E4;
    margin:5px 5px 5px 10px;
  }
  .row{
    margin-bottom: 10px;
  }
</style>
