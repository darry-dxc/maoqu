 <template>
   <div class="home-header">
     <el-menu
       :default-active="$route.path"
       background-color="#fff"
       active-text-color="#F49900"
       mode="horizontal"
       text-color="#303133"
       style="position: fixed;top: 0;opacity:0.95;z-index: 9999;width: 100%;min-width: 1200px"
       @select="select"
     >
       <div @click="$router.push({ path: '/WebPortals/Homepage'})" style="float: left;">
         <img id="logo" src="../assets/images/portalsIcon/logo.png" />
       </div>
       <el-menu-item index="/WebPortals/HomePage">首页</el-menu-item>
       <el-submenu
         index="3"
         :show-timeout="100"
       >
         <template slot="title">百宝箱</template>
         <el-menu-item index="/WebPortals/TreasurePage">外贸CRM</el-menu-item>
       </el-submenu>
       <el-menu-item index="/WebPortals/ServePage" >服务生态圈</el-menu-item>
       <el-menu-item index="/WebPortals/TradeInfoPort">外贸信息港</el-menu-item>
       <el-menu-item index="/WebPortals/AboutUs" >关于我们</el-menu-item>
       <div style="float: right;margin-right: 30px;height: 61px;line-height: 61px">
         <el-button type="primary" plain @click="register" style="width: 100px">注册</el-button>
         <el-button type="warning" @click="login" style="width: 100px">登录</el-button>
       </div>
     </el-menu>
   </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed:{

  },
  methods:{
    select(index,indexPath){
      this.$router.push({ path: index.toString()})
    },
    register(){
      this.$router.push({ path: '/WebPortals/RegisterClause'})
    },
    login(){
      this.$router.push({ path: '/WebPortals/Login'})
    }
  }
}
</script>
 <style>
   .home-header{
     min-width: 1200px;
   }
   .home-header #logo {
     width: 230px !important;
     height: 34px !important;
     margin: 13px 20px 0 13px;
   }
   .home-header .el-menu-item {
     font-family:"Microsoft YaHei UI";
     font-size: 20px !important;
   }
   .home-header .el-submenu__title{
     font-size: 20px !important;
   }
   .home-header .el-button--warning{
     background-color: #f49900 !important;
     border-color: #f49900 !important;
   }
   .home-header .el-button--warning:hover{
    opacity: 0.7;
   }
 </style>
