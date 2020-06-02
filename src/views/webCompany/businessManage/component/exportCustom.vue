<template>
	<div>
    <el-collapse-transition>
      <div v-show="queryFlag2">
        <el-form :model="queryTextForm" label-width="120px">
         <el-row>
           <el-col :span="8">
             <el-form-item label="服务单编号:" class="search-form-item">
               <el-input v-model="queryTextForm.serviceNo" />
             </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="服务单状态:" class="search-form-item">
               <el-select  v-model="queryTextForm.serviceStatus" clearable style="width: 100%" @change="queryFind">
                 <el-option label="未派单" value="1"></el-option>
                 <el-option label="受理中" value="2"></el-option>
                 <el-option label="制单中" value="3"></el-option>
                 <el-option label="审核中" value="4"></el-option>
                 <el-option label="申报中" value="5"></el-option>
                 <el-option label="已完成" value="6"></el-option>
                 <el-option label="审核未通过" value="7"></el-option>
               </el-select>
            </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="合同号:" class="search-form-item">
               <el-input v-model="queryTextForm.contractNo" />
             </el-form-item>
           </el-col>
         </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="商品名称:" class="search-form-item"><el-input v-model="queryTextForm.commodityName"/>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="生产销售单位:" class="search-form-item"><el-input style="width: 100%" v-model="queryTextForm.psCompanyName"/>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="收发货人:" class="search-form-item">
              <el-input  v-model="queryTextForm.rsComanyName"/>
            </el-form-item></el-col>
          </el-row>
          <el-row>
            <el-col :span="8"><el-form-item label="境内货源地:" class="search-form-item"><el-input  v-model="queryTextForm.supplyArea"/>
            </el-form-item></el-col>
            <el-col  :span="8"><el-form-item label="贸易国家:" class="search-form-item"><el-input v-model="queryTextForm.tradeCountry" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="监管方式:" class="search-form-item">
              <el-select v-model="queryTextForm.dealMode" style="width:100%">
                <el-option
                  v-for="item in superviseModes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="出口口岸:" class="search-form-item">
                <el-input v-model="queryTextForm.exportPort"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人:" class="search-form-item">
                <el-input style="width:100%"  v-model="queryTextForm.author"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间:" class="search-form-item">
                <el-date-picker
                  style="width:100%"
                  v-model="queryTextForm.Date"
                  type="datetimerange"
                  range-separator="——"
                  start-placeholder="起始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  align="right">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-form-item style="float:right" class="search-form-item">-->
            <!--<el-button type="primary" @click="queryFind">查询</el-button>-->
          <!--</el-form-item>-->
        </el-form>
       </div>
     </el-collapse-transition>
<!-- 	报关的表格 -->
	<el-table
        :data="customData"
        border
        @row-click ="viewCustom"
        highlight-current-row
        style="width: 100%"
        stripe
      >
    <el-table-column header-align="center" label="基本信息
    (服务单编号/贸易国家/创建人/处理状态)" width="200">
     <template slot-scope="scope">
           <el-row>{{scope.row.serviceNo}}</el-row>
           <el-row>{{scope.row.tradeCountry}}</el-row>
           <el-row>
             <el-col :span="6">{{scope.row.author}}</el-col>
             <el-col :span="18" class="red">{{'【'+scope.row.serviceStatus+'】'}}</el-col>
           </el-row>
          </template>
    </el-table-column>
		<el-table-column header-align="center" prop="customName" label="商品名称"  />
		<el-table-column header-align="center" prop="custom1" label="生产销售单位" />
		<el-table-column header-align="center" prop="supplyArea" label="境内货源地" />
		<el-table-column header-align="center" prop="dealMode" label="监管方式" />
		<el-table-column header-align="center" prop="exportPort" label="出口口岸" />
		<el-table-column header-align="center" prop="createTime" label="创建时间" />
	</el-table>

  <!--  分页信息 -->
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    :total="total"
    style="float: right;">
    </el-pagination>

    <declarationInfo ref="declarationInfo" v-show="infoFlag2"/>
	</div>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import DeclarationInfo from './../declarationInfo';//报关
    export default {
        data() {
            return {
              infoFlag2:false,
            	customData:[
              {}
              ],
              queryTextForm:{
              Date:[],
              },
              currentPage: 1,
              total:0,
              pageSize:10,
              superviseModes:[],
            }
      },
      props:['queryFlag2','exportDivFlag','infoFlag'],
      mounted:function(){
      	this.queryFind();
      },
      components:{
        DeclarationInfo
      },
      computed:{
         ...mapState(['nickCompanyName','businessNo','businessId'])
      },
      methods:{
      	//点击查看某一行信息
      	viewCustom(row){
          console.log(row);
          this.$parent.infoFlag=true;
          this.$parent.exportDivFlag=false;
           this.$store.commit("updateBusinessId",row.businessId);
           this.$store.commit("updateBusinessNo",row.businessNo);
           this.$parent.findService2(row.businessId);
           this.$parent.findBusiness(row.businessId);
           this.$parent.findExport(row.businessId);
      	},
         //报关查询
        findCustoms(params){
         // console.log(params);
         this.customData = [];
         this.$axios4.post('/exportBusiAndDecFuzzySearch',params)
          .then((response) => {
            console.log(response);
            this.total = response.data.total;
            for(let i=0; i<response.data.total; i++){
             let dataRow = response.data.list[i];
             switch (dataRow.serviceStatus){
                case 1:dataRow.serviceStatus = '未派单';break;
                case 2:dataRow.serviceStatus = '受理中';break;
                case 3:dataRow.serviceStatus = '制单中';break;
                case 4:dataRow.serviceStatus = '审核中';break;
                case 5:dataRow.serviceStatus = '申报中';break;
                case 6:dataRow.serviceStatus = '已完成';break;
                case 7:dataRow.serviceStatus = '审核未通过';break;
              }
             this.customData.push(dataRow);
          }
          })
          .catch(function (error) {
            console.log(error);
          });
       },
       //报关单分页查询改变当前页面方法
      handleCurrentChange(currentPage){
      this.currentPage=currentPage;
      let params = {
        enterpriseName:this.nickCompanyName,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
       };
        this.findCustoms(params);
    },
    //条件查询事件
        queryFind(){
          let params={
            enterpriseName:this.nickCompanyName,
            serviceNo:this.queryTextForm.serviceNo,
            serviceStatus:this.queryTextForm.serviceStatus,
            contractNo:this.queryTextForm.contractNo,
            commodityName:this.queryTextForm.commodityName,
            psCompanyName:this.queryTextForm.psCompanyName,
            rsComanyName:this.queryTextForm.rsComanyName,
            supplyArea:this.queryTextForm.supplyArea,
            tradeCountry:this.queryTextForm.tradeCountry,
            dealMode:this.queryTextForm.dealMode,
            exportPort:this.queryTextForm.exportPort,
            author:this.queryTextForm.author,
            beginDate:this.queryTextForm.Date[0],
            endDate:this.queryTextForm.Date[1],
          };
         console.log(params);
         this.customData = [];
         this.$axios4.post('/exportBusiAndDecConditionSearch',params)
          .then((response) => {
            console.log(response);
            this.total = response.data.total;
            for(let i=0; i<response.data.total; i++){
             let dataRow = response.data.list[i];
              switch (dataRow.serviceStatus){
                case 1:dataRow.serviceStatus = '未派单';break;
                case 2:dataRow.serviceStatus = '受理中';break;
                case 3:dataRow.serviceStatus = '制单中';break;
                case 4:dataRow.serviceStatus = '审核中';break;
                case 5:dataRow.serviceStatus = '申报中';break;
                case 6:dataRow.serviceStatus = '已完成';break;
                case 7:dataRow.serviceStatus = '审核未通过';break;
              }
             this.customData.push(dataRow);
          }
          })
         .catch(function (error) {
            console.log(error);
          });
       },
      }
    }
</script>
<style>
  .search-form-item {
    margin: 2px;
  }
</style>
