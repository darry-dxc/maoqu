<template>
    <div style="height: 800px;overflow: auto">
     <div class="personDataQueryTop" >
       <el-row>
         <i class="el-icon-edit-outline font-color-blue"></i>
         <span class="font-color-blue">   需要报检请点击此处并录入相关信息</span>
         <span class="font-color-red font-size-14">(底色为黄色的字段无需联合时间查询,人工清空时间框即可)</span>
       </el-row>
     </div>
       <!--基本查询-->
      <div class="personDataQueryBody" v-show="selectBodyBase">
        <el-form  :model="form" label-width="135px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业类别" class="formItem">
                <el-select v-model="form.companyType" filterable clearable size="small" @change="companyTypeChange" class="dataQueryTimeSelect">
                  <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进出口标志" class="formItem">
                <el-select v-model="form.imExportType" filterable clearable size="small" @change="imExportTypeChange" class="dataQueryTimeSelect">
                  <el-option
                    v-for="item in options2"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报关单号" class="formItem">
                <el-input v-model="form.imDeclareDetailId" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="统一编号" class="formItem">
                <el-input v-model="form.unifiedNo" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境内收发货人" class="formItem">
                <el-input v-model="form.teRsComanyName" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提运单号" class="formItem">
                <el-input v-model="form.deliveryNo" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="申报地海关" class="formItem">
                <el-select v-model="form.declareCustoms" :filter-method="declareCustomFilter" filterable clearable style="width: 100%;">
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
              <el-form-item label="是否结关" class="formItem" isClearance>
                <el-select v-model="form.isClearance" filterable clearable size="small" @change="isClearanceChange" class="dataQueryTimeSelect">
                  <el-option
                    v-for="item in options3"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="最近操作时间" class="formItem">
                <el-date-picker style="width: 100%"
                                v-model="form.dataQueryTimeSelectvalue"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="起始时间"
                                end-placeholder="结束时间"
                                size="small"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="formItem" label-width="10px">
                <el-radio-group v-model="radio" @change="selectedTimeChange">
                  <el-radio :label="1" >当天</el-radio>
                  <el-radio :label="2">本周</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col >
            <el-col :span="8"  >
              <el-form-item class="formItem" label-width="10px">
                <el-button  @click="dataQueryBybasic"  type="primary" size="small">查询</el-button>
                <el-button  @click="dataQueryReset"  type="primary" size="small" >重置</el-button>
                <el-button  @click="dataQuerySpecial"  type="primary" size="small" >高级查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--高级查询-->
      <div class="personDataQueryBody" v-show="selectBodySpecial">
        <el-form  :model="form" label-width="135px" >
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业类别" class="formItem">
                <el-select v-model="form.companyType" filterable clearable size="small" @change="companyTypeChange" class="dataQueryTimeSelect">
                  <el-option
                    v-for="item in options1"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="进出口标志" class="formItem">
                <el-select v-model="form.imExportType" filterable clearable size="small" @change="imExportTypeChange" class="dataQueryTimeSelect">
                  <el-option
                    v-for="item in options2"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贸易国别/输往国家" class="formItem">
                <el-select v-model="form.tradeCountry" :filter-method="tradeCountrysFilter" size="small" filterable clearable style="width: 100%;">
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="检验检疫受理机关" class="formItem">
                <el-input v-model="form.inspectionAndQuarantineOrgan" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="统一编号" class="formItem">
                <el-input v-model="form.unifiedNo" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="报关状态" class="formItem">
                <el-select v-model="form.billStatus" filterable clearable size="small" class="dataQueryTimeSelect" @change="billStatusChange">
                  <el-option
                    v-for="item in billStatus"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="最近操作时间" class="formItem">
                <el-date-picker style="width: 100%"
                                v-model="form.dataQueryTimeSelectvalue"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="起始时间"
                                end-placeholder="结束时间"
                                size="small"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="formItem" label-width="10px">
                <el-radio-group v-model="radio" @change="selectedTimeChange">
                  <el-radio :label="1" >当天</el-radio>
                  <el-radio :label="2">本周</el-radio>
                  <el-radio :label="3">近一月</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col >
            <el-col :span="8" >
              <el-form-item class="formItem" label-width="10px">
                <el-button  @click="dataQueryByadvanced"  type="primary" size="small">查询</el-button>
                <el-button  @click="dataQueryReset"  type="primary" size="small" >重置</el-button>
                <el-button  @click="dataQueryBase"  type="primary" size="small" >基本查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="margin: 10px">
        <el-row>
          <el-col :span="23">
            <!--<el-button type="primary" size="small">打印报关单</el-button>-->
            <el-button type="primary" @click="downloadExcel" size="small">列表导出</el-button>
            <!--<el-button type="primary" size="small">详情导出</el-button>-->
            <!--<el-button type="primary" @click="deleteData" size="small">删除</el-button>-->
          </el-col>
          <el-col :span="1">
            <el-popover
              placement="right"
              width="120"
              trigger="click">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedTypes" :min="1" @change="handleCheckedTypesChange">
                <el-checkbox v-for="type in types" :label="type" :key="type" class="checkbox">{{type}}</el-checkbox>
              </el-checkbox-group>
              <el-button icon="el-icon-menu" class="font-size-18"  type="primary" plain slot="reference" size="mini"></el-button>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin: 10px">
        <el-table class="dataQueryTable1" :data="dataQueryData" @row-click="selectedForFrint" @selection-change="deleteVal" stripe style="width: 100%" >
          <el-table-column type="selection" width="50" class="selection">
          </el-table-column>
          <el-table-column v-if="isInArray('统一编号')"  label="统一编号" prop="unifiedNo" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('海关编号')" label="海关编号" prop="customsNo" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('境内收发货人')" label="境内收发货人" prop="teRsComanyName" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('提运单号')" label="提运单号" prop="deliveryNo" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('进出口日期')" label="进出口日期" prop="importDate" header-align="center"width="170">
          </el-table-column>
          <el-table-column v-if="isInArray('监管方式')" label="监管方式" prop="supervisionMode" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('合同协议号')" label="合同协议号" prop="contractNo" header-align="center" width="130">
          </el-table-column>
          <el-table-column v-if="isInArray('商品项数')" label="商品项数" prop="commodityNum" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('运输工具名称')" label="运输工具名称" prop="conveyanceName" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('报关状态')" label="报关状态" prop="billStatus" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('申报单位名称')" label="申报单位名称" prop="decCompanyName" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('进出口标志')" label="进出口标志" prop="imexFlag" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('申报地海关')" label="申报地海关" prop="declareCustoms" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('入境/离境口岸')" label="入境/离境口岸" prop="importPort" header-align="center">
          </el-table-column>
          <el-table-column v-if="isInArray('贸易国')" label="贸易国" prop="tradeCountry" header-align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
    </div>
</template>

<script>
  const typeOptions = ['统一编号','海关编号','境内收发货人','提运单号',
    '进出口日期','监管方式','合同协议号','商品项数','运输工具名称', '报关状态',
    '申报单位名称','进出口标志','申报地海关','入境/离境口岸','贸易国'];
    export default {
      data () {
        return {
          excelData:[],
          declareCustoms:[],
          declareCustomsAll:[],
          tradeCountrys:[],
          tradeCountrysAll:[],
          superviseModes:[],
          superviseModesAll:[],
          currentPage:1,
    	    total:0,
          personDataQuery:'',
          dataQueryTimeSelectvalue:'',
          checkAll: true,
          checkedTypes: typeOptions,
          types:typeOptions,
          isIndeterminate: false,
          selectBodySpecial:false,
          selectBodyBase:true,
          radio:1,
          dataQueryData:[],
          form:{
            name1:'',
            companyType:'报关申报单位',
            imExportType:'进口',
            isClearance:'否',
            dataQueryTimeSelectvalue:[new Date(),new Date()]
          },
          options1: [{
            value: 'A',
            title: '报关申报单位',
            label: 'A-报关申报单位'
          }, {
            value: 'B',
            title: '消费使用/生产销售单位',
            label: 'B-消费使用/生产销售单位'
          }, {
            value: 'C',
            title: '报关收发货人',
            label: 'C-报关收发货人'
          }, {
            value: 'D',
            title: '报关录入单位',
            label: 'D-报关录入单位'
          }],
          options2: [{
            value: 'I',
            title: '进口',
            label: 'I-进口'
          }, {
            value: 'E',
            title: '出口',
            label: 'E-出口'
          }],
          options3: [{
            value: '0',
            title: '否',
            label: '0-否'
          }, {
            value: '1',
            title: '是',
            label: '1-是'
          }],
          billStatus: [{
            value: '2',
            title: '受理中',
            label: '2-受理中'
          }, {
            value: '3',
            title: '制单中',
            label: '3-制单中'
          }, {
            value: '4',
            title: '审核中',
            label: '4-审核中'
          }, {
            value: '5',
            title: '申报中',
            label: '5-申报中'
          }, {
            value: '6',
            title: '已完成',
            label: '6-已完成'
          }],
          imOrEm:'I',
          isOver:0,
          billFlag:2,
        }
    },
      //定义初始化函数
      mounted(){
        this.loadStaticData();
      },
      methods:{
        handleCheckAllChange(val) {
          this.checkedTypes = val ? typeOptions : ['统一编号'];
          this.isIndeterminate = false;
        },
        handleCheckedTypesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.types.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
        },
        //高级查询
        dataQuerySpecial(){
          this.form = {
            name1:'',
            companyType:'报关申报单位',
            imExportType:'进口',
            isClearance:'否',
            dataQueryTimeSelectvalue:[new Date(),new Date()]
          };
          this.radio = 1;
          this.selectBodyBase = false;
          this.selectBodySpecial = true;
        },
        //基本查询
        dataQueryBase(){
          this.form = {
            name1:'',
            companyType:'报关申报单位',
            imExportType:'进口',
            isClearance:'否',
            dataQueryTimeSelectvalue:[new Date(),new Date()]
          };
          this.radio = 1;
          this.selectBodySpecial = false;
          this.selectBodyBase = true;
        },
        //单选框时间选择
        selectedTimeChange(val){
          const end = new Date();
          const start = new Date();
          if(val === 1){
            this.form.dataQueryTimeSelectvalue = [start, end];
          }
          else if(val === 2){
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            this.form.dataQueryTimeSelectvalue = [start, end];
          }
          else if(val === 3){
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            this.form.dataQueryTimeSelectvalue = [start, end];
          }
        },
        //基本条件查询
        dataQueryBybasic(){
          this.dataQueryData = [];
          if(this.imOrEm === 'I'){
            let params = {
              flag:'import',
              imDeclareDetailId:this.form.imDeclareDetailId,
              unifiedNo:this.form.unifiedNo,
              teRsComanyName:this.form.teRsComanyName,
              deliveryNo:this.form.deliveryNo,
              declareCustoms:this.form.declareCustoms,
              isOver:this.isOver,
              pageNum:this.currentPage,
              pageSize:10,
              startTime:this.form.dataQueryTimeSelectvalue[0],
              endTime:this.form.dataQueryTimeSelectvalue[1],
            }
            console.log('查询',params);
            this.$axios10.post('personal/dataquery/basicquery',params)
              .then((response) =>{
                console.log('查询1',response);
                if(response.data.data !== null){
                  var dataRow = response.data.data.list;
                  for(let i in dataRow){
                    var dataChange = dataRow[i];
                    dataChange.billStatus = this.stateFormat(dataRow[i].billStatus);
                    dataChange.imexFlag = this.imexFormat(dataRow[i].imexFlag);
                    dataChange.tradeCountry = this.countryFormat(dataRow[i].tradeCountry);
                    dataChange.supervisionMode = this.superviseFormat(dataRow[i].supervisionMode);
                    dataChange.declareCustoms = this.declareFormat(dataRow[i].declareCustoms);
                    dataChange.importPort = this.declareFormat(dataRow[i].importPort);
                    this.dataQueryData.push(dataChange)
                  }
                }
                this.total = response.data.data.total;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else if(this.imOrEm === 'E'){
            let params = {
              flag:'export',
              exDeclareDetailId:this.form.imDeclareDetailId,
              unifiedNo:this.form.unifiedNo,
              teRsComanyName:this.form.teRsComanyName,
              deliveryNo:this.form.deliveryNo,
              declareCustoms:this.form.declareCustoms,
              isOver:this.isOver,
              pageNum:this.currentPage,
              pageSize:10,
              startTime:this.form.dataQueryTimeSelectvalue[0],
              endTime:this.form.dataQueryTimeSelectvalue[1],
            }
            console.log('查询',params);
            this.$axios10.post('personal/dataquery/basicquery',params)
              .then((response) =>{
                console.log('查询1',response);
                if(response.data.data !== null){
                  var dataRow = response.data.data.list;
                  for(let i in dataRow){
                    var dataChange = dataRow[i];
                    dataChange.billStatus = this.stateFormat(dataRow[i].billStatus);
                    dataChange.imexFlag = this.imexFormat(dataRow[i].imexFlag);
                    dataChange.tradeCountry = this.countryFormat(dataRow[i].tradeCountry);
                    dataChange.supervisionMode = this.superviseFormat(dataRow[i].supervisionMode);
                    dataChange.declareCustoms = this.declareFormat(dataRow[i].declareCustoms);
                    dataChange.importPort = this.declareFormat(dataRow[i].importPort);
                    this.dataQueryData.push(dataChange)
                  }
                }
                this.total = response.data.data.total;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        //高级条件查询
        dataQueryByadvanced(){
          this.dataQueryData = [];
          if(this.imOrEm === 'I'){
            let params = {
              flag:'import',
              tradeCountry:this.form.tradeCountry,
              unifiedNo:this.form.unifiedNo,
              inspectionAndQuarantineOrgan:this.form.inspectionAndQuarantineOrgan,
              billStatus:this.billFlag,
              pageNum:this.currentPage,
              pageSize:10,
              startTime:this.form.dataQueryTimeSelectvalue[0],
              endTime:this.form.dataQueryTimeSelectvalue[1],
            }
            console.log('查询',params);
            this.$axios10.post('personal/dataquery/advancedquery',params)
              .then((response) =>{
                console.log('查询1',response);
                if(response.data.data !== null){
                  var dataRow = response.data.data.list;
                  for(var i = 0; i < dataRow.length; i++){
                    var dataChange = dataRow[i];
                    dataChange.billStatus = this.stateFormat(dataRow[i].billStatus);
                    dataChange.imexFlag = this.imexFormat(dataRow[i].imexFlag);
                    dataChange.tradeCountry = this.countryFormat(dataRow[i].tradeCountry);
                    dataChange.supervisionMode = this.superviseFormat(dataRow[i].supervisionMode);
                    dataChange.declareCustoms = this.declareFormat(dataRow[i].declareCustoms);
                    dataChange.importPort = this.declareFormat(dataRow[i].importPort);
                    this.dataQueryData.push(dataChange)
                  }
                }
                this.total = response.data.data.total;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else if(this.imOrEm === 'E'){
            let params = {
              flag:'export',
              tradeCountry:this.form.tradeCountry,
              unifiedNo:this.form.unifiedNo,
              inspectionAndQuarantineOrgan:this.form.inspectionAndQuarantineOrgan,
              billStatus:this.billFlag,
              pageNum:this.currentPage,
              pageSize:10,
              startTime:this.form.dataQueryTimeSelectvalue[0],
              endTime:this.form.dataQueryTimeSelectvalue[1],
            }
            console.log('查询',params);
            this.$axios10.post('personal/dataquery/advancedquery',params)
              .then((response) =>{
                console.log('查询1',response);
                if(response.data.data !== null){
                  var dataRow = response.data.data.list;
                  for(var i = 0; i < dataRow.length; i++){
                    var dataChange = dataRow[i];
                    dataChange.billStatus = this.stateFormat(dataRow[i].billStatus);
                    dataChange.imexFlag = this.imexFormat(dataRow[i].imexFlag);
                    dataChange.tradeCountry = this.countryFormat(dataRow[i].tradeCountry);
                    dataChange.supervisionMode = this.superviseFormat(dataRow[i].supervisionMode);
                    dataChange.declareCustoms = this.declareFormat(dataRow[i].declareCustoms);
                    dataChange.importPort = this.declareFormat(dataRow[i].importPort);
                    this.dataQueryData.push(dataChange)
                  }
                }
                this.total = response.data.data.total;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        //报关单状态转换
        stateFormat(state){
          if (state == '1') {
            return "未派单";
          }
          else if (state == '2') {
            return "受理中";
          }
          else if (state == '3') {
            return "制单中";
          }
          else if (state == '4') {
            return "审核中";
          }
          else if (state == '5') {
            return "申报中";
          }
          else if (state == '6') {
            return "已完成";
          }
          else if (state == '7') {
            return "审核不通过";
          }
        },
        //进出口标志
        imexFormat(state) {
          if (state == 'import') {
            return "进口";
          }
          else if (state == 'export') {
            return "出口";
          }
        },
        //贸易国
        countryFormat(val) {
          if (val === undefined || val == '') {
            return "";
          }
          else {
            var data = this.tradeCountrys.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            console.log('data',data)
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //监管方式
        superviseFormat(val) {
          if (val === undefined || val == '') {
            return "";
          }
          else {
            var data = this.superviseModes.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            console.log('data',data)
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //申报地海关/进境关别/入境口岸
        declareFormat(val) {
          if (val === undefined || val == '') {
            return "";
          }
          else {
            var data = this.declareCustoms.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            console.log('data',data)
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //查询条件重置
        dataQueryReset(){
          this.form = {
            tradeCountry:'',
            inspectionAndQuarantineOrgan:'',
            unifiedNo:'',
            billStatus:'',
            imDeclareDetailId:'',
            teRsComanyName:'',
            deliveryNo:'',
            declareCustoms:'',
            companyType:'报关申报单位',
            imExportType:'进口',
            isClearance:'否',
            dataQueryTimeSelectvalue:[new Date(),new Date()]
          };
          this.imOrEm = 'I';
          THIS.isOver = 0;
        },
        //分页查询
        handleCurrentChange(val) {
	        this.currentPage = val;
          if(this.selectBodySpecial === false){
            this.dataQueryBybasic()
          }
          else{
            this.dataQueryByadvanced()
          }
	      },
        //选中的集装箱
        deleteVal(val){
          console.log(val)
          this.selectData = val;
        },
        //跳转制单页面可打印服务单
        selectedForFrint(row){
          console.log('uuu',row)
          if(row.imexFlag  == '进口'){
            this.$router.push({path:'/personImportBs?imDeclareServiceId='+row.imDeclareServiceId+
              '&imDeclareDetailId='+row.imDeclareDetailId+
              '&billStatus=数据查询'+
              '&businessId='+row.businessId});
          }
          else if(row.imexFlag  == '出口'){
            this.$router.push({path:'/personExportBs?exDeclareServiceId='+row.exDeclareServiceId+
              '&exDeclareDetailId='+row.id+
              '&billStatus=数据查询'+
              '&businessId='+row.businessId});
          }
        },
        //删除
        deleteData(){
          this.$confirm('是否删除选择数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            for (let i=0;i<this.selectData.length;i++){
              let index = this.dataQueryData.indexOf(this.selectData[i]);
              this.dataQueryData.splice(index,1);
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        //列表导出
        downloadExcel() {
          if(this.selectData != [] && this.selectData != undefined){
            this.$confirm('确定导出列表文件?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.excelData = this.selectData //你要导出的数据list。
              this.export2Excel()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          }
          else {
            this.$message.error('至少选择一项数据！');
          }
        },
        export2Excel() {
          var that = this;
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径
            const tHeader = ['统一编号','海关编号','境内收发货人','提运单号',
              '进出口日期','监管方式','合同协议号','商品项数','运输工具名称', '报关状态',
              '申报单位名称','进出口标志','申报地海关','入境/离境口岸','贸易国']; // 导出的表头名
            const filterVal = ['unifiedNo','customsNo', 'teRsComanyName',
              'deliveryNo','importDate','supervisionMode','contractNo',
              'commodityNum','conveyanceName','billStatus', 'decCompanyName',
              'imexFlag','declareCustoms','importPort','tradeCountry']; // 导出的表头字段名
            const list = that.excelData;
            const data = that.formatJson(filterVal, list);

            export_json_to_excel(tHeader, data, '数据查询列表导出excel');// 导出的表格名称，根据需要自己命名
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //判断数组是否存在某元素
        isInArray(value){
          for(var i = 0; i <this.checkedTypes.length; i++){
            if(value === this.checkedTypes[i]){
              return true;
            }
          }
          return false;
        },
        companyTypeChange(val){
          this.form.companyType = this.options1.find((item)=>{ return item.value === val }).title;
        },
        imExportTypeChange(val){
          console.log(val)
          this.imOrEm = val;
          this.form.imExportType = this.options2.find((item)=>{ return item.value === val }).title;
        },
        isClearanceChange(val){
          console.log(val)
          this.isOver = val;
          this.form.isClearance = this.options3.find((item)=>{ return item.value === val }).title;
        },
        billStatusChange(val){
          this.billFlag = val;
          this.form.billStatus = this.billStatus.find((item)=>{ return item.value === val }).title;
        },
        //请求本地数据
        loadStaticData(){
          this.$axios.all([
            this.$axios.get('static/pub_exportports.json'),//申报地海关/进境关别/入境口岸
            this.$axios.get('static/pub_supervisemode.json'),//监管方式
            this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
          ]).then(this.$axios.spread((
            res_exportports,
            res_supervisemode,
            res_countryregion,
          ) => {
            this.declareCustoms = res_exportports.data.RECORDS;
            this.declareCustomsAll = this.declareCustoms.slice(0,19);
            this.superviseModes = res_supervisemode.data.RECORDS;
            this.superviseModesAll = this.superviseModes.slice(0,19);
            this.tradeCountrys = res_countryregion.data.RECORDS;
            this.tradeCountrysAll = this.tradeCountrys.slice(0,19);
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
      },

    }
</script>

<style scoped>
  .formItem{
    margin-bottom: 1px;
  }
  .dataQueryTimeSelect{
    width: 100% !important;
  }
  .checkbox{
    padding-bottom: 15px;
    margin-left: 0px;
  }
</style>
