<template>
	<div>
		<el-row style="margin: 10px 0;border-bottom: 1px solid #f2f2f2;padding: 10px 0">
      <el-col :span="2">
        <Add ref="editDelivery" :ownedEnterpriseId="ownedEnterpriseId" @query="queryDelivery"/>
        <Edit ref="edit" @query="queryDelivery"/>
      </el-col>
      <el-col :span="2">
        <Delete ref="deleteDisable" :deleteID="deleteID" @query="queryDelivery"/>
      </el-col>
      <el-col :span="4" :offset="12">
        <el-input v-model="keyword" placeholder="请输入关键字" clearable/>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="queryDelivery">查询</el-button>
      </el-col>
		</el-row>
			<el-table
        :data="exReceiveEnterprise"
        @selection-change="handleSelectionChange"
        @row-click ="viewDelivery"
        highlight-current-row
        stripe
      >
				<el-table-column type="selection" width="55" class="selection" prop='client-checkeAll'/>
				<el-table-column prop="enterpriseCustomsCode" label="海关代码(出口)" width="180" />
				<el-table-column prop="enterpriseName" label="企业名称" />
				<el-table-column prop="supervisionMode" label="监管方式" :formatter="supervisionmodeFormat"/>
        <el-table-column prop="inspectionAndQuarantineOrgan" label="检验检疫受理机关" :formatter="inspectionandquarantineorganFormat"/>
        <el-table-column prop="certificationAuthority" label="领证机关" :formatter="certificationauthorityFormat"/>
				<el-table-column prop="author" label="创建人" />
			</el-table>
			<el-pagination
		    :current-page="currentPage"
        @current-change = "pageChange"
		    :page-size="pageSize"
		    layout="total, prev, pager, next, jumper"
		    :total="total"
		    style="float: right;">
    </el-pagination>
  </div>
</template>
<script>
  import moment from 'moment';
	import Add from './../../views/webCompany/deliveryEdit/deliveryAddExport';
  import Edit from './../../views/webCompany/deliveryEdit/deliveryEditExport';
  import Delete from './../../views/webCompany/deliveryEdit/deliveryDeleteExport';
	export default {
	//定义数据
  data () {
    return {
      keyword:'',
      ownedEnterpriseId:this.nickCompanyId,//所属企业ID
      exReceiveEnterprise:[],
      pageSize:10,
      total:0,
    	currentPage: 1,
      deleteID: [],//收发货多选数组
      editIfo: {},//编辑时传输的信息,
      organizations:[],
      supervisemodes:[]
    }
  },
  //定义组件
  components:{
      Add,Delete,Edit
		},
    //定义初始化函数
    mounted() {
        let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
        this.$store.commit("updateCompanyId",dataCompanyId);
        this.queryDelivery();
        this.loadStaticData();
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
      this.$refs.edit.editDelivery(row.deliveryId);
    },
    //选中收发货时更改删除按钮的可编辑状态
    handleSelectionChange(val) {
      this.deleteID = val;
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
  	  this.$axios3.post('/deliveryEnterpriseFuzzySearch',{
        ownedEnterpriseId:this.nickCompanyId,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        keyword:this.keyword,
      }).then((res) => {
         console.log(res.data)
        if(res.data.code = 200){
          this.total = res.data.data.total;
          this.exReceiveEnterprise = res.data.data.list;
        }
      }).catch((e)=> {
          console.log(e);
      });
    },
    //分页查询
    pageChange(val){
      this.currentPage = val;
      this.queryDelivery();
    },
    //监管方式查找中文名称
    supervisionmodeFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.supervisemodes.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return ''
      }
    },
    //检验检疫受理机关查找中文名称
    inspectionandquarantineorganFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.organizations.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return ''
      }
    },
    //领证机关查找中文名称
    certificationauthorityFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.organizations.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return ''
      }
    },
    //请求本地数据
    loadStaticData(){
      this.$axios.all([
        this.$axios.get('static/pub_supervisemode.json'),//监管方式
        this.$axios.get('static/pub_checkout_organization.json'),//机关
      ]).then(this.$axios.spread((
        res_supervisemode,
        res_organization
      ) => {
        this.supervisemodes = res_supervisemode.data.RECORDS;
        this.organizations = res_organization.data.RECORDS;
      })).catch((e) => {
        console.log(e);
      })
    },
  }
}
</script>
<style scope>
</style>
