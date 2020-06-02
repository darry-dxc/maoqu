<template>
  <div id="customForm">
      <!--报关单-->
      <el-row >
        <el-col :span="6"  class="serviceFormLeft" >服务单：{{serviceNo}}【{{serviceStatus}}】</el-col>
        <el-col :span="6"  class="serviceFormMid" >{{enterpriseName}}</el-col>
        <el-col :span="3"  class="serviceFormMid" >报关员：{{author}}</el-col>
        <el-col :span="6" :offset="2"> <el-button plain class="undoService"@click="cancelExport">撤销服务</el-button>
        <el-button plain class="downloadService">下载</el-button>
        <el-button plain class="assessService">评价服务</el-button></el-col>
      </el-row>
    <div id="customMid">
      <el-row >
        <el-col :span="3" :offset="0.8"> <img class="customClearance" src="./../../../../assets/images/companyIcon/customClearance.png"/></el-col>
        <el-col :span="16"   > <el-steps :active="active" finish-status="success" class="customSchedule">
          <el-step title="服务受理"></el-step>
          <el-step title="海关申报"></el-step>
          <el-step title="过关放行"></el-step>
        </el-steps>
        </el-col>
        <el-col :span="2" :offset="1"> <el-button class="auditOpinion" >审核意见</el-button></el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
    export default {
      data() {
        return {
          active: 0,
          serviceNo:'',
          serviceStatus:'',
          enterpriseName:'',
          author:'',
        };
      },
      computed:{
      businessId(){
          return this.$store.state.businessId;
       }
      },
      methods: {
        //撤销服务
         cancelExport(){
          let param={
            businessId:this.businessId,
          };
          this.$axios4.post('/dispatchOrCancelExportDeclare',param)
          .then((response) =>{
            console.log(response);
            let res = response;
           if(res.state==1){
            this.$message.success('恭喜您，撤销成功！');
           }else if(res.state==0){
            this.$message('派单中,撤销失败');
           }else{
             console.log("请求失败");
          }
          })
          .catch(function (error) {
            console.log(error);
          });
       },

       next() {
          if (this.active++ > 2) this.active = 0;
        }
      }
    }
</script>

<style scoped>
#customForm{
    height: 160px;

  }
#customMid{
  height: 120px;
}
.serviceFormLeft{
  line-height: 39px;
}
.undoService, .downloadService, .assessService{
  margin: 0 ;
}

.serviceFormMid{
  line-height: 39px;
}
.serviceFormMid{
  line-height: 39px;
}
.customClearance{
  height: 100px;
  width: 80%;
  float: left;
  margin: 15px 15px ;
}
.customSchedule{
  height: 120px;
  width: 100%;
  float: left;
  vertical-align: central;
  margin: 50px 10px ;
}
.auditOpinion{
  float: right;
  margin:45px 10px ;
}
</style>
