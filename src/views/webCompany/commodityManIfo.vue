<template>
	<div id="container">
		<div class="commod-head">
			<div class="commod-head-left"><Add :ownedEnterpriseId="ownedEnterpriseId" @refresh="queryCommodityByKeyword" /></div>
			<div class="commod-head-left"><Delete ref="deleteDisable" @refresh="queryCommodityByKeyword" :deleteID="deleteID"/></div>
			<div id="commod-head-look">
				<el-button type="primary" name="commdQuery" @click="queryCommodityByKeyword">查询</el-button>
			</div>
			<div id="commod-head-search">
				<el-input v-model="keyword" placeholder="(海关)商品编号/企业商品编码/企业商品名称/创建人"  />
			</div>
		</div>
		<div class="commod-body"  >
			<el-table
        :data="commodityData"
        @row-click ="viewCommodity"
        @selection-change="handleSelectionChange"
        highlight-current-row
        style="width: 100%"
        stripe
      >
				<el-table-column type="selection" width="55" class="selection" prop='commod-checkeAll' />
        <el-table-column prop="commodityCustomsName" label="(海关)商品名称" width="180" />
				<el-table-column prop="commodityCustomsNo" label="(海关)商品编号" />
				<el-table-column prop="enterpriseNo" label="企业商品编码" />
				<el-table-column prop="enterpriseName" label="企业商品名称" />
				<el-table-column prop="specificationStr" label="规格/型号"  width="250px"/>
				<el-table-column prop="author" label="创建人" />
				<el-table-column prop="createTime" label="创建日期" :formatter="dateFormat" width="200px"/>
			</el-table>
      <Edit ref="commodityEdit" @refresh="queryCommodityByKeyword"/>
		</div>
		<div class="commod-buttom">
			<el-pagination
		    :current-page.sync="currentPage"
        @current-change = "queryCommodityByPage"
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
	import './../../assets/css/webCompany/commodityManIfo.css';
  import Add from './../../views/webCompany/commodityEdit/commodityAdd';//新增弹出框
  import Edit from './../../views/webCompany/commodityEdit/commodityEdit';//编辑弹出框
  import Delete from './../../views/webCompany/commodityEdit/commodityDelete';//删除弹出框
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
    }
  },
//定义初始化函数
  mounted(){
    let dataCompanyId=JSON.parse(localStorage.getItem('Id2'));
    this.$store.commit("updateCompanyId",dataCompanyId);
    this.queryCommodityByKeyword();
    },
  methods:{
    //商品编辑查看
    viewCommodity(row){
      let val = row;
      console.log(val);
      this.$refs.commodityEdit.showCommodity(val);
    },
    //选中商品时更改删除按钮的可编辑状态
    handleSelectionChange(val) {

      this.deleteID = val;
      console.log(this.deleteID);
      if(val.length>0){
       this.$refs.deleteDisable.deleteDisable();
      }else {
        this.$refs.deleteDisable.deleteNotDisable();
      }
    },
    //数组去掉空值
    arrClearEmpty(arr){
      for(let i = 0; i<arr.length; i++){
        if(arr[i] === ''){
          arr.splice(i,1);
          i --;
        }
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
    //分页查询商品信息
    queryCommodityByPage(currentPage){
      let params = {
        "ownedEnterpriseId":this.nickCompanyId,
        'pageNum':currentPage,
        'pageSize':this.pageSize,
        'keyword':this.keyword,
      };
      this.queryCommodity(params);
    },

    //关键字查询商品信息
    queryCommodityByKeyword(){
      let params = {
        "ownedEnterpriseId":this.nickCompanyId,
        'pageNum':this.currentPage,
        'pageSize':this.pageSize,
        'keyword':this.keyword,
      };
      this.queryCommodity(params);
    },

    //查询商品
    queryCommodity(param){
      this.commodityData = [];
      this.$axios3.get('commodity/findCommoditiesByKeyword',{
        params:param
      })
        .then((response) => {
          this.total=response.data.data.total;
          for(let i=0; i<response.data.data.list.length; i++){
            let dataRow = response.data.data.list[i];
            let specificationArr = [];
            let speEleNoName = [];
            let speNot = [];
            let specification = [];
            let specificationStr ='';
            this.ownedEnterpriseId =dataRow.ownedEnterpriseId;
            specificationArr[0] = dataRow.brandType;
            specificationArr[1] = dataRow.preferential;
            for(let i =0; i<dataRow.commodityElements.length;i++){
              speEleNoName.push(dataRow.commodityElements[i].elementsContent);
            }
            speNot[0] = dataRow.gtin;
            speNot[1] = dataRow.cas;
            speNot[2] = dataRow.others;
            specification = specificationArr.concat(speEleNoName.concat(speNot));
            this.arrClearEmpty(specification);
            specificationStr = specification.join('|');
              this.commodityData.push({
                commodityCustomsName:dataRow.commodityCustomsName,
                commodityCustomsNo:dataRow.commodityCustomsNo,
                enterpriseNo:dataRow.enterpriseNo,
                enterpriseName:dataRow.enterpriseName,
                preferential:dataRow.preferential,
                specification:dataRow.specification,
                author:dataRow.author,
                createTime:dataRow.createTime,
                lastEditTime:dataRow.lastEditTime,
                commodityId:dataRow.commodityId,
                legalUnit1:dataRow.legalUnit1,
                legalUnit2:dataRow.legalUnit2,
                brandType:dataRow.brandType,
                others:dataRow.others,
                commodityElements:dataRow.commodityElements,
                editor:dataRow.editor,
                cas:dataRow.cas,
                gtin:dataRow.gtin,
                specificationStr:specificationStr
           });

          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },
}
}
</script>
