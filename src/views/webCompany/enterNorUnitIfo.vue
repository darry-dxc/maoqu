<template>
	<div id="container">
		<div class="client-head">
			<div class="client-head-left">
				<Add :ownedEnterpriseId="ownedEnterpriseId" />
			</div>
			<div class="client-head-left">
        <Delete ref="deleteDisable" :deleteID="deleteID"/>
			</div>
		</div>
		<div class="client-head">
			<div id="client-head-look">
				<el-button type="primary" class="btn" style="width: 100%" name="commdQuery" @click="queryDelivery">查询</el-button>
			</div>
			<div class="clint-search-lab">
				<label>海关代码</label>
			</div>
			<div class="client-head-search">
				<el-input v-model="customsNo" placeholder="请输入关键字" />
			</div>
      <div class="clint-search-lab">
				<label>单位名称</label>
			</div>
      <div class="client-head-search">
				<el-input v-model="enterpriseName" placeholder="请输入关键字" />
			</div>
		</div>
		<div class="client-body">
			<el-table
        :data="deliveryData"
        @selection-change="handleSelectionChange"
        @row-click ="viewDelivery"
        highlight-current-row
        stripe
        style="width: 100%"
      >
				<el-table-column type="selection" width="55" class="selection" prop='client-checkeAll'/>
				<el-table-column prop="enterpriseCustomsCode" label="海关代码" width="180" />
				<el-table-column prop="enterpriseName" label="单位名称" />
				<el-table-column prop="sourceOrDesination" label="境内货源地" />
				<el-table-column prop="author" label="创建人" />
				<el-table-column prop="createTime" label="创建日期" :formatter="dateFormat" />
				<el-table-column prop="lastEditTime" label="修改日期" :formatter="dateFormat" />
			</el-table>
      <Edit ref="editDelivery" :editIfo="editIfo"/>
		</div>
		<div class="client-buttom">
			<el-pagination
		    :current-page="currentPage"
        @current-change = "queryDelivery"
		    :page-size="pageSize"
		    layout="total, prev, pager, next, jumper"
		    :total="total"
		    style="float: right;">
    </el-pagination>
		</div>
	</div>
</template>
<script>
  import moment from 'moment';
	import './../../assets/css/webCompany/enterForeClientIfo.css';
	import Add from './../../views/webCompany/deliveryEdit/deliveryAdd';
  import Edit from './../../views/webCompany/deliveryEdit/deliveryEdit';
  import Delete from './../../views/webCompany/deliveryEdit/deliveryDelete';
	export default {
	//定义数据
  data () {
    return {
      enterpriseName:'',
      customsNo:'',
    	input:'',
      deliveryId:'',//收发货单位id
      ownedEnterpriseId:this.nickCompanyId,//所属企业ID
      deliveryData:[],
      pageSize:10,
      total:0,
    	currentPage: 1,
      deleteID: [],//收发货多选数组
      editIfo: {},//编辑时传输的信息
    }
  },
  //定义组件
  components:{
      Add,Edit,Delete,
		},
    //定义初始化函数
    mounted() {
        let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
        this.$store.commit("updateCompanyId",dataCompanyId);
        this.queryDelivery();
        console.log(this.nickCompanyId);
    },
    computed: {
      nickCompanyId() {
        return this.$store.state.nickCompanyId;
      }
    },
    //定义方法
  methods:{
    //查看收发货单位信息
    viewDelivery(row){
      console.log("传递的可查看参数");
      console.log(row);
      this.$refs.editDelivery.showDelivery(row);
    },

    //选中收发货时更改删除按钮的可编辑状态
    handleSelectionChange(val) {
      console.log(val);
      this.deleteID = val;
      if(val.length>0){
        this.$refs.deleteDisable.deleteDisable();
      }else {
        this.$refs.deleteDisable.deleteNotDisable();
      }
    },
    //时间格式化
    dateFormat:function(row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //收发货单位查询
    queryDelivery(){
  	  this.deliveryData = [];
  	  let param = {
        "ownedEnterpriseId":this.nickCompanyId,
        'pageNum':this.currentPage,
        'pageSize':this.pageSize,
        'enterpriseName':this.enterpriseName,
        'customsNo':this.customsNo,
      };
  	  this.$axios3.get('deliveryEnterprise/findDeliveryEnterpriseByKeyword',{
  	    params:param
      })
        .then((response) => {
          console.log(response);
         this.total=response.data.data.total;
          for(let i=0; i<this.total; i++){
            let dataRow = response.data.data.list[i];
            // this.ownedEnterpriseId =dataRow.ownedEnterpriseId;
            this.deliveryData.push({
              ownedEnterpriseId:dataRow.ownedEnterpriseId,
              ownedEnterpriseName:dataRow.ownedEnterpriseName,
              enterpriseCustomsCode:dataRow.enterpriseCustomsCode,
              enterpriseCreditCode:dataRow.enterpriseCreditCode,
              enterpriseName:dataRow.enterpriseName,
              enterpriseNature:dataRow.enterpriseNature,
              sourceOrDesination:dataRow.sourceOrDesination,
              dealMode:dataRow.dealMode,
              exemptionNature:dataRow.exemptionNature,
              exemptionMethod:dataRow.exemptionMethod,
              phone:dataRow.phone,
              fax:dataRow.fax,
              manufacturer:dataRow.manufacturer,
              productAddr:dataRow.productAddr,
              //author:'于力',
              author:dataRow.author,
              editor:dataRow.editor,
              createTime:dataRow.createTime,
              lastEditTime:dataRow.lastEditTime,
              deliveryId:dataRow.deliveryId,
              bsLicense:dataRow.bsLicense,//营业证书路径
              registrateCertificate:dataRow.registrateCertificate,//报关单位注册登记书路径
              recordForm:dataRow.recordForm,
            })
          }
        })
        .catch((error)=> {
          console.log(error);
      });
    },
}
}
</script>
