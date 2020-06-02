<template>
 <div id="register">
   <el-row style="height: 61px;background-color: #fff;opacity: 0.9">
     <el-col :span="12">
       <div @click="$router.push({ path: '/WebPortals/Homepage'})" style="float: left;">
         <img id="logo" src="./../../assets/images/portalsIcon/logo.png" class="bk-home"/>
       </div>
       <div style="font-size: 20px">
         <span>注册</span>
         <i class="el-icon-arrow-right" style="margin-top: 20px"></i>
       </div>
     </el-col>
     <el-col :span="4" :offset="8" style="font-size: 25px;margin-top: 13px;text-align: center">
       <el-button type="warning" icon="el-icon-arrow-left" @click="$router.push({ path: '/WebPortals/Homepage'})">返回首页</el-button>
     </el-col>
   </el-row>
    <el-container>
      <el-main class="clause">
        <p class="clauseTitle">贸趣平台服务条款</p>
        <div class="textArea">
          <iframe src="./../../../static/serverOrder.htm" class="clauseBox" style="min-width: 940px;height:600px"></iframe>
        </div>
        <div class="btn-group">
          <router-link to="/WebPortals/HomePage"><button class="refuse">我拒绝</button></router-link>
          <router-link to="/WebPortals/RegisterType"><button class="accept">我接受</button></router-link>
        </div>
      </el-main>
    </el-container>
  <portalsFooter></portalsFooter>
 </div>
</template>
<script>
// 导入css样式文件
  import './../../assets/css/webPortals/registerClause.css'
  import portalsHeader from './../../components/portalsHeader.vue'
  import portalsFooter from './../../components/portalsFooter.vue'
  import mainService from './../../components/mainService.vue'
  import registerBread from './../../components/registerBread.vue'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components:{
    portalsFooter,
    portalsHeader,
    mainService,
    registerBread
  }
}
</script>
<style scoped>
  #register #logo {
    width: 230px !important;
    height: 34px !important;
    margin: 13px 20px 0 13px;
  }
</style>
