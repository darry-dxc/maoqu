<template>
  <div>
    <div style="height: 800px;overflow: auto">
      <!--顶部信息-->
      <el-row style="margin: 10px 20px">
        <el-col :span="10" style="font-size: 18px">服务单号：<span style="color: #F49900">{{serviceNo}}</span></el-col>
        <el-col :span="2" :offset="10">
          <el-button type="primary" plain size="small" @click="refuseOrder">拒绝此单</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="acceptOrder">接受此单</el-button>
        </el-col>
      </el-row>
      <!--  报关单信息 -->
      <el-form :model="declarationform">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申报地海关" label-width="140px"  required class="form-item-margin">
              <el-select v-model="declarationform.declareCustoms" :filter-method="declareCustomFilter" disabled filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in declareCustomsAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出境关别"  label-width="140px" required class="form-item-margin">
              <el-select v-model="declarationform.exportBorder" disabled :filter-method="exportBorderFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in exportBordersAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="离境口岸" label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.exportPort" disabled :filter-method="supplyAreasFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in supplyAreasAll"
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
          <el-form-item label="境内收发货人"  label-width="140px" class="form-item-margin">
            <el-col :span="6"><el-input v-model="declarationform.teRsCreditCode" placeholder="企业信用代码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.teRsCustomsCode" placeholder="海关代码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.teRsQuarantineCode" placeholder="检验检疫编码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.teRsCompanyName" placeholder="企业名称(中文)" auto-complete="off" class="inputLable" disabled/></el-col>
          </el-form-item>
        </el-row>
        <el-row >
          <el-form-item label="境外收发货人"  label-width="140px" class="form-item-margin">
            <el-col :span="12"><el-input v-model="declarationform.ovRsCode" placeholder="境外收发货人代码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="12"><el-input v-model="declarationform.ovRsCompanyName" placeholder="企业名称(外文)" auto-complete="off" class="inputLable" disabled/></el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="生产销售单位" label-width="140px" class="form-item-margin">
            <el-col :span="6"><el-input v-model="declarationform.psCreditCode" placeholder="企业信用代码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.psCustomsCode" placeholder="海关代码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.psQuarantineCode" placeholder="检验检疫编码" auto-complete="off" class="inputLable" disabled/></el-col>
            <el-col :span="6"><el-input v-model="declarationform.psCompanyName" placeholder="企业名称(中文)" auto-complete="off" class="inputLable" disabled/></el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="贸易国别(地区)" label-width="140px" required class="form-item-margin">
              <el-select v-model="declarationform.tradeCountry" disabled :filter-method="tradeCountrysFilter" filterable clearable style="width: 100%;">
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
          <el-col :span="8">
            <el-form-item label="监管方式" label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.supervisionMode" disabled :filter-method="superviseModesFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in superviseModesAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="征免性质" label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.levyNature" disabled :filter-method="levyNaturesFilter" filterable clearable style="width: 100%;">
                <el-option
                  v-for="item in levyNaturesAll"
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
          <el-col :span="8">
            <el-form-item label="特殊关系确认" label-width="140px" class="form-item-margin" >
              <el-input  v-model="relationshipCon" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格影响确认"  label-width="140px" class="form-item-margin">
              <el-input  v-model="priceCon"auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特许费确认" label-width="140px" class="form-item-margin">
              <el-input  v-model="franchiseFeeCon" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="运抵国(地区)" label-width="140px" class="form-item-margin" >
              <el-select v-model="declarationform.arrivalCountry" disabled :filter-method="arrivalCountryFilter" filterable clearable style="width: 100%">
                <el-option
                  v-for="item in arrivalCountrysAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="指运港" label-width="140px" class="form-item-margin" >
              <el-select v-model="declarationform.arrivalPort" disabled :filter-method="originPortsFilter" filterable clearable style="width: 100%">
                <el-option
                  v-for="item in originPortsAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货物存放地点" label-width="140px" class="form-item-margin">
              <el-input  v-model="declarationform.storagePlace" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="领证机关"  label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.certificationAuthority" disabled :filter-method="certificationAuthoritysFilter" filterable clearable  style="width: 100%">
                <el-option
                  v-for="item in certificationAuthoritysAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="标记唛码" label-width="140px" class="form-item-margin">
              <el-input  v-model="declarationform.marks" auto-complete="off" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item class="form-item-margin">
              <el-button size="small" icon="el-icon-more" type="primary" @click="remarkMark"></el-button>
            </el-form-item>
          </el-col>
          <!--标记唛码弹出框-->
          <el-dialog title="标记唛码" :visible.sync="dialogremarkMarkVisible" width="45%">
            <div>
              <el-input v-model="marks" type="textarea" :rows="7" placeholder="请输入内容" disabled/>
              <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words1}}</span>字节</p>
            </div>
          </el-dialog>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="目的地检验检疫机关" label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.destiInspectOrgan" disabled :filter-method="destiInspectOrgansFilter" filterable clearable  style="width: 100%">
                <el-option
                  v-for="item in destiInspectOrgansAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检验检疫受理机关" label-width="140px" class="form-item-margin" >
              <el-select v-model="declarationform.inspectAcceptOrgan" disabled :filter-method="inspectAcceptOrgansFilter" filterable clearable  style="width: 100%">
                <el-option
                  v-for="item in inspectAcceptOrgansAll"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.value }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="口岸检验检疫机关"  label-width="140px" class="form-item-margin">
              <el-select v-model="declarationform.portInspectOrgan" disabled :filter-method="portInspectOrgansFilter" filterable clearable  style="width: 100%">
                <el-option
                  v-for="item in portInspectOrgansAll"
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

        </el-row>
        <!--  //商品信息 -->
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column type="index" label="商品(序号)" align="center" width="125px">
          </el-table-column>
          <el-table-column prop="customCommodityNo" label="商品编码" align="center">
          </el-table-column>
          <el-table-column prop="customCommodityName" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="commodityType" label="规格、型号" align="center">
          </el-table-column>
          <el-table-column prop="legalUnit1" label="法定第一计量单位" align="center" :formatter="legalUnitsFormat">
          </el-table-column>
        </el-table>
        <el-table :data="tableData2" border style="width: 100%">
          <el-table-column type="index" label="随附单证(序号)" align="center" width="125px">
          </el-table-column>
          <el-table-column prop="certificateCode" label="单证代码" align="center">
          </el-table-column>
          <el-table-column prop="certificateNo" label="单证编号" align="center">
          </el-table-column>
        </el-table>
      </el-form>
      <el-table :data="tableData3" border style="width: 100%">
        <el-table-column type="index" label="附件(序号)" align="center" width="125px">
        </el-table-column>
        <el-table-column prop="attachmentType" label="文件类型" align="center">
        </el-table-column>
        <el-table-column prop="attachmentName" label="文件名" align="center">
        </el-table-column>
        <el-table-column prop="ownerName" label="上传者" align="center">
        </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" align="center" :formatter="dateFormat">
        </el-table-column>
        <el-table-column label="操作" width="250px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="uploadAttach(scope.$index, scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="2">
          <label class="leftitem font-size-14 font-color-666" style="margin-left: 30px; margin-top: 20px;">备注信息</label>
        </el-col>
        <el-col :span="20"><el-input v-model="declarationform.remark" style="margin-top: 15px;" disabled/></el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex'
  import moment from 'moment';

  export default {
    //定义数据
    data () {
      return {
        dialogremarkMarkVisible:false,
        declareCustoms: [],
        declareCustomsAll:[],
        exportBordersAll:[],
        supplyAreas: [],
        supplyAreasAll:[],
        superviseModes: [],
        superviseModesAll: [],
        levyNatures: [],
        levyNaturesAll: [],
        tradeCountrys: [],
        tradeCountrysAll: [],
        arrivalCountrysAll: [],
        arrivalCountrys: [],
        arrivalPorts: [],
        certificateCodes: [],
        certificateCodesAll: [],
        organizations:[],
        certificationAuthoritysAll:[],
        destiInspectOrgansAll:[],
        inspectAcceptOrgansAll:[],
        portInspectOrgansAll:[],
        legalUnits: [],
        legalUnitsAll: [],
        originPorts:[],
        originPortsAll:[],
        stopOverPorts:[],
        stopOverPortsAll:[],
        currencys:[],
        declarationform:{
          exportPort:'',
          declareCustoms:'',
          exportBorder:'',
          teRsComanyName:'',
          teRsCreditCode:'',
          teRsCustomsCode:'',
          teRsQuarantineCode:'',
          ovRsComanyName:'',
          ovRsCode:'',
          psCompanyName:'',
          psCreditCode:'',
          psCustomsCode:'',
          psQuarantineCode:'',
          supervisionMode:'',
          levyNature:'',
          relationshipCon:'',
          priceCon:'',
          arrivalCountry:'',
          arrivalPort:'',
          tradeCountry:'',
          storagePlace:'',
          certificationAuthority:'',
          marks:'',
          inspectAcceptOrgan:'',
          portInspectOrgan:'',
          destiInspectOrgan:'',
          remark:'',
        },
        relationshipCon:'',
        priceCon:'',
        franchiseFeeCon:'',
        flag1:true,
        businessId:'',
        dialogRefuse:false,
        dialogAccept:false,
        exDeclareServiceId:'',
        serviceNo:'',
        tableData1:[],
        tableData2:[],
        tableData3:[],
        marks:'',
        words1:0,
      }
    },
    mounted() {
      this.loadStaticData();//请求本地数据
      // this.onload()
      setTimeout(()=>{
        this.getInitData();
      },600)
    },
    activated(){
      setTimeout(()=>{
        this.getInitData();
      },500)
    },
    //定义方法
    methods:{
      onload(){
        var inputArry = document.getElementsByTagName("input");
        for(var i =0 ;i<inputArry.length;i++){
          inputArry[i].index = i;
          inputArry[i].onkeydown=function  (e){  //这里一定要把e事件传入。IE不用写，FF得写。
            //e = e ? e : window.event;     //可写可不写
            var keyCode = e.which ? e.which : e.keyCode;
            let obj=e.srcElement?e.srcElement:e.target;
            if(keyCode==13 && obj.type!= 'button'){
              inputArry[this.index+1].focus();
            }
          }
        }
      },
      //时间格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },

      //拒绝此单
      refuseOrder(){
        this.$confirm('确定拒绝此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios6.get('refuseNewOrder',{
            params:{
              exDeclareServiceId:this.exDeclareServiceId
            }
          }).then((response) =>{
            console.log(response);
            if(response.data.state === true){
              this.$message.success('订单已拒绝！');
              setTimeout(()=>{
                this.$store.commit('delete2_tabs', '/personExportBs');
                this.$router.push({path:'/PersonMainCon'});
              },1000)
            }else {
              this.$message.error(response.data.data);
              setTimeout(()=>{
                this.$store.commit('delete2_tabs', '/personImportBs');
                this.$router.push({path:'/PersonMainCon'});
              },1000)
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //接受此单
      acceptOrder(){
        this.$confirm('确定接受此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            exDeclareServiceId:this.exDeclareServiceId,
            businessId:this.businessId,
          }
          console.log('params',params)
          this.$axios6.post('/acceptNewOrder',params)
            .then((response) =>{
              console.log(response);
              if(response.data.state === true){
                this.$message.success('已接受订单！');
                this.$parent.exportShow(response.data.data.exDeclareDetailId);
              }else {
                this.$message.error(response.data.data);
                setTimeout(()=>{
                  this.$store.commit('delete2_tabs', '/personImportBs');
                  this.$router.push({path:'/PersonMainCon'});
                },1000)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //显示报关业务单详情 根据businessId查询
      findExportService(exDeclareServiceId,businessId){
        this.businessId =businessId;
        this.exDeclareServiceId = exDeclareServiceId;
        let param={
          businessId:businessId,
          exDeclareServiceId:exDeclareServiceId,
        };
        console.log('参数',param);
        this.$axios6.post('/getDeclareServiceInfo',param)
          .then((response) =>{
            // console.log('数据',response);
            let resData = response.data.data;
            this.declarationform = resData;
            this.serviceNo = resData.serviceNo;
            this.exDeclareServiceId = resData.exDeclareServiceId;
            //tableData1 商品信息
            this.tableData1 = [];
            this.tableData2 = [];
            this.tableData3 = [];
            for(let i=0; i<resData.commodityList.length; i++){
              this.tableData1.push(resData.commodityList[i]);
            };
            //tableData2  随附单证信息
            for(let i=0; i<resData.certificateList.length; i++){
              this.tableData2.push(resData.certificateList[i]);
            };
            //tableData3  附件信息
            for(let i=0; i<resData.attachmentList.length; i++){
              this.tableData3.push(resData.attachmentList[i]);
            };
            if(resData.relationshipCon == '1'){
              this.relationshipCon = '是'
            }
            else if(resData.relationshipCon == '0') {
              this.relationshipCon = '否'
            }
            else {
              this.relationshipCon = '空'
            }
            if(resData.priceCon == '1'){
              this.priceCon = '是'
            }
            else if(resData.priceCon == '0'){
              this.priceCon = '否'
            }
            else {
              this.priceCon = '空'
            }
            if(resData.franchiseFeeCon == '1'){
              this.franchiseFeeCon = '是'
            }
            else if(resData.franchiseFeeCon == '0'){
              this.franchiseFeeCon = '否'
            }
            else {
              this.franchiseFeeCon = '空'
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //标记唛码按钮
      remarkMark(){
        this.dialogremarkMarkVisible = true;
        this.marks = this.declarationform.marks
        if(this.marks !== null && this.marks !== undefined){
          this.words1 = this.marks.length;
        }
        else{
          this.words1 = 0;
        }
      },
      //下载附件信息
      uploadAttach(index,row){
        let param = {
          'BucketName':"maoqu-business",
          'FileName':row.attachmentAddress,
        }
        this.$axios7.post('file/Download',param)
          .then((response) =>{
            if(response.data.url != ''){
              window.open(response.data.url);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //获取初始数据
      getInitData(){
        this.exportBorderFilter(this.declarationform.exportBorder);
        this.declareCustomFilter(this.declarationform.declareCustoms);
        this.supplyAreasFilter(this.declarationform.exportPort);
        this.tradeCountrysFilter(this.declarationform.tradeCountry);
        this.arrivalCountryFilter(this.declarationform.arrivalCountry);
        this.superviseModesFilter(this.declarationform.supervisionMode);
        this.levyNaturesFilter(this.declarationform.levyNature);
        this.originPortsFilter(this.declarationform.arrivalPort);
        this.stopOverPortsFilter(this.declarationform.declareCustoms);
        this.certificationAuthoritysFilter(this.declarationform.certificationAuthority);
        this.destiInspectOrgansFilter(this.declarationform.destiInspectOrgan);
        this.inspectAcceptOrgansFilter(this.declarationform.inspectAcceptOrgan);
        this.portInspectOrgansFilter(this.declarationform.portInspectOrgan);
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          this.$axios.get('static/pub_exportports.json'),//申报地海关/进境关别
          this.$axios.get('static/pub_transportmode.json'),//运输方式
          this.$axios.get('static/pub_transportationport.json'),//经停港/启运港
          this.$axios.get('static/pub_dealmode.json'),//成交方式
          this.$axios.get('static/pub_currencysystem.json'),//币种
          this.$axios.get('static/pub_packkind.json'),//包装种类
          this.$axios.get('static/pub_domesticport.json'),//入境口岸
          this.$axios.get('static/pub_checkout_organization.json'),//机关
          this.$axios.get('static/pub_measureunit.json'),//成交单位
          this.$axios.get('static/pub_domesticregion.json'),//境内目的地
          this.$axios.get('static/pub_levymode.json'),//征免方式
          this.$axios.get('static/pub_levynature.json'),//征免性质
          this.$axios.get('static/pub_checkout_use.json'),//用途
          this.$axios.get('static/pub_supervisemode.json'),//监管方式
        ]).then(this.$axios.spread((
          res_countryregion,
          res_exportports,
          res_transportmode,
          res_transportationport,
          res_dealmode,
          res_currencysystem,
          res_packkind,
          res_domesticport,
          res_checkout_organization,
          res_measureunit,
          res_domesticregion,
          res_levymode,
          res_levynature,
          res_checkout_use,
          res_supervisemode,
        ) => {
          this.declareCustoms = res_exportports.data.RECORDS;
          this.declareCustomsAll = this.declareCustoms.slice(0,19);
          this.exportBordersAll = this.declareCustoms.slice(0,19);
          this.supplyAreas = res_domesticport.data.RECORDS;
          this.supplyAreasAll = this.supplyAreas.slice(0,19);
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
          this.superviseModes = res_supervisemode.data.RECORDS;
          this.superviseModesAll = this.superviseModes.slice(0,19);
          this.levyNatures = res_levynature.data.RECORDS;
          this.levyNaturesAll = this.levyNatures.slice(0,19);
          this.originPorts = res_transportationport.data.RECORDS;
          this.originPortsAll = this.originPorts.slice(0,19);
          this.stopOverPortsAll = this.originPorts.slice(0,19);
          this.organizations = res_checkout_organization.data.RECORDS;
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
          this.destiInspectOrgansAll = this.organizations.slice(0,19);
          this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
          this.portInspectOrgansAll = this.organizations.slice(0,19);
          this.legalUnits = res_measureunit.data.RECORDS;
          this.legalUnitsAll = this.legalUnits.slice(0,19);
          this.currencys = res_currencysystem.data.RECORDS;
        })).catch((e) => {
          console.log(e);
        })
      },
      //申报地海关
      declareCustomFilter(query){
        if(query !== ''){
          this.declareCustomsAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.declareCustomsAll = this.declareCustoms.slice(0,19);
        }
      },
      exportBorderFilter(query){
        if(query !== ''){
          this.exportBordersAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.exportBordersAll = this.declareCustoms.slice(0,19);
        }
      },
      //入境口岸
      supplyAreasFilter(query){
        if(query !== ''){
          this.supplyAreasAll = this.supplyAreas.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.supplyAreasAll = this.supplyAreas.slice(0,19);
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
      //贸易国
      arrivalCountryFilter(query){
        if(query !== ''){
          this.arrivalCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.arrivalCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      //监管方式
      superviseModesFilter(query){
        if(query !== ''){
          this.superviseModesAll = this.superviseModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.superviseModesAll = this.superviseModes.slice(0,19);
        }
      },
      //征免性质
      levyNaturesFilter(query){
        if(query !== ''){
          this.levyNaturesAll = this.levyNatures.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.levyNaturesAll = this.levyNatures.slice(0,19);
        }
      },
      //启运港
      originPortsFilter(query){
        if(query !== ''){
          this.originPortsAll = this.originPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.originPortsAll = this.originPorts.slice(0,19);
        }
      },
      //经停港
      stopOverPortsFilter(query){
        if(query !== ''){
          this.stopOverPortsAll = this.originPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.stopOverPortsAll = this.originPorts.slice(0,19);
        }
      },
      //领证机关
      certificationAuthoritysFilter(query){
        if(query !== ''){
          this.certificationAuthoritysAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
        }
      },
      //目的地检验检疫机关
      destiInspectOrgansFilter(query){
        if(query !== ''){
          this.destiInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.destiInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //检验检疫受理机关
      inspectAcceptOrgansFilter(query){
        if(query !== ''){
          this.inspectAcceptOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
        }
      },
      //口岸检验检疫机关
      portInspectOrgansFilter(query){
        if(query !== ''){
          this.portInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.portInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //计量单位
      legalUnitsFormat(row,col){
        let val = row[col.property];
        if (val === undefined || val == '' || val == null) {
          return "";
        }
        else {
          var data = this.legalUnits.find((item) => {
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
      }
    }
  }
</script>
<style>
  .form-item-margin {
    margin: 3px 0 !important;
  }

  .leftitem{
    float: left;
    margin: 5px 0;
    width: 100%;
  }

</style>

