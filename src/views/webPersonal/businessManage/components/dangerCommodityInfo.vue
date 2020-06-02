<template>
  <el-dialog title="编辑危险货物信息" :visible.sync="dialogUserVisible" width="35%" >
    <div>
      <el-form :model="form">
        <el-form-item label="非危险化学品"  label-width="140px" class="formBottom">
          <el-select v-model="form.hazardousChemicals" filterable clearable style="width: 100%" size="small">
            <el-option
              v-for="item in isOrNot"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UN编码"  label-width="140px" class="formBottom">
          <el-input v-model="form.unCode"  size="small" />
        </el-form-item>
        <el-form-item label="危险货物名称"  label-width="140px" class="formBottom">
          <el-input v-model="form.dangerousGoodsName"  size="small" />
        </el-form-item>
        <el-form-item label="危包类别"  label-width="140px" class="formBottom">
          <el-select v-model="form.dangerousPackageCategory" filterable clearable style="width: 100%" size="small">
            <el-option
              v-for="item in kinds"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span >{{ item.value }}-</span>
              <span >{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="危包规格"  label-width="140px" class="formBottom">
          <el-input v-model="form.dangerousPackageSpec"  size="small" />
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" size="small" @click="saveDangerComInfo" style="margin-left: 85%;margin-top: 20px">确  认</el-button>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        dialogUserVisible:false,
        form:{
          hazardousChemicals:'',
          unCode:'',
          dangerousGoodsName:'',
          dangerousPackageCategory:'',
          dangerousPackageSpec:'',
        },
        isOrNot:[{
          value:'0',
          label:'否'
        },{
          value:'1',
          label:'是'
        }],
        kinds:[{
          value:'1',
          label:'一类'
        },{
          value:'2',
          label:'二类'
        },{
          value:'3',
          label:'三类'
        }],
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
      showDangerComDialog(val){
        this.form = val;
        this.dialogUserVisible = true;
      },
      //确认
      saveDangerComInfo(){
        this.$emit("listenDangerComInfo",this.form);
        this.dialogUserVisible = false;
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
