<template>
  <div style="width: 98%;margin: 0 auto">
    <el-form :model="declarationform" :disabled="isEdit">
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="申报地海关"  label-width="125px"  required class="cd-form-item">
            <el-select v-model="declarationform.declareCustoms" filterable style="width:100%" clearable @change="declareCustomsChange">
              <el-option
                v-for="item in declareCustoms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进境关别"  label-width="125px" required class="cd-form-item">
            <el-select v-model="declarationform.enterBorder" filterable  clearable  @change="exportPortChange" style="width: 100%">
              <el-option
                v-for="item in exportPorts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入境口岸"   label-width="125px" required class="cd-form-item">
            <!--<el-input v-model="declarationform.supplyArea" auto-complete="off" class="inputLableFull"/>-->
            <el-select v-model="declarationform.importPort"  filterable clearable @change="supplyAreaChange" style="width: 100%;">
              <el-option
                v-for="item in supplyAreas"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="8">
          <el-form-item label="贸易国别(地区)" label-width="125px" required class="cd-form-item">
            <el-select v-model="declarationform.tradeCountry" style="width: 100%;" filterable clearable @change="tradeCountryChange">
              <el-option
                v-for="item in tradeCountrys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="监管方式"  label-width="125px"  class="cd-form-item">
            <el-select v-model="declarationform.supervisionMode" filterable  style="width: 100%;" clearable  @change="superviseModeChange">
              <el-option
                v-for="item in superviseModes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="境外客户速记代码" label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.shorthandNo" :disabled="isEdit === true" filterable clearable @focus="loadshorthandNos" @change="shorthandNoChange" style="width: 100%;">
              <el-option
                v-for="item in shorthandNos"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row id="formRow">
        <el-form-item label="境内收发货人"  label-width="125px" class="cd-form-item">
          <el-col :span="6"><el-input v-model="declarationform.teRsCustomsCode" name="rsCustomsCode" placeholder="收发货单位海关代码" clearable class="inputLable" @change="rsCustomsCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.teRsCreditCode" name="rsCreditCode" placeholder="收发货单位信用代码" clearable class="inputLable" @change="rsCreditCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.teRsQuarantineCode" name="rsCreditCode" placeholder="检验检疫编码" clearable class="inputLable" @change="rsCreditCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.teRsComanyName" name="rsCompanyName" placeholder="收发货单位名称" clearable class="inputLable" @change="rsCompanyNameAuto"/></el-col>
        </el-form-item>
      </el-row>
      <el-row id="formRow">
        <el-form-item label="境外收发货人"  label-width="125px" class="cd-form-item">
          <el-col :span="8"><el-input v-model="declarationform.ovRsCustomsCode" name="rsCustomsCode" placeholder="收发货单位海关代码" clearable class="inputLable" @change="rsCustomsCodeAuto"/></el-col>
          <el-col :span="8"><el-input v-model="declarationform.ovRsCreditCode" name="rsCreditCode" placeholder="收发货单位信用代码" clearable class="inputLable" @change="rsCreditCodeAuto"/></el-col>
          <el-col :span="8"><el-input v-model="declarationform.ovRsComanyName" name="rsCompanyName" placeholder="收发货单位名称" clearable class="inputLable" @change="rsCompanyNameAuto"/></el-col>
        </el-form-item>
      </el-row>
      <el-row id="formRow">
        <el-form-item label="消费使用单位"  label-width="125px" class="cd-form-item">
          <el-col :span="6"><el-input v-model="declarationform.csCustomsCode" placeholder="生产销售单位海关代码" clearable class="inputLable" @change="psCustomsCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.csCreditCode" placeholder="生产销售单位信用代码" clearable class="inputLable" @change="psCreditCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.csQuarantineCode" placeholder="生产销售单位检验检疫编码" clearable class="inputLable" @change="psCreditCodeAuto"/></el-col>
          <el-col :span="6"><el-input v-model="declarationform.csCompanyName" placeholder="生产销售单位名称" clearable class="inputLable" @change="psCompanyNameAuto"/></el-col>
        </el-form-item>
      </el-row>
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="特殊关系确认" label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.relationshipCon"  filterable clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="价格影响确认" label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.priceCon" filterable clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特许费确认" label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.franchiseFeeCon" filterable clearable style="width: 100%">
              <el-option
                v-for="item in yesOrNot"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="征免性质"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.levyNature"  filterable  style="width:100%" clearable @change="levyNatureChange">
              <el-option
                v-for="item in levyNatures"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="启运国(地区)"  label-width="125px"  class="cd-form-item">
            <el-select v-model="declarationform.originCountry" style="width:100%"  filterable clearable @focus="loadArrivalCountry" @change="arrivalCountryChange">
              <el-option
                v-for="item in arrivalCountrys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经停港"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.stopOverPort" style="width:100%" filterable clearable @focus="loadArrivalPorts" @change="arrivalPortsPortChange">
              <el-option
                v-for="item in arrivalPorts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="货物存放地点"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.storagePlace"  filterable  style="width:100%" clearable @focus="loadlevyNature" @change="levyNatureChange">
              <el-option
                v-for="item in levyNatures"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="启运港"  label-width="125px"  class="cd-form-item">
            <el-select v-model="declarationform.originPort" style="width:100%"  filterable clearable @focus="loadArrivalCountry" @change="arrivalCountryChange">
              <el-option
                v-for="item in arrivalCountrys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领证机关"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.certificationAuthority" style="width:100%" filterable clearable @focus="loadArrivalPorts" @change="arrivalPortsPortChange">
              <el-option
                v-for="item in arrivalPorts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="标记唛码"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.marks"  filterable  style="width:100%" clearable @focus="loadlevyNature" @change="levyNatureChange">
              <el-option
                v-for="item in levyNatures"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检验检疫受理机关"  label-width="125px"  class="cd-form-item">
            <el-select v-model="declarationform.inspectAcceptOrgan" style="width:100%"  filterable clearable @focus="loadArrivalCountry" @change="arrivalCountryChange">
              <el-option
                v-for="item in arrivalCountrys"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口岸检验检疫机关"  label-width="125px" class="cd-form-item">
            <el-select v-model="declarationform.portInspectOrgan" style="width:100%" filterable clearable  @change="arrivalPortsPortChange">
              <el-option
                v-for="item in arrivalPorts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row id="formRow">
        <el-col :span="8">
          <el-form-item label="目的地检疫检疫机关"  label-width="150px" class="cd-form-item">
            <el-select v-model="declarationform.destiInspectOrgan"  filterable  style="width:100%" clearable @change="levyNatureChange">
              <el-option
                v-for="item in levyNatures"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="检验检疫货物规格"  label-width="125px"  class="cd-form-item">
            <el-input v-model="declarationform.inspectGoodsSpection" @focus="editInspectGoodsSpection" ></el-input>
          </el-form-item>
        </el-col>
        <editQuarantineCommodity ref="editQuarantineCommodity" @listenEditQuaranCom="getInspectGoodsSpection"/>
      </el-row>
      <!--  //商品信息 -->
      <el-form-item class="products" prop="tableData1" >
        <el-table
          :data="declarationform.commodityList"
          size="small"
          border>
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column prop="customCommodityNo" label="商品编码" align="center"></el-table-column>
          <el-table-column prop="customCommodityName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="commodityType" label="规格、型号" align="center"></el-table-column>
          <el-table-column prop="legalUnit1" label="法定单位" align="center"></el-table-column>
          <el-table-column label="操作" align="center"><template slot-scope="scope">
              <el-button
                size="mini" @click="productDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="float:right;margin-right:20px" @click="newProduct" size="small">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="declarationform.certificateList"
          size="small"
          border>
          <el-table-column type="index" label="随附单证(序号)" align="center" width="150px"></el-table-column>
          <el-table-column prop="certificateCode" label="单证代码" align="center"></el-table-column>
          <el-table-column prop="certificateNo" label="单证编号" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini" @click="documentDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="float:right;margin-right:20px" @click="documentDialogVisible=true" size="small">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-table
          :data="attachmentList"
          size="small"
          border>
          <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
          <el-table-column prop="attachmentName" label="文件名" align="center"></el-table-column>
          <el-table-column prop="attachmentType" label="文件类型" align="center"></el-table-column>
          <el-table-column prop="ownerName" label="上传者" align="center"></el-table-column>
          <el-table-column prop="uploadTime" label="上传时间" align="center" :formatter="dateFormat"></el-table-column>
          <el-table-column label="操作" width="250px" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini" disabled>预览</el-button>
              <el-button
                size="mini" @click="uploadAttach(scope.$index, scope.row)">下载</el-button>
              <el-button
                size="mini" @click="deleteAttach(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--上传文件-->
        <el-row style="margin-top: 5px">
          <el-col :span="2" style="line-height: 40px;text-align: center">上传文件:</el-col>
          <el-col :span="3">
            <el-select v-model="uploadValue" placeholder="请选择">
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
              :disabled='uploadDisabled'
              :accept = 'acceptFileType'
              :action="postURL"
              :file-list="fileList"
              :auto-upload="false"
              :data="postData"
              :on-change="fileChange"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :on-remove="fileUploadRemove"
              :before-upload="beforeUploadFile"
              :show-file-list='false'
              style="width:100px;float:left"
            >
              <el-button slot="trigger"  type="primary" :disabled='uploadDisabled' >点击上传</el-button>
            </el-upload>
            <div  style="font-size: 10px;color:red;line-height: 20px;float: left;margin-left: 5px">
              注意：单个文件不能超过5MB，允许文件类型：图片、Word文档、Excel文档、PDF、压缩文件<br>
              提示：若有品牌授权书和报关委托书请确认上传，其他报关相关文件上传至其他
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="2" style="line-height: 40px;text-align: center">
            备注信息:
          </el-col>
          <el-col :span="20"><el-input v-model="declarationform.remark" /></el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 添加商品弹出框 -->
    <el-dialog
      title="新增商品信息"
      :visible.sync="productDialogVisible"
      width="40%"
      center>
      <el-form :model="productAddForm" ref="productAddForm" :rules="rulesAddPro">
        <el-form-item label="商品编码:" label-width="100px" prop="commodityCustomsNo">
          <el-input v-model="productAddForm.commodityCustomsNo" clearable style="width: 300px"/>
        </el-form-item>
        <el-form-item label="商品名称:" label-width="100px" prop="commodityName">
          <el-input v-model="productAddForm.commodityName" clearable style="width: 300px" />
        </el-form-item>
        <el-form-item label="规格、型号:" label-width="100px" prop="commodityType">
          <el-input v-model="productAddForm.commodityType" clearable style="width: 300px" @focus="specficationInfo" />
        </el-form-item>
        <el-form-item label="法定单位:" label-width="100px" prop="legalUnit1">
          <el-select v-model="productAddForm.legalUnit1" @focus="loadLegalUnits" @change="legalUnitChange" filterable clearable style="width: 300px">
            <el-option
              v-for="item in legalUnits"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cancleAddPro">取 消</el-button>
                <el-button type="primary" @click="addProduct('productAddForm')">确 定</el-button>
              </span>
    </el-dialog>
    <specficationDialog ref="specficationDialog" @specifacation="setSpecification"/>
    <!-- 随附单证添加弹出信息框 -->
    <el-dialog
      title="新增随附单证"
      :visible.sync="documentDialogVisible"
      width="40%"
      center>
      <el-form :model="documentAddForm":rules="rulesAddDoc"  ref="documentAddForm">
        <el-form-item label="随附单证(序号):" label-width="120px" prop="number2">
          <el-input v-model="documentAddForm.number2" clearable style="width: 300px"/>
        </el-form-item>
        <el-form-item label="单证代码:" label-width="120px" prop="certificateCode">
          <el-input v-model="documentAddForm.certificateCode" clearable style="width: 300px"/>
        </el-form-item>
        <el-form-item label="单证编号:" label-width="120px" prop="certificateNo">
          <el-input v-model="documentAddForm.certificateNo" clearable style="width: 300px"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleAddDoc">取 消</el-button>
        <el-button type="primary" @click="addDocument('documentAddForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 不能删除附件信息框 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteAttachDialogVisible"
      width="500px"
      center>
      <label>您没有删除此条附件的权限，只有附件上传者可以删除附件！</label>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import { mapState } from 'vuex';
  import specficationDialog from './../../../webPersonal/businessManage/specficationDialog';
  import moment from 'moment';
  import editQuarantineCommodity from './../../../webPersonal/businessManage/components/editQuarantineCommodity'
  export default {
    //定义组件
    components: { specficationDialog, editQuarantineCommodity },
    //定义数据
    data () {
      return {
        shorthandNos:[],//境外客户信息
        buttonInfo:"显示业务单信息",
        isEdit:true,
        productDialogVisible:false,
        documentDialogVisible:false,
        deleteAttachDialogVisible:false,
        // 业务单数据
        declarationform: {

        },
        yesOrNot: [{
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        attachmentList:[],
        productAddForm:{
          commodityCustomsNo:'',
          commodityName:'',
          commodityType:'',
          legalUnit1:'',
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
        documentAddForm:{
          number2:'',
          certificateCode:'',
          certificateNo:'',
        },
        declareCustoms:[],//申报地海关
        exportPorts:[],//出口口岸
        supplyAreas:[],//境内货源地
        dealModes:[],//成交方式
        transportModes:[],//运输方式
        superviseModes:[],//监管方式
        levyNatures:[],//征免性质
        arrivalCountrys:[],//抵运国
        arrivalPorts:[],//指运港
        tradeCountrys:[],//贸易国
        legalUnits: [],//法定单位
        uploadValue:"",
        uploadOptions:[
          {value:'报关草单',label:'报关草单'},
          {value:'合同',label:'合同'},
          {value:'发票',label:'发票'},
          {value:'装箱单',label:'装箱单'},
          {value:'S/O单',label:'S/O单'},
          {value:'其他',label:'其他'},
        ],
        acceptFileType:'.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.png,.jpg,.jpeg',//上传允许的文件类型
        postURL:'',//上传服务器请求地址
        fileList:[],//待上传文件列表，element自动生成
        fileListData:[],//待上传文件列表数据
        uploadFilePrams:[],//上传文件回调参数的callbackbody
        uploadData:{},//存储请求回来的上传签名等数据
        postHeaders:{},
        postData:{},
        postExpire:'',//上传的秘钥过期时间点，使用UNIX时间
        postCallback:{},//上传的回调字段设置，即上传成功后需要传给服务器的字段
        //详见接口文档 回调插入业务附件表数据
        postState:1,//标志获取上传文件签名接口是否成功调用；
        //新增商品规则
        rulesAddPro:{
          commodityCustomsNo: [
            { required: true, message: '！商品编号不能为空', trigger: 'blur' },
          ],
          commodityName:[
            { required: true, message: '！商品名称不能为空', trigger: 'blur' },
          ],
          commodityType:[
            { required: true, message: '！商品类型不能为空', trigger: 'blur' },
          ],
          legalUnit1:[
            { required: true, message: '！商品法定单位不能为空', trigger: 'blur' },
          ]
        },
        //添加随附单证规则
        rulesAddDoc:{
          certificateCode:[
            { required: true, message: '！单证代码不能为空', trigger: 'blur' }],
          certificateNo:[
            { required: true, message: '！单证编号不能为空', trigger: 'blur' }],
        }

      }
    },
    computed:{
      ...mapState(['nickCompanyMan','businessNo','businessId']),
      /*获取当前企业用户的id和名称，用来上传文件时参数*/
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      },
      /*点击上传按钮的点击效果和选取文件效果与文件类型是否选取绑定*/
      uploadDisabled(){
        /*如果文件类型没有选择，即为''时，不能点击上传；反之可以。*/
        if (this.uploadValue === ''){
          return true;
        } else {
          return false;
        }
      },
    },
    mounted:function(){
      //应该注意的是，使用mounted 并不能保证钩子函数中的 this.$el 在 document 中。为此还应该引入Vue.nextTick/vm.$nextTick
      this.$nextTick(function () {
        this.getUpload();
      });
    },
    //定义方法
    methods:{
      //时间格式化
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      //商品规格型号填写
      specficationInfo(){
        this.$refs.specficationDialog.dialogFormVisible = true;
      },
      setSpecification(val){
        console.log(val)
        this.productAddForm.commodityType = val.specificationStr;
        this.productAddForm.specificationParam = val.specificationParam.join('|');
        this.productAddForm.speForm = {
          eleTable:val.eleTable,
          CAS:val.CAS,
          GTIN:val.GTIN,
          brandType:val.brandType,
          preferential:val.preferential,
          others:val.others
        }
      },
      //编辑检验检疫货物规格
      editInspectGoodsSpection(){
        console.log(1)
        this.$refs.editQuarantineCommodity.dialogUserVisible = true;
      },
      getInspectGoodsSpection(data){
        console.log(data)
        this.declarationform.inspectGoodsSpection = data;
      },
      //添加商品信息
      newProduct(){
        this.productDialogVisible=true;
        this.productAddForm = {};
        this.$refs.specficationDialog.form = {}
        this.$refs.specficationDialog.eleTable = []
      },

      //显示报关业务单详情 根据businessId查询
      findExportService(val){
        this.isEdit=true;
        let param={
          businessId:val,
        };
        console.log(param);
        this.$axios4.post('/exportDeclareServiceSearch',param)
          .then((response) =>{
            console.log(response);
            let res=response.data;
            this.declarationform={};
            this.tableData1=[];
            this.tableData2=[];
            this.tableData3=[];
            //declarationform表格信息
            this.declarationform.declareCustoms=res.declareCustoms;
            this.declarationform.exportPort=res.exportPort;
            this.declarationform.shorthandNo=res.shorthandNo;
            this.declarationform.supplyArea=res.supplyArea;
            this.rsCompanyName=res.rsCompanyName;
            this.rsCreditCode=res.rsCreditCode;
            this.rsCustomsCode=res.rsCustomsCode;
            this.psCompanyName=res.psCompanyName;
            this.psCreditCode=res.psCreditCode;
            this.psCustomsCode=res.psCustomsCode;
            this.declarationform.supervisionMode=res.supervisionMode;
            this.declarationform.levyNature=res.levyNature;
            this.declarationform.levyMode=res.levyMode;
            if(res.priceCon === 1){
              this.priceCon="是"
            }
            else{
              this.priceCon="否"
            }
            if(res.franchiseFeeCon === 1){
              this.franchiseFeeCon="是"
            }
            else{
              this.franchiseFeeCon="否"
            }
            if(res.relationshipCon === 1){
              this.relationshipCon="是"
            }
            else{
              this.relationshipCon="否"
            }
            this.arrivalCountry=res.arrivalCountry;
            this.arrivalPort=res.arrivalPort;
            this.tradeCountry=res.tradeCountry;
            this.declarationform.remark=res.remark;
            //tableData1 商品信息
            for(let i=0; i<response.data.commodityInfo.length; i++){
              let dataRow = response.data.commodityInfo[i];
              this.tableData1.push({
                commodityCustomsNo:dataRow.commodityCustomsNo,
                commodityName:dataRow.commodityName,
                commodityType:dataRow.commodityType,
                legalUnit1:dataRow.legalUnit1,
              });
            };
            //tableData2  随附单证信息
            for(let i=0; i<response.data.certificateInfo.length; i++){
              let dataRow = response.data.certificateInfo[i];
              this.tableData2.push({
                certificateCode:dataRow.certificateCode,
                certificateNo:dataRow.certificateNo,
              });
            };
            console.log(this.businessId);
            //tableData3 附件信息
            for(let i=0; i<response.data.attachmentInfo.length; i++){
              let dataRow = response.data.attachmentInfo[i];
              this.tableData3.push({
                attchmentId:dataRow.attchmentId,
                fileName:dataRow.attachmentName,
                label:dataRow.label,
                fileType:dataRow.attachmentType,
                author:dataRow.ownerName,
                uploadTime:dataRow.uploadTime,
                attachmentAddress:dataRow.attachmentAddress,
              });
            };
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //修改报关单
      updateExportService(){
        let params={
          businessId:this.businessId,
          enterpriseName:this.nickCompanyName,
          //contractNo:,表格上没有
          tradeCountry: this.tradeCountry,
          exportPort:this.declarationform.exportPort,
          supplyArea:this.declarationform.supplyArea,
          //dealMode表格上没有
          declareCustoms:this.declarationform.declareCustoms,
          //declareEnterprise表格上没有
          shorthandNo:this.declarationform.shorthandNo,
          rsCompanyName: this.rsCompanyName,
          rsCreditCode: this.rsCreditCode,
          rsCustomsCode:this.rsCustomsCode,
          psCompanyName:this.psCompanyName,
          psCreditCode:this.psCreditCode,
          psCustomsCode:this.psCustomsCode,
          supervisionMode:this.declarationform.supervisionMode,
          levyNature:this.declarationform.levyNature,
          levyMode:this.declarationform.levyMode,
          relationshipCon: this.relationshipCon,
          priceCon:this.priceCon,
          franchiseFeeCon:this.franchiseFeeCon,
          arrivalCountry: this.arrivalCountry,
          arrivalPort:  this.arrivalPort,
          commodityList:this.tableData1,
          certificateList:this.tableData2,
        };
        console.log(params);
        this.$axios4.post('/addAndUpdateBusiness',params)
          .then((response) =>{
            console.log(response);
            let res=response.data;
            if(res.state==1){
              this.$message.success('修改报关单成功');
            }else{
              this.$message.error('修改报关单失败');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },

      // 添加商品信息
      addProduct(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.tableData1.push({
              number:this.productAddForm.number,
              commodityCustomsNo:this.productAddForm.commodityCustomsNo,
              commodityName:this.productAddForm.commodityName,
              commodityType:this.productAddForm.commodityType,
              legalUnit1:this.productAddForm.legalUnit1
            })
            this.productDialogVisible=false;
            for(let j in this.productAddForm){
              this.productAddForm[j]='';
            }
          }
        });
      },
      cancleAddPro(){
        this.productDialogVisible = false;
        for(let j in this.productAddForm){
          this.productAddForm[j]='';
        }
      },

      //添加随附单证信息
      addDocument(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.tableData2.push({
              number2:this.documentAddForm.number2,
              certificateCode:this.documentAddForm.certificateCode,
              certificateNo:this.documentAddForm.certificateNo,
            })
            this.documentDialogVisible=false;
            for(let j in this.documentAddForm){
              this.documentAddForm[j]='';
            }
          }
        });
      },
      //取消添加随附单证信息
      cancleAddDoc(){
        this.documentDialogVisible = false;
        for(let j in this.documentAddForm){
          this.documentAddForm[j]='';
        }
      },

      //删除单条商品信息
      productDelete(index,row){
        this.tableData1.splice(index,1);
      },

      //删除随附单证信息
      documentDelete(index,row){
        this.tableData2.splice(index,1);
      },
      //下载附件信息
      uploadAttach(index,row){
        let param = {
          'BucketName':"moretrade-business",
          'FileName':row.attachmentAddress,
        }
        this.$axios7.post('file/Download',param)
          .then((response) =>{
            window.location.href=response.data.url
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //删除附件信息
      deleteAttach(index,row){
        if(row.author === this.nickCompanyName){
          if("undefined" != typeof row.attchmentId){
            let param = {
              'attchmentId': row.attchmentId,
            }
            this.$axios4.post('/deleteAttachment',param)
              .then((response) =>{
                console.log(response);
                let res=response.data;
                if(res.state==1){
                  this.$message.success('删除附件成功');
                  this.tableData3.splice(index,1);
                }else{
                  this.$message.error('删除附件失败');
                }
              })
              .catch(function (error) {
                console.log(error);
              });

          }
          this.tableData3.splice(index,1);
          this.fileUploadRemove(row,this.tableData3);
        }
        else{
          this.deleteAttachDialogVisible = true;
        }
      },
      /*获取上传文件的临时秘钥及相关签名字段*/
      getUpload(){
        this.$axios7.get('file/Upload',{
          params:{
            'Bucket':'business'
          }
        })
          .then((res) => {
            console.log("获取到上传的签名:");
            console.log(res.data);
            this.postURL = res.data.host;//对应bucket的公网访问地址
            console.log("上传文件的地址:"+this.postURL);
            this.postExpire = res.data.expire;
            this.uploadData=res.data;//将返回的签名等存储起来
            this.postState=1;//标志获取上传文件签名等数据成功
            return 1;
          }).catch((e) => {
          console.log("获取上传文件权限出错：");
          console.log(e);
          this.postState=0;//标志获取上传文件签名等数据失败；
          this.$message({
            showClose:true,
            message:'获取上传文件权限出错，请稍后刷新页面再试！',
            type:'error',
          });
          return 0;
        });
      },
      /*设置上传文件的地址，因用数据绑定方式不生效，因此用函数返回方式*/
      postUrl(){
        return this.postURL;
      },
      /*文件状态改变时调用的函数，添加文件、上传成功和上传失败时都会被调用*/
      /*此处主要为添加文件后更新相应信息*/
      fileChange(file,fileList){
        //fileList =[];
        console.log("有变化的文件：");
        console.log(file);
        console.log("当前文件列表");
        console.log(fileList);
        console.log("存储当前列表的变量");
        this.fileList = fileList;
        console.log(this.fileList);
        console.log(this.nickCompanyName)
        /*对比现有文件数据，若不存在则新增*/
        /*uploadTable长度为0时则先新增*/
        if (this.tableData3.length === 0){
          var date = new Date()
          file.uploadTime=date.getTime();
          file.fileType=this.uploadValue;
          file.fileName=file.name;
          file.author=this.nickCompanyName;
          this.tableData3.push(file);
        }else {
          for (let i=0;i<this.tableData3.length;i++){
            if (file.uid === this.tableData3[i].uid ){
              break;
            } else if (i === (this.tableData3.length-1)) {
              var date = new Date()
              file.uploadTime=date.getTime();
              file.fileType=this.uploadValue;
              file.fileName=file.name;
              file.author=this.nickCompanyName;
              this.tableData3.push(file);
              break;
            }
          }
        }


      },
      /*文件状态改变时没有包含文件被移除，因此增加文件移除时更新fileList*/
      fileUploadRemove(file,fileList){
        this.fileList = fileList;
        console.log(this.fileList);
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
        console.log("ownerId:"+this.nickCompanyId);
        for (let i=0;i<this.tableData3.length;i++){
          this.uploadFilePrams.push({
            "businessId": this.businessId,
            "ownerId": this.nickCompanyId,
            "ownerName": this.nickCompanyName,
            "ownerType": "企业",
            "label": "业务单",//先写死，后面改成根据attchmentType自动匹配？
            "attachmentType":this.tableData3[i].fileType,
            "attachmentName": this.tableData3[i].name,//当前文件的名称
            //"fileType": this.fileList[i].raw.type,//当前文件类型
            "attachmentAddress": this.businessId+"/"+this.tableData3[i].name,//文件路径，先写死。//"fileSize":
          });
        };
        this.postCallback={
          "callbackUrl":this.callbackUrl+"/file/callback?Type=0",
          "callbackHost":"oss-cn-hangzhou.aliyuncs.com",
          "callbackBodyType":"application/json",
          "callbackBody":JSON.stringify(this.uploadFilePrams),
        };
        console.log("body："+JSON.stringify(this.uploadFilePrams));
        console.log("设置回调参数");
        console.log(JSON.stringify(this.postCallback));
        return Base64.encode(JSON.stringify(this.postCallback));//将回调时参数转化为Base64编码
      },
      /*上传文件函数*/
      upload(){
        /*获取当前时间判断签名是否过期，过期则重新获取，3s缓冲*/
        console.log("子组件中businessId:"+this.businessId);
        let now = Date.parse(new Date())/1000;
        console.log(parseInt(this.postExpire));
        console.log(now);
        /*if (this.fileList.length === 0) {
          /!*不需要上传文件，终止函数*!/
          return false;
        }*/
        if (parseInt(this.postExpire) <(now+3) || this.postState !== 1 ){//即将过期或初始化时获取失败
          this.getUpload();
          setTimeout(function () {
            //重新获取上传签名为异步执行，因此等待0.5秒后继续执行配置参数及上传动作
            //正常情况下0.6秒足够。
            // 后期可改成等待异步执行完成之后再执行，使用Promise（之前使用有问题因此暂时放弃）
            this.setUpload();
          }.bind(this),600);
        }else {
          this.setUpload();//不需要重新获取则直接配置参数并上传
        }
      },
      /*文件上传成功时钩子绑定的方法*/
      fileUploadSuccess(response,file,fileList){
        console.log("上传文件成功");
        console.log(response);
      },
      /*文件上传失败时钩子绑定的方法*/
      fileUploadError(response,file,fileList){
        console.log("上传文件不成功");
        console.log(response);
      },
      /*文件上传前钩子绑定的方法，每次上传一个文件时会调用*/
      beforeUploadFile(file){
        /*/!*在上传前设置上传参数data，之前在别的函数内上传无法在上传第一个时就上传绑定后的数据*!/
        this.postData = {
          'policy':this.uploadData.policy,
          'OSSAccessKeyId':this.uploadData.accessid,
          'success_action_status':'200',
          'x-oss-security-token' : this.uploadData["security-token"],
          'signature': this.uploadData.signature,
          'key':this.businessId+'/${filename}',//上传文件的object名称。
        };
        console.log("即将进入设置回调参数");
        let callback =this.setCallbackData(file);
        this.postData["callback"]=callback;
        console.log("即将上传文件");
        console.log(this.postData);*/
      },
      /*上传文件的配置参数及上传动作*/
      setUpload(){
        if (this.postState === 1){//获取密钥成功
          /*上传文件*/
          console.log("即将进入上传文件前操作");
          /*在上传前设置上传参数data，之前在别的函数内上传无法在上传第一个时就上传绑定后的数据*/
          this.postData = {
            'policy':this.uploadData.policy,
            'OSSAccessKeyId':this.uploadData.accessid,
            'success_action_status':'200',
            'x-oss-security-token' : this.uploadData["security-token"],
            'signature': this.uploadData.signature,
            'key':this.businessId+'/${filename}',//上传文件的object名称。
          };
          console.log("即将进入设置回调参数");
          let callback = this.setCallbackData();

          this.postData["callback"]=callback;
          console.log("即将上传文件");
          console.log(this.postData);
          this.$nextTick(()=>{//防止第一次请求带不上表单其他参数
            console.log("上传文件的地址:"+this.postURL);
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
      //根据收发货单位海关代码自动填入收发货单位信息
      rsCustomsCodeAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':2,
            'infoValue':val,
            'enterpriseNature':0,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
//	            	this.declarationform.rsCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
            this.rsCreditCode = response.data.data.list[0].enterpriseCreditCode;
            this.rsCompanyName = response.data.data.list[0].enterpriseName;
            console.log(this.rsCompanyName);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据收发货单位信用代码自动填入收发货单位信息
      rsCreditCodeAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':3,
            'infoValue':val,
            'enterpriseNature':0,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
            this.rsCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
//	            	this.rsCreditCode = response.data.data.list[0].enterpriseCreditCode;
            this.rsCompanyName = response.data.data.list[0].enterpriseName;
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据收发货单位名称自动填入收发货单位信息
      rsCompanyNameAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':1,
            'infoValue':val,
            'enterpriseNature':0,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
            this.rsCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
            this.rsCreditCode = response.data.data.list[0].enterpriseCreditCode;
//	            	this.rsCompanyName = response.data.data.list[0].enterpriseName;
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据生产销售单位海关代码自动填入生产销售单位信息
      psCustomsCodeAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':2,
            'infoValue':val,
            'enterpriseNature':1,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
//	            	this.psCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
            this.psCreditCode = response.data.data.list[0].enterpriseCreditCode;
            this.psCompanyName = response.data.data.list[0].enterpriseName;
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据生产销售单位信用代码自动填入生产销售单位信息
      psCreditCodeAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':3,
            'infoValue':val,
            'enterpriseNature':1,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
            this.psCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
//	            	this.psCreditCode = response.data.data.list[0].enterpriseCreditCode;
            this.psCompanyName = response.data.data.list[0].enterpriseName;
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //根据生产销售单位名称自动填入生产销售单位信息
      psCompanyNameAuto(val){
        this.$axios3.get('deliveryEnterprise/enterpriseInfoImport',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'infoType':1,
            'infoValue':val,
            'enterpriseNature':1,
          }}).then((response) =>{
          console.log('查询',response)
          if(response.data.data.list.length !== 0){
            this.psCustomsCode = response.data.data.list[0].enterpriseCustomsCode;
            this.psCreditCode = response.data.data.list[0].enterpriseCreditCode;
//	            	this.psCompanyName = response.data.data.list[0].enterpriseName;
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      //境外客户搜索建议
      loadshorthandNos(){
        let param = {
          'ownedEnterpriseId':this.nickCompanyId
        }
        this.$axios3.post('overseasCustomerInfo/getSorthandNoById',param)
          .then((res) => {
            console.log(res)
            let shorthandNosArray = [];
            if(res.data.state === '1'){
              for(let i =0;i<res.data.data.length;i++){
                shorthandNosArray.push({
                  value:i,
                  label:res.data.data[i],
                })
              }
              console.log('境外客户',shorthandNosArray)
              this.shorthandNos = shorthandNosArray;

            }
          }).catch((e) => {
          console.log(e);
        })
      },
      //判断速记代码是否存在，并自动填入信息
      shorthandNoChange(item){
        if(this.shorthandNos[item] !== undefined){
          this.declarationform.shorthandNo = this.shorthandNos[item].label;
        }

        this.$axios3.get('overseasCustomerInfo/isShorthandNoExist',{params:{
            'ownedEnterpriseId':this.nickCompanyId,
            'shorthandNo':this.shorthandNos[item].label,
          }}).then((response) =>{
          console.log('速记代码查询：',response)
          if(response.data.data.length !== 0){
            this.franchiseFeeCon = response.data.data[0].franchiseFeeCon;
            this.priceCon = response.data.data[0].priceCon;
            this.relationshipCon = response.data.data[0].relationshipCon;
            this.arrivalCountry = response.data.data[0].startOrArrivalCountry;
            this.arrivalPort = response.data.data[0].startOrArrivalPort;
            this.tradeCountry = response.data.data[0].tradeCountry;

          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
  }
</script>
<style type="text/css">
  .cd-form-item {
    margin: 2px 0;
  }
  /*表格样式*/
  #formRow{
    margin:0;
    padding: 0;
    width: 100%;
  }

  .leftitem{
    float: left;
    margin: 5px 0;
    width: 100%;
  }

  .leftitem13{
    float: left;
    width: 30%;
    margin: 5px 0;
  }

</style>
