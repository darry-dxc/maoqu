<template>
  <el-tabs type="border-card">
    <el-tab-pane label="个人用户">
      <el-form :model="personLogForm">
        <el-row>
          <el-col :span="3">
            <el-form-item label="姓名：" label-width="60px">
              <el-input size="small" v-model="personLogForm.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号：" label-width="80px">
              <el-input size="small" v-model="personLogForm.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="操作类型：" label-width="100px">
              <el-input size="small" v-model="personLogForm.operateType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间：" label-width="100px">
              <el-date-picker
                v-model="personLogForm.operateDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
              style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-form-item >
              <el-button type="primary" size="small" @click="personDataQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table class="systemLogTable" :data="personLogData" stripe style="width: 100%">
            <el-table-column prop="userName" label="姓名" width="160"/>
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="operateType" label="操作类型"/>
            <el-table-column prop="operateContent" label="操作描述"/>
            <el-table-column prop="operateTime" label="操作时间"/>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total"
            style="float: right;">
          </el-pagination>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="企业用户">
      <el-form :model="companyLogForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="企业名称：" label-width="90px">
              <el-input size="small" v-model="companyLogForm.enterpriseName" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="操作类型：" label-width="100px">
              <el-input size="small" v-model="companyLogForm.operateType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间：" label-width="100px">
              <el-date-picker
                v-model="companyLogForm.operateDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-button type="primary" size="small" @click="companyDataQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table class="systemLogTable" :data="companyLogData" stripe style="width: 100%">
            <el-table-column prop="enterpriseName" label="企业名称" width="160"/>
            <el-table-column prop="operateType" label="操作类型" />
            <el-table-column prop="operateContent" label="操作描述" />
            <el-table-column prop="operateTime" label="操作时间" />
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total1"
            style="float: right;">
          </el-pagination>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="管理员">
      <el-form :model="managerLogForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="管理员名称：" label-width="100px">
              <el-input size="small" v-model="managerLogForm.adminName" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="操作类型：" label-width="100px">
              <el-input size="small" v-model="managerLogForm.operateType" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间：" label-width="100px">
              <el-date-picker
                v-model="managerLogForm.operateDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="small"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="3">
            <el-form-item>
              <el-button type="primary" size="small" @click="managerDataQuery">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-table class="systemLogTable" :data="managerLogData" stripe style="width: 100%">
            <el-table-column prop="adminName" label="管理员名称" width="160" />
            <el-table-column prop="operateType" label="操作类型" />
            <el-table-column prop="operateContent" label="操作描述" />
            <el-table-column prop="operateTime" label="操作时间" />
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total2"
            style="float: right;">
          </el-pagination>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import './../../assets/css/webManager/systemLog.css'
    export default {
      //定义数据
      data () {
        return {
          personLogForm:{
            userName:'',
            phone:'',
            operateType:'',
            operateDate:''
          },
          companyLogForm:{
            enterpriseName:'',
            operateType:'',
            operateDate:''
          },
          managerLogForm:{
            adminName:'',
            operateType:'',
            operateDate:''
          },
          personLogData:[],
          companyLogData:[],
          managerLogData:[],
          currentPage:1,
          total:0,//日志数量
          currentPage1:1,
          total1:0,//日志数量
          currentPage2:1,
          total2:0,//日志数量
        }
        },
      //定义初始化函数
      mounted(){
        this.personDataQuery();
        this.companyDataQuery();
        this.managerDataQuery()
      },
        methods:{
          //分页
          handleCurrentChange(val){
            this.currentPage = val;
            this.personDataQuery()
          },
          handleCurrentChange1(val){
            this.currentPage1 = val;
            this.companyDataQuery();
          },
          handleCurrentChange2(val){
            this.currentPage2 = val;
            this.managerDataQuery();
          },
          //个人日志
          personDataQuery(){
            this.personLogData = [];
            var param = {
              userName:this.personLogForm.userName,
              phone:this.personLogForm.phone,
              operateType:this.personLogForm.operateType,
              startTime:this.personLogForm.operateDate[0],
              endTime:this.personLogForm.operateDate[1],
              pageNum:this.currentPage,
              pageSize:10,
            };
            console.log('个人',param)
            this.$axios5.post('syslog/userlog/getUserLogs',param)
              .then((response) => {
                console.log(response);
                if(response.data.data.list.length != 0){
                  for(let i=0; i<response.data.data.list.length; i++){
                    let dataRow = response.data.data.list[i];
                    this.personLogData.push(dataRow);
                  }
                  this.total = response.data.data.total;
                }
                else {
                  this.total = 0;
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //企业日志
          companyDataQuery(){
            this.companyLogData = [];
            var param = {
              enterpriseName:this.companyLogForm.enterpriseName,
              operateType:this.companyLogForm.operateType,
              startTime:this.companyLogForm.operateDate[0],
              endTime:this.companyLogForm.operateDate[1],
              pageNum:this.currentPage1,
              pageSize:10,
            };
            console.log('企业',param)
            this.$axios5.post('syslog/enterpriselog/getEnterpriseLogs',param)
              .then((response) => {
                console.log(response);
                if(response.data.data.list.length != 0){
                  for(let i=0; i<response.data.data.list.length; i++){
                    let dataRow = response.data.data.list[i];
                    this.companyLogData.push(dataRow);
                  }
                  this.total1 = response.data.data.total;
                }
                else {
                  this.total1 = 0;
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
          //管理员日志
          managerDataQuery(){
            this.managerLogData = [];
            var param = {
              adminName:this.managerLogForm.adminName,
              operateType:this.managerLogForm.operateType,
              startTime:this.managerLogForm.operateDate[0],
              endTime:this.managerLogForm.operateDate[1],
              pageNum:this.currentPage2,
              pageSize:10,
            };
            console.log('企业',param)
            this.$axios5.post('syslog/adminlog/getAdminLogs',param)
              .then((response) => {
                console.log(response);
                if(response.data.data.list.length != 0){
                  for(let i=0; i<response.data.data.list.length; i++){
                    let dataRow = response.data.data.list[i];
                    this.managerLogData.push(dataRow);
                  }
                  this.total2 = response.data.data.total;
                }
                else {
                  this.total2 = 0;
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          },
        },
    }

</script>
