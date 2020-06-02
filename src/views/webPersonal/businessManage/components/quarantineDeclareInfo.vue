<template>
  <el-dialog title="检疫检疫签证申报要素" :visible.sync="dialogUserVisible" width="50%" append-to-body>
    <div>
      <el-table ref="multipleTable" :data="TableData" stripe height="300" border style="width: 100%" >
        <el-table-column  width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.ischecked" @change="handleChecked(scope.row.certificateCode)" :disabled="isDisabled"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="certificateCode" label="证书代码" width="90">
        </el-table-column>
        <el-table-column prop="certificateName" label="证书名称" width="280">
        </el-table-column>
        <el-table-column prop="originalNumber" label="正本数量">
        </el-table-column>
        <el-table-column prop="copyNumber" label="副本数量">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-form :model="form">
        <el-form-item label="境内收发货人名称(外文)"  label-width="180px" class="formBottom">
          <el-input v-model="form.teRsComanyEnName"  size="small" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="境外收发货人名称(中文)"  label-width="180px" class="formBottom" >
          <el-input v-model="form.ovRsComanyCnName"  size="small" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="境外发货人地址"  label-width="180px" class="formBottom" v-show="isImport">
          <el-input v-model="form.ovConsignorAddress"  size="small" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="卸毕日期"  label-width="180px" class="formBottom" v-show="isImport">
          <el-date-picker
            class="dataPicker"
            v-model="form.unloadedDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :disabled="isDisabled"
            size="small">
          </el-date-picker>
        </el-form-item>
        <el-row>
          <el-col :span="22">
            <el-form-item label="商品英文名称"  label-width="180px" class="formBottom">
              <el-input v-model="form.commodityEnName"  size="small" :disabled="isDisabled"/>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item class="formBottom">
              <el-button type="primary" circle size="mini" icon="el-icon-more" @click="editCommodityName"></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-dialog title="编辑商品英文名称" :visible.sync="dialogVisible" width="50%" append-to-body>
          <div>
            <el-table :data="EditTableData" stripe height="300" border style="width: 100%" >
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column type="index" label="序号" width="70">
              </el-table-column>
              <el-table-column prop="name" label="商品编号">
              </el-table-column>
              <el-table-column prop="name" label="商品名称">
              </el-table-column>
              <el-table-column prop="name" label="商品英文名称">
              </el-table-column>
            </el-table>
          </div>
          <el-button type="primary" size="small" @click="saveCommodityInfo" :disabled="isDisabled" style="margin-left: 90%">保  存</el-button>
        </el-dialog>
      </el-form>
    </div>
    <el-button type="primary" size="small" @click="saveDeclareInfo" :disabled="isDisabled" style="margin-left: 90%">保  存</el-button>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        isImport:false,
        isDisabled:false,
        dialogUserVisible:false,
        dialogVisible:false,
        EditTableData:[],//编辑商品英文名称
        TableData:[
          {
            certificateCode: '11',
            certificateName: '品质证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '12',
            certificateName: '重量证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '13',
            certificateName: '数量证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '14',
            certificateName: '兽医卫生证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '15',
            certificateName: '健康证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '16',
            certificateName: '卫生证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '17',
            certificateName: '动物卫生证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '18',
            certificateName: '植物检疫证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '19',
            certificateName: '熏蒸/消毒证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '20',
            certificateName: '出境货物换证凭单',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '21',
            certificateName: '入境货物检验检疫证明（申请出具）',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '22',
            certificateName: '出境货物不合格通知单',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '23',
            certificateName: '集装箱检验检疫结果单',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '24',
            certificateName: '入境货物检验检疫证明（申请不出具）',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '94',
            certificateName: '电子底账',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '95',
            certificateName: '入境货物调离通知单',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '96',
            certificateName: '出境货物检验检疫工作联系单',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
          {
            certificateCode: '98',
            certificateName: '其他单',
            originalNumber: '1',
            copyNumber: '2'
            ,ischecked:false,
          },
          {
            certificateCode: '99',
            certificateName: '其他证书',
            originalNumber: '1',
            copyNumber: '2',
            ischecked:false,
          },
        ],
        form:{
          teRsComanyEnName:'',
          ovRsComanyCnName:'',
          ovConsignorAddress:'',
          unloadedDate:'',
          commodityEnName:'',
        },
        elementsQuarantineList:[],
        checkedArray:[],
      }
    },
    //定义组件
    components:{

    },
    //定义初始化函数
    activated(){

    },
    //定义方法
    methods:{
      //显示检疫检疫签证申报要素对话框
      showDeclareInfoDialog(QuarantineList){
        console.log('QuarantineList',QuarantineList)
        for(let i in this.TableData){
          if(this.TableData[i].ischecked == true){
            this.TableData[i].ischecked = false
          }
        }
        this.checkedArray = [];
        if(QuarantineList != undefined && QuarantineList.length != 0){
          for(let i in QuarantineList){
            this.TableData.find((item) => {
              if(item.certificateCode == QuarantineList[i].certificateCode){
                item.ischecked = true;
                this.checkedArray.push(item.certificateCode)
              }
            })
          }
        }
      },
      handleChecked(val){
        var index = this.checkedArray.indexOf(val)
        if(index >= 0){
          this.checkedArray.splice(index,1)
        }
        else {
          this.checkedArray.push(val)
        }
        console.log('选中',this.checkedArray)
      },
      //保存
      saveDeclareInfo(){
        this.dialogUserVisible = false;
        var selection = [];
        if(this.checkedArray.length != 0){
          for(let i in this.checkedArray){
            selection[i] = this.TableData.find((item) => {
              if(item.certificateCode == this.checkedArray[i]){
                return item
              }
            })
          }
        }
        let selectionArray = [];
        for(let i = 0;i < selection.length; i++){
          selectionArray[i] = selection[i].certificateName;
        }
        console.log('uyiuyui',selectionArray)
        this.$emit("listenquaranDeclareInfo",this.form,selectionArray,selection);
        console.log('gkhg',selection);
        this.$store.commit("updateQuarantineList",selection);
      },
      //编辑商品英文名称
      editCommodityName(){
        this.dialogVisible = true;
      },
      //商品英文名称保存
      saveCommodityInfo(){
        this.dialogVisible = false;
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
