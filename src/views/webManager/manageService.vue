<template>
  <div>
      <!--<div class="service-top"><strong>客服管理</strong></div>-->
      <el-row style="margin: 20px 10px">
        <el-col :span="3">
          <el-button type="primary" @click="dialogVisible = true">新增客服</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button type="primary" @click="queryCustomerService">查询</el-button>
        </el-col>
      </el-row>
    <div>
      <el-table :data="serviceTableData" stripe style="width: 100%" class="serviceTable">
        <!--<el-table-column type="selection" >
        </el-table-column>-->
        <el-table-column prop="customerServiceName" label="客服姓名">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="qq" label="QQ号">
        </el-table-column>
        <el-table-column prop="serviceOperation" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="popEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteCustomerService(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="commod-buttom">
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
    <el-dialog title="新增客服" :visible.sync="dialogVisible" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="客服姓名:" prop="customerServiceName">
          <el-input v-model="form.customerServiceName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="QQ:" prop="qq">
          <el-input v-model="form.qq"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCustomerService">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改客服" :visible.sync="editServiceVisible" width="500px" >
      <el-form :model="editform" label-width="80px">
        <el-form-item label="客服姓名:" prop="customerServiceName">
          <el-input v-model="editform.customerServiceName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="editform.phone"></el-input>
        </el-form-item>
        <el-form-item label="QQ:" prop="qq">
          <el-input v-model="editform.qq"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editServiceVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCustomerService">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
    data() {
      return {
        form:{},
        editform:{},
        serviceTableData:[{
          /*serviceName:'',
          servicePhoneNumber:'',
          serviceQQ:'',
          serviceOperation:'',*/
        }],
        /*新增客服数据*/
        inputName:'',
        inputPhone:'',
        inputQQ:'',
        /*编辑客服数据*/
        changeName:'',
        changePhone:'',
        changeQQ:'',
        serviceId:'',
        /*--------*/
        loginName:'maomao',
        dialogVisible: false,
        editServiceVisible:false,
        pageSize:10,
        total:0,
        currentPage:1,
      }
    },
  //定义组件
  components:{
    },
    //定义初始化函数
  activated(){
    this.queryCustomerService();
  },
  methods:{
    //客服查询
    queryCustomerService(){
      let pram = {
        'pageNum':this.currentPage,
        'pageSize':this.pageSize,
      };
      setTimeout(() => {
        this.$axios2.post('customerService/getByPage', pram)
          .then((response) => {
            if (response.data.state) {
              this.serviceTableData = response.data.data.list
              this.total = response.data.data.total;
            } else {
              this.alert("出错了，查询不到客服列表。");
            }
          }).catch(function (error) {
            console.log(error);
          });
      },200);
    },
    //弹出编辑客服资料框
    popEditDialog(index, row) {
      this.editServiceVisible = true;
      this.editform = row;
    },
    //编辑客服资料
    editCustomerService(){
      this.$axios2.post('customerService/update',{
        'customerServiceId':this.editform.customerServiceId,
        'customerServiceName':this.editform.customerServiceName,
        'phone':this.editform.phone,
        'qq':this.editform.qq,
        'editor':'BBB',
      }).then((res) => {
        console.log(res.data)
        if(res.data.state){
          this.$message.success('客服编辑成功!')
        }else {
          this.$message.error('客服编辑失败!请重试')
        }
        this.editServiceVisible = false;
        this.queryCustomerService();
      }).catch((e) => {
        console.log(e);
      });
    },
    //删除客服
    deleteCustomerService(index, row) {
      console.log(row)
      this.$axios2.get('customerService/delete',{
        params:{
          'customerServiceId':row.customerServiceId,
        }
      }).then((res) => {
        if(res.data.state){
          this.$message.success('操作成功!')
        }else {
          this.$message.error('操作失败!')
        }
        this.queryCustomerService();
      }).catch((e) => {
        console.log(e);
      });
    },
    //新增客服
    addCustomerService(){
      this.$axios2.post('customerService/add',{
        'customerServiceName':this.form.customerServiceName,
        'phone':this.form.phone,
        'qq':this.form.qq,
        'author':'AAA',
      }).then((res) => {
        console.log(res.data)
        if(res.data.state){
          this.$message.success('客服添加成功!')
        }else {
          this.$message.error('客服添加失败!请重试')
        }
        this.dialogVisible = false;
        this.queryCustomerService();
      }).catch((e) => {
        console.log(e);
      });
      this.form = {}
    },
    //分页改变当前页面方法
    handleCurrentChange(val){
      this.currentPage = val;
      this.queryCustomerService();
    },
  }
}
</script>
