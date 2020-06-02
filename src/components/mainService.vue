<template>
<div>
  <el-row id="tool">
    <div @click="qqSerice">
      <el-card >
        <img src="./../assets/images/portalsImg/qq.png"/>
      </el-card>
    </div>
    <el-tooltip class="item" effect="dark" content="电话:0755-82828592" placement="left">
      <el-card shadow="hover" style="margin: 2px 0">
        <img src="./../assets/images/portalsImg/kefu.png"/>
      </el-card>
    </el-tooltip>
    <div @click="dialogVisible = true">
      <el-card shadow="hover" style="margin: 2px 0">
        <img src="./../assets/images/portalsImg/fankui.png"/>
      </el-card>
    </div>
    <div @click="backTop">
      <el-card shadow="hover" style="margin: 2px 0">
        <img src="./../assets/images/portalsImg/top.png"/>
      </el-card>
    </div>
  </el-row>
  <el-dialog
    title="请留下您宝贵的意见:"
    :visible.sync="dialogVisible"
    width="600px"
    center
  >
    <el-form :model="form" label-width="80px" style="padding-right: 20px">
      <el-form-item label="标题:" >
        <el-input v-model="form.title" clearable/>
      </el-form-item>
      <el-form-item label="内容:">
        <el-input
          type="textarea"
          :rows="6"
          v-model="form.content"
          clearable
        />
      </el-form-item>
      <el-form-item label="联系方式:">
        <el-input v-model="form.phone" clearable/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitBtn">提 交</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>

export default {
  data (){
    return {
      form:{
        title:"",
        content:'',
        phone:''
      },
      input: '',
      dialogVisible:false,
      serShow:false
    }
  },
   mounted(){

   },
  methods:{
    //div可移动
      dragFunc(id) {
        var Drag = document.getElementById(id);
        Drag.onmousedown = function(event) {
        var ev = event || window.event;
        event.stopPropagation();
        var disX = ev.clientX - Drag.offsetLeft;
        var disY = ev.clientY - Drag.offsetTop;
        document.onmousemove = function(event) {
            var ev = event || window.event;
            Drag.style.left = ev.clientX - disX + "px";
            Drag.style.top = ev.clientY - disY + "px";
            Drag.style.cursor = "move";
        };
       };
        Drag.onmouseup = function() {
        document.onmousemove = null;
        this.style.cursor = "default";
      };
    },
    //打开服务框
     openSer(){
      this.serShow=true;
     },
     //关闭服务框
     closeSer(){
      this.serShow=false;
     },
    //打开消息框
     openMsg(){
      this.dialogVisible=true;
     },
     //关闭消息框
     closeMsg(){
      this.dialogFormVisible = false;
     },
     //提交按钮
     submitBtn(){
      let params = {
        ideaTitle:this.form.title,
        submitText:this.form.content,
        phone:this.form.phone
      };
      console.log(params);
       this.$axios2.post('feedback/insertIntoFeedback',params)
         .then((response)=>{
           if(response.data.state===true){
            this.$message.success('恭喜你，提交成功');
            this.form.title = '';
            this.form.content = '';
            this.form.phone = '';
           }else {
             this.$message.error(response.data.data);
           }
         })
         .catch((error)=>{
           console.log(error);
           this.$message.error('操作失败');
         });
         this.dialogVisible = false;
     },
    //取消提交
    cancel(){
      for(let i in this.form){
        this.form[i] = ''
      }
    },
    qqSerice(){
       this.$axios2.get('customerService/getQqHref')
         .then((response)=>{
           console.log(response.data)
           if(response.data.state===true){
             window.open(response.data.data);
           }else {
             this.$message.error('操作失败');
           }
         })
         .catch((error)=>{
           console.log(error);
           this.$message.error('操作失败');
         });
    },
    backTop(){
       let timer = setInterval(() => {
        document.documentElement.scrollTop -= Math.ceil(document.documentElement.scrollTop/10);
        if(document.documentElement.scrollTop === 0)
          clearInterval(timer);
      },50)
    }
  }
}
</script>
<style scoped>
  #tool img{
    width: 28px !important;
    transition:  0.3s;
    -webkit-transition:  0.3s;
  }
  #tool .el-card:hover{
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(244,153,0,.6) !important;
  }
</style>
