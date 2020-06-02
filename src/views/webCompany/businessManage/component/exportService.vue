<template>
    <div>
      <el-row style="background-color: white;padding: 12px;margin-bottom: 10px;line-height: 40px">
        <el-col :span="2" style="text-align: center">选择服务:</el-col>
        <el-col :span="12">
          <el-radio-group v-model="choosedBs">
            <el-radio-button :label="1">订舱</el-radio-button>
            <el-radio-button :label="2">拖车</el-radio-button>
            <el-radio-button :label="3">熏蒸</el-radio-button>
            <el-radio-button :label="4">报关</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="4" :offset="6">
          <el-button
            round
            style="background-color: #F49900;border-color: #F49900;color: white"
            @click="pushToBusiness">
            <i class="el-icon-back" />
            返回业务单信息
          </el-button>
        </el-col>
      </el-row>
      <el-row style="background-color: white;padding: 12px;">
        <el-col :span="6"><el-input v-model="serviceKeyword" placeholder="服务单编号/贸易国家/创建人/处理状态" clearable :disabled="queryText === '收起筛选'"/></el-col>
        <el-col :span="2" :offset="1"><el-button type="primary" @click="queryBtn">查询</el-button></el-col>
        <el-col :span="4">
          <el-button type="success" @click="showFilter()">
            {{queryText}}
            <i :class="queryText === '显示筛选'?'el-icon-arrow-right':'el-icon-arrow-down'" />
          </el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="queryText === '收起筛选'" style="background-color: white;border-bottom: 1px solid #f2f2f2;padding: 0 20px">
          <el-row >
            <el-form :model="filterForm" label-width="120px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="服务单编号:" class="filterForm">
                    <el-input v-model="filterForm.serviceNo" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务单状态:" class="filterForm">
                    <el-select v-model="filterForm.serviceStatus" size="small" placeholder="请选择" filterable clearable style="width: 100%">
                      <el-option
                        v-for="item in serviceStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同号:" class="filterForm">
                    <el-input v-model="filterForm.contractNo" size="small"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="商品名称:" class="filterForm">
                    <el-input v-model="filterForm.commodityName" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="生产销售单位:" class="filterForm">
                    <el-input v-model="filterForm.psCompanyName" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="境内收发货人:" class="filterForm">
                    <el-input v-model="filterForm.teRsCompanyName" size="small"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="离境口岸:" class="filterForm">
                    <el-input v-model="filterForm.exportPort" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="贸易国别(地区):" class="filterForm">
                    <el-input v-model="filterForm.tradeCountry" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="监管方式:" class="filterForm">
                    <el-input v-model="filterForm.supervisionMode" size="small"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="出口关别:" class="filterForm">
                    <el-input v-model="filterForm.exportPort" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建人:" class="filterForm">
                    <el-input v-model="filterForm.ahthor" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建时间:" class="filterForm">
                    <el-date-picker
                      size="small"
                      style="width: 100%"
                      v-model="filterForm.createTime"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-DD hh:mm:ss"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-table
        :data="exportDecServiceData"
        @row-click="viewBsInfo"
        highlight-current-row
        style="width: 100%"
        stripe
        :height="queryText === '收起筛选'?460:600"
        center
      >
        <el-table-column header-align="center" label="基本信息(服务单编号/贸易国家/创建人/处理状态)" width="200">
          <template slot-scope="scope">
            {{scope.row.serviceNo !== null?scope.row.serviceNo:'空'}}/
            {{scope.row.tradeCountry !== null?scope.row.tradeCountry:'空'}}/
            {{scope.row.author !== null?scope.row.author:'空'}}/
            <span style="color: red">【{{scope.row.serviceStatus !== null?scope.row.serviceStatus:'空' }}】</span>
          </template>
        </el-table-column>
        <el-table-column  prop="commodityName" label="商品名称"  />
        <el-table-column  prop="psCompanyName" label="生产销售单位" />
        <el-table-column  prop="declareCustoms" label="申报地海关" :formatter="declareCustomsFormat"/>
        <el-table-column  prop="exportBorder" label="出境关别" :formatter="declareCustomsFormat"/>
        <el-table-column  prop="exportPort" label="离境口岸" :formatter="exportPortFormat"/>
        <el-table-column  prop="createTime" label="创建时间" />
      </el-table>
      <el-pagination
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;"
      />
    </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
    export default {
      data() {
        return {
          choosedBs:4,
          queryText:'显示筛选',
          keyword:'',
          filterForm:{

          },
          currentPage:1,
          imServicePage:1,
          imServiceTotal:0,
          total:0,
          importBsData:[],
          exportPort:[],
          declareCustoms:[],
          exportDecServiceData:[],
          importDecServiceData:[],
          serviceKeyword:'',
          serviceStatus:[{
            value: 1, label: '未派单'
          },{
            value: 2, label: '受理中'
          },{
            value: 3, label: '制单中 '
          },{
            value: 4, label: '审核中'
          },{
            value: 5, label: '申报中 '
          },{
            value: 6, label: '已完成'
          },{
            value: 7, label: '审核未通过'
          }]
        }
      },
      computed:{
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        }
      },
      mounted() {
        this.queryBtn();
        this.loadStaticData();
      },
      activated(){
        // this.fuzzySearchdecServiceData();
      },
      methods: {
        //查询按钮
        queryBtn(){
          if(this.queryText === '显示筛选')
            this.fuzzySearchdecServiceData();
          else
            this.queryExServiceDataByCondition();
        },
        //出口服务单模糊查询
        fuzzySearchdecServiceData(){
          let param = {
            keyword:this.serviceKeyword,
            pageNum:this.currentPage,
            pageSize:10
          };
          this.$axios4.post('/exportBusiAndDecFuzzySearch',param)
            .then((res) => {
              console.log(res.data)
              this.total = res.data.total;
              let resData = res.data.list;
              for(let i in resData){
                switch (resData[i].serviceStatus){
                  case 1:resData[i].serviceStatus = '未派单';resData[i].state = true;break;
                  case 2:resData[i].serviceStatus = '受理中';break;
                  case 3:resData[i].serviceStatus = '制单中';break;
                  case 4:resData[i].serviceStatus = '审核中';break;
                  case 5:resData[i].serviceStatus = '申报中';break;
                  case 6:resData[i].serviceStatus = '已完成';break;
                  case 7:resData[i].serviceStatus = '审核未通过';break;
                }
              }
              this.exportDecServiceData = resData;
            }).catch((e) => {
              console.log(e);
            });
          },
          //报关单分页查询
          pageChange(val){
            this.currentPage = val;
            if(this.queryText === '显示筛选')
              this.fuzzySearchdecServiceData();
            else
              this.queryExServiceDataByCondition();
          },
          //出口服务单条件查询
          queryExServiceDataByCondition(){
            let param = {
              tradeCountry:this.filterForm.tradeCountry,
              contractNo:this.filterForm.contractNo,
              serviceNo:this.filterForm.serviceNo,
              serviceStatus:this.filterForm.serviceStatus,
              commodityName:this.filterForm.commodityName,
              psCompanyName:this.filterForm.psCompanyName,
              teRsCompanyName:this.filterForm.teRsCompanyName,
              exportPort:this.filterForm.exportPort,
              supervisionMode:this.filterForm.supervisionMode,
              exportBorder:this.filterForm.exportBorder,
              ahthor:this.filterForm.ahthor,
              beginDate:null,
              endDate:null,
              pageNum:this.currentPage,
              pageSize:10,
            };
            if(this.filterForm.createTime !== undefined){
              param.beginDate = this.filterForm.createTime[0];
              param.endDate = this.filterForm.createTime[1];
            }
            this.$axios4.post('/exportBusiAndDecConditionSearch',param)
              .then((res) => {
                console.log(res.data)
                this.total = res.data.total;
                let resData = res.data.list;
                for(let i in resData){
                  switch (resData[i].serviceStatus){
                    case 1:resData[i].serviceStatus = '未派单';resData[i].state = true;break;
                    case 2:resData[i].serviceStatus = '受理中';break;
                    case 3:resData[i].serviceStatus = '制单中';break;
                    case 4:resData[i].serviceStatus = '审核中';break;
                    case 5:resData[i].serviceStatus = '申报中';break;
                    case 6:resData[i].serviceStatus = '已完成';break;
                    case 7:resData[i].serviceStatus = '审核未通过';break;
                  }
                }
                this.exportDecServiceData = resData;
              }).catch((e) => {
                console.log(e);
            });
          },
        showFilter(){
          if(this.queryText === '显示筛选')
            this.queryText = '收起筛选';
          else{
            for(let i in this.filterForm){
              this.filterForm[i] = ''
            }
            this.queryText = '显示筛选';
            this.fuzzySearchdecServiceData();
          }
        },
        viewBsInfo(row){
          this.$router.push({
            path:'/WebCompany/BusinessManage/ExportBs/exBsDetail?exDeclareServiceId='+row.exDeclareServiceId+'&businessId='+row.businessId
          })
        },
        pushToBusiness(){
          this.$router.push({path: '/WebCompany/BusinessManage/ExportBs'});
        },
        //申报地海关/进境关别查找中文名称
        declareCustomsFormat(row,col){
          let val = row[col.property];
          if (val === undefined) {
            return "";
          }
          let name = this.declareCustoms.find((item) => {
            return item.value === val;
          })
          if(name !== undefined)
            return name.label;
          else
            return '';
        },
        //启运港查找中文名称
        exportPortFormat(row,col){
          let val = row[col.property];
          if (val === undefined) {
            return "";
          }
          let name = this.exportports.find((item) => {
            return item.value === val;
          })
          if(name !== undefined)
            return name.label;
          else
            return '';
        },
        //请求本地数据
        loadStaticData(){
          this.$axios.all([
            this.$axios.get('static/pub_exportports.json'),
            this.$axios.get('static/pub_domesticport.json'),
          ]).then(this.$axios.spread((
            res_exportports,
            res_domesticport
          ) => {
            this.declareCustoms = res_exportports.data.RECORDS;
            this.exportports = res_domesticport.data.RECORDS;
          })).catch((e) => {
            console.log(e);
          })
        },
        //时间格式化
        dateFormat:function(row, column) {
          let date = row[column.property];
          if (date === undefined) {
            return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
      }
    }
</script>

<style scoped>
  .filterForm{
    margin: 1px 0;
  }
</style>
