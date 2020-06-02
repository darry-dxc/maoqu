<template>
<div>
  <div id="container">
    <!--<div class="limit-head">-->
      <!--<div class="idea-top"><strong>权限管理</strong></div>-->
    <!--</div>-->
      <div class="limit-head-left">
        <Add />
      </div>
      <div class="limit-head-left">
        <Delete ref="deleteDisable" :deleteID="deleteID" />
      </div>
    <div class="limit-head-left">
      <Allot ref="allotDisable" :allotID="allotID"/>
    </div>
    <div class="limit-head-left">
          <Views ref="viewDisable" :viewID="viewID"/>
    </div>
    <div id="limit-head-look">
        <el-button type="primary" name="limitQuery" @click="findKeyRoles">查询</el-button>
    </div>
      <div id="limit-head-search">
        <el-input v-model="keyword" placeholder="请输入关键字" clearable/>
      </div>
      <div id ="limit-head-role">
        <el-select v-model="value" placeholder="请选择" @change="valueChange">
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
        </el-select>
      </div>
    </div>
<!--     表格 -->
    <div class="limit-body">
      <el-table
      :data="limitTableData"
      @selection-change="handleSelectionChange"
      stripe
      style="width: 100%"
      >
        <el-table-column type="selection" width="55" class="selection" prop='limit-checkeAll'/>
        <el-table-column prop="roleNo" label="显示序号">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleType" label="角色类型"/>
   <!--     <el-table-column prop="roleState" label="角色状态":formatter="roleFormat">
       </el-table-column> -->
       <el-table-column  label="角色状态">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              :type="scope.row.deleted?'success':'danger'"
              @click="handleDelete(scope.$index, scope.row)">{{scope.row.deleted?'启用':'停用'}}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="description" label="角色说明"/>
      </el-table>
      <Edit ref="limitEdit" />
    </div>
<!--     分页 -->
    <div class="limit-buttom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
    </div>
</div>
</template>

<script>
  import './../../assets/css/webManager/limitManage.css'
  import Add from './../../views/webManager/limitEdit/limitAdd';//新建弹出框
  import Edit from './../../views/webManager/limitEdit/limitEdit';//编辑弹出框
  import Delete from './../../views/webManager/limitEdit/limitDelete';//删除弹出框
  import Allot from './../../views/webManager/limitEdit/limitAllot';//分配资源弹出框
  import Views from './../../views/webManager/limitEdit/limitView';//查看资源弹出框
  export default {
    //定义数据
    data () {
      return {
        // 分页信息
        pageSize:10,
        total:0,
        currentPage:1,
        keyword:'',
        //表格
        limitTableData:[],
        options: [{
          value: '1',
          label: '角色名称'
        }, {
          value: '2',
          label: '角色编码'
        }, {
          value: '3',
          label: '角色状态'
        }],
        value: '1',
        deleteID: [],//商品多选数组
        allotID: [],
        viewID: [],
        selectedValue:'',
      }

    },
    //定义组件
    components:{
      Add,
      Edit,
      Delete,
      Allot,
      Views
    },
    //定义初始化函数
    mounted(){
      this.findAllRoles();
    },
    //定义方法
    methods: {
      //选择器变化
    valueChange(values){
      this.selectedValue = values;
      console.log(this.selectedValue);
    },
    //角色状态处理
    // roleFormat:function(row, column) {
    //   let role = row[column.property];
    //   if (role == true) {
    //     return "启用";
    //   }
    //   return"未启用";
    // },
   //关键字查询
    findKeyRoles(){
      let params = {};
       switch (this.selectedValue){
        case '1':params = {'roleName':this.keyword};break;
        case '2':params = {'roleNo':this.keyword};break;
        case '3':
        if(this.keyword=='启用'){
           params = {'isDeleted':true};
         }else if(this.keyword=='停用'){
           params = {'isDeleted':false};
         }
       break;
      }
        this.findRoles(params);
    },
    //全部查询
    findAllRoles(){
     let params = {};
    this.findRoles(params);
    },
    //权限查询
    findRoles(params){
      this.limitTableData = [];
      this.$axios1.post('/admin/findAllRoles', params)
        .then((response) => {
          console.log(response);
          this.total = response.data.total;
          this.limitTableData = response.data.list
        }).catch((e) => {
            console.log(e);
      });
    },
       //删除 分配资源、查看资源按钮显示
       handleSelectionChange(val) {
        console.log(val);
        this.deleteID = val;
        if(val.length>0){
         this.$refs.deleteDisable.deleteDisable();
         this.$refs.allotDisable.allotDisable();
         this.$refs.viewDisable.viewDisable();
        }else {
         this.$refs.deleteDisable.deleteNotDisable();
         this.$refs.allotDisable.allotNotDisable();
         this.$refs.viewDisable.viewNotDisable();
        }
      },
      //分页查询改变当前页面方法
      handleCurrentChange(currentPage){
        this.currentPage=currentPage;
        let params = {
          'pageNum':this.currentPage,
          'pageSize':this.pageSize,
         };
          this.findRoles(params);
      },
      //编辑和停用权限管理
      handleEdit(index,row){
        console.log(row);
        this.$refs.limitEdit.showLimit(row);
      },
      //启用 停用当前的权限
      handleDelete(index,row){
        this.$axios1.post('/admin/updateRoleStatus',{
          "roleName":row.roleName,
          "isDeleted":!row.deleted
        }).then((response) =>{
          this.$message.success('编辑成功');
          this.findAllRoles();

        }).catch((error) =>{
          console.log(error);
        })
      }
    },
  }

</script>

