<template>
    <div>
      <el-row>
        <el-col :span="6" style="line-height: 30px">
          公司名称:
          <span style="color:#409EFF;margin-left: 15px">
            {{nickCompanyName}}
          </span>
        </el-col>
        <el-col :span="2" style="line-height: 30px">合同号:</el-col>
        <el-col :span="4"><el-input v-model="contractNo" size="small"/></el-col>
      </el-row>
      <el-row style="margin-top:20px;line-height: 40px" >
        <el-col :span="4">选择服务:
          <el-checkbox :indeterminate="isIndeterminate" v-model="serviceCheckAll" @change="handleCheckAllChange">全选</el-checkbox>
        </el-col>
        <el-col :span="13">
          <el-checkbox-group v-model="serviceCheckList" @change="handleCheckService">
            <el-checkbox v-for="service in services" :label="service" :key="service">{{service}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="clearAll" size="small">清空</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addBusiness" size="small" :loading="loading">暂存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="saveToDispatch" size="small" :loading="loading">保存并派单</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-tabs style="float: none" v-model="tabsValue" type="card" >
          <el-tab-pane name="订舱" label="订舱">
            紧急开发中~~~
          </el-tab-pane>
          <el-tab-pane name="拖车" label="拖车">
            紧急开发中~~~
          </el-tab-pane>
          <el-tab-pane name="熏蒸" label="熏蒸">
            紧急开发中~~~
          </el-tab-pane>
          <el-tab-pane name="报关" label="报关">
            <customsDeclaration ref="declarationform"/>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <dispatchDeclareDialog ref="dispatchDeclareDialog" @dispatchSuccess = "dispatchSuccess"/>
    </div>
</template>

<script type="text/ecmascript-6">
  import customsDeclaration from './importBsComponent/customsDeclaration'
  import dispatchDeclareDialog from './../businessManage/component/dispatchDeclareDialog'
  const serviceOptions = ['订舱', '拖车', '熏蒸', '报关'];
    export default {
        data() {
            return {
              isIndeterminate:true,
              services:serviceOptions,
              serviceCheckAll:[],
              serviceCheckList:[],
              tabsValue:'报关',
              contractNo:'',
              imDeclareServiceId:'',
              businessId:'',
              loading:false,
              dispatch:false
            }
        },
      components:{
        customsDeclaration,dispatchDeclareDialog
      },
      computed:{
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        },
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        }
      },
      created(){
        this.loadStaticData();
      },
      deactivated(){
        let clear = true;
        this.$store.state.options1.forEach((item) => {
          if(item.name === '发布内容'){
            clear = false;
          }
        })
        if(clear)
          this.clearInfo();
      },
      methods:{
        dispatchSuccess(){
          this.imDeclareServiceId = '';
          this.businessId = '';
          this.initStaticData();
          for(let i in this.$refs.declarationform.bsForm ){
            this.$refs.declarationform.bsForm[i] = '';
          }
          this.$refs.declarationform.commodityList = [];
          this.$refs.declarationform.certificateList = [];
          this.$refs.declarationform.uploadTable = [];
          this.contractNo = '';
          this.dispatch = false;
          this.$message({
            type: 'success',
            message: '派单成功!'
          });
        },
        saveToDispatch(){
          this.dispatch = true;
          if(this.$refs.declarationform.bsForm.declareCustoms === '' || this.$refs.declarationform.bsForm.enterBorder === ''){
            this.$message.error('请输入必填项!')
          }else{
            this.addBusiness();
          }
        },
        handleCheckAllChange(val){
          this.serviceCheckList = val ? serviceOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckService(value){
          let checkedCount = value.length;
          this.serviceCheckAll = checkedCount === this.services.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.services.length;
        },
        /*清空报关单*/
        clearAll(){
          this.$confirm('此操作将清空已填数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.clearInfo();
            this.$message({
              type: 'success',
              message: '已清空数据,请重新填写!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        },
        //清空报关内容
        clearInfo(){
          for(let i in this.$refs.declarationform.bsForm){
            this.$refs.declarationform.bsForm[i] = '';
          }
          this.$refs.declarationform.clearAllCommodity();
          this.$refs.declarationform.clearAllCertificate();
          this.$refs.declarationform.fileList = [];
          this.$refs.declarationform.uploadTable = [];
          this.$refs.declarationform.uploadValue = '';
          this.$refs.declarationform.deleteAttachmentList = []
          this.contractNo = null;
          this.businessId = '';
          this.imDeclareServiceId = '';
          this.loadStaticData();
          this.initStaticData();
        },
        /*暂存报关单*/
        addBusiness(){
            if(this.$refs.declarationform.bsForm.declareCustoms === '' || this.$refs.declarationform.bsForm.enterBorder === ''){
              this.$message.error('请输入必填项!')
            }else {
              this.loading = true;
              let params = {
                contractNo: this.contractNo,
                tradeCountry: this.$refs.declarationform.bsForm.tradeCountry,
                enterBorder: this.$refs.declarationform.bsForm.enterBorder,
                dealMode: this.$refs.declarationform.bsForm.dealMode,
                declareCustoms: this.$refs.declarationform.bsForm.declareCustoms,
                importPort: this.$refs.declarationform.bsForm.importPort,
                declareEnterprise: this.$refs.declarationform.bsForm.declareEnterprise,
                shorthandNo: this.$refs.declarationform.bsForm.shorthandNo,
                teRsComanyName: this.$refs.declarationform.bsForm.teRsComanyName,
                teRsCreditCode: this.$refs.declarationform.bsForm.teRsCreditCode,
                teRsCustomsCode: this.$refs.declarationform.bsForm.teRsCustomsCode,
                teRsQuarantineCode: this.$refs.declarationform.bsForm.teRsQuarantineCode,
                ovRsComanyName: this.$refs.declarationform.bsForm.ovRsComanyName,
                ovRsCode: this.$refs.declarationform.bsForm.ovRsCode,
                csCompanyName: this.$refs.declarationform.bsForm.csCompanyName,
                csCreditCode: this.$refs.declarationform.bsForm.csCreditCode,
                csCustomsCode: this.$refs.declarationform.bsForm.csCustomsCode,
                csQuarantineCode: this.$refs.declarationform.bsForm.csQuarantineCode,
                supervisionMode: this.$refs.declarationform.bsForm.supervisionMode,
                levyNature: this.$refs.declarationform.bsForm.levyNature,
                relationshipCon: this.$refs.declarationform.bsForm.relationshipCon,
                priceCon: this.$refs.declarationform.bsForm.priceCon,
                franchiseFeeCon: this.$refs.declarationform.bsForm.franchiseFeeCon,
                originCountry: this.$refs.declarationform.bsForm.originCountry,
                stopOverPort: this.$refs.declarationform.bsForm.stopOverPort,
                originPort: this.$refs.declarationform.bsForm.originPort,
                storagePlace: this.$refs.declarationform.bsForm.storagePlace,
                certificationAuthority: this.$refs.declarationform.bsForm.certificationAuthority,
                marks: this.$refs.declarationform.bsForm.marks,
                inspectAcceptOrgan: this.$refs.declarationform.bsForm.inspectAcceptOrgan,
                portInspectOrgan: this.$refs.declarationform.bsForm.portInspectOrgan,
                destiInspectOrgan: this.$refs.declarationform.bsForm.destiInspectOrgan,
                remark: this.$refs.declarationform.bsForm.remark,
                commodityList: this.$refs.declarationform.commodityList,//商品
                certificateList: this.$refs.declarationform.certificateList//随附单证
              }
              for(let i in this.$refs.declarationform.deleteAttachmentList){
                this.$refs.declarationform.deleteAttachment(this.$refs.declarationform.deleteAttachmentList[i])
              }
              if (this.businessId === '') {
                this.$axios9.post('/addBusiness', params)
                  .then((res) => {
                    this.loading = false;
                    // console.log(res.data);
                    if (res.data.code === 200) {
                      this.$refs.declarationform.businessId = res.data.data.businessId;
                      this.imDeclareServiceId = res.data.data.imDeclareServiceId;
                      console.log(this.imDeclareServiceId)
                      this.businessId = res.data.data.businessId;
                      this.$refs.declarationform.upload();
                      this.$message.success('操作成功!');
                      this.$refs.declarationform.deleteAttachmentList = [];
                      if(this.dispatch){
                        this.$refs.dispatchDeclareDialog.sendDeclare = true;
                        this.$refs.dispatchDeclareDialog.imDeclareServiceId = this.imDeclareServiceId;
                        this.$refs.dispatchDeclareDialog.enterpriseId = this.nickCompanyId;
                      }
                    } else {
                      this.$message.error(res.data.msg)
                    }
                  }).catch((e) => {
                    this.$message.error('请求失败!请重试');
                    this.loading = false;
                    console.log(e)
                })
              } else {
                params.businessId = this.businessId;
                this.$axios9.post('/updateBusiness', params)
                  .then((res) => {
                    this.loading = false;
                    // console.log(res.data);
                    if (res.data.code === 200) {
                      this.$refs.declarationform.upload();
                      this.$message.success('操作成功!');
                      if(this.dispatch){
                        this.$refs.dispatchDeclareDialog.sendDeclare = true;
                        this.$refs.dispatchDeclareDialog.imDeclareServiceId = this.imDeclareServiceId;
                        this.$refs.dispatchDeclareDialog.enterpriseId = this.nickCompanyId;
                      }
                      console.log(this.imDeclareServiceId)
                    } else {
                      this.$message.error(res.data.msg)
                    }
                  }).catch((e) => {
                    this.$message.error('请求失败!请重试');
                    this.loading = false;
                    console.log(e)
                })
              }
            }
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
            this.$axios.get('static/pub_certificatecode.json'),//单证代码
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
            res_certificatecode
          ) => {
            this.$refs.declarationform.declareCustoms = res_exportports.data.RECORDS;
            this.$refs.declarationform.declareCustomsAll = this.$refs.declarationform.declareCustoms.slice(0,19);
            this.$refs.declarationform.exportBordersAll = this.$refs.declarationform.declareCustoms.slice(0,19);
            this.$refs.declarationform.supplyAreas = res_domesticport.data.RECORDS;
            this.$refs.declarationform.supplyAreasAll = this.$refs.declarationform.supplyAreas.slice(0,19);
            this.$refs.declarationform.tradeCountrys = res_countryregion.data.RECORDS;
            this.$refs.declarationform.tradeCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
            this.$refs.declarationform.originCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
            this.$refs.declarationform.superviseModes = res_supervisemode.data.RECORDS;
            this.$refs.declarationform.superviseModesAll = this.$refs.declarationform.superviseModes.slice(0,19);
            this.$refs.declarationform.levyNatures = res_levynature.data.RECORDS;
            this.$refs.declarationform.levyNaturesAll = this.$refs.declarationform.levyNatures.slice(0,19);
            this.$refs.declarationform.originPorts = res_transportationport.data.RECORDS;
            this.$refs.declarationform.originPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
            this.$refs.declarationform.stopOverPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
            this.$refs.declarationform.organizations = res_checkout_organization.data.RECORDS;
            this.$refs.declarationform.certificationAuthoritysAll = this.$refs.declarationform.organizations.slice(0,19);
            this.$refs.declarationform.destiInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
            this.$refs.declarationform.inspectAcceptOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
            this.$refs.declarationform.portInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
            this.$refs.declarationform.legalUnits = res_measureunit.data.RECORDS;
            this.$refs.declarationform.legalUnitsAll = this.$refs.declarationform.legalUnits.slice(0,19);
            this.$refs.declarationform.certificateCodes = res_certificatecode.data.RECORDS;
            this.$refs.declarationform.certificateCodesAll = this.$refs.declarationform.certificateCodes;
          })).catch((e) => {
            console.log(e);
          })
        },
        initStaticData(){
          this.$refs.declarationform.declareCustomsAll = this.$refs.declarationform.declareCustoms.slice(0,19);
          this.$refs.declarationform.exportBordersAll = this.$refs.declarationform.declareCustoms.slice(0,19);
          this.$refs.declarationform.supplyAreasAll = this.$refs.declarationform.supplyAreas.slice(0,19);
          this.$refs.declarationform.tradeCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
          this.$refs.declarationform.originCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
          this.$refs.declarationform.superviseModesAll = this.$refs.declarationform.superviseModes.slice(0,19);
          this.$refs.declarationform.levyNaturesAll = this.$refs.declarationform.levyNatures.slice(0,19);
          this.$refs.declarationform.originPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
          this.$refs.declarationform.stopOverPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
          this.$refs.declarationform.certificationAuthoritysAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.destiInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.inspectAcceptOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.portInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.legalUnitsAll = this.$refs.declarationform.legalUnits.slice(0,19);
          this.$refs.declarationform.certificateCodesAll = this.$refs.declarationform.certificateCodes;
        },
      }
    }
</script>

<style scoped>

</style>
