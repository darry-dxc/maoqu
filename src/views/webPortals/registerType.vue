<template>
 <div id="registerType">
   <el-row style="height: 61px;background-color: #fff;opacity: 0.9">
     <el-col :span="12">
       <div @click="$router.push({ path: '/WebPortals/Homepage'})" style="float: left;">
         <img id="logo" src="./../../assets/images/portalsIcon/logo.png" class="bk-home"/>
       </div>
       <div style="font-size: 20px">
         <span class="register" @click="$router.push({ path: '/WebPortals/RegisterClause'})">注册</span>
         <i class="el-icon-arrow-right" style="margin-top: 20px"></i>
         <span>选择类型</span>
       </div>
     </el-col>
     <el-col :span="4" :offset="8" style="font-size: 25px;margin-top: 13px;text-align: center">
       <el-button type="warning" icon="el-icon-arrow-left" @click="$router.push({ path: '/WebPortals/Homepage'})">返回首页</el-button>
     </el-col>
   </el-row>
    <el-container>
      <el-main class="clause">
        <div class="person">
          <div class="personHead">
            <div class="personImg">
              <img src="./../../assets/images/portalsIcon/people.svg" style="width: 70px;height: 70px "/>
            </div>
            <div class="personName">
              <span>个人</span>
            </div>
          </div>
          <div class="personText">
            <p class="personInt">适用于个体业务员。主要业务为：<br>-进口业务单<br>-出口业务单<br>-查找贸易服务</p>
          </div>
          <div class="personLink">
            <router-link to="/WebPortals/LoginIndividual"><p class="linkText">选择并继续></p></router-link>
          </div>
        </div>

        <div class="company">
          <div class="companyHead" >
            <img class="companyImg" src="./../../assets/images/portalsIcon/company.svg"/>
            <span class="companyName">企业</span>
          </div>
          <div  class="companyText">
            <p class="companyInt">适用于从事进出口业务的贸易商。主要业务为：<br>-发布需求<br>-查找贸易信息</p>
          </div>
          <div class="companyLink">
            <router-link to="/WebPortals/LoginEnterprise"><p class="linkText">选择并继续></p></router-link>
          </div>
        </div>
      </el-main>
    </el-container>
<portals-footer></portals-footer>
 </div>

</template>

<script>
// 导入css样式文件
  import './../../assets/css/webPortals/registerType.css'
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
  #registerType .register:hover{
    cursor: pointer !important;
    color: #f49900;
  }
  #registerType #logo {
    width: 230px !important;
    height: 34px !important;
    margin: 13px 20px 0 13px;
  }
</style>

