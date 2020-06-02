<template>
  <div>
    <el-row style="padding: 12px;margin-bottom: 10px;background-color: white;line-height: 40px">
        <el-col :span="2" style="text-align: center">选择服务:</el-col>
      <el-col :span="12">
        <el-radio-group v-model="choosedBs" @change="$router.push({path: '/WebCompany/BusinessManage/ExportBs/exService?serviceType='+choosedBs})">
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
          @click="$router.push({path: '/WebCompany/CompanyMainCon'})">
          <i class="el-icon-back" />
          返回主页
        </el-button>
      </el-col>
    </el-row>
    <el-row style="background-color: white;padding: 12px;">
      <el-col :span="5"><el-input v-model="keywordExport" placeholder="业务单号/境内收发货人/合同号" clearable /></el-col>
      <el-col :span="2" :offset="1"><el-button type="primary" @click="queryExportBusinessInfo">查询</el-button></el-col>
    </el-row>
	  <el-table
      v-show="exportFlag"
      :data="exportBsData"
      border
      @row-click ="viewBusiness"
      highlight-current-row
      style="width: 100%"
      height="600"
      stripe
    >
      <el-table-column header-align="center" label="业务单号/境内收发货人/合同号" prop="combination" width="240">
      </el-table-column>
      <el-table-column header-align="center" prop="exportSpace" label="订舱"  />
      <el-table-column header-align="center" prop="exportCar" label="拖车" />
      <el-table-column header-align="center" prop="exportStif" label="熏蒸" />
      <el-table-column prop="serviceNo" label="报关">
        <template slot-scope="scope">
          <span>{{scope.row.serviceNo}}</span><br /><span style="color: red;">【{{scope.row.serviceStatus}}】</span>
        </template>
      </el-table-column>
	  </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      style="float: right;"
    />
  </div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
            	exportFlag:true,
            	customFlag:false,
            	queryFlag:false,
				      queryFlag2:false,
              exportDivFlag:true,
              infoFlag:false,
            	keywordCustom:'',
              keywordExport:'',
            	exportBsData:[],
        		  currentPage: 1,
       			  total:0,
      		 	  pageSize:10,
              choosedBs:''
            }
        },
      components:{  },
      computed:{
         ...mapState(['nickCompanyName','businessNo','businessId'])
    },
    mounted(){
      // this.queryExportBusinessInfo();
    },
    activated() {
      this.queryExportBusinessInfo();
      this.choosedBs = ''
    },
    methods:{
    //点击其他服务
      serviceClick(){
         this.$message.warning('目前只支持报关服务');
      },
      //点击查看某一条信息
      viewBusiness(row,e,val){
        if(val.label === '报关'){
          this.$router.push({
            path:'/WebCompany/BusinessManage/ExportBs/exBsDetail?exDeclareServiceId='+row.exDeclareServiceId+'&businessId='+row.businessId
          })
        }
      },
      //出口报关单信息模糊查询
      queryExportBusinessInfo(){
        this.exportBsData = [];
        let param = {
          enterpriseName:this.nickCompanyName,
          keyword:this.keywordExport,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        };
        this.$axios4.post('/businessFuzzySearch',param)
          .then((res) => {
            console.log(res.data)
            this.total = res.data.total;
            for(let i=0; i<res.data.list.length; i++) {
              let dataRow = res.data.list[i];
              switch (dataRow.serviceStatus) {
                case 1:dataRow.serviceStatus = '未派单';dataRow.state = true;break;
                case 2:dataRow.serviceStatus = '受理中';break;
                case 3:dataRow.serviceStatus = '制单中';break;
                case 4:dataRow.serviceStatus = '审核中';break;
                case 5:dataRow.serviceStatus = '申报中';break;
                case 6:dataRow.serviceStatus = '已完成';break;
                case 7:dataRow.serviceStatus = '审核未通过';break;
              }
              this.exportBsData.push(dataRow);
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      //出口业务分页查询改变当前页面方法
      handleCurrentChange(val){
        this.currentPage=val;
        this.queryExportBusinessInfo();
      },
    }
  }
</script>
