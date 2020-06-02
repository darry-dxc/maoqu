<template>
  <div>
      <el-row style="margin: 10px">
        <el-col :span="2" style="line-height: 40px;text-align: center">查询条件:</el-col>
        <el-col :span="3">
          <el-select v-model="queryType" clearable>
            <el-option
              v-for="item in queryTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" >
          <el-input v-show="queryType === 1 || queryType === 3" v-model="queryKeyword" clearable/>
          <el-select v-show="queryType === 2" v-model="serviceType">
            <el-option
              v-for="item in serviceTypes"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2" style="line-height: 40px;text-align: center">选择时间:</el-col>
        <el-col :span="3">
          <el-select v-model="timeType" clearable>
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
            style="width: 360px "
          >
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="queryPersonData">查询</el-button>
        </el-col>
      </el-row>
        <el-table :data="bsPersonData"  stripe style="width: 100%">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column prop="receiverName" label="接单员姓名" />
          <el-table-column prop="serviceCategory" label="业务类别" />
          <el-table-column prop="serviceNo" label="服务单号" />
          <el-table-column prop="receiveTime" label="接单时间" />
          <el-table-column prop="finishTime" label="完成时间" />
        </el-table>
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
    export default {
      data () {
        return {
          queryType:'',
          queryKeyword:'',
          queryTypes:[
            {
              value: 1,
              label: '用户名称'
            }, {
              value: 2,
              label: '用户类别'
            }, {
              value: 3,
              label: '服务单号'
            }],
          serviceType:'',
          serviceTypes:[
            {
              value: 1,
              label: '订舱'
            }, {
              value: 2,
              label: '拖车'
            }, {
              value: 3,
              label: '熏蒸'
            }, {
              value: 4,
              label: '报关'
            },
          ],
          timeType:'',
          timeTypes:[{
            value: 1,
            label: '建单时间'
          }, {
              value:2,
              label:'完成时间'
          }],
          timeValue:'',
          bsPersonData:[],
          currentPage:1,
          total:0
        }
      },
      mounted(){
        this.queryPersonData();
      },
      methods:{
        pageChange(val){
          this.currentPage = val;
          this.queryPersonData();
        },
        queryPersonData(){
          this.bsPersonData = [];
          let param = {
            selectionOne:this.queryType,
            inputKey:this.queryKeyword,
            isReceiveTimeOrIsFinishTime:this.timeType,
            startTime:this.timeValue[0],
            endTime:this.timeValue[1],
            pageNum:this.currentPage,
            pageSize:10,
          };
          if(this.queryType === 2){
            param.inputKey = this.serviceType
          }else {
            param.inputKey = this.queryKeyword
          }
          this.$axios10.post('sys/admin/importpersonal/declare/accessPersonalData',param)
            .then((response) => {
              console.log('jink',response.data)
              this.total= response.data.data.total;//返回数据数量
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.bsPersonData.push(dataRow)
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>
