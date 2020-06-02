<template>
  <el-scrollbar style="height: 590px;">
    <!-- 出口业务-报关单-->
    <el-form :model="bsForm" label-width="150px" style="border: 1px solid #ebeef5" :disabled="isEdit">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申报地海关" class="cd-form-item" required>
            <el-select v-model="bsForm.declareCustoms" :filter-method="declareCustomFilter" filterable clearable style="width: 100%;">
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
          <el-form-item label="进境关别" class="cd-form-item" required>
            <el-select v-model="bsForm.enterBorder" :filter-method="exportBorderFilter" filterable clearable style="width: 100%;">
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
          <el-form-item label="入境口岸" class="cd-form-item">
            <el-select v-model="bsForm.importPort" :filter-method="supplyAreasFilter" filterable clearable style="width: 100%;">
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
        <el-form-item label="境内收发货人" class="cd-form-item">
          <el-col :span="6">
            <el-autocomplete
              placeholder="18位社会信用代码"
              v-model="bsForm.teRsCreditCode"
              :fetch-suggestions="revCreditCodeFuzzySearch"
              @select="selectEnterprise"
              style="width: 100%"
              clearable
            />
          </el-col>
          <el-col :span="6"><el-input placeholder="10位海关代码" v-model="bsForm.teRsCustomsCode" /></el-col>
          <el-col :span="6"><el-input placeholder="10位检验检疫编码" v-model="bsForm.teRsQuarantineCode" /></el-col>
          <el-col :span="6"><el-input placeholder="企业名称(中文)" v-model="bsForm.teRsComanyName" /></el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="境外收发货人" class="cd-form-item">
          <el-col :span="12">
            <el-autocomplete
              placeholder="境外收发货人代码"
              v-model="bsForm.ovRsCode"
              :fetch-suggestions="imOvSeasCodeFuzzySearch"
              @select="selectCustomer"
              style="width: 100%"
              clearable
            />
          </el-col>
          <el-col :span="12">
            <el-autocomplete
              placeholder="企业名称(英文)"
              v-model="bsForm.ovRsComanyName"
              :fetch-suggestions="imOvSeasNameFuzzySearch"
              @select="selectCustomer"
              style="width: 100%"
              clearable
            />
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="消费使用单位" class="cd-form-item">
          <el-col :span="6"><el-input placeholder='18位社会信用代码' v-model="bsForm.csCreditCode" /></el-col>
          <el-col :span="6"><el-input placeholder='10位海关代码' v-model="bsForm.csCustomsCode" /></el-col>
          <el-col :span="6"><el-input placeholder="10位检验检疫编码" v-model="bsForm.csQuarantineCode" /></el-col>
          <el-col :span="6"><el-input placeholder="企业名称(外文)" v-model="bsForm.csCompanyName" /></el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="贸易国别(地区)" class="cd-form-item">
            <el-select v-model="bsForm.tradeCountry" :filter-method="tradeCountrysFilter" filterable clearable style="width: 100%;">
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
          <el-form-item label="监管方式" class="cd-form-item">
            <el-select v-model="bsForm.supervisionMode" :filter-method="superviseModesFilter" filterable clearable style="width: 100%;">
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
          <el-form-item label="征免性质" class="cd-form-item">
            <el-select v-model="bsForm.levyNature" :filter-method="levyNaturesFilter" filterable clearable style="width: 100%;">
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
          <el-form-item label="特殊关系确认" class="cd-form-item">
            <el-select v-model="bsForm.relationshipCon" filterable :filter-method="yesOrNotFilter" clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
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
          <el-form-item label="价格影响确认" class="cd-form-item">
            <el-select v-model="bsForm.priceCon"  filterable :filter-method="yesOrNotFilter" clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
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
          <el-form-item label="特许费确认" class="cd-form-item">
            <el-select v-model="bsForm.franchiseFeeCon" filterable :filter-method="yesOrNotFilter" clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
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
          <el-form-item label="启运国(地区)" class="cd-form-item">
            <el-select v-model="bsForm.originCountry" :filter-method="originCountrysFilter" filterable clearable style="width: 100%">
              <el-option
                v-for="item in originCountrysAll"
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
          <el-form-item label="启运港" class="cd-form-item">
            <el-select v-model="bsForm.originPort" :filter-method="originPortsFilter" filterable clearable style="width: 100%">
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
          <el-form-item label="经停港" class="cd-form-item">
            <el-select v-model="bsForm.stopOverPort" :filter-method="stopOverPortsFilter" filterable clearable  style="width: 100%">
              <el-option
                v-for="item in stopOverPortsAll"
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
          <el-form-item label="货物存放地点" class="cd-form-item">
            <el-input v-model="bsForm.storagePlace" clearable >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领证机关" class="cd-form-item">
            <el-select v-model="bsForm.certificationAuthority" :filter-method="certificationAuthoritysFilter" filterable clearable  style="width: 100%">
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
        <el-col :span="8">
          <el-form-item label="标记唛码" class="cd-form-item">
            <el-input v-model="bsForm.marks" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="目的地检验检疫机关" class="cd-form-item">
            <el-select v-model="bsForm.destiInspectOrgan" :filter-method="destiInspectOrgansFilter" filterable clearable  style="width: 100%">
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
          <el-form-item label="检验检疫受理机关" class="cd-form-item">
            <el-select v-model="bsForm.inspectAcceptOrgan" :filter-method="inspectAcceptOrgansFilter" filterable clearable  style="width: 100%">
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
          <el-form-item label="口岸检验检疫机关" class="cd-form-item">
            <el-select v-model="bsForm.portInspectOrgan" :filter-method="portInspectOrgansFilter" filterable clearable  style="width: 100%">
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
    </el-form>
    <!--商品信息表格-->
    <el-table :data="commodityList" border stripe style="margin-top: 5px" >
      <el-table-column label="序号"  type="index" width="100" align="center"/>
      <el-table-column label="商品编码" prop="customCommodityNo" align="center"/>
      <el-table-column label="商品名称" prop="customCommodityName" align="center"/>
      <el-table-column label="规格、型号" prop="commodityType" align="center"/>
      <el-table-column label="法定单位" prop="legalUnit1" align="center" :formatter="legalUnit1Formatter"/>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="commodityEdit(scope.$index, scope.row)" :disabled="isEdit">编辑</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="commodityDelete(scope.$index, scope.row)" :disabled="isEdit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button size="small" type="info" style="margin: 5px 0" @click="createCommodity" :disabled="isEdit">新增商品</el-button>
    <Add ref="createCommodity" @createCommodity="getCommodity"/>

    <!--随附单证表格-->
    <el-table :data="certificateList" border stripe style="margin-top: 5px">
      <el-table-column label="随附单证（序号）"  type="index" width="150" align="center"/>
      <el-table-column label="单证代码" prop="certificateCode" align="center"/>
      <el-table-column label="单证编号" prop="certificateNo" align="center"/>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="certificateEdit(scope.$index, scope.row)" :disabled="isEdit">编辑</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="certificateDelete(scope.$index, scope.row)" :disabled="isEdit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-button size="small" type="info" style="margin: 5px 0"  @click="newCertificate" :disabled="isEdit">新增随附单证</el-button>
    </el-row>
    <el-dialog
      title="新增随附单证信息"
      :visible.sync="addCertificate"
      center
      width="40%"
    >
      <el-form :model="certificateAddForm" ref="certificateAddForm" :rules="certificateAddRules">
        <el-form-item label="单证代码:" label-width="100px" prop="certificateCode">
          <el-select v-model="certificateAddForm.certificateCode" :filter-method="certificateCodesFilter" filterable clearable style="width: 300px" >
            <el-option
              v-for="item in certificateCodesAll"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单证编号:" label-width="100px" prop="certificateNo">
          <el-input v-model="certificateAddForm.certificateNo" clearable style="width: 300px" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCertificate = false">取 消</el-button>
        <el-button type="primary" @click="editCertificate('certificateAddForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--上传文件-->
    <el-row style="margin-top: 5px">
      <el-col :span="2" style="line-height: 40px">上传文件:</el-col>
      <el-col :span="3">
        <el-select v-model="uploadValue" clearable placeholder="请选择" :disabled="isEdit">
          <el-option
            v-for="item in uploadOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="18" :offset="1"  style="line-height: 40px">
        <el-upload
          class="upload-demo"
          ref="upload"
          :accept = 'acceptFileType'
          :action="postURL"
          :file-list="fileList"
          :auto-upload="false"
          :data="postData"
          :on-change="fileChange"
          :on-remove="fileUploadRemove"
          :show-file-list='false'
          :on-success="uploadSuccess"
          :on-error="uploadError"
          style="width:100px;float:left"
          :disabled="uploadValue === '' || isEdit"
        >
          <el-button slot="trigger" type="primary" :disabled="uploadValue === '' || isEdit">点击上传</el-button>
        </el-upload>
        <div  style="font-size: 10px;color:red;line-height: 20px;float: left;margin-left: 5px">
          注意：单个文件不能超过5MB，允许文件类型：图片、Word文档、Excel文档、PDF、压缩文件<br>
          提示：若有品牌授权书和报关委托书请确认上传，其他报关相关文件上传至其他
        </div>
      </el-col>
    </el-row>
    <!--上传文件表格-->
    <el-table :data="uploadTable" border stripe style="margin-top: 5px">
      <el-table-column label="序号"  type="index" width="100" align="center"/>
      <el-table-column label="文件类型" prop="attachmentType" align="center"/>
      <el-table-column label="文件名" prop="attachmentName" align="center"/>
      <el-table-column label="上传者" prop="ownerName" align="center"/>
      <el-table-column label="上传时间" prop="uploadTime" align="center" :formatter="dateFormat" />
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)" disabled>预览</el-button>-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)" :disabled="isEdit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--备注-->
    <el-row style="margin: 5px 0">备注:</el-row>
    <el-input
      type='textarea'
      :autosize='{ minRows: 2, maxRows: 4}'
      placeholder="请输入内容"
      v-model="bsForm.remark"
      style="margin-bottom: 15px"
      :disabled="isEdit">
    </el-input>
  </el-scrollbar>
</template>

<script type="text/ecmascript-6">
  import ElFooter from "element-ui/packages/footer/src/main";
  import Add from './../../../webCompany/commodityImport/commodityAdd';//新增弹出框
  import moment from 'moment';
  export default {
    components: {ElFooter,Add},
    data() {
      return {
        deleteAttachmentList:[],
        bsForm:{
          declareCustoms:'',
          enterBorder:'',
          relationshipCon: '9',//特殊关系确认
          priceCon: '9',//价格影响确认
          franchiseFeeCon: '9',//特许费确认
          ovRsComanyName:'',
          tradeCountry:'',
          teRsCustomsCode:'',
          teRsQuarantineCode:'',
          teRsComanyName:'',
          supervisionMode:'',
          levyNature:'',
          inspectAcceptOrgan:'',
          certificationAuthority:'',
          portInspectOrgan:'',
          destiInspectOrgan:'',
          csCreditCode:'',
          csCustomsCode:'',
          csQuarantineCode:'',
          csCompanyName:'',
          originCountry:'',
          originPort:'',
          importPort:'',
          stopOverPort:'',
        },
        isEdit:false,
        declareCustoms: [],
        declareCustomsAll:[],
        supplyAreas: [],
        supplyAreasAll:[],
        superviseModes: [],
        superviseModesAll: [],
        originCountrysAll:[],
        levyNatures: [],
        levyNaturesAll: [],
        tradeCountrys: [],
        tradeCountrysAll: [],
        exportBordersAll:[],
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
        shorthandNos:[],//境外客户信息
        yesOrNot: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        },{
          value: '9',
          label: '空'
        }],
        yesOrNotAll:[],
        //报关服务表单信息
        commodityList: [],//商品信息
        addCommodity: false,
        commodityAddForm: {
          customCommodityNo: '',
          customCommodityName: '',
          commodityType: '',
          legalUnit1: '',
          specificationParam:'',
          speForm:{
            eleTable:[],
            CAS:'',
            GTIN:'',
            brandType:'',
            preferential:'',
            others:''
          }
        },
        certificateList: [],//随附单证
        addCertificate: false,
        certificateAddForm: {
          certificateCode: '',
          certificateNo: ''
        },
        uploadValue: "",
        uploadOptions: [
          {value: '报关草单', label: '报关草单'},
          {value: '合同', label: '合同'},
          {value: '发票', label: '发票'},
          {value: '装箱单', label: '装箱单'},
          {value: 'S/O单', label: 'S/O单'},
          {value: '其他', label: '其他'},
        ],
        uploadTable: [],
        isEditOrAdd: '',
        editIndex: 0,
        editRow: [],
        acceptFileType: '.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
        postURL: '',//上传服务器请求地址
        fileList: [],//待上传文件列表，element自动生成
        fileListData: [],//待上传文件列表数据
        uploadFilePrams: [],//上传文件回调参数的callbackbody
        uploadData: {},//存储请求回来的上传签名等数据
        postHeaders: {},
        postData: {},
        postExpire: '',//上传的秘钥过期时间点，使用UNIX时间
        postCallback: {},//上传的回调字段设置，即上传成功后需要传给服务器的字段
                         //详见接口文档 回调插入业务附件表数据
        postState: 1,//标志获取上传文件签名接口是否成功调用；
        businessId: '',
        addRules: {//商品添加校验
          customCommodityNo: [{required:true,message:'请输入商品编码',trigger:'blur'}],
          customCommodityName: [{required:true,message:'请输入商品名称',trigger:'blur'}],
          commodityType: [{required:true,message:'请输入商品规格型号',trigger:'change'}],
          legalUnit1: [{required:true,message:'请输入法定单位',trigger:'blur'}],
        },
        certificateAddRules: {//随附单证添加校验
          certificateCode: [{required:true,message:'请输入单证代码',trigger:'blur'}],
          certificateNo: [{required:true,message:'请输入单证编号',trigger:'blur'}],
        },
      }
    },
    computed:{
      /*获取当前企业用户的id和名称，用来上传文件时参数*/
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      }
    },
    mounted:function(){
      this.$nextTick(function () {
        this.getUpload();
      });
      let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
      this.$store.commit("updateCompanyId",dataCompanyId);
      let dataCompanyName=JSON.parse(localStorage.getItem('Name2'));
      this.$store.commit("updateCompanyName",dataCompanyName);
      // this.loadStaticData();//请求本地数据
      this.yesOrNotAll = this.yesOrNot;
    },
    methods:{
      //境内收发货人信用代码模糊查询
      revCreditCodeFuzzySearch(query,cb){
        this.$axios3.post('revCreditCodeFuzzySearch',{
          enterpriseCreditCode:this.bsForm.teRsCreditCode
        }).then((res) => {
          console.log(res.data.data)
          cb(res.data.data)
          let resData = res.data.data;
          for(let i in resData){
            resData[i].value = resData[i].enterpriseCreditCode
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //选择境内收发货人
      selectEnterprise(item){
        this.$axios3.post('/getRevEnterprise',{
          receiveEnterpriseId:item.receiveEnterpriseId
        }).then((res) => {
          if(res.data.code === 200){
            let resData = res.data.data;
            this.bsForm.teRsCustomsCode = resData.enterpriseCustomsCode;
            this.bsForm.teRsQuarantineCode = resData.enterpriseQuarantineCode;
            this.bsForm.teRsComanyName = resData.enterpriseName;
            this.bsForm.supervisionMode = resData.supervisionMode;
            this.bsForm.levyNature = resData.exemptionNature;
            this.bsForm.inspectAcceptOrgan = resData.inspectionAndQuarantineOrgan;
            this.bsForm.certificationAuthority = resData.certificationAuthority;
            this.bsForm.portInspectOrgan = resData.portInspectionAndQuarantineOrgan;
            this.bsForm.destiInspectOrgan = resData.desInspectionAndQuarantineOrgan;
            if(resData.enterpriseNature === 1 || resData.enterpriseNature === 2){
              this.bsForm.csCreditCode = resData.enterpriseCreditCode;
              this.bsForm.csCustomsCode = resData.enterpriseCustomsCode
              this.bsForm.csQuarantineCode = resData.enterpriseQuarantineCode
              this.bsForm.csCompanyName = resData.enterpriseName
            }
            this.getInitData()
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //查询境外收发货人
      imOvSeasCodeFuzzySearch(query,cb){
        this.$axios3.post('imOvSeasCodeFuzzySearch',{
          ovRsCode:this.bsForm.ovRsCode
        }).then((res) => {
          console.log(res.data.data)
          cb(res.data.data)
          let resData = res.data.data;
          for(let i in resData){
            resData[i].value = resData[i].ovRsCode
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //根据选择的境外客户查询详细信息
      selectCustomer(item){
        this.$axios3.post('/getOverseasRsCompany',{
          customerId:item.customerId
        }).then((res) => {
          if(res.data.code === 200){
            let resData = res.data.data;
            this.bsForm.ovRsCode = resData.ovRsCode;
            this.bsForm.ovRsComanyName = resData.customerName;
            this.bsForm.tradeCountry = resData.tradeCountry;
            this.bsForm.relationshipCon = resData.relationshipCon;
            this.bsForm.priceCon = resData.priceCon;
            this.bsForm.franchiseFeeCon = resData.franchiseFeeCon;
            this.bsForm.originCountry = resData.arrivalCountry;
            this.bsForm.originPort = resData.originPort;
            this.bsForm.importPort = resData.entrytPort;
            this.bsForm.stopOverPort = resData.stopOverPort;
            this.getInitData()
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //境外收发货人名称查询
      imOvSeasNameFuzzySearch(query,cb){
        this.$axios3.post('imOvSeasNameFuzzySearch',{
          customerName:this.bsForm.ovRsComanyName
        }).then((res) => {
          console.log(res.data.data)
          let resData = res.data.data;
          for(let i in resData){
            resData[i].value = resData[i].customerName
          }
          cb(res.data.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      //添加商品
      createCommodity(){
        this.$refs.createCommodity.dialogFormVisible = true;
        this.$refs.createCommodity.isAdd = false;
        this.$refs.createCommodity.initForm();
        this.$refs.createCommodity.initStaticData();
      },
      //填入商品表格
      getCommodity(data){
        this.commodityList.push(JSON.parse(JSON.stringify(data)));
        this.bsForm.commodityList = this.commodityList;
      },
      //时间格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      //获取初始数据
      getInitData(){
        this.exportBorderFilter(this.bsForm.enterBorder);
        this.declareCustomFilter(this.bsForm.declareCustoms);
        this.supplyAreasFilter(this.bsForm.importPort);
        this.tradeCountrysFilter(this.bsForm.tradeCountry);
        this.originCountrysFilter(this.bsForm.originCountry);
        this.superviseModesFilter(this.bsForm.supervisionMode);
        this.levyNaturesFilter(this.bsForm.levyNature);
        this.originPortsFilter(this.bsForm.originPort);
        this.stopOverPortsFilter(this.bsForm.stopOverPort);
        this.certificationAuthoritysFilter(this.bsForm.certificationAuthority);
        this.destiInspectOrgansFilter(this.bsForm.destiInspectOrgan);
        this.inspectAcceptOrgansFilter(this.bsForm.inspectAcceptOrgan);
        this.portInspectOrgansFilter(this.bsForm.portInspectOrgan);
      },
      //申报地海关
      declareCustomFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.declareCustomsAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.declareCustomsAll = this.declareCustoms.slice(0,19);
        }
      },
      //进境关别
      exportBorderFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.exportBordersAll = this.declareCustoms.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.exportBordersAll = this.declareCustoms.slice(0,19);
        }
      },
      //入境口岸
      supplyAreasFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.supplyAreasAll = this.supplyAreas.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.supplyAreasAll = this.supplyAreas.slice(0,19);
        }
      },
      //贸易国
      tradeCountrysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.tradeCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      originCountrysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.originCountrysAll = this.tradeCountrys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.originCountrysAll = this.tradeCountrys.slice(0,19);
        }
      },
      //监管方式
      superviseModesFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.superviseModesAll = this.superviseModes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.superviseModesAll = this.superviseModes.slice(0,19);
        }
      },
      //征免性质
      levyNaturesFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.levyNaturesAll = this.levyNatures.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.levyNaturesAll = this.levyNatures.slice(0,19);
        }
      },
      //启运港
      originPortsFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.originPortsAll = this.originPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.originPortsAll = this.originPorts.slice(0,19);
        }
      },
      //经停港
      stopOverPortsFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.stopOverPortsAll = this.originPorts.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.stopOverPortsAll = this.originPorts.slice(0,19);
        }
      },
      //领证机关
      certificationAuthoritysFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.certificationAuthoritysAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificationAuthoritysAll = this.organizations.slice(0,19);
        }
      },
      //目的地检验检疫机关
      destiInspectOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.destiInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.destiInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //检验检疫受理机关
      inspectAcceptOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.inspectAcceptOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.inspectAcceptOrgansAll = this.organizations.slice(0,19);
        }
      },
      //口岸检验检疫机关
      portInspectOrgansFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.portInspectOrgansAll = this.organizations.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.portInspectOrgansAll = this.organizations.slice(0,19);
        }
      },
      //法定单位
      legalUnitsFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.legalUnitsAll = this.legalUnits.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.legalUnitsAll = this.legalUnits.slice(0,19);
        }
      },
      yesOrNotFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.yesOrNotAll = this.yesOrNot.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.yesOrNotAll = this.yesOrNot
        }
      },
      //单证代码
      certificateCodesFilter(query){
        if(query !== '' && query !== undefined && query !== null){
          this.certificateCodesAll = this.certificateCodes.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.certificateCodesAll = this.certificateCodes.slice(0,19);
        }
      },
      //添加商品信息
      newCommodity(){
        this.addCommodity = true;
        this.commodityAddForm = {};
        this.$refs.specfication.form = {}
        this.$refs.specfication.eleTable = []
        this.isEditOrAdd = 'add';
      },
      //清空商品表格数据
      clearAllCommodity(){
        this.commodityList = [];
      },
      //删除随附单证信息
      commodityDelete(index,row){
        this.commodityList.splice(index,1);
      },
      //新增随附单证
      newCertificate(){
        this.addCertificate = true;
        this.certificateAddForm = {};
        this.isEditOrAdd = 'add';
      },
      //编辑随附单证
      certificateEdit(index,row){
        this.addCertificate = true;
        this.isEditOrAdd = 'edit';
        this.editIndex = index;
        this.certificateAddForm = row;
      },
      editCertificate(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.isEditOrAdd === 'add'){
              this.certificateList.push({
                certificateCode:this.certificateAddForm.certificateCode.substr(0,1),
                certificateNo:this.certificateAddForm.certificateNo,
              })
            }else {
              this.certificateList.splice(this.editIndex,1,{
                certificateCode:this.certificateAddForm.certificateCode.substr(0,1),
                certificateNo:this.certificateAddForm.certificateNo
              })
            }
            this.addCertificate = false;
            this.certificateCodesAll = this.certificateCodes.slice(0,19);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除随附单证信息
      certificateDelete(index,row){
        this.certificateList.splice(index,1);
      },
      //清空随附单证表格数据
      clearAllCertificate(){
        this.certificateList = [];
      },
      /*获取上传文件的临时秘钥及相关签名字段*/
      getUpload(){
        this.$axios7.get('file/Upload?Bucket=business')
          .then((res) => {
            // console.log('密钥',res.data)
            this.postURL = res.data.host;//对应bucket的公网访问地址
            this.postExpire = res.data.expire;
            this.uploadData=res.data;//将返回的签名等存储起来
            this.postState=1;//标志获取上传文件签名等数据成功
          }).catch((e) => {
            console.log(e);
            this.postState=0;//标志获取上传文件签名等数据失败；
            this.$message({
              showClose:true,
              message:'获取上传文件权限出错，请稍后刷新页面再试！',
              type:'error',
          });
        });
      },
      /*文件状态改变时调用的函数，添加文件、上传成功和上传失败时都会被调用*/
      /*此处主要为添加文件后更新相应信息*/
      fileChange(file,fileList){
        this.fileList = fileList;
        if (this.uploadTable.length === 0){
          let date = new Date()
          file.uploadTime=date.getTime();
          file.attachmentType=this.uploadValue;
          file.attachmentName=file.name;
          file.ownerName=this.nickCompanyName;
          this.uploadTable.push(file);
        }else {
          for (let i=0;i<this.uploadTable.length;i++){
            if (file.uid === this.uploadTable[i].uid ){
              break;
            } else if (i === (this.uploadTable.length-1)) {
              var date = new Date()
              file.uploadTime=date.getTime();
              file.attachmentType=this.uploadValue;
              file.attachmentName=file.name;
              file.ownerName=this.nickCompanyName;
              this.uploadTable.push(file);
              break;
            }
          }
        }
      },
      /*文件状态改变时没有包含文件被移除，因此增加文件移除时更新fileList*/
      fileUploadRemove(file,fileList){
        console.log('file remove',file,fileList)
        fileList.splice(fileList.indexOf(file),1);
        this.fileList = fileList;
        console.log('uploadfile array',this.fileList)
      },
      /*点击文件列表删除事件*/
      handleDelete(index,row){
        this.uploadTable.splice(index,1);
        this.fileUploadRemove(row,this.fileList)
        this.deleteAttachmentList.push(row.attachmentName)
      },
      //删除附件
      deleteAttachment(attachmentName){
        this.$axios11.post('import/file/delete',{
          businessId:this.businessId,
          attachmentName:attachmentName,
          isDeleted:true
        }).then((res) => {
          console.log('file delete success',res.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      /*点击文件预览时的事件*/
      handleEdit(){
        this.$message({
          showClose:true,
          message:'文件预览功能尚在开发中',
          type:'error',
        });
      },
      /*设置回调时给服务器的参数*/
      setCallbackData(){
        /*取出文件列表的名称*/
        this.uploadFilePrams=[];//先清空原有的
        for (let i=0;i<this.uploadTable.length;i++){
          this.uploadFilePrams.push({
            "businessId": this.businessId,
            "ownerId": this.nickCompanyId,
            "ownerName": this.nickCompanyName,
            "ownerType": 2,
            "label": "业务单",//先写死，后面改成根据attchmentType自动匹配？
            "attachmentType":this.uploadTable[i].attachmentType,
            "attachmentName": this.uploadTable[i].attachmentName,//当前文件的名称
            //"fileType": this.fileList[i].raw.type,//当前文件类型
            "attachmentAddress": this.businessId+"/"+this.uploadTable[i].attachmentName,//文件路径，先写死。//"fileSize":
          });
        };
        this.postCallback={
          "callbackUrl":this.callbackUrl11+"/import/file/callback",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify(this.uploadFilePrams),
        };
        return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
      },
      /*上传文件函数*/
      upload(){
        /*获取当前时间判断签名是否过期，过期则重新获取，3s缓冲*/
        let now = Date.parse(new Date())/1000;
        if (parseInt(this.postExpire) <(now+3) || this.postState !== 1 ){//即将过期或初始化时获取失败
          this.getUpload();
          setTimeout(function () {
            this.setUpload();
          }.bind(this),600);
        }else {
          this.setUpload();//不需要重新获取则直接配置参数并上传
        }
      },
      /*上传文件的配置参数及上传动作*/
      setUpload(){
        if (this.postState === 1){//获取密钥成功
          this.postData = {
            'policy':this.uploadData.policy,
            'OSSAccessKeyId':this.uploadData.accessid,
            'success_action_status':'200',
            'x-oss-security-token' : this.uploadData["security-token"],
            'signature': this.uploadData.signature,
            'key':this.businessId+'/${filename}',//上传文件的object名称。
          };
          let callback = this.setCallbackData();
          this.postData["callback"]=callback;
          this.$nextTick(()=>{//防止第一次请求带不上表单其他参数
            this.$refs.upload.submit();
          });
        } else{//获取密钥失败
          this.$message({
            showClose:true,
            message:'暂存业务单成功，但文件上传失败！',
            type:'error',
          });
        }
      },
      uploadSuccess(res,file){
        console.log(res)
        this.$message.success(file.name+'文件上传成功!')
      },
      uploadError(res,file){
        console.log(res)
        this.$message.error(file.name+'文件上传失败!')
      },
      /*父组件中businessId变化后更新*/
      setBusinessId(id){
        this.businessId=id;
      },
      legalUnit1Formatter(row,col){
        let val = row[col.property];
        if (val === undefined) {
          return "";
        }
        let name = this.legalUnits.find((item) => {
          return item.value === val;
        });
        if(name !== null && name !== undefined){
          return name.label
        }else{
          return ''
        }
      }
    }
  }
</script>

<style scoped>
  .cd-form-item {
    margin: 1px 0 0 0;
    border: 1px solid #dcdfe6;
    border-right:none;
    border-radius: 4px;
  }
</style>
