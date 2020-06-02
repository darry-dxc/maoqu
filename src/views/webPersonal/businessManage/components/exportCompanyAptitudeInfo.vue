<template>
  <el-dialog title="编辑企业资质信息" :visible.sync="dialogUserVisible" width="50%" append-to-body>
    <div>
      <el-form :model="form">
        <el-row>
          <el-col :span="14">
            <el-form-item label="企业资质类别"  label-width="110px">
              <el-select v-model="form.qualificationCategoryName" :filter-method="aptitudeTypesFilter" :disabled="isDisabled" filterable clearable size="small" style="width: 100%">
                <el-option
                  v-for="item in aptitudeTypesAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="企业资质编码"  label-width="100px">
              <el-input v-model="form.qualificationCategoryNo"  size="small" :disabled="isDisabled"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="mini" @click="addUserInfo" :disabled="isDisabled">新  增</el-button>
      <el-button type="primary" size="mini" @click="saveUserInfo" :disabled="isDisabled">保  存</el-button>
      <el-button type="primary" size="mini" @click="deleteUserInfo" :disabled="isDisabled">删  除</el-button>
    </div>
    <div>
      <el-table :data="userTableData" stripe style="width: 100%" @row-click="editSelection" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" class="selection">
        </el-table-column>
        <el-table-column type="index" label="序号" width="90">
        </el-table-column>
        <el-table-column prop="qualificationCategoryCode" label="企业资质类别代码">
        </el-table-column>
        <el-table-column prop="qualificationCategoryName" label="企业资质类别名称">
        </el-table-column>
        <el-table-column prop="qualificationCategoryNo" label="企业资质编码">
        </el-table-column>
      </el-table>
    </div>
    <p style="color: red;font-size: 14px">企业承诺：本单位持有海关要求的合格保证、标签标识及其他证明声明材料，知悉相关材料内容，保证符合法律法规要求，并自存留档。</p>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        isDisabled:false,
        aptitudeTypes:[],
        aptitudeTypesAll:[],
        dialogUserVisible:false,
        userTableData:[],
        form:{
          qualificationCategoryName:'',
          qualificationCategoryNo:'',
        },
        selection:'',
        isEdit:false,
      }
    },
    //定义组件
    components:{

    },
    //定义初始化函数
    mounted(){
      this.loadStaticData();
    },

    //定义方法
    methods:{
      //显示企业资质对话框
      showAptitudeInfoDialog(val){
        if(typeof val !== "undefined"){
          this.userTableData = [];
          for(var i = 0;i<val.length;i++){
            this.userTableData.push({
              qualificationCategoryCode:val[i].qualificationCategoryCode,
              qualificationCategoryName:val[i].qualificationCategoryName,
              qualificationCategoryNo:val[i].qualificationCategoryNo,
            })
          }
        }
        this.dialogUserVisible = true;
      },
      //新增按钮
      addUserInfo(){
        this.form = {};
      },
      //保存按钮
      saveUserInfo(){
        if(this.isEdit == false){
          if(this.form.qualificationCategoryName !== '' && this.form.qualificationCategoryNo !== ''){
            var code = this.aptitudeTypes.find((item) => {
              if(item.label == this.form.qualificationCategoryName){
                return item
              }
            }).value;
            this.userTableData.push(
              {
                qualificationCategoryCode:code,
                qualificationCategoryName:this.form.qualificationCategoryName,
                qualificationCategoryNo:this.form.qualificationCategoryNo,
              }
            )
            this.$store.commit("updateEnterpriseQualificationList",this.userTableData);
            this.$emit('listenAptitudeInfo',this.userTableData);
            this.form = {};
          }
          else {
            this.$message.error('企业资质类别代码或企业资质编码不能为空!');
          }
        }
        else {
          this.$store.commit("updateEnterpriseQualificationList",this.userTableData);
          this.$emit('listenAptitudeInfo',this.userTableData);
          this.form = {};
        }
        this.isEdit = false;
      },
      editSelection(row){
        this.form = row;
        this.isEdit = true;
      },
      handleSelectionChange(val){
        console.log(val);
        this.selection = val;
      },
      //删除按钮
      deleteUserInfo(){
        this.userTableData.splice(this.selection,this.selection.length);
        this.$store.commit("updateEnterpriseQualificationList",this.userTableData);
        this.$emit('listenAptitudeInfo',this.userTableData);
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_excompanyqualification.json'),//企业资质
        ]).then(this.$axios.spread((
          res_countryregion,
        ) => {
          this.aptitudeTypes = res_countryregion.data.RECORDS;
          this.aptitudeTypesAll = this.aptitudeTypes.slice(0,19);
        })).catch((e) => {
          console.log(e);
        })
      },
      //企业资质
      aptitudeTypesFilter(query){
        if(query !== ''){
          this.aptitudeTypesAll = this.aptitudeTypes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.aptitudeTypesAll = this.aptitudeTypes.slice(0,19);
        }
      },
    }
  }
</script>

<style scoped>

</style>
