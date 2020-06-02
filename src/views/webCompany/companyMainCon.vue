<template>
  <div >
  		<el-row style="box-shadow: 2px 2px 5px #888888;background-color: white;margin-bottom: 16px">
	      <el-col :span="3">
	        <img src="../../assets/images/personImg/u384.png" />
	      </el-col>
	      <el-col :span="4" :offset="1" style="margin-top: 20px">
	        <p class="font-size-28"><strong>{{nickCompanyMan}},您好!</strong></p>
	        <br>
	        <p class="font-size-18">{{nickCompanyName}}</p>
	        <p class="font-size-18">岗位：{{nickCompanyPost}}</p>
	      </el-col>
	      <el-col :span="3" :offset="10">
	        <el-button type="primary" @click="dialogVisible = true" style="width: 200px;height: 60px;font-size: 20px;margin-top: 48px;background-color: #F49900;border-color: #F49900">发布新业务</el-button>
	      </el-col>
      </el-row>
        <el-dialog
          title="发布新业务"
          :visible.sync="dialogVisible"
          width="30%">
          <div style="width: 300px;margin: 0 auto">
            <el-button icon="el-icon-ump-jinkou1" @click="newImportOrder" type="primary" style="font-size: 18px;padding: 20px">进口业务</el-button>
            <el-button icon="el-icon-ump-chukoucaozuo" type="success" @click="newExportOrder" style="font-size: 18px;padding: 20px">出口业务</el-button>
          </div>
          <span slot="footer" class="dialog-footer" />
        </el-dialog>
	      <div style="padding: 10px;background-color: white">
          <el-row style="margin: 10px 0">
            <el-col :span="3">
              最近订单跟踪
            </el-col>
            <el-col :span="8" :offset="10">
              <el-input v-model="keyword" placeholder="业务单号/境内收发货人/合同号/国家/服务单号" clearable></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="queryBtn">查询</el-button>
            </el-col>
          </el-row>
          <el-tabs type="border-card" v-model="imOrExport">
            <el-tab-pane label="出口业务" name="export">
              <el-table :data="tableData" @row-click ="view" border stripe style="width: 100%" height="400">
                <el-table-column prop="combination" label="业务单号/境内收发货人/合同号" width="250" />
                <el-table-column prop="tradeCountry" label="国家" width="100" :formatter="countryName"/>
                <el-table-column  prop="bookspace" label="订舱" />
                <el-table-column prop="trailer" label="拖车" />
                <el-table-column prop="fumigate" label="熏蒸" />
                <el-table-column prop="serviceNo" label="报关">
                  <template slot-scope="scope">
                    <el-button type="text">{{scope.row.serviceNo}}</el-button><br /><span style="color: red;">【{{scope.row.serviceStatus}}】</span>
                    <el-button type="text" icon="el-icon-delete" circle style="font-size: 18px" @click.stop="delService(scope.$index, scope.row)" v-show="scope.row.state"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                style="float: right;">
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="进口业务" name="import">
              <el-table :data="importBsData" @row-click ="imBsView" border stripe style="width: 100%" height="400">
                <el-table-column prop="combination" label="业务单号/境内收发货人/合同号" width="250" />
                <el-table-column prop="tradecountry" label="国家" width="100" :formatter="countryName"/>
                <el-table-column  prop="bookspace" label="订舱" />
                <el-table-column prop="trailer" label="拖车" />
                <el-table-column prop="fumigate" label="熏蒸" />
                <el-table-column prop="serviceno" label="报关">
                  <template slot-scope="scope">
                    <el-button type="text">{{scope.row.serviceno}}</el-button><br /><span style="color: red;">【{{scope.row.servicestatus}}】</span>
                    <el-button type="text" icon="el-icon-delete" circle style="font-size: 18px" @click.stop="delImService(scope.$index, scope.row)" v-show="scope.row.state"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @current-change="imPageChange"
                :current-page="imCurrentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="imTotal"
                style="float: right;">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
  </div>
</template>

<script>
  import './../../../src/assets/css/base.css';
  import './../../assets/css/webCompany/commodityManIfo.css';
  import './../../assets/css/webCompany/companyMainCon.css';
  import DeclarationInfo from './../webCompany/businessManage/declarationInfo';//报关
  import { mapState } from 'vuex'
const cityOptions = ['国家', '订舱', '拖车', '报检', '熏蒸', '报关', '清关'];
export default {
	//定义数据
	data() {
		return {
      imOrExport:'export',
      dialogVisible:false,
    	exportDivFlag:true,
      infoFlag:false,
			checkAll: false,
			checkedCities: [],
			cities: cityOptions,
			isIndeterminate: true,
			keyword: '',
			pageSize:10,
			total:null,
			currentPage: 1,
      imCurrentPage:1,
      imTotal:0,
			tableData: [],
      importBsData:[],
      isPush:true,
      countrys:[]
		}

	},
	//定义组件
	components: {
		DeclarationInfo
	},
	//定义初始化函数
	mounted() {
    let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
    this.$store.commit("updateCompanyId",dataCompanyId);
    this.loadStaticData();
	},
  activated(){
    this.queryExportBusinessInfo();
    this.queryImportBsData();
  },
	computed: {
    nickCompanyId(){
      return this.$store.state.nickCompanyId;
    },
    nickCompanyName(){
      return this.$store.state.nickCompanyName;
    },
		...mapState(['nickCompanyMan', 'nickPost', 'nickCompanyPost']),
	},
	//定义方法
	methods: {
		handleCheckAllChange(val) {
			this.checkedCities = val ? cityOptions : [];
			this.isIndeterminate = false;
		},
		handleCheckedChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.cities.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.queryExportBusinessInfo();
		},
    //关键字查询
    queryBtn(){
      if(this.imOrExport === 'export')
        this.queryExportBusinessInfo();
      else
        this.queryImportBsData();
    },
    newImportOrder(){
       this.dialogVisible = false;
    	 this.$router.push({path:'/WebCompany/ServiceEcoSystem/PostContent?type=import'})
    },
    newExportOrder(){
       this.dialogVisible = false;
       this.$router.push({path:'/WebCompany/ServiceEcoSystem/PostContent?type=export'})
    },
    //进口主页模糊查询
    queryImportBsData(){
      this.importBsData = [];
      let param = {
        enterpriseId:this.nickCompanyId,
        keyword:this.keyword,
        pageNum:this.imCurrentPage,
        pageSize:10,
      };
      this.$axios9.post('/businessFuzzySearch',param)
        .then((response) => {
          console.log(response.data)
          this.imTotal = response.data.data.total;
          let resData = response.data.data.list;
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
            this.importBsData.push(resData[i]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //进口分页查询
    imPageChange(val){
		  this.imCurrentPage = val;
		  this.queryImportBsData();
    },
	//出口报关单信息模糊查询
		queryExportBusinessInfo(){
			this.tableData = [];
			let param = {
        enterpriseName:this.nickCompanyName,
        keyword:this.keyword,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
      };
    	this.$axios4.post('/businessFuzzySearch',param)
        .then((res) => {
          console.log(res.data)
          this.total = res.data.total;
          for(let i=0; i<res.data.list.length; i++){
            let dataRow = res.data.list[i];
            switch (dataRow.serviceStatus){
              case 1:dataRow.serviceStatus = '未派单';dataRow.state = true;break;
              case 2:dataRow.serviceStatus = '受理中';break;
              case 3:dataRow.serviceStatus = '制单中';break;
              case 4:dataRow.serviceStatus = '审核中';break;
              case 5:dataRow.serviceStatus = '申报中';break;
              case 6:dataRow.serviceStatus = '已完成';break;
              case 7:dataRow.serviceStatus = '审核未通过';break;
            }
            this.tableData.push(dataRow);
          }
        })
    	},
    //出口业务单查看
    view(row,e,val){
		  console.log(row)
      if(val.label === '报关'){
        this.$router.push({path:'/WebCompany/BusinessManage/ExportBs/exBsDetail?businessId='+row.businessId+'&exDeclareServiceId='+row.exDeclareServiceId});
      }
    },
    //进口业务查看
    imBsView(row,e,val){
      if(val.label === '报关'){
        this.$router.push({path:'/WebCompany/BusinessManage/ImportBs/imBsDetail?imDeclareServiceId='+row.imdeclareserviceid});
      }
    },
    //删除按钮
    delService(index,row){
      this.$confirm('此操作将永久删除该服务单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row.businessId)
        this.$axios4.post('/deleteExDecService',{
          exDeclareServiceId:row.exDeclareServiceId
        }).then((response) => {
             // console.log(response);
            if(response.data.code === 1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.queryExportBusinessInfo();
            }else if(response.data.code === 0){
              this.$message({
                type: 'error',
                message: '执行失败!'
              });
            }else if(response.data.code === 2){
              this.$message({
                type: 'error',
                message: '报关服务单不存在!'
              });
            }else {
              this.$message({
                type: 'error',
                message: '不是未派单状态!'
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    //进口报关单删除
    delImService(index,row){
      this.$confirm('此操作将永久删除该报关服务单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios9.post('/deleteDecService',{
          imDeclareServiceId:row.imdeclareserviceid,
          enterpriseId:this.nickCompanyId
        }).then((res) => {
          // console.log(res.data)
          if(res.data.code === 200){
            this.$message.success('删除成功!');
            this.queryImportBsData();
          }
        }).catch((e) => {
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    countryName(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.countrys.find((item) => {
        return item.value === val;
      });
      if(name !== null && name !== undefined){
        return name.label
      }else{
        return ''
      }
    },
    //请求本地数据
      loadStaticData(){
        this.$axios.all([
          this.$axios.get('static/pub_countryregion.json'),
        ]).then(this.$axios.spread((
            res_countryregion
        ) => {
          this.countrys = res_countryregion.data.RECORDS;
        })).catch((e) => {
          console.log(e);
        })
      },
  }
}
</script>

