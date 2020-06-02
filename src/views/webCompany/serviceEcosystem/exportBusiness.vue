<template>
    <div>
      <el-row>
        <el-col :span="6" style="line-height: 30px">
          公司名称:
          <span style="color:#409EFF;margin-left: 15px">
            {{companyName}}
          </span>
        </el-col>
        <el-col :span="2" style="line-height: 30px">合同号:</el-col>
        <el-col :span="4"><el-input v-model="contractNo" size="small"/></el-col>
      </el-row>
      <el-row style="margin-top:20px;line-height: 40px" >
        <el-col :span="4">选择服务:
          <el-checkbox :indeterminate="isIndeterminate" v-model="serviceCheckAll" @change="handleCheckAllChange" disabled>全选</el-checkbox>
        </el-col>
        <el-col :span="13">
          <el-checkbox-group v-model="serviceCheckList" @change="handleCheckService">
            <el-checkbox v-for="service in services" :label="service" :key="service" disabled>{{service}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="isSureClear" size="small">清空</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="saveInfo" size="small" :loading="loading">暂存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="saveAndPost" size="small" :loading="loading">保存并派单</el-button>
          <el-dialog
            title="向指定业务员派单"
            :visible.sync="sendDeclare"
            width="600px"
            @close="dispatch = false"
          >
            <el-form :model="postForm" :rules="postRules" ref="postForm" >
              <el-form-item prop="userName">
                <el-select v-model="postForm.userName" filterable clearable @change="userSelect" placeholder="请选择报关员" style="width: 50%">
                  <el-option
                    v-for="item in userOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            <el-row style="margin-top: 40px">
              <el-col :span="6" style="line-height: 40px">
                指定接单时限:
              </el-col>
              <el-col :span="5">
                <el-form-item prop="limitDay" >
                  <el-input-number v-model.number="postForm.limitDay" controls-position="right" size="small" style="width: 80%"></el-input-number>
                  <span style="line-height: 40px;font-size: 18px">天</span>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item prop="limitHour">
                  <el-input-number v-model.number="postForm.limitHour" controls-position="right" size="small" style="width: 80%"></el-input-number>
                  <span style="line-height: 40px;font-size: 18px">时</span>
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-form-item prop="limitMinute">
                  <el-input-number v-model.number="postForm.limitMinute" controls-position="right" size="small" style="width: 80%"></el-input-number>
                  <span style="line-height: 40px;font-size: 18px">分</span>
                </el-form-item>
              </el-col>
            </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="sendDeclare = false">取 消</el-button>
              <el-button type="primary" @click="postDeclaration('postForm')" :loading="dispatchLoading">确 定</el-button>
            </span>
          </el-dialog>
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
            <customsDeclaration ref="declarationform" @refresh="queryServiceInfo"/>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import ElTabPane from "element-ui/packages/tabs/src/tab-pane";
    import customsDeclaration from './exportBsComponent/customsDeclaration';
    const serviceOptions = ['订舱', '拖车', '熏蒸','报关'];
    export default {
      components: {ElTabPane,customsDeclaration},
      data() {
            return {
              isIndeterminate:true,
              contractNo:'',//合同号
              serviceCheckAll:false,//服务全选
              serviceCheckList:['报关'],//服务类型
              services:serviceOptions,
              exDeclareServiceId:'',
              tabsValue:'报关',
              tabIndex: 1,
              editTabs:[{
                title:'报关',
                name:'报关',
                content:'报关'
              }],
              sendDeclare:false,
              userOptions:[],
              userName:'',
              allUser:[],
              businessId:'',
              receiverName:'',
              postForm:{
                userName:'',
                limitDay:0,
                limitHour:0,
                limitMinute:10
              },
              postRules:{
                userName:[{ required: true, message: '请选择派单员',trigger: 'change'}],
                limitDay:[
                  { required: true, message: '请输入天数', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitHour:[
                  { required: true, message: '请输入小时', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
                limitMinute:[
                  { required: true, message: '请输入分钟', trigger: 'blur'},
                  { type: 'number', message: '必须为数字值'}
                ],
              },
              loading:false,
              dispatchLoading:false,
              dispatch:false
            }
        },
      props:{
        companyName:{
          type:String,
          default(){
            return ''
          }
        }
      },
      computed:{
        //获取当前企业用户的id和名称，用来上传文件时参数/
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        },
      },
      created(){
        this.queryAllUserName();
        this.loadStaticData();
      },
      mounted(){
        let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
        this.$store.commit("updateCompanyId",dataCompanyId);
        let dataCompanyName=JSON.parse(localStorage.getItem('Name2'));
        this.$store.commit("updateCompanyName",dataCompanyName);
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
        handleCheckAllChange(val){
          this.serviceCheckList = val ? serviceOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckService(value){
          let checkedCount = value.length;
          this.serviceCheckAll = checkedCount === this.services.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.services.length;
        },
        isSureClear(){
          this.$confirm('此操作将清空当前内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.clearInfo();
            this.$message({
              type: 'success',
              message: '操作成功!'
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
          this.loadStaticData();
          this.initStaticData();
        },
        initStaticData(){
          this.$refs.declarationform.declareCustomsAll = this.$refs.declarationform.declareCustoms.slice(0,19);
          this.$refs.declarationform.exportBordersAll = this.$refs.declarationform.declareCustoms.slice(0,19);
          this.$refs.declarationform.supplyAreasAll = this.$refs.declarationform.supplyAreas.slice(0,19);
          this.$refs.declarationform.tradeCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
          this.$refs.declarationform.superviseModesAll = this.$refs.declarationform.superviseModes.slice(0,19);
          this.$refs.declarationform.levyNaturesAll = this.$refs.declarationform.levyNatures.slice(0,19);
          this.$refs.declarationform.originPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
          this.$refs.declarationform.stopOverPortsAll = this.$refs.declarationform.originPorts.slice(0,19);
          this.$refs.declarationform.certificationAuthoritysAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.destiInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.inspectAcceptOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.portInspectOrgansAll = this.$refs.declarationform.organizations.slice(0,19);
          this.$refs.declarationform.legalUnitsAll = this.$refs.declarationform.legalUnits.slice(0,19);
          this.$refs.declarationform.arrivalCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
        },
        //保存并派单按钮
        saveAndPost(){
          this.postForm.userName = null;
          this.postForm.limitDay = 0;
          this.postForm.limitHour = 0;
          this.postForm.limitMinute = 10;
          if(this.$refs.declarationform.bsForm.declareCustoms !== '' &&
            this.$refs.declarationform.bsForm.exportBorder !== '' ){
              this.dispatch = true
              this.saveInfo()
          }else {
            this.$message.error('请输入带*必填项');
          }
        },
        saveInfo(){
          if(this.$refs.declarationform.bsForm.declareCustoms !== '' &&
            this.$refs.declarationform.bsForm.exportBorder !== '' ){
            this.loading = true;
            this.$refs.declarationform.bsForm.businessId = this.businessId
            this.$refs.declarationform.bsForm.enterpriseId = this.nickCompanyId;
            this.$refs.declarationform.bsForm.enterpriseName = this.nickCompanyName;
            this.$refs.declarationform.bsForm.contractNo = this.contractNo;
            console.log('将要删除文件',this.$refs.declarationform.deleteAttachmentList)
            for(let i in this.$refs.declarationform.deleteAttachmentList){
              this.$refs.declarationform.deleteAttachment(this.$refs.declarationform.deleteAttachmentList[i])
            }
            this.$axios4.post('/addAndUpdateBusiness',this.$refs.declarationform.bsForm)
              .then((res) => {
                this.loading = false;
                 console.log(res.data)
                if(res.data.state === 1){
                  if(this.businessId === ''){
                    this.businessId = res.data.businessId;
                    this.$refs.declarationform.businessId = this.businessId;
                    this.exDeclareServiceId = res.data.exDeclareServiceId;
                  }
                  this.$message.success('暂存成功');
                  this.$refs.declarationform.deleteAttachmentList = []
                  let _this = this;
                  setTimeout(function () {
                    _this.$refs.declarationform.upload();
                  },300);
                  if(this.dispatch){
                    this.sendDeclare = true;
                  }
                };
              }).catch((e) =>{
                this.$message.error('请求失败!请重试');
                this.loading = false
                console.log(e);
            })
          }else {
            this.$message.error('请输入带*必填项');
          }
        },
        //报关服务单暂存信息更新
        queryServiceInfo(){
          this.$axios6.post('/getDeclareServiceInfo',{
            exDeclareServiceId:this.exDeclareServiceId,
            businessId:this.businessId
          }).then((res) => {
            console.log(res.data);
            if(res.data.state === true){
              this.$refs.declarationform.uploadTable = res.data.data.attachmentList;
            }
          }).catch((e) => {
            console.log(e);
          })
        },
        //选取派单员
        userSelect(id){
          let userSelect = this.userOptions.find((item) => {
            return item.value === id;
          });
          this.receiverName = userSelect.label;
        },
        //保存并派单(暂定最少派单时间为半小时)
        postDeclaration(formName){
          /*先暂存，然后派单*/
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.postForm.limitDay !== 0 || this.postForm.limitHour !== 0 || this.postForm.limitMinute >= 10){
                this.dispatchLoading = true;
                this.$refs.declarationform.bsForm.businessId = this.businessId;
                this.$refs.declarationform.bsForm.enterpriseId = this.nickCompanyId;
                this.$refs.declarationform.bsForm.enterpriseName = this.nickCompanyName;
                this.$refs.declarationform.bsForm.contractNo = this.contractNo;
                let params = {
                  'exDeclareServiceId':this.exDeclareServiceId,
                  'receiverId':this.postForm.userName,
                  'receiverName':this.receiverName,
                  'day':this.postForm.limitDay,
                  'hour':this.postForm.limitHour,
                  'minute':this.postForm.limitMinute,
                  'enterpriseName':this.nickCompanyName
                };
                this.$axios4.post('/dispatchOrCancelExportDeclare',params)
                  .then((res) => {
                    console.log(res.data);
                    this.dispatchLoading = false;
                    if(res.data.state === 1){
                    this.$message.success('派单成功!');
                    this.businessId = '';
                    this.exDeclareServiceId = '';
                    this.sendDeclare = false;
                    this.clearInfo();
                    this.dispatch = false;
                  }else {
                    this.$message.error('派单失败!');
                    this.dispatch = false;
                    this.businessId = '';
                    this.exDeclareServiceId = '';
                    }
                  }).catch((e) => {
                    this.dispatch = false;
                    this.dispatchLoading = false;
                    console.log(e);
                  })
              }else {
                this.$message.error('最小接单时限为10分钟!');
                return false;
              }
            } else {
              return false;
              this.loading = false;
            }
          });
        },
        //获取所有报关员
        queryAllUserName(){
          this.userOptions = [];
            this.$axios4.post('/getAllDeclareUserInfo')
              .then((res) => {
                for(let i = 0;i<res.data.length;i++){
                  this.userOptions.push({
                    value:res.data[i].userId,
                    label:res.data[i].userName
                  })
                }
              }).catch((e) => {
                console.log(e);
            })
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
            this.$refs.declarationform.arrivalCountrysAll = this.$refs.declarationform.tradeCountrys.slice(0,19);
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
        }
      }
    }
</script>

<style scoped>

</style>
