<template>
  <div class="export-container">
    <el-row >
      <el-button type="primary" plain size="mini" disabled>导入</el-button>
      <el-button type="primary" plain size="mini" @click="addContainer('containerForm')" :disabled="isDisable">新增</el-button>
      <el-button type="primary" plain size="mini" @click="deleteContainer" :disabled="isDisable">删除</el-button>
    </el-row>
  <el-table size="mini" :data="containerData" @row-click="selectedChange" @selection-change="deleteVal" height="150px" stripe>
    <el-table-column type="selection" width="40px"/>
    <el-table-column label="集装箱号" prop="containerNo" width="70px"/>
    <el-table-column label="集装箱规格" prop="containerSpecification" width="130px" :formatter="containerFormat"/>
    <el-table-column label="拼箱识别" prop="lclMarker" :formatter="lclMarkerFormat"/>
  </el-table>
  <el-form :model="containerForm" :show-message="false" ref="containerForm" :disabled="isDisable">
    <el-form-item label="集装箱号：" label-width="130px" class="formItem" prop="containerNo" required>
      <el-input size="mini" v-model="containerForm.containerNo" />
    </el-form-item>
    <el-form-item label="集装箱规格：" label-width="130px" class="formItem" prop="containerSpecification" required>
      <el-select v-model="containerForm.containerSpecification" size="mini" filterable clearable >
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" >
          <span >{{ item.value }}</span>
          <span >{{ item.label }}</span>
          <span style="color: #8492a6; font-size: 13px">{{ item.title }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自重(KG)：" label-width="130px" class="formItem">
      <el-input size="mini" v-model="containerForm.containerWeight" @keyup.enter.native="addContainer('containerForm')"/>
    </el-form-item>
    <el-form-item label="拼箱标识：" label-width="130px" class="formItem">
      <el-select v-model="containerForm.lclMarker" size="mini" filterable clearable>
        <el-option v-for="item in yesOrNot"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" >
          <span >{{ item.value }}-</span>
          <span >{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品项号关系：" label-width="130px" class="formItem" prop="commodityItemNoReleation" required>
      <el-input size="mini" v-model="containerForm.commodityItemNoReleation" @keyup.enter.native="addContainer" disabled>
        <el-button size="mini" slot="append" icon="el-icon-more" type="primary" @click="releation"></el-button>
      </el-input>
    </el-form-item>
  </el-form>
    <!--商品项号关系弹出框-->
    <el-dialog title="编辑商品项号关系" :visible.sync="dialogCommodityItemNoVisible" width="45%" append-to-body center>
      <el-table ref="itemNoData" :data="commodityItemNoData" @selection-change="selectionChange" border size="small" stripe style="width:100%">
        <el-table-column type="selection" width="55"/>
        <el-table-column label="序号" prop="commodityItemNo" />
        <el-table-column label="商品编号" prop="commodityCustomsNo"/>
        <el-table-column label="商品名称" prop="commodityName"/>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="selectionSave" class="cancel" size="small">确 认</el-button>
        <el-button type="primary" @click="dialogCommodityItemNoVisible = false" class="sure" size="small">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data() {
        return {
          dialogCommodityItemNoVisible:false,
          commodityItemNoData:[],
          isDisable:true,
          containerData:[],
          selectContainer:[],
          containerForm:{
            containerNo:'',
            containerSpecification:'',
            lclMarker:'',
            containerWeight:'',
            commodityItemNoReleation:'',
          },
          options:[{
            value:'11',
            label:'普通2*标准箱（L）',
            title:'L 111'
          },{
            value:'12',
            label:'冷藏2*标准箱（L）',
            title:'L 121'
          },{
            value:'13',
            label:'罐式2*标准箱（L）',
            title:'L 131'
          },{
            value:'21',
            label:'普通标准箱（S）',
            title:'S 211'
          },{
            value:'22',
            label:'冷藏标准箱（S）',
            title:'S 221'
          },{
            value:'23',
            label:'罐式标准箱（S）',
            title:'S 231'
          },{
            value:'31',
            label:'其他标准箱（S）',
            title:'S 998'
          },{
            value:'32',
            label:'其他2*标准箱（L）',
            title:'L 999'
          }],
          yesOrNot:[{
            value:'0',
            label:'否'
          },{
            value:'1',
            label:'是'
          }],
          isEditInfo:{}
        }
      },
      methods:{
        isDisabled(){
          this.isDisable = false;
        },
        addContainer(){
          console.log('ll',this.containerForm.containerNo)
          if(this.containerForm.containerNo != ''
            && this.containerForm.containerSpecification != ''
            && this.containerForm.commodityItemNoReleation != ''){
            var isEdit = false;
            this.containerData.find((item)=>{
              if(item == this.isEditInfo){
                isEdit = true;
                item.containerNo = this.containerForm.containerNo;
                item.containerSpecification = this.containerForm.containerSpecification;
                item.containerWeight = this.containerForm.containerWeight;
                item.lclMarker = this.containerForm.lclMarker;
                item.commodityItemNoReleation = this.containerForm.commodityItemNoReleation;
                this.isEditInfo = {}
              }
            })
            if(isEdit == false) {
              this.containerData.push({
                containerNo:this.containerForm.containerNo,
                containerSpecification:this.containerForm.containerSpecification,
                containerWeight:this.containerForm.containerWeight,
                lclMarker:this.containerForm.lclMarker,
                commodityItemNoReleation:this.containerForm.commodityItemNoReleation,
              });
            }
            this.$emit('addContainer',this.containerData);
            this.$refs.itemNoData.clearSelection()
          }
          this.containerForm = {
            containerNo:'',
            containerSpecification:'',
            lclMarker:'',
            containerWeight:'',
            commodityItemNoReleation:'',
          }
        },
        //选中的集装箱
        deleteVal(val){
          this.selectContainer = val;
        },
        selectedChange(val){
          if(this.containerForm.commodityItemNoReleation != ''){
            this.$refs.itemNoData.clearSelection()
          }
          this.isEditInfo = val;
          this.containerForm = val;
        },
        //选中商品
        selectionChange(val){
          this.selection = val;
        },
        selectionSave(){
          if(this.selection != []){
            var itemNo = [];
            for(var i = 0; i < this.selection.length; i++){
              itemNo.push(this.selection[i].commodityItemNo)
            }
            this.containerForm.commodityItemNoReleation = itemNo.sort().toString();
          }
          this.dialogCommodityItemNoVisible = false;
        },
        //集装箱规格查找中文名称
        containerFormat(row,col){
          let val = row[col.property];
          if (val === undefined || val == '' || val == null) {
            return "";
          }
          else {
            var data = this.options.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //拼箱识别
        lclMarkerFormat(row,col){
          let val = row[col.property];
          if(val == undefined || val == '' || val == null){
            return ''
          }
          else {
            if(val == 0){
              return '否'
            }
            else if(val == 1){
              return '是'
            }
          }
        },
        deleteContainer(){

          for (let i=0;i<this.selectContainer.length;i++){
            let index = this.containerData.indexOf(this.selectContainer[i]);
            this.containerData.splice(index,1);
          }
          this.$emit('addContainer',this.containerData);
        },
        releation(){
          setTimeout(()=>{
            console.log('kk444',this.containerForm.commodityItemNoReleation)
            if(this.containerForm.commodityItemNoReleation != ''){
              var relationArray = this.containerForm.commodityItemNoReleation.split(',')
              var relationData = [];
              for(let i in relationArray){
                relationData[i] = this.commodityItemNoData.find((item)=>{
                  if(relationArray[i] == item.commodityItemNo){
                    return item;
                  }
                })
              }
              relationData.forEach((row) => {
                this.$refs.itemNoData.toggleRowSelection(row);
              })
            }
            else {
              this.$refs.itemNoData.clearSelection()
            }
          },50)
          this.dialogCommodityItemNoVisible = true;
        }
      }
    }
</script>

<style scoped>
  .export-container{
    margin: 5px 2px;
    background-color: white;
    padding-top: 10px;
    border: 1px solid #E4E4E4;
  }
  .formItem{
    margin: 10px 0;
  }
</style>
