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
                    <el-input v-model="filterForm.customCommodityName" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="消费使用单位:" class="filterForm">
                    <el-input v-model="filterForm.csCompanyName" size="small"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="境内收发货人:" class="filterForm">
                    <el-input v-model="filterForm.teRsComanyName" size="small"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="入境口岸:" class="filterForm">
                    <el-input v-model="filterForm.importPort" size="small"/>
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
                  <el-form-item label="进境关别:" class="filterForm">
                    <el-input v-model="filterForm.enterBorder" size="small"/>
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
        :data="importDecServiceData"
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
            <span style="color: red">【{{+scope.row.serviceStatus !== null?scope.row.serviceStatus:'空' }}】</span>
          </template>
        </el-table-column>
        <el-table-column  prop="customCommodityName" label="商品名称"  />
        <el-table-column  prop="csCompanyName" label="消费使用单位" />
        <el-table-column  prop="declareCustoms" label="申报地海关" :formatter="csCompanyNameFormat"/>
        <el-table-column  prop="enterBorder" label="进境关别" :formatter="csCompanyNameFormat"/>
        <el-table-column  prop="originPort" label="启运港" :formatter="originPortFormat"/>
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
          importServiceData:[],
          importDecServiceData:[],
          serviceKeyword:'',
          supervisemodes:[],
          originPorts:[],
          exportports:[],
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
        }
      },
      mounted() {
        this.loadStaticData();
      },
      activated(){
        this.fuzzySearchdecServiceData();
      },
      methods: {
        //查询按钮
        queryBtn(){
          if(this.queryText === '显示筛选')
            this.fuzzySearchdecServiceData();
          else{
            this.queryImServiceDataByCondition();
          }
        },
        //进口服务单模糊查询
        fuzzySearchdecServiceData(){
          let param = {
            keyword:this.serviceKeyword,
            pageNum:this.currentPage,
            pageSize:10,
          };
          this.$axios9.post('/decServiceFuzzySearch',param)
            .then((res) => {
               console.log(res.data)
              if(res.data.code === 200){
                this.total = res.data.data.total;
                let resData = res.data.data.list;
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
                this.importDecServiceData = resData;
              }else {
                this.$message.error('查询失败!')
              }
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
              this.queryImServiceDataByCondition();
          },
          //进口服务单条件查询
          queryImServiceDataByCondition(){
            let param = {
              pageNum:this.currentPage,
              pageSize:10,
              serviceNo:this.filterForm.serviceNo,
              contractNo:this.filterForm.contractNo,
              customCommodityName:this.filterForm.customCommodityName,
              csCompanyName:this.filterForm.csCompanyName,
              teRsComanyName:this.filterForm.teRsComanyName,
              importPort:this.filterForm.importPort,
              tradeCountry:this.filterForm.tradeCountry,
              supervisionMode:this.filterForm.supervisionMode,
              enterBorder:this.filterForm.enterBorder,
              ahthor:this.filterForm.ahthor,
              beginDate:'',
              endDate:'',
              serviceStatus:this.filterForm.serviceStatus,
            };
            if(this.filterForm.createTime !== undefined){
              param.beginDate = this.filterForm.createTime[0];
              param.endDate = this.filterForm.createTime[1];
            }
            this.$axios9.post('/businessConditionSearch',param)
              .then((res) => {
                console.log(res.data)
                if(res.data.code === 200){
                  this.total = res.data.data.total;
                  let resData = res.data.data.list;
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
                  this.importDecServiceData = resData;
                }else {
                  this.$message.error('查询失败!')
                }
              }).catch((e) => {
                console.log(e);
            });
          },
        //筛选按钮点击事件
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
            path:'/WebCompany/BusinessManage/ImportBs/imBsDetail?imDeclareServiceId='+row.imDeclareServiceId
          })
        },
        pushToBusiness(){
          this.$router.push({path: '/WebCompany/BusinessManage/ImportBs'});
        },
        //时间格式化
        dateFormat:function(row, column) {
          let date = row[column.property];
          if (date === undefined) {
            return "";
          }
          return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        //申报地海关/进境关别查找中文名称
        csCompanyNameFormat(row,col){
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
        //启运港查找中文名称
        originPortFormat(row,col){
          let val = row[col.property];
          if (val === undefined) {
            return "";
          }
          let name = this.originPorts.find((item) => {
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
            this.$axios.get('static/pub_transportationport.json'),//机关
          ]).then(this.$axios.spread((
            res_exportports,
            res_transportationport
          ) => {
            this.exportports = res_exportports.data.RECORDS;
            this.originPorts = res_transportationport.data.RECORDS;
          })).catch((e) => {
            console.log(e);
          })
        },
      }
    }
</script>

<style scoped>
  .filterForm{
    margin: 1px 0;
  }
</style>
