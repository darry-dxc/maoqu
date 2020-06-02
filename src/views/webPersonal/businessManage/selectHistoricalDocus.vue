<template>
	<el-dialog title="选择历史单据" :visible.sync="dialogOperationVisible" width="750px" >
		<div style="float: left;">
			<label class="font-size-16">搜索:</label>
			<el-input v-model="keyword" placeholder="请输入关键字,例如：1" size="small" style="width: 200px;"></el-input>
			<el-button type="primary" class="sure" name="ideaQuery" size="small" @click="queryHistoricalDocus">查询</el-button>
		</div>
		<div>
			<el-table :data="docuTableData" @selection-change="selectItem" stripe style="width: 100%">
				<el-table-column prop="serviceNo" label="服务单号" width="180">
				</el-table-column>
        <el-table-column prop="contractNo" label="出口合同号">
        </el-table-column>
				<el-table-column prop="deliveryNo" label="提运单号">
				</el-table-column>
				<el-table-column prop="tradeCountry" label="商品名称">
				</el-table-column>

				<el-table-column type="selection" width="55" class="selection" prop='name5' ></el-table-column>
			</el-table>
			<el-pagination
		    :current-page="currentPage"
	       	@current-change = "queryDeliveryByPage"
		    :page-size="pageSize"
		    layout="total, prev, pager, next, jumper"
		    :total="total"
		    style="float: right;">
			</el-pagination>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogOperationVisible = false" class="cancel" size="small">取 消</el-button>
			<el-button type="primary" @click="dialogOperationVisible = false" class="sure" size="small">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
	//定义数据
		data () {
		    return {
		    	keyword:'',
		    	dialogOperationVisible:false,
		    	docuTableData:[],
		    	currentPage:1,
		    	pageSize:10,
		    	total:0,
		    }
		},
		  //定义组件
		components:{

		},
		    //定义初始化函数
		mounted(){

		},

		    //定义方法
		methods:{
			//查询按钮
			queryHistoricalDocus(){

			},
			selectItem(){

			},
			queryDeliveryByPage(currentPage){

    		},
      showHistoricalDocus(){
			  this.dialogOperationVisible = true;
        let params = {
          'receiverId':this.nickId,
          'receiverName':this.nickName,
          'billStatus':6,
          'pageNum':this.currentPage,
          'pageSize':10,
          'keyword':this.keyword,
        }
        this.$axios8.post('getOtherOrders',params)
          .then((res) => {
            this.$refs.HistoricalDocus.showHistoricalDocus(res.data.data.list);
          }).catch((e) => {
          console.log(e);
        });
			}
		}
}
</script>
