<template>
  <el-tabs type="border-card" style="margin-top: 7px">
    <el-tab-pane label="附件池">
      <el-table :data="attachmentData" height="200" size="small" border stripe>
        <el-table-column prop="attachmentType" label="文件类型"/>
        <el-table-column prop="fileName" label="文件名" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button size="mini" type="text" icon="el-icon-view" disabled></el-button>-->
            <el-button size="mini" type="text" icon="el-icon-download" @click ="uploadAttach(scope.$index, scope.row)"></el-button>
            <!--<el-button size="mini" type="text" icon="el-icon-close" @click="deleteAttach(scope.$index, scope.row)"></el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="操作日志">
      <el-table :data="logData" height="200" size="small" border stripe>
        <el-table-column prop="operateTime" label="时间"/>
        <el-table-column prop="operateType" label="操作类型" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="企业说明">
      <span style="font-size: 16px; color: #ff4d51">{{remark}}</span>
    </el-tab-pane>
  </el-tabs>
</template>

<script type="text/ecmascript-6">
    import ElRow from "element-ui/packages/row/src/row";
    export default {
      components: {ElRow},
      data() {
            return {
              remark:'',
            	attachmentData:[],
              logData:[],
            	businessId:'',
            }
       },
        computed:{
        	/*获取当前企业用户的id和名称，用来上传文件时参数*/
        nickCompanyId(){
          return this.$store.state.nickCompanyId;
        },
        nickCompanyName(){
          return this.$store.state.nickCompanyName;
        },
      },
       //定义初始化函数
		  mounted(){
		  },
      methods:{
        attachmentQuery(businessId){
          this.businessId = businessId;
          this.attachmentData = [];
          let param = {
            'businessId':businessId,
          };
          this.$axios6.post('/getAttachments',param)
            .then((res) => {
              console.log('附件',res)
              if(res.data.data != '无附件'){
                for(let i = 0;i<res.data.data.length;i++){
                  this.attachmentData.push({
                    attachmentType:res.data.data[i].attachmentType,
                    fileLabel:res.data.data[i].label,
                    fileName:res.data.data[i].attachmentName,
                    ownerName:res.data.data[i].ownerName,
                    uploadTime:res.data.data[i].uploadTime,
                    attachmentAddress:res.data.data[i].attachmentAddress,
                  })
                }
              }
            }).catch((e) => {
            console.log(e);
          })
        },
        //日志查询
        logQuery(businessId){
          this.attachmentData = [];
          let param = {
            'businessId':businessId,
          };
          this.$axios5.post('syslog/userlog/getBusinessLogs',param)
            .then((res) => {
              console.log('附件',res)
              if(res.data.state == true){
                for(let i = 0;i<res.data.data.length;i++){
                  this.logData.push(res.data.data[i])
                }
              }
            }).catch((e) => {
            console.log(e);
          })
        },
          //下载附件信息
	       uploadAttach(index,row){
	       	let param = {
	       		'BucketName':"maoqu-business",
	       		'FileName':row.attachmentAddress,
	       	}
	       	this.$axios7.post('file/Download',param)
	         .then((response) =>{
             console.log('lll',response,param)
	            if(response.data.url != ''){
                window.open(response.data.url);
              }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
	       },
	       //删除附件信息
	       deleteAttach(index,row){
	       	this.attachmentData.splice(index,1);
	       	if(row.attachmentName !== null){
	       		let param = {
	       			'businessId': this.businessId,
	       			'attachmentName': row.attachmentName,
	       			'isDeleted': 1,
	       		}
	         this.$axios7.post('bsFile/delete',param)
	         .then((response) =>{
	            console.log(response);
	            let res=response.data;
	            if(res.status==1){
	              this.$message.success('删除附件成功');
	            }else{
	              this.$message.error('删除附件失败');
	            }
	          })
	          .catch(function (error) {
	            console.log(error);
	          });
	       	}
	       }
       }
    }
</script>

<style scoped>

</style>
