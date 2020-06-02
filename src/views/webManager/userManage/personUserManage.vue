<template>
    <div>
      <el-row style="margin: 30px 0">
        <el-col :span="5">
          <el-input v-model="keyword" placeholder="姓名/手机号/身份证号/业务范围" clearable />
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
          <el-button type="primary" @click="userQuery">查询</el-button>
          <el-button type="info" @click="intQuery">重置</el-button>
        </el-col>
      </el-row>
      <el-table :data="userData" stripe style="border-top: 1px solid #f4f4f4">
        <el-table-column prop="userName" label="姓名" width="180" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="IDnumber" label="身份证号" />
        <el-table-column prop="roleName" label="业务范围" />
        <el-table-column prop="registerTime" label="注册时间" />
        <el-table-column prop="userManageOpe1" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="scope.row.isDeleted === 1?'success':'danger'"
              @click="handleDelete(scope.$index, scope.row)">{{scope.row.isDeleted === 1 ?'启用':'停用'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <userEdit ref="userEdit" @query="userQuery"/>
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
  import userEdit from './component/userEdit'
  export default {
    data() {
      return {
        userData:[],
        currentPage:1,
        total:0,
        keyword:'',
        dateRange:[]
      }
    },
    components:{
      userEdit
    },
    mounted() {
      this.userQuery();
    },
    methods: {
      //查询个人用户
      userQuery(){
        let params = {
          keyword:this.keyword,
          pageNum:this.currentPage,
          pageSize:10
        }
        if(this.dateRange !== [] && this.dateRange !== null){
          params.beginDate = this.dateRange[0];
          params.endDate = this.dateRange[1];
        }
        this.$axios1.post('getPersonInfoForManage',params)
          .then((res) => {
            if(res.data.code === 200){
              this.total = res.data.data.total;
              this.userData = res.data.data.list
            }
        }).catch((e) => {
          console.log(e)
        })
      },
      //启停用户
      handleDelete(index,row){
        let isDeleted = '';
        if(row.isDeleted === 0)
          isDeleted = 1;
        else
          isDeleted = 0;
        this.$axios1.post('ableOrdisAbleAccount',{
          type:'个人',
          isDeleted:isDeleted,
          userId:row.userId
        }).then((res) => {
          console.log(res.data)
          if(res.data.code === 200){
            this.$message.success('操作成功!');
            this.userQuery();
          }else {
            this.$message.error('操作失败!');
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      //修改弹出框
      handleEdit(index,row){
        this.$refs.userEdit.dialogVisible = true;
        this.$refs.userEdit.userform = Object.assign({ userRolecheckList:['报关'] },row);
      },
      //分页查询
      pageChange(val){
        this.currentPage = val;
        this.userQuery();
      },
      //重置
      intQuery(){
        this.keyword = '';
        this.dateRange = [];
        this.userQuery();
      }
    }
  }
</script>

<style scoped>

</style>
