<template>
    <div>
      <el-dialog
        title="编辑检验检疫货物规格"
        :visible.sync="dialogFormVisible"
        width="600px"
        append-to-body
        center
      >
        <el-form :model="form" style="height:400px">
          <el-row>
            <el-form-item label="成分/原料/组分" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.composition"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="产品有效期" :label-width="formLabelWidth" class="form-item">
              <el-date-picker
                size="small"
                v-model="form.validity"
                type="date"
                placeholder="选择日期"
                style="width:100%"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="产品保质期(天)" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.shelflife"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="境外生产企业" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.company"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="货物规格" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.specification"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="货物型号" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.model"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="货物品牌" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.brand"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="生产日期" :label-width="formLabelWidth" class="form-item">
              <el-date-picker
                size="small"
                v-model="form.productdate"
                type="dates"
                placeholder="选择日期"
                style="width:100%"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="生产批次" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.productbatch"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="生产单位代码" :label-width="formLabelWidth" class="form-item">
              <el-input size="small" v-model="form.companycode"/>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="createIgs" size="small">确 定</el-button>
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
          return {
            dialogFormVisible: false,
            formLabelWidth: '220px',
            form:{
              composition:'',
              validity:'',
              shelflife:'',
              company:'',
              specification:'',
              model:'',
              brand:'',
              productdate:'',
              productbatch:'',
              companycode:''
            }
          }
      },
      components:{

      },
      computed:{

      },
      mounted(){

      },
      methods:{
        createIgs(){
          this.dialogFormVisible = false;
          if(this.form.productdate !== '' && this.form.productdate !== null){
            this.form.productdate = this.form.productdate.join(';')
          }
          this.$emit('chooseCiqSpecification',this.form)
        },
      }
    }
</script>

<style scoped>
  .form-item{
    margin: 0 ;
  }
</style>
