<template>
  <el-form :model="commodityForm" size="small" ref="form" :disabled="isAuditing" :show-message="false">
    <el-row>
      <el-button type="primary" plain size="small" disabled>导入</el-button>
      <el-button type="danger"  size="small" @click="add" :disabled="AddDisabled">新增</el-button>
      <!--<el-button type="primary" plain size="small" @click="deleteCommoditys">删除</el-button>-->
      <el-button type="primary" plain size="small" disabled>复制</el-button>
      <el-button type="primary" plain size="small" disabled>上移</el-button>
      <el-button type="primary" plain size="small" disabled>下移</el-button>
      <el-button type="primary" plain size="small" disabled>插入</el-button>
      <el-button type="primary" plain size="small" disabled>批量修改</el-button>
      <el-button type="primary" plain size="small" disabled>重新归类</el-button>
      <el-button type="primary" plain size="small" disabled>归类查看</el-button>
    </el-row>
    <el-table :data="commodityData" @cell-click="editCommodityInfo" @selection-change="delCommodity" height="180px" size="small" stripe highlight-current-row style="width:100%">
      <el-table-column type="selection" width="45" />
      <el-table-column type="index" label="序号" fixed width="50" />
      <el-table-column label="备案序号" prop="recordSequenceNo" width="150"/>
      <el-table-column label="商品编号" prop="commodityCustomsNo" width="150"/>
      <el-table-column label="检验检疫名称" prop="inspectionAndQuarantineName" width="150"/>
      <el-table-column label="商品名称" prop="commodityName" width="150"/>
      <el-table-column label="规格" prop="commoditySpecification" width="200"/>
      <el-table-column label="成交数量" prop="dealQuantity" width="150"/>
      <el-table-column label="成交单位" prop="dealMeasurementUnit" width="150" :formatter="dealUnitFormat"/>
      <el-table-column label="单价" prop="dealUnitPrice" width="150"/>
      <el-table-column label="总价" prop="dealTotalPrice" width="150"/>
      <el-table-column label="币制" prop="currency" width="150" :formatter="currencyFormat"/>
      <el-table-column label="原产国(地区)" prop="originalCountry" :formatter="sourceCountryFormat" width="150"/>
      <el-table-column label="最终目的国" prop="destCountryRegion" :formatter="sourceCountryFormat" width="150"/>
      <el-table-column label="征免方式" prop="levyMode" width="150" :formatter="levyModeFormat"/>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteCommoditys(scope.$index,scope.row)" style="color: #ff4d51;" type="text" size="small">移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="4">
        <el-form-item label="商品序号" :label-width="labelWidth" class="formItem">
          <el-input v-model="commodityForm.commodityItemNo" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="备案序号" :label-width="labelWidth" class="formItem">
          <el-input v-model="commodityForm.recordSequenceNo" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="商品编号" :label-width="labelWidth" class="formItem" prop="commodityCustomsNo" required>
          <el-input v-model="commodityForm.commodityCustomsNo" @keyup.enter.native="queryCommodity" :disabled="isAddDisabled"/>
          <commodityList ref="commodityList" @chooseCommodity="getCommodity"/>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="检验检疫名称" label-width="140px" class="formItem">
          <el-input v-model="commodityForm.inspectionAndQuarantineName" disabled/>
        </el-form-item>
      </el-col>
      <el-col :span="1">
        <el-form-item class="formItem">
          <el-button size="mini" icon="el-icon-more" type="primary" circle @click="Quarantine"></el-button>
        </el-form-item>
      </el-col>
      <!--检验检疫名称弹出框-->
      <el-dialog title="检验检疫编码列表" :visible.sync="dialogQuarantineVisible" width="45%" append-to-body center>
        <el-table :data="quarantineData" border height="180px"  highlight-current-row @current-change="getCiqSpecification" stripe style="width:100%">
          <el-table-column label="名称" prop="inspectAndQuarantineName"/>
          <el-table-column label="类型" prop="inspectAndQuarantineType" width="60"/>
          <el-table-column label="HS代码" prop="ciqNo" width="70"/>
          <el-table-column label="HS名称" prop="hsName"/>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogQuarantineVisible = false" class="cancel" size="small">确 认</el-button>
          <el-button type="primary" @click="dialogQuarantineVisible = false" class="sure" size="small">关 闭</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="商品名称" :label-width="labelWidth" class="formItem" prop="commodityName" required>
          <el-input v-model="commodityForm.commodityName" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="规格型号" :label-width="labelWidth" class="formItem" >
          <el-input v-model="commodityForm.commoditySpecification" :disabled="isAddDisabled"/>
        </el-form-item>
        <!--规格型号弹出框-->
        <commodityElements ref="commodityElements" @createElements="createElements"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="成交数量" :label-width="labelWidth" class="formItem" prop="dealQuantity" required>
          <el-input v-model.number="commodityForm.dealQuantity" @change="getTotalPrice" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="成交计量单位" :label-width="labelWidth" class="formItem" prop="dealMeasurementUnit" required>
          <el-select v-model="commodityForm.dealMeasurementUnit"
                     :disabled="isAddDisabled"
                     :filter-method="dealUnitsFilter"
                     filterable clearable  style="width: 100%">
            <el-option
              v-for="item in dealUnitsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="单价" label-width="140px" class="formItem" prop="dealUnitPrice" required>
          <el-input v-model.number="commodityForm.dealUnitPrice" @change="numberLimit" @input="getTotalPrice" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="总价" label-width="60px" class="formItem" prop="dealTotalPrice" required>
          <el-input v-model.number="commodityForm.dealTotalPrice" @change="numberLimit2" @input="getUnitPrice" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="币制" label-width="140px" class="formItem" prop="currency" required>
          <el-select v-model="commodityForm.currency"
                     :disabled="isAddDisabled"
                     :filter-method="currencysFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in currencysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="法定第一数量" :label-width="labelWidth" class="formItem" prop="legalQuantity1" required>
          <el-input v-model.number="commodityForm.legalQuantity1" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="法定第一计量单位" label-width="130px" class="formItem" >
          <el-select v-model="commodityForm.legalMeasurementUnit1"
                     disabled
                     :filter-method="legalUnit1Filter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in legalUnit1All"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="加工成品单耗版本号" label-width="140px" class="formItem" >
          <el-input v-model="commodityForm.versionNo" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="货号" label-width="60px" class="formItem" >
          <el-input v-model="commodityForm.articleNo" :disabled="isAddDisabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="最终目的国(地区)" label-width="140px" class="formItem" prop="destCountryRegion" required>
          <el-select v-model="commodityForm.destCountryRegion"
                     :disabled="isAddDisabled"
                     :filter-method="destCountryRegionFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in destCountryRegionsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item label="法定第二数量" :label-width="labelWidth" class="formItem" >
          <el-input v-model.number="commodityForm.legalQuantity2" :disabled="isAddlegal2Disabled"/>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="法定第二计量单位" label-width="130px" class="formItem" >
          <el-select v-model="commodityForm.legalMeasurementUnit2"
                     disabled
                     :filter-method="legalUnit2Filter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in legalUnit2All"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item label="原产国(地区)" label-width="140px" class="formItem" prop="originalCountry" required>
          <el-select v-model="commodityForm.originalCountry"
                     :disabled="isAddDisabled"
                     :filter-method="tradeCountrysFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in tradeCountrysAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="原产地区" label-width="120px" class="formItem">
          <el-select v-model="commodityForm.originalRegion"
                     :disabled="isAddDisabled"
                     :filter-method="originalRegionFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in originalRegionsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="境内目的地" label-width="120px" class="formItem" prop="domesticDestination" required>
          <el-select v-model="commodityForm.domesticDestination"
                     placeholder="境内目的地代码"
                     :disabled="isAddDisabled"
                     :filter-method="destinationcodesFilter"
                     filterable clearable  style="width: 100%">
            <el-option
              v-for="item in destinationcodesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item class="formItem" prop="destination" required>
          <el-select v-model="commodityForm.destination"
                     :disabled="isAddDisabled"
                     placeholder="目的地代码"
                     :filter-method="domesticDestinationsFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in domesticDestinationsAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="征免方式" :label-width="labelWidth" class="formItem" prop="levyMode" required>
          <el-select v-model="commodityForm.levyMode"
                     @keyup.enter.native="newCommodity"
                     :disabled="isAddDisabled"
                     :filter-method="levyModesFilter"
                     filterable clearable style="width: 100%">
            <el-option
              v-for="item in levyModesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <i class="el-icon-info font-color-red"></i><span class="font-color-red">   需要报检请点击此处并录入相关信息</span>
          </template>
          <el-form :model="formin" ref="formin" size="small" :disabled="isAuditing" :show-message="false">
            <el-row>
              <el-col :span="19">
                <el-form-item label="检验检疫货物规格"  label-width="140px" class="formItem">
                  <el-input v-model="formin.QuarantineGoodsSpec" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item  class="formItem">
                  <el-button size="mini" circle icon="el-icon-more" type="primary" @click="showQuaranInfo"></el-button>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item  class="formItem">
                  <el-button  style="margin-left: 20px;" type="primary" @click="showProLicenInfo">产品资质</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="货物属性"  label-width="140px" class="formItem">
                  <el-input v-model="formin.commodityNature" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item  class="formItem">
                  <el-button size="mini" circle icon="el-icon-more" type="primary" @click="showNatureInfo"></el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="用途"  label-width="125px" prop="goodsApplication" class="formItem" required>
                  <el-select
                             id="goodsApplication"
                             v-model="formin.goodsApplication"
                             @keyup.enter.native="newCommodity"
                             :disabled="isAddDisabled"
                             :filter-method="checkoutUsesFilter"
                             filterable clearable style="width: 100%">
                    <el-option
                      v-for="item in checkoutUsesAll"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                      <span style="float: left">{{ item.value }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item  class="formItem">
                  <el-button size="small" style="margin-left: 20px;" type="primary" @click="showDangerComInfo">危险货物信息</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <editQuaranCom ref="EditQuaranCom" @listenEditQuaranComIm="receiveEditQuaranCom"/>
            <comNature ref="ComNature" @listenComNature="receiveComNature"/>
            <dangerComInfo ref="DangerComInfo" @listenDangerComInfo="receiveDangerComInfo"/>
            <proLicenInfo ref="ProLicenInfo"/>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </el-form>
</template>

<script>
  import editQuaranCom from './../businessManage/components/editQuarantineCommodity';
  import comNature from './../businessManage/components/commodityNature';
  import dangerComInfo from './../businessManage/components/dangerCommodityInfo';
  import proLicenInfo from './../businessManage/components/productLicenseInfo';
  import commodityList from './../../webCompany/commodityImport/CommodityList' //商品
  import commodityElements from './../../webCompany/commodityImport/CommodityElements' //商品要素
  export default {
    data() {
      return {
        isAuditing:false,
        levyModes: [],
        levyModesAll:[],
        currencys: [],
        currencysAll:[],
        dealUnits:[],
        dealUnitsAll:[],
        legalUnit1All:[],
        legalUnit2All:[],
        tradeCountrys: [],
        tradeCountrysAll: [],
        destCountryRegionsAll: [],
        originalRegions: [],
        originalRegionsAll: [],
        destinationcodes:[],
        destinationcodesAll:[],
        domesticDestinations:[],
        domesticDestinationsAll:[],
        checkoutUses:[],
        checkoutUsesAll:[],
        isDisable:true,
        commodityData:[],
        isAddDisabled:true,
        isAddlegal2Disabled:true,
        isPopDisabled:false,
        dialogQuarantineVisible:false,
        commodityForm:{
          commodityItemNo:0,
          recordSequenceNo:'',
          commodityCustomsNo:'',
          inspectionAndQuarantineName:'',
          commodityName:'',
          commoditySpecification:'',
          dealQuantity:'',
          dealMeasurementUnit:'',
          dealUnitPrice:'',
          dealTotalPrice:'',
          currency:'',
          legalQuantity1:'',
          legalMeasurementUnit1:'',
          legalQuantity2:'',
          legalMeasurementUnit2:'',
          destCountryRegion:'',
          originalCountry:'',
          destination:'',
          levyMode:'',
          articleNo:'',
          versionNo:'',
          originalRegion:'',
          specificationParam:{},
          exDeclareDetailId:'',
        },
        quarantineData:[],
        labelWidth:'110px',
        commoditySelect:[],
        addOrEdit:'添加商品',
        AddDisabled:false,
        titalInfo:[0,0,0,0],
        activeName:'0',
        formin:{
          quaranInfo:'',
          commodityNature:'',
          QuarantineGoodsSpec:'',//显示检验检疫货物规格信息
        },
        hsName:'',
        goodsPropertyCode:[],
        submitFormFlag:false
      }
    },
    mounted() {
      this.loadStaticData();//请求本地数据
      // this.onload();
      setTimeout(()=>{
        this.getInitData();
      },500)
    },
    computed:{
      productQualificationList(){
        return this.$store.state.productQualificationList;
      },
      licenseVINList(){
        return this.$store.state.licenseVINList;
      },
    },
    components:{
      editQuaranCom,
      comNature,
      dangerComInfo,
      proLicenInfo,
      commodityList,
      commodityElements
    },
    methods:{
      onload(){
        var inputArr = document.getElementById('com-form').getElementsByTagName("input");
        console.log('inputArry',inputArry)
        for(var i =0 ;i<inputArry.length;i++){
          inputArry[i].index = i;
          inputArry[i].onkeydown=function  (e){  //这里一定要把e事件传入。IE不用写，FF得写。
            //e = e ? e : window.event;     //可写可不写
            var keyCode = e.which ? e.which : e.keyCode;
            let obj=e.srcElement?e.srcElement:e.target;
            if(keyCode==13 && obj.type!= 'button'){
              console.log(this.index)
              if(this.index === 4){
                inputArr[this.index+2].focus();
              }else if(this.index === 19){
                inputArr[this.index+4].focus();
              }else{
                inputArr[this.index+1].focus();
              }
            }
          }
        }
      },
      //获取总价、成交数量等信息
      getTotalPriceToProp(){
        var price = 0,num = 0,num1 = 0,num2 = 0;
        for(let i = 0;i < this.commodityData.length;i++){
          if(this.commodityData[i].dealTotalPrice == null){
            price += 0;
          }
          else {
            price += Number(this.commodityData[i].dealTotalPrice);
          }
          if(this.commodityData[i].dealQuantity == null){
            num += 0;
          }
          else {
            num += Number(this.commodityData[i].dealQuantity);
          }
          if(this.commodityData[i].legalQuantity1 == null){
            num1 += 0;
          }
          else {
            num1 += Number(this.commodityData[i].legalQuantity1);
          }
          if(this.commodityData[i].legalQuantity2 == null){
            num2 += 0;
          }
          else {
            num2 += Number(this.commodityData[i].legalQuantity2);
          }
        }
        this.titalInfo[0] = price.toFixed(2);
        this.titalInfo[1] = num;
        this.titalInfo[2] = num1;
        this.titalInfo[3] = num2;
        console.log('titalInfo',this.titalInfo)
        this.$emit('price1',this.titalInfo)
      },
      isdisabledCom(){
        this.isDisable = false;
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.submitFormFlag = true;
          } else {
            this.submitFormFlag = false;
          }
        });
      },
      //原产国别查找中文名称
      sourceCountryFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.tradeCountrys.find((item) => {
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
      //征免方式
      levyModeFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.levyModes.find((item) => {
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
      //成交单位
      dealUnitFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.dealUnits.find((item) => {
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
      //币制
      currencyFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.currencys.find((item) => {
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
      //根据海关商品编码查询商品
      queryCommodity(){
        if(this.commodityForm.commodityCustomsNo == '' ){
          this.$message.error('请输入海关商品编号!')
        }else{
          console.log('jhkj',this.commodityForm.commodityCustomsNo)
          this.$refs.commodityList.dialogFormVisible = true;
          this.$axios3.get('getCommodityDeclareElements',{
            params:{
              customsNo:this.commodityForm.commodityCustomsNo
            }
          }).then((res) => {
            console.log(res.data)
            if(res.data.state === true)
              this.$refs.commodityList.commodityData = res.data.data;
            else
              this.$message.error(res.data.data)
          }).catch((e) => {
            console.log(e)
          })
        }
      },
      //根据选择的商品信息填入表单
      getCommodity(data){
        this.commodityForm.commodityName = data.commodityName;
        this.commodityForm.commodityCustomsNo = data.customsNo;
        this.commodityForm.dealMeasurementUnit = data.legalUtil1Code;
        this.commodityForm.legalMeasurementUnit1 = data.legalUtil1Code;
        this.commodityForm.legalMeasurementUnit2 = data.legalUtil2Code;
        this.hsName = data.commodityName +'('+ data.remark+ ')';
        this.$refs.commodityElements.dialogFormVisible = true;
        this.$refs.commodityElements.commodityElements = data.elementList;
        this.$refs.commodityElements.commodityInfo = data.customsNo + '-' + data.commodityName;
        if(typeof this.commodityForm.legalMeasurementUnit2 == "string" && this.commodityForm.legalMeasurementUnit2 != ''){
          this.isAddlegal2Disabled = false;
        }
        else {
          this.isAddlegal2Disabled = true;
        }
        this.dealUnitsFilter(this.commodityForm.dealMeasurementUnit);
        this.legalUnit1Filter(this.commodityForm.legalMeasurementUnit1);
        this.legalUnit2Filter(this.commodityForm.legalMeasurementUnit2);
      },
      //检验检疫名称
      Quarantine(){
        if(this.commodityForm.commodityCustomsNo == '' ){
          this.$message.error('请输入海关商品编号!')
        }else{
          this.dialogQuarantineVisible = true;
          this.$axios3.get('getCiqInfos',{
            params:{
              ciqNo:this.commodityForm.commodityCustomsNo
            }
          }).then((res) => {
            if(res.data.state === true){
              this.quarantineData = res.data.data;
              for(let i in this.quarantineData){
                this.quarantineData[i].hsName = this.hsName
              }
            }else{
              this.$message.error(res.data.data)
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      },
      //填入检验检疫规格
      getCiqSpecification(data){
        if(data != null){
          this.commodityForm.inspectionAndQuarantineName = data.inspectAndQuarantineName;
        }
      },
      //填入规格型号
      createElements(val){
        console.log('jhg',val)
        this.commodityForm.commoditySpecification = val;
      },
      //添加或者编辑商品
      newCommodity(){
        this.submitForm();
        // console.log('kkk',this.activeName,this.formin.goodsApplication)
        if(this.submitFormFlag){
          if(this.activeName == 0){
            this.addNewCommodity()
          }
          else if(this.activeName == 1 && this.formin.goodsApplication != ''){
            this.addNewCommodity()
          }
          else {
            this.$message.error('请输入用途！')
          }
        }else {
          this.$message.error('带*号项内容不能为空！')
        }
      },
      addNewCommodity(){
        //判断序号是否存在
        var isExit = false;
        this.commodityData.find((item) => {
          if(item.commodityItemNo === this.commodityForm.commodityItemNo){
            isExit = true;
            item.exDeclareDetailId = this.commodityForm.exDeclareDetailId;
            item.commodityItemNo = this.commodityForm.commodityItemNo;
            item.recordSequenceNo = this.commodityForm.recordSequenceNo;
            item.commodityCustomsNo = this.commodityForm.commodityCustomsNo;
            item.inspectionAndQuarantineName = this.commodityForm.inspectionAndQuarantineName;
            item.commodityName = this.commodityForm.commodityName;
            item.commoditySpecification = this.commodityForm.commoditySpecification;
            item.dealQuantity = this.commodityForm.dealQuantity;
            item.dealMeasurementUnit = this.commodityForm.dealMeasurementUnit;
            item.dealUnitPrice = this.commodityForm.dealUnitPrice;
            item.dealUnit = this.commodityForm.dealUnit;
            item.dealTotalPrice = this.commodityForm.dealTotalPrice;
            item.currency = this.commodityForm.currency;
            item.legalQuantity1 = this.commodityForm.legalQuantity1;
            item.legalMeasurementUnit1 = this.commodityForm.legalMeasurementUnit1;
            item.legalQuantity2 = this.commodityForm.legalQuantity2;
            item.legalMeasurementUnit2 = this.commodityForm.legalMeasurementUnit2;
            item.destCountryRegion = this.commodityForm.destCountryRegion;
            item.originalCountry = this.commodityForm.originalCountry;
            item.originalRegion = this.commodityForm.originalRegion;
            item.domesticDestination = this.commodityForm.domesticDestination;
            item.destination = this.commodityForm.destination;
            item.levyMode = this.commodityForm.levyMode;
            item.articleNo = this.commodityForm.articleNo;
            item.versionNo = this.commodityForm.versionNo;
            item.inspectionAndQuarantineGoodsSpec = this.formin.inspectionAndQuarantineGoodsSpec;
            item.goodsProperty = this.formin.goodsProperty;
            item.goodsApplication = this.formin.goodsApplication;
            item.hazardousChemicals = this.$refs.DangerComInfo.form.hazardousChemicals;
            item.unCode = this.$refs.DangerComInfo.form.unCode;
            item.dangerousGoodsName = this.$refs.DangerComInfo.form.dangerousGoodsName;
            item.dangerousPackageCategory = this.$refs.DangerComInfo.form.dangerousPackageCategory;
            item.dangerousPackageSpec = this.$refs.DangerComInfo.form.dangerousPackageSpec;
          }
        })
        if(isExit == false){
          this.commodityData.push({
            exDeclareDetailId:this.commodityForm.exDeclareDetailId,
            commodityItemNo:this.commodityForm.commodityItemNo,
            recordSequenceNo:this.commodityForm.recordSequenceNo,
            commodityCustomsNo:this.commodityForm.commodityCustomsNo,
            inspectionAndQuarantineName:this.commodityForm.inspectionAndQuarantineName,
            commodityName:this.commodityForm.commodityName,
            commoditySpecification:this.commodityForm.commoditySpecification,
            dealQuantity:this.commodityForm.dealQuantity,
            dealMeasurementUnit:this.commodityForm.dealMeasurementUnit,
            dealUnitPrice:this.commodityForm.dealUnitPrice,
            dealUnit:this.commodityForm.dealUnit,
            dealTotalPrice:this.commodityForm.dealTotalPrice,
            currency:this.commodityForm.currency,
            legalQuantity1:this.commodityForm.legalQuantity1,
            legalMeasurementUnit1:this.commodityForm.legalMeasurementUnit1,
            legalQuantity2:this.commodityForm.legalQuantity2,
            legalMeasurementUnit2:this.commodityForm.legalMeasurementUnit2,
            destCountryRegion:this.commodityForm.destCountryRegion,
            originalCountry:this.commodityForm.originalCountry,
            originalRegion:this.commodityForm.originalRegion,
            domesticDestination:this.commodityForm.domesticDestination,
            destination:this.commodityForm.destination,
            levyMode:this.commodityForm.levyMode,
            articleNo:this.commodityForm.articleNo,
            versionNo:this.commodityForm.versionNo,
            inspectionAndQuarantineGoodsSpec:this.formin.inspectionAndQuarantineGoodsSpec,
            goodsProperty:this.formin.goodsProperty,
            goodsApplication:this.formin.goodsApplication,
            hazardousChemicals:this.$refs.DangerComInfo.form.hazardousChemicals,
            unCode:this.$refs.DangerComInfo.form.unCode,
            dangerousGoodsName:this.$refs.DangerComInfo.form.dangerousGoodsName,
            dangerousPackageCategory:this.$refs.DangerComInfo.form.dangerousPackageCategory,
            dangerousPackageSpec:this.$refs.DangerComInfo.form.dangerousPackageSpec,
          });
        }
        this.getTotalPriceToProp();
        this.isAddDisabled = true;
        this.isAddlegal2Disabled = true;
        // 清空表格信息
        this.commodityForm = {
          commoditySpecification:'',
          inspectionAndQuarantineName:'',
          commodityName:'',
          dealUnit:'',
          legalMeasurementUnit1:'',
          legalMeasurementUnit2:'',
        };
        this.formin = {
          goodsApplication:''
        };
        this.goodsPropertyCode = [];
        this.$refs.DangerComInfo.form = {};
        this.$refs.EditQuaranCom.form = {
          ingredient:'',
          effictiveDate:'',
          effictiveDateNum:'',
          companyName:'',
          Specification:'',
          models:'',
          brand:'',
          produceData:'',
          batch:'',
        };
        this.$refs.commodityElements.form = {};
        this.$refs.commodityElements.commodityElements = [];
        this.$refs.commodityElements.rule = '';
        this.$refs.commodityElements.commodityInfo = '';
        this.$refs.commodityElements.brand = '';
        this.$refs.commodityElements.preferential = '';
        this.$refs.commodityElements.inspectGoodsSpecification = '';
        this.$refs.commodityElements.num = 0;
      },
      //检验检疫货物规格
      showQuaranInfo(){
        this.$refs.EditQuaranCom.showQuaranComDialog(this.formin.inspectionAndQuarantineGoodsSpec,false);
      },
      receiveEditQuaranCom(val){
        this.formin.inspectionAndQuarantineGoodsSpec = val;
        var Quarantine = val.split('&');
        console.log('qq',Quarantine)
        var GoodsSpec = []
        for(var i = 0; i < Quarantine.length; i++){
          if (Quarantine[i] != ''){
            GoodsSpec.push(Quarantine.slice(i,i+1));
          }
        }
        this.formin.QuarantineGoodsSpec = GoodsSpec.toString();
        this.activeName = '0';
        this.activeName = '1';
      },
      //货物属性
      showNatureInfo(){
        this.$refs.ComNature.showNatureSelectionDialog(this.goodsPropertyCode);
      },
      receiveComNature(val){
        this.goodsPropertyCode = val;
        var comProperty = [];
        for(let i in val){
          comProperty[i] = val[i].substring(0,2);
        }
        this.formin.goodsProperty = comProperty.toString();
        var comNature = [];
        for(let i in val){
          comNature[i] = val[i].substring(3);
        }
        this.formin.commodityNature = comNature.toString();
        this.activeName = '0';
        this.activeName = '1';
      },
      receiveComNatureInit(val){
        console.log('kk',val)
        var comNature = [];
        for(var i = 0; i < val.length; i++){
          switch (val[i]){
            case '11': comNature.push('11-3C目录内');break;
            case '12': comNature.push('12-3C目录外');break;
            case '13': comNature.push('13-无需办理3C认证');break;
            case '14': comNature.push('14-预包装');break;
            case '15': comNature.push('15-非预包装');break;
            case '16': comNature.push('16-转基因产品');break;
            case '17': comNature.push('17-非转基因产品');break;
            case '18': comNature.push('18-首次进出口');break;
            case '19': comNature.push('19-正常');break;
            case '20': comNature.push('20-废品');break;
            case '21': comNature.push('21-旧品');break;
            case '22': comNature.push('22-成套设备');break;
            case '23': comNature.push('23-带皮木材/板材');break;
            case '24': comNature.push('24-不带皮木材/板材');break;
            case '25': comNature.push('25-A级特殊物品');break;
            case '26': comNature.push('26-B级特殊物品');break;
            case '27': comNature.push('27-C级特殊物品');break;
            case '28': comNature.push('28-D级特殊物品');break;
            case '29': comNature.push('29-V/W非特殊物品');break;
            case '30': comNature.push('30-市场采购');break;
          }
        }
        this.goodsPropertyCode = comNature;
        var commodityNatureArray = [];
        for(var i = 0; i < comNature.length; i++){
          commodityNatureArray[i] = comNature[i].substring(3);
        }
        this.formin.commodityNature = commodityNatureArray.toString();
      },
      //产品资质
      showProLicenInfo(){
        if(this.commodityForm.commodityCustomsNo != '' && this.commodityForm.commodityName != ''){
          this.$refs.ProLicenInfo.showProLicenDialog(this.commodityForm);
        }
        else {
          this.$message.error('商品编码和商品名称不能为空！');
        }

      },
      //危险货物信息
      showDangerComInfo(){
        this.$refs.DangerComInfo.showDangerComDialog(this.formin);
      },
      receiveDangerComInfo(val){
        console.log('pp',val)
        this.formin.hazardousChemicals = val.hazardousChemicals;
        this.formin.unCode = val.unCode;
        this.formin.dangerousGoodsName = val.dangerousGoodsName;
        this.formin.dangerousPackageCategory = val.dangerousPackageCategory;
        this.formin.dangerousPackageSpec = val.dangerousPackageSpec;
      },
      //点击表格数据编辑其信息
      editCommodityInfo(row,col){
        if(col.label != '操作'){
          console.log('商品111',row)
          this.isAddDisabled = false;
          if(row.legalMeasurementUnit2 != '' && row.legalMeasurementUnit2 != null){
            this.isAddlegal2Disabled = false;
          }
          else {
            this.isAddlegal2Disabled = true;
          }
          this.commodityForm = row;
          this.formin = row;
          if(row.inspectionAndQuarantineGoodsSpec != null){
            var Quarantine = row.inspectionAndQuarantineGoodsSpec.split('&');
            var GoodsSpec = []
            for(var i = 0; i < Quarantine.length; i++){
              if (Quarantine[i] != ''){
                GoodsSpec.push(Quarantine.slice(i,i+1));
              }
            }
            console.log('qq',Quarantine,GoodsSpec)
            this.formin.QuarantineGoodsSpec = GoodsSpec.toString();
          }
          if(row.goodsProperty != null){
            var comNature = row.goodsProperty.split(',');
            this.receiveComNatureInit(comNature);
          }
          else {
            this.goodsPropertyCode = []
          }
          this.getInitData();
          setTimeout(()=>{
            this.staticDataInit();//搜索框更新数据
          },500)
        }
      },
      //新增按钮
      add(){
        this.isAddDisabled = false;
        this.isPopDisabled = true;
        this.commodityForm = {
          commoditySpecification:'',
          inspectionAndQuarantineName:'',
          commodityName:'',
          dealUnit:'',
          legalMeasurementUnit1:'',
          legalMeasurementUnit2:'',
          dealUnitPrice:'',
          dealTotalPrice:'',
        };
        this.formin = {
          goodsApplication:'',
          inspectionAndQuarantineGoodsSpec:''
        };
        this.$refs.DangerComInfo.form = {};
        this.$refs.EditQuaranCom.form = {
          ingredient:'',
          effictiveDate:'',
          effictiveDateNum:'',
          companyName:'',
          Specification:'',
          models:'',
          brand:'',
          produceData:'',
          batch:'',
        };
        this.$refs.commodityElements.form = {
          出口享惠情况:3
        };
        this.$refs.commodityElements.commodityElements = [];
        this.$refs.commodityElements.rule = '';
        this.$refs.commodityElements.commodityInfo = '';
        this.$refs.commodityElements.brand = '';
        this.$refs.commodityElements.preferential = '';
        this.$refs.commodityElements.inspectGoodsSpecification = '';
        this.$refs.commodityElements.num = 0;
        this.commodityForm.commodityItemNo = this.commodityData.length+1;
        this.staticDataInit();//搜索框更新数据
      },
      //选中商品事件
      delCommodity(val){
        this.commoditySelect = val;
      },
      //删除选中商品
      deleteCommoditys(index,row){
        console.log('kk',row)
        console.log('资质',this.licenseVINList,this.productQualificationList)
        this.commodityData.splice(index,1)
        //更新商品项号
        for(let i in this.commodityData){
          if(this.commodityData[i].commodityItemNo > row.commodityItemNo){
            this.commodityData[i].commodityItemNo = this.commodityData[i].commodityItemNo - 1;
          }
        }
        //删除产品资质--许可证信息同时更新许可证信息项号
        var proList = [];
        var k = 0;
        for(let i in this.productQualificationList) {
          if (this.productQualificationList[i].imDeclareDetailCommodityId == row.commodityItemNo) {
            proList[k] = this.productQualificationList[i];
            k++;
          }
          if(this.productQualificationList[i].imDeclareDetailCommodityId > row.commodityItemNo){
            this.productQualificationList[i].imDeclareDetailCommodityId = this.productQualificationList[i].imDeclareDetailCommodityId -1;
          }
        }
        console.log('kk',proList)
        for(let i in proList){
          var proIndex = this.productQualificationList.indexOf(proList[i])
          this.productQualificationList.splice(proIndex,1)
        }
        //删除产品资质--VIN信息同时更新VIN项号
        var VINList = [];
        var j = 0;
        if(this.licenseVINList.length > 0){
          for(let i in this.licenseVINList){
            if(this.licenseVINList[i].imDeclareDetailCommodityId == row.commodityItemNo){
              VINList[j] = this.licenseVINList[i];
              j++;
            }
            if(this.licenseVINList[i].imDeclareDetailCommodityId > row.commodityItemNo){
              this.licenseVINList[i].imDeclareDetailCommodityId = this.licenseVINList[i].imDeclareDetailCommodityId - 1;
            }
          }
        }
        console.log('jj',proList)
        if(VINList.length > 0){
          for(let i in VINList){
            var indexVin = this.licenseVINList.indexOf(VINList[i])
            this.licenseVINList.splice(indexVin,1);
          }
        }
        this.$store.commit("updateProductQualificationList",this.productQualificationList);
        this.$store.commit("updateLicenseVINList",this.licenseVINList);
      },
      //成交总价
      getTotalPrice(){
        if(this.commodityForm.dealQuantity != '' && this.commodityForm.dealUnitPrice != ''){
          var dealTotalPrice = this.commodityForm.dealQuantity * this.commodityForm.dealUnitPrice;
          this.commodityForm.dealTotalPrice = dealTotalPrice.toFixed(2);
        }
        else {
          this.commodityForm.dealTotalPrice = ''
        }
      },
      //单价小数位数限制
      numberLimit(){
        this.commodityForm.dealUnitPrice = Number(this.commodityForm.dealUnitPrice.toString().match(/^\d+(?:\.\d{0,4})?/))
      },
      numberLimit2(){
        this.commodityForm.dealTotalPrice = Number(this.commodityForm.dealTotalPrice.toString().match(/^\d+(?:\.\d{0,2})?/))
      },
      //成交单价
      getUnitPrice(){
        if(this.commodityForm.dealQuantity){
          var dealUnitPrice = this.commodityForm.dealTotalPrice / this.commodityForm.dealQuantity;
          this.commodityForm.dealUnitPrice = dealUnitPrice.toFixed(4);
        }
        else {
          this.commodityForm.dealUnitPrice = '';
        }
      },
      //获取初始数据
      getInitData(){
        this.checkoutUsesFilter(this.formin.goodsApplication);
        this.tradeCountrysFilter(this.commodityForm.originalCountry);
        this.destCountryRegionFilter(this.commodityForm.destCountryRegion);
        this.originalRegionFilter(this.commodityForm.originalRegion);
        this.dealUnitsFilter(this.commodityForm.dealMeasurementUnit);
        this.legalUnit1Filter(this.commodityForm.legalMeasurementUnit1);
        this.legalUnit2Filter(this.commodityForm.legalMeasurementUnit2);
        this.currencysFilter(this.commodityForm.currency);
        this.levyModesFilter(this.commodityForm.levyMode);
        this.domesticDestinationsFilter(this.commodityForm.destination);
        this.destinationcodesFilter(this.commodityForm.domesticDestination);
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          this.$axios.get('static/pub_originareacode.json'),//原产地区
          this.$axios.get('static/pub_currencysystem.json'),//币种
          this.$axios.get('static/pub_measureunit.json'),//成交单位
          this.$axios.get('static/pub_levymode.json'),//征免方式
          this.$axios.get('static/pub_churchyarddestinationcode.json'),//境内目的地
          this.$axios.get('static/pub_destinationcode.json'),//目的地
          this.$axios.get('static/pub_checkout_use.json'),//用途
        ]).then(this.$axios.spread((
          res_countryregion,
          res_originareacode,
          res_currencysystem,
          res_measureunit,
          res_levymode,
          res_churchyarddestinationcode,
          res_domesticregion,
          res_checkout_use,
        ) => {
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
          this.destCountryRegionsAll = this.tradeCountrys.slice(0,19);
          this.originalRegions = res_originareacode.data.RECORDS;
          this.originalRegionsAll = this.originalRegions.slice(0,19);
          this.currencys = res_currencysystem.data.RECORDS;
          this.currencysAll = this.currencys.slice(0,19);
          this.levyModes = res_levymode.data.RECORDS;
          this.levyModesAll = this.levyModes.slice(0,19);
          this.dealUnits = res_measureunit.data.RECORDS;
          this.dealUnitsAll = this.dealUnits.slice(0,19);
          this.destinationcodes = res_churchyarddestinationcode.data.RECORDS;
          this.destinationcodesAll = this.destinationcodes.slice(0,19);
          this.domesticDestinations = res_domesticregion.data.RECORDS;
          this.domesticDestinationsAll = this.domesticDestinations.slice(0,19);
          this.checkoutUses = res_checkout_use.data.RECORDS;
          this.checkoutUsesAll = this.checkoutUses.slice(0,19);
        })).catch((e) => {
          console.log(e);
        })
      },
      staticDataInit(){
        this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        this.destCountryRegionsAll = this.tradeCountrys.slice(0,19);
        this.originalRegionsAll = this.originalRegions.slice(0,19);
        this.currencysAll = this.currencys.slice(0,19);
        this.levyModesAll = this.levyModes.slice(0,19);
        this.dealUnitsAll = this.dealUnits.slice(0,19);
        this.destinationcodesAll = this.destinationcodes.slice(0,19);
        this.domesticDestinationsAll = this.domesticDestinations.slice(0,19);
        this.checkoutUsesAll = this.checkoutUses.slice(0,19);
      },
      //用途
      checkoutUsesFilter(query){
        if(query !== ''){
          this.checkoutUsesAll = this.checkoutUses.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.checkoutUsesAll = this.checkoutUses.slice(0,19);
        }
      },
      //贸易国
      tradeCountrysFilter(query){
        if(query !== ''){
          this.tradeCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      destCountryRegionFilter(query){
        if(query !== ''){
          this.destCountryRegionsAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.destCountryRegionsAll = this.tradeCountrys.slice(0,19);
        }
      },
      originalRegionFilter(query){
        if(query !== ''){
          this.originalRegionsAll = this.originalRegions.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.originalRegionsAll = this.originalRegions.slice(0,19);
        }
      },
     //成交单位
      dealUnitsFilter(query){
        if(query !== ''){
          this.dealUnitsAll = this.dealUnits.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.dealUnitsAll = this.dealUnits.slice(0,19);
        }
      },
      //第一计量单位
      legalUnit1Filter(query){
        if(query !== ''){
          this.legalUnit1All = this.dealUnits.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.legalUnit1All = this.dealUnits.slice(0,19);
        }
      },
      //第二计量单位
      legalUnit2Filter(query){
        if(query !== ''){
          this.legalUnit2All = this.dealUnits.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.legalUnit2All = this.dealUnits.slice(0,19);
        }
      },
      //币制
      currencysFilter(query){
        if(query !== ''){
          this.currencysAll = this.currencys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.currencysAll = this.currencys.slice(0,19);
        }
      },
      //征免方式
      levyModesFilter(query){
        if(query !== ''){
          this.levyModesAll = this.levyModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.levyModesAll = this.levyModes.slice(0,19);
        }
      },
      //境内目的地
      domesticDestinationsFilter(query){
        if(query !== ''){
          this.domesticDestinationsAll = this.domesticDestinations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.domesticDestinationsAll = this.domesticDestinations.slice(0,19);
        }
      },
      //境内目的地
      destinationcodesFilter(query){
        if(query !== ''){
          this.destinationcodesAll = this.destinationcodes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.destinationcodesAll = this.destinationcodes.slice(0,19);
        }
      },
    }
  }
</script>

<style scoped>
  .formItem {
    margin: 2px 0 !important;
  }
  #goodsApplication{
    height: 33px !important;
  }
</style>
