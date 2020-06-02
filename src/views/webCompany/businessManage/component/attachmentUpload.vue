<template>
	<el-dialog title="随附单件上传" :visible.sync="dialogOperationVisible" width="750px" >
		<div>
			<el-form :model="form" label-width="160px">
				<el-form-item label="随附单据文件类别" >
					<el-input v-model="form.name1" size="small" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="随附单据编号" >
					<el-input v-model="form.name2"  size="small" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="选择随附单据文件" >
					<el-button type="text"><i class="el-icon-circle-plus el-icon--left"></i>添加附件</el-button>
					<label class="font-size-12 font-color-red">（提示：只可上传后缀名为pdf的文件，单个文件大小不能超过4M，每页不超过200k）</label>
				</el-form-item>
			</el-form>
		</div>
		
		<div>
			<el-table :data="attachmentTableData" @selection-change="selectItem" stripe style="width: 100%">
				<el-table-column prop="name1" label="类别" >
				</el-table-column>
				<el-table-column prop="name2" label="文件名称">
				</el-table-column>
				<el-table-column prop="name3" label="单据编号">
				</el-table-column>
				<el-table-column prop="name4" label="操作">
				</el-table-column>
			</el-table>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogOperationVisible = false" class="cancel" size="small"><strong>取 消</strong></el-button>
			<el-button type="primary" @click="dialogOperationVisible = false" class="sure" size="small"><strong>上传/保存</strong></el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
	//定义数据
		data () {
		    return {
		    	dialogOperationVisible:true,
		    	attachmentTableData:[],
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
			//查询按钮
			queryHistoricalDocus(){
				
			},
			selectItem(){
				
			}
		}
}
</script>
