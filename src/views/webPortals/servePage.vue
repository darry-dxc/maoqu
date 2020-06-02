<template>
<div class="container">
<portals-header ref="portalsHeader"></portals-header>
<!-- 顶部图片区域 -->
    <div id="topImage">
        <img id="serveImage" src="./../../assets/images/portalsImg/u829.jpg" />
    </div> 
  <!--   文字区域 -->
    <p class="title">寻找你的最佳搭档</p>
    <p class="titleContent">如果你正在为寻找质优价廉的物流和关检等服务发愁，在贸趣服务市场，你会找到你的最佳搭档。</p>
    <p class="titleContent">查询运价、查看服务商资质、发布需求、在线下单，一站式操作，令你出货无忧。</p>
    <!-- 图片区域 -->
    <div id="topImage">
      <img id="serveImage" src="./../../assets/images/portalsImg/u806.jpg" />
    </div>
    <!--   文字区域 -->
    <p class="title">创新金融产品，为你解决钱的问题</p>
    <p class="titleContent">贸趣基于平台积累的外贸大数据和庞大交易额，与第三方金融机构合作，</p>
    <p class="titleContent">推出多种创新性的外贸金融产品，让你不再为“钱袋子“发愁。</p>
    <!--   图片区域 -->
    <div id="topImage">
        <img id="serveImage" src="./../../assets/images/portalsImg/u815.jpg" />
    </div>
    <!--   按钮区域 -->
    <div class="btnCenter">
      <el-button id="applyBtn" type="primary" @click="toLogin">立即申请体验<i class="el-icon-upload2"></i></el-button>
    </div>
    <main-service style="z-index: 9999;position: fixed;right: 20px;bottom: 50px"></main-service>
  <portals-footer></portals-footer>
</div>
</template>
<script>
  import './../../assets/css/webPortals/servePage.css'
  import portalsFooter from './../../components/portalsFooter.vue'
  import portalsHeader from './../../components/portalsHeader.vue'
  import mainService from './../../components/mainService.vue'
export default {
	//定义数据
  data () {
    return {
      msg: ''
    }
  },
  //定义组件
  components:{
			portalsFooter,
      portalsHeader,
      mainService
		},
    //定义初始化函数
  mounted(){ 
        this.showHead(); 
    },
    //定义方法
  methods:{
    showHead(){   
        this.$refs.portalsHeader.navnum="/ServePage";
      },
    toLogin(){
      this.$router.push({path:'/WebPortals/Login'})
    }

}
}
</script>
