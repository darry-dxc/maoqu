<template>
    <div style="height: 800px;overflow: auto">
      <div class="export-left">
        <!--出口信息表单-->
        <el-row >
          <exportForm ref="bsForm" />
        </el-row>
        <el-row >
          <!--商品信息表单-->
          <exportCommodityForm ref="commodityForm" />
        </el-row>
      </div>
      <div class="export-right">
        <AttachmentAndLog ref="attachmentAndLog"/>
        <container ref="con" @addContainer="containerQuantityChange"/>
        <documents ref="doc" @addDoc="docChange" />
        <relativeInfo ref="relative"/>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import exportForm from './../../webPersonal/businessManage/exportBsForm';
  import exportCommodityForm from './../../webPersonal/businessManage/exportCommodityForm';
  import AttachmentAndLog from './../../webPersonal/businessManage/AttachmentAndLog';
  import container from './../../webPersonal/businessManage/container';
  import documents from './../../webPersonal/businessManage/documents';
  import relativeInfo from './../../webPersonal/businessManage/relativeInfo';
  import ElRow from "element-ui/packages/row/src/row";
  import attachmentUpload from './../../webPersonal/businessManage/attachmentUpload';
  import selectHistoricalDocus from './../../webPersonal/businessManage/selectHistoricalDocus';
  import moment from 'moment';
  import { mapState } from 'vuex'
    export default {
        data() {
            return {
              dialogVisible:false,
              unTreatedOrderData:[],
              resetCon:false,
              orderInfo:{},
              opinion:false,
            }
        },
      components:{
        ElRow,
        exportForm,
        exportCommodityForm,
        AttachmentAndLog,
        container,
        documents,
        relativeInfo,
        attachmentUpload,
        selectHistoricalDocus
      },
      computed:{
     ...mapState(['businessNo','businessId','nickId'])
     },
    methods:{
       //更新集装箱数
      containerQuantityChange(num){
        this.$refs.bsForm.form.containerQuantity=num;
      },
      //更新随附单证
      docChange(doc){
        this.$refs.bsForm.form.attachDocument=doc;
      },
      //格式化时间
      dateFormat:function(row, column) {
        let date = row[column.property];
        if (date === undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
       /*将查询的待处理订单信息导入到表单中*/
      orderCon(){
          let param={
            // exDeclareServiceId:this.businessId,
             exDeclareServiceId:"444589427352666112",
          };
          console.log(param);
          this.$axios4.post('enterpriseBusiness/exDeclareDetailSearch',param)
          .then((response) =>{
            console.log(response.data);
            this.orderInfo = response.data;
            this.$refs.bsForm.form = this.orderInfo;
        //判断其他事项确认的返回结果
        if(this.$refs.bsForm.form.billStatus === 3){
          this.$refs.bsForm.form.billStatus = '制单中'
        }
        else if(this.$refs.bsForm.form.billStatus === 7){
          this.$refs.bsForm.form.billStatus = '审核不通过'
        }

        if(this.$refs.bsForm.form.relationshipCon === '1')
          this.$refs.bsForm.form.relationshipCon = '是';
        else
          this.$refs.bsForm.form.relationshipCon = '否';
        if(this.$refs.bsForm.form.priceCon === '1')
          this.$refs.bsForm.form.priceCon = '是';
        else
          this.$refs.bsForm.form.priceCon = '否';
        if(this.$refs.bsForm.form.franchiseFeeCon === '1')
          this.$refs.bsForm.form.franchiseFeeCon = '是';
        else
          this.$refs.bsForm.form.franchiseFeeCon = '否';
        this.$refs.bsForm.selectBstype = [];
        //判断返回的业务选择
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
        this.$refs.commodityForm.commodityData = this.orderInfo.commodityList;
        this.dialogVisible = false;
        //导入集装箱列表
        this.$refs.con.containerData = this.orderInfo.containerList;
        //导入随附单据列表
        this.$refs.doc.docData = this.orderInfo.attachCertificateList;
        //导入关联信息
        this.$refs.relative.form.relDeclarationNo = this.orderInfo.relDeclarationNo;
        this.$refs.relative.form.relRecordNo = this.orderInfo.relRecordNo;
        this.$refs.relative.form.warehouseNo = this.orderInfo.warehouseNo;
        this.$refs.relative.form.yardCode = this.orderInfo.yardCode;
        for(let i in this.orderInfo.commodityList){
          this.$refs.relative.dealTotalPrice += parseInt(this.orderInfo.commodityList[i].dealTotalPrice) ;
          this.$refs.relative.dealQuantity += parseInt(this.orderInfo.commodityList[i].dealQuantity);
          this.$refs.relative.legalQuantity1 += parseInt(this.orderInfo.commodityList[i].legalQuantity1);
          // this.$refs.relative.legalQuantity2 += parseInt(this.orderInfo.commodityList[i].legalQuantity2);
          }
          })
          .catch(function (error){
            console.log(error);
          });
      },

      //打印事件
      printForm(){
        console.log(this.$refs.commodityForm.commodityData);
        //序号数组
        var nums = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums[i] = this.$refs.commodityForm.commodityData[i].commodityNo;
          }
        //商品编号数组
         var nums1 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums1[i] = this.$refs.commodityForm.commodityData[i].commodityCustomsNo;
          }
          //商品名称数组
        var nums2 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums2[i] = this.$refs.commodityForm.commodityData[i].commodityName;
          }
        //商品数量数组
         var nums3 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums3[i] = this.$refs.commodityForm.commodityData[i].dealQuantity;
          }

        //商品单位数组
        var nums4 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums4[i] = this.$refs.commodityForm.commodityData[i].dealUnit;
          }
        //最终目的国数组
         var nums5 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums5[i] = this.$refs.commodityForm.commodityData[i].sourceCountry;
          }
          //单价数组
        var nums6 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums6[i] = this.$refs.commodityForm.commodityData[i].dealUnitPrice;
          }
        //总价数组
         var nums7 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums7[i] = this.$refs.commodityForm.commodityData[i].dealTotalPrice;
          }
           //币值数组
        var nums8 = ['','','','','','','',''];
          // for(let i in this.$refs.commodityForm.commodityData){
          //   nums8[i] = this.$refs.commodityForm.commodityData[i].currency;
          // }
           //币值代码数组
          var nums9 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums9[i] = this.$refs.commodityForm.commodityData[i].currency;
          }
          //console.log(nums9);
        //正税数组
         var nums10 = ['','','','','','','',''];
          for(let i in this.$refs.commodityForm.commodityData){
            nums10[i] = this.$refs.commodityForm.commodityData[i].levyMode;
          }
           //正税代码数组
         var nums11 = ['','','','','','','',''];
          // for(let i in this.$refs.commodityForm.commodityData){
          //   nums10[i] = this.$refs.commodityForm.commodityData[i].levyMode;
          // }
        XDoc.key = "ponczgnfifgr5efs7la6a3zgem";
        XDoc.run("./报关单模板.xlsx",
      "pdf",
      {
      "rsCompanyName":this.$refs.bsForm.form.rsCompanyName,
      "ioPort": this.$refs.bsForm.form.exportPort,//出口口岸
      "ioDate": this.orderInfo.exportDate,//出口日期
      "deliveryTime": this.orderInfo.declareDate,//申报日期
      "psCompanyName": this.$refs.bsForm.form.psCustomsCode,//生产销售单位海关代码
      "transportMode": this.$refs.bsForm.form.transportMode,//运输方式
      "conveyanceName": this.$refs.bsForm.form.conveyanceName,//运输工具名称
      "deliveryNo": this.$refs.bsForm.form.deliveryNo,//提运单号
      "decCompanyName": this.$refs.bsForm.form.decCustomsCode,//申报单位海关代码
      "supervisionMode": this.$refs.bsForm.form.supervisionMode,//监管方式
      "levyNature": this.$refs.bsForm.form.levyNature,//征免性质
      "recordNo": this.$refs.bsForm.form.recordNo,//备案号
      "tradeCountry": this.$refs.bsForm.form.tradeCountry,//贸易国
      "startOrArrivalCountry": this.$refs.bsForm.form.arrivalCountry,//运抵国
      "arrivalPort": this.$refs.bsForm.form.arrivalPort,//指运港
      "sourceOrDesination": this.$refs.bsForm.form.supplyArea,//境内货源地
      "licenseKey": this.$refs.bsForm.form.licenseKey,//许可证号
      "dealMode": this.$refs.bsForm.form.dealMode,//成交方式
      "freight": this.$refs.bsForm.form.freightRate+this.$refs.bsForm.form.freightMark,//运费
      "premium": this.$refs.bsForm.form.premiumRate+this.$refs.bsForm.form.premiumMark,//运费
      "incidental": this.$refs.bsForm.form.incidentalRate+this.$refs.bsForm.form.incidentalMark,//运费
      "contractNo": this.$refs.bsForm.form.contractNo,//合同协议号
      "commodityQuantity": this.$refs.bsForm.form.commodityQuantity,//件数
      "packageType": this.$refs.bsForm.form.packageType,//包装种类
      "grossWeight": this.$refs.bsForm.form.grossWeight,//毛重
      "netWeight": this.$refs.bsForm.form.netWeight,//毛重
      "containerNo": this.$refs.bsForm.form.containerQuantity,//集装箱数
      "attachDocName":this.$refs.bsForm.form.attachDocument,//随附单证
      "remark": this.$refs.bsForm.form.remark,//备注
      "attachCertificateNo": this.$refs.bsForm.form.attachDocument,//随附单证
      "num1": nums[0],
      "num2": nums[1],
      "num3": nums[2],
      "num4": nums[3],
      "num5": nums[4],
      "num6": nums[5],
      "num7": nums[6],
      "num8": nums[7],
      "commodityCustomsNo1":nums1[0],
      "commodityCustomsNo2":nums1[1],
      "commodityCustomsNo3":nums1[2],
      "commodityCustomsNo4":nums1[3],
      "commodityCustomsNo5":nums1[4],
      "commodityCustomsNo6":nums1[5],
      "commodityCustomsNo7":nums1[6],
      "commodityCustomsNo8":nums1[7],
      "commodityCustomsName1": nums2[0],
      "commodityCustomsName2": nums2[1],
      "commodityCustomsName3": nums2[2],
      "commodityCustomsName4": nums2[3],
      "commodityCustomsName5": nums2[4],
      "commodityCustomsName6": nums2[5],
      "commodityCustomsName7": nums2[6],
      "commodityCustomsName8": nums2[7],
      "legalQuantity1": nums3[0],
      "legalUnit1": nums4[0],
      "legalQuantity2":nums3[1],
      "legalUnit2": nums4[1],
      "legalQuantity3": nums3[2],
      "legalUnit3": nums4[2],
      "legalQuantity4": nums3[3],
      "legalUnit4": nums4[3],
      "legalQuantity5": nums3[4],
      "legalUnit5": nums4[4],
      "legalQuantity6": nums3[5],
      "legalUnit6": nums4[5],
      "legalQuantity7": nums3[6],
      "legalUnit7": nums4[6],
      "legalQuantity8": nums3[7],
      "legalUnit8": nums4[7],
      "domesticArea1": nums5[0],
      "domesticArea2": nums5[1],
      "domesticArea3": nums5[2],
      "domesticArea4": nums5[3],
      "domesticArea5": nums5[4],
      "domesticArea6": nums5[5],
      "domesticArea7": nums5[6],
      "domesticArea8": nums5[7],
      "dealUnitPrice1": nums6[0],
      "dealUnitPrice2": nums6[1],
      "dealUnitPrice3": nums6[2],
      "dealUnitPrice4": nums6[3],
      "dealUnitPrice5": nums6[4],
      "dealUnitPrice6": nums6[5],
      "dealUnitPrice7": nums6[6],
      "dealUnitPrice8": nums6[7],
      "dealTotalPrice1": nums7[0],
      "dealTotalPrice2": nums7[1],
      "dealTotalPrice3": nums7[2],
      "dealTotalPrice4": nums7[3],
      "dealTotalPrice5": nums7[4],
      "dealTotalPrice6": nums7[5],
      "dealTotalPrice7": nums7[6],
      "dealTotalPrice8": nums7[7],
      "currency1": nums9[0],
      "currencyNo1": nums8[0],
      "currency2": nums9[1],
      "currencyNo2": nums8[1],
      "currency3": nums9[2],
      "currencyNo3": nums8[2],
      "currency4": nums9[3],
      "currencyNo4":nums8[3],
      "currency5": nums9[4],
      "currencyNo5": nums8[4],
      "currency6": nums9[5],
      "currencyNo6": nums8[5],
      "currency7": nums9[6],
      "currencyNo7": nums8[6],
      "currency8": nums9[7],
      "currencyNo8": nums8[7],
      "levyMode1": nums10[0],
      "levyModeNo1": nums11[0],
      "levyMode2": nums10[1],
      "levyModeNo2": nums11[1],
      "levyMode3": nums10[2],
      "levyModeNo3": nums11[2],
      "levyMode4": nums10[3],
      "levyModeNo4": nums11[3],
      "levyMode5":nums10[4],
      "levyModeNo5": nums11[4],
      "levyMode6": nums10[5],
      "levyModeNo6": nums11[5],
      "levyMode7": nums10[6],
      "levyModeNo7": nums11[6],
      "levyMode8": nums10[7],
      "levyModeNo8": nums11[7],
      "preEntryNo": this.orderInfo.preEntryNo,//预录入编号
      "customsNo":this.orderInfo.customsNo,//海关编号
      "rsCustomsCode": this.$refs.bsForm.form.rsCustomsCode,//收发货人海关代码
      "rsCreditCode": this.$refs.bsForm.form.rsCreditCode,//收发货人企业信用代码
      "portNo": "这是一个portNo",
      "psCustomsCode": this.$refs.bsForm.form.psCustomsCode,//生产销售单位海关代码
      "psCreditCode": this.$refs.bsForm.form.psCreditCode,//生产销售单位信用代码
      "decCustomsCode": this.$refs.bsForm.form.decCustomsCode,//申报单位海关代码
      "decCreditCode":this.$refs.bsForm.form.decCreditCode,//申报单位信用代码
      "supervisionModeNo": "这是一个supervisionModeNo",
      "levyNatureNo": "这是一个levyNatureNo",
      "tradeCountryNo": "这是一个tradeCountryNo",
      "startOrArrivalCountryNo": "这是一个startOrArrivalCountryNo",
      "arrivalPortNo": "这是一个arrivalPortNo",
      "dealModeNo": "这是一个dealModeNo",
      "packageTypeNo": "这是一个packageTypeNo",
      "attachDocType": "这是一个attachDocType",
      "person": this.nickId
      },"_blank");
      },

    }
}
</script>

<style scoped>
  .export-left{
    width: 80%;
    float: left;
  }
  .export-right{
    width: 20%;
    float: right;
  }
</style>
