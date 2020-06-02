<template>
	<div>
    <el-row style="margin: 10px 0;border-bottom: 1px solid #f2f2f2;padding: 10px 0">
      <el-col :span="2">
        <el-button type="primary" @click="add">新增</el-button>
        <Add ref="add" @query="query"/>
        <Edit ref="edit" @query="query"/>
      </el-col>
      <el-col :span="2">
        <el-button type="info" :disabled="isDelUseful" @click="deleteOverseasRsCompany">删除</el-button>
      </el-col>
      <el-col :span="4" :offset="14">
        <el-input placeholder="请输入关键字" v-model="keyword" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="query">查询</el-button>
      </el-col>
    </el-row>
			<el-table :data="OverseasCustomerData" @row-click ="view" @selection-change="handleSelectionChange" stripe style="width: 100%">
				<el-table-column type="selection" width="55" class="selection" prop='client-checkeAll'></el-table-column>
				<el-table-column prop="ovrscode" label="境外收发货人代码" width="180" />
				<el-table-column prop="customername" label="企业名称(外文)" />
				<el-table-column prop="arrivalcountry" label="启运国(地区)" :formatter="arrivalcountryFormat" />
				<el-table-column prop="entrytport" label="入境口岸" :formatter="entrytportFormat" />
				<el-table-column prop="tradecountry" label="贸易国别(地区)" :formatter="tradecountryFormat" />
				<el-table-column prop="author" label="创建人" />
			</el-table>
			<el-pagination
		    @current-change="handleCurrentChange"
		    :current-page="currentPage"
		    :page-size="pageSize"
		    layout="total, prev, pager, next, jumper"
		    :total="total"
		    style="float: right;">
    </el-pagination>
	</div>
</template>
<script>
	import Add from './../../views/webCompany/overseasCustomer/overseasCustomerAddImport';
  import Edit from './../../views/webCompany/overseasCustomer/overseasCustomerViewImport';
	export default {
    data () {
      return {
        inputshorthandNo:'',
        inputcustomerName:'',
        OverseasCustomerData:[],
        currentPage: 1,
        pageSize:10,
        total:10,
        ViewID:[],
        deleteID: [],//删除多选数组
        ownedEnterpriseId:this.nickCompanyId,//当前登录企业的ID
        keyword:'',
        isDelUseful:true,
        customerIdList:[],
        countryregions:[],
        domesticports:[]
      }
    },
   //定义组件
    components:{ Add, Edit },
    //定义初始化函数
   mounted(){
    let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
    this.$store.commit("updateCompanyId",dataCompanyId);
  	this.query();
  	this.loadStaticData()
   },
  computed:{
    nickCompanyMan(){
      return this.$store.state.nickCompanyMan;
    },
    nickCompanyId(){
      return this.$store.state.nickCompanyId;
    },
    nickCompanyName(){
      return this.$store.state.nickCompanyName;
    }
  },
  methods:{
    view(row){
      this.$refs.edit.dialogFormVisible = true;
      this.$refs.edit.editOvCustomer(row.customerid)
    },
    //选中信息时更改删除按钮的可编辑状态
    handleSelectionChange(val) {
      console.log(val)
      this.customerIdList = [];
      if(val.length > 0){
        this.isDelUseful = false
      }else {
        this.isDelUseful = true
      }
      for(let i in val){
        this.customerIdList.push(val[i].customerid)
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
    //境外客户查询
    query(){
      this.$axios3.post('/imOvSeascusFuzzySearch',{
        ownedEnterpriseId:this.nickCompanyId,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        keyword:this.keyword
      }).then((res) => {
          // console.log(res.data);
          if(res.data.code === 200){
            let resData = res.data.data;
            this.total = resData.total;
            this.OverseasCustomerData = resData.list
          }
      }).catch((e) => {
        console.log(e);
      });
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.query()
    },
    //添加按钮
    add(){
      this.$refs.add.dialogFormVisible = true;
      for (let i in this.$refs.add.form){
        this.$refs.add.form[i] = ''
      }
      this.$refs.add.fileList1 = [];
      this.$refs.add.name1 = '';
      this.$refs.add.fileList2 = [];
      this.$refs.add.name2 = '';
      this.$refs.add.form.ownedEnterpriseName = this.nickCompanyName;
      this.$refs.add.form.ownedEnterpriseId = this.nickCompanyId;
      this.$refs.add.form.author = this.nickCompanyMan;
      this.$refs.add.form.editor = this.nickCompanyMan;
    },
    //删除按钮
    deleteOverseasRsCompany(){
      console.log(this.customerIdList)
      this.$confirm('确认要删除已选中境外收发货人?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios3.post('/delOverseasRsCompany',{
          ownedEnterpriseId:this.nickCompanyId,
          customerIdList:this.customerIdList
        }).then((res) => {
          // console.log(res.data);
          if(res.data.code === 200){
            this.$message.success('操作成功!');
            this.query();
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
    //启运国查找中文名称
    arrivalcountryFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.countryregions.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return '';
      }
    },
    //贸易国别查找中文名称
    tradecountryFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.countryregions.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return '';
      }
    },
    //入境口岸查找中文名称
    entrytportFormat(row,col){
      let val = row[col.property];
      if (val === undefined) {
        return "";
      }
      let name = this.domesticports.find((item) => {
        return item.value === val;
      })
      if(name !== undefined){
        return name.label;
      }else{
        return '';
      }
    },
    //请求本地数据
    loadStaticData(){
      this.$axios.all([
        this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
        this.$axios.get('static/pub_domesticport.json'),//入境口岸
      ]).then(this.$axios.spread((
        res_countryregion,
        res_domesticport
      ) => {
       this.countryregions = res_countryregion.data.RECORDS;
       this.domesticports = res_domesticport.data.RECORDS;
      })).catch((e) => {
        console.log(e);
      })
    },
  }
}
</script>
