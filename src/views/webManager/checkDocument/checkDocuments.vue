<template>
	<div >
		<el-row>
      <el-col :span="5">
        <el-radio-group v-model="checkType" @change="queryDocByKeyword">
          <el-radio-button  label="未审核"></el-radio-button>
          <el-radio-button  label="已审核"></el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="5" :offset="12">
        <el-input v-model="keyword" clearable placeholder="服务单号/报关员" @change="queryDocByKeyword"/>
      </el-col>
			<el-col :span="2">
				<el-button type="primary" @click="queryDocByKeyword">查询</el-button>
			</el-col>
		</el-row>
		<div class="commod-body" style="margin-top: 20px">
			<el-table :data="documentData" style="width: 100%" stripe>
        <el-table-column prop="serviceNo" label="服务单号" width="190"/>
				<el-table-column prop="teRsCompanyName" label="收发货人" />
				<el-table-column prop="supervisionMode" label="监管方式" :formatter="supervisionModeFormat"/>
				<el-table-column prop="deliveryNo" label="提运单号" width="180" />
				<el-table-column prop="receiverName" label="报关员" />
				<el-table-column prop="billStatus" label="审核状态" width="120">
					<template slot-scope="scope">
            <span v-if="scope.row.billStatus == 4">未审核</span>
            <span v-if="scope.row.billStatus != 4">{{ scope.row.billStatus == 5?'审核通过':'未通过' }}</span>
            <i
              class="el-icon-edit-outline"
              v-show="scope.row.hasOpinion == true && scope.row.billStatus != 5"
              @click="getAuditOpinionId(scope.row)"
              style="font-size: 22px"
            />
          </template>
				</el-table-column>
				<el-table-column prop="submitCheckTime" label="提交时间" width="180"/>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="viewDocument(scope.row)">预览</el-button>
					</template>
				</el-table-column>
			</el-table>
      <el-pagination
        :current-page.sync="currentPage"
        @current-change = "queryDocByKeyword"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
			<Views ref="DocumentInfo"></Views>
			<!--历史审核意见弹出框-->
		    <el-dialog
		      title="历史审核意见"
		      :visible.sync="dialogHistoryVisible"
		      width="800px"
		      append-to-body
		      >
		      <el-table
		        :data="historyTableData"
		        style="width: 100%">
		        <el-table-column width="100" type="index" label="序号" />
		        <el-table-column prop="auditTime" label="审核时间" width="250" />
		        <el-table-column prop="auditOpinion" label="审核意见" />
		      </el-table>
		    </el-dialog>
		</div>
	</div>
</template>

<script>
  import moment from 'moment';
  import './../../../../src/assets/css/base.css';
	import './../../../assets/css/webCompany/commodityManIfo.css';
	import Views from './viewDocumentInfo';
	export default {
	//定义数据
   data () {
	    return {
	    	dialogHistoryVisible:false,
        keyword:'',
        checkType:'未审核',
        buttonstate:1,
        auditStatus:1,
        documentData:[],
        currentPage: 1,
        total:0,
        currentPageOpinion: 1,
        // pageSize:10,
        dialogFormVisible:false,
        form:{},
        historyTableData:[],
        supervisionModes:[]
	   }
  },
  //定义组件
  components:{
  	Views,
  },

//定义初始化函数
  mounted(){
    this.loadStaticData();
    this.queryDocByKeyword();
    },
  methods:{
    //审核状态查询商品信息
    queryDocByKeyword(){
      if(this.checkType=='已审核'){
        this.buttonstate=1;
      }else {
        this.buttonstate=0;
      }
      this.documentData=[];
      this.$axios6.post('/getVerifiedOrUnverifiedInfos',{
          flag:this.buttonstate,//审核状态
          pageNum:this.currentPage,//当前页码
          pageSize:10,//一页显示的条数
          keywords:this.keyword,//查询关键字
      }).then((response) => {
        console.log(response.data);
        this.total=response.data.data.total;
        this.total = response.data.data.total;
        for (let i=0; i<response.data.data.list.length; i++) {
          let dataRow = response.data.data.list[i];
          this.documentData.push(dataRow);
        }
      });
    },
    //预览单证
    viewDocument(row){
		  // console.log(row);
      this.$refs.DocumentInfo.showDocumentInfo(row);
      if(this.checkType === '已审核'){
        this.$refs.DocumentInfo.auditOption = true;
      }else {
        this.$refs.DocumentInfo.auditOption = false;
      }
    },
    getAuditOpinionId(row){
      console.log('row',row)
      this.viewAuditOpinion(row.exDeclareDetailId);
    },
     //查看历史审核意见
    viewAuditOpinion(exDeclareDetailId){
      this.historyTableData = [];
      this.$axios6.get('/getAuditOpinion',{
        params:{
          exDeclareDetailId:exDeclareDetailId,
        }
      }).then((response) => {
        console.log(response.data.data);
        var res = response.data.data;
        if(res != undefined){
          for(let i=0; i<res.length; i++){
            this.historyTableData.push(res[i])
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.dialogHistoryVisible=true;
    },
    //请求本地数据
    loadStaticData(){
      this.$axios.all([
        this.$axios.get('static/pub_supervisemode.json'),//监管方式
      ]).then(this.$axios.spread((
        res_supervisemode,
      ) => {
        this.supervisionModes = res_supervisemode.data.RECORDS;
      })).catch((e) => {
        console.log(e);
      })
    },
    //监管方式查找中文名称
    supervisionModeFormat(row,col){
      let val = row[col.property];
      if (val === undefined || val == '') {
        return "";
      }
      else {
        var data = this.supervisionModes.find((item) => {
          if(item.value === val){
            return item;
          }
        });
        if(data != undefined){
          return data.label;
        }
        else {
          return '';
        }
      }
    }
  }
}
</script>
