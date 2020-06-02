<template>
<div>
<!-- 客服悬浮框 -->
  <div class="service" v-on:mouseenter="openSer">
      <img src="../assets/images/portalsIcon/service.png"/>
      <label>咨<br>询<br>.<br>建<br>议</label>
  </div>
<!--   悬浮框的具体内容 -->
  <div class="serviceText" v-show="serShow">
    <div class="x" @click="closeSer"/>
    <div class="qq"/>
    <div class="qqText">
        <h3>QQ客服</h3>
        <p>在线咨询，秒极回答</p>
    </div>
    <div class="tell"/>
    <div class="qqText">
        <h3>咨询电话</h3>
        <p>1234567890</p>
    </div>
    <div class="advice"/>
    <div class="qqText">
        <h3 @click="openMsg">意见反馈</h3>
        <p>我们渴望您的建议</p>
    </div>
  </div> 
  <!--   弹框的具体内容 --> 
  <div class="modelMsg" v-show="mdshow">
     <div class="md-top">
        <h4>请留下您宝贵的意见:</h4>
        <div @click="closeMsg" class="x2" />
     </div>
     <div class="md-content">
        <h5>* 意见标题:</h5>
        <input class="input1" type="input" placeholder="请输入内容" /> 
        <h5>* 意见内容:</h5>
        <textarea class="input2" placeholder="请输入内容" /> 
        <h5>* 联系电话:</h5>
        <input class="input3" type="input" placeholder="请输入内容" />     
     </div>
     <div class="md-wrap">
        <button class="btn1" @click="submitBtn">提交</button>
     </div>

  </div>

</div>
</template>

<style>
/*客服悬浮框*/
h3{
  font-size: 20px;
  color:#333;
}
h3:hover{
  color: #F49900;
}

/*客服悬浮框 */
.service{
  width:50px;
  height: 180px;
  position: fixed;
  right:30px;
  bottom: 200px;
  text-align: center;
  -moz-box-shadow: 5px 5px 5px rgba(0,0,0,.35);
  -webkit-box-shadow: 5px 5px 5px rgba(0,0,0,.35);
  box-shadow: 5px 5px 5px rgba(0,0,0,.35);
}

.service img{
  width:40px;
  height: 38px;
}
.service label{
  font-size: 18px;
  color: #F49900;
}
/*客服悬浮框 */
/*悬浮框的具体内容*/
.serviceText{
  width: 280px;
  height: 220px;
  position: fixed;
  right:90px;
  bottom: 100px;
  -moz-box-shadow: 5px 5px 5px rgba(0,0,0,.35);
  -webkit-box-shadow: 5px 5px 5px rgba(0,0,0,.35);
  box-shadow: 5px 5px 5px rgba(0,0,0,.35);
}
/*悬浮提示框关闭图标*/
.x{
  float: right;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  margin-top: 5px;
  background-size: 100% 100%;
  background-image: url("./../assets/images/portalsIcon/u304.png");
}
.x:hover{
   background-image: url("./../assets/images/portalsIcon/u304_mouseOver.png");
}
.qq{
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-top: 30px;
  background-size: 100% 100%;
  background-image: url("./../assets/images/portalsIcon/qq.svg");
}
.tell{
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-top: 10px;
  background-size: 100% 100%;
  background-image: url("./../assets/images/portalsIcon/tell.svg");
}
.advice{
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-top: 10px;
  background-size: 100% 100%;
  background-image: url("./../assets/images/portalsIcon/msg.svg");
}
.qqText{
  float: left;
  width: 240px;
  height: 70px;
  margin-top: 2px;
}
/*悬浮提示框*/
/*模态框*/
.modelMsg{
  width: 480px;
  position: fixed;
  right:50%;
  bottom: 50%;
}
.md-top{
  width: 100%;
  height: 40px;
  background-color: #F49900;
  vertical-align: middle;
}
.md-content{
  width: 100%;
  height: 240px;
  background-color: #FFF;
}
.md-wrap{
  width: 100%;
  height: 40px;
  background-color:#E4E4E4;
  text-align: center;
}
.x2{
  float: right;
  width: 15px;
  height: 15px;
  margin: 5px 5px;
  background-size: 100% 100%;
  background-image: url("./../assets/images/portalsIcon/u304.png");
}
h4{
  float: left;
  margin: 5px 5px;
  font-size: 18px;
  color:#FFF;
}
h5{
  float: left;
  margin: 5px 5px;
  font-size: 18px;
  color:#333;
}
.input1{
  width: 340px !important;
  height: 30px  !important;
  margin: 5px 5px !important ;
}
.input2{
  width: 340px;
  height: 130px !important;
  margin: 5px 5px;
}
.input3{
  width: 230px;
  height: 30px;
  margin: 5px 5px;
}
.btn1{
  width: 100px;
  height: 30px;
  margin: 5px auto;
  background-color: #F49900;
  border-radius: 3px;
  font-size: 20px;
  color: white;
}
p{
  font-size: 16px;
  color:#666;
}
/*模态框*/
</style>

<script>

export default {
  data (){
    return {
      input: '',
      mdshow:false,
      serShow:false
    }
  },
  methods:{
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
      this.mdshow=true;
     },
     //关闭消息框
     closeMsg(){
      this.mdshow = false;
     },
     //提交按钮
     submitBtn(){
      this.mdshow = false;
      this.$message({
          message: '恭喜你，提交成功',
          type: 'success'
        });
     }
  }
}
</script>