<template>
    <div>
      <el-row style="margin: 10px 0;padding: 10px">
        <el-col :span="16">
          <el-radio-group v-model="radio" @change="orderStateChange">
            <el-radio-button label="新订单"></el-radio-button>
            <el-radio-button label="待处理"></el-radio-button>
            <el-radio-button label="已处理"></el-radio-button>
            <el-radio-button label="已放行"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="5">
          <el-input v-model="input" placeholder="请输入关键字" clearable/>
        </el-col>
        <el-col :span="3">
          <el-button  @click="personKeywordQuery" type="primary"><strong>查询</strong></el-button>
        </el-col>
      </el-row>
      <el-table :data="newOrderData" stripe style="width: 100%" v-show="radio === '新订单'" @row-click ="viewBusiness">
        <el-table-column prop="serviceNo" label="服务单号" width="200"class-name="serviceNo">
        </el-table-column>
        <el-table-column prop="commodityNames" label="商品名称">
        </el-table-column>
        <el-table-column prop="enterpriseName" label="客户名称">
        </el-table-column>
        <el-table-column prop="declareCustoms" label="申报地海关" :formatter="declareCustomFormat">
        </el-table-column>
        <el-table-column prop="tradeCountry" label="贸易国" :formatter="tradecountryFormat">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="派单时间" width="180px">
        </el-table-column>
        <el-table-column prop="dueDate" label="接单时限" :formatter="datelineFormat">
        </el-table-column>
      </el-table>
      <el-table :data="unTreatedOrderData" stripe style="width: 100%; display: none;" v-show="radio === '待处理'" @cell-click ="viewBillStateUntreated1">
        <el-table-column prop="serviceNo" label="服务单号" width="220">
          <template slot-scope="scope">
            <span >{{ scope.row.serviceNo }}</span>
            <i style="margin-left: 10px"
               class="el-icon-edit-outline"
               v-show="scope.row.auditOpinion !== null"></i>
          </template>
        </el-table-column>
        <el-table-column prop="customsNo" label="海关编号">
        </el-table-column>
        <el-table-column prop="teRsComanyName" label="境内收发货人">
        </el-table-column>
        <el-table-column prop="supervisionMode" label="监管方式" :formatter="supervisionModeFormat">
        </el-table-column>
        <el-table-column prop="deliveryNo" label="提运单号">
        </el-table-column>
        <el-table-column prop="billStatus" label="业务单状态">
        </el-table-column>
        <el-table-column prop="someTime" label="最近操作时间" width="180px">
        </el-table-column>
      </el-table>
      <el-table :data="treatedOrderData" stripe style="width: 100%; display: none;" v-show="radio === '已处理'" @row-click ="viewBillStateUntreated">
        <el-table-column prop="serviceNo" label="服务单号" width="200">
        </el-table-column>
        <el-table-column prop="customsNo" label="海关编号">
        </el-table-column>
        <el-table-column prop="teRsComanyName" label="境内收发货人">
        </el-table-column>
        <el-table-column prop="supervisionMode" label="监管方式" :formatter="supervisionModeFormat">
        </el-table-column>
        <el-table-column prop="deliveryNo" label="提运单号">
        </el-table-column>
        <el-table-column prop="billStatus" label="业务单状态">
        </el-table-column>
        <el-table-column prop="someTime" label="最近操作时间" width="180px">
        </el-table-column>
      </el-table>
      <el-table :data="finishedOrderData" stripe style="width: 100%; display: none;" v-show="radio === '已放行'" @row-click ="viewBillStateUntreated">
        <el-table-column prop="serviceNo" label="服务单号" width="200">
        </el-table-column>
        <el-table-column prop="customsNo" label="海关编号">
        </el-table-column>
        <el-table-column prop="teRsComanyName" label="境内收发货人">
        </el-table-column>
        <el-table-column prop="supervisionMode" label="监管方式" :formatter="supervisionModeFormat">
        </el-table-column>
        <el-table-column prop="deliveryNo" label="提运单号">
        </el-table-column>
        <el-table-column prop="billStatus" label="业务单状态">
        </el-table-column>
        <el-table-column prop="someTime" label="最近操作时间" width="180px">
        </el-table-column>
      </el-table>
      <div class="person-buttom">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
          style="float: right;">
        </el-pagination>
      </div>
      <div id="personmain-bottom">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <span style="color: #409EFF;font-size: 16px;padding-left: 16px">统计信息+</span>
            </template>
            <div class="bottom-con">
              <div style="height: 50px; width: 100%;">
                <el-select v-model="value1" size="small" style="float: right;" @change="valueChangepie1">
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" >
                  </el-option>
                </el-select>
              </div>
              <div id ="pieChart1" style="height: 350px; width: 100%; float: right;"></div>
            </div>
            <div class="bottom-con">
              <el-select v-model="value2" size="small" style="float: right;" @change="valueChangecolumn1">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" >
                </el-option>
              </el-select>
              <div id = "columnChart1" style="height: 350px; width: 100%; float: right;"></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!--历史审核意见弹出框-->
      <el-dialog
        title="历史审核意见"
        :visible.sync="dialogHistoryVisible"
        width="60%">
        <el-table
          :data="historyTableData"
          style="width: 100%">
          <el-table-column width="100" type="index" label="序号" />
          <el-table-column prop="auditTime" label="审核时间" width="250"/>
          <el-table-column prop="auditOpinion" label="审核意见" />
        </el-table>
        <span slot="footer" class="dialog-footer" />
      </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex';
  import './../../../assets/css/webpersonal/personMainCon.css';
  import HighCharts from 'highcharts';//统计图表组件
  import dataChart from './../../../components/datachart.vue';//统计图表组件
    export default {
      data() {
        return {
          activeName:'1',
          newOrderDataflag:true,
          unTreatedOrderDataflag:false,
          treatedOrderDataflag:false,
          finishedOrderDataflag:false,
          dialogHistoryVisible:false,
          newOrderFlag:false,
          waitbsFlag:false,
          InReFlag:false,
          historyTableData:[],
          radio:'新订单',
          newOrderData:[{
            imDeclareServiceId:'',
          }],
          unTreatedOrderData:[],
          treatedOrderData:[],
          finishedOrderData:[],
          countryregions:[],
          imDeclareCustoms:[],
          supervisionModes:[],
          input:'',
          currentPage:1,
          pageSize:10,
          total:0,
          options1: [{
            value: '1',
            label: '全部'
          }, {
            value: '2',
            label: '近7天'
          }, {
            value: '3',
            label: '近一月'
          }, {
            value: '4',
            label: '近三月'
          }],
          value1:'1',
          options2: [{
            value: '1',
            label: '近7天'
          }, {
            value: '2',
            label: '近一月'
          }, {
            value: '3',
            label: '近三月'
          }],
          value2: '1',
        }
      },
      //定义组件
      components:{
        dataChart,
      },
      mounted() {
        this.valueChangepie1("1");
        this.valueChangecolumn1("1");
        this.loadStaticData()
      },
      activated(){
        this.personKeywordQuery();
      },
      computed:{
        ...mapState(['nickName','nickPost','nickId'])
      },
      methods: {
        //接单时限格式化
        datelineFormat:function(row, column) {
          var dateline = row[column.property];
          var date = new Date();
          if (dateline == undefined) {
            return "";
          }
          var date3 = new Date(dateline).getTime() - date.getTime();   //时间差的毫秒数
          //计算出相差天数
          var days=Math.floor(date3/(24*3600*1000));
          //计算出小时数
          var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
          var hours=Math.floor(leave1/(3600*1000));
          //计算相差分钟数
          var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
          var minutes=Math.floor(leave2/(60*1000));
          return days+"天 "+hours+"小时 "+minutes+"分钟";
        },
        personKeywordQuery(){
          if(this.newOrderDataflag===true){
            this.newOrder();
          }
          else if(this.unTreatedOrderDataflag===true){
            this.waitconsole();
          }
          else if(this.treatedOrderDataflag===true){
            this.consoled();
          }
          else if(this.finishedOrderDataflag===true){
            this.success();
          }
        },
        //查看不同状态的订单
        orderStateChange(val){
          switch (val){
            case '新订单':this.newOrder();break;
            case '待处理':this.waitconsole();break;
            case '已处理':this.consoled();break;
            case '已放行':this.success();break;
          }
        },
        //	新订单按钮功能
        newOrder(){
          this.newOrderData = [];
          let params = {
            pageNum:this.currentPage,
            pageSize:this.pageSize,
            // 'receiverName':this.nickName,
            // 'receiverId':this.nickId,
            keywords:this.input
          }
          // console.log('进口新订单',params)
          this.$axios8.post('getNewOrders',params)
            .then((response) => {
            console.log(response.data);
            if(response.data.data.list !== null && response.data.data.list != undefined){
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.newOrderData.push(dataRow)
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
          this.newOrderDataflag=true;
          this.unTreatedOrderDataflag=false;
          this.treatedOrderDataflag=false;
          this.finishedOrderDataflag=false;
        },
        //新订单页面跳转
        viewBusiness(row){
          this.$store.commit("updateBusinessId",row.businessId);
          // console.log("row.businessId",row.businessId,row.imDeclareServiceId)
          this.$router.push({path:'/personImportBs?imDeclareServiceId='+row.imDeclareServiceId+'&billStatus=2'+'&businessId='+row.businessId});
        },
        //待处理按钮功能
        waitconsole(){
          this.unTreatedOrderData = [];
          let params={
            'pageNum':this.currentPage,
            'pageSize':this.pageSize,
            // 'receiverName':this.nickName,
            // 'receiverId':this.nickId,
            'billStatus':37,
            'keywords':this.input
                }
          // console.log('待处理',params)
          this.$axios8.post('getOtherOrders',params)
            .then((response) => {
            console.log(response);
            if(response.data.data.list !== null && response.data.data.list != undefined){
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.unTreatedOrderData.push(dataRow);
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
          // console.log(this.nickId);
          this.newOrderDataflag=false;
          this.unTreatedOrderDataflag=true;
          this.treatedOrderDataflag=false;
          this.finishedOrderDataflag=false;
        },
        //待处理订单信息查看
        viewBillStateUntreated1(row, column){
          // console.log('待处理订单信息',row, column);
          if(column.label === '服务单号'){
            this.getAuditOpinion(row.auditOpinion)
          }
          else{
            this.$router.push({path:'/personImportBs?imDeclareServiceId='+row.imDeclareServiceId+
              '&imDeclareDetailId='+row.imDeclareDetailId+
              '&billStatus='+row.billStatus+
              '&businessId='+row.businessId});
          }
        },
        //待处理订单信息查看
        viewBillStateUntreated(row, column){
          this.$router.push({path:'/personImportBs?imDeclareServiceId='+row.imDeclareServiceId+
            '&imDeclareDetailId='+row.imDeclareDetailId+
            '&billStatus='+row.billStatus+
            '&businessId='+row.businessId});
        },
        //查看历史意见
        getAuditOpinion(val){
          this.historyTableData = [];
          // console.log('历史意见',val);
          if(val != null){
            for(let i = 0; i <val.length; i++){
              this.historyTableData.push(val[i]);
              this.dialogHistoryVisible = true;
            }
          }
        },
        //	已处理按钮功能
        consoled(){
          this.treatedOrderData = [];
          let params={
            'pageNum':this.currentPage,
            'pageSize':this.pageSize,
            // 'receiverName':this.nickName,
            // 'receiverId':this.nickId,
            'billStatus':45,
            'keywords':this.input
          }
          this.$axios8.post('getOtherOrders',params)
            .then((response) => {
            // console.log(response.data);
            if(response.data.data.list !== null && response.data.data.list != undefined){
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.treatedOrderData.push(dataRow)
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
          this.newOrderDataflag=false;
          this.unTreatedOrderDataflag=false;
          this.treatedOrderDataflag=true;
          this.finishedOrderDataflag=false;
        },
        //	已完成按钮功能
        success(){
          this.finishedOrderData = [];
          let params={
            'pageNum':this.currentPage,
            'pageSize':this.pageSize,
            // 'receiverName':this.nickName,
            // 'receiverId':this.nickId,
            'billStatus':6,
            'keywords':this.input
          }
          this.$axios8.post('getOtherOrders',params)
            .then((response) => {
            if(response.data.data.list !== null && response.data.data.list != undefined){
              for(let i=0; i<response.data.data.list.length; i++){
                let dataRow = response.data.data.list[i];
                this.finishedOrderData.push(dataRow);
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
          this.newOrderDataflag=false;
          this.unTreatedOrderDataflag=false;
          this.treatedOrderDataflag=false;
          this.finishedOrderDataflag=true;
        },
        handleCurrentChange(val){
          this.currentPage = val;
          if(this.newOrderDataflag===true){
            this.newOrder();
          }
          else if(this.unTreatedOrderDataflag===true){
            this.waitconsole();
          }
          else if(this.treatedOrderDataflag===true){
            this.consoled();
          }
          else if(this.finishedOrderDataflag===true){
            this.success();
          }
        },
        //饼状图初始化
        pieDataChartInit1(){
          return HighCharts.chart('pieChart1', {
            credits: {//去水印
              enabled: false
            },
            chart: {
              type:'pie',
            },
            title:{
              text:'订单情况'
            },
            tooltip :{
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions:{
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '{point.name}:{point.percentage:.1f}%',
                }
              }
            },
            series:[{
              data: []
            }],
          });

        },
        //柱状图初始化
        columnDataChartInit1(){
          return HighCharts.chart('columnChart1',{
            credits: {//去水印
              enabled: false
            },
            chart: {
              type: 'column',
            },
            title: {
              text: '接单量'
            },
            xAxis: {//x轴显示的内容
              type: 'category'
            },

            yAxis: {//y轴显示的内容
              allowDecimals: false,
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: true // 开启数据标签
                },
                enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
              }
            },
            series: [{
              name: '完成量',
              data: []
            }, {
              name: '接单量',
              data: []
            }]
          })
        },
        //请求本地数据
        loadStaticData(){
          this.$axios.all([
            this.$axios.get('static/pub_countryregion.json'),//贸易国/启运国（地区）/原产国、最终目的地
            this.$axios.get('static/pub_exportports.json'),//入境口岸
            this.$axios.get('static/pub_supervisemode.json'),//监管方式
          ]).then(this.$axios.spread((
            res_countryregion,
            res_exportports,
            res_supervisemode,
          ) => {
            this.countryregions = res_countryregion.data.RECORDS;
            this.imDeclareCustoms = res_exportports.data.RECORDS;
            this.supervisionModes = res_supervisemode.data.RECORDS;
          })).catch((e) => {
            console.log(e);
          })
        },
        //贸易国别查找中文名称
        tradecountryFormat(row,col){
          let val = row[col.property];
          if (val === undefined || val == '') {
            return "";
          }
          else {
            var data = this.countryregions.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //申报地海关查找中文名称
        declareCustomFormat(row,col){
          let val = row[col.property];
          if (val == undefined) {
            return "";
          }
          else {
            var data = this.imDeclareCustoms.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //监管方式查找中文名称
        supervisionModeFormat(row,col){
          let val = row[col.property];
          if (val == undefined) {
            return "";
          }
          else {
            var data = this.supervisionModes.find((item) => {
              if(item.value === val){
                return item;
              }
            });
            if(data != undefined){
              return data.label;
            }
            else {
              return '';
            }
          }
        },
        //饼状图统计时间选择
        valueChangepie1(val){
          if(val === "1"){
            let param = {
              'receiverName':this.nickName,
              'flag':1,
            };
            this.$axios10.post('personal/import/declare/statistics/piechart',param)
              .then( (response)=> {
                // console.log('全部',response.data);
                if(response.data.state === true){
                  this.pieDataChartInit1().series[0].setData(response.data.data);
                }
                else {
                  this.pieDataChartInit1().series[0].setData([['空',100]]);
                }

              })
              .catch( (error) =>{
                console.log(error);
              });
          }
          else if(val ==="2"){
            let param = {
              'receiverName':this.nickName,
              'flag':2,
            };
            this.$axios10.post('personal/import/declare/statistics/piechart',param)
              .then((response) =>{
                // console.log('七天',response.data);
                if(response.data.state === true){
                  this.pieDataChartInit1().series[0].setData(response.data.data);
                }
                else {
                  this.pieDataChartInit1().series[0].setData([['空',100]]);
                }
              })
              .catch( (error) =>{
                console.log(error);
              });
          }
          else if(val ==="3"){
            let param = {
              'receiverName':this.nickName,
              'flag':3,
            };
            this.$axios10.post('personal/import/declare/statistics/piechart',param)
              .then((response) =>{
                // console.log('一月',response.data.data);
                if(response.data.state === true){
                  this.pieDataChartInit1().series[0].setData(response.data.data);
                }
                else {
                  this.pieDataChartInit1().series[0].setData([['空',100]]);
                }
              })
              .catch( (error) =>{
                console.log(error);
              });
          }
          else if(val ==="4"){
            let param = {
              'receiverName':this.nickName,
              'flag':4,
            };
            this.$axios10.post('personal/import/declare/statistics/piechart',param)
              .then((response) =>{
                // console.log('三月',response.data.data);
                if(response.data.state === true){
                  this.pieDataChartInit1().series[0].setData(response.data.data);
                }
                else {
                  this.pieDataChartInit1().series[0].setData([['空',100]]);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
        //柱状图统计时间选择
        valueChangecolumn1(val){
          var columnxAxis1 = [];
          var columnxAxis2 = [];
          if(val === "1"){
            let param = {
              'receiverName':this.nickName,
              'flag':2,
            };
            this.$axios10.post('personal/import/declare/statistics/barchart',param)
              .then((response) =>{
                for(let i=0;i<response.data.data.接单量.length;i++){
                  let dataRow = response.data.data.接单量[i];
                  columnxAxis2.push({
                    name:dataRow.dateStr,
                    y:dataRow.num,
                  })
                }
                for(let i=0;i<response.data.data.完成量.length;i++){
                  let dataRow = response.data.data.完成量[i];
                  columnxAxis1.push({
                    name:dataRow.dateStr,
                    y:dataRow.num,
                  })
                }
                this.columnDataChartInit1().series[0].setData(columnxAxis1);
                this.columnDataChartInit1().series[1].setData(columnxAxis2);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else if(val ==="2"){
            let param = {
              'receiverName':this.nickName,
              'flag':3,
            };
            this.$axios10.post('personal/import/declare/statistics/barchart',param)
              .then( (response) =>{
                for(let i=0;i<response.data.data.接单量.length;i++){
                  let dataRow = response.data.data.接单量[i];
                  columnxAxis2.push({
                    name:dataRow.startDateStr + "~" + dataRow.endDateStr,
                    y:dataRow.num,
                  })
                }
                for(let i=0;i<response.data.data.完成量.length;i++){
                  let dataRow = response.data.data.完成量[i];
                  columnxAxis1.push({
                    name:dataRow.startDateStr + "~" + dataRow.endDateStr,
                    y:dataRow.num,
                  })
                }
                this.columnDataChartInit1().series[0].setData(columnxAxis1);
                this.columnDataChartInit1().series[1].setData(columnxAxis2);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
          else if(val ==="3"){
            let param = {
              'receiverName':this.nickName,
              'flag':4,
            };
            this.$axios10.post('personal/import/declare/statistics/barchart',param)
              .then( (response) =>{
                for(let i=0;i<response.data.data.接单量.length;i++){
                  let dataRow = response.data.data.接单量[i];
                  columnxAxis2.push({
                    name:dataRow.monthStr,
                    y:dataRow.num,
                  })
                }
                for(let i=0;i<response.data.data.完成量.length;i++){
                  let dataRow = response.data.data.完成量[i];
                  columnxAxis1.push({
                    name:dataRow.monthStr,
                    y:dataRow.num,
                  })
                }
                this.columnDataChartInit1().series[0].setData(columnxAxis1);
                this.columnDataChartInit1().series[1].setData(columnxAxis2);

              })
              .catch(function (error) {
                console.log(error);
              });
          }
        },
      }
    }
</script>

<style scoped>

</style>
