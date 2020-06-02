<template>
  <div class="export-container" >
    <el-row>
      <el-button type="primary" plain size="mini" disabled>导入</el-button>
      <el-button type="primary" plain size="mini" @click="addDoc('docForm')" :disabled="isDisable">新增</el-button>
      <el-button type="primary" plain size="mini" @click="deleteDoc" :disabled="isDisable">删除</el-button>
    </el-row>
    <el-table size="small" :data="docData" @row-click="editDocData" @selection-change="deleteVal" height="150px" stripe>
      <el-table-column type="selection"/>
      <el-table-column label="单证代码" prop="attachCertificateType" width="80px" />
      <el-table-column label="单证编号" prop="attachCertificateNo" />
    </el-table>
    <el-form ref="docForm" :model="docForm" :rules="rules" size="mini" :disabled="isDisable">
      <el-form-item label="单证代码：" prop="attachCertificateType" label-width="100px" class="formItem">
        <el-select v-model="docForm.attachCertificateType" :filter-method="certificateCodesFilter" filterable clearable>
          <el-option
            v-for="item in certificateCodesAll"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单证编号：" prop="attachCertificateNo" label-width="100px" class="formItem">
        <el-input size="mini" v-model="docForm.attachCertificateNo" @keyup.enter.native="addDoc('docForm')"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          certificateCodes: [],
          certificateCodesAll: [],
          isDisable:true,
          docData:[],
          docForm:{
            attachCertificateType:'',
            attachCertificateNo:''
          },
          docArr:[],
          selectDoc:[],
          options:[],
          rules:{
            attachCertificateType: [{ required: true, message: '请输入单证代码', trigger: 'blur' }],
            attachCertificateNo: [{ required: true, message: '请输入单证编号', trigger: 'focus' }],
          }
        }
      },
      mounted(){
        this.loadStaticData();//请求本地数据
      },
      methods:{
        isDisabled(){
          this.isDisable = false;
        },
        //请求本地数据
        loadStaticData(){
          this.$axios.all([
            this.$axios.get('static/pub_certificatecode.json'),//单证代码
          ]).then(this.$axios.spread((
            res_certificatecode
          ) => {
            this.certificateCodes = res_certificatecode.data.RECORDS;
            this.certificateCodesAll = this.certificateCodes;
          })).catch((e) => {
            console.log(e);
          })
        },
        //单证代码
        certificateCodesFilter(query){
          if(query !== ''){
            this.certificateCodesAll = this.certificateCodes.filter(item => {
              return (item.value+item.label).toString().includes(query);
            })
          }else {
            this.certificateCodesAll = this.certificateCodes.slice(0,19);
          }
        },
        //选中随附单据信息
        editDocData(row){
          console.log('pp',row)
          this.docForm = row;
        },
        //添加单证随附单证到表格
        addDoc(form){
          this.$refs[form].validate((valid) => {
            if(valid){
              var isEdit = false;
              this.docData.find((item)=>{
                if(item.attachCertificateType == this.docForm.attachCertificateType){
                  isEdit = true;
                  item.attachCertificateType = this.docForm.attachCertificateType.substr(0,1);
                  item.attachCertificateNo = this.docForm.attachCertificateNo;
                  console.log('oo',this.docForm)
                }
              })
              if(isEdit == false){
                this.docData.push({
                  attachCertificateType:this.docForm.attachCertificateType.substr(0,1),
                  attachCertificateNo:this.docForm.attachCertificateNo,
                });
              }
              this.docArr = [];
              for(let i=0;i<this.docData.length;i++){
                this.docArr.push(this.docData[i].attachCertificateType);
              }
              let doc = this.docArr.join(",");
              this.$emit('addDoc',doc);
              this.docForm = {
                attachCertificateType: '',
                attachCertificateNo: ''
              }
            }else {
              return false;
            }
          });
        },
        deleteVal(val){
          this.selectDoc = val;
        },
        deleteDoc(){
          for (let i=0;i<this.selectDoc.length;i++){
            let index = this.docData.indexOf(this.selectDoc[i]);
            this.docData.splice(index,1);
          }
          this.docArr = [];
          for(let i=0;i<this.docData.length;i++){
            this.docArr.push(this.docData[i].attachCertificateType);
          }
          let doc = this.docArr.join(",");
          this.$emit('addDoc',doc);
        },
      }
    }
</script>

<style scoped>
  .export-container{
    margin: 20px 2px;
    background-color: white;
    padding-top: 10px;
    border: 1px solid #E4E4E4;
  }
  .formItem{
    margin: 10px 0;
  }
</style>
