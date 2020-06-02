<template>
	<div style="height: 800px; overflow: auto">
		<el-form :model="form">
      <el-row>
        <el-col :span="6">
          <el-form-item label="申报地海关"  label-width="100px" class="formItem">
            <el-input v-model="form.declareCustoms" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="报关状态"  label-width="100px" class="formItem">
            <el-input v-model="form.billStatus" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关检关联度"  label-width="100px" class="formItem">
            <el-input v-model="form.inspectionAssociationNo" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="统一编号"  label-width="100px" class="formItem">
            <el-input v-model="form.unifiedNo" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预录入编号"  label-width="100px" class="formItem">
            <el-input v-model="form.preEntryNo" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="海关编号"  label-width="100px" class="formItem">
            <el-input v-model="form.customsNo" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出口口岸"  label-width="100px" class="formItem">
            <el-input v-model="form.exportPort" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备案号"  label-width="115px" class="formItem">
            <el-input v-model="form.recordNo" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同协议号"  label-width="115px" class="formItem">
            <el-input v-model="form.contractNo" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出口日期"  label-width="115px" class="formItem">
            <el-input v-model="form.exportDate" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申报日期"  label-width="115px" class="formItem">
            <el-input v-model="form.declareDate" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="收发货人"  label-width="115px" class="formItem">
            <el-input v-model="form.rsCustomsCode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.rsCreditCode" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.rsCompanyName" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="生产销售单位"  label-width="115px" class="formItem">
            <el-input v-model="form.psCustomsCode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.psCreditCode" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.psCompanyName" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="申报单位"  label-width="115px" class="formItem">
            <el-input v-model="form.decCustomsCode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.decCreditCode" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="formItem">
            <el-input v-model="form.decCompanyName" disabled auto-complete="off"  size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="运输方式"  label-width="115px" class="formItem">
            <el-input v-model="form.transportMode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运输工具名称"  label-width="115px" class="formItem">
            <el-input v-model="form.conveyanceName" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="航次号"  label-width="115px" class="formItem">
            <el-input v-model="form.voyageNo" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提运单号"  label-width="115px" class="formItem">
            <el-input v-model="form.deliveryNo" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="监督方式"  label-width="115px" class="formItem">
            <el-input v-model="form.supervisionMode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="征免性质"  label-width="115px" class="formItem">
            <el-input v-model="form.levyNature" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="征税比例"  label-width="115px" class="formItem">
            <el-input v-model="form.exemptionRatio" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="纳税单位"  label-width="115px" class="formItem">
            <el-input v-model="form.taxEnterprise" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="许可证"  label-width="115px" class="formItem">
            <el-input v-model="form.licenseKey" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="抵运国（地区）"  label-width="115px" class="formItem">
            <el-input v-model="form.arrivalCountry" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="指运港"  label-width="115px" class="formItem">
            <el-input v-model="form.arrivalPort" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="境内货源地"  label-width="115px" class="formItem">
            <el-input v-model="form.supplyArea" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交方式"  label-width="115px" class="formItem">
            <el-input v-model="form.dealMode" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="运费"  label-width="50px" class="formItem">
            <el-select v-model="form.freightMark" size="mini" style="width: 70px;" disabled>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="formItem">
            <el-input v-model="form.freightRate" disabled auto-complete="off" size="small">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="保费"  label-width="50px" class="formItem">
            <el-select v-model="form.premiumMark" size="mini" style="width: 70px;" disabled>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="formItem">
            <el-input v-model="form.premiumRate" disabled auto-complete="off" size="small">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-form-item label="杂费"  label-width="50px" class="formItem">
            <el-select v-model="form.incidentalMark" size="mini" style="width: 70px;" disabled>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item class="formItem">
            <el-input v-model="form.incidentalRate" disabled auto-complete="off" size="small">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="件数"  label-width="115px" class="formItem">
            <el-input v-model="form.commodityQuantity" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="包装种类"  label-width="115px" class="formItem">
            <el-input v-model="form.packageType" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="毛重（KG)"  label-width="115px" class="formItem">
            <el-input v-model="form.grossWeight" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="净重（KG）"  label-width="115px" class="formItem">
            <el-input v-model="form.netWeight" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="贸易国（地区）"  label-width="115px" class="formItem">
            <el-input v-model="form.tradeCountry" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="集装箱号"  label-width="115px" class="formItem">
            <el-input v-model="form.containerQuantity" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="small" style="margin-left: 20px;" @click="queryThings">其他事项确认</el-button>
        </el-col>
        <!--其他事项确认弹出框-->
        <el-dialog title="其他事项确认" :visible.sync="dialogqueryThingsVisible" width="700px">
          <el-form :model="form1">
            <el-form-item label="特殊关系确认"  label-width="300px">
              <el-input v-model="form1.relationshipCon" disabled auto-complete="off" size="small"/>
            </el-form-item>
            <el-form-item label="价格影响确认"  label-width="300px">
              <el-input v-model="form1.priceCon" disabled auto-complete="off" size="small"/>
            </el-form-item>
            <el-form-item label="与货物有关的特许权使用费支付确认"  label-width="300px">
              <el-input v-model="form1.franchiseFeeCon" disabled auto-complete="off" size="small"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogqueryThingsVisible = false" class="cancel" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogqueryThingsVisible = false" class="sure" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="随附单证"  label-width="115px" class="formItem">
            <el-input v-model="form1.attachDocument" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报关单类型"  label-width="115px" class="formItem">
            <el-input v-model="form1.declarationType" disabled auto-complete="off"   size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="small" style="margin-left: 20px;" @click="selectOperation">业务选择</el-button>
        </el-col>
        <!--业务选择弹出框-->
        <el-dialog title="业务选择" :visible.sync="dialogOperationVisible" width="700px">
          <div>
            <el-checkbox-group class="login-checkbox" v-model="form1.selectOperationtype">
              <el-checkbox label="税单无纸化" name="type" v-model="form1.isPaperless"></el-checkbox>
              <el-checkbox label="自主报税" name="type" v-model="form1.isIndependentTax"></el-checkbox>
              <el-checkbox label="水运中转" name="type" v-model="form1.isWaterTransfer"></el-checkbox>
              <el-checkbox label="自报自缴" name="type" v-model="form1.isAllSelf"></el-checkbox>
              <el-checkbox label="担保验放" name="type" v-model="form1.isGuarantee"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer" >
            <el-button @click="dialogOperationVisible = false" class="cancel" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogOperationVisible = false" class="sure" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注"  label-width="115px" class="formItem">
            <el-input v-model="form1.remark" disabled auto-complete="off" size="small"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button size="small" style="margin-left: 20px;" @click="remarkCon">...</el-button>
        </el-col>
        <el-col :span="2">
          <p class="font-size-12" style="padding-top: 10px;">（0字节）</p>
        </el-col>
        <!--...弹出框-->
        <el-dialog title="备注" :visible.sync="dialogremarkConVisible" width="700px">
          <div>
            <el-input type="textarea" :rows="7" placeholder="请输入内容"></el-input>
            <p class="font-size-14" style="float: right;">字数统计：<span style="color: red;">{{words}}</span>字节</p>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogremarkConVisible = false" class="cancel" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogremarkConVisible = false" class="sure" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
      <el-row>
        <el-button size="small" @click="viewComtype" style="margin-bottom: 10px;">归类查看</el-button>
        <!--归类查看弹出框-->
        <el-dialog title="商品规范申报-商品申报要素" :visible.sync="dialogviewComtypeVisible" width="700px">
          <div>
            <el-form :model="Comtypeform">
              <el-form-item label="商品信息"  label-width="100px">
                <el-input v-model="Comtypeform.commodityName" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="规格型号（根据海关规定，以下要素应全部填报）" label-width="350px"></el-form-item>
              <el-form-item label="品牌类型"  label-width="300px" required>
                <el-input v-model="Comtypeform.name1" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="出口享惠情况"  label-width="300px" required>
                <el-input v-model="Comtypeform.name2" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="材质（铝）"  label-width="300px" required>
                <el-input v-model="Comtypeform.name3" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="种类（门窗、门槛、塔楼、桥梁体段等）"  label-width="300px" required>
                <el-input v-model="Comtypeform.name4" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="加工方法（铆接、栓接、钻孔、弯曲等）"  label-width="300px" required>
                <el-input v-model="Comtypeform.name4" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="GTIN"  label-width="300px">
                <el-input v-model="Comtypeform.name5" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="CAS"  label-width="300px">
                <el-input v-model="Comtypeform.name6" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="其他"  label-width="300px">
                <el-input v-model="Comtypeform.name7" disabled auto-complete="off" size="small"/>
              </el-form-item>
              <el-form-item label="规格型号"  label-width="100px">
                <el-input v-model="Comtypeform.name1" disabled auto-complete="off" size="small"/>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogviewComtypeVisible = false" class="cancel" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogviewComtypeVisible = false" class="sure" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="documentData1" style="width: 100%" stripe disabled>
            <el-table-column prop="commodityNo" label="序号" width="60"/>
            <el-table-column prop="commodityCustomsNo" label="商品编号" />
            <el-table-column prop="recordSequenceNo" label="备案序号" />
            <el-table-column prop="commodityName" label="商品名称" />
            <el-table-column prop="commoditySpecification" label="规格" />
            <el-table-column prop="dealQuantity" label="成交数量" />
            <el-table-column prop="dealUnit" label="成交单位" />
            <el-table-column prop="dealUnitPrice" label="单价" />
            <el-table-column prop="dealTotalPrice" label="总价" />
            <el-table-column prop="currency" label="币值" />
            <el-table-column prop="sourceCountry" label="原产国（地区）" />

          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table :data="documentData2" style="width: 100%" stripe disabled>
            <el-table-column type="index" label="附件"/>
            <el-table-column prop="attachmentType" label="类别" />
            <el-table-column prop="label" label="标签" />
            <el-table-column prop="attachmentName" label="文件名" />
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button type="text" size="small" disabled @click="viewAttachment">预览</el-button>
                <el-button type="text" size="small" @click="uploadAttach(scope.$index, scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <!--预览弹出框-->
        <el-dialog title="预览" :visible.sync="dialogviewAttachmentVisible" width="700px">

        </el-dialog>
      </el-row>
    </el-form>
	</div>
</template>

<script type="text/ecmascript-6">
  	import axios from 'axios';
  	import moment from 'moment';
  	import './../../../../src/assets/css/base.css';
	import './../../../assets/css/webCompany/commodityManIfo.css';
	export default {
	//定义数据
   data () {
	    return {
	       	form:{},
	       	form1:{},
	       	Comtypeform:{},
	       	auditOption:true,
	       	documentData1:[],
	       	documentData2:[{
	       		name1:'1',
	       	}],
	       	textarea:'',
	       	isEdit:true,
	       	auditResult:'',
	       	selectOperationtype:[],
	       	options: [{
		        value: '选项1',
		        label: '1-率'
	        }, {
	           value: '选项2',
	           label: '2-率'
	        }, {
	           value: '选项3',
	           label: '3-率'
	        }],
	        value1: '选项1',
	        value2: '选项1',
	        value3: '选项1',
	        dialogqueryThingsVisible:false,
	        dialogOperationVisible:false,
	        dialogremarkConVisible:false,
	        dialogviewAttachmentVisible:false,
	        dialogviewComtypeVisible:false,
	        words:1,

	   }
  },
  prop:['viewInfo'],
  //定义组件
  components:{
  },

//定义初始化函数
  	mounted(){

    },
	methods:{
	  	showDocumentInfo(val){
	  		this.form=val;
	  		this.form1=val;
	  		this.form.billStatus='审核中';
	  		this.documentData1=val.commodityList;
	  		this.bussinessIdQuery(val.id)
	  	},
    findExportService(val){
      this.$axios6.get('exportBusiness/findDeclareBillById',{params:{
          exDeclareDetailId:val,
        }})
        .then((res) => {
          console.log('详情',res)
          this.showDocumentInfo(res.data.data)
        }).catch((e) => {
        console.log(e);
      })
    },
	  	queryThings(){
	  		this.dialogqueryThingsVisible = true;
	  	},
	  	selectOperation(){
	  		this.dialogOperationVisible = true;
	  	},
	  	remarkCon(){
	  		this.dialogremarkConVisible = true;
	  	},
	  	viewAttachment(){
	  		this.dialogviewAttachmentVisible = true;
	  	},
	  	//归类查看
	  	viewComtype(){
	  		this.dialogviewComtypeVisible = true;

	  	},
	  	//查询附件信息
	  	attachmentQuery(){
      		this.documentData2 = [];
      		let param = {
      			'businessId':this.businessId,
      		};
            this.$axios7.post('bsFile/getByBsId',param)
              .then((res) => {
              	console.log(1,res)
                for(let i = 0;i<res.data.length;i++){
                  this.documentData2.push({
                    attachmentType:res.data[i].attachmentType,
                    label:res.data[i].label,
                    attachmentName:res.data[i].attachmentName,
                    ownerName:res.data[i].ownerName,
                    uploadTime:res.data[i].uploadTime,
                    attachmentAddress:res.data[i].attachmentAddress,
                  })
                }
              }).catch((e) => {
                console.log(e);
            })
	      },
	      //根据服务单号查询业务单号
		  	bussinessIdQuery(val){
		  		let param = {
	      			'exDeclareServiceId':val,
	      		};
	            this.$axios6.get('exportBusiness/getBusinessId',{params:param})
	              .then((res) => {
	              	console.log(2,res)
	              	this.businessId = res.data.data.businessId;
	              	this.attachmentQuery();
	              }).catch((e) => {
	                console.log(e);
	            })

		  },
		  //下载附件信息
	       uploadAttach(index,row){
	       	let param = {
	       		'BucketName':"moretrade-business",
	       		'FileName':row.attachmentAddress,
	       	}
	       	this.$axios7.post('file/Download',param)
	         .then((response) =>{
	            window.open(response.data.url);
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
	       },
  	}

}
</script>
<style>
  .formItem{
    margin: 2px 0;
  }
</style>
