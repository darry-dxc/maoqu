<template>
  <div style="height: 800px;overflow: auto;background:white">
    <div v-show="exportflag">
      <el-row style="margin: 10px 0;">
        <el-col :span="22">
          <el-button type="primary" size="small" @click="queryUntreatedOrder" :disabled="isOrderEdit">导入订单</el-button>
          <el-dialog
             title="导入待处理订单"
            :visible.sync="dialogVisible"
            width="60%"
          >
            <el-table :data="unTreatedOrderData" height="400px" highlight-current-row style="width: 100%;"  @current-change="selectOrder">
              <el-table-column type="index" label="#"/>
              <el-table-column prop="exDeclareServiceId" label="服务单号" width="220" />
              <el-table-column prop="teRsCompanyName" label="收发货人" />
              <el-table-column prop="billStatus" label="服务单状态" />
              <el-table-column prop="someTime" label="最近操作时间"/>
            </el-table>
            <div style="float: right;">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10">
              </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
          </el-dialog>
          <el-button type="primary" size="small" @click="saveOrder" :disabled="isOrderEdit">暂存</el-button>
          <el-button type="primary" size="small" @click="printOrder" >打印</el-button>
          <el-button type="primary" size="small" @click="HistoricalDocusFun" :disabled="isOrderEdit">从历史单据复制</el-button>
          <!--历史单据弹出框-->
          <el-dialog title="选择历史单据" :visible.sync="dialogOperationVisible" width="750px" >
            <div style="float: left;">
              <label class="font-size-16">搜索:</label>
              <el-input v-model="keyword" placeholder="请输入关键字,例如：1" size="small" style="width: 200px;"></el-input>
              <el-button type="primary" class="sure" name="ideaQuery" size="small" @click="HistoricalDocusFun">查询</el-button>
            </div>
            <div>
              <el-table :data="docuTableData" @current-change="selectItem" stripe style="width: 100%">
                <el-table-column prop="serviceNo" label="服务单号" width="180">
                </el-table-column>
                <el-table-column prop="contractNo" label="出口合同号">
                </el-table-column>
                <el-table-column prop="deliveryNo" label="提运单号">
                </el-table-column>
                <el-table-column prop="tradeCountry" label="商品名称">
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page="currentPage1"
                @current-change = "queryDeliveryByPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total1"
                style="float: right;">
              </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" plain @click="dialogOperationVisible = false"  size="small">取 消</el-button>
              <el-button type="primary" @click="dialogOperationVisible = false" size="small">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="primary" size="small" @click="clearAll" :disabled="isOrderEdit">重置</el-button>
          <el-button type="primary" size="small" @click="AttachUploadFun">随附单据</el-button>
          <!--随附单据弹出框-->
          <attachmentUpload ref="AttachUpload"></attachmentUpload>
          <!--<el-button type="primary" size="small" @click="">资质查询</el-button>-->
          <!--<el-button type="primary" size="small" @click="">附注</el-button>-->
          <el-button type="danger" size="small" @click="showAuditOpinion">审核意见</el-button>
          <!--历史审核意见弹出框-->
          <el-dialog
            title="历史审核意见"
            :visible.sync="dialogHistoryVisible"
            width="60%"
          >
            <el-table
              :data="historyTableData"
              style="width: 100%">
              <el-table-column width="100" type="index" label="序号" />
              <el-table-column prop="auditTime" label="审核时间" width="250"/>
              <el-table-column prop="auditOpinion" label="审核意见" />
            </el-table>
            <span slot="footer" class="dialog-footer" />
          </el-dialog>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content">
              <span class="font-color-666">&nbsp;&nbsp;&nbsp;&nbsp;企业联系方式：</span>
              <span class="font-color-blue">{{companyPhone}}</span>
            </div>
            <span class="font-color-666">&nbsp;&nbsp;&nbsp;&nbsp;企业名称：
                <span class="font-color-blue">{{ownedEnterpriseName}}</span>
              </span>
          </el-tooltip>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="submitToReview" :disabled="isOrderEdit">提交审核</el-button>
        </el-col>
      </el-row>
      <div class="export-left">
        <!--进口信息表单-->
        <el-row >
          <exportForm ref="bsForm"/>
        </el-row>
        <el-row >
          <!--商品信息表单-->
          <CommodityForm ref="commodityForm" v-on:price1="price1"/>
        </el-row>
      </div>
      <div class="export-right" >
        <AttachmentAndLog ref="attachmentAndLog"/>
        <container ref="con" @addContainer="containerQuantityChange"/>
        <documents ref="doc" @addDoc="docChange" />
        <relativeInfo ref="relative"/>
      </div>
    </div>
    <DeclarationForm ref="DecForm" v-show="newOrderFlag"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import exportForm from './businessManage/exportBsForm';
  import CommodityForm from './businessManage/exportCommodityForm';
  import container from './businessManage/container';
  import documents from './businessManage/documents';
  import relativeInfo from './businessManage/relativeInfo';
  import DeclarationForm from './businessManage/exportDeclarationForm';
  import selectHistoricalDocus from './businessManage/selectHistoricalDocus';
  import AttachmentAndLog from './businessManage/AttachmentAndLog';
  import attachmentUpload from './businessManage/attachmentUpload';
  export default {
    data() {
      return {
        isEdit:false,
        exportflag:true,
        newOrderFlag:false,
        InReFlag:false,
        saveOK:false,
        orderInfo:{},
        resetCon:false,
        dialogVisible:false,
        unTreatedOrderData:[],
        dialogHistoryVisible:false,
        historyTableData:[],
        total:0,
        currentPage:1,
        loading:false,
        businessId:'',
        isOrderEdit:false,
        companyPhone:'',
        ownedEnterpriseName:'',
        totalInfo:[0, 0, 0, 0],
        keyword:'',
        dialogOperationVisible:false,
        docuTableData:[],
        total1:0,
        currentPage1:1,
        tradeCountrys:[],
        currencys:[],
        levyModes:[],
        dealUnits:[],
        destinationcodes:[]
      }
    },
    components:{
      exportForm,
      CommodityForm,
      container,
      documents,
      relativeInfo,
      DeclarationForm,
      selectHistoricalDocus,
      AttachmentAndLog,
      attachmentUpload,
    },
    computed:{
      nickId(){
        return this.$store.state.nickId;
      },
      nickName(){
        return this.$store.state.nickName;
      },
      userInfo(){
        return this.$store.state.userInfo;
      },
      QuarantineList(){
        return this.$store.state.QuarantineList;
      },
      productQualificationList(){
        return this.$store.state.productQualificationList;
      },
      licenseVINList(){
        return this.$store.state.licenseVINList;
      },
      enterpriseQualificationList(){
        return this.$store.state.enterpriseQualificationList;
      },
    },
    mounted(){
      let data2=JSON.parse(localStorage.getItem('Id1'));
      this.$store.commit("updateId",data2);
      this.loadStaticData();//请求本地数据
    },
    activated() {
      if(this.$route.query.exDeclareServiceId !== undefined){
        this.exDeclareDetailId = this.$route.query.exDeclareDetailId;
        this.businessId = this.$route.query.businessId;
        if(this.$route.query.billStatus === '制单中' || this.$route.query.billStatus === '审核未通过'){
          this.isOrderEdit = false;
          this.exportflag = true;
          this.newOrderFlag=false;
          this.$refs.con.isDisabled();
          this.$refs.doc.isDisabled();
          this.newOrderInfo(this.$route.query.exDeclareDetailId);
        }
        else if(this.$route.query.billStatus === '2'){
          // console.log('shFLJKHDFL')
          this.exportflag = false;
          this.newOrderFlag=true;
          this.$refs.DecForm.findExportService(this.$route.query.exDeclareServiceId,this.$route.query.businessId);
        }
        else if(this.$route.query.billStatus === '审核中'
          || this.$route.query.billStatus === '申报中'
          || this.$route.query.billStatus === '结关'
          || this.$route.query.billStatus === '报关单放行'
          || this.$route.query.billStatus == '数据查询'){
          // console.log('4')
          this.isOrderEdit = true;
          this.exportflag = true;
          this.newOrderFlag=false;
          this.$refs.bsForm.isEdit = true;
          this.$refs.relative.isEdit = true;
          this.$refs.commodityForm.AddDisabled = true;
          this.$refs.commodityForm.isAuditing = true;
          this.newOrderInfo(this.$route.query.exDeclareDetailId);
        }
      }
    },
    // 销毁组件，返回刷新
    deactivated() {
      let clear = true;
      this.$store.state.options2.forEach((item)=>{
        if(item.name == '出口业务'){
          clear = false;
        }
      })
       if(clear){
         this.$destroy()
       }
    },
    methods:{
      //获取总价、数量等信息传至子组件
      price1(val){
        this.totalInfo = val;
        this.$refs.relative.dealTotalPrice = this.totalInfo[0];
        this.$refs.relative.dealQuantity = this.totalInfo[1];
        this.$refs.relative.legalQuantity1 = this.totalInfo[2];
        this.$refs.relative.legalQuantity2 = this.totalInfo[3];
      },
      // 历史单据选择
      HistoricalDocusFun(){
        this.docuTableData = [];
        this.dialogOperationVisible = true;
        let params = {
          'receiverId':this.nickId,
          'receiverName':this.nickName,
          'billStatus':6,
          'pageNum':this.currentPage1,
          'pageSize':10,
          'keyword':this.keyword,
        }
        this.$axios6.post('/getOtherOrders',params)
          .then((res) => {
            // console.log('历史单据',res)
            this.total1 = res.data.data.total;
            this.docuTableData.push(res.data.data.list);
          }).catch((e) => {
          console.log(e);
        });
      },
      queryDeliveryByPage(currentPage){
        this.currentPage1 = currentPage;
        this.HistoricalDocusFun();
      },
      selectItem(val){
        // console.log('选中',val)
        if(val !== null && val !== undefined){
          this.newOrderInfo(val.exDeclareDetailId);
        }
      },
      //查看审核意见
      showAuditOpinion(){
        this.dialogHistoryVisible = true;
        this.$axios6.get('getAuditOpinion',{
          params:{
            'exDeclareDetailId':this.exDeclareDetailId
          }
        })
          .then((res) => {
            // console.log(res)
            this.historyTableData = [];
            for(let i = 0; i <res.data.data.length; i++){
              this.historyTableData.push(res.data.data[i]);
            }
          }).catch((e) => {
          console.log(e);
        });
      },
      //查询未处理订单
      queryUntreatedOrder(){
        this.loading = true;
        this.unTreatedOrderData = [];
        let params = {
          'receiverId':this.nickId,
          'receiverName':this.nickName,
          'billStatus':37,
          'pageNum':this.currentPage,
          'pageSize':10,
          'keyword':'',
        }
        this.$axios6.post('/getOtherOrders',params)
          .then((res) => {
            // console.log(res.data);
            this.total = res.data.data.total;
            for(let i=0;i<res.data.data.list.length;i++){
              let dataRow = res.data.data.list[i];
              this.unTreatedOrderData.push(dataRow);
              this.loading = false;
            }
          }).catch((e) =>{
          console.log(e);
          this.loading = false;
        });
        this.dialogVisible = true;
        this.loading = false;
      },
      selectOrder(val){
        // console.log('选中',val)
        if(val !== null){
          this.$refs.con.isDisabled();
          this.$refs.doc.isDisabled();
          this.newOrderInfo(val.exDeclareDetailId);
          setTimeout(()=>{
            this.$refs.bsForm.getInitData();
          },100)
        }
      },
      //分页查询未处理订单
      handleCurrentChange(val){
        this.currentPage = val;
        this.queryUntreatedOrder();
      },
      newOrderInfo(val){
        this.queryFlag = true;
        let params = {
          exDeclareDetailId:val,
        }
        //'http://172.16.10.89:9008/personalImportBusiness/declareDetail'测试地址
        // console.log('查询',params);
        this.$axios6.post('/declareDetail',params)
          .then((response) =>{
            // console.log('查询1',response);
            if(response.data.data !== null){
              this.orderInfo = response.data.data;
              this.orderCon();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //更新集装箱数
      containerQuantityChange(data){
        var containerNum = 0;
        for(let i in data){
          if(data[i].containerSpecification == 11
            || data[i].containerSpecification == 12
            || data[i].containerSpecification == 13
            || data[i].containerSpecification == 32){
            containerNum += 2;
          }
          else {
            containerNum +=1;
          }
        }
        this.$refs.bsForm.form.containerQuantity = containerNum;
      },
      //更新随附单证
      docChange(doc){
        this.$refs.bsForm.form.certificateList=doc;
        this.$refs.bsForm.form.attachDocument=doc;
      },

      /*将查询的待处理订单信息导入到表单中*/
      orderCon(){
        console.log('传入数据',this.orderInfo)
        //企业联系电话绑定
        this.exDeclareDetailId = this.orderInfo.id;
        this.companyPhone = this.orderInfo.enterprisePhone;
        this.ownedEnterpriseName = this.orderInfo.ownedEnterpriseName;
        this.$refs.bsForm.form = this.orderInfo;
        this.$refs.bsForm.formin = this.orderInfo;
        this.$refs.bsForm.marks = this.orderInfo.marks;
        //将毛重、净重、件数转换为数值
        // this.$refs.bsForm.form.grossWeight = Number(this.orderInfo.grossWeight);
        // this.$refs.bsForm.form.netWeight = Number(this.orderInfo.netWeight);
        // this.$refs.bsForm.form.commodityQuantity = Number(this.orderInfo.commodityQuantity);
        //申报单位信息
        // this.$refs.bsForm.form.decCreditCode = '91440608MA512A7U51';
        // this.$refs.bsForm.form.decCustomsCode = '440698400F';
        // this.$refs.bsForm.form.decQuarantineCode = '4400911530';
        // this.$refs.bsForm.form.decCompanyName = '佛山市贸趣众鑫一科技有限公司';

        if(this.orderInfo.marks != '' && this.orderInfo.marks != null){
          this.$refs.bsForm.words1 = this.orderInfo.marks.length;
        }
        this.$refs.bsForm.remarkPer = this.orderInfo.remark;
        if(this.orderInfo.remark != null && this.orderInfo.remark != '') {
          this.$refs.bsForm.words = this.orderInfo.remark.length;
        }
        this.$refs.bsForm.form.remarkPer = this.orderInfo.remark;
        this.$store.commit("updateEnterpriseQualificationList",this.orderInfo.enterpriseQualificationList);
        if(this.orderInfo.enterpriseQualificationList.length != 0) {
          this.$refs.bsForm.formin.qualificationCategoryCode = this.orderInfo.enterpriseQualificationList[0].qualificationCategoryCode;
          this.$refs.bsForm.formin.qualificationCategoryName = this.orderInfo.enterpriseQualificationList[0].qualificationCategoryName;
        }else {
          this.$refs.bsForm.formin.qualificationCategoryCode = '';
          this.$refs.bsForm.formin.qualificationCategoryName = ''
        }
        if(this.orderInfo.elementsQuarantineList.length != 0) {
          var QuarantineList = [];
          for(let i in this.orderInfo.elementsQuarantineList){
            QuarantineList[i] = this.orderInfo.elementsQuarantineList[i].certificateName;
          }
          this.$refs.bsForm.formin.QuaranDeclare = QuarantineList.join(',');
        }
        var selection = [];
        if(this.orderInfo.internationalEvents == 1){
          selection.push('国际赛事')
        }
        if(this.orderInfo.militaryMaterials == 1){
          selection.push('特殊进出军工物资')
        }
        if(this.orderInfo.aidMaterials == 1){
          selection.push('国际援助物资')
        }
        if(this.orderInfo.internationalConference == 1){
          selection.push('国际会议')
        }
        if(this.orderInfo.directClearance == 1){
          selection.push('直通放行')
        }
        if(this.orderInfo.diplomaticCourtesy == 1){
          selection.push('外交礼遇')
        }
        if(this.orderInfo.customsTransit == 1){
          selection.push('转关')
        }
        this.$refs.bsForm.formin.specialService = selection.toString();

        if(this.$refs.bsForm.form.billStatus === 3){
          this.$refs.bsForm.form.billStatus = '制单中'
        }
        else if(this.$refs.bsForm.form.billStatus === 7){
          this.$refs.bsForm.form.billStatus = '审核不通过'
        }
        else if(this.$refs.bsForm.form.billStatus === 4){
          this.$refs.bsForm.form.billStatus = '审核中'
        }
        else if(this.$refs.bsForm.form.billStatus === 5){
          this.$refs.bsForm.form.billStatus = '申报中'
        }
        //其他包装
        this.$refs.bsForm.elsePackagbanding(this.orderInfo.otherPackageType);
        //判断返回的业务选择
        this.$refs.bsForm.selectBstype = [];
        if(this.$refs.bsForm.form.isPaperless === '1')
          this.$refs.bsForm.selectBstype.push('税单无纸化');
        if(this.$refs.bsForm.form.isIndependentTax === '1')
          this.$refs.bsForm.selectBstype.push('自主报税');
        if(this.$refs.bsForm.form.isWaterTransfer === '1')
          this.$refs.bsForm.selectBstype.push('水运中转');
        if(this.$refs.bsForm.form.isAllSelf === '1')
          this.$refs.bsForm.selectBstype.push('自报自缴');
        if(this.$refs.bsForm.form.isGuarantee === '1')
          this.$refs.bsForm.selectBstype.push('担保验放');
        //所需单证
        this.$store.commit("updateQuarantineList",this.orderInfo.elementsQuarantineList);
        //商品列表
        this.$refs.commodityForm.commodityData = this.orderInfo.commodityList;
        //产品资质
        this.$store.commit("updateProductQualificationList",this.orderInfo.prodQualificationList);
        //VIN信息
        this.$store.commit("updateLicenseVINList",this.orderInfo.licenseVinList);
        this.$refs.commodityForm.commodityForm.exDeclareDetailId = this.exDeclareDetailId;

        this.$refs.commodityForm.getTotalPriceToProp();
        //导入集装箱列表
        this.$refs.con.containerData = this.orderInfo.containerList;
        this.$refs.con.commodityItemNoData = this.orderInfo.commodityList;
        //导入随附单证列表
        this.$refs.doc.docData = this.orderInfo.attachCertificateList;
        //随附单证
        var attchDoc = [];
        for (let i in this.orderInfo.attachCertificateList) {
          attchDoc[i] = this.orderInfo.attachCertificateList[i].attachCertificateType;
        }
        this.$refs.bsForm.form.attachDocument=attchDoc.toString();
        //导入关联信息
        this.$refs.relative.form.relatedDeclareForm = this.orderInfo.relatedDeclareForm;
        this.$refs.relative.form.relatedRecord = this.orderInfo.relatedRecord;
        this.$refs.relative.form.taxOrSuperviseSite = this.orderInfo.taxOrSuperviseSite;
        this.$refs.relative.form.siteCode = this.orderInfo.siteCode;
        this.$refs.relative.dealTotalPrice = this.totalInfo[0];
        this.$refs.relative.dealQuantity = this.totalInfo[1];
        this.$refs.relative.legalQuantity1 = this.totalInfo[2];
        this.$refs.relative.legalQuantity2 = this.totalInfo[3];
        //导入附件信息
        this.$refs.attachmentAndLog.attachmentQuery(this.businessId);
        this.$refs.attachmentAndLog.logQuery(this.businessId);
        this.$refs.attachmentAndLog.remark = this.orderInfo.enterpriseDescription;
      },
      //暂存报关单
      saveOrder(){
        let params = {
          id:this.exDeclareDetailId,//进口报关单id
          declareCustoms:this.$refs.bsForm.form.declareCustoms,//申报地海关
          unifiedNo:this.orderInfo.unifiedNo,//统一编号
          preEntryNo:this.orderInfo.preEntryNo,//预录入编号
          customsNo:this.orderInfo.customsNo,//海关编号
          exportBorder:this.$refs.bsForm.form.exportBorder,//出境关别
          recordNo:this.$refs.bsForm.form.recordNo,//备案号
          contractNo:this.$refs.bsForm.form.contractNo,//合同协议号
          exportDate:this.$refs.bsForm.form.exportDate,//出口日期
          declareDate:this.orderInfo.declareDate,//申报日期
          teRsCustomsCode:this.$refs.bsForm.form.teRsCustomsCode,//境内收发货人海关代码
          teRsCreditCode:this.$refs.bsForm.form.teRsCreditCode,//境内收发货人信用代码
          teRsCompanyName:this.$refs.bsForm.form.teRsCompanyName,//境内收发货人单位名称（中文）
          teRsQuarantineCode:this.$refs.bsForm.form.teRsQuarantineCode,//境内收发货人检验检疫编码
          ovRsCode:this.$refs.bsForm.form.ovRsCode,//境外收发货人代码
          ovRsCompanyName:this.$refs.bsForm.form.ovRsCompanyName,//境外收发货人单位名称（外文）
          decCustomsCode:this.$refs.bsForm.form.decCustomsCode,//申报单位海关代码
          decCreditCode:this.$refs.bsForm.form.decCreditCode,//申报单位信用代码
          decCompanyName:this.$refs.bsForm.form.decCompanyName,//申报单位名称
          decQuarantineCode:this.$refs.bsForm.form.decQuarantineCode,//申报单位检验检疫编码
          psCustomsCode:this.$refs.bsForm.form.psCustomsCode,//生产销售单位海关代码
          psCreditCode:this.$refs.bsForm.form.psCreditCode,//生产销售单位信用代码
          psCompanyName:this.$refs.bsForm.form.psCompanyName,//生产销售单位名称
          psQuarantineCode:this.$refs.bsForm.form.psQuarantineCode,//生产销售单位检验检疫编码
          transportMode:this.$refs.bsForm.form.transportMode,//运输方式
          conveyanceName:this.$refs.bsForm.form.conveyanceName,//运输工具名称
          voyageNo:this.$refs.bsForm.form.voyageNo,//航次号
          deliveryNo:this.$refs.bsForm.form.deliveryNo,//提运单号
          storagePlace:this.$refs.bsForm.form.storagePlace,//货物存放地点
          supervisionMode:this.$refs.bsForm.form.supervisionMode,//监管方式
          levyNature:this.$refs.bsForm.form.levyNature,//征免性质
          licenseKey:this.$refs.bsForm.form.licenseKey,//许可证号
          arrivalPort:this.$refs.bsForm.form.arrivalPort,//指运港
          tradeCountry:this.$refs.bsForm.form.tradeCountry,//贸易国
          arrivalCountry:this.$refs.bsForm.form.arrivalCountry,//运抵国
          exportPort:this.$refs.bsForm.form.exportPort,//离境口岸
          packageType:this.$refs.bsForm.form.packageType,//包装种类
          otherPackageType:this.$refs.bsForm.otherPackage,//其他种类
          commodityQuantity:this.$refs.bsForm.form.commodityQuantity,//件数
          grossWeight:this.$refs.bsForm.form.grossWeight,//毛重
          netWeight:this.$refs.bsForm.form.netWeight,//净重
          dealMode:this.$refs.bsForm.form.dealMode,//成交方式
          freightMark:this.$refs.bsForm.form.freightMark,//运费标记
          freightRate:this.$refs.bsForm.form.freightRate,//运费
          freightCurrency:this.$refs.bsForm.form.freightCurrency,//运费币制
          premiumMark:this.$refs.bsForm.form.premiumMark,//保费标记
          premiumRate:this.$refs.bsForm.form.premiumRate,//保费
          premiumCurrency:this.$refs.bsForm.form.premiumCurrency,//保费币制
          incidentalMark:this.$refs.bsForm.form.incidentalMark,//杂费标记
          incidentalRate:this.$refs.bsForm.form.incidentalRate,//杂费
          incidentalCurrency:this.$refs.bsForm.form.incidentalCurrency,//杂费币制
          containerQuantity:this.$refs.bsForm.form.containerQuantity,//集装箱数
          attachDocument:this.$refs.bsForm.form.attachDocument,//随附单证
          declarationType:this.$refs.bsForm.form.declarationType,//报关单类型
          remark:this.$refs.bsForm.form.remarkPer,//备注
          marks:this.$refs.bsForm.form.marks,//标记唛码
          relationshipCon:this.$refs.bsForm.form.relationshipCon,//特殊关系确认
          priceCon:this.$refs.bsForm.form.priceCon,//价格影响确认
          franchiseFeeCon:this.$refs.bsForm.form.franchiseFeeCon,//与货物有关的特许权使用费支付确认
          isPaperless:this.$refs.bsForm.form.isPaperless,//税单无纸化(1:是 0：否)
          isIndependentTax:this.$refs.bsForm.form.isIndependentTax,//自主报税
          isAllSelf:this.$refs.bsForm.form.isAllSelf,//自报自缴
          isGuarantee:this.$refs.bsForm.form.isGuarantee,//担保验放

          inspectionAndQuarantineOrgan:this.$refs.bsForm.formin.inspectionAndQuarantineOrgan,//检验检疫受理机关
          certificationAuthority:this.$refs.bsForm.formin.certificationAuthority,//领证机关
          portInspectionAndQuarantineOrgan:this.$refs.bsForm.formin.portInspectionAndQuarantineOrgan,//口岸检验检疫机关
          shipmentDate:this.$refs.bsForm.formin.shipmentDate,//启运日期
          blNo:this.$refs.bsForm.formin.blNo,//B/L号
          desInspectionAndQuarantineOrgan:this.$refs.bsForm.formin.desInspectionAndQuarantineOrgan,//目的地检验检疫机关
          associatedNo:this.$refs.bsForm.formin.associatedNo,//关联号码
          associatedReasons:this.$refs.bsForm.formin.associatedReasons,//关联理由
          originalboxTransportation:this.$refs.bsForm.formin.originalboxTransportation,//原箱运输
          internationalEvents:this.$refs.bsForm.formin.internationalEvents,//国际赛事
          militaryMaterials:this.$refs.bsForm.formin.militaryMaterials,//特殊进出军工物资
          aidMaterials:this.$refs.bsForm.formin.aidMaterials,//国际援助物资
          internationalConference:this.$refs.bsForm.formin.internationalConference,//国际会议
          directClearance:this.$refs.bsForm.formin.directClearance,//直通放行
          diplomaticCourtesy:this.$refs.bsForm.formin.diplomaticCourtesy,//外交礼遇
          customsTransit:this.$refs.bsForm.formin.customsTransit,//转关
          teRsComanyEnName:this.$refs.bsForm.formin.teRsComanyEnName,//境内收发货人名称(外文)
          ovRsComanyCnName:this.$refs.bsForm.formin.ovRsComanyCnName,//境外收发货人名称(中文)
          ovConsignorAddress:this.$refs.bsForm.formin.ovConsignorAddress,//境外发货人地址
          unloadedDate:this.$refs.bsForm.formin.unloadedDate,//卸毕日期
          commodityEnName:this.$refs.bsForm.formin.commodityEnName,//商品英文名称
          userInfoList:this.userInfo,//使用单位信息集合
          elementsQuarantineList:this.QuarantineList,//检验检疫签证申报要素集合

          relatedDeclareForm:this.$refs.relative.form.relatedDeclareForm,//关联报关单
          relatedRecord:this.$refs.relative.form.relatedRecord,//关联备案
          taxOrSuperviseSite:this.$refs.relative.form.taxOrSuperviseSite,//保税/监管场所
          siteCode:this.$refs.relative.form.siteCode,//货场代码

          enterpriseQualificationList:this.enterpriseQualificationList,//企业资质信息集合

          commodityList:this.$refs.commodityForm.commodityData,//出口报关单关联商品
          prodQualificationList:this.productQualificationList,//出口报关单关联商品
          licenseVinList:this.licenseVINList,//出口报关单关联商品
        };
        console.log('暂存',params)
        this.$axios6.post('/saveDeclareOrder',params)
          .then((res) => {
            // console.log(res.data);
            if(res.data.state === true){
              this.containerListSave();
              // var DataNull = [];
              // this.$store.commit("updateProductQualificationList",DataNull);
              // var VINData = [];
              // this.$store.commit("updateLicenseVINList",VINData);
            }else {
              // console.log('订单暂存失败！')
              this.$message.error('暂存失败！');
            }
          }).catch((e) => {
          console.log(e);
        })
      },
      //集装箱暂存
      containerListSave(){
        let params = {
          exDeclareDetailId:this.exDeclareDetailId,
          list:this.$refs.con.containerData,//出口报关单关联集装箱
        };
        // console.log('集装箱暂存',params)
        this.$axios6.post('/saveDetailContainer',params)
          .then((res) => {
            // console.log(res.data);
            if(res.data.state === true){
              this.attachCertificateListSave()
            }else {
              // console.log('集装箱暂存失败！')
              this.$message.error('暂存失败！');
            }
          }).catch((e) => {
          console.log(e);
        })
      },
      //随附单证暂存
      attachCertificateListSave(){
        let params = {
          exDeclareDetailId:this.exDeclareDetailId,
          list:this.$refs.doc.docData,//出口报关单关联随附单证
        };
        // console.log('随附单证暂存',params)
        this.$axios6.post('/saveDetailCertificate',params)
          .then((res) => {
            // console.log(res.data);
            if(res.data.state === true){
              this.$message.success('暂存成功！');
              this.submitAudit();
            }else {
              // console.log('随附单证暂存失败')
              this.$message.error('暂存失败！');
            }
          }).catch((e) => {
          console.log(e);
        })
      },
      //打印报关单
      printOrder(){
        var commodityData = [];
        for(var i = 0; i < this.$refs.commodityForm.commodityData.length; i ++){
          commodityData.push({
            "commodityName": this.isNull(this.$refs.commodityForm.commodityData[i].commodityName),
            "commoditySpecification": this.isNull(this.$refs.commodityForm.commodityData[i].commoditySpecification),
            "commodityCustomsNo": this.isNull(this.$refs.commodityForm.commodityData[i].commodityCustomsNo),
            "CIQ": '',
            "legalQuantity1": this.isNull(this.$refs.commodityForm.commodityData[i].legalQuantity1),
            "legalMeasurementUnit1": this.dealUnitsFind(this.$refs.commodityForm.commodityData[i].legalUnit1),
            "egalQuantity2": this.isNull(this.$refs.commodityForm.commodityData[i].legalQuantity2),
            "legalMeasurementUnit2": this.dealUnitsFind(this.$refs.commodityForm.commodityData[i].legalUnit2),
            "dealQuantity": this.isNull(this.$refs.commodityForm.commodityData[i].dealQuantity),
            "dealMeasurementUnit": this.dealUnitsFind(this.$refs.commodityForm.commodityData[i].dealUnit),
            "dealUnitPrice": this.isNull(this.$refs.commodityForm.commodityData[i].dealUnitPrice),
            "dealTotalPrice": this.isNull(this.$refs.commodityForm.commodityData[i].dealTotalPrice),
            "currency": this.currencysFind(this.$refs.commodityForm.commodityData[i].currency),
            "originalCountry": this.tradeCountrysFind(this.$refs.commodityForm.commodityData[i].sourceCountry),
            "originalCountryCode": this.isNull(this.$refs.commodityForm.commodityData[i].sourceCountry),
            "destCountryRegion": this.tradeCountrysFind(this.$refs.commodityForm.commodityData[i].destinationCountry),
            "domesticDestination": this.destinationcodesFind(this.$refs.commodityForm.commodityData[i].domesticSource),
            "destCountryRegionCode": this.isNull(this.$refs.commodityForm.commodityData[i].destinationCountry),
            "levyMode": this.levyModesFind(this.$refs.commodityForm.commodityData[i].levyMode),
            "levyModeCode": this.isNull(this.$refs.commodityForm.commodityData[i].levyMode),
          })
        }
        for(var i = this.$refs.commodityForm.commodityData.length;i<6;i++){
          commodityData.push({
            "commodityName": '',
            "commoditySpecification": '',
            "commodityCustomsNo": '',
            "CIQ": '',
            "legalQuantity1": '',
            "legalMeasurementUnit1": '',
            "egalQuantity2": '',
            "legalMeasurementUnit2": '',
            "dealQuantity": '',
            "dealMeasurementUnit": '',
            "dealUnitPrice": '',
            "dealTotalPrice": '',
            "currency": '',
            "originalCountry": '',
            "originalCountryCode": '',
            "destCountryRegion": '',
            "domesticDestination": '',
            "destCountryRegionCode": '',
            "levyMode": '',
            "levyModeCode": '',
          })
        }
        this.$confirm('确定打印此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          XDoc.key = "ponczgnfifgr5efs7la6a3zgem";
          XDoc.run("./出口报关单new.xlsx",
            "pdf",
            {
              "preEntryNo": this.isNull(this.$refs.bsForm.form.preEntryNo),
              "teRsComanyName": this.isNull(this.$refs.bsForm.form.teRsCompanyName),
              "pageNum": 1/1 ,
              "enterBorder": this.isNull(this.$refs.bsForm.form.exportBorder),
              "customsNo": this.isNull(this.$refs.bsForm.form.declareCustoms),
              "customsName": this.isNullAndName(this.$refs.bsForm.declareCustomsAll,this.$refs.bsForm.form.declareCustoms),
              "enterName": this.isNullAndName(this.$refs.bsForm.exportBordersAll,this.$refs.bsForm.form.exportBorder),
              "importDate": this.isNull(this.$refs.bsForm.form.exportDate),
              "declareDate": this.isNull(this.$refs.bsForm.form.declareDate),
              "recordNo": this.isNull(this.$refs.bsForm.form.recordNo),
              "ovRsComanyName": this.isNull(this.$refs.bsForm.form.ovRsCompanyName),
              "transportMode": this.isNull(this.$refs.bsForm.form.transportMode),
              "transportModeName": this.isNullAndName(this.$refs.bsForm.transportModesAll,this.$refs.bsForm.form.transportMode),
              "conveyanceName": this.isNull(this.$refs.bsForm.form.conveyanceName),
              "voyageNo": this.isNull(this.$refs.bsForm.form.voyageNo),
              "deliveryNo": this.isNull(this.$refs.bsForm.form.deliveryNo),
              "csCompanyName": this.isNull(this.$refs.bsForm.form.psCompanyName),
              "supervisionMode": this.isNull(this.$refs.bsForm.form.supervisionMode),
              "supervisionModeName": this.isNullAndName(this.$refs.bsForm.superviseModesAll,this.$refs.bsForm.form.supervisionMode),
              "levyNatureName": this.isNullAndName(this.$refs.bsForm.levyNaturesAll,this.$refs.bsForm.form.levyNature),
              "licenseKey": this.isNull(this.$refs.bsForm.form.licenseKey),
              "contractNo": this.isNull(this.$refs.bsForm.form.contractNo),
              "tradeCountry": this.isNull(this.$refs.bsForm.form.tradeCountry),
              "tradeCountryName": this.isNullAndName(this.$refs.bsForm.tradeCountrysAll,this.$refs.bsForm.form.tradeCountry),
              "originCountryName": this.isNullAndName(this.$refs.bsForm.arrivalCountrysAll,this.$refs.bsForm.form.arrivalCountry),
              "stopOverPortName": this.isNullAndName(this.$refs.bsForm.stopOverPortsAll,this.$refs.bsForm.form.arrivalPort),
              "packageTypeName": this.isNullAndName(this.$refs.bsForm.packageTypesAll,this.$refs.bsForm.form.packageType),
              "commodityQuantity": this.isNull(this.$refs.bsForm.form.commodityQuantity),
              "grossWeight": this.isNull(this.$refs.bsForm.form.grossWeight),
              "netWeight": this.isNull(this.$refs.bsForm.form.netWeight),
              "dealMode": this.isNullAndName(this.$refs.bsForm.dealModesAll,this.$refs.bsForm.form.dealMode),
              "freightMark": this.isPrice(this.$refs.bsForm.form.freightMark),
              "freightRate": this.isNull(this.$refs.bsForm.form.freightRate),
              "freightCurrency": this.isNullAndName(this.$refs.bsForm.freightCurrencysAll,this.$refs.bsForm.form.freightCurrency),
              "premiumMark": this.isPrice(this.$refs.bsForm.form.premiumMark),
              "premiumRate": this.isNull(this.$refs.bsForm.form.premiumRate),
              "premiumCurrency": this.isNullAndName(this.$refs.bsForm.premiumCurrencysAll,this.$refs.bsForm.form.premiumCurrency),
              "incidentalMark": this.isPrice(this.$refs.bsForm.form.incidentalMark),
              "incidentalRate": this.isNull(this.$refs.bsForm.form.incidentalRate),
              "incidentalCurrency": this.isNullAndName(this.$refs.bsForm.incidentalCurrencysAll,this.$refs.bsForm.form.incidentalCurrency),
              "attachDocument": this.isNull(this.$refs.bsForm.form.attachDocument),
              "remark": this.isNull(this.$refs.bsForm.form.remarkPer),

              "commodityName1": commodityData[0].commodityName,
              "commoditySpecification1": commodityData[0].commoditySpecification,
              "commodityCustomsNo1": commodityData[0].commodityCustomsNo,
              "CIQ1": commodityData[0].CIQ,
              "legalQuantity11": commodityData[0].legalQuantity1,
              "legalMeasurementUnit11": commodityData[0].legalMeasurementUnit1,
              "egalQuantity21": commodityData[0].egalQuantity2,
              "legalMeasurementUnit21": commodityData[0].legalMeasurementUnit2,
              "dealQuantity1": commodityData[0].dealQuantity,
              "dealMeasurementUnit1": commodityData[0].dealMeasurementUnit,
              "dealUnitPrice1": commodityData[0].dealUnitPrice,
              "dealTotalPrice1": commodityData[0].dealTotalPrice,
              "currency1": commodityData[0].currency,
              "originalCountry1": commodityData[0].originalCountry,
              "originalCountryCode1": commodityData[0].originalCountryCode,
              "destCountryRegion1": commodityData[0].destCountryRegion,
              "domesticDestination1": commodityData[0].domesticDestination,
              "destCountryRegionCode1": commodityData[0].destCountryRegionCode,
              "levyMode1": commodityData[0].levyMode,
              "levyModeCode1": commodityData[0].levyModeCode,

              "commodityName2": commodityData[1].commodityName,
              "commoditySpecification2": commodityData[1].commoditySpecification,
              "commodityCustomsNo2": commodityData[1].commodityCustomsNo,
              "CIQ2": commodityData[1].CIQ,
              "legalQuantity12": commodityData[1].legalQuantity1,
              "legalMeasurementUnit12": commodityData[1].legalMeasurementUnit1,
              "egalQuantity22": commodityData[1].egalQuantity2,
              "legalMeasurementUnit22": commodityData[1].legalMeasurementUnit2,
              "dealQuantity2": commodityData[1].dealQuantity,
              "dealMeasurementUnit2": commodityData[1].dealMeasurementUnit,
              "dealUnitPrice2": commodityData[1].dealUnitPrice,
              "dealTotalPrice2": commodityData[1].dealTotalPrice,
              "currency2": commodityData[1].currency,
              "originalCountry2": commodityData[1].originalCountry,
              "originalCountryCode2": commodityData[1].originalCountryCode,
              "destCountryRegion2": commodityData[1].destCountryRegion,
              "domesticDestination2": commodityData[1].domesticDestination,
              "destCountryRegionCode2": commodityData[1].destCountryRegionCode,
              "levyMode2": commodityData[1].levyMode,
              "levyModeCode2": commodityData[1].levyModeCode,

              "commodityName3": commodityData[2].commodityName,
              "commoditySpecification3": commodityData[2].commoditySpecification,
              "commodityCustomsNo3": commodityData[2].commodityCustomsNo,
              "CIQ3": commodityData[2].CIQ,
              "legalQuantity13": commodityData[2].legalQuantity1,
              "legalMeasurementUnit13": commodityData[2].legalMeasurementUnit1,
              "egalQuantity23": commodityData[2].egalQuantity2,
              "legalMeasurementUnit23": commodityData[2].legalMeasurementUnit2,
              "dealQuantity3": commodityData[2].dealQuantity,
              "dealMeasurementUnit3": commodityData[2].dealMeasurementUnit,
              "dealUnitPrice3": commodityData[2].dealUnitPrice,
              "dealTotalPrice3": commodityData[2].dealTotalPrice,
              "currency3": commodityData[2].currency,
              "originalCountry3": commodityData[2].originalCountry,
              "originalCountryCode3": commodityData[2].originalCountryCode,
              "destCountryRegion3": commodityData[2].destCountryRegion,
              "domesticDestination3": commodityData[2].domesticDestination,
              "destCountryRegionCode3": commodityData[2].destCountryRegionCode,
              "levyMode3": commodityData[2].levyMode,
              "levyModeCode3": commodityData[2].levyModeCode,

              "commodityName4": commodityData[3].commodityName,
              "commoditySpecification4": commodityData[3].commoditySpecification,
              "commodityCustomsNo4": commodityData[3].commodityCustomsNo,
              "CIQ4": commodityData[3].CIQ,
              "legalQuantity14": commodityData[3].legalQuantity1,
              "legalMeasurementUnit14": commodityData[3].legalMeasurementUnit1,
              "egalQuantity24": commodityData[3].egalQuantity2,
              "legalMeasurementUnit24": commodityData[3].legalMeasurementUnit2,
              "dealQuantity4": commodityData[3].dealQuantity,
              "dealMeasurementUnit4": commodityData[3].dealMeasurementUnit,
              "dealUnitPrice4": commodityData[3].dealUnitPrice,
              "dealTotalPrice4": commodityData[3].dealTotalPrice,
              "currency4": commodityData[3].currency,
              "originalCountry4": commodityData[3].originalCountry,
              "originalCountryCode4": commodityData[3].originalCountryCode,
              "destCountryRegion4": commodityData[3].destCountryRegion,
              "domesticDestination4": commodityData[3].domesticDestination,
              "destCountryRegionCode4": commodityData[3].destCountryRegionCode,
              "levyMode4": commodityData[3].levyMode,
              "levyModeCode4": commodityData[3].levyModeCode,

              "commodityName5": commodityData[4].commodityName,
              "commoditySpecification5": commodityData[4].commoditySpecification,
              "commodityCustomsNo5": commodityData[4].commodityCustomsNo,
              "CIQ5": commodityData[4].CIQ,
              "legalQuantity15": commodityData[4].legalQuantity1,
              "legalMeasurementUnit15": commodityData[4].legalMeasurementUnit1,
              "egalQuantity25": commodityData[4].egalQuantity2,
              "legalMeasurementUnit25": commodityData[4].legalMeasurementUnit2,
              "dealQuantity5": commodityData[4].dealQuantity,
              "dealMeasurementUnit5": commodityData[4].dealMeasurementUnit,
              "dealUnitPrice5": commodityData[4].dealUnitPrice,
              "dealTotalPrice5": commodityData[4].dealTotalPrice,
              "currency5": commodityData[4].currency,
              "originalCountry5": commodityData[4].originalCountry,
              "originalCountryCode5": commodityData[4].originalCountryCode,
              "destCountryRegion5": commodityData[4].destCountryRegion,
              "domesticDestination5": commodityData[4].domesticDestination,
              "destCountryRegionCode5": commodityData[4].destCountryRegionCode,
              "levyMode5": commodityData[4].levyMode,
              "levyModeCode5": commodityData[4].levyModeCode,

              "commodityName6": commodityData[5].commodityName,
              "commoditySpecification6": commodityData[5].commoditySpecification,
              "commodityCustomsNo6": commodityData[5].commodityCustomsNo,
              "CIQ6": commodityData[5].CIQ,
              "legalQuantity16": commodityData[5].legalQuantity1,
              "legalMeasurementUnit16": commodityData[5].legalMeasurementUnit1,
              "egalQuantity26": commodityData[5].egalQuantity2,
              "legalMeasurementUnit26": commodityData[5].legalMeasurementUnit2,
              "dealQuantity6": commodityData[5].dealQuantity,
              "dealMeasurementUnit6": commodityData[5].dealMeasurementUnit,
              "dealUnitPrice6": commodityData[5].dealUnitPrice,
              "dealTotalPrice6": commodityData[5].dealTotalPrice,
              "currency6": commodityData[5].currency,
              "originalCountry6": commodityData[5].originalCountry,
              "originalCountryCode6": commodityData[5].originalCountryCode,
              "destCountryRegion6": commodityData[5].destCountryRegion,
              "domesticDestination6": commodityData[5].domesticDestination,
              "destCountryRegionCode6": commodityData[5].destCountryRegionCode,
              "levyMode6": commodityData[5].levyMode,
              "levyModeCode6": commodityData[5].levyModeCode,

              "relationshipCon":this.isYesOrNot(this.$refs.bsForm.form.relationshipCon),
              "priceCon": this.isYesOrNot(this.$refs.bsForm.form.priceCon),
              "franchiseFeeCon": this.isYesOrNot(this.$refs.bsForm.form.franchiseFeeCon),
              "isAllSelf": this.isYesOrNot(this.$refs.bsForm.form.isAllSelf),
              "decCustomsCode": this.isNull(this.$refs.bsForm.form.decCustomsCode),
              "decCompanyName": this.isNull(this.$refs.bsForm.form.decCompanyName),
              "levyNature": this.isNull(this.$refs.bsForm.form.levyNature),
              "originCountry": this.isNull(this.$refs.bsForm.form.arrivalCountry),
              "stopOverPort": this.isNull(this.$refs.bsForm.form.arrivalPort),
              "packageType": this.isNull(this.$refs.bsForm.form.packageType),
              "teRsCustomsCode": this.isNull(this.$refs.bsForm.form.teRsCustomsCode),
              "ovRsCustomsCode": this.isNull(this.$refs.bsForm.form.ovRsCode),
              "csCustomsCode": this.isNull(this.$refs.bsForm.form.psCustomsCode)
          }, "_blank");
        }).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '打印出错'
          });
        });
      },
      //判定是否
      isYesOrNot(val){
        if(val == 1){
          return '是'
        }else if(val == 0){
          return '否'
        }else if(val == 9){
          return '空'
        }else {
          return ''
        }
      },
      //判定为空
      isNull(val){
        if(val == null || val == undefined){
          return ''
        }else {
          return val
        }
      },
      //判定单价总价率
      isPrice(val){
        if(val == 1){
          return '率'
        }else if(val == 2){
          return '单价'
        }else if(val == 3){
          return '总价'
        }else{
          return ''
        }
      },
      //原产国、最终目的国搜索
      tradeCountrysFind(val){
        var returnVal = '';
        if(val != '' && val != undefined && val != null){
          this.tradeCountrys.find((item)=>{
            if(item.value == val){
              returnVal = item.label
            }
          })
          return returnVal;
        }
        else {
          return ''
        }
      },
      //币制搜索
      currencysFind(val){
        var returnVal = '';
        if(val != '' && val != undefined && val != null){
          this.currencys.find((item)=>{
            if(val == item.value){
              returnVal = item.label
            }
          })
          return returnVal;
        }
        else {
          return ''
        }
      },
      //征免方式搜索
      levyModesFind(val){
        var returnVal = '';
        if(val != '' && val != undefined && val != null){
          this.levyModes.find((item)=>{
            if(item.value == val){
              returnVal = item.label
            }
          })
          return returnVal;
        }
        else {
          return ''
        }
      },
      //单位搜索
      dealUnitsFind(val){
        var returnVal = '';
        if(val != '' && val != undefined && val != null){
          this.dealUnits.find((item)=>{
            if(item.value == val){
              returnVal = item.label
            }
          })
          return returnVal;
        }
        else {
          return ''
        }
      },
      //境内货源地搜索
      destinationcodesFind(val){
        var returnVal = '';
        if(val != '' && val != undefined && val != null){
          this.destinationcodes.find((item)=>{
            if(item.value == val){
              returnVal = item.label
            }
          })
          return returnVal;
        }
        else {
          return ''
        }
      },
      //判定是否为空并返回中文名
      isNullAndName(array,value){
        console.log(array,value)
        var valueName = '';
        if(array != null && array != undefined){
          if(array.length == 1){
            valueName = array[0].label
          }
          else {
            array.find((item)=>{
              if(item.value == value){
                valueName = item.label
              }
            })
          }
        }
        return valueName;
      },
      /*暂存后提交审核*/
      submitToReview(){
        this.$confirm('确定提交此订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveOrder();
          this.saveOK = true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      submitAudit(){
        if(this.saveOK === true){
          //执行校验
          this.$refs.bsForm.submitForm();
          this.$refs.bsForm.submitFormin();
          console.log('ooo',this.$refs.bsForm.activeName,this.$refs.bsForm.submitFormFlag,this.$refs.bsForm.submitForminFlag)
          if(this.$refs.bsForm.submitFormFlag){
            if(this.$refs.bsForm.activeName == 0){
              let params = {
                exDeclareDetailId:this.exDeclareDetailId,//进口报关单id
              };
              this.$axios6.post('/submitToVerify',params)
                .then((res) => {
                  console.log('提交审核',res.data);
                  if(res.data.state === true){
                    this.$message.success('提交审核成功！');
                    setTimeout(()=>{
                      this.$store.commit('delete2_tabs', '/personExportBs');
                      this.$router.push({path:'/PersonMainCon'});
                    },1000)
                  }
                  else {
                    this.$message.error('提交审核失败！');
                  }
                }).catch((e) => {
                console.log(e);
              })
            }
            else if(this.$refs.bsForm.activeName == 1 && this.$refs.bsForm.submitForminFlag){
              let params = {
                exDeclareDetailId:this.exDeclareDetailId,//进口报关单id
              };
              this.$axios6.post('/submitToVerify',params)
                .then((res) => {
                  console.log('提交审核',res.data);
                  if(res.data.state === true){
                    this.$message.success('提交审核成功！');
                    setTimeout(()=>{
                      this.$store.commit('delete2_tabs', '/personExportBs');
                      this.$router.push({path:'/PersonMainCon'});
                    },1000)
                  }
                  else {
                    this.$message.error('提交审核失败！');
                  }
                }).catch((e) => {
                console.log(e);
              })
            }
            else {
              this.$message.error('请正确填写红色框中内容！');
            }
          }
          else {
            this.$message.error('请正确填写红色框中内容！');
          }
        }
        this.saveOK = false;
        this.$refs.bsForm.submitFormFlag = false;
        this.$refs.bsForm.submitForminFlag = false;

      },
      //重置按钮清空表单
      clearAll(){
        this.$confirm('确定重置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.clearInfoAll()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //清楚所有信息
      clearInfoAll(){
        this.$refs.bsForm.form = {};
        this.$refs.bsForm.formin = {};
        this.$refs.bsForm.packageArray = [];
        this.$refs.bsForm.otherPackage = '';
        this.$refs.bsForm.activeName = '';
        this.$refs.commodityForm.commodityForm = {};
        this.$refs.commodityForm.formin = {};
        this.$refs.commodityForm.commodityData = [];
        this.$refs.commodityForm.goodsPropertyCode = [];
        this.$refs.commodityForm.isAddDisabled = true;
        this.$refs.commodityForm.activeName = '';
        this.$refs.con.containerData = [];
        this.$refs.doc.docData = [];
        this.$refs.relative.form = {};
        this.$refs.relative.dealTotalPrice = 0;
        this.$refs.relative.dealQuantity = 0;
        this.$refs.relative.legalQuantity1 = 0;
        this.$refs.relative.legalQuantity2 = 0;
      },
      //随附单据上传
      AttachUploadFun(){
        this.$refs.AttachUpload.bussinessIdQuery(this.exDeclareDetailId);
      },
      //显示出口业务界面
      exportShow(exDeclareDetailId){
        this.isOrderEdit = false;
        this.exportflag = true;
        this.newOrderFlag=false;
        this.$refs.con.isDisabled();
        this.$refs.doc.isDisabled();
        this.newOrderInfo(exDeclareDetailId);
        this.$refs.bsForm.loadStaticData();
        setTimeout(()=>{
          this.$refs.bsForm.getInitData();
        },500)
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          this.$axios.get('static/pub_currencysystem.json'),//币种
          this.$axios.get('static/pub_measureunit.json'),//成交单位
          this.$axios.get('static/pub_levymode.json'),//征免方式
          this.$axios.get('static/pub_churchyarddestinationcode.json'),//境内目的地
        ]).then(this.$axios.spread((
          res_countryregion,
          res_currencysystem,
          res_measureunit,
          res_levymode,
          res_churchyarddestinationcode,
        ) => {
          this.tradeCountrys = res_countryregion.data.RECORDS;
          this.currencys = res_currencysystem.data.RECORDS;
          this.levyModes = res_levymode.data.RECORDS;
          this.dealUnits = res_measureunit.data.RECORDS;
          this.destinationcodes = res_churchyarddestinationcode.data.RECORDS;
        })).catch((e) => {
          console.log(e);
        })
      }
    }
  }
</script>

<style scoped>
  .formItem{
    margin: 2px 0;
  }
  .export-left{
    width: 80%;
    float: left;
  }
  .export-right{
    width: 20%;
    float: left;
  }
</style>
