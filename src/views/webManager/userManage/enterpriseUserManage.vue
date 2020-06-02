<template>
    <div>
      <el-row style="margin: 30px 0">
        <el-col :span="5">
          <el-input v-model="keyword" placeholder="企业名称/联系人/统一信用代码" clearable />
        </el-col>
        <el-col :span="2" style="text-align: right;line-height: 40px;margin-right: 12px">
          <span>注册时间: </span>
        </el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="enterpriseQuery">查询</el-button>
          <el-button type="info" @click="intQuery">重置</el-button>
        </el-col>
      </el-row>
      <el-table :data="enterpriseData" stripe style="border-top: 1px solid #f4f4f4">
        <el-table-column prop="enterpriseName" label="企业名称" width="180" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="address" label="公司地址" />
        <el-table-column prop="creditCode" label="统一信用代码" />
        <el-table-column prop="registerTime" label="注册时间" />
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEnterpriseEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="scope.row.isDeleted === 1?'success':'danger'"
              @click="handleEnterpriseDelete(scope.$index, scope.row)">{{scope.row.isDeleted === 1 ?'启用':'停用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <enterpriseEdit ref="enterpriseEdit" @query="enterpriseQuery"/>
      <el-pagination
        @current-change="pageChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
    </div>
</template>

<script>
  import enterpriseEdit from './component/enterpriseEdit'
  export default {
    data() {
      return {
        enterpriseData:[],
        currentPage:1,
        total:0,
        keyword:'',
        dateRange:[]
      }
    },
    components:{
      enterpriseEdit
    },
    mounted() {
      this.enterpriseQuery()
    },
    methods: {
      enterpriseQuery(){
        let params = {
          keyword:this.keyword,
          pageNum:this.currentPage,
          pageSize:10
        }
        if(this.dateRange !== [] && this.dateRange !== null){
          params.beginDate = this.dateRange[0];
          params.endDate = this.dateRange[1];
        }
        this.$axios1.post('getEnterpriseInfoForManage',params)
          .then((res) => {
            console.log(res.data)
            if(res.data.code === 200){
              this.total = res.data.data.total;
              this.enterpriseData = res.data.data.list
            }
          }).catch((e) => {
          console.log(e)
        })
      },
      //编辑弹出框
      handleEnterpriseEdit(index,row){
        console.log(row)
        this.$refs.enterpriseEdit.dialogVisible = true;
        this.$refs.enterpriseEdit.form = Object.assign({ userRolecheckList:['报关'] }, row);
      },
      //启停用户
      handleEnterpriseDelete(index,row){
        let isDeleted = '';
        if(row.isDeleted === 0)
          isDeleted = 1;
        else
          isDeleted = 0;
        this.$axios1.post('ableOrdisAbleAccount',{
          type:'企业',
          isDeleted:isDeleted,
          enterpriseId:row.enterpriseId
        }).then((res) => {
          console.log(res.data)
          if(res.data.code === 200){
            this.$message.success('操作成功!');
            this.enterpriseQuery();
          }else {
            this.$message.error('操作失败!');
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      pageChange(val){
        this.currentPage = val;
        this.enterpriseQuery();
      },
      //重置
      intQuery(){
        this.keyword = '';
        this.enterpriseQuery();
      }
    }
  }
</script>

<style scoped>

</style>
