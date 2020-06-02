<template>
  <el-dialog title="编辑产品许可证/审批/备案信息" :visible.sync="dialogUserVisible" width="60%" >
    <div>
      <el-form :model="form">
        <el-row>
          <el-col :span="7">
            <el-form-item label="商品编码"  label-width="100px" class="formItem">
              <el-input v-model="form.commodityCustomsNo"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商品名称"  label-width="100px" class="formItem">
              <el-input v-model="form.commodityName"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="检验检疫名称"  label-width="100px" class="formItem">
              <el-input v-model="form.inspectionAndQuarantineName"  size="small" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="序号"  label-width="100px" class="formItem">
              <el-input v-model="form.orderNo"  size="small" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="许可证类别"  label-width="100px" class="formItem">
              <el-select v-model="form.licenseCategory" :filter-method="licenseCategorysFilter" filterable clearable size="small" style="width: 100%">
                <el-option
                  v-for="item in licenseCategorysAll"
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
            <el-form-item label="许可证编码"  label-width="100px" class="formItem">
              <el-input v-model="form.licenseNo"  size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label="核销货物序号"  label-width="100px" class="formItem">
              <el-input v-model="form.verificationGoodsNo"  size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="核销数量"  label-width="100px" class="formItem">
              <el-input v-model="form.verificationGoodsQuantity"  size="small" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="mini" @click="addLicenseInfo">新  增</el-button>
      <el-button type="primary" size="mini" @click="saveLicenseInfo">保  存</el-button>
      <!--<el-button type="primary" size="mini" @click="deleteLicenseInfo">删  除</el-button>-->
      <el-button type="primary" size="mini" @click="productLicenseInfo">许 可 证 VIN 信 息</el-button>
    </div>
    <div>
      <el-table :data="TableData" stripe style="width: 100%" @cell-click="handleSelectionChange">
        <el-table-column type="index" prop="orderNo" label="序号" width="90">
        </el-table-column>
        <el-table-column prop="licenseCategory" label="许可证类别代码">
        </el-table-column>
        <el-table-column prop="licenseCategoryName" label="许可证类别名称">
        </el-table-column>
        <el-table-column prop="licenseNo" label="许可证编码">
        </el-table-column>
        <el-table-column prop="verificationGoodsNo" label="核销货物序号">
        </el-table-column>
        <el-table-column prop="verificationGoodsQuantity" label="核销数量">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteLicenseInfo(scope.$index,scope.row)" style="color: #ff4d51;" type="text" size="small">移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--许可证VIN信息弹出框-->
      <el-dialog title="编辑许可证VIN" :visible.sync="dialogVisible" width="60%" append-to-body>
        <div>
          <el-form :model="formin">
            <el-row>
              <el-col :span="6">
                <el-form-item label="序号"  label-width="80px" class="formItem">
                  <el-input v-model="formin.orderNo" size="small" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="许可证类别"  label-width="100px" class="formItem">
                  <el-select v-model="formin.licenseCategory" disabled size="small" style="width: 100%">
                    <el-option
                      v-for="item in licenseCategorys"
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
                <el-form-item label="许可证编号"  label-width="100px" class="formItem">
                  <el-input v-model="formin.licenseNo"  size="small" disabled/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="VIN序号"  label-width="80px" class="formItem">
                  <el-input v-model="formin.vinNo"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提/运单日期"  label-width="100px" class="formItem">
                  <el-date-picker
                    class="dataPicker"
                    v-model="formin.ladingBillOrWayBillDate"
                    type="date"
                    placeholder="选择日期"
                    size="small"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="质量保质期"  label-width="100px" class="formItem">
                  <el-input v-model="formin.qualityGuaranteePeriod"  size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="车辆识别代码(VIN)	"  label-width="140px" class="formItem">
                  <el-input v-model="formin.vehicleIdentificationCode"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发动机号或电机号"  label-width="140px" class="formItem">
                  <el-input v-model="formin.engineOrMotorNo"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发票号"  label-width="90px" class="formItem">
                  <el-input v-model="formin.invoiceNo"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发票所列数量"  label-width="100px" class="formItem">
                  <el-input v-model="formin.quantityOfInvoice"  size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="品名（中文名称）"  label-width="140px" class="formItem">
                  <el-input v-model="formin.productCnName"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="品名（英文名称）"  label-width="140px" class="formItem">
                  <el-input v-model="formin.productEnName"  size="small" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="型号（英文）"  label-width="140px" class="formItem">
                  <el-input v-model="formin.model"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="底盘(车架)号"  label-width="140px" class="formItem">
                  <el-input v-model="formin.chassisOrFrameNo"  size="small" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="单价"  label-width="80px" class="formItem">
                  <el-input v-model="formin.unitPrice"  size="small" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-button type="primary" size="mini" @click="addLicenseInfoIn">新  增</el-button>
          <el-button type="primary" size="mini" @click="saveLicenseInfoIn">保  存</el-button>
          <!--<el-button type="primary" size="mini" @click="deleteLicenseInfoIn">删  除</el-button>-->
        </div>
        <div>
          <el-table :data="TableDataIn" stripe style="width: 100%" @cell-click="handleSelectionChangeIn">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="vinNo" label="VIN序号">
            </el-table-column>
            <el-table-column prop="ladingBillOrWayBillDate" label="提/运单日期" width="160">
            </el-table-column>
            <el-table-column prop="qualityGuaranteePeriod" label="质量保质期">
            </el-table-column>
            <el-table-column prop="engineOrMotorNo" label="发动机号或电机号">
            </el-table-column>
            <el-table-column prop="vehicleIdentificationCode" label="车辆识别代码(VIN)">
            </el-table-column>
            <el-table-column prop="chassisOrFrameNo" label="底盘(车架)号">
            </el-table-column>
            <el-table-column prop="invoiceNo" label="发票号">
            </el-table-column>
            <el-table-column prop="quantityOfInvoice" label="发票所列数量">
            </el-table-column>
            <el-table-column prop="productCnName" label="品名(中文名称)">
            </el-table-column>
            <el-table-column prop="productEnName" label="品名(英文名称)">
            </el-table-column>
            <el-table-column prop="model" label="型号(英文)">
            </el-table-column>
            <el-table-column prop="unitPrice" label="单价">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="deleteLicenseInfoIn(scope.$index,scope.row)" style="color: #ff4d51;" type="text" size="small">移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!--结束-->
    </div>
  </el-dialog>
</template>

<script>
  export default {
    //定义数据
    data () {
      return {
        licenseCategorys:[],
        licenseCategorysAll:[],
        dialogUserVisible:false,
        dialogVisible:false,
        TableData:[],
        TableDataIn:[],
        form:{
          commodityCustomsNo:'',
          commodityName:'',
          inspectionAndQuarantineName:'',
          orderNo:0,
          licenseCategory:'',
          licenseNo:'',
          verificationGoodsNo:'',
          verificationGoodsQuantity:'',
        },
        formin:{
          orderNo:0,
          licenseCategory:'',
          licenseNo:'',
          vinNo:'',
          ladingBillOrWayBillDate:'',
          qualityGuaranteePeriod:'',
          engineOrMotorNo:'',
          invoiceNo:'',
          quantityOfInvoice:'',
          productCnName:'',
          productEnName:'',
          model:'',
          chassisOrFrameNo:'',
          unitPrice:'',
        },
        commodityForm:{},
      }
    },
    computed:{
      productQualificationList(){
        return this.$store.state.productQualificationList;
      },
      licenseVINList(){
        return this.$store.state.licenseVINList;
      },
    },
    //定义初始化函数
    mounted(){
      this.loadStaticData();
    },
    //定义方法
    methods:{
      //显示对话框
      showProLicenDialog(commodityForm){
        this.commodityForm = commodityForm;
        var QualificationList = [];
        var VINList = [];
        var j = 0;
        for(let i in this.productQualificationList){
          if(this.productQualificationList[i].commodityCustomsNo == this.commodityForm.commodityCustomsNo
            && this.productQualificationList[i].commodityItemNo == this.commodityForm.commodityItemNo){
            QualificationList[j] = this.productQualificationList[i];
            j++;
          }
        }
        console.log('产品资质',this.productQualificationList,QualificationList,this.licenseVINList)
        this.TableData = [];
        if(QualificationList.length > 0){
          for(let i in QualificationList){
            //查找许可证类别编码
            var code = this.licenseCategorys.find((item) => {
              if(item.value == QualificationList[i].licenseCategory){
                return item
              }
            }).label;
            QualificationList[i].licenseCategoryName = code;
            this.TableData.push(QualificationList[i]);
          }
        }
        this.form.commodityCustomsNo = commodityForm.commodityCustomsNo;
        this.form.commodityName = commodityForm.commodityName;
        this.form.inspectionAndQuarantineName = commodityForm.inspectionAndQuarantineName;
        this.form.orderNo = this.TableData.length + 1;
        this.form.licenseCategory = '';
        this.form.licenseNo = '';
        this.form.verificationGoodsNo = '';
        this.form.verificationGoodsQuantity = '';
        this.dialogUserVisible = true;
      },
      //新增按钮
      addLicenseInfo(){
        this.form.orderNo = this.TableData.length + 1;
        this.form.licenseCategory = '';
        this.form.licenseNo = '';
        this.form.verificationGoodsNo = '';
        this.form.verificationGoodsQuantity = '';
      },
      //保存按钮
      saveLicenseInfo(){
        //判断序号是否存在
        var isExit = false;
        var code = this.licenseCategorys.find((item) => {
          if(item.value == this.form.licenseCategory){
            return item
          }
        }).label;
        console.log('pp',this.form.orderNo)
        this.TableData.find((item) => {
          if(item.orderNo == this.form.orderNo){
            console.log('kk')
            isExit = true;
            item.licenseCategory = this.form.licenseCategory;
            item.licenseCategoryName = code;
            item.licenseNo = this.form.licenseNo;
            item.verificationGoodsNo = this.form.verificationGoodsNo;
            item.verificationGoodsQuantity = this.form.verificationGoodsQuantity;
          }
        })
        if(this.productQualificationList != undefined){
          this.productQualificationList.find((item) => {
            if(item.orderNo == this.form.orderNo
              && item.commodityItemNo == this.commodityForm.commodityItemNo){
              console.log('aa')
              isExit = true;
              item.licenseCategoryName = code;
              item.licenseCategory = this.form.licenseCategory;
              item.licenseNo = this.form.licenseNo;
              item.verificationGoodsNo = this.form.verificationGoodsNo;
              item.verificationGoodsQuantity = this.form.verificationGoodsQuantity;
            }
          })
        }
        if(isExit == false){
          this.TableData.push({
            licenseCategoryName:code,
            licenseCategory:this.form.licenseCategory,
            commodityItemNo:this.commodityForm.commodityItemNo,
            exDeclareDetailId:this.commodityForm.exDeclareDetailId,
            orderNo:this.form.orderNo,
            commodityCustomsNo:this.form.commodityCustomsNo,
            commodityName:this.form.commodityName,
            inspectionAndQuarantineName:this.form.inspectionAndQuarantineName,
            licenseNo:this.form.licenseNo,
            verificationGoodsNo:this.form.verificationGoodsNo,
            verificationGoodsQuantity:this.form.verificationGoodsQuantity,
          });
          this.productQualificationList.push({
            licenseCategoryName:code,
            licenseCategory:this.form.licenseCategory,
            commodityItemNo:this.commodityForm.commodityItemNo,
            exDeclareDetailId:this.commodityForm.exDeclareDetailId,
            orderNo:this.form.orderNo,
            commodityCustomsNo:this.form.commodityCustomsNo,
            commodityName:this.form.commodityName,
            inspectionAndQuarantineName:this.form.inspectionAndQuarantineName,
            licenseNo:this.form.licenseNo,
            verificationGoodsNo:this.form.verificationGoodsNo,
            verificationGoodsQuantity:this.form.verificationGoodsQuantity,
          });
        }
        this.licenseCategorysAll = this.licenseCategorys.slice(0,19);
        console.log('资',this.productQualificationList)
        this.$store.commit("updateProductQualificationList",this.productQualificationList);
        this.form.orderNo = this.TableData.length + 1;
        this.form.licenseCategory = '';
        this.form.licenseNo = '';
        this.form.verificationGoodsNo = '';
        this.form.verificationGoodsQuantity = '';
      },
      handleSelectionChange(val,col){
        console.log(val,col);
        if(col.label != '操作'){
          this.form.orderNo = val.orderNo;
          this.form.licenseCategory = val.licenseCategory;
          this.form.licenseNo = val.licenseNo;
          this.form.verificationGoodsNo = val.verificationGoodsNo;
          this.form.verificationGoodsQuantity = val.verificationGoodsQuantity;
        }
      },
      //删除按钮
      deleteLicenseInfo(index,row){
        //先将列表中的许可证信息删除
        for(let i in this.TableData){
          var indexFind = this.productQualificationList.indexOf(this.TableData[i])
          this.productQualificationList.splice(indexFind,1);
        }
        //将信息从table中移除
        this.TableData.splice(index,1);
        //修改table中许可证序号，再将table写入列表
        for(var i = 0; i < this.TableData.length;i++){
          this.TableData[i].orderNo = i+1;
          this.productQualificationList.push(this.TableData[i]);
        }
        console.log('资',this.productQualificationList)
        this.$store.commit("updateProductQualificationList",this.productQualificationList);
        //删除对应的VIN信息
        var VINList = [];
        var j = 0;
        for(let i in this.licenseVINList){
          if(this.licenseVINList[i].commodityItemNo == row.commodityItemNo
            && this.licenseVINList[i].prodQualificationOrderNo == row.orderNo){
            VINList[j] = this.licenseVINList[i];
            j++;
          }
          if(this.licenseVINList[i].commodityItemNo == row.commodityItemNo
            && this.licenseVINList[i].prodQualificationOrderNo > row.orderNo){
            this.licenseVINList[i].prodQualificationOrderNo = this.licenseVINList[i].prodQualificationOrderNo - 1;
          }
        }
        if(VINList.length > 0){
          for(let i in VINList){
            var indexVin = this.licenseVINList.indexOf(VINList[i])
            this.licenseVINList.splice(indexVin,1);
          }
        }
        this.$store.commit("updateLicenseVINList",this.licenseVINList);
      },
      //许可证VIN信息
      productLicenseInfo(){
        if(this.form.licenseCategory != '' && this.form.licenseNo != ''){
          if(typeof this.licenseVINList != "undefined" && this.licenseVINList.length != 0){
            this.TableDataIn = [];
            var VINList = [];
            var j = 0;
            for(let i in this.licenseVINList){
              if(this.licenseVINList[i].licenseCategory == this.form.licenseCategory
                && this.licenseVINList[i].licenseNo == this.form.licenseNo
                && this.licenseVINList[i].commodityItemNo == this.commodityForm.commodityItemNo
                && this.licenseVINList[i].prodQualificationOrderNo == this.form.orderNo){
                VINList[j] = this.licenseVINList[i];
                j++;
              }
            }
            if(VINList.length > 0){
              for(let i in VINList){
                this.TableDataIn.push(VINList[i]);
              }
            }
          }
          this.formin.orderNo = this.TableDataIn.length + 1;
          this.formin.licenseCategory = this.form.licenseCategory;
          this.formin.licenseNo = this.form.licenseNo;
          this.formin.vinNo = '';
          this.formin.ladingBillOrWayBillDate = '';
          this.formin.qualityGuaranteePeriod = '';
          this.formin.vehicleIdentificationCode = '';
          this.formin.engineOrMotorNo = '';
          this.formin.invoiceNo = '';
          this.formin.quantityOfInvoice = '';
          this.formin.productCnName = '';
          this.formin.productEnName = '';
          this.formin.model = '';
          this.formin.chassisOrFrameNo = '';
          this.formin.unitPrice	 = '';
          this.dialogVisible = true;
        }
        else {
          this.$message.error('许可证类别和许可证编码不能为空！');
        }
      },
      //新增按钮
      addLicenseInfoIn(){
        this.formin.orderNo = this.TableDataIn.length + 1;
        this.formin.vinNo = '';
        this.formin.ladingBillOrWayBillDate = '';
        this.formin.qualityGuaranteePeriod = '';
        this.formin.vehicleIdentificationCode = '';
        this.formin.engineOrMotorNo = '';
        this.formin.invoiceNo = '';
        this.formin.quantityOfInvoice = '';
        this.formin.productCnName = '';
        this.formin.productEnName = '';
        this.formin.model = '';
        this.formin.chassisOrFrameNo = '';
        this.formin.unitPrice	 = '';
      },
      //保存按钮
      saveLicenseInfoIn(){
        //判断序号是否存在
        var isExitIn = false;
        this.TableDataIn.find((item) => {
          if(item.orderNo == this.formin.orderNo){
            console.log('ooo')
            isExitIn = true;
            item.vinNo = this.formin.vinNo;
            item.ladingBillOrWayBillDate = this.formin.ladingBillOrWayBillDate;
            item.qualityGuaranteePeriod = this.formin.qualityGuaranteePeriod;
            item.vehicleIdentificationCode = this.formin.vehicleIdentificationCode;
            item.engineOrMotorNo = this.formin.engineOrMotorNo;
            item.invoiceNo = this.formin.invoiceNo;
            item.quantityOfInvoice = this.formin.quantityOfInvoice;
            item.productCnName = this.formin.productCnName;
            item.productEnName = this.formin.productEnName;
            item.model = this.formin.model;
            item.chassisOrFrameNo = this.formin.chassisOrFrameNo;
            item.unitPrice = this.formin.unitPrice;
          }
        })
        if(this.licenseVINList != undefined){
          this.licenseVINList.find((item) => {
            if(item.orderNo === this.formin.orderNo
              && item.commodityItemNo == this.commodityForm.commodityItemNo
              && item.prodQualificationOrderNo == this.form.orderNo){
              item.vinNo = this.formin.vinNo;
              item.ladingBillOrWayBillDate = this.formin.ladingBillOrWayBillDate;
              item.qualityGuaranteePeriod = this.formin.qualityGuaranteePeriod;
              item.vehicleIdentificationCode = this.formin.vehicleIdentificationCode;
              item.engineOrMotorNo = this.formin.engineOrMotorNo;
              item.invoiceNo = this.formin.invoiceNo;
              item.quantityOfInvoice = this.formin.quantityOfInvoice;
              item.productCnName = this.formin.productCnName;
              item.productEnName = this.formin.productEnName;
              item.model = this.formin.model;
              item.chassisOrFrameNo = this.formin.chassisOrFrameNo;
              item.unitPrice = this.formin.unitPrice;
            }
          })
        }
        if(isExitIn == false){
          this.TableDataIn.push({
            commodityItemNo:this.commodityForm.commodityItemNo,
            exDeclareDetailId:this.commodityForm.exDeclareDetailId,
            prodQualificationOrderNo:this.form.orderNo,
            orderNo:this.formin.orderNo,
            licenseCategory:this.formin.licenseCategory,
            licenseNo:this.formin.licenseNo,
            vinNo:this.formin.vinNo,
            ladingBillOrWayBillDate:this.formin.ladingBillOrWayBillDate,
            qualityGuaranteePeriod:this.formin.qualityGuaranteePeriod,
            vehicleIdentificationCode:this.formin.vehicleIdentificationCode,
            engineOrMotorNo:this.formin.engineOrMotorNo,
            invoiceNo:this.formin.invoiceNo,
            quantityOfInvoice:this.formin.quantityOfInvoice,
            productCnName:this.formin.productCnName,
            productEnName:this.formin.productEnName,
            model:this.formin.model,
            chassisOrFrameNo:this.formin.chassisOrFrameNo,
            unitPrice:this.formin.unitPrice,
          })
          this.licenseVINList.push({
            commodityItemNo:this.commodityForm.commodityItemNo,
            exDeclareDetailId:this.commodityForm.exDeclareDetailId,
            prodQualificationOrderNo:this.form.orderNo,
            orderNo:this.formin.orderNo,
            licenseCategory:this.formin.licenseCategory,
            licenseNo:this.formin.licenseNo,
            vinNo:this.formin.vinNo,
            ladingBillOrWayBillDate:this.formin.ladingBillOrWayBillDate,
            qualityGuaranteePeriod:this.formin.qualityGuaranteePeriod,
            vehicleIdentificationCode:this.formin.vehicleIdentificationCode,
            engineOrMotorNo:this.formin.engineOrMotorNo,
            invoiceNo:this.formin.invoiceNo,
            quantityOfInvoice:this.formin.quantityOfInvoice,
            productCnName:this.formin.productCnName,
            productEnName:this.formin.productEnName,
            model:this.formin.model,
            chassisOrFrameNo:this.formin.chassisOrFrameNo,
            unitPrice:this.formin.unitPrice,
          })
        }
        this.formin = {
          orderNo:this.TableDataIn.length + 1,
          licenseCategory: this.form.licenseCategory,
          licenseNo: this.form.licenseNo,
          vinNo: '',
          ladingBillOrWayBillDate: '',
          qualityGuaranteePeriod: '',
          vehicleIdentificationCode: '',
          engineOrMotorNo: '',
          invoiceNo: '',
          quantityOfInvoice: '',
          productCnName: '',
          productEnName: '',
          model: '',
          chassisOrFrameNo: '',
          unitPrice:''
        }
        console.log('资质',this.licenseVINList)
        this.$store.commit("updateLicenseVINList",this.licenseVINList);
      },
      handleSelectionChangeIn(val,col){
        if(col.label != '操作'){
          this.formin = val;
        }
      },
      //删除按钮
      deleteLicenseInfoIn(index,row){
        this.TableDataIn.splice(index,1);
        var indexFind = this.licenseVINList.indexOf(row)
        this.licenseVINList.splice(indexFind,1);
        for(let i in this.TableDataIn){
          if(this.TableDataIn[i].orderNo > row.orderNo){
            this.TableDataIn[i].orderNo = i+1;
            var VinIndex = this.licenseVINList.indexOf(this.TableDataIn[i]);
            if(VinIndex > 0){
              this.licenseVINList[VinIndex].orderNo = i + 1;
            }
          }
        }
        this.$store.commit("updateLicenseVINList",this.licenseVINList);
      },
      //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_licencecategory.json'),//许可证类别
        ]).then(this.$axios.spread((
          res_licencecategory,
        ) => {
          this.licenseCategorys = res_licencecategory.data.RECORDS;
          this.licenseCategorysAll = this.licenseCategorys.slice(0,19);
        })).catch((e) => {
          console.log(e);
        })
      },
      //许可证类别
      licenseCategorysFilter(query){
        if(query !== ''){
          this.licenseCategorysAll = this.licenseCategorys.filter(item => {
            return (item.value+item.label).toString().includes(query);
          })
        }else {
          this.licenseCategorysAll = this.licenseCategorys.slice(0,19);
        }
      },
    }
  }
</script>

<style scoped>
  .formItem{
    margin: 2px 0;
  }
  .dataPicker{
    width: 100%;
  }
</style>
