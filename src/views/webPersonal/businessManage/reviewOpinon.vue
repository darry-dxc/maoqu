<template>
	<el-dialog title="审核意见" :visible.sync="dialogOperationVisible" width="750px" >
		<div>
			<el-table :data="docuTableData" stripe style="width: 100%">
				<el-table-column type="index" label="序号" width="50">
				</el-table-column>
				<el-table-column prop="billStatus" label="审核状态">
				</el-table-column>
				<el-table-column prop="auditTime" label="审核时间" :formatter="dateFormat">
				</el-table-column>
				<el-table-column prop="auditOpinion" label="审核意见">
				</el-table-column>
			</el-table>
		</div>
	</el-dialog>
</template>

<script>
	import moment from 'moment';
	export default {
	//定义数据
		data () {
		    return {
		    	dialogOperationVisible:false,
		    	docuTableData:[],
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
		//时间格式化
		    dateFormat:function(row, column) {
		      var date = row[column.property];
		      if (date == undefined) {
		        return "";
		      }
		      return moment(date).format("YYYY-MM-DD HH:mm:ss");
		    },
		    showReviewOpinon(val){
		    	console.log(val);
		    	if("undefined" !== typeof val){
		    		this.$axios6.get('exportBusiness/findAuditOpinion',{
			    	    params:{
			    	    'exDeclareDetailId':val,
			            'pageNum':'',
			            'pageSize':'',
			          }
			        }).then((response) => {
			              console.log(response);
			              for(let i=0; i<response.data.data.list.length; i++){
			                let dataRow = response.data.data.list[i];
			                this.docuTableData.push({
			                	billStatus:'不通过',
			                	auditTime:dataRow.auditTime,
			            		auditOpinion:dataRow.auditOpinion,
			                })
			            }
			            })
			            .catch(function (error) {
			              console.log(error);
			            });
		    	}

				this.dialogOperationVisible = true;
			}

		}
}
</script>
