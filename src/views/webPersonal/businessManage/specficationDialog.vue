<template>
    <div>
      <el-dialog title="商品规格型号" :visible.sync="dialogFormVisible" width="50%" append-to-body>
        <el-form :model="form" ref="form" :rules="rules" >
          <el-row>
            <el-col :span="12">
              <el-form-item label="品牌类型" :label-width="formLabelWidth"  prop="brandType" class="formItem">
                <el-select v-model="form.brandType" filterable clearable @change="brandTypeSelectChange" size="small" style="width: 100%;" >
                  <el-option
                    v-for="item in brandTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="出口享惠情况" :label-width="formLabelWidth"  prop="preferential" class="formItem">
              <el-select v-model="form.preferential" filterable clearable @change="preferentialSelectChange" size="small" style="width: 100%;" >
                <el-option
                  v-for="item in preferentials"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="GTIN" :label-width="formLabelWidth"  prop="GTIN" class="formItem">
                <el-input v-model="form.GTIN" @change="GTINchange" auto-complete="off" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CAS" :label-width="formLabelWidth"  prop="CAS" class="formItem">
                <el-input v-model="form.CAS" @change="CASchange" auto-complete="off" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="其他" :label-width="formLabelWidth" prop="others" class="formItem">
            <el-input v-model="form.others" @change="othersChange" size="small" />
          </el-form-item>
          <el-form-item label="申报要素" :label-width="formLabelWidth"  required>
            <el-table
              :data="eleTable"
              border
              size="small"
              height="170px"
            >
              <el-table-column prop="elements" label="要素"/>
              <el-table-column prop="elementsContent" label="要素内容"/>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <a class="search" href="https://www.hsbianma.com/" target="_blank">商品要素查询</a>
            <el-button style="float: right;margin-top: 5px" @click="newElement" size="small" plain type="success">添加要素</el-button>
            <!--商品要素添加 -->
            <el-dialog
              title="要素添加"
              :visible.sync="dialogElementVisible"
              append-to-body
              width="30%"
              center
            >
              <el-form :model="elementAddForm">
                <el-form-item label="要素:" label-width="100px">
                  <el-input v-model="elementAddForm.element" clearable style="width: 100%"/>
                </el-form-item>
                <el-form-item label="要素内容:" label-width="100px">
                  <el-input v-model="elementAddForm.elementDescribe" clearable style="width: 100%" />
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogElementVisible = false">取 消</el-button>
                <el-button type="primary" @click="addElement">确 定</el-button>
              </span>
            </el-dialog>

            <!--商品要素编辑 -->
            <el-dialog
              title="要素编辑"
              :visible.sync="dialogElementEditVisible"
              append-to-body
              width="30%"
              center
            >
              <el-form :model="elementEditForm">
                <el-form-item label="要素:" label-width="100px">
                  <el-input v-model="elementEditForm.element" clearable style="width: 100%"/>
                </el-form-item>
                <el-form-item label="要素内容:" label-width="100px">
                  <el-input v-model="elementEditForm.elementDescribe" clearable style="width: 100%" />
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogElementEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="editElement(elementIndex)">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
          <el-form-item label="规格型号" :label-width="formLabelWidth" required>
            <el-input v-model="form.specificationStr"  size="small" disabled/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="AddCommodity('form')" size="small" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
  import  './../../../assets/css/webCompany/commodityEdit/commodityAdd.css';
  import axios from 'axios';
    export default {
        data() {
            return {
              dialogFormVisible: false,
              dialogElementVisible:false,
              dialogElementEditVisible:false,
              elementIndex:null,
              brandTypeSelect:[],//品牌类型选择
              preferentialSelect:[],//享惠选择
              eleTable:[],
              specificationArr:[],
              specificationEleArr:[],
              speNot:['','',''],//规格型号非必填项(GTIN,CAS,ohters)
              speEleNoName:[],
              form: {
                brandType:'',
                preferential:'',
                GTIN:'',
                CAS:'',
                others:'',
                specification:[],//页面显示的规格型号数组
                specificationStr:'',//页面显示的规格型号字符串
                specificationParam:[]//发送到数据库的规格型号字段
              },
              //商品要素
              elementAddForm: {
                element:'',
                elementDescribe:''
              },
              elementEditForm: {
                element:'',
                elementDescribe:''
              },
              formLabelWidth: '120px',
              rules:{
                brandType:[{required:true,message:'请选择品牌类型',trigger: 'change'}],
                preferential:[{required:true,message:'请选择出口享惠情况',trigger: 'change'}],
              },
              brandTypes:[{
                value:0,
                label:'0-无品牌'
              },{
                value:1,
                label:'1-境内自主品牌'
              },{
                value:2,
                label:'2-境内收购品牌'
              },{
                value:3,
                label:'3-境外品牌(贴牌生产)'
              },{
                value:4,
                label:'4-境外品牌(其他)'
              }],
              preferentials:[{
                value:0,
                label:'0-出口货物在最终目的国(地区)不享受优惠关税'
              },{
                value:1,
                label:'1-出口货物在最终目的国(地区)享受优惠关税'
              },{
                value:2,
                label:'2-不能确定在最终目的国(地区)享受优惠关税'
              },{
                value:3,
                label:'3-不适用于进口报关单'
              }]
            }
        },
      computed:{
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        }
      },
      props:['ownedEnterpriseId'],
      methods:{
        //数组去掉空值
        arrClearEmpty(arr){
          for(let i = 0; i<arr.length; i++){
            if(arr[i] === ''){
              arr.splice(i,1);
              i --;
            }
          }
        },
        //品牌类型
        brandTypeSelectChange(item){
          this.specificationArr[0] = '';
          // if(this.brandTypes[item] !== undefined){
          //   this.form.brandType = this.brandTypes[item].label.substr(0,1);
          // }
          this.specificationArr[0] = this.form.brandType;
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          // this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        //出口享惠
        preferentialSelectChange(item){
          this.specificationArr[1] = '';
          // if(this.preferentials[item] !== undefined){
          //   this.form.preferential = this.preferentials[item].label.substr(0,1);
          // }
          this.specificationArr[1] = this.form.preferential;
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          // this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        GTINchange(){
          this.speNot[0] = this.form.GTIN ;
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        CASchange(){
          this.speNot[1] = this.form.CAS;
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          // this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        othersChange(){
          this.speNot[2] = this.form.others ;
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          // this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        //添加商品要素
        newElement(){
          this.dialogElementVisible = true;
          this.elementAddForm.element = '';
          this.elementAddForm.elementDescribe = '';
        },
        addElement(){
          if(this.elementAddForm.element !== '' && this.elementAddForm.elementDescribe !== ''){
            this.eleTable.push({
              elements:this.elementAddForm.element,
              elementsContent:this.elementAddForm.elementDescribe
            });
            this.specificationEleArr = [];
            this.speEleNoName = [];
            for(let i in this.eleTable){
              let ele = this.eleTable[i].elements + '-' + this.eleTable[i].elementsContent;
              this.specificationEleArr.push(ele);
              this.speEleNoName.push(this.eleTable[i].elementsContent);
            }
            this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
            // this.arrClearEmpty(this.form.specificationParam);
            this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
            this.arrClearEmpty(this.form.specification);
            this.form.specificationStr = this.form.specification.join('|');
            this.dialogElementVisible = false;
          }else {
            this.$message.error('商品要素和内容不能为空！')
          }
        },
        //编辑商品要素
        handleEdit(index, row) {
          this.dialogElementEditVisible = true;
          this.elementIndex = index;
          this.elementEditForm.element = this.eleTable[index].elements;
          this.elementEditForm.elementDescribe = this.eleTable[index].elementsContent;
        },
        editElement(i){
          if(this.elementEditForm.element !== '' && this.elementEditForm.elementDescribe !== ''){
            this.eleTable.splice(i,1,{
              elements:this.elementEditForm.element,
              elementsContent:this.elementEditForm.elementDescribe
            });
            this.specificationEleArr = [];
            this.speEleNoName = [];
            for(let i in this.eleTable){
              let ele = this.eleTable[i].elements + '-' + this.eleTable[i].elementsContent;
              this.specificationEleArr.push(ele);
              this.speEleNoName.push(this.eleTable[i].elementsContent);
            }

            this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
            // this.arrClearEmpty(this.form.specificationParam);
            this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
            this.arrClearEmpty(this.form.specification);
            this.form.specificationStr = this.form.specification.join('|');
            this.dialogElementEditVisible = false;
          }else {
            this.$message.error('商品要素和内容不能为空！');
          }

        },
        //删除商品要素
        handleDelete(index, row) {
          this.eleTable.splice(index,1);
          this.specificationEleArr = [];
          this.speEleNoName = [];
          for(let i in this.eleTable){
            let ele = this.eleTable[i].elements + '-' + this.eleTable[i].elementsContent;
            this.specificationEleArr.push(ele);
            this.speEleNoName.push(this.eleTable[i].elementsContent);
          }
          this.form.specificationParam = this.specificationArr.concat(this.specificationEleArr.concat(this.speNot));
          // this.arrClearEmpty(this.form.specificationParam);
          this.form.specification = this.specificationArr.concat(this.speEleNoName.concat(this.speNot));
          this.arrClearEmpty(this.form.specification);
          this.form.specificationStr = this.form.specification.join('|');
        },
        add(){
          this.dialogFormVisible = true;
          this.form = {};
        },
        //添加规格型号
        AddCommodity(form){
          this.$refs[form].validate((valid) => {
              if (valid) {
                if(this.eleTable.length !== 0){
                  let data = {
                    brandType:this.form.brandType,
                    preferential:this.form.preferential,
                    specificationStr:this.form.specificationStr,
                    eleTable:this.eleTable,
                    specificationParam:this.form.specificationParam,
                    GTIN:this.form.GTIN,
                    CAS:this.form.CAS,
                    others:this.form.others,
                  };
                  this.$emit('specifacation',data);
                  this.form = {};
                  this.eleTable = [];
                  this.dialogFormVisible = false;
                }else{
                  this.$message.error('请补充商品要素内容！');
                }
              }else {
                return false;
              }
          });
        },
      },
      mounted() {
      }
    }
</script>

<style scoped>
  .formItem{
    margin: 2px 0;
  }
.search{
  font-size: 14px;
}
</style>
