<template>
  <div>
    <el-row style="background-color: white;padding: 12px;margin-bottom: 10px;line-height: 40px">
      <el-col :span="2" style="text-align: center">选择服务:</el-col>
      <el-col :span="12">
        <el-radio-group v-model="choosedBs" @change="$router.push({path: '/WebCompany/BusinessManage/ImportBs/imService?serviceType='+choosedBs})">
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
      <el-col :span="5"><el-input v-model="keyword" placeholder="业务单号/供货商/合同号" clearable/></el-col>
      <el-col :span="2" :offset="1"><el-button type="primary" @click="queryImportBsData">查询</el-button></el-col>
    </el-row>
    <el-table
      :data="importServiceData"
      border
      highlight-current-row
      style="width: 100%"
      height="600"
      stripe
      @row-click="pushToDetail"
    >
      <el-table-column header-align="center" label="业务单号/供货商/合同号"  width="240">
        <template slot-scope="scope">
         <span>
           {{scope.row.businessno}}/
           {{scope.row.terscomanyname}}/
           {{scope.row.contractno}}
         </span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="exportSpace" label="订舱"  />
      <el-table-column header-align="center" prop="exportCar" label="拖车" />
      <el-table-column header-align="center" prop="exportStif" label="熏蒸" />
      <el-table-column width="200" header-align="center" prop="exportCustom" label="报关">
        <template slot-scope="scope">
          <span>{{scope.row.serviceno}}</span><br /><span style="color: red;">【{{scope.row.servicestatus}}】</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="imServicePageChange"
      :current-page.sync="imServicePage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="imServiceTotal"
      style="float: right;"
    />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        choosedBs:'',
        queryText:'显示筛选',
        keyword:'',
        filterForm:{},
        currentPage:1,
        imServicePage:1,
        imServiceTotal:0,
        total:0,
        importBsData:[],
        importServiceData:[],
        importDecServiceData:[],
        serviceKeyword:''
      }
    },
    computed:{
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      }
    },
    mounted() {
    },
    activated(){
      this.queryImportBsData();
      this.choosedBs = ''
    },
    methods: {
      //进口主页模糊查询
      queryImportBsData(){
        this.importServiceData = [];
        let param = {
          enterpriseId:this.nickCompanyId,
          keyword:this.keyword,
          pageNum:this.imServicePage,
          pageSize:10,
        };
        this.$axios9.post('/businessFuzzySearch',param)
          .then((res) => {
            console.log(res.data)
            this.imServiceTotal = res.data.data.total;
            let resData = res.data.data.list;
            for(let i in resData){
              resData[i]['combination'] = resData[i].businessid+'/'+resData[i].terscomanyname+'/'+resData[i].contractno;
              switch (resData[i].servicestatus){
                case 1:resData[i].servicestatus = '未派单';resData[i].state = true;break;
                case 2:resData[i].servicestatus = '受理中';break;
                case 3:resData[i].servicestatus = '制单中';break;
                case 4:resData[i].servicestatus = '审核中';break;
                case 5:resData[i].servicestatus = '申报中';break;
                case 6:resData[i].servicestatus = '已完成';break;
                case 7:resData[i].servicestatus = '审核未通过';break;
              }
              this.importServiceData.push(resData[i]);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //业务单分页查询
      imServicePageChange(val){
        this.imServicePage = val;
        this.queryImportBsData();
      },
      pushToDetail(row,e,val){
        if(val.label === '报关'){
          this.$router.push({path:'/WebCompany/BusinessManage/ImportBs/imBsDetail?imDeclareServiceId='+row.imdeclareserviceid});
        }
      }
    }
  }
</script>

<style scoped>
  .filterForm{
    margin: 1px 0;
  }
</style>
