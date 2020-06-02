<template>
	<div id="container">
    <el-row style="padding: 20px 10px">
      <el-col :span="5">
        <el-select v-model="selectedValue" placeholder="请选择" @change="valueChange" style="margin-right: 20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-input v-model="keyword" v-show="this.selectedValue == 1 || this.selectedValue == 2" placeholder="请输入关键字,例如：1" clearable />
        <el-date-picker
          v-model="searchdate"
          v-show="this.selectedValue == 3"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          style="width: 100%">
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <el-button @click="queryIdea" type="primary" style="margin-left: 20px">查询</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" :disabled="isUpdate == true" @click="uploadIdea">下载</el-button>
        <el-button type="primary" :disabled="isDeleted == true" @click="deleteIdeaConfirm">删除</el-button>
      </el-col>
    </el-row>
    <el-table :data="ideaTableData" @cell-click ="view"  @selection-change="selectItem" stripe style="width: 100%">
      <el-table-column type="selection" width="55" class="selection">
      </el-table-column>
      <el-table-column type="index" width="55" label="序号">
      </el-table-column>
      <el-table-column prop="submitUserName" label="用户姓名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话">
      </el-table-column>
      <el-table-column prop="ideaTitle" label="意见标题">
      </el-table-column>
      <el-table-column prop="submitTime" label="提交时间" >
      </el-table-column>
    </el-table>
    <ideaEdit ref="ideaEdit"></ideaEdit>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
      style="float: right;">
    </el-pagination>
	</div>
</template>

<script>
    import moment from 'moment';
    import ideaEdit from './ideaEdit'
	export default {
	//定义数据
	data () {
	    return {
        form:{
          submitUserName:'',
          phone:'',
          submitTime:'',
        },
        submitUserNames:[],
        isUpdate:true,
        isDeleted:true,
        keyword:'',
        ideaId:null,
        selectedValue:'1',
        ideaTableData:[],
        searchdate:[],
        selectID:[],
        pageSize:10,
        total:0,
        currentPage: 1,
        options: [{
          value: '1',
          label: '用户姓名'
        }, {
          value: '2',
          label: '意见标题'
        }, {
          value: '3',
          label: '提交时间'
        }],
	    }
	  },
  //定义组件
  components:{
    ideaEdit
		},
    //定义初始化函数
  mounted(){
  	this.queryIdea();
    },
    //定义方法
  methods:{
  	//搜索条件框显示
  	valueChange(val){
  	  console.log(val)
  		this.selectedValue = val;
  	},
  	handleCurrentChange(val) {
        this.currentPage = val;
        this.queryIdea();
   },
    //意见查询
    queryIdea(){
      if(this.selectedValue == 1){
        var paramUser = {
          'pageNum': this.currentPage,
          'pageSize':this.pageSize,
          'submitUsername':this.keyword,
        }
        this.$axios2.post('feedback/getFeedbackBySumbitUser',paramUser)
          .then((response) => {
            if(response.data.state){
              this.ideaTableData =response.data.data.list
              this.total = response.data.data.total;
            }
          }).catch(function (error) {
            console.log(error);
          });
      }
      else if (this.selectedValue == 2){
        var paramTitle = {
          'pageNum': this.currentPage,
          'pageSize':this.pageSize,
          'feedbackTitle':this.keyword,
        }
        this.$axios2.post('feedback/getFeedbackByTitle',paramTitle)
          .then((response) => {
            console.log('意见2',response)
            if(response.data.state){
              this.ideaTableData =response.data.data.list;
              this.total = response.data.data.total;
            }
          }).catch(function (error) {
            console.log(error);
          });
      }
      else if (this.selectedValue == 3){
        console.log('ll',this.searchdate)
        if(this.searchdate.length != 0){
          var paramTime = {
            'pageNum': this.currentPage,
            'pageSize':this.pageSize,
            'startTime':this.searchdate[0],
            'endTime':this.searchdate[1],
          }
          this.$axios2.post('feedback/findFeedbackByPageAndTime',paramTime)
            .then((response) => {
              console.log('意见3',paramTime,response);
              if(response.data.state){
                this.ideaTableData =response.data.data.list;
                this.total = response.data.data.total;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {
          this.$message.error('请选择时间！')
        }
      }
      else{
        var param = {
          'pageNum': this.currentPage,
          'pageSize':this.pageSize,
        }
        this.$axios2.post('feedback/getFeedbackList',param)
          .then((response) => {
            console.log('意见',response);
            if(response.data.state == true){
              this.ideaTableData =response.data.data.list;
              this.total = response.data.data.total;
            }
          }).catch(function (error) {
            console.log(error);
          });
      }
    },
    //删除、下载按钮显示
    selectItem(val){
  	  console.log(val)
    	this.selectID = val;
    	if(val.length>0){
	       this.isUpdate=false;
	       this.isDeleted=false;
	      }else {
	        this.isUpdate=true;
	       this.isDeleted=true;
	      }

    },
    //查看意见信息
    view(val){
      this.$refs.ideaEdit.showIdea(val)
    },
    //下载意见
    uploadIdea(){
      this.$confirm('确定下载选中意见?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.excelData = this.selectID //你要导出的数据list。
        this.export2Excel()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径
        const tHeader = ['序号','用户姓名','联系电话','意见标题','意见内容', '提交时间']; // 导出的表头名
        const filterVal = ['ideaId','submitUserName','phone', 'ideaTitle',
          'submitText','submitTime']; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, '意见管理excel');// 导出的表格名称，根据需要自己命名
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    deleteIdeaConfirm(){
      this.$confirm('确定删除选中意见?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ideaTableData.splice(this.selectID,this.selectID.length)
        var deleteIdArr = [];
        for (var i=0;i<this.selectID.length;i++){
          deleteIdArr.push(this.selectID[i].ideaId);
        }
        let param = {
          'ids':deleteIdArr,
        };
        this.$axios2.post('feedback/deleteFeedback',param)
          .then(function (response) {
            console.log(response);
            if(response.data.state == true){
              this.$message.success('删除成功！');
              this.queryIdea();
            }
            else {
              this.$message.error('删除失败！')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>
<style scoped>
  #container{

  }
</style>
