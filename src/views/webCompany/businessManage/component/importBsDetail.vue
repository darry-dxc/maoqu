<template>
    <div>
      <el-row style="background-color: white;padding: 12px;margin-bottom: 10px;line-height: 40px">
        <el-col :span="12" style="font-size: 22px">
          <label>业务单号：<span style="color:#F49900;">{{bsInfo.businessNo}}</span></label>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button
            round
            style="background-color: #F49900;border-color: #F49900;color: white"
            @click="$router.push({path: '/WebCompany/BusinessManage/ImportBs/imService'})">
            <i class="el-icon-back" />
            返回服务单信息
          </el-button>
        </el-col>
      </el-row>
      <el-scrollbar style="height:720px;overflow-x: hidden;">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="service">
            <template slot="title">
              <span style="font-size: 18px;margin-left: 12px;color:#409EFF"><i class="el-icon-menu" />展开相关服务单</span>
            </template>
            <el-row style="margin:0 12px;line-height: 40px;padding: 10px;border-bottom: 1px solid #f2f2f2;font-size: 16px">
              <el-col :span="7" >
                服务单:<span style="color:#F49900;">{{declareInfo.serviceNo}}【{{declareInfo.serviceStatus}}】</span>
              </el-col>
              <el-tooltip placement="bottom" effect="light" :disabled="declareInfo.receiverName !== ''">
                <div slot="content">Phone:{{receiverPhone}}<br/>Email:{{receiverMail}}</div>
                <el-col :span="5">
                  报关员：<span style="color:#F49900;">{{declareInfo.receiverName}}</span>
                </el-col>
              </el-tooltip>
              <el-col :span="10">
                <el-button type="danger"  size="small" v-show="declareStatus === 0" @click="deleteDecService">删除</el-button>
                <el-button type="primary" size="small" v-show="declareStatus === 0" @click="dispatchDeclare">派单</el-button>
                <el-button type="primary" size="small" v-show="declareStatus === 1" @click="cancelDispatch">撤销服务</el-button>
                <el-button type="primary" size="small" v-show="declareStatus === 6" disabled>下载</el-button>
                <el-button type="primary" size="small" v-show="declareStatus === 3 || declareStatus === 5 || declareStatus === 6" @click="getAuditOpinion">审核意见</el-button>
                <el-button type="primary" size="small" v-show="declareStatus === 6">评价服务</el-button>
              </el-col>
            </el-row>
            <el-row style="height: 160px;padding: 50px 0 0 20px">
              <el-col :span="3" style="text-align: center">
                <i class="el-icon-document" style="color: #409EFF;font-size: 80px;"/>
              </el-col>
              <el-col :span="18">
                <el-steps :active="declareStatus" finish-status="success" style="margin: 20px 0">
                  <el-step title="未派单"></el-step>
                  <el-step title="受理中"></el-step>
                  <el-step title="制单中 "></el-step>
                  <el-step title="审核中 "></el-step>
                  <el-step title="申报中"></el-step>
                  <el-step title="已完成"></el-step>
                </el-steps>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="business">
            <template slot="title">
              <span style="font-size: 18px;margin-left: 12px;color:#409EFF"><i class="el-icon-menu" />展开业务单信息</span>
            </template>
            <el-row style="font-size: 16px">
              <el-col :span="8" :offset="1">
                公司名称:<span style="color:#F49900;">{{bsInfo.enterpriseName}}</span>
              </el-col>
              <el-col :span="8">
                合同号:<span style="color:#F49900;">{{bsInfo.contractNo}}</span>
              </el-col>
            </el-row>
            <el-row style="font-size: 16px">
              <el-col :span="8" :offset="1">
                创建人:<span style="color:#F49900;">{{bsInfo.author}}</span>
              </el-col>
              <el-col :span="8">
                建单日期:<span style="color:#F49900;">{{bsInfo.createTime}}</span>
              </el-col>
            </el-row>
            <el-row style="border-bottom: 2px solid #f2f2f2;padding: 10px;">
              <el-col :span="18" :offset="1">
                <el-radio-group v-model="choosedBs">
                  <el-radio label="订舱" disabled >订舱</el-radio>
                  <el-radio label="拖车" disabled >拖车</el-radio>
                  <el-radio label="熏蒸" disabled >熏蒸</el-radio>
                  <el-radio label="报关">报关</el-radio>
                </el-radio-group>
              </el-col>
              <el-col :span="4" v-show="declareStatus === 0">
                <el-button v-show="editInfo === '确定'" size="small" @click="editCancel">取消</el-button>
                <el-button type="primary" size="small" @click="editBsInfo">{{editInfo}}</el-button>
              </el-col>
            </el-row>
            <importCustomForm ref="importCustomForm"/>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
      <dispatchDeclareDialog ref="dispatchDeclareDialog" @dispatchSuccess="queryServiceInfo(imDeclareServiceId)" />
      <auditOpinion ref="auditOpinion" />
    </div>
</template>

<script type="text/ecmascript-6">
  import importCustomForm from './../../serviceEcosystem/importBsComponent/customsDeclaration'
  import dispatchDeclareDialog from  './dispatchDeclareDialog'
  import auditOpinion from './auditOpinion'
    export default {
        data() {
            return {
              activeNames:['service','business'],
              imDeclareServiceId:'',
              bsInfo:{

              },//业务单详情
              declareInfo:{

              },//报关单详情
              declareStatus:0,
              receiverName:'',
              businessNo:'',
              serviceNo:'',
              serviceStatus:'',
              receiverPhone:'',
              receiverMail:'',
              status:1,
              editInfo:'修改',
              choosedBs:'报关',
            }
        },
      created(){
        this.loadStaticData();
      },
      computed: {
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        }
      },
      activated(){
        this.queryServiceInfo(this.$route.query.imDeclareServiceId);
        this.$refs.importCustomForm.isEdit = true;
        this.$refs.importCustomForm.businessId = this.$route.query.businessId;
        this.editInfo = '修改';
        setTimeout(()=>{
          this.$refs.importCustomForm.getInitData();
        },300)
      },
      components:{
        importCustomForm, dispatchDeclareDialog, auditOpinion
      },
      mounted() {
      },
      methods: {
        //查询业务单详情
        queryBsInfo(bsId){
          this.$axios9.post('/busiDetailSearch',{
            enterpriseId:this.nickCompanyId,
            businessId:bsId
          }).then((res) => {
             console.log(res.data);
            if(res.data.code === 200){
              let resData = res.data.data;
              this.bsInfo = resData;
              this.$refs.importCustomForm.uploadTable = resData.attachmentList;
            }
          }).catch((e) => {
            console.log(e)
          })
        },
        //报关服务单详情查询
        queryServiceInfo(imDeclareServiceId){
          this.imDeclareServiceId = imDeclareServiceId;
          this.$axios9.post('/imDecServiceDetailSearch',{
            imDeclareServiceId:imDeclareServiceId,
          }).then((res) => {
             console.log(res.data);
            if(res.data.code === 200){
              this.declareInfo = res.data.data;
              this.declareStatus = parseInt(this.declareInfo.serviceStatus) - 1;
              switch (this.declareInfo.serviceStatus) {
                case '1':this.declareInfo.serviceStatus = '未派单';break;
                case '2':this.declareInfo.serviceStatus = '受理中';break;
                case '3':this.declareInfo.serviceStatus = '制单中';break;
                case '4':this.declareInfo.serviceStatus = '审核中';break;
                case '5':this.declareInfo.serviceStatus = '申报中';break;
                case '6':this.declareInfo.serviceStatus = '已完成';break;
                case '7':this.declareInfo.serviceStatus = '审核未通过';break;
              }
              this.queryBsInfo(this.declareInfo.businessId);
              this.$refs.importCustomForm.bsForm = res.data.data;
              this.$refs.importCustomForm.commodityList = res.data.data.commodityList;
              this.$refs.importCustomForm.certificateList = res.data.data.certificateList;
            }
          }).catch((e) => {
            console.log(e);
          })
        },
        //返回上层服务单页面
        backToServiceInfo(){
          this.$parent.isServiceOrBs = true;
        },
        handleChange(val){
          console.log(val)
        },
        editBsInfo(){
          if(this.editInfo === '修改') {
            this.editInfo = '确定';
            this.$refs.importCustomForm.isEdit = false;
            this.$refs.importCustomForm.deleteAttachmentList = [];
          } else{
            this.updateBusiness();
            console.log('删除文件',this.$refs.importCustomForm.deleteAttachmentList)
            for(let i in this.$refs.importCustomForm.deleteAttachmentList){
              this.$refs.importCustomForm.deleteAttachment(this.$refs.importCustomForm.deleteAttachmentList[i])
            }
            this.editInfo = '修改';
            this.$refs.importCustomForm.isEdit = true
          }
        },
        //修改业务单及相应服务单信息
        updateBusiness(){
          this.$refs.importCustomForm.bsForm.enterpriseId = this.nickCompanyId;
          this.$refs.importCustomForm.bsForm.enterpriseName = this.nickCompanyName;
          this.$refs.importCustomForm.bsForm.contractNo = this.contractNo;
          this.$refs.importCustomForm.bsForm.certificateList = this.$refs.importCustomForm.certificateList;
          
          this.$axios9.post('/updateBusiness',this.$refs.importCustomForm.bsForm).then((res) => {
             console.log(res.data);
            if(res.data.code === 200){
              this.$message.success('操作成功!');
              this.$refs.importCustomForm.deleteAttachmentList = []
              this.$refs.importCustomForm.businessId = this.declareInfo.businessId;
              this.$refs.importCustomForm.upload()
              this.queryServiceInfo(this.imDeclareServiceId);
            }
          }).catch((e) => {
            console.log(e)
          })
        },
        //取消修改
        editCancel() {
          this.editInfo = '修改';
          this.$refs.importCustomForm.isEdit = true;
          this.queryServiceInfo(this.imDeclareServiceId);
        },
        //报关单删除
        deleteDecService(){
          this.$confirm('此操作将永久删除该报关服务单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios9.post('/deleteDecService',{
              imDeclareServiceId:this.imDeclareServiceId,
              enterpriseId:this.nickCompanyId
            }).then((res) => {
              // console.log(res.data)
              if(res.data.code === 200){
                this.$message.success('删除成功!');
                this.$router.push({path:"/WebCompany/BusinessManage/ImportBs/imService"})
              }
            }).catch((e) => {
              console.log(e)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //派单按钮
        dispatchDeclare(){
          this.$refs.dispatchDeclareDialog.sendDeclare = true;
          this.$refs.dispatchDeclareDialog.imDeclareServiceId = this.imDeclareServiceId;
          this.$refs.dispatchDeclareDialog.enterpriseId = this.nickCompanyId;
        },
        //撤销服务按钮
        cancelDispatch(){
          this.$axios9.post('/cancelOrDispatchDeclare',{
            enterpriseId:this.nickCompanyId,
            imDeclareServiceId:this.imDeclareServiceId
          }).then((res) => {
            // console.log(res.data);
            if(res.data.code === 200){
              this.$message.success('撤销服务成功!');
              this.queryServiceInfo(this.imDeclareServiceId);
            }else if(res.data.code === 40109){
              this.$message.error('用户已接受此单，不可撤销!');
              this.queryServiceInfo(this.imDeclareServiceId);
            }else {
              this.$message.error('撤销服务失败!');
            }
          }).catch((e) => {
            console.log(e)
          })
        },
        //获取审核意见
        getAuditOpinion(){
          this.$refs.auditOpinion.auditOpinion = true;
          this.$refs.auditOpinion.imDeclareServiceId = this.imDeclareServiceId;
          this.$refs.auditOpinion.queryImData()
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
            this.$refs.importCustomForm.declareCustoms = res_exportports.data.RECORDS;
            this.$refs.importCustomForm.supplyAreas = res_domesticport.data.RECORDS;
            this.$refs.importCustomForm.tradeCountrys = res_countryregion.data.RECORDS;
            this.$refs.importCustomForm.superviseModes = res_supervisemode.data.RECORDS;
            this.$refs.importCustomForm.levyNatures = res_levynature.data.RECORDS;
            this.$refs.importCustomForm.originPorts = res_transportationport.data.RECORDS;
            this.$refs.importCustomForm.organizations = res_checkout_organization.data.RECORDS;
            this.$refs.importCustomForm.legalUnits = res_measureunit.data.RECORDS;
            this.$refs.importCustomForm.certificateCodes = res_certificatecode.data.RECORDS;
            this.$refs.importCustomForm.certificateCodesAll = this.$refs.importCustomForm.certificateCodes;
          })).catch((e) => {
            console.log(e);
          })
        },
      }
    }
</script>

<style scoped>

</style>
