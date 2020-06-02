<template>
  <el-dialog title="编辑检验检疫货物规格" :visible.sync="dialogUserVisible" width="40%" >
    <div>
      <el-form :model="form">
        <el-form-item label="成分/原料/组分"  label-width="180px" class="formBottom">
          <el-input v-model="form.ingredient"  size="small" />
        </el-form-item>
        <el-form-item label="产品有效期"  label-width="180px" class="formBottom">
          <el-date-picker
            style="width: 100%;"
            v-model="form.effictiveDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品保质期(天)"  label-width="180px" class="formBottom">
          <el-input v-model="form.effictiveDateNum"  size="small" />
        </el-form-item>
        <el-form-item label="境外生产企业"  label-width="180px" class="formBottom">
          <el-input v-model="form.companyName"  size="small" />
        </el-form-item>
        <el-form-item label="货物规格"  label-width="180px" class="formBottom">
          <el-input v-model="form.Specification"  size="small" />
        </el-form-item>
        <el-form-item label="货物型号"  label-width="180px" class="formBottom">
          <el-input v-model="form.models"  size="small" />
        </el-form-item>
        <el-form-item label="货物品牌"  label-width="180px" class="formBottom">
          <el-input v-model="form.brand"  size="small" />
        </el-form-item>
        <el-form-item label="生产日期"  label-width="180px" class="formBottom">
          <el-date-picker
            style="width: 100%;"
            v-model="form.produceData"
            type="dates"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="生产批次"  label-width="180px" class="formBottom">
          <el-input v-model="form.batch"  size="small" />
        </el-form-item>
        <el-form-item v-show="exOrim" label="生产单位代码"  label-width="180px" class="formBottom">
          <el-input v-model="form.companyCode"  size="small" />
        </el-form-item>
      </el-form>
    </div>
    <el-button v-show="exOrim" type="primary" size="small" @click="saveExQuaranComInfo" style="margin-left: 90%">确 认</el-button>
    <el-button v-show="!exOrim" type="primary" size="small" @click="saveImQuaranComInfo" style="margin-left: 90%">确 认</el-button>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        dialogUserVisible:false,
        exOrim:false,
        form:{
          ingredient:'',
          effictiveDate:'',
          effictiveDateNum:'',
          companyName:'',
          Specification:'',
          models:'',
          brand:'',
          produceData:[],
          batch:'',
          companyCode:'',
        },
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
      //显示检验检疫货物规格对话框
      showQuaranComDialog(inspectionAndQuarantineGoodsSpec,exOrim){
        this.exOrim = exOrim;
        if(inspectionAndQuarantineGoodsSpec !== '' && inspectionAndQuarantineGoodsSpec !== null && inspectionAndQuarantineGoodsSpec !== undefined){
          var val = inspectionAndQuarantineGoodsSpec.split('&');
          var dates = [];
          if(val[7] != undefined){
            if(val[7].length > 11){
              dates = val[7].split(';')
            }
            else {
              dates = val[7]
            }
          }
          else {
            dates = ''
          }
          this.form = {
            ingredient:val[0],
            effictiveDate:val[1],
            effictiveDateNum:val[2],
            companyName:val[3],
            Specification:val[4],
            models:val[5],
            brand:val[6],
            produceData:dates,
            batch:val[8],
            companyCode:val[9],
          };
        }
        this.dialogUserVisible = true;
      },
      //出口确认
      saveExQuaranComInfo (){
        this.dialogUserVisible = false;
        if(this.form.produceData != null && this.form.produceData != '' && typeof this.form.produceData != "string"){
          this.form.produceData = this.form.produceData.join(';')
        }
        else if(this.form.produceData == null){
          this.form.produceData = '';
        }
        if(this.form.effictiveDate == null && this.form.effictiveDate == undefined){
          this.form.effictiveDate = ''
        }
        var saveInfo = this.form.ingredient + '&' + this.form.effictiveDate + '&' + this.form.effictiveDateNum + '&'
          + this.form.companyName + '&' + this.form.Specification + '&' + this.form.models + '&'
          + this.form.brand + '&' + this.form.produceData + '&' + this.form.batch + '&' + this.form.companyCode;
        this.$emit("listenEditQuaranCom",saveInfo);
        console.log('货物规格',saveInfo);
      },
      //进口确认
      saveImQuaranComInfo (){
        this.dialogUserVisible = false;
        if(this.form.produceData != null && this.form.produceData != '' && typeof this.form.produceData != "string"){
          this.form.produceData = this.form.produceData.join(';')
        }
        else if(this.form.produceData == null){
          this.form.produceData = '';
        }
        if(this.form.effictiveDate == null && this.form.effictiveDate == undefined){
          this.form.effictiveDate = ''
        }
        var saveInfo = this.form.ingredient + '&' + this.form.effictiveDate + '&' + this.form.effictiveDateNum + '&'
          + this.form.companyName + '&' + this.form.Specification + '&' + this.form.models + '&'
          + this.form.brand + '&' + this.form.produceData + '&' + this.form.batch;
        this.$emit("listenEditQuaranComIm",saveInfo);
        console.log('货物规格',saveInfo);
      },
    }
  }
</script>

<style scoped>
  .dataPicker{
    width: 100%;
  }
  .formBottom{
    margin-bottom: 0px;
  }

</style>
