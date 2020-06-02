<template>
  <div id="treasurePage">
    <portals-header ref="portalsHeader"></portals-header>
    <div id="top">
      <img src="./../../assets/images/portalsImg/u699.jpg" width="100%" height="500px"/>
    </div>
    <main-service style="z-index: 9999;position: fixed;right: 20px;bottom: 50px"></main-service>
  <portals-footer></portals-footer>
</div>
</template>
<script>
  import portalsFooter from './../../components/portalsFooter.vue'
  import portalsHeader from './../../components/portalsHeader.vue'
  import mainService from './../../components/mainService.vue'
  export default {
    data() {
      return {
        input1:'',
        itemChecked:'',
        leftjson:[
            {'id':'1','name': '业务管理'},
            {'id':'2','name': '外贸CRM'},
            {'id':'3','name': '超级日程表'},
            {'id':'4','name': '航运查询'},
            {'id':'5','name': '查询小工具'}
          ]
      };
    },
    //加载组件
    components:{
      portalsFooter,
      portalsHeader,
      mainService
    },
    //定义初始化函数
  mounted(){
        this.showHead();
    },
    methods: {
      //打开导航栏
     handleOpen(key, keyPath) {
        this.itemChecked = this.leftjson[key-1].name;
      },
      showHead(){
        this.$refs.portalsHeader.navnum="2";
      }
    }
  }
</script>
<style scoped>
  #treasurePage {

  }
</style>

