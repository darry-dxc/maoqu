<template>
   <div style="min-width:1250px">
    <person-header/>
<!-- 侧边栏内容 -->
     <el-row>
       <el-col :span="isCollapse === false? 4 : 1">
         <person-nav ref="nav" @collapseNav="isCollapse = !isCollapse"/>
       </el-col>
       <el-col :span="isCollapse === false? 20 : 23" style="padding-left: 10px">
          <el-row>
            <el-col :span="23" >
              <el-tabs
                v-model="activeIndex2"
                closable
                @tab-click="tabClick"
                v-if="options2.length"
                @tab-remove="tabRemove">
                <el-tab-pane
                  :key="item.name"
                  v-for="(item, index) in options2"
                  :label="item.name"
                  :name="item.route">
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="1">
              <el-button type="text" icon="el-icon-close" style="font-size: 28px" @click="closeAll"/>
            </el-col>
          </el-row>
         <keep-alive>
           <router-view v-if="$route.meta.keepAlive" />
         </keep-alive>
         <router-view v-if="!$route.meta.keepAlive" />
       </el-col>
     </el-row>
  <portals-footer/>
</div>
</template>
<script>
  import './../../assets/css/webCompany/companyMain.css'
  import personNav from './../../components/personNav.vue'
  import userNav from './../../components/userNav.vue'
  import personHeader from './../../components/personHeader.vue'
  import portalsFooter from './../../components/portalsFooter.vue'
  import qs from 'qs';
  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    components:{
      personHeader,
      portalsFooter,
      personNav
    },
    //进入个人平台后默认进入主页
    mounted(){
      this.$store.state.options2 = [];
      this.activeIndex2 = '/PersonMainCon';
      let path =this.activeIndex2;
      this.$router.push({path: path});
      this.$refs.nav.refresh();
    },
    methods: {
    // tab切换时，动态的切换路由
    tabClick (tab) {
      let path = this.activeIndex2;
      this.$router.push({path: path});
    },
    tabRemove (targetName) {
      //首页不可删除
      if(targetName == '/PersonMainCon') {
        return;
      }
      this.$store.commit('delete2_tabs', targetName);
      if (this.activeIndex2 === targetName) {
        // 设置当前激活的路由
        if (this.options2 && this.options2.length >= 1) {
          this.$store.commit('set2_active_index', this.options2[this.options2.length-1].route);
          this.$router.push({path: this.activeIndex2});
        } else {
          this.$router.push({path: '/PersonMainCon'});
        }
      }
    },
      closeAll(){
        // console.log(this.$store.state.options1)
        this.$store.state.options2 = [{name:'个人中心主页',route:'/PersonMainCon'}];
        this.$store.commit('set2_active_index', '/PersonMainCon');
        this.$router.push('/PersonMainCon');
      }
  },
  computed: {
    //...mapState(['nickName','nickPhone','nickId'])
    options2() {
      return this.$store.state.options2;
    },
    activeIndex2: {
      get () {
        return this.$store.state.activeIndex2;
      },
      set (val) {
        this.$store.commit('set2_active_index', val);
      }
    }
  },
  watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.options2 ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set2_active_index', '/' + to.path.split('/')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add2_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
        this.$store.commit('set2_active_index', '/' + to.path.split('/')[1]);
      }
    }
  }
}
</script>
