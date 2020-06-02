<template>
 <div>
	<el-row id="rowStyle">
		<span>重传/修补信息</span>
	</el-row>
	<el-row id="rowStyle">
		<el-col :span="2">
			<div class="reText">
				<label>关检关联号:</label>
			</div>
		</el-col>
		<el-col :span="4">
			<el-input  v-model="inspectionNumber" auto-complete="off"></el-input>
		</el-col>
		<el-col :span="3">
			<div class="reText">
				<label>报关单统一编号:</label>
			</div>
		</el-col>
		<el-col :span="4">
			<el-input  v-model="declaUnionNum" auto-complete="off"></el-input>
		</el-col>
		<el-col :span="2">
			<div class="reText">
			<label>报关单编号:</label>
		    </div>
		</el-col>
		<el-col :span="4">
			<el-input  v-model="declarationNum" auto-complete="off"></el-input>
		</el-col>
		<el-col :span="4" style="float: right">
			<el-button type="primary">查询</el-button>
			<el-button type="primary">重置</el-button>
		</el-col>
	</el-row>
	<el-row id="rowStyle">
		<el-col :span="3">
			<div class="reText">
			<label>选择随附单据文件</label>
		    </div>
		</el-col>
		<el-col :span="2">
            <el-button size="small" type="primary" @click="documentDialogVisible = true">+添加文件</el-button>
		</el-col>
		<el-col :span="14">
			<div class="reText">
			<label class="redText">(提示：只可上传后缀为pdf的文件，单个文件大小不能超过4M，且每页不能超过200k)</label>
		    </div>
		</el-col>
	</el-row>

    <!-- 数据表格 -->
	<el-table
        :data="retransmissionData"
        highlight-current-row
        stripe
        style="width: 100%"
      >
				<el-table-column type="selection" width="55" class="selection" prop='retrans-checkeAll'/>
				<el-table-column prop="inspectionNumber" label="关检关联号" />
				<el-table-column prop="declaUnionNum" label="报关单统一编号" />
				<el-table-column prop="declarationNum" label="报关单编号" />
				<el-table-column prop="declaStatus" label="报关单状态" />
				<el-table-column prop="documentStyle" label="单据类别" />
				<el-table-column prop="documentName" label="文件名称" />
				<el-table-column prop="documentStatus" label="单据状态" />
				<el-table-column prop="reason" label="补传/重传原因" />
			</el-table>
	<!-- 底部页码 -->
	<el-pagination
		:current-page="currentPage"
        @current-change = "retransmissionDataByPage"
		:page-size="pageSize"
		layout="total, prev, pager, next, jumper"
		:total="total"
		style="float: right;">
    </el-pagination>

     <!-- 文件上传弹出框 -->
	<el-dialog
      title="单据重传/补传信息"
      :visible.sync="documentDialogVisible"
      width="50%"
      center>
      <el-table
        :data="documentData"
        highlight-current-row
        stripe
        style="width: 100%"
      >
		<el-table-column prop="documentClass" label="随附单据文件类别" />
		<el-table-column prop="documentNum" label="随附单据文件/编号" />
		<el-table-column
           label="操作" align="center">
           <template slot-scope="scope">
                  <el-button
                    size="mini">上传</el-button>
                  <el-button
                    size="mini">下载</el-button>
                </template>
          </el-table-column>
	  </el-table>
    </el-dialog>

 </div>
</template>

<script type="text/javascript">
import './../../../assets/css/webPersonal/retransmission.css'
	export default {
  //定义数据
  data () {
    return {
      documentDialogVisible:false,
      inspectionNumber:'',
      declaUnionNum:'',
      declarationNum:'',
      total:0,
      currentPage:1,
      pageSize:10,
      retransmissionData:[],
      documentData:[{
          documentClass:"集装箱",
      }],
  }
  },

methods:{
    // 按页码查询
    retransmissionDataByPage(){}
  }
}
</script>