<template>
  <div>
    <el-row style="margin: 10px 0;border-bottom: 1px solid #f2f2f2;padding: 10px 0">
      <el-col :span='2'>
        <el-button type="primary" @click="createCommodity">新增</el-button>
        <Add ref="commodityAdd" @query="queryCommodity"/>
      </el-col>
      <el-col :span='2'>
        <Delete ref="deleteDisable" :deleteID="deleteID" @query="queryCommodity"/>
      </el-col>
      <el-col :span='8' :offset="10">
        <el-input v-model="keyword" placeholder="(海关)商品编号/企业商品编码/企业商品名称/创建人" clearable/>
      </el-col>
      <el-col :span='2'>
        <el-button type="primary" @click="queryCommodity">查询</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="commodityData"
      @row-click ="viewCommodity"
      @selection-change="handleSelectionChange"
      highlight-current-row
      style="width: 100%"
      stripe
    >
      <el-table-column type="selection" width="55" class="selection" prop='commod-checkeAll' />
      <el-table-column prop="enterpriseCommodityNo" label="(企业)商品编码" />
      <el-table-column prop="enterpriseCommodityName" label="(企业)商品名称" />
      <el-table-column prop="customCommodityName" label="(海关)商品名称"/>
      <el-table-column prop="customCommodityNo" label="(海关)商品编号" />
      <el-table-column prop="domesticSourceCode" label="境内货源地" :formatter="domesticDestinationCodeName"/>
      <el-table-column prop="commoditySpecification" label="规格/型号" />
      <el-table-column prop="author" label="创建人" />
    </el-table>
    <Edit ref="commodityEdit" @query="queryCommodity"/>
    <el-pagination
      :current-page.sync="currentPage"
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
  import './../../assets/css/webCompany/commodityManIfo.css';
  import Add from './../../views/webCompany/commodityEdit/commodityAdd';//新增弹出框
  import Edit from './../../views/webCompany/commodityEdit/commodityEdit';//编辑弹出框
  import Delete from './../../views/webCompany/commodityEdit/commodityDel';//删除弹出框
  export default {
    //定义数据
    data () {
      return {
        keyword:'',
        commodityID:null,//商品ID
        ownedEnterpriseId:'',//所属企业id
        commodityData:[],
        currentPage: 1,
        deleteID: [],//商品多选数组
        total:0,
        pageSize:10,
        domesticSourceCodes:[]
      }
    },
    //定义组件
    components:{
      Add,
      Edit,
      Delete,
    },
    computed:{
      nickCompanyId(){
        return this.$store.state.nickCompanyId;
      },
      nickCompanyName(){
        return this.$store.state.nickCompanyName;
      }
    },
    mounted(){
      let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
      this.$store.commit("updateCompanyId",dataCompanyId);
      this.queryCommodity();
      this.loadStaticData();
    },
    methods:{
      createCommodity(){
        this.$refs.commodityAdd.dialogFormVisible = true;
        this.$refs.commodityAdd.isAdd = true;
        this.$refs.commodityAdd.initForm();
      },
      //商品编辑查看
      viewCommodity(row){
        this.$refs.commodityEdit.dialogFormVisible = true;
        this.$refs.commodityEdit.form = Object.assign({},row);
        this.$refs.commodityEdit.oldEnterpriseCommodityNo = row.enterpriseCommodityNo;
        this.$refs.commodityEdit.loadStaticData();
        setTimeout(() => {
          this.$refs.commodityEdit.getInitData();
        },300)
      },
      //选中商品时更改删除按钮的可编辑状态
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
      //分页查询商品信息
      pageChange(val){
        this.currentPage = val;
        this.queryCommodity();
      },
      //查询商品
      queryCommodity(){
        this.$axios3.post('export/getCommodity',{
          ownedEnterpriseId:this.nickCompanyId,
          ownedEnterpriseName:this.nickCompanyName,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          keywords:this.keyword,
        }).then((res) => {
          // console.log(res.data);
          if(res.data.state === true){
            this.total = res.data.data.total;
            this.commodityData = res.data.data.list;
          }else{
            this.commodityData = [];
          }
        }).catch((e) => {
          console.log(e);
        });
      },
      domesticDestinationCodeName(row,col){
        let val = row[col.property];
        if (val === undefined) {
          return "";
        }
        let name = this.domesticSourceCodes.find((item) => {
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
          this.$axios.get('static/pub_churchyarddestinationcode.json'),
        ]).then(this.$axios.spread((
            res_destinationcode
        ) => {
          this.domesticSourceCodes = res_destinationcode.data.RECORDS;
        })).catch((e) => {
          console.log(e);
        })
      },
    }
  }
</script>
