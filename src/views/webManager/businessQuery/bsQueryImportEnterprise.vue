<template>
  <div>
    <el-row style="margin: 10px">
      <el-col :span="3">
        <el-select v-model="isNameOrIsBussinessNo" clearable placeholder="企业名称/业务单号">
          <el-option
            v-for="item in enterpriseQueryTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input :disabled="isNameOrIsBussinessNo === ''" v-model="enterpriseQueryKeyword" placeholder="请输入关键字" clearable/>
      </el-col>
      <el-col :span="1.5">
        <label class="userQuery-selectText3">选择：</label>
      </el-col>
      <el-col :span="4">
        <el-select placeholder="建单/完成时间" v-model="timeType" clearable>
          <el-option
            v-for="item in timeTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-date-picker
          v-model="timeValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="timeType === ''"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="queryEnterpriseData">查询</el-button>
      </el-col>
    </el-row>
      <el-table :data="bsEnterpriseData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="enterpriseName" label="企业名称"  />
        <el-table-column prop="businessId" label="业务单号"/>
        <el-table-column prop="contractNo" label="合同号"/>
        <el-table-column prop="createTime" label="建单时间" />
        <el-table-column prop="finishTime" label="完成时间" />
      </el-table>
      <el-pagination
        @current-change="enterpriseCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
        style="float: right;">
      </el-pagination>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          bsType:'',
          isNameOrIsBussinessNo:'',
          enterpriseQueryTypes:[{
            value:1,
            label:'企业名称'
          },{
            value:2,
            label:'业务单号'
          }],
          enterpriseQueryKeyword:'',
          timeType:'',
          timeTypes:[{
            value: 1,
            label: '建单时间'
          }, {
              value:2,
              label:'完成时间'
          }],
          timeValue:'',
          bsEnterpriseData:[],
          currentPage:1,
          total:0
        }
      },
      mounted(){
        this.queryEnterpriseData();
      },
      methods:{
        enterpriseCurrentChange(val){
          this.currentPage = val;
          this.queryEnterpriseData();
        },
        //查询企业业务
        queryEnterpriseData(){
          this.bsEnterpriseData = [];
          let param = {
            isNameOrIsBussinessNo:this.isNameOrIsBussinessNo,
            inputKey:this.enterpriseQueryKeyword,
            isCreateTimeOrIsFinishTime:this.timeType,
            startTime:this.timeValue[0],
            endTime:this.timeValue[1],
            pageNum:this.currentPage,
            pageSize:10,
          };
          this.$axios10.post('sys/admin/enterprise/importbusiness/accessData',param)
            .then((response) => {
               // console.log(response.data);
              this.total = response.data.data.total;
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.bsEnterpriseData.push(dataRow)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style scoped>

</style>
