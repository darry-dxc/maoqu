<template>
	<el-dialog title="查看确认书" :visible.sync="dialogConfirmVisible" width="1000px">
			<el-form :model="form" label-width="100px">
			    <el-row>
				<el-col :span="8"><el-form-item label="报关单号:" >
					<el-input v-model="form.name1"/>
				</el-form-item></el-col>
				<el-col :span="8"><el-form-item label="修撤业务类型:">
              		<el-input  v-model="form.name1"/>
              	</el-form-item></el-col>
              	<el-col :span="8"><el-form-item label="收发人名称:" >
              		<el-input  v-model="form.name1"/>
              	</el-form-item></el-col>
              	</el-row>
              	<el-row>
				<el-col :span="12"><el-form-item label="申报单位:" >
					<el-input v-model="form.name1"/>
				</el-form-item></el-col>
				<el-col :span="12"><el-form-item label="海关发起日期:">
              		<el-input  v-model="form.name1"/>
              	</el-form-item></el-col>
              	</el-row>
                <el-row>
				<el-col :span="24"><el-form-item label="修改原因:" >
					<el-input v-model="form.name1" />
				</el-form-item></el-col>
              	</el-row>

			<el-table 
			:data="confirmTableData" 
       		border
        	highlight-current-row
        	style="width: 100%"
        	stripe
			>
				<el-table-column prop="name1" label="序号" >
				</el-table-column>
				<el-table-column prop="name2" label="型号">
				</el-table-column>
				<el-table-column prop="name3" label="表体序号">
				</el-table-column>
				<el-table-column prop="name4" label="字段名称">
				</el-table-column>
				<el-table-column prop="name4" label="修改前内容">
				</el-table-column>
				<el-table-column prop="name4" label="修改后内容">
				</el-table-column>
			</el-table>

			<el-row>
				<el-col :span="8"><el-form-item label="确认单位:" >
					<el-col :span="12"><el-input v-model="form.name1"/></el-col>
					<el-col :span="12"><el-input v-model="form.name1"/></el-col>
				</el-form-item></el-col>
				<el-col :span="8"><el-form-item label="名称:">
              		<el-input  v-model="form.name1"/>
              	</el-form-item></el-col>
              	<el-col :span="8"><el-form-item label="联系方式:" >
              		<el-input  v-model="form.name1"/>
              	</el-form-item></el-col>
            </el-row>
            <el-row>
            	<el-col :span="24"><el-form-item label="不同意原因:" >
					<el-input  type="textarea" v-model="form.name1"/>
				</el-form-item></el-col>
            </el-row>
            </el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="refuse" class="cancel" size="small"><strong>不同意</strong></el-button>
			<el-button type="primary" @click="accept" class="sure" size="small"><strong>同意</strong></el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
	//定义数据
		data () {
		    return {
		    	dialogConfirmVisible:false,
		    	confirmTableData:[],
		    	form:{},
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
			showConfirmOrder(){
				this.dialogConfirmVisible = true;
			},
			//查看确认书同意
			accept(){
				this.dialogConfirmVisible =false;
				this.$message.success("已同意！");
			},
			//查看确认书不同意
			refuse(){
				this.dialogConfirmVisible =false;
				this.$message.warning("不同意确认书！");
			}
		}
}
</script>
