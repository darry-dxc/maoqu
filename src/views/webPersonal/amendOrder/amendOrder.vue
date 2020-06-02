<template>
<div>
	<!-- 查询区域 -->
   <el-form :model="queryForm" label-width="100px">
          <el-row>
              <el-col :span="6"><el-form-item label="修撤业务类型:" >
              <el-select v-model="queryForm.type">
                <el-option label="海关主动发起修改" value="1"></el-option>
                <el-option label="海关主动发起撤销" value="2"></el-option>
               </el-select></el-form-item></el-col>
              <el-col :span="6"><el-form-item label="报关单编号:">
              <el-input  v-model="queryForm.type"/>
              </el-form-item></el-col>
              <el-col :span="6"><el-form-item label="报关统一编号:" >
              <el-input  v-model="queryForm.type"/>
              </el-form-item></el-col>
              <el-col :span="6"><el-form-item label="关检关联号:">
              <el-input  v-model="queryForm.type"/>
              </el-form-item></el-col>
          </el-row>
          <el-row>
          	<el-col :span="12"><el-form-item label="收发货人:">
              <el-input  v-model="queryForm.type"/>
              </el-form-item></el-col>
             <el-col :span="12"><el-form-item label="海关发起日期:">
              <el-date-picker style="width:520px"
               v-model="queryForm.Date"
              type="datetimerange"
              range-separator="——"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
              </el-date-picker>
              </el-form-item></el-col>
          </el-row>
          <el-row>
          	<el-col :span="3"><el-button type="primary" plain icon="el-icon-document" @click="viewConfirm">查看确认书</el-button></el-col>
          	<el-col :span="2"><el-button type="primary" plain icon="el-icon-printer" @click="print">打印</el-button></el-col>

          	<el-col :span="2" :offset="15"><el-button type="primary" @click="quicy">查询</el-button></el-col>
          	<el-col :span="2"><el-button type="primary" @click="reset">重置</el-button></el-col>
          </el-row>
         </el-form>
<!-- 查看确认书 -->
    <ConfirmOrder ref="confirm"></ConfirmOrder>
<!-- 	表格 -->
	<el-table 
        :data="amendOrderData"
        border
        @row-click ="viewCustom"
        highlight-current-row
        style="width: 100%"
        stripe
      >
    <el-table-column header-align="center" prop="customMsg" label="修撤确认书中心统一编号"/>
		<el-table-column header-align="center" prop="customName" label="报关单号" />
		<el-table-column header-align="center" prop="custom1" label="修撤业务类型" />
		<el-table-column header-align="center" prop="supplyArea" label="主管海关" />
		<el-table-column header-align="center" prop="dealMode" label="已超期天" />
		<el-table-column header-align="center" prop="exportPort" label="日期" />
		<el-table-column header-align="center" prop="createTime" label="状态" />
	</el-table>

  <!--  分页信息 -->
  <el-pagination 
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[10, 20, 30, 40, 50]"
    :page-size="pageSize"
    layout="sizes,total, prev, pager, next, jumper"
    :total="total"
    style="float: right;">
    </el-pagination>
	</div>
</template>

<script>
  import ConfirmOrder from './confirmOrder';
	 export default {
        data() {
            return {
            	//form信息
            	queryForm:{

            	},
            	//表格信息
            	amendOrderData:[
              {}
              ],
              //分页信息
               	currentPage: 1,
              	total:0,
              	pageSize:10,
            }
        },
        components:{
          ConfirmOrder
        },
        methods:{
          //查看确认书
          viewConfirm(){
            this.$refs.confirm.showConfirmOrder();            
          },
          //打印
          print(){
           
          },
        	//查看当前行
        	viewCustom(){

        	},
        	//改变当前页
        	handleCurrentChange(currentPage){

        	},
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          //查询
          quicy(){
            
          },
        	//重置
        	reset(){
        		this.queryForm={};
            //this.$message.error('密码错误!');
        	}
        }
    }

</script>